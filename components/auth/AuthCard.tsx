'use client';

import Link from 'next/link';

interface AuthCardProps {
  panelSide: 'left' | 'right';
  branding: React.ReactNode;
  children: React.ReactNode;
  fontClassName?: string;
  /** When provided, shows a "Back" link in the top-left corner, pointing to this URL. */
  backHref?: string;
}

const backArrowIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

export default function AuthCard({ panelSide, branding, children, fontClassName = '', backHref }: AuthCardProps) {
  const panelOnLeft = panelSide === 'left';

  return (
    <main
      className={`${fontClassName} relative min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_20%_15%,#F2F8FC_0%,#E7F1F8_55%,#DCEBF5_100%)] p-6`}
    >

      <div className="relative w-full max-w-[920px] min-h-[560px] rounded-[32px] shadow-[0_30px_60px_rgba(11,90,147,0.18)] overflow-hidden bg-white">

        {backHref && (
          <Link
            href={backHref}
            className="absolute top-5 right-5 z-20 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3.5 py-2 text-[13px] font-semibold text-[#0E76BD] shadow-[0_4px_14px_rgba(11,90,147,0.15)] hover:bg-white transition-colors"
          >
            {backArrowIcon}
            Back
          </Link>
        )}

        {/* DESKTOP */}
        <div
          style={{ viewTransitionName: 'auth-blue-panel' }}
          className={`hidden md:flex absolute top-0 h-full w-[48%] flex-col items-center justify-center text-center text-white px-10
                     bg-[linear-gradient(150deg,#0B5A93_0%,#0E76BD_55%,#3E97D6_100%)]
                     transition-all duration-700 ease-in-out
                     shadow-[18px_0_40px_-10px_rgba(11,90,147,0.45)] z-10
                     ${panelOnLeft ? 'left-0 rounded-[32px_280px_280px_32px]' : 'left-[52%] rounded-[280px_32px_32px_280px]'}`}
        >
          <div className="pointer-events-none absolute -top-16 -right-24 w-56 h-56 rounded-full bg-white/[0.06]" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 w-44 h-44 rounded-full bg-white/[0.05]" />
          {branding}
        </div>

        <div
          className={`hidden md:flex absolute top-0 h-full w-[52%] flex-col justify-center px-16
                     transition-all duration-700 ease-in-out
                     ${panelOnLeft ? 'left-[48%]' : 'left-0'}`}
        >
          {children}
        </div>

        {/* MOBILE */}
        <div className="flex md:hidden flex-col">
          <div
            className="relative flex flex-col items-center justify-center text-center text-white px-10 py-12
                       bg-[linear-gradient(150deg,#0B5A93_0%,#0E76BD_55%,#3E97D6_100%)]
                       rounded-[32px_32px_100px_100px]
                       shadow-[0_18px_35px_-10px_rgba(11,90,147,0.45)]"
          >
            <div className="pointer-events-none absolute -top-16 -right-24 w-56 h-56 rounded-full bg-white/[0.06]" />
            <div className="pointer-events-none absolute -bottom-20 -left-16 w-44 h-44 rounded-full bg-white/[0.05]" />
            {branding}
          </div>
          <div className="flex flex-col justify-center px-8 py-10">
            {children}
          </div>
        </div>

      </div>
    </main>
  );
}