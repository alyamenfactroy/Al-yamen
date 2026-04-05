import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  LayoutDashboard, ArrowLeftRight, ShoppingCart, Package, Users,
  Calculator, Settings, ChevronDown, ChevronRight, Menu, X,
  TrendingUp, UserCheck, FileText, Building2, ListOrdered,
  UserCog, Clock, BookOpen, Receipt, Shield, PlusCircle,
  List, BarChart3, Warehouse, Tag
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  key: string;
  icon: React.ReactNode;
  path?: string;
  children?: { key: string; icon: React.ReactNode; path: string }[];
}

const navItems: NavItem[] = [
  {
    key: "nav.dashboard",
    icon: <LayoutDashboard size={18} />,
    path: "/",
  },
  {
    key: "nav.transactions",
    icon: <ArrowLeftRight size={18} />,
    children: [
      { key: "nav.add_transaction", icon: <PlusCircle size={16} />, path: "/transactions/add" },
      { key: "nav.all_transactions", icon: <List size={16} />, path: "/transactions/all" },
      { key: "nav.recent_transactions", icon: <Clock size={16} />, path: "/transactions/recent" },
    ],
  },
  {
    key: "nav.sales_orders",
    icon: <ShoppingCart size={18} />,
    children: [
      { key: "nav.new_order", icon: <PlusCircle size={16} />, path: "/sales/new-order" },
      { key: "nav.order_history", icon: <ListOrdered size={16} />, path: "/sales/order-history" },
      { key: "nav.customers", icon: <Users size={16} />, path: "/sales/customers" },
    ],
  },
  {
    key: "nav.inventory",
    icon: <Package size={18} />,
    children: [
      { key: "nav.add_product", icon: <PlusCircle size={16} />, path: "/inventory/add-product" },
      { key: "nav.add_company", icon: <Building2 size={16} />, path: "/inventory/add-company" },
      { key: "nav.stock_list", icon: <Warehouse size={16} />, path: "/inventory/stock-list" },
      { key: "nav.categories", icon: <Tag size={16} />, path: "/inventory/categories" },
    ],
  },
  {
    key: "nav.hr",
    icon: <UserCheck size={18} />,
    children: [
      { key: "nav.employees", icon: <Users size={16} />, path: "/hr/employees" },
      { key: "nav.payroll", icon: <Receipt size={16} />, path: "/hr/payroll" },
      { key: "nav.attendance", icon: <Clock size={16} />, path: "/hr/attendance" },
    ],
  },
  {
    key: "nav.accounting",
    icon: <Calculator size={18} />,
    children: [
      { key: "nav.daily_ledger", icon: <BookOpen size={16} />, path: "/accounting/daily-ledger" },
      { key: "nav.expense_report", icon: <BarChart3 size={16} />, path: "/accounting/expense-report" },
    ],
  },
  {
    key: "nav.settings",
    icon: <Settings size={18} />,
    children: [
      { key: "nav.system_config", icon: <Shield size={16} />, path: "/settings/system" },
      { key: "nav.user_roles", icon: <UserCog size={16} />, path: "/settings/user-roles" },
    ],
  },
];

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export default function Sidebar({ mobileOpen, setMobileOpen }: SidebarProps) {
  const [location] = useLocation();
  const { t, language } = useLanguage();
  const [expandedItems, setExpandedItems] = useState<string[]>(["nav.transactions"]);

  const toggleExpand = (key: string) => {
    setExpandedItems(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const isActive = (path: string) => location === path;
  const isParentActive = (item: NavItem) =>
    item.children?.some(child => location === child.path) || false;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 p-5 border-b border-white/5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center shadow-lg glow-primary flex-shrink-0">
          <TrendingUp size={18} className="text-white" />
        </div>
        <div className="min-w-0">
          <h1 className="text-sm font-bold text-white truncate">{t("company.al_yamen")}</h1>
          <p className="text-xs text-sky-400/80 truncate">{t("company.tagline")}</p>
        </div>
        <button
          className="lg:hidden ml-auto text-white/50 hover:text-white"
          onClick={() => setMobileOpen(false)}
          data-testid="button-close-sidebar"
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin px-3">
        {navItems.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedItems.includes(item.key);
          const parentActive = isParentActive(item);

          return (
            <div key={item.key} className="mb-1">
              {hasChildren ? (
                <>
                  <button
                    onClick={() => toggleExpand(item.key)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                      parentActive
                        ? "text-sky-400 bg-sky-400/10"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    )}
                    data-testid={`nav-parent-${item.key}`}
                  >
                    <span className={cn(parentActive ? "text-sky-400" : "text-white/40")}>
                      {item.icon}
                    </span>
                    <span className="flex-1 text-start font-medium">{t(item.key)}</span>
                    <span className={cn("transition-transform duration-200", isExpanded ? "rotate-180" : "")}>
                      <ChevronDown size={14} />
                    </span>
                  </button>
                  {isExpanded && (
                    <div className="mt-1 ms-4 border-s border-white/5 ps-3 space-y-0.5">
                      {item.children!.map((child) => (
                        <Link
                          key={child.path}
                          href={child.path}
                          className={cn(
                            "flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all duration-200",
                            isActive(child.path)
                              ? "nav-item-active text-sky-400 font-medium"
                              : "text-white/50 hover:text-white hover:bg-white/5"
                          )}
                          onClick={() => setMobileOpen(false)}
                          data-testid={`nav-link-${child.path.replace(/\//g, "-")}`}
                        >
                          <span className={isActive(child.path) ? "text-sky-400" : "text-white/30"}>
                            {child.icon}
                          </span>
                          {t(child.key)}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.path!}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                    isActive(item.path!)
                      ? "nav-item-active text-sky-400 font-medium"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  )}
                  onClick={() => setMobileOpen(false)}
                  data-testid={`nav-link-${item.path?.replace(/\//g, "-")}`}
                >
                  <span className={isActive(item.path!) ? "text-sky-400" : "text-white/40"}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{t(item.key)}</span>
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400/30 to-purple-500/30 flex items-center justify-center border border-white/10">
            <UserCog size={14} className="text-sky-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-white truncate">Admin</p>
            <p className="text-xs text-white/40 truncate">admin@alyamen.com</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 glass-sidebar h-screen sticky top-0 flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative z-10 w-72 glass-sidebar h-full">
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
