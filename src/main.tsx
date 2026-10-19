import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {Toaster} from 'react-hot-toast';
import App from './App.tsx';
import ApplyPage from './components/ApplyPage.tsx';
import './index.css';

const isApply = window.location.pathname.replace(/\/$/, '') === '/apply';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isApply ? (
      <>
        <Toaster position="top-center" />
        <ApplyPage />
      </>
    ) : (
      <App />
    )}
  </StrictMode>,
);
