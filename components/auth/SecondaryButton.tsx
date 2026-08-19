interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function SecondaryButton({ children, onClick }: SecondaryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-black/10 text-[#241B3A] px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[1.5px] hover:bg-black/[0.03] transition-colors"
    >
      {children}
    </button>
  );
}