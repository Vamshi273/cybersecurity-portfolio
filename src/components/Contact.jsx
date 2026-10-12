import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const ref = useRef(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    permission: false,
  });

  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('');
  const [isSending, setIsSending] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    ['-10%', '20%']
  );

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;

    setFormData((previous) => ({
      ...previous,
      [id]: type === 'checkbox' ? checked : value,
    }));

    if (status) {
      setStatus('');
      setStatusType('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSending) return;

    if (!formData.permission) {
      setStatus('Please give permission to contact you.');
      setStatusType('error');
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus(
        'Email service is not configured. Please check your environment variables.'
      );
      setStatusType('error');
      return;
    }

    const emailData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    };

    if (
      !emailData.firstName ||
      !emailData.lastName ||
      !emailData.email ||
      !emailData.message
    ) {
      setStatus('Please complete all required fields.');
      setStatusType('error');
      return;
    }

    setIsSending(true);
    setStatus('');
    setStatusType('');

    try {
      await emailjs.send(
        serviceId,
        templateId,
        emailData,
        { publicKey }
      );

      setStatus(
        'Message sent successfully! Thank you for reaching out.'
      );
      setStatusType('success');

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        permission: false,
      });
    } catch (error) {
      console.error('EmailJS submission failed:', error);

      setStatus(
        'Unable to send your message. Please try again later.'
      );
      setStatusType('error');
    } finally {
      setIsSending(false);
    }
  };

  const inputClass =
    'w-full bg-transparent border-b border-white/15 pb-4 text-base md:text-lg text-white placeholder-white/35 focus:outline-none focus:border-sky-400 transition-colors duration-300 rounded-none';

  return (
    <section
      ref={ref}
      id="contact"
      aria-labelledby="contact-heading"
      className="relative flex min-h-screen w-full items-end overflow-hidden border-t border-white/10 bg-[#05080d] px-4 pt-28 pb-0 sm:px-6 md:px-10"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-sky-500/10 blur-[120px]" />

      <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-emerald-500/[0.07] blur-[140px]" />

      {/* Animated background title */}
      <motion.div
        style={{ y: backgroundY }}
        className="pointer-events-none absolute inset-x-0 top-0 z-0 flex justify-center overflow-hidden pt-16 opacity-[0.045] md:pt-20"
        aria-hidden="true"
      >
        <h2 className="select-none whitespace-nowrap text-[27vw] font-black uppercase leading-none tracking-tighter text-sky-300">
          CONTACT
        </h2>
      </motion.div>

      {/* Contact panel */}
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative ml-auto w-full overflow-hidden rounded-t-3xl border border-white/10 bg-[#0b111b]/95 p-6 text-white shadow-[0_-20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8 md:w-[94%] md:rounded-tl-[3rem] md:rounded-tr-none md:p-12 lg:w-[88%] lg:p-16"
        >
          {/* Top accent */}
          <div className="absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-400 to-emerald-400" />

          {/* Decorative corner */}
          <div className="pointer-events-none absolute top-0 right-0 h-40 w-40 bg-gradient-to-bl from-sky-400/[0.06] to-transparent" />

          {/* Section header */}
          <div className="relative mb-10 flex flex-col justify-between gap-5 sm:mb-14 md:flex-row md:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300 sm:text-xs">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>

                <span>System Online // Contact</span>
              </div>

              <h2
                id="contact-heading"
                className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl"
              >
                LET&apos;S{' '}
                <span className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
                  CONNECT.
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                Have a project, cybersecurity opportunity, or collaboration
                in mind? Send a message and let&apos;s discuss it.
              </p>
            </div>

            <div className="hidden text-right font-mono text-xs leading-6 text-slate-500 md:block">
              <p>CONNECTION_STATUS: READY</p>
              <p>CHANNEL: CONTACT_FORM</p>
              <p className="text-emerald-400/80">
                EMAIL_SERVICE: CONFIGURED*
              </p>
            </div>
          </div>

          {/* Contact form */}
          <form
            onSubmit={handleSubmit}
            className="relative flex flex-col gap-9 md:gap-12"
          >
            <div className="grid grid-cols-1 gap-9 md:grid-cols-2 md:gap-12">
              {/* First name */}
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="firstName"
                  className="font-mono text-xs uppercase tracking-widest text-slate-400"
                >
                  First Name <span className="text-sky-400">*</span>
                </label>

                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  autoComplete="given-name"
                  maxLength={60}
                  required
                  disabled={isSending}
                  className={inputClass}
                />
              </div>

              {/* Last name */}
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="lastName"
                  className="font-mono text-xs uppercase tracking-widest text-slate-400"
                >
                  Last Name <span className="text-sky-400">*</span>
                </label>

                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  autoComplete="family-name"
                  maxLength={60}
                  required
                  disabled={isSending}
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="email"
                  className="font-mono text-xs uppercase tracking-widest text-slate-400"
                >
                  Email Address <span className="text-sky-400">*</span>
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  maxLength={254}
                  required
                  disabled={isSending}
                  className={inputClass}
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="message"
                  className="font-mono text-xs uppercase tracking-widest text-slate-400"
                >
                  Your Message <span className="text-sky-400">*</span>
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your idea or opportunity..."
                  rows={3}
                  maxLength={3000}
                  required
                  disabled={isSending}
                  className={`${inputClass} min-h-24 resize-y`}
                />

                <span className="text-right font-mono text-[10px] text-slate-500">
                  {formData.message.length}/3000
                </span>
              </div>
            </div>

            {/* Bottom section */}
            <div className="grid grid-cols-1 gap-8 border-t border-white/10 pt-8 md:grid-cols-2 md:gap-12">
              <div>
                <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-slate-400">
                  <input
                    type="checkbox"
                    id="permission"
                    name="permission"
                    checked={formData.permission}
                    onChange={handleChange}
                    required
                    disabled={isSending}
                    className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-sky-400"
                  />

                  <span>
                    I agree to be contacted about my message using the email
                    address provided.
                  </span>
                </label>

                <p className="mt-5 max-w-sm text-xs leading-6 text-slate-500">
                  Your information will be used to respond to your enquiry.
                  Please avoid submitting passwords or other sensitive
                  information.
                </p>
              </div>

              <div className="flex flex-col justify-between gap-6">
                <p className="text-sm leading-6 text-slate-400">
                  Ready to start a conversation? Send a signal.
                </p>

                <button
                  type="submit"
                  disabled={isSending}
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-lg border border-sky-300/20 bg-gradient-to-r from-sky-500 to-emerald-500 px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#041019] shadow-[0_0_25px_rgba(56,189,248,0.12)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(56,189,248,0.25)] focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-[#0b111b] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                >
                  <span>
                    {isSending ? 'Sending Message...' : 'Send Message'}
                  </span>

                  {isSending ? (
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 17L17 7M7 7h10v10"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Form status */}
            {status && (
              <motion.div
                key={status}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                role="status"
                aria-live="polite"
                className={`rounded-lg border px-4 py-3 text-sm leading-6 ${
                  statusType === 'success'
                    ? 'border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-200'
                    : 'border-red-400/20 bg-red-400/[0.06] text-red-200'
                }`}
              >
                {status}
              </motion.div>
            )}
          </form>

          {/* Panel footer */}
          <div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/[0.07] pt-5 font-mono text-[10px] uppercase tracking-widest text-slate-600 sm:flex-row">
            <span>Contact Interface // v2.0</span>
            <span>React · Framer Motion · EmailJS</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

