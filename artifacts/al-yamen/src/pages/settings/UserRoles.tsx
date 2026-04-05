import { useLanguage } from "@/contexts/LanguageContext";
import { Shield, UserCog, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const roles = [
  {
    name: "Super Admin",
    users: 1,
    color: "sky",
    permissions: ["Dashboard", "Transactions", "Sales", "Inventory", "HR", "Accounting", "Settings"],
  },
  {
    name: "Manager",
    users: 2,
    color: "purple",
    permissions: ["Dashboard", "Transactions", "Sales", "Inventory", "HR"],
  },
  {
    name: "Sales Staff",
    users: 3,
    color: "emerald",
    permissions: ["Dashboard", "Sales", "Inventory View"],
  },
  {
    name: "Accountant",
    users: 1,
    color: "amber",
    permissions: ["Dashboard", "Transactions", "Accounting"],
  },
];

const colorMap: Record<string, string> = {
  sky: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

export default function UserRoles() {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium rounded-xl transition-colors" data-testid="button-add-role">
          + Add Role
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map(role => (
          <div key={role.name} className={cn("glass-card p-5 border", colorMap[role.color].split(" ")[2])} data-testid={`card-role-${role.name}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", colorMap[role.color].split(" ")[0])}>
                  <Shield size={18} className={colorMap[role.color].split(" ")[1]} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{role.name}</p>
                  <p className="text-xs text-white/40">{role.users} user{role.users > 1 ? "s" : ""}</p>
                </div>
              </div>
              <button className="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/60 rounded-lg transition-colors" data-testid={`button-edit-role-${role.name}`}>
                {t("common.edit")}
              </button>
            </div>

            <div className="space-y-1.5">
              <p className="text-xs text-white/40 mb-2">{t("settings.permissions")}</p>
              <div className="flex flex-wrap gap-1.5">
                {role.permissions.map(perm => (
                  <span key={perm} className={cn("flex items-center gap-1 text-xs px-2 py-0.5 rounded-full", colorMap[role.color].split(" ")[0], colorMap[role.color].split(" ")[1])}>
                    <Check size={10} />
                    {perm}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
