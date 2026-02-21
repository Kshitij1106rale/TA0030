import { useState, useCallback } from "react";
import { Upload, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AnalysisResult {
  disease: string;
  confidence: number;
  treatment: string;
}

const mockResults: AnalysisResult[] = [
  { disease: "Leaf Blight", confidence: 94.2, treatment: "Apply Mancozeb fungicide at 2.5g/L. Ensure proper drainage and avoid overhead irrigation." },
  { disease: "Powdery Mildew", confidence: 87.5, treatment: "Spray Sulfur-based fungicide. Improve air circulation around plants." },
  { disease: "Bacterial Wilt", confidence: 91.0, treatment: "Remove infected plants immediately. Apply copper-based bactericide to surrounding area." },
];

const DiseaseDetection = () => {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
    setResult(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  }, [handleFile]);

  const analyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResult(mockResults[Math.floor(Math.random() * mockResults.length)]);
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Disease Detection 🔬</h1>
        <p className="text-muted-foreground">Upload a crop leaf image for AI-powered disease analysis.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition-colors cursor-pointer ${
                dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
              onClick={() => document.getElementById("file-input")?.click()}
            >
              {image ? (
                <img src={image} alt="Uploaded crop" className="max-h-64 rounded-lg object-contain" />
              ) : (
                <>
                  <Upload className="mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="text-sm font-medium text-foreground">Drag & drop your crop leaf image</p>
                  <p className="text-xs text-muted-foreground mt-1">or click to browse files</p>
                </>
              )}
              <input id="file-input" type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
            </div>
            {image && (
              <Button className="mt-4 w-full" onClick={analyze} disabled={analyzing}>
                {analyzing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</> : "Analyze Image"}
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Analysis Result</CardTitle>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-5 animate-fade-in">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-6 w-6 text-destructive" />
                  <div>
                    <p className="text-sm text-muted-foreground">Disease Detected</p>
                    <p className="text-xl font-bold text-foreground">{result.disease}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                  <div>
                    <p className="text-sm text-muted-foreground">Confidence</p>
                    <Badge variant="secondary" className="text-base font-semibold">{result.confidence}%</Badge>
                  </div>
                </div>
                <div className="rounded-xl bg-secondary p-4">
                  <p className="text-sm font-semibold text-secondary-foreground mb-1">💊 Treatment Recommendation</p>
                  <p className="text-sm text-muted-foreground">{result.treatment}</p>
                </div>
              </div>
            ) : (
              <div className="flex h-48 items-center justify-center text-muted-foreground">
                <p className="text-sm">Upload and analyze an image to see results.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DiseaseDetection;
