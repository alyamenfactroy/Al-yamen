import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  color?: "blue" | "green" | "yellow" | "purple" | "red" | "amber" | "cyan" | "indigo";
  subtitle?: string;
  className?: string;
}

const colorMap = {
  blue:   { bg: "from-sky-500/15 to-sky-600/5",    icon: "bg-sky-500/10 text-sky-400 border-sky-500/20",    bar: "bg-sky-400",    glow: "stat-card-blue" },
  cyan:   { bg: "from-cyan-500/15 to-cyan-600/5",   icon: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",   bar: "bg-cyan-400",   glow: "stat-card-blue" },
  green:  { bg: "from-emerald-500/15 to-emerald-600/5", icon: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", bar: "bg-emerald-400", glow: "stat-card-green" },
  yellow: { bg: "from-amber-500/15 to-amber-600/5", icon: "bg-amber-500/10 text-amber-400 border-amber-500/20", bar: "bg-amber-400", glow: "stat-card-amber" },
  amber:  { bg: "from-amber-500/15 to-amber-600/5", icon: "bg-amber-500/10 text-amber-400 border-amber-500/20", bar: "bg-amber-400", glow: "stat-card-amber" },
  purple: { bg: "from-purple-500/15 to-purple-600/5", icon: "bg-purple-500/10 text-purple-400 border-purple-500/20", bar: "bg-purple-400", glow: "stat-card-purple" },
  indigo: { bg: "from-indigo-500/15 to-indigo-600/5", icon: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20", bar: "bg-indigo-400", glow: "stat-card-purple" },
  red:    { bg: "from-red-500/15 to-red-600/5",    icon: "bg-red-500/10 text-red-400 border-red-500/20",    bar: "bg-red-400",    glow: "stat-card-red" },
};

export default function StatCard({ title, value, change, changeLabel, icon, color = "blue", subtitle, className }: StatCardProps) {
  const colors = colorMap[color];
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className={cn("glass-card stat-card shimmer-card p-5 animate-fade-in-up", colors.glow, className)} data-testid="card-stat">
      <div className="flex items-start justify-between mb-4">
        <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center border flex-shrink-0", colors.icon)}>
          {icon}
        </div>
        {change !== undefined && (
          <div className={cn(
            "flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border",
            isPositive
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : "bg-red-500/10 text-red-400 border-red-500/20"
          )}>
            {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {isPositive ? "+" : ""}{change}%
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-white tracking-tight mb-0.5">{value}</p>
        <p className="text-sm text-white/50 font-medium">{title}</p>
        {subtitle && <p className="text-xs text-white/30 mt-1">{subtitle}</p>}
        {changeLabel && (
          <p className="text-xs text-white/30 mt-1">{changeLabel}</p>
        )}
      </div>
      {change !== undefined && (
        <div className="mt-4 progress-bar">
          <div
            className={cn("progress-fill", colors.bar, "opacity-60")}
            style={{ width: `${Math.min(Math.abs(change) * 4, 100)}%` }}
          />
        </div>
      )}
    </div>
  );
}
