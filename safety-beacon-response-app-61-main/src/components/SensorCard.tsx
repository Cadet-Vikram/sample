
import { Card, CardContent } from "@/components/ui/card";
import { 
  Activity,
  Thermometer,
  Heart,
  Droplet,
  BarChart
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SensorCardProps {
  type: string;
  value: number;
  unit: string;
  status: "normal" | "warning" | "critical";
}

export default function SensorCard({ type, value, unit, status }: SensorCardProps) {
  const getSensorIcon = () => {
    switch (type) {
      case "Temperature":
        return <Thermometer className="h-6 w-6" />;
      case "Heart Rate":
        return <Heart className="h-6 w-6" />;
      case "Blood Pressure":
        return <Activity className="h-6 w-6" />;
      case "Oxygen":
        return <Droplet className="h-6 w-6" />;
      case "Glucose":
        return <BarChart className="h-6 w-6" />;
      default:
        return <Activity className="h-6 w-6" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "critical":
        return "text-alert-high border-alert-high";
      case "warning":
        return "text-alert-medium border-alert-medium";
      default:
        return "text-green-600 border-green-600";
    }
  };

  const getStatusClass = () => {
    switch (status) {
      case "critical":
        return "animate-pulse-emergency";
      case "warning":
        return "animate-pulse";
      default:
        return "";
    }
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-md",
      status !== "normal" ? "border-2" : "",
      getStatusColor()
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">{type}</h3>
            <div className="flex items-end mt-1 space-x-1">
              <span className={cn(
                "text-3xl font-bold",
                status === "critical" ? "text-alert-high" : 
                status === "warning" ? "text-alert-medium" : 
                "text-foreground"
              )}>
                {value}
              </span>
              <span className="text-sm text-muted-foreground mb-1">{unit}</span>
            </div>
          </div>
          <div className={cn(
            "p-2 rounded-full",
            status === "critical" ? "bg-alert-high/10" : 
            status === "warning" ? "bg-alert-medium/10" : 
            "bg-green-600/10",
            getStatusClass()
          )}>
            {getSensorIcon()}
          </div>
        </div>
        <div className={cn(
          "mt-4 py-1 px-3 text-xs font-medium rounded-full w-fit",
          status === "critical" ? "bg-alert-high/10 text-alert-high" : 
          status === "warning" ? "bg-alert-medium/10 text-alert-medium" : 
          "bg-green-600/10 text-green-600"
        )}>
          {status === "critical" ? "Critical" : status === "warning" ? "Warning" : "Normal"}
        </div>
      </CardContent>
    </Card>
  );
}
