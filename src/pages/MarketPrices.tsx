import { useState } from "react";
import { Search, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatINR } from "@/lib/currency";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const marketData = [
  { crop: "Wheat", price: 2500, location: "Delhi", demand: "High", trend: "up" },
  { crop: "Rice (Basmati)", price: 3800, location: "Punjab", demand: "High", trend: "up" },
  { crop: "Cotton", price: 7200, location: "Gujarat", demand: "Medium", trend: "down" },
  { crop: "Sugarcane", price: 350, location: "Maharashtra", demand: "High", trend: "up" },
  { crop: "Soybean", price: 4500, location: "Madhya Pradesh", demand: "Low", trend: "stable" },
  { crop: "Maize", price: 2100, location: "Karnataka", demand: "Medium", trend: "up" },
  { crop: "Groundnut", price: 5800, location: "Rajasthan", demand: "Medium", trend: "down" },
  { crop: "Mustard", price: 5200, location: "Haryana", demand: "High", trend: "up" },
];

const chartData = marketData.map((d) => ({ name: d.crop.split(" ")[0], price: d.price }));

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === "up") return <TrendingUp className="h-4 w-4 text-success" />;
  if (trend === "down") return <TrendingDown className="h-4 w-4 text-destructive" />;
  return <Minus className="h-4 w-4 text-muted-foreground" />;
};

const demandColor = (d: string) => {
  if (d === "High") return "default";
  if (d === "Medium") return "secondary";
  return "outline";
};

const MarketPrices = () => {
  const [search, setSearch] = useState("");
  const filtered = marketData.filter((d) =>
    d.crop.toLowerCase().includes(search.toLowerCase()) ||
    d.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Market Prices 📊</h1>
        <p className="text-muted-foreground">Real-time crop market prices across India.</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search crop or location..."
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Price Comparison (₹ per Quintal)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(140 15% 90%)" />
                <XAxis dataKey="name" stroke="hsl(150 10% 45%)" fontSize={12} />
                <YAxis stroke="hsl(150 10% 45%)" fontSize={12} />
                <Tooltip
                  contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(140,15%,90%)", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                  formatter={(v: number) => [`₹${v}`, "Price"]}
                />
                <Bar dataKey="price" fill="hsl(142, 55%, 40%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50">
              <TableHead>Crop</TableHead>
              <TableHead>Price / Quintal</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Demand</TableHead>
              <TableHead>Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((item) => (
              <TableRow key={item.crop} className="hover:bg-secondary/30">
                <TableCell className="font-medium">{item.crop}</TableCell>
                <TableCell>{formatINR(item.price)}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell><Badge variant={demandColor(item.demand) as any}>{item.demand}</Badge></TableCell>
                <TableCell><TrendIcon trend={item.trend} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default MarketPrices;
