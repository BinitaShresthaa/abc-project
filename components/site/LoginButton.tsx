export default function LoginButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="/login"
      className={`inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-campus-blue-dark shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-campus-blue-light hover:shadow-md ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
        <path
          d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Login
    </a>
  );
}
