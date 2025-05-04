
import { useSensors } from "@/context/SensorContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function AlertsSummary() {
  const { alerts } = useSensors();
  
  // Get the most recent 3 alerts
  const recentAlerts = [...alerts]
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 3);

  const getBadgeVariant = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive";
      case "warning":
        return "secondary";  // Changed from "warning" to "secondary" to match available variants
      case "sos":
        return "destructive";
      default:
        return "outline";
    }
  };

  if (alerts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Recent Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-muted-foreground">
            No alerts to display
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="mr-2 h-5 w-5" />
          Recent Alerts
          <Badge variant="outline" className="ml-auto">
            {alerts.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {recentAlerts.map((alert) => (
            <div key={alert.id} className="p-4 flex items-start">
              <Badge variant={getBadgeVariant(alert.severity)} className="mr-2 mt-1">
                {alert.severity.toUpperCase()}
              </Badge>
              <div className="flex-1">
                <p className="font-medium">{alert.message}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
