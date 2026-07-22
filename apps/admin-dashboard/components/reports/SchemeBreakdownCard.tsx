import { cn } from "@/lib/utils";

interface Segment {
  label: string;
  value: number;
  color: string;
  textColor: string;
}

interface SchemeBreakdownCardProps {
  segments: Segment[];
  total: number;
}

export default function SchemeBreakdownCard({ segments, total }: SchemeBreakdownCardProps) {
  // Build SVG donut
  const RADIUS = 52;
  const STROKE = 14;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const CENTER = 72;

  let offset = 0;
  const slices = segments.map((s) => {
    const pct = total > 0 ? s.value / total : 0;
    const dash = pct * CIRCUMFERENCE;
    const gap = CIRCUMFERENCE - dash;
    const slice = { ...s, pct, dasharray: `${dash} ${gap}`, dashoffset: -offset * CIRCUMFERENCE };
    offset += pct;
    return slice;
  });

  return (
    <div className="flex items-center gap-6">
      {/* Donut */}
      <div className="relative flex-shrink-0" style={{ width: CENTER * 2, height: CENTER * 2 }}>
        <svg
          width={CENTER * 2}
          height={CENTER * 2}
          viewBox={`0 0 ${CENTER * 2} ${CENTER * 2}`}
          className="-rotate-90"
        >
          {/* Background ring */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke="#F3F4F6"
            strokeWidth={STROKE}
          />
          {slices.map((s, i) => (
            <circle
              key={i}
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              stroke={s.color}
              strokeWidth={STROKE}
              strokeDasharray={s.dasharray}
              strokeDashoffset={s.dashoffset}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          ))}
        </svg>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-black text-gray-900">{total}</p>
          <p className="text-2xs text-gray-400">customers</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex-1 space-y-3">
        {segments.map((s) => {
          const pct = total > 0 ? Math.round((s.value / total) * 100) : 0;
          return (
            <div key={s.label} className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: s.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-gray-700 truncate">{s.label}</p>
                  <span className="text-xs font-bold text-gray-500 ml-2">{s.value}</span>
                </div>
                {/* Mini bar */}
                <div className="mt-0.5 h-1 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, backgroundColor: s.color }}
                  />
                </div>
              </div>
              <span
                className={cn("text-xs font-bold w-8 text-right")}
                style={{ color: s.color }}
              >
                {pct}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
