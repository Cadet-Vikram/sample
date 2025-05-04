
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface SensorData {
  id: string;
  type: string;
  value: number;
  unit: string;
  status: "normal" | "warning" | "critical";
  timestamp: Date;
  thresholds: {
    warning: number;
    critical: number;
  };
}

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  notifyOn: ("critical" | "warning" | "sos")[];
}

interface UserProfile {
  name: string;
  age: number;
  bloodType: string;
  allergies: string[];
  medications: string[];
  conditions: string[];
  emergencyContacts: EmergencyContact[];
}

interface SensorContextType {
  sensors: SensorData[];
  emergencyContacts: EmergencyContact[];
  userProfile: UserProfile;
  triggerSOS: () => void;
  addEmergencyContact: (contact: Omit<EmergencyContact, "id">) => void;
  removeEmergencyContact: (id: string) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  sosActive: boolean;
  cancelSOS: () => void;
  alerts: Alert[];
}

interface Alert {
  id: string;
  sensorId: string;
  sensorType: string;
  severity: "warning" | "critical" | "sos";
  message: string;
  timestamp: Date;
  acknowledged: boolean;
}

const SensorContext = createContext<SensorContextType | undefined>(undefined);

const defaultUserProfile: UserProfile = {
  name: "John Doe",
  age: 35,
  bloodType: "O+",
  allergies: ["Peanuts", "Penicillin"],
  medications: ["Lisinopril", "Metformin"],
  conditions: ["Hypertension", "Type 2 Diabetes"],
  emergencyContacts: [
    {
      id: "contact1",
      name: "Jane Doe",
      relationship: "Spouse",
      phone: "+1-555-123-4567",
      email: "jane.doe@example.com",
      notifyOn: ["critical", "sos"]
    }
  ]
};

export const SensorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sensors, setSensors] = useState<SensorData[]>([]);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>(
    defaultUserProfile.emergencyContacts
  );
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultUserProfile);
  const [sosActive, setSosActive] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const initialSensors: SensorData[] = [
      {
        id: "temp1",
        type: "Temperature",
        value: 98.6,
        unit: "°F",
        status: "normal",
        timestamp: new Date(),
        thresholds: { warning: 99.5, critical: 101.0 }
      },
      {
        id: "hr1",
        type: "Heart Rate",
        value: 72,
        unit: "BPM",
        status: "normal",
        timestamp: new Date(),
        thresholds: { warning: 100, critical: 120 }
      },
      {
        id: "bp1",
        type: "Blood Pressure",
        value: 120,
        unit: "mmHg",
        status: "normal",
        timestamp: new Date(),
        thresholds: { warning: 140, critical: 160 }
      },
      {
        id: "ox1",
        type: "Oxygen",
        value: 98,
        unit: "%",
        status: "normal",
        timestamp: new Date(),
        thresholds: { warning: 92, critical: 88 }
      },
      {
        id: "glu1",
        type: "Glucose",
        value: 105,
        unit: "mg/dL",
        status: "normal",
        timestamp: new Date(),
        thresholds: { warning: 140, critical: 180 }
      },
    ];

    setSensors(initialSensors);

    const interval = setInterval(() => {
      setSensors(prevSensors => 
        prevSensors.map(sensor => {
          let fluctuation = (Math.random() - 0.5) * 5;
          
          if (Math.random() < 0.05) {
            fluctuation = Math.random() * 10 + 5;
          }
          
          let newValue = sensor.value + fluctuation;
          
          switch(sensor.type) {
            case "Temperature":
              newValue = Math.max(95, Math.min(103, newValue));
              break;
            case "Heart Rate":
              newValue = Math.max(50, Math.min(150, newValue));
              break;
            case "Blood Pressure":
              newValue = Math.max(90, Math.min(180, newValue));
              break;
            case "Oxygen":
              newValue = Math.max(85, Math.min(100, newValue));
              break;
            case "Glucose":
              newValue = Math.max(70, Math.min(200, newValue));
              break;
          }
          
          let status: "normal" | "warning" | "critical" = "normal";
          if (newValue >= sensor.thresholds.critical) {
            status = "critical";
          } else if (newValue >= sensor.thresholds.warning) {
            status = "warning";
          }
          
          if (status !== "normal" && status !== sensor.status) {
            const newAlert: Alert = {
              id: `alert-${Date.now()}`,
              sensorId: sensor.id,
              sensorType: sensor.type,
              severity: status,
              message: `${sensor.type} is ${status}! Value: ${newValue.toFixed(1)} ${sensor.unit}`,
              timestamp: new Date(),
              acknowledged: false
            };
            
            setAlerts(prev => [...prev, newAlert]);
            
            // Fix: Remove the variant property and use the correct toast method
            if (status === "critical") {
              toast.error(`${sensor.type} Alert`, {
                description: `${sensor.type} reading is ${status}. Value: ${newValue.toFixed(1)} ${sensor.unit}`,
              });
            } else {
              toast.warning(`${sensor.type} Alert`, {
                description: `${sensor.type} reading is ${status}. Value: ${newValue.toFixed(1)} ${sensor.unit}`,
              });
            }
          }
          
          return {
            ...sensor,
            value: parseFloat(newValue.toFixed(1)),
            status,
            timestamp: new Date()
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const triggerSOS = () => {
    setSosActive(true);
    
    const sosAlert: Alert = {
      id: `sos-${Date.now()}`,
      sensorId: "sos1",
      sensorType: "SOS Button",
      severity: "sos",
      message: "SOS Emergency Button Activated!",
      timestamp: new Date(),
      acknowledged: false
    };
    
    setAlerts(prev => [...prev, sosAlert]);
    
    toast.error("SOS ACTIVATED", {
      description: "Emergency contacts are being notified.",
      duration: 10000,
    });
    
    console.log("SOS triggered - would notify:", emergencyContacts.filter(c => c.notifyOn.includes("sos")));
  };

  const cancelSOS = () => {
    setSosActive(false);
    toast.success("SOS Cancelled", {
      description: "Emergency notification has been cancelled."
    });
  };

  const addEmergencyContact = (contact: Omit<EmergencyContact, "id">) => {
    const newContact = {
      ...contact,
      id: `contact-${Date.now()}`
    };
    
    setEmergencyContacts(prev => [...prev, newContact]);
    setUserProfile(prev => ({
      ...prev,
      emergencyContacts: [...prev.emergencyContacts, newContact]
    }));
    
    toast.success("Contact Added", {
      description: `${contact.name} added to emergency contacts.`
    });
  };

  const removeEmergencyContact = (id: string) => {
    setEmergencyContacts(prev => prev.filter(contact => contact.id !== id));
    setUserProfile(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.filter(contact => contact.id !== id)
    }));
    
    toast.success("Contact Removed", {
      description: "Emergency contact has been removed."
    });
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...profile }));
    toast.success("Profile Updated", {
      description: "Your profile has been updated successfully."
    });
  };

  return (
    <SensorContext.Provider
      value={{
        sensors,
        emergencyContacts,
        userProfile,
        triggerSOS,
        addEmergencyContact,
        removeEmergencyContact,
        updateUserProfile,
        sosActive,
        cancelSOS,
        alerts,
      }}
    >
      {children}
    </SensorContext.Provider>
  );
};

export const useSensors = () => {
  const context = useContext(SensorContext);
  if (context === undefined) {
    throw new Error("useSensors must be used within a SensorProvider");
  }
  return context;
};
