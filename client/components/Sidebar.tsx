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
} from "lucide-react";
import { cn } from "../lib/utils";

type PageType = "dashboard" | "customers" | "products" | "sales" | "leads" | "expenses" | "tasks" | "inventory" | "reports";

interface SidebarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

const menuItems: { id: PageType; label: string; icon: React.ComponentType<any> }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "customers", label: "Customers", icon: Users },
  { id: "products", label: "Products", icon: Package },
  { id: "sales", label: "Sales Orders", icon: ShoppingCart },
  { id: "leads", label: "CRM / Leads", icon: Target },
  { id: "expenses", label: "Expenses", icon: Receipt },
  { id: "tasks", label: "Tasks", icon: CheckSquare },
  { id: "inventory", label: "Inventory", icon: Warehouse },
  { id: "reports", label: "Reports", icon: BarChart3 },
];

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
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

      <nav className="flex-1 p-4 space-y-1">
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

      <div className="p-4 border-t border-slate-700">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors">
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}
