import type { ReactNode } from "react";

export default function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full px-5 sm:px-8 lg:px-10 ${className}`}
      style={{ maxWidth: "72rem" }} // 1152px — hard guarantee, independent of Tailwind class generation
    >
      {children}
    </div>
  );
}