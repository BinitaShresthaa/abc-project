import type { ReactNode } from "react";

export default function Container({
  children,
  className = "",
  maxWidth = "88rem", // 1408px — matches the campaigns page's wide, non-cramped layout
}: {
  children: ReactNode;
  className?: string;
  maxWidth?: string;
}) {
  return (
    <div
      className={`mx-auto w-full px-5 sm:px-8 lg:px-10 ${className}`}
      style={{ maxWidth }} // inline style guarantees the value applies regardless of
                            // Tailwind's arbitrary-value class generation/purging
    >
      {children}
    </div>
  );
}