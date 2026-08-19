import Link from 'next/link';

interface BrandPanelProps {
  heading: string;
  description: string;
  showLogo?: boolean;
  /** Either href (navigates to another route) or onClick (toggles state
   *  on the same page) — pass whichever fits how this page's CTA works. */
  cta?: { label: string; href?: string; onClick?: () => void };
}

export default function BrandPanel({ heading, description, showLogo, cta }: BrandPanelProps) {
  const ctaClassName =
    'inline-block rounded-full border-[1.5px] border-white/70 px-9 py-3 text-[12.5px] font-semibold uppercase tracking-[1.5px] hover:bg-white/10 transition-colors';

  return (
    <>
      {showLogo && (
        <div className="w-[88px] h-[88px] rounded-[22px] bg-white flex items-center justify-center shadow-[0_16px_34px_rgba(8,55,90,0.4)] mb-7">
          {/* e.g. <img src="/logo.svg" alt="Logo" className="w-10 h-10" /> */}
        </div>
      )}
      <h1 className="text-[32px] font-bold leading-tight mb-3.5">{heading}</h1>
      <p className={`text-[14.5px] leading-relaxed text-white/80 max-w-[280px] ${cta ? 'mb-8' : ''}`}>
        {description}
      </p>
      {cta && cta.href && (
        <Link href={cta.href} className={ctaClassName}>
          {cta.label}
        </Link>
      )}
      {cta && !cta.href && cta.onClick && (
        <button type="button" onClick={cta.onClick} className={ctaClassName}>
          {cta.label}
        </button>
      )}
    </>
  );
}