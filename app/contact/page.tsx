'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import PrimaryButton from '../components/ui/PrimaryButton';
import { send } from 'process';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  // Get current date and time in Sri Lanka timezone
  const now = new Date();
  const date = now.toLocaleDateString('en-CA', {
    timeZone: 'Asia/Colombo',
  }); // YYYY-MM-DD

  const time = now.toLocaleTimeString('en-GB', {
    timeZone: 'Asia/Colombo',
    hour: '2-digit',
    minute: '2-digit',
  }); // HH:mm

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    if (!form.email.trim()) {
      toast.error('Please enter your email');
      return;
    }

    if (!form.subject.trim()) {
      toast.error('Please enter a subject');
      return;
    }

    if (!form.message.trim()) {
      toast.error('Please enter your message');
      return;
    }

    setLoading(true);

    const url = process.env.NEXT_PUBLIC_SHEETY_URL!;

    const body = {
      sheet1: {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        date: date,
        time: time,
      },
    };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('Failed');

      toast.success('Message sent successfully ✈️');

      setForm({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again later. 😞');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0b1220] overflow-hidden px-4">
      {/* glow background (same hero style) */}
      <div className="absolute inset-0">
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-blue-600/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full" />
      </div>

      {/* contact image overlay */}
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d')",
        }}
      />
      <div className="relative z-10 w-full max-w-5xl grid md:grid-cols-2 gap-10">
        {/* LEFT SIDE - INFO */}
        <div className="text-white">
          <p className="text-blue-400 tracking-widest uppercase text-sm">
            Contact TourVista
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            Let's Plan Your Next Adventure 🌍
          </h1>

          <p className="text-gray-300 mt-4 leading-relaxed">
            Have questions about destinations, tours, or travel planning? Send
            us a message and we'll respond quickly.
          </p>

          <div className="mt-8 space-y-4 text-gray-300 text-sm">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              📞 +94 123 456 789
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              ✉️ info@tourvista.com
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              📍 Colombo, Sri Lanka
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
          <h2 className="text-white text-2xl font-semibold mb-6">
            Send a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-xl bg-white/90 text-black outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-xl bg-white/90 text-black outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full px-4 py-3 rounded-xl bg-white/90 text-black outline-none focus:ring-2 focus:ring-blue-400"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message..."
              rows={5}
              className="w-full px-4 py-3 rounded-xl bg-white/90 text-black outline-none focus:ring-2 focus:ring-blue-400"
            />

            <PrimaryButton type="submit" loading={loading}>
              Send Message ✈️
            </PrimaryButton>
          </form>
        </div>
      </div>
    </section>
  );
}
