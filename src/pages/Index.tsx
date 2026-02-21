import { Heart, TrendingUp, DollarSign, CloudSun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatINR } from "@/lib/currency";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const stats = [
  { title: "Crop Health Status", value: "Good", icon: Heart, color: "text-success" },
  { title: "Market Price Trends", value: "↑ 12%", icon: TrendingUp, color: "text-info" },
  { title: "Estimated Profit", value: formatINR(245000), icon: DollarSign, color: "text-primary" },
  { title: "Weather Advisory", value: "Clear Skies", icon: CloudSun, color: "text-warning" },
];

const priceData = [
  { month: "Jan", wheat: 2150, rice: 3200, cotton: 6100 },
  { month: "Feb", wheat: 2200, rice: 3100, cotton: 6300 },
  { month: "Mar", wheat: 2350, rice: 3350, cotton: 6000 },
  { month: "Apr", wheat: 2400, rice: 3400, cotton: 6500 },
  { month: "May", wheat: 2300, rice: 3500, cotton: 6800 },
  { month: "Jun", wheat: 2500, rice: 3600, cotton: 7000 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome back, Farmer! 🌾</h1>
        <p className="text-muted-foreground">Here's your agricultural overview for today.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="animate-fade-in shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Crop Price Trends (₹ per Quintal)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(140 15% 90%)" />
                <XAxis dataKey="month" stroke="hsl(150 10% 45%)" fontSize={12} />
                <YAxis stroke="hsl(150 10% 45%)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "0.75rem",
                    border: "1px solid hsl(140, 15%, 90%)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                  formatter={(value: number) => [`₹${value}`, ""]}
                />
                <Line type="monotone" dataKey="wheat" stroke="hsl(142, 55%, 40%)" strokeWidth={2} dot={{ r: 4 }} name="Wheat" />
                <Line type="monotone" dataKey="rice" stroke="hsl(200, 80%, 50%)" strokeWidth={2} dot={{ r: 4 }} name="Rice" />
                <Line type="monotone" dataKey="cotton" stroke="hsl(38, 92%, 50%)" strokeWidth={2} dot={{ r: 4 }} name="Cotton" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
