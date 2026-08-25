import type { ReactNode } from "react";

/**
 * CampaignContainer
 * ---------------------------------------------------------------------------
 * Shared width/gutter wrapper for the campaign page.
 * Uses a wider max-width so desktop screens have less empty space
 * while maintaining comfortable side spacing.
 */
export default function CampaignContainer({
  children,
  className = "",
  maxWidth = "max-w-[1500px]",
}: {
  children: ReactNode;
  className?: string;
  maxWidth?: string;
}) {
  return (
    <div
      className={`mx-auto w-full ${maxWidth} px-5 sm:px-7 lg:px-10 xl:px-12 ${className}`}
    >
      {children}
    </div>
  );
}