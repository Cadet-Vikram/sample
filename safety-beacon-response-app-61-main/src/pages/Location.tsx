
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export default function Location() {
  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <MapPin className="mr-2 h-6 w-6" /> Location Tracking
        </h1>
        <p className="text-muted-foreground">Monitor location for emergency assistance</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Current Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-muted rounded-md flex flex-col items-center justify-center">
            <MapPin className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">Map View</p>
            <p className="text-sm text-muted-foreground mt-1">
              Location services would be displayed here in a real implementation
            </p>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Latitude:</span>
              <span>37.7749° N</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Longitude:</span>
              <span>122.4194° W</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Last Updated:</span>
              <span>1 minute ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
