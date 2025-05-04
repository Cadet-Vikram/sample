
import { useEffect } from "react";
import { useSensors } from "@/context/SensorContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function Alerts() {
  const { alerts } = useSensors();
  
  const sortedAlerts = [...alerts]
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const getBadgeVariant = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive";
      case "warning":
        return "secondary";
      case "sos":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <Bell className="mr-2 h-6 w-6" /> Alert History
        </h1>
        <p className="text-muted-foreground">View and manage all health alerts</p>
      </div>
      
      {sortedAlerts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Bell className="h-12 w-12 text-muted-foreground opacity-20 mb-2" />
            <h3 className="text-xl font-medium">No Alerts</h3>
            <p className="text-muted-foreground">You don't have any alerts at the moment</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedAlerts.map((alert) => (
            <Card key={alert.id} className={`${alert.severity === "critical" ? "border-destructive/50" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Badge variant={getBadgeVariant(alert.severity)} className="mt-1">
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <div>
                      <h3 className="font-medium">{alert.message}</h3>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <span>{formatDistanceToNow(alert.timestamp, { addSuffix: true })}</span>
                        <span className="mx-2">•</span>
                        <span>Sensor: {alert.sensorType}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-8 w-8"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span className="sr-only">Mark as read</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
