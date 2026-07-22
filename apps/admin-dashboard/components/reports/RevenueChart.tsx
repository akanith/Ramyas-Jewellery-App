interface RevenueChartProps {
  data: { month: string; amount: number }[];
  maxAmount?: number;
}

export default function RevenueChart({ data, maxAmount }: RevenueChartProps) {
  const max = maxAmount ?? Math.max(...data.map((d) => d.amount), 1);

  const formatShort = (val: number): string => {
    if (val >= 100000) return `₹${(val / 100000).toFixed(0)}L`;
    if (val >= 1000) return `₹${(val / 1000).toFixed(0)}K`;
    return `₹${val}`;
  };

  return (
    <div className="w-full">
      {/* Y-axis labels + bars */}
      <div className="flex gap-4">
        {/* Y-axis */}
        <div className="flex flex-col justify-between text-2xs text-gray-400 text-right w-8 pb-6" style={{ height: 180 }}>
          <span>{formatShort(max)}</span>
          <span>{formatShort(max * 0.75)}</span>
          <span>{formatShort(max * 0.5)}</span>
          <span>{formatShort(max * 0.25)}</span>
          <span>₹0</span>
        </div>

        {/* Chart area */}
        <div className="flex-1 relative">
          {/* Grid lines */}
          <div className="absolute inset-0 pb-6 flex flex-col justify-between pointer-events-none">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="border-t border-gray-100 w-full" />
            ))}
          </div>

          {/* Bars */}
          <div className="flex items-end gap-2 h-44 pb-0">
            {data.map((d, i) => {
              const pct = max > 0 ? (d.amount / max) * 100 : 0;
              const isLast = i === data.length - 1;
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1 group">
                  {/* Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                    <span className="bg-gray-800 text-white text-2xs font-semibold px-2 py-0.5 rounded-md whitespace-nowrap">
                      {formatShort(d.amount)}
                    </span>
                  </div>
                  {/* Bar */}
                  <div
                    className={`w-full rounded-t-lg transition-all duration-300 ${
                      isLast
                        ? "bg-primary"
                        : "bg-gold/40 group-hover:bg-gold/60"
                    }`}
                    style={{ height: `${Math.max(pct, 2)}%` }}
                  />
                </div>
              );
            })}
          </div>

          {/* X-axis labels */}
          <div className="flex gap-2 mt-2">
            {data.map((d) => (
              <div key={d.month} className="flex-1 text-center text-2xs text-gray-400 truncate">
                {d.month}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
