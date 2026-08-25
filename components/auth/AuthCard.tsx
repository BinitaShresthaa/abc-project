'use client';

interface AuthCardProps {
  panelSide: 'left' | 'right';
  branding: React.ReactNode;
  children: React.ReactNode;
  fontClassName?: string;
  /** Set true for content-heavy forms (e.g. the multi-step registration)
   *  that need more vertical room and a scrollable form panel. Leave this
   *  false (default) for simple pages like sign-in — that keeps the card
   *  at the original 560px height so the curve matches the reference
   *  design exactly instead of stretching taller. */
  tall?: boolean;
}

export default function AuthCard({
  panelSide,
  branding,
  children,
  fontClassName = '',
  tall = false,
}: AuthCardProps) {
  const panelOnLeft = panelSide === 'left';
  const heightClass = tall ? 'min-h-[560px] md:min-h-[640px]' : 'min-h-[560px]';
  const formPanelClass = tall
    ? 'flex-col justify-center overflow-y-auto px-16 py-10'
    : 'flex-col justify-center px-16';

  return (
    <main
      className={`${fontClassName} min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_20%_15%,#F2F8FC_0%,#E7F1F8_55%,#DCEBF5_100%)] p-6`}
    >
      <div className={`relative w-full max-w-[920px] ${heightClass} rounded-[32px] shadow-[0_30px_60px_rgba(11,90,147,0.18)] overflow-hidden bg-white`}>

        {/* DESKTOP */}
        <div
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
          className={`hidden md:flex absolute top-0 h-full w-[52%] ${formPanelClass}
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