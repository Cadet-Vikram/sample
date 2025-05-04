
import { useSensors } from "@/context/SensorContext";
import SensorCard from "@/components/SensorCard";
import EmergencyButton from "@/components/EmergencyButton";
import AlertsSummary from "@/components/AlertsSummary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, MapPin, Activity, AlertCircle } from "lucide-react";

export default function Dashboard() {
  const { sensors, userProfile, sosActive } = useSensors();

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Health Dashboard</h1>
          <p className="text-muted-foreground">Monitor your vitals and alerts in real-time</p>
        </div>
        <div className="mt-4 md:mt-0">
          <EmergencyButton />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card className={sosActive ? "border-emergency animate-pulse-emergency" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <User className="h-4 w-4 mr-2" /> User Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-bold">{userProfile.name}</h3>
            <div className="text-sm text-muted-foreground mt-1">
              Age: {userProfile.age} • Blood Type: {userProfile.bloodType}
            </div>
            <div className="mt-2">
              <div className="text-xs font-medium uppercase text-muted-foreground">Medical Conditions</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {userProfile.conditions.map(condition => (
                  <span key={condition} className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded">
                    {condition}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <MapPin className="h-4 w-4 mr-2" /> Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Map View</p>
              {/* In a real app, this would be a map component */}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Activity className="h-4 w-4 mr-2" /> Status Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            {sosActive ? (
              <div className="bg-emergency/10 border border-emergency p-4 rounded-md text-center">
                <AlertCircle className="h-8 w-8 mx-auto text-emergency animate-pulse" />
                <h3 className="font-bold text-emergency mt-2">SOS ACTIVE</h3>
                <p className="text-sm">Emergency contacts are being notified</p>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Critical Alerts:</span>
                  <span className="font-bold">{sensors.filter(s => s.status === "critical").length}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Warning Alerts:</span>
                  <span className="font-bold">{sensors.filter(s => s.status === "warning").length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Sensors Normal:</span>
                  <span className="font-bold">{sensors.filter(s => s.status === "normal").length}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-bold mb-4">Vital Sensors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {sensors.map((sensor) => (
          <SensorCard
            key={sensor.id}
            type={sensor.type}
            value={sensor.value}
            unit={sensor.unit}
            status={sensor.status}
          />
        ))}
      </div>

      <div className="mb-6">
        <AlertsSummary />
      </div>
    </div>
  );
}
