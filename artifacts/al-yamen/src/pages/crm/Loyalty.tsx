import { useLanguage } from "@/contexts/LanguageContext";
import { sampleCustomers } from "@/data/sampleData";
import { Star, Award, TrendingUp, Gift, Crown, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const getTier = (spent: number) => {
  if (spent >= 400000) return { tier: "Gold", color: "text-amber-400 bg-amber-400/10 border-amber-400/20", icon: <Crown size={12} /> };
  if (spent >= 200000) return { tier: "Silver", color: "text-slate-300 bg-slate-400/10 border-slate-400/20", icon: <Star size={12} /> };
  return { tier: "Bronze", color: "text-orange-400 bg-orange-400/10 border-orange-400/20", icon: <Award size={12} /> };
};

const getPoints = (spent: number) => Math.floor(spent / 100);

export default function Loyalty() {
  const { t } = useLanguage();

  const totalPoints = sampleCustomers.reduce((a, c) => a + getPoints(c.totalSpent), 0);

  return (
    <div className="space-y-5 page-enter">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-base font-bold text-white">{t("nav.loyalty")}</h1>
          <p className="text-xs text-white/40 mt-0.5">Customer loyalty & reward points</p>
        </div>
        <button className="btn-primary"><Gift size={14} /> Send Reward</button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {[
          { label: "Total Members", value: sampleCustomers.length, icon: <Users size={16} />, color: "text-sky-400 bg-sky-400/10" },
          { label: "Gold Members", value: sampleCustomers.filter(c => c.totalSpent >= 400000).length, icon: <Crown size={16} />, color: "text-amber-400 bg-amber-400/10" },
          { label: "Silver Members", value: sampleCustomers.filter(c => c.totalSpent >= 200000 && c.totalSpent < 400000).length, icon: <Star size={16} />, color: "text-slate-300 bg-slate-400/10" },
          { label: "Total Points Issued", value: totalPoints.toLocaleString(), icon: <Gift size={16} />, color: "text-purple-400 bg-purple-400/10" },
        ].map(c => (
          <div key={c.label} className="glass-card p-4 stat-card">
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mb-3", c.color)}>{c.icon}</div>
            <p className="text-xl font-bold text-white">{c.value}</p>
            <p className="text-xs text-white/40 mt-0.5">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Customer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {sampleCustomers.map((customer) => {
          const tier = getTier(customer.totalSpent);
          const points = getPoints(customer.totalSpent);
          const nextTierSpend = customer.totalSpent >= 400000 ? null : customer.totalSpent >= 200000 ? 400000 : 200000;
          const progress = nextTierSpend ? Math.min((customer.totalSpent / nextTierSpend) * 100, 100) : 100;

          return (
            <div key={customer.id} className="glass-card p-5 hover:border-sky-400/15 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500/20 to-purple-500/20 border border-white/08 flex items-center justify-center text-white font-bold">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white/85">{customer.name}</h3>
                    <p className="text-xs text-white/40">{customer.totalOrders} orders</p>
                  </div>
                </div>
                <span className={cn("badge flex items-center gap-1", tier.color)}>
                  {tier.icon} {tier.tier}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-white/03">
                  <p className="text-xs text-white/35">Total Spent</p>
                  <p className="text-sm font-bold text-white/85 mt-0.5">৳{customer.totalSpent.toLocaleString()}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-white/03">
                  <p className="text-xs text-white/35">Points Earned</p>
                  <p className="text-sm font-bold gradient-text mt-0.5">{points.toLocaleString()}</p>
                </div>
              </div>

              {nextTierSpend && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-xs text-white/35">Progress to next tier</p>
                    <p className="text-xs text-sky-400 font-semibold">{progress.toFixed(0)}%</p>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill bg-sky-400" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="text-xs text-white/25 mt-1">
                    ৳{(nextTierSpend - customer.totalSpent).toLocaleString()} more to next tier
                  </p>
                </div>
              )}
              {!nextTierSpend && (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-400/08 border border-amber-400/15">
                  <Crown size={12} className="text-amber-400" />
                  <p className="text-xs text-amber-400 font-medium">Top Gold Member!</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
