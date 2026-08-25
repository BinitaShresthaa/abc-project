"use client";

import { useState, type FormEvent } from "react";

export default function FeedbackForm() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire this up to your API route / email service.
    console.log({ email, message });
    setSubmitted(true);
    setEmail("");
    setMessage("");
  }

  return (
    <div className="grid overflow-hidden rounded-2xl border border-slate-200 shadow-sm lg:grid-cols-[0.85fr_1.15fr]">
      {/* Info side */}
      <div className="relative flex flex-col justify-between bg-primary p-8 text-white sm:p-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,.8) 1.4px, transparent 1.4px)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="relative">
          <h3 className="font-quicksand text-2xl font-semibold">Share your feedback</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            Your feedback helps us improve our academic services and campus
            life. Tell us what&rsquo;s working, and what isn&rsquo;t.
          </p>
        </div>
        <div className="relative mt-8 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm text-white/90">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>+977-065-560XXX</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/90">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>info@aadikavicampus.edu.np</span>
          </div>
        </div>
      </div>

      {/* Form side */}
      <form onSubmit={handleSubmit} className="bg-white p-8 sm:p-10">
        <div className="mb-5">
          <label className="mb-1.5 block text-sm font-semibold text-primary">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john.doe@example.com"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-colors focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="mb-5">
          <label className="mb-1.5 block text-sm font-semibold text-primary">
            Message
          </label>
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="How can we help you?"
            rows={4}
            className="w-full resize-y rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-colors focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <button
  type="submit"
  className="w-full rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
  style={{ backgroundColor: "#0E9F6E" }}
  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0C8A5F")}
  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0E9F6E")}
>
  Submit Feedback
</button>
        <p className="mt-3 text-xs text-slate-500">
          {submitted
            ? "Thank you — your feedback has been received."
            : ""}
        </p>
      </form>
    </div>
  );
}