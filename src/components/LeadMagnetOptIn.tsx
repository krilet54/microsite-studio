import { useState } from 'react';

export default function LeadMagnetOptIn() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    try {
      const form = new FormData();
      form.append('email', email);
      form.append('_subject', 'Passive income checklist request');
      form.append('_cc', 'kirpesh54@gmail.com');
      form.append('_captcha', 'false');

      const res = await fetch('https://formsubmit.co/ajax/kirpesh54@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: form
      });
      if (!res.ok) throw new Error('Failed to submit');

      // fetch the checklist text and generate a PDF
      const txt = await fetch('/checklists/passive-income-checklist.txt').then(r => r.text());
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({ unit: 'pt', format: 'a4' });
      const margin = 40;
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('Top 6 Passive Income Checklist — Students', margin, 60);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      const lines = doc.splitTextToSize(txt, 520);
      doc.text(lines, margin, 90);
      doc.save('passive-income-checklist.pdf');

      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Free checklist: Start your first experiment</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Enter your email and get a one-page checklist (PDF) with outreach scripts and the 6-step promo plan.</p>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-3">
        <input
          aria-label="Email address"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#FF2B2B]"
        />
        <button
          type="submit"
          className="rounded-lg bg-[#FF2B2B] px-4 py-2 text-white font-semibold disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Sending…' : 'Get checklist'}
        </button>
      </form>
      {status === 'success' && <p className="mt-3 text-sm text-emerald-600">Checklist downloaded — check your downloads folder.</p>}
      {status === 'error' && <p className="mt-3 text-sm text-rose-600">Something went wrong — try again or email us directly.</p>}
    </div>
  );
}
