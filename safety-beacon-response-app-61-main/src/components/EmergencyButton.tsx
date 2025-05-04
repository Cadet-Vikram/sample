
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSensors } from "@/context/SensorContext";
import { AlertCircle, X } from "lucide-react";

export default function EmergencyButton() {
  const [showConfirm, setShowConfirm] = useState(false);
  const { triggerSOS, sosActive, cancelSOS } = useSensors();

  const handleSOS = () => {
    if (sosActive) {
      setShowConfirm(true);
    } else {
      setShowConfirm(true);
    }
  };

  const confirmSOS = () => {
    triggerSOS();
    setShowConfirm(false);
  };

  const confirmCancel = () => {
    cancelSOS();
    setShowConfirm(false);
  };

  return (
    <>
      <Button 
        variant="destructive" 
        size="lg"
        className={`emergency-btn ${sosActive ? 'animate-pulse-emergency' : ''}`}
        onClick={handleSOS}
      >
        <AlertCircle className="mr-2 h-5 w-5" />
        {sosActive ? "CANCEL SOS" : "SOS EMERGENCY"}
      </Button>

      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              {sosActive 
                ? "Cancel Emergency Alert?" 
                : "Confirm Emergency Alert"}
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              {sosActive 
                ? "Are you sure you want to cancel the emergency alert?" 
                : "This will notify all your emergency contacts."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-6">
            <AlertCircle className={`h-24 w-24 ${sosActive ? 'text-orange-500' : 'text-emergency'}`} />
          </div>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-center gap-2">
            <Button
              type="button"
              variant={sosActive ? "outline" : "destructive"}
              onClick={sosActive ? confirmCancel : confirmSOS}
              className="w-full sm:w-auto"
            >
              {sosActive ? "Yes, Cancel Alert" : "Yes, Send Alert"}
            </Button>
            <Button
              type="button"
              variant={sosActive ? "destructive" : "outline"}
              onClick={() => setShowConfirm(false)}
              className="w-full sm:w-auto"
            >
              {sosActive ? "Keep Alert Active" : "Cancel"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
