import { useQuery } from "@tanstack/react-query";
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
  AreaChart,
  Area,
} from "recharts";
import { formatCurrency } from "../lib/utils";
import { FileText, Download, TrendingUp, DollarSign } from "lucide-react";

interface DashboardStats {
  totalRevenue: string;
  totalExpenses: string;
  totalOrders: number;
  totalCustomers: number;
}

const monthlyData = [
  { month: "Jan", revenue: 45000, expenses: 32000, profit: 13000 },
  { month: "Feb", revenue: 52000, expenses: 35000, profit: 17000 },
  { month: "Mar", revenue: 48000, expenses: 31000, profit: 17000 },
  { month: "Apr", revenue: 61000, expenses: 38000, profit: 23000 },
  { month: "May", revenue: 55000, expenses: 36000, profit: 19000 },
  { month: "Jun", revenue: 67000, expenses: 41000, profit: 26000 },
];

const productPerformance = [
  { name: "Electronics", sales: 45000 },
  { name: "Apparel", sales: 32000 },
  { name: "Food & Beverage", sales: 28000 },
  { name: "Services", sales: 21000 },
  { name: "Others", sales: 15000 },
];

const salesByRegion = [
  { name: "North", value: 35 },
  { name: "South", value: 28 },
  { name: "East", value: 22 },
  { name: "West", value: 15 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

export default function Reports() {
  const { data: stats } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard");
      return res.json();
    },
  });

  const reports = [
    { name: "Sales Report", description: "Monthly sales analysis", icon: TrendingUp },
    { name: "Financial Statement", description: "P&L, Balance Sheet", icon: DollarSign },
    { name: "Inventory Report", description: "Stock levels and movements", icon: FileText },
    { name: "Customer Report", description: "Customer analytics", icon: FileText },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Business intelligence and insights
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <div
              key={report.name}
              className="bg-card border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">{report.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {report.description}
              </p>
              <button className="flex items-center gap-2 text-sm text-primary hover:underline">
                <Download className="h-4 w-4" />
                Generate Report
              </button>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue vs Expenses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Area
                type="monotone"
                dataKey="revenue"
                stackId="1"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stackId="2"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Profit Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Product Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Bar dataKey="sales" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Sales by Region</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={salesByRegion}
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
                {salesByRegion.map((entry, index) => (
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

      <div className="bg-card border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Key Performance Indicators</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">
              {formatCurrency(stats?.totalRevenue || 0)}
            </p>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-500">
              {formatCurrency(stats?.totalExpenses || 0)}
            </p>
            <p className="text-sm text-muted-foreground">Total Expenses</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-500">
              {stats?.totalOrders || 0}
            </p>
            <p className="text-sm text-muted-foreground">Total Orders</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-500">
              {stats?.totalCustomers || 0}
            </p>
            <p className="text-sm text-muted-foreground">Total Customers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
