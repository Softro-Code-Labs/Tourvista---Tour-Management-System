'use client';

import { useContactForm } from '../hooks/useContactForm';
import PrimaryButton from '@/components/common/PrimaryButton';
import { Phone, Mail, MapPin, Send, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const CONTACT_INFO = [
  { icon: <Phone size={18} />, text: '+94 77 914 1298', label: 'Call us' },
  {
    icon: <Mail size={18} />,
    text: 'info@tourvistatours.com',
    label: 'Email us',
  },
  { icon: <MapPin size={18} />, text: 'Galle, Sri Lanka', label: 'Visit us' },
];

export default function ContactForm() {
  const { methods, onSubmit, loading } = useContactForm();
  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#fcfcfd] dark:bg-[#030712] transition-colors duration-500 overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
      {/* BACKGROUND DECOR */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 dark:bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/5 dark:bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* LEFT SIDE: BRANDING */}
          <div className="lg:col-span-5 space-y-10 text-center lg:text-left">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-600 dark:text-blue-400">
                <Sparkles size={14} className="animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Contact Studio
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9]">
                Let's Plan Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  Next Adventure
                </span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-lg max-w-md mx-auto lg:mx-0 font-medium leading-relaxed">
                Reach out and our Sri Lankan travel experts will guide you
                through custom itineraries and logistics.
              </p>
            </div>

            {/* CONTACT CARDS */}
            <div className="grid grid-cols-1 gap-4 max-w-md mx-auto lg:mx-0">
              {CONTACT_INFO.map((info, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-5 p-5 rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10 shadow-sm transition-all hover:shadow-xl hover:scale-[1.02]"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                    {info.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.15em] mb-0.5">
                      {info.label}
                    </p>
                    <p className="text-slate-800 dark:text-slate-200 font-bold">
                      {info.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: THE STUDIO FORM */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900/50 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[3rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
              <h2 className="text-slate-900 dark:text-white text-2xl font-black mb-10 flex items-center gap-3">
                Send a Message <Send size={24} className="text-blue-600" />
              </h2>

              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormInput
                    label="Full Name"
                    register={register('name')}
                    error={errors.name?.message}
                    placeholder="Enter your name"
                  />
                  <FormInput
                    label="Email Address"
                    type="email"
                    register={register('email')}
                    error={errors.email?.message}
                    placeholder="hello@example.com"
                  />
                </div>

                <FormInput
                  label="Subject"
                  register={register('subject')}
                  error={errors.subject?.message}
                  placeholder="How can we help?"
                />

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                    Message
                  </label>
                  <textarea
                    {...register('message')}
                    rows={5}
                    placeholder="Tell us about your dream trip..."
                    className={cn(
                      'w-full px-6 py-4 rounded-[1.5rem] bg-slate-50 dark:bg-white/5 border text-slate-900 dark:text-white outline-none transition-all resize-none font-medium',
                      errors.message
                        ? 'border-red-500 focus:ring-red-500/10'
                        : 'border-slate-100 dark:border-white/10 focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/50',
                    )}
                  />
                  {errors.message && (
                    <p className="text-[10px] font-bold text-red-500 ml-2 uppercase tracking-tight">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <div className="pt-4">
                  <PrimaryButton
                    type="submit"
                    size="lg"
                    fullWidth={true}
                    loading={loading}
                    className="rounded-[1.5rem] h-16 text-base font-black shadow-blue-500/20 active:scale-95"
                  >
                    Launch Inquiry ✈️
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

// SUB-COMPONENT FOR FORM INPUTS
function FormInput({
  label,
  type = 'text',
  register,
  error,
  placeholder,
}: any) {
  return (
    <div className="space-y-2 flex-1">
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
        {label}
      </label>
      <input
        type={type}
        {...register}
        placeholder={placeholder}
        className={cn(
          'w-full h-14 px-6 rounded-[1.25rem] bg-slate-50 dark:bg-white/5 border text-slate-900 dark:text-white outline-none transition-all font-medium',
          error
            ? 'border-red-500 focus:ring-red-500/10'
            : 'border-slate-100 dark:border-white/10 focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/50',
        )}
      />
      {error && (
        <p className="text-[10px] font-bold text-red-500 ml-2 uppercase tracking-tight">
          {error}
        </p>
      )}
    </div>
  );
}
