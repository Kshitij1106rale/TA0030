import { useState } from "react";
import { Calculator, IndianRupee } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatINR } from "@/lib/currency";

const crops = ["Wheat", "Rice", "Cotton", "Sugarcane", "Soybean", "Maize", "Groundnut", "Mustard"];

interface Estimation {
  totalCost: number;
  revenue: number;
  profit: number;
}

const ProfitEstimator = () => {
  const [cropType, setCropType] = useState("");
  const [costPerUnit, setCostPerUnit] = useState("");
  const [expectedYield, setExpectedYield] = useState("");
  const [marketPrice, setMarketPrice] = useState("");
  const [estimation, setEstimation] = useState<Estimation | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!cropType) e.cropType = "Select a crop";
    if (!costPerUnit || Number(costPerUnit) <= 0) e.costPerUnit = "Enter valid cost";
    if (!expectedYield || Number(expectedYield) <= 0) e.expectedYield = "Enter valid yield";
    if (!marketPrice || Number(marketPrice) <= 0) e.marketPrice = "Enter valid market price";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const calculate = () => {
    if (!validate()) return;
    const cost = Number(costPerUnit) * Number(expectedYield);
    const rev = Number(marketPrice) * Number(expectedYield);
    setEstimation({ totalCost: cost, revenue: rev, profit: rev - cost });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profit Estimation Engine 💰</h1>
        <p className="text-muted-foreground">Calculate your expected agricultural profits.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" /> Input Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Crop Type</Label>
              <Select value={cropType} onValueChange={setCropType}>
                <SelectTrigger className={errors.cropType ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  {crops.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.cropType && <p className="text-xs text-destructive mt-1">{errors.cropType}</p>}
            </div>
            <div>
              <Label>Cost per Unit (₹)</Label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="number"
                  placeholder="e.g. 1200"
                  className={`pl-10 ${errors.costPerUnit ? "border-destructive" : ""}`}
                  value={costPerUnit}
                  onChange={(e) => setCostPerUnit(e.target.value)}
                />
              </div>
              {errors.costPerUnit && <p className="text-xs text-destructive mt-1">{errors.costPerUnit}</p>}
            </div>
            <div>
              <Label>Expected Yield (Quintals)</Label>
              <Input
                type="number"
                placeholder="e.g. 50"
                className={errors.expectedYield ? "border-destructive" : ""}
                value={expectedYield}
                onChange={(e) => setExpectedYield(e.target.value)}
              />
              {errors.expectedYield && <p className="text-xs text-destructive mt-1">{errors.expectedYield}</p>}
            </div>
            <div>
              <Label>Current Market Price (₹ per Quintal)</Label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="number"
                  placeholder="e.g. 2500"
                  className={`pl-10 ${errors.marketPrice ? "border-destructive" : ""}`}
                  value={marketPrice}
                  onChange={(e) => setMarketPrice(e.target.value)}
                />
              </div>
              {errors.marketPrice && <p className="text-xs text-destructive mt-1">{errors.marketPrice}</p>}
            </div>
            <Button className="w-full" onClick={calculate}>Calculate Profit</Button>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Estimation Results</CardTitle>
          </CardHeader>
          <CardContent>
            {estimation ? (
              <div className="space-y-5 animate-fade-in">
                <ResultRow label="Total Cost" value={formatINR(estimation.totalCost)} variant="neutral" />
                <ResultRow label="Estimated Revenue" value={formatINR(estimation.revenue)} variant="neutral" />
                <div className="rounded-xl bg-secondary p-5">
                  <p className="text-sm text-muted-foreground">Estimated Profit</p>
                  <p className={`text-3xl font-bold ${estimation.profit >= 0 ? "text-success" : "text-destructive"}`}>
                    {formatINR(estimation.profit)}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  * Estimation based on {cropType} at current market rates. Actual results may vary.
                </p>
              </div>
            ) : (
              <div className="flex h-48 items-center justify-center text-muted-foreground">
                <p className="text-sm">Fill in the form and calculate to see results.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

function ResultRow({ label, value, variant }: { label: string; value: string; variant: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}

export default ProfitEstimator;
