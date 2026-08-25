interface StepDotsProps {
  total: number;
  current: number;
}

export default function StepDots({ total, current }: StepDotsProps) {
  return (
    <div className="flex items-center gap-2 mb-6">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full transition-colors ${i <= current ? 'bg-[#0E76BD]' : 'bg-black/10'}`} />
          {i < total - 1 && (
            <div className={`w-6 h-[2px] rounded-full ${i < current ? 'bg-[#0E76BD]' : 'bg-black/10'}`} />
          )}
        </div>
      ))}
    </div>
  );
}