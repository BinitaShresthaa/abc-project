'use client';

import { useState } from 'react';
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
});

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main
      className={`${quicksand.className} min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_20%_15%,#F2F8FC_0%,#E7F1F8_55%,#DCEBF5_100%)] p-6`}
    >
      <div className="relative flex flex-col md:flex-row w-full max-w-[920px] min-h-[560px] bg-white rounded-[32px] shadow-[0_30px_60px_rgba(11,90,147,0.18)] overflow-hidden">

        {/* LEFT — blue welcome panel */}
        <div
          className="relative z-10 w-full md:w-[48%] flex flex-col items-center justify-center text-center text-white px-10 py-14
                     bg-[linear-gradient(150deg,#0B5A93_0%,#0E76BD_55%,#3E97D6_100%)]
                     rounded-[32px_32px_100px_100px] md:rounded-[32px_280px_280px_32px]
                     shadow-[0_18px_35px_-10px_rgba(11,90,147,0.45)]
                     md:shadow-[18px_0_40px_-10px_rgba(11,90,147,0.45)]"
        >
          {/* decorative circles */}
          <div className="pointer-events-none absolute -top-16 -right-24 w-56 h-56 rounded-full bg-white/[0.06]" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 w-44 h-44 rounded-full bg-white/[0.05]" />

          {/* logo slot — empty on purpose, drop your logo (img/svg) in here */}
          <div className="w-[88px] h-[88px] rounded-[22px] bg-white flex items-center justify-center shadow-[0_16px_34px_rgba(8,55,90,0.4)] mb-7">
            {/* e.g. <img src="/logo.svg" alt="Logo" className="w-10 h-10" /> */}
          </div>

          {/* text block, nudged down */}
          <div className="mt-[18px]">
            <h1 className="text-[32px] font-bold leading-tight mb-3.5">
              Welcome Back!
            </h1>
            <p className="text-[14.5px] leading-relaxed text-white/80 max-w-[280px] mx-auto">
              Enter your personal details to use all of the site&apos;s features.
            </p>
          </div>
        </div>

        {/* RIGHT — sign-in form */}
        <div className="flex-1 flex flex-col justify-center px-8 py-10 md:px-16 md:py-12">
          <h2 className="text-[28px] font-bold text-[#241B3A] mb-5">
            Welcome Back
          </h2>
          <p className="text-[12.5px] text-[#8B87A3] mb-6">
            Sign in with your email and password
          </p>

          {/* email field */}
          <div className="relative mb-4">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#0E76BD]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M22 6l-10 7L2 6" />
                <rect x="2" y="4" width="20" height="16" rx="2" />
              </svg>
            </span>
            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-full bg-[#F5F4FB] pl-[50px] pr-5 py-4 text-sm text-[#241B3A]
                         placeholder-[#8B87A3] shadow-[0_10px_25px_rgba(76,57,163,0.10)] outline-none
                         border border-transparent focus:bg-[#EAF4FB] focus:border-[#A9D4EF]
                         transition-colors"
            />
          </div>

          {/* password field */}
          <div className="relative mb-6">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#0E76BD]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full rounded-full bg-[#F5F4FB] pl-[50px] pr-12 py-4 text-sm text-[#241B3A]
                         placeholder-[#8B87A3] shadow-[0_10px_25px_rgba(76,57,163,0.10)] outline-none
                         border border-transparent focus:bg-[#EAF4FB] focus:border-[#A9D4EF]
                         transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-[#8B87A3] hover:text-[#0E76BD] transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-[17px] h-[17px]"
              >
                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-[linear-gradient(120deg,#0E76BD,#0B5A93)] text-white
                       text-[13px] font-semibold uppercase tracking-[1.5px] py-4
                       shadow-[0_14px_28px_rgba(14,118,189,0.35)]
                       hover:shadow-[0_18px_34px_rgba(14,118,189,0.45)] hover:-translate-y-0.5
                       transition-all"
          >
            Sign In
          </button>
        </div>

      </div>
    </main>
  );
}