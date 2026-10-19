import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowLeft, Check, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';
import { cn } from '../lib/utils';

const WHATSAPP_NUMBER = '2348142488625';
const DRAFT_KEY = 'ycs-apply-draft';

const STYLE_ISSUES = [
  "My clothes don't fit well",
  "I'm not sure which colours suit me",
  "My wardrobe doesn't match the image I want",
  'I struggle to pair outfits',
];

const SATURDAYS = ['31 Oct & 7 Nov', '14 Nov & 21 Nov', '28 Nov & 12 Dec', 'Any of them'];

interface FormState {
  name: string;
  whatsapp: string;
  area: string;
  job: string;
  issues: string[];
  image: string;
  saturdays: string;
  consent: boolean;
}

const empty: FormState = {
  name: '',
  whatsapp: '',
  area: '',
  job: '',
  issues: [],
  image: '',
  saturdays: '',
  consent: false,
};

type Errors = Partial<Record<keyof FormState, string>>;

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your full name.';
  if (!/^\+?[\d\s-]{10,16}$/.test(f.whatsapp.trim())) e.whatsapp = 'Enter a valid WhatsApp number.';
  if (!f.area.trim()) e.area = 'Tell us where in Enugu you live.';
  if (!f.job.trim()) e.job = 'Tell us what you do for work.';
  if (f.issues.length === 0) e.issues = 'Pick at least one.';
  if (!f.saturdays) e.saturdays = 'Choose the Saturdays that suit you.';
  if (!f.consent) e.consent = 'Please confirm to continue.';
  return e;
}

function buildMessage(f: FormState) {
  return [
    "Hello! I'd like to apply for the YourCorporateStylist free styling campaign (Enugu).",
    '',
    `*Name:* ${f.name.trim()}`,
    `*WhatsApp:* ${f.whatsapp.trim()}`,
    `*Area in Enugu:* ${f.area.trim()}`,
    `*Work:* ${f.job.trim()}`,
    `*What feels off:* ${f.issues.join('; ')}`,
    `*How I want to be seen at work:* ${f.image.trim() || '-'}`,
    `*Saturdays:* ${f.saturdays}`,
    '',
    'I understand the sessions take place at my home in Enugu and will be filmed for the campaign.',
  ].join('\n');
}

