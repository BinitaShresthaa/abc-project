interface SubmitButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}

export default function SubmitButton({ children, onClick, disabled, fullWidth = true }: SubmitButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${fullWidth ? 'w-full' : 'flex-1'} rounded-full bg-[linear-gradient(120deg,#0E76BD,#0B5A93)] text-white
                 text-[13px] font-semibold uppercase tracking-[1.5px] py-4
                 shadow-[0_14px_28px_rgba(14,118,189,0.35)]
                 hover:shadow-[0_18px_34px_rgba(14,118,189,0.45)] hover:-translate-y-0.5
                 disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-[0_14px_28px_rgba(14,118,189,0.35)]
                 transition-all`}
    >
      {children}
    </button>
  );
}