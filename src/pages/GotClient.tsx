import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import brochurePdf from '../assets/microsite-affiliate-brochure.pdf';

import {
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Target,
  FileDown,
  Ban,
  Building2,
  Store,
  GraduationCap,
  Palette,
  Leaf,
  Shield,
  Handshake,
  Wallet,
  TrendingUp,
  MousePointer,
} from 'lucide-react';

const serviceOptions = ['Website', 'Branding', 'Digital Marketing', 'Ads', 'Other'];
const budgetOptions = ['Below ₹10K', '₹10K - ₹25K', '₹25K - ₹50K', '₹50K - ₹1L', '₹1L+'];
const steps = [
  {
    title: 'Submit Details',
    description: 'Share the lead with basic contact info. Done in under a minute.',
  },
  {
    title: 'We Confirm & Close',
    description: 'We verify, loop you into the client × Microsite WhatsApp group, and start closing.',
  },
  {
    title: 'You Get Paid',
    description: 'Invoice clears → 30% hits your UPI/bank within 24 hours.',
  },
];

const phoneRegex = /^\d{10}$/;
const inputClass = 'w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:border-[#FF2B2B] focus:ring-2 focus:ring-[#FF2B2B]/30 transition bg-white placeholder:text-neutral-500';
const brochureUrl = brochurePdf;

export default function GotClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [leadSummary, setLeadSummary] = useState<{ id: string; affiliate: string; client: string } | null>(null);

  const trustPoints = useMemo(
    () => [
      'You earn 30% of every rupee we collect from the client.',
      'If we close the client inside 45 days, your payout is locked in.',
      'We send updates via email and WhatsApp so you always know the status.',
      'Payouts are released via UPI or bank transfer—no delays or hidden clauses.',
    ],
    []
  );

  const idealSegments = useMemo(
    () => [
      { title: 'Clinics & Wellness', subtitle: 'Consults, therapy, salons', icon: Building2 },
      { title: 'Retail & D2C', subtitle: 'Stores, launches, pop-ups', icon: Store },
      { title: 'Educators & Coaches', subtitle: 'Courses, bootcamps, cohorts', icon: GraduationCap },
      { title: 'Studios & Creators', subtitle: 'Agencies, photographers, makers', icon: Palette },
    ],
    []
  );

  const greenProjects = useMemo(
    () => ['Business & portfolio sites', 'Launch / ad landing pages', 'Starter e-com & branding kits'],
    []
  );

  const notAFit = useMemo(
    () => ['Complex apps/dashboards', 'Advanced marketplaces', 'No-budget or unclear leads'],
    []
  );

  const psychologyPoints = useMemo(
    () => [
      {
        title: 'Helper, Not Seller',
        description: 'Lead with empathy, untangle problems, stay consultative.',
        icon: Handshake,
      },
      {
        title: 'Trust Is The Product',
        description: 'Personalize outreach, be human, and do homework before pitching.',
        icon: Shield,
      },
      {
        title: 'Pay After Delivery',
        description: 'Remove risk every time—use it in decks, calls, and follow-ups.',
        icon: Wallet,
      },
      {
        title: 'Sell Outcomes',
        description: 'Talk bookings, polish, and advantage—not just “a website.”',
        icon: TrendingUp,
      },
      {
        title: 'Micro-Commitments',
        description: 'Ask for 2 minutes, a link share, or a 5-min call over “the sale.”',
        icon: MousePointer,
      },
    ],
    []
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const affiliateName = formData.get('affiliateName')?.toString().trim() || 'Affiliate Partner';
    const affiliateEmail = formData.get('affiliateEmail')?.toString().trim();
    const affiliateWhatsApp = formData.get('affiliateWhatsapp')?.toString().trim();
    const clientName = formData.get('clientName')?.toString().trim() || 'Client Lead';
    const clientPhone = formData.get('clientPhone')?.toString().trim();
    const clientEmail = formData.get('clientEmail')?.toString().trim();

    if (!affiliateEmail || !clientEmail) {
      setFeedback({ type: 'error', message: 'Please add both your email and the client\'s email address.' });
      return;
    }

    if (!affiliateWhatsApp || !phoneRegex.test(affiliateWhatsApp)) {
      setFeedback({ type: 'error', message: 'Enter a valid 10-digit WhatsApp number so we can add you quickly.' });
      return;
    }

    if (!clientPhone || !phoneRegex.test(clientPhone)) {
      setFeedback({ type: 'error', message: 'Client phone number must be 10 digits.' });
      return;
    }

    if (formData.get('verification') !== 'on') {
      setFeedback({ type: 'error', message: 'Please confirm this lead is genuine to continue.' });
      return;
    }

    const leadId = `MS-AFF-${Date.now().toString().slice(-6)}`;
    const autoresponse = `Thanks for submitting a lead to Microsite Studio!\n\nLead ID: ${leadId}\nAffiliate: ${affiliateName}\nClient: ${clientName}\n\nNext Steps:\n• Our team will reach your client within 6–12 hours.\n• We will add you to the shared WhatsApp group shortly.\n• You earn 30% of the invoice we collect inside 45 days.\n\nPayments go via UPI/bank transfer. Need help? WhatsApp +91-9060868026.\n\n— Microsite Studio`;

    formData.append('lead_id', leadId);
    formData.append('_subject', `New affiliate lead · ${leadId}`);
    formData.append('_cc', 'skumarnaveen1442@gmail.com');
    formData.append('_captcha', 'false');
    formData.append('_template', 'box');
    formData.append('_autoresponse', autoresponse);

    try {
      setIsSubmitting(true);
      const response = await fetch('https://formsubmit.co/ajax/kirpesh54@gmail.com', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to send lead');
      }

      form.reset();
      setLeadSummary({ id: leadId, affiliate: affiliateName, client: clientName });
      setFeedback({ type: 'success', message: '🎉 Lead received! We have logged your lead ID and will update you within 6–12 hours.' });
    } catch (error) {
      console.error('Affiliate lead submission failed', error);
      setFeedback({ type: 'error', message: 'Something went wrong while sending the lead. Please try again or WhatsApp +91-9060868026.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen pt-16 md:pt-0 pb-24">
      <Helmet>
        <title>Got a Client? Submit Affiliate Lead | Microsite Studio</title>
        <meta
          name="description"
          content="Submit client leads and earn 30% commission with Microsite Studio. Fast affiliate payouts, WhatsApp updates, and transparent tracking."
        />
        <link rel="canonical" href="https://micro-site.studio/got-client" />
      </Helmet>

      <section className="pt-8 md:pt-0 pb-24">
        <div className="bg-neutral-900/85 border-y border-white/10 px-6 py-10 md:py-16">
          <div className="max-w-5xl mx-auto text-center space-y-4">
            <p className="text-xs uppercase tracking-[0.45em] text-[#FF2B2B]">Affiliate Desk</p>
            <h1 className="text-3xl md:text-5xl font-black leading-tight text-white">
              ⭐ Got a Client? Submit & Earn 30% Commission
            </h1>
            <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
              Bring us a client → we close → you earn. Submit the lead, hop into the shared WhatsApp group, and get paid the moment the invoice clears.
            </p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto text-center px-6 mt-10">
          <div className="flex flex-col md:flex-row justify-center gap-3 text-sm font-semibold">
            {['30% revenue share', 'Updates in 6–12 hours', 'Payouts within 24 hours'].map(badge => (
              <span key={badge} className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2 text-white/80">
                {badge}
              </span>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-left mt-10">
            {[
              'Drop the lead. We take over the calls, decks, and closing.',
              'You sit inside the client × Microsite WhatsApp group for transparency.',
              'You receive 30% in your UPI/bank as soon as payment hits.',
            ].map(point => (
              <div key={point} className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-2">
                <CheckCircle2 className="w-5 h-5 text-[#FF2B2B]" />
                <p className="text-sm text-gray-300 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => document.getElementById('affiliate-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-[#FF2B2B] text-white px-6 py-3 rounded-full font-semibold text-sm tracking-wide hover:bg-red-600 transition-colors mt-10"
          >
            Submit Lead
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <section className="px-6 py-20 bg-neutral-950" id="section-1">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-[#FF2B2B]">Section 01</p>
            <h2 className="text-3xl font-black">Our Ideal Customer</h2>
            <p className="text-sm md:text-base text-gray-300">SMBs that need a trustworthy site in days, not months. Share this snapshot so we can close alongside you.</p>
          </div>

          <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-8 items-start">
            <div className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <Target className="w-6 h-6 text-[#FF2B2B]" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-white/60">Our Ideal Customer</p>
                    <h3 className="text-2xl font-semibold">SMBs ready to launch inside 30 days</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-300">
                  We close fastest for small and medium businesses who need instant credibility, clear messaging, and a simple way to start taking bookings or sales.
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {idealSegments.map(segment => (
                    <div key={segment.title} className="rounded-2xl border border-white/5 bg-black/20 p-4 flex flex-col gap-2">
                      <segment.icon className="w-6 h-6 text-[#FF2B2B]" />
                      <div>
                        <p className="text-sm font-semibold">{segment.title}</p>
                        <p className="text-xs text-gray-400">{segment.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Leaf className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg font-semibold">Green Projects</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-300">
                    {greenProjects.map(project => (
                      <li key={project} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
                        <span>{project}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Ban className="w-5 h-5 text-red-400" />
                    <h3 className="text-lg font-semibold">Not a Fit</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-300">
                    {notAFit.map(item => (
                      <li key={item} className="flex gap-3">
                        <span className="text-red-400">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-[#FF2B2B]">Careers</p>
                    <h3 className="text-2xl font-semibold">Want to work with us?</h3>
                    <p className="text-sm text-gray-300 mt-2">Mail your CV to <a href="mailto:contact@micro-site.studio" className="text-white underline decoration-[#FF2B2B] decoration-2">contact@micro-site.studio</a>.</p>
                  </div>
                  <div className="bg-black/30 rounded-2xl border border-white/10 p-4 text-left min-w-[220px]">
                    <p className="text-xs uppercase tracking-[0.35em] text-white/60 mb-2">Open Roles</p>
                    <ul className="space-y-2 text-sm text-gray-200">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#FF2B2B]" /> Digital Marketing Intern
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#FF2B2B]" /> Growth & Strategy Intern
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <FileDown className="w-5 h-5 text-[#FF2B2B]" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-white/60">Client kit</p>
                    <h3 className="text-xl font-semibold">🎁 Download our brochure</h3>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-300 mb-4">
                  <li>Explains services, pricing, and proof-of-work.</li>
                  <li>Perfect for cold DMs, WhatsApp, or email intros.</li>
                  <li>Download once, forward unlimited times.</li>
                </ul>
                <a
                  href={brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="microsite-affiliate-brochure.pdf"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white hover:text-neutral-900 transition-colors"
                >
                  <FileDown className="w-4 h-4" /> Download Brochure (PDF)
                </a>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-5">
                  <Shield className="w-5 h-5 text-[#FF2B2B]" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-white/60">Customer psychology</p>
                    <h3 className="text-xl font-semibold">Pitch principles</h3>
                  </div>
                </div>
                <div className="space-y-4 text-left">
                  {psychologyPoints.map(point => (
                    <div key={point.title} className="flex gap-3">
                      <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#FF2B2B]">
                        <point.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{point.title}</p>
                        <p className="text-sm text-gray-300 leading-relaxed">{point.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-black" id="section-2">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] text-[#FF2B2B]">Section 02</p>
            <h2 className="text-3xl font-black">How the 30% payout works</h2>
            <p className="text-sm text-gray-400">Three steps, zero confusion.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm p-6 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FF2B2B]/20 text-sm font-bold text-[#FF2B2B]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-neutral-950" id="section-3">
        <div className="text-center space-y-2 mb-12">
          <p className="text-xs uppercase tracking-[0.35em] text-[#FF2B2B]">Section 03</p>
          <h2 className="text-3xl font-black">Submit your lead & track the deal</h2>
          <p className="text-sm text-gray-400">Fill the form, agree to the terms, and you’re instantly in our payout pipeline.</p>
        </div>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.15fr_.85fr] gap-10 items-start" id="affiliate-form">
          <div className="bg-white text-gray-900 rounded-3xl shadow-2xl shadow-[#FF2B2B]/10 p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[#FF2B2B]">Lead Submission</p>
                <h2 className="text-2xl md:text-3xl font-black text-neutral-900">Submit your lead & lock 30%</h2>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-neutral-700 bg-neutral-100 px-4 py-2 rounded-full">
                <ShieldCheck className="w-4 h-4 text-[#FF2B2B]" /> Protected pipeline
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-3 mb-8 text-sm text-neutral-600">
              {['Need: your info + client basics', 'We reply inside 6–12 hours', 'You stay looped via WhatsApp'].map(note => (
                <div key={note} className="rounded-2xl border border-neutral-100 px-4 py-3 bg-neutral-50 text-center">
                  {note}
                </div>
              ))}
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#FF2B2B]" /> Your Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input name="affiliateName" required placeholder="Your Name" className={inputClass} />
                  <input type="email" name="affiliateEmail" required placeholder="Your Email" className={inputClass} />
                  <input
                    type="tel"
                    name="affiliateWhatsapp"
                    placeholder="WhatsApp Number"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#FF2B2B]" /> Client Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input name="clientName" required placeholder="Client Name" className={inputClass} />
                  <input name="clientBusiness" placeholder="Client Business (optional)" className={inputClass} />
                  <input
                    type="tel"
                    name="clientPhone"
                    placeholder="Client Phone"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    required
                    className={inputClass}
                  />
                  <input type="email" name="clientEmail" required placeholder="Client Email" className={inputClass} />
                  <select name="service" required className={inputClass}>
                    <option value="">Service They Want</option>
                    {serviceOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <select name="budget" required className={inputClass}>
                    <option value="">Budget Range</option>
                    {budgetOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <textarea name="notes" rows={4} placeholder="Additional notes (context, deadlines, etc.)" className={inputClass} />
              </div>

              <div className="flex items-start gap-3 text-sm text-neutral-700">
                <input type="checkbox" name="verification" id="verification" className="mt-1" required />
                <label htmlFor="verification" className="leading-relaxed">
                  I confirm this is a genuine lead and I agree to the 30% commission terms.
                </label>
              </div>

              {feedback && (
                <div
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
                    feedback.type === 'success'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                      : 'bg-red-50 border-red-200 text-red-600'
                  }`}
                >
                  {feedback.message}
                </div>
              )}

              {leadSummary && (
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
                  <p className="font-semibold text-neutral-900">Lead ID: {leadSummary.id}</p>
                  <p className="mt-1">Affiliate: {leadSummary.affiliate}</p>
                  <p>Client: {leadSummary.client}</p>
                  <p className="mt-2 text-xs text-neutral-500">We have saved this summary and will add you to the shared WhatsApp group shortly.</p>
                  <a
                    href="https://wa.me/919060868026"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-[#FF2B2B] font-semibold"
                  >
                    <MessageCircle className="w-4 h-4" /> Message us if you want to share more info
                  </a>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#FF2B2B] text-white py-4 rounded-2xl font-semibold text-lg hover:bg-red-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting…' : 'Submit Lead & Earn 30%'}
                {!isSubmitting && <ArrowRight className="w-5 h-5" />}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-6 h-6 text-[#FF2B2B]" />
                <h3 className="text-xl font-semibold">Commission Terms</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-300">
                {trustPoints.map(point => (
                  <li key={point} className="flex items-baseline gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF2B2B] mt-1" />
                    <p className="leading-relaxed">{point}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#FF2B2B]/25 via-transparent to-transparent p-6">
              <h3 className="text-xl font-semibold mb-3">Need help?</h3>
              <p className="text-sm text-gray-200 mb-4">WhatsApp the partner desk anytime and we\'ll help you close faster.</p>
              <a
                href="https://wa.me/919060868026"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-semibold hover:bg-white hover:text-neutral-900 transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> +91 90608 68026
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-black">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <p className="text-xs uppercase tracking-[0.45em] text-[#FF2B2B]">Ready to submit?</p>
          <h2 className="text-3xl md:text-4xl font-black">Bring us the lead. We’ll handle the rest.</h2>
          <p className="text-base text-gray-300 max-w-3xl mx-auto">
            Drop the details, stay in the WhatsApp loop, and get paid the moment the invoice clears. We reply inside 6–12 hours.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button
              onClick={() => document.getElementById('affiliate-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-[#FF2B2B] text-white px-6 py-3 rounded-full font-semibold text-sm tracking-wide hover:bg-red-600 transition-colors"
            >
              Submit Lead Now
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="https://wa.me/919060868026"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white hover:text-neutral-900 transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp Partner Desk
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