const whatsappUrl = (f: FormState) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage(f))}`;

const inputCls =
  'w-full bg-white border border-brand-navy/15 px-4 py-3 outline-none focus:border-brand-navy transition-colors';

function Field({ label, error, optional, children }: { label: string; error?: string; optional?: boolean; children: ReactNode }) {
  return (
    <div data-error={!!error}>
      <label className="block text-[11px] uppercase tracking-[0.2em] font-bold text-brand-navy mb-2">
        {label} {optional && <span className="text-brand-brown/50 normal-case tracking-normal font-normal">Optional</span>}
      </label>
      {children}
      {error && <p className="text-red-700 text-xs mt-1.5">{error}</p>}
    </div>
  );
}

function Choice({ checked, label, onChange, type }: { checked: boolean; label: string; onChange: () => void; type: 'checkbox' | 'radio' }) {
  return (
    <label
      className={cn(
        'flex items-start gap-3 border px-4 py-3 cursor-pointer transition-colors',
        checked ? 'border-brand-navy bg-brand-navy/5' : 'border-brand-navy/15 bg-white hover:border-brand-navy/40',
      )}
    >
      <input type={type} checked={checked} onChange={onChange} className="mt-1 accent-[#1a2a40]" />
      <span className="text-sm">{label}</span>
    </label>
  );
}

export default function ApplyPage() {
  const [form, setForm] = useState<FormState>(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      return saved ? { ...empty, ...JSON.parse(saved) } : empty;
    } catch {
      return empty;
    }
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Apply · Free Styling Campaign · YourCorporateStylist';
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    } catch {
      /* storage unavailable */
    }
  }, [form]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  const toggleIssue = (issue: string) =>
    set('issues', form.issues.includes(issue) ? form.issues.filter(i => i !== issue) : [...form.issues, issue]);

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) {
      toast.error('Please complete the highlighted fields.');
      setTimeout(
        () => document.querySelector('[data-error="true"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
        50,
      );
      return;
    }
    const url = whatsappUrl(form);
    const win = window.open(url, '_blank', 'noopener,noreferrer');
    if (!win) window.location.href = url;
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* ignore */
    }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-brand-beige text-brand-brown">
      <header className="px-6 py-5 border-b border-brand-brown/10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium hover:text-brand-navy">
            <ArrowLeft size={16} /> Back to site
          </a>
          <span className="font-serif text-lg font-bold text-brand-navy">Victory Ezeji</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-14 md:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-[11px] uppercase tracking-[0.3em] font-bold text-brand-gold mb-4">
            Free styling campaign · Enugu
          </p>
          <h1 className="text-4xl md:text-6xl text-brand-navy leading-tight mb-6">
            Your next promotion is already <em className="text-brand-gold">in your wardrobe.</em>
          </h1>
          <p className="text-lg text-brand-brown/80 mb-8 max-w-xl">
            Apply in two minutes. If you're selected, we'll book a free 30–60 minute vetting call to walk you through the process.
          </p>
          <ul className="flex flex-wrap gap-3 mb-12 text-xs uppercase tracking-widest font-bold text-brand-navy">
            {['Free', 'Enugu residents only', 'Saturdays · 31 Oct – 12 Dec 2026'].map(t => (
              <li key={t} className="border border-brand-navy/20 px-3 py-2">{t}</li>
            ))}
          </ul>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-brand-navy text-white p-10 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-brand-gold text-brand-navy flex items-center justify-center mx-auto mb-6">
              <Check size={28} />
            </div>
            <h2 className="text-3xl mb-4">One last step.</h2>
            <p className="text-white/70 mb-8">
              WhatsApp should have opened with your answers filled in. Just tap send. If it didn't open, use the button below.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={whatsappUrl(form)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-gold text-brand-navy px-6 py-3 text-xs uppercase tracking-widest font-bold"
              >
                Open WhatsApp again
              </a>
              <button
                onClick={() => setSubmitted(false)}
                className="border border-white/30 px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-white/10"
              >
                Edit my answers
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="space-y-8">
            <Field label="Full name" error={errors.name}>
              <input className={inputCls} value={form.name} onChange={e => set('name', e.target.value)} autoComplete="name" />
            </Field>
            <Field label="WhatsApp number" error={errors.whatsapp}>
              <input className={inputCls} type="tel" inputMode="tel" placeholder="0801 234 5678" value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)} autoComplete="tel" />
            </Field>
            <Field label="Where in Enugu do you live?" error={errors.area}>
              <input className={inputCls} value={form.area} onChange={e => set('area', e.target.value)} />
            </Field>
            <Field label="What do you do for work?" error={errors.job}>
              <input className={inputCls} value={form.job} onChange={e => set('job', e.target.value)} />
            </Field>

            <Field label="What feels off about your work style? Pick any" error={errors.issues}>
              <div className="grid sm:grid-cols-2 gap-3">
                {STYLE_ISSUES.map(i => (
                  <Choice key={i} type="checkbox" label={i} checked={form.issues.includes(i)} onChange={() => toggleIssue(i)} />
                ))}
              </div>
            </Field>

            <Field label="How do you want to be seen at work?" optional>
              <textarea className={cn(inputCls, 'min-h-28')} value={form.image} onChange={e => set('image', e.target.value)} />
            </Field>

            <Field label="Which Saturdays suit you?" error={errors.saturdays}>
              <p className="text-sm text-brand-brown/70 mb-3">You'll need both Saturdays in a pair, plus the next day for fitting.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {SATURDAYS.map(s => (
                  <Choice key={s} type="radio" label={s} checked={form.saturdays === s} onChange={() => set('saturdays', s)} />
                ))}
              </div>
            </Field>

            <Field label="Before you apply" error={errors.consent}>
              <Choice
                type="checkbox"
                label="I understand the sessions take place at my home in Enugu and will be filmed for the campaign."
                checked={form.consent}
                onChange={() => set('consent', !form.consent)}
              />
            </Field>

            <div>
              <button
                type="submit"
                className="w-full bg-brand-navy text-white px-8 py-5 text-sm uppercase tracking-widest font-bold hover:bg-brand-brown transition-colors flex items-center justify-center gap-3"
              >
                <MessageCircle size={18} /> Send application on WhatsApp
              </button>
              <p className="text-sm text-brand-brown/70 mt-3 text-center">WhatsApp opens with your answers filled in. Just tap send.</p>
            </div>

            <p className="text-sm text-center text-brand-brown/70 pt-6 border-t border-brand-brown/10">
              Prefer to message directly? DM <strong>@ezejivictory</strong> or WhatsApp <strong>0814 248 8625</strong>.
            </p>
          </form>
        )}
      </main>
    </div>
  );
}
