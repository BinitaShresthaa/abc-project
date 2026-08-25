import Image from "next/image";

export default function Logo({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-10 w-10 shrink-0">
        <Image src="/images/campus-logo.png" alt="Aadikavi Bhanubhakta Campus" fill className="object-contain" />
      </div>
      {!collapsed && (
        <div className="leading-tight">
          <div className="text-sm font-bold text-primary">Aadikavi Bhanubhakta</div>
          <div className="text-[10px] uppercase tracking-wide text-slate-400">Campus Portal</div>
        </div>
      )}
    </div>
  );
}