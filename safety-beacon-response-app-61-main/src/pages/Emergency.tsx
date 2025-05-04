
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Phone, Users, MapPin } from "lucide-react";
import { useSensors } from "@/context/SensorContext";
import EmergencyButton from "@/components/EmergencyButton";

export default function Emergency() {
  const { sosActive } = useSensors();

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <AlertCircle className="mr-2 h-6 w-6" /> Emergency Help
        </h1>
        <p className="text-muted-foreground">Access emergency services and contacts</p>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Emergency SOS</CardTitle>
          <CardDescription>Activate SOS to notify your emergency contacts</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className={`p-6 rounded-full mb-6 ${sosActive ? 'bg-destructive/20 animate-pulse' : 'bg-muted'}`}>
            <AlertCircle className={`h-16 w-16 ${sosActive ? 'text-destructive' : 'text-muted-foreground'}`} />
          </div>
          
          <EmergencyButton />
          
          <p className="text-sm text-muted-foreground mt-4 text-center max-w-md">
            {sosActive 
              ? "SOS is active. Your emergency contacts are being notified with your current status and location."
              : "Press the SOS button in case of emergency. This will alert your emergency contacts."}
          </p>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Emergency Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-muted p-2 rounded-full mr-3">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Emergency Number</p>
                  <p className="text-sm text-muted-foreground">General Emergency</p>
                </div>
              </div>
              <Button variant="secondary">
                911
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-muted p-2 rounded-full mr-3">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Poison Control</p>
                  <p className="text-sm text-muted-foreground">Toxicology Emergency</p>
                </div>
              </div>
              <Button variant="secondary">
                1-800-222-1222
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" variant="outline">
              <MapPin className="mr-2 h-4 w-4" />
              Share Location
            </Button>
            <Button className="w-full" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Contact Emergency Services
            </Button>
            <Button className="w-full" variant="outline">
              <AlertCircle className="mr-2 h-4 w-4" />
              Emergency Instructions
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
