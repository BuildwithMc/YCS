import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Setup Google Sheets
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
const sheets = google.sheets({ version: 'v4', auth });

// Setup Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

app.post('/api/order', async (req, res) => {
  try {
    const { orderDetails } = req.body;
    
    // 1. Process Google Sheets integration
    if (process.env.GOOGLE_SHEET_ID && process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Sheet1!A:H', // Adjusted for services and total
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [
            [
              new Date().toISOString(),
              orderDetails.name,
              orderDetails.email,
              orderDetails.phone,
              orderDetails.sessionType,
              `${orderDetails.date} ${orderDetails.time}`,
              orderDetails.services ? orderDetails.services.join(', ') : 'N/A',
              orderDetails.total,
            ],
          ],
        },
      });
    }

    // 2. Email CEO and Customer
    if (process.env.GMAIL_EMAIL && process.env.GMAIL_APP_PASSWORD) {
      const emailHtml = `
        <h3>New Order Confirmation</h3>
        <ul>
          <li><strong>Name:</strong> ${orderDetails.name}</li>
          <li><strong>Email:</strong> ${orderDetails.email}</li>
          <li><strong>Phone:</strong> ${orderDetails.phone}</li>
          <li><strong>Session Type:</strong> ${orderDetails.sessionType}</li>
          <li><strong>Date & Time:</strong> ${orderDetails.date} at ${orderDetails.time}</li>
          <li><strong>Services Booked:</strong> ${orderDetails.services ? orderDetails.services.join(', ') : 'N/A'}</li>
          <li><strong>Total:</strong> NGN ${orderDetails.total}</li>
        </ul>
      `;

      // Email to CEO
      await transporter.sendMail({
        from: process.env.GMAIL_EMAIL,
        to: process.env.CEO_EMAIL, // sending to CEO
        subject: `New Styling Booking from ${orderDetails.name}`,
        html: emailHtml,
      });

      // Email to Customer
      await transporter.sendMail({
        from: process.env.GMAIL_EMAIL,
        to: orderDetails.email,
        subject: 'Thank you for your Booking - Your Online Corporate Stylist',
        html: `<p>Dear ${orderDetails.name},</p><p>We have received your booking and payment.</p>` + emailHtml,
      });
    }

    res.status(200).json({ success: true, message: 'Order processed successfully.' });
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ success: false, message: 'Error processing order.' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
