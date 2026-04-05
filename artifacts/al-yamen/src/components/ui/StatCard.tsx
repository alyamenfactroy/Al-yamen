import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  color?: "blue" | "green" | "yellow" | "purple" | "red";
  className?: string;
}

const colorMap = {
  blue: { bg: "from-sky-500/10 to-sky-600/5", icon: "text-sky-400", border: "border-sky-500/20" },
  green: { bg: "from-emerald-500/10 to-emerald-600/5", icon: "text-emerald-400", border: "border-emerald-500/20" },
  yellow: { bg: "from-amber-500/10 to-amber-600/5", icon: "text-amber-400", border: "border-amber-500/20" },
  purple: { bg: "from-purple-500/10 to-purple-600/5", icon: "text-purple-400", border: "border-purple-500/20" },
  red: { bg: "from-red-500/10 to-red-600/5", icon: "text-red-400", border: "border-red-500/20" },
};

export default function StatCard({ title, value, change, changeLabel, icon, color = "blue", className }: StatCardProps) {
  const colors = colorMap[color];
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className={cn("glass-card stat-card p-5", className)} data-testid="card-stat">
      <div className="flex items-start justify-between mb-4">
        <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br border", colors.bg, colors.border)}>
          <span className={colors.icon}>{icon}</span>
        </div>
        {change !== undefined && (
          <div className={cn(
            "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
            isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
          )}>
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{isPositive ? "+" : ""}{change}%</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-white mb-1">{value}</p>
        <p className="text-sm text-white/50">{title}</p>
        {changeLabel && (
          <p className="text-xs text-white/30 mt-1">{changeLabel}</p>
        )}
      </div>
    </div>
  );
}
