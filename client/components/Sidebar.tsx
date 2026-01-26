import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Target,
  Receipt,
  CheckSquare,
  Warehouse,
  BarChart3,
  Settings,
  Building2,
  Crown,
  LogOut,
  Store,
} from "lucide-react";
import { cn } from "../lib/utils";

type PageType = "dashboard" | "customers" | "products" | "sales" | "leads" | "expenses" | "tasks" | "inventory" | "reports" | "subscription" | "pos";

interface User {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl: string | null;
  subscriptionTier: string | null;
}

interface SidebarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  user?: User | null;
}

const menuItems: { id: PageType; label: string; icon: React.ComponentType<any> }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "pos", label: "Point of Sale", icon: Store },
  { id: "customers", label: "Customers", icon: Users },
  { id: "products", label: "Products", icon: Package },
  { id: "sales", label: "Sales Orders", icon: ShoppingCart },
  { id: "leads", label: "CRM / Leads", icon: Target },
  { id: "expenses", label: "Expenses", icon: Receipt },
  { id: "tasks", label: "Tasks", icon: CheckSquare },
  { id: "inventory", label: "Inventory", icon: Warehouse },
  { id: "reports", label: "Reports", icon: BarChart3 },
];

export default function Sidebar({ currentPage, onNavigate, user }: SidebarProps) {
  const displayName = user?.firstName 
    ? `${user.firstName}${user.lastName ? ` ${user.lastName}` : ''}`
    : user?.email || 'User';

  return (
    <div className="w-64 h-full bg-slate-900 text-white flex flex-col">
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <Building2 className="h-8 w-8 text-blue-400" />
          <div>
            <h1 className="text-xl font-bold">AENZBi</h1>
            <p className="text-xs text-slate-400">ERP System</p>
          </div>
        </div>
      </div>

      {user && (
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            {user.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt={displayName}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-semibold">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{displayName}</p>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
                currentPage === item.id
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700 space-y-1">
        <button
          onClick={() => onNavigate("subscription")}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
            currentPage === "subscription"
              ? "bg-blue-600 text-white"
              : "text-slate-300 hover:bg-slate-800"
          )}
        >
          <Crown className="h-5 w-5" />
          <span>Subscription</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors">
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </button>
        <a
          href="/api/logout"
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </a>
      </div>
    </div>
  );
}
