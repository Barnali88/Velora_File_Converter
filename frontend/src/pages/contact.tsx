import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { api } from '@/api/client';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all fields before sending.');
      return;
    }

    try {
      setIsSending(true);

      const response = await api.post('/contact/send', {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      setSuccessMessage(
        response.data?.message || 'Your message has been sent successfully.'
      );
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error: any) {
      setErrorMessage(
        error?.response?.data?.detail ||
          error?.response?.data?.message ||
          'Something went wrong while sending your message.'
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <section className="rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-soft dark:border-white/10 dark:bg-white/5">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.24em] text-velora-violet">
          Contact
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">
          Let people reach the team simply
        </h1>
        <p className="mt-4 max-w-3xl text-slate-600 dark:text-slate-300">
          Have a question about a conversion, found an issue, or want to share feedback?
          Use the contact options below to reach the Velora team clearly and quickly.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.22 }}
            className="group rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-soft transition dark:border-white/10 dark:bg-white/5"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-velora-violet to-velora-cyan text-white shadow-soft transition group-hover:shadow-glow">
              <Mail size={20} />
            </div>
            <h2 className="text-xl font-semibold">Support email</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              For technical issues, failed conversions, or help using a tool.
            </p>
            <a
              href="mailto:support@velora.app?subject=Velora Support Request"
              className="mt-4 inline-block text-sm font-medium text-velora-violet transition hover:underline"
            >
              support@velora.app
            </a>
          </motion.div>

          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.22 }}
            className="group rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-soft transition dark:border-white/10 dark:bg-white/5"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-300 text-white shadow-soft transition group-hover:shadow-[0_0_28px_rgba(251,191,36,0.28)]">
              <MessageSquare size={20} />
            </div>
            <h2 className="text-xl font-semibold">Product questions</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Not sure which tool to use, which format is best, or how to keep better quality?
              Send your question and we will guide you.
            </p>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Suggested response time: within 1–2 business days.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.22 }}
            className="group rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-soft transition dark:border-white/10 dark:bg-white/5"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 text-white shadow-soft transition group-hover:shadow-[0_0_28px_rgba(52,211,153,0.26)]">
              <Sparkles size={20} />
            </div>
            <h2 className="text-xl font-semibold">Quick tips</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              <li>• Mention the tool you used.</li>
              <li>• Mention the file type and selected output format.</li>
              <li>• Keep your message short and clear for faster support.</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.22 }}
          className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-soft dark:border-white/10 dark:bg-white/5"
        >
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-400 to-velora-violet text-white shadow-soft">
            <Send size={20} />
          </div>

          <h2 className="text-2xl font-semibold">Send feedback</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            This short form lets users share feedback, ask questions, or report an issue.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium">Your name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm shadow-soft outline-none transition focus:border-velora-violet dark:border-white/10 dark:bg-white/5"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm shadow-soft outline-none transition focus:border-velora-violet dark:border-white/10 dark:bg-white/5"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Message</label>
              <textarea
                rows={6}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us your issue, question, or feedback..."
                className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm shadow-soft outline-none transition focus:border-velora-violet dark:border-white/10 dark:bg-white/5"
              />
            </div>

            {successMessage && (
              <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                <CheckCircle2 size={16} />
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSending}
              className="inline-flex items-center gap-2 rounded-2xl bg-velora-violet px-5 py-3 text-sm font-medium text-white shadow-glow transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Send size={16} />
              {isSending ? 'Sending...' : 'Send message'}
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}