'use client';

interface AuthCardProps {
  /** Which side the blue panel sits on. Pass a fixed value for a static
   *  page (login), or a value derived from state for a page where it
   *  should slide (register). */
  panelSide: 'left' | 'right';
  /** Content for the blue branding panel (use <BrandPanel />). */
  branding: React.ReactNode;
  /** Content for the white form panel. */
  children: React.ReactNode;
  /** Extra classes applied to the outer <main>, e.g. a font className. */
  fontClassName?: string;
}

export default function AuthCard({ panelSide, branding, children, fontClassName = '' }: AuthCardProps) {
  const panelOnLeft = panelSide === 'left';

  return (
    <main
      className={`${fontClassName} min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_20%_15%,#F2F8FC_0%,#E7F1F8_55%,#DCEBF5_100%)] p-6`}
    >
      <div className="relative w-full max-w-[920px] min-h-[560px] rounded-[32px] shadow-[0_30px_60px_rgba(11,90,147,0.18)] overflow-hidden bg-white">

        {/* DESKTOP — blue panel slides left/right, form panel slides opposite */}
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
          className={`hidden md:flex absolute top-0 h-full w-[52%] flex-col justify-center px-16
                     transition-all duration-700 ease-in-out
                     ${panelOnLeft ? 'left-[48%]' : 'left-0'}`}
        >
          {children}
        </div>

        {/* MOBILE — simple stacked layout, no side-swap animation */}
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