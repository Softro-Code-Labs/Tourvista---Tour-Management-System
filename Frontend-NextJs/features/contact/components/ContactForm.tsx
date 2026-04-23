'use client';

import { useContactForm } from '../hooks/useContactForm';
import PrimaryButton from '@/components/common/PrimaryButton';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const CONTACT_INFO = [
  { icon: <Phone size={18} />, text: '+94 77 914 1298', label: 'Call us' },
  {
    icon: <Mail size={18} />,
    text: 'info@tourvistatours.com',
    label: 'Email us',
  },
  { icon: <MapPin size={18} />, text: 'Galle, Sri Lanka', label: 'Visit us' },
];

const FORM_FIELDS = [
  { name: 'name', placeholder: 'Your Name', type: 'text' },
  { name: 'email', placeholder: 'Your Email', type: 'email' },
  { name: 'subject', placeholder: 'Subject', type: 'text' },
  {
    name: 'message',
    placeholder: 'Tell us about your dream trip...',
    type: 'textarea',
    rows: 4,
  },
] as const;

export default function ContactForm() {
  const { form, loading, handleChange, handleSubmit } = useContactForm();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white dark:bg-[#030712] transition-colors duration-500 overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Decor - Adaptive Opacity */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 dark:bg-blue-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/5 dark:bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>

      {/* IMAGE OVERLAY */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-10 bg-cover bg-center grayscale"
        style={{ backgroundImage: "url('/images/contact.jpg')" }}
      />

      <div className="relative z-10 w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT SIDE: CONTENT INFO */}
          <div className="lg:col-span-5 space-y-8 text-center lg:text-left">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/10 dark:bg-blue-500/10 border border-blue-600/20 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
                Contact TourVista
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Let's Plan Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-cyan-300">
                  Next Adventure
                </span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-6 text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Have questions about destinations, custom itineraries, or travel
                logistics? Reach out and our Sri Lankan travel experts will
                guide you.
              </p>
            </div>

            {/* CONTACT QUICK LINKS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 max-w-2xl mx-auto lg:mx-0">
              {CONTACT_INFO.map((info, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-xl transition-all hover:shadow-lg dark:hover:shadow-none hover:scale-[1.02]"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 dark:bg-blue-600/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                    {info.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
                      {info.label}
                    </p>
                    <p className="text-slate-700 dark:text-slate-200 font-medium text-sm sm:text-base">
                      {info.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: THE FORM */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-white/[0.03] backdrop-blur-3xl border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-6 sm:p-10 shadow-xl dark:shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 dark:bg-blue-500/10 blur-3xl -z-10" />

              <h2 className="text-slate-900 dark:text-white text-2xl font-bold mb-8 flex items-center gap-2">
                Send a Message{' '}
                <Send size={20} className="text-blue-600 dark:text-blue-500" />
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {FORM_FIELDS.slice(0, 2).map((field) => (
                    <input
                      key={field.name}
                      type={field.type}
                      name={field.name}
                      value={form[field.name as keyof typeof form]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white dark:focus:bg-white/10 transition-all"
                      required
                    />
                  ))}
                </div>

                {FORM_FIELDS.slice(2).map((field) =>
                  field.type === 'textarea' ? (
                    <textarea
                      key={field.name}
                      name={field.name}
                      rows={field.rows}
                      value={form[field.name as keyof typeof form]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white dark:focus:bg-white/10 transition-all resize-none"
                      required
                    />
                  ) : (
                    <input
                      key={field.name}
                      type={field.type}
                      name={field.name}
                      value={form[field.name as keyof typeof form]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white dark:focus:bg-white/10 transition-all"
                      required
                    />
                  ),
                )}

                <div className="pt-2">
                  <PrimaryButton type="submit" loading={loading}>
                    Send It Now ✈️
                  </PrimaryButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
