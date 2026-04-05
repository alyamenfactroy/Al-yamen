import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  LayoutDashboard, ArrowLeftRight, ShoppingCart, Package, Users,
  Calculator, Settings, ChevronDown, X,
  TrendingUp, UserCheck, FileText, Building2, ListOrdered,
  UserCog, Clock, BookOpen, Receipt, Shield, PlusCircle,
  List, BarChart3, Warehouse, Tag, Truck, ShoppingBag,
  LineChart, CreditCard, Banknote, FileBarChart, FilePieChart,
  Phone, Star, AlertCircle, Menu
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavChild {
  key: string;
  icon: React.ReactNode;
  path: string;
}
interface NavItem {
  key: string;
  icon: React.ReactNode;
  path?: string;
  children?: NavChild[];
  badge?: string;
  section?: string;
}

const navItems: NavItem[] = [
  {
    key: "nav.dashboard",
    icon: <LayoutDashboard size={17} />,
    path: "/",
  },
  {
    section: "nav.section.operations",
    key: "nav.transactions",
    icon: <ArrowLeftRight size={17} />,
    children: [
      { key: "nav.add_transaction", icon: <PlusCircle size={14} />, path: "/transactions/add" },
      { key: "nav.all_transactions", icon: <List size={14} />, path: "/transactions/all" },
      { key: "nav.recent_transactions", icon: <Clock size={14} />, path: "/transactions/recent" },
    ],
  },
  {
    key: "nav.sales_orders",
    icon: <ShoppingCart size={17} />,
    children: [
      { key: "nav.new_order", icon: <PlusCircle size={14} />, path: "/sales/new-order" },
      { key: "nav.order_history", icon: <ListOrdered size={14} />, path: "/sales/order-history" },
      { key: "nav.customers", icon: <Users size={14} />, path: "/sales/customers" },
    ],
  },
  {
    key: "nav.purchase",
    icon: <Truck size={17} />,
    children: [
      { key: "nav.new_purchase", icon: <PlusCircle size={14} />, path: "/purchase/new" },
      { key: "nav.purchase_history", icon: <ListOrdered size={14} />, path: "/purchase/history" },
      { key: "nav.suppliers", icon: <Building2 size={14} />, path: "/purchase/suppliers" },
    ],
  },
  {
    section: "nav.section.stock",
    key: "nav.inventory",
    icon: <Package size={17} />,
    children: [
      { key: "nav.add_product", icon: <PlusCircle size={14} />, path: "/inventory/add-product" },
      { key: "nav.add_company", icon: <Building2 size={14} />, path: "/inventory/add-company" },
      { key: "nav.stock_list", icon: <Warehouse size={14} />, path: "/inventory/stock-list" },
      { key: "nav.categories", icon: <Tag size={14} />, path: "/inventory/categories" },
    ],
  },
  {
    section: "nav.section.people",
    key: "nav.hr",
    icon: <UserCheck size={17} />,
    children: [
      { key: "nav.employees", icon: <Users size={14} />, path: "/hr/employees" },
      { key: "nav.payroll", icon: <Receipt size={14} />, path: "/hr/payroll" },
      { key: "nav.attendance", icon: <Clock size={14} />, path: "/hr/attendance" },
    ],
  },
  {
    key: "nav.customers_crm",
    icon: <Phone size={17} />,
    children: [
      { key: "nav.customers", icon: <Users size={14} />, path: "/crm/customers" },
      { key: "nav.loyalty", icon: <Star size={14} />, path: "/crm/loyalty" },
    ],
  },
  {
    section: "nav.section.finance",
    key: "nav.accounting",
    icon: <Calculator size={17} />,
    children: [
      { key: "nav.daily_ledger", icon: <BookOpen size={14} />, path: "/accounting/daily-ledger" },
      { key: "nav.expense_report", icon: <BarChart3 size={14} />, path: "/accounting/expense-report" },
      { key: "nav.bank_accounts", icon: <Banknote size={14} />, path: "/accounting/bank-accounts" },
    ],
  },
  {
    key: "nav.reports",
    icon: <LineChart size={17} />,
    children: [
      { key: "nav.profit_loss", icon: <FileBarChart size={14} />, path: "/reports/profit-loss" },
      { key: "nav.sales_report", icon: <FilePieChart size={14} />, path: "/reports/sales-report" },
      { key: "nav.stock_report", icon: <Package size={14} />, path: "/reports/stock-report" },
    ],
  },
  {
    section: "nav.section.system",
    key: "nav.settings",
    icon: <Settings size={17} />,
    children: [
      { key: "nav.system_config", icon: <Shield size={14} />, path: "/settings/system" },
      { key: "nav.user_roles", icon: <UserCog size={14} />, path: "/settings/user-roles" },
    ],
  },
];

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export default function Sidebar({ mobileOpen, setMobileOpen }: SidebarProps) {
  const [location] = useLocation();
  const { t } = useLanguage();
  const [expandedItems, setExpandedItems] = useState<string[]>(["nav.transactions", "nav.sales_orders"]);

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
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/04">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center shadow-lg glow-primary flex-shrink-0">
          <TrendingUp size={17} className="text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-sm font-bold text-white truncate">{t("company.al_yamen")}</h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-xs text-white/35 truncate">{t("company.tagline")}</p>
          </div>
        </div>
        <button
          className="lg:hidden text-white/40 hover:text-white p-1 rounded-lg hover:bg-white/05 transition-colors"
          onClick={() => setMobileOpen(false)}
        >
          <X size={16} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 scrollbar-thin px-2.5">
        {navItems.map((item, idx) => {
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedItems.includes(item.key);
          const parentActive = isParentActive(item);
          const showSection = item.section && (idx === 0 || navItems[idx - 1]?.section !== item.section);

          return (
            <div key={item.key}>
              {showSection && (
                <p className="nav-section-label">{t(item.section!)}</p>
              )}
              <div className="mb-0.5">
                {hasChildren ? (
                  <>
                    <button
                      onClick={() => toggleExpand(item.key)}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm transition-all duration-200",
                        parentActive
                          ? "text-sky-400 bg-sky-400/08"
                          : "text-white/55 hover:text-white hover:bg-white/05"
                      )}
                      data-testid={`nav-parent-${item.key}`}
                    >
                      <span className={cn("flex-shrink-0", parentActive ? "text-sky-400" : "text-white/35")}>
                        {item.icon}
                      </span>
                      <span className="flex-1 text-start text-xs font-semibold">{t(item.key)}</span>
                      {item.badge && (
                        <span className="badge badge-blue text-[9px] px-1.5 py-0.5">{item.badge}</span>
                      )}
                      <ChevronDown size={13} className={cn("text-white/25 transition-transform duration-200 flex-shrink-0", isExpanded ? "rotate-180" : "")} />
                    </button>
                    {isExpanded && (
                      <div className="mt-0.5 ms-4 border-s border-white/04 ps-3 space-y-0.5 pb-1">
                        {item.children!.map((child) => (
                          <Link
                            key={child.path}
                            href={child.path}
                            className={cn(
                              "flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-all duration-150",
                              isActive(child.path)
                                ? "nav-item-active text-sky-400 font-semibold"
                                : "text-white/42 hover:text-white hover:bg-white/04"
                            )}
                            onClick={() => setMobileOpen(false)}
                            data-testid={`nav-link-${child.path.replace(/\//g, "-")}`}
                          >
                            <span className={cn("flex-shrink-0", isActive(child.path) ? "text-sky-400" : "text-white/25")}>
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
                      "flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm transition-all duration-200",
                      isActive(item.path!)
                        ? "nav-item-active text-sky-400 font-semibold"
                        : "text-white/55 hover:text-white hover:bg-white/05"
                    )}
                    onClick={() => setMobileOpen(false)}
                    data-testid={`nav-link-${item.path?.replace(/\//g, "-")}`}
                  >
                    <span className={cn("flex-shrink-0", isActive(item.path!) ? "text-sky-400" : "text-white/35")}>
                      {item.icon}
                    </span>
                    <span className="text-xs font-semibold">{t(item.key)}</span>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-white/04">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-white/04 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">
            A
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-white truncate">Admin</p>
            <p className="text-xs text-white/35 truncate">Head Office</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:flex flex-col w-60 glass-sidebar h-screen sticky top-0 flex-shrink-0">
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative z-10 w-72 glass-sidebar h-full overflow-hidden">
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
