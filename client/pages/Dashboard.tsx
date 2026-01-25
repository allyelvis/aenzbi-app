import { useQuery } from "@tanstack/react-query";
import {
  Users,
  Package,
  ShoppingCart,
  Target,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { formatCurrency } from "../lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface DashboardStats {
  totalCustomers: number;
  totalProducts: number;
  totalOrders: number;
  totalLeads: number;
  totalExpenses: string;
  totalRevenue: string;
  recentOrders: any[];
  recentLeads: any[];
}

const revenueData = [
  { month: "Jan", revenue: 12400 },
  { month: "Feb", revenue: 15800 },
  { month: "Mar", revenue: 18200 },
  { month: "Apr", revenue: 14600 },
  { month: "May", revenue: 21300 },
  { month: "Jun", revenue: 19800 },
];

const salesByCategory = [
  { name: "Electronics", value: 35 },
  { name: "Apparel", value: 25 },
  { name: "Food", value: 20 },
  { name: "Services", value: 20 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

export default function Dashboard() {
  const { data: stats } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard");
      return res.json();
    },
  });

  const statCards = [
    {
      label: "Customers",
      value: stats?.totalCustomers || 0,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      label: "Products",
      value: stats?.totalProducts || 0,
      icon: Package,
      color: "bg-green-500",
    },
    {
      label: "Orders",
      value: stats?.totalOrders || 0,
      icon: ShoppingCart,
      color: "bg-purple-500",
    },
    {
      label: "Leads",
      value: stats?.totalLeads || 0,
      icon: Target,
      color: "bg-orange-500",
    },
    {
      label: "Revenue",
      value: formatCurrency(stats?.totalRevenue || 0),
      icon: DollarSign,
      color: "bg-emerald-500",
    },
    {
      label: "Expenses",
      value: formatCurrency(stats?.totalExpenses || 0),
      icon: TrendingUp,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to AENZBi ERP System</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-card rounded-lg border p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                  <p className="text-2xl font-bold mt-1">{card.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${card.color}`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={salesByCategory}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {salesByCategory.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {stats?.recentOrders?.length ? (
              stats.recentOrders.map((order: any) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div>
                    <p className="font-medium">{order.orderNumber}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.status}
                    </p>
                  </div>
                  <p className="font-semibold">
                    {formatCurrency(order.totalAmount)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No orders yet
              </p>
            )}
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Leads</h3>
          <div className="space-y-3">
            {stats?.recentLeads?.length ? (
              stats.recentLeads.map((lead: any) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div>
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {lead.company || "No company"}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      lead.status === "qualified"
                        ? "bg-green-100 text-green-700"
                        : lead.status === "new"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {lead.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No leads yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
