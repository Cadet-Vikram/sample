
import { useState } from "react";
import { useSensors } from "@/context/SensorContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, Save, X, Plus } from "lucide-react";

export default function Profile() {
  const { userProfile, updateUserProfile } = useSensors();
  
  const [formData, setFormData] = useState({
    name: userProfile.name,
    age: userProfile.age,
    bloodType: userProfile.bloodType,
    allergies: [...userProfile.allergies],
    medications: [...userProfile.medications],
    conditions: [...userProfile.conditions],
  });
  
  const [newItem, setNewItem] = useState({
    allergy: "",
    medication: "",
    condition: "",
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "age" ? parseInt(value) || 0 : value
    }));
  };
  
  const handleNewItemChange = (e: React.ChangeEvent<HTMLInputElement>, type: "allergy" | "medication" | "condition") => {
    setNewItem(prev => ({
      ...prev,
      [type]: e.target.value
    }));
  };
  
  const addItem = (type: "allergies" | "medications" | "conditions", itemType: "allergy" | "medication" | "condition") => {
    if (newItem[itemType].trim() === "") return;
    
    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], newItem[itemType]]
    }));
    
    setNewItem(prev => ({
      ...prev,
      [itemType]: ""
    }));
  };
  
  const removeItem = (type: "allergies" | "medications" | "conditions", index: number) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };
  
  const handleSave = () => {
    updateUserProfile(formData);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <User className="mr-2 h-6 w-6" /> Medical Profile
        </h1>
        <p className="text-muted-foreground">Manage your medical information for emergency situations</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Your basic medical information that will be shared in emergencies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input 
                name="name"
                value={formData.name} 
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Age</label>
              <Input 
                name="age"
                type="number" 
                value={formData.age} 
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Blood Type</label>
              <Input 
                name="bloodType"
                value={formData.bloodType} 
                onChange={handleInputChange}
              />
            </div>
          </div>
        </CardContent>
        
        <Separator className="my-4" />
        
        <CardHeader>
          <CardTitle>Medical Information</CardTitle>
          <CardDescription>Your medical conditions, allergies and current medications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Allergies</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.allergies.map((allergy, index) => (
                <Badge variant="secondary" key={`allergy-${index}`}>
                  {allergy}
                  <button 
                    onClick={() => removeItem("allergies", index)} 
                    className="ml-2 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Input 
                placeholder="Add allergy"
                value={newItem.allergy}
                onChange={(e) => handleNewItemChange(e, "allergy")}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addItem("allergies", "allergy");
                  }
                }}
              />
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => addItem("allergies", "allergy")}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Medications</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.medications.map((medication, index) => (
                <Badge variant="secondary" key={`medication-${index}`}>
                  {medication}
                  <button 
                    onClick={() => removeItem("medications", index)} 
                    className="ml-2 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Input 
                placeholder="Add medication"
                value={newItem.medication}
                onChange={(e) => handleNewItemChange(e, "medication")}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addItem("medications", "medication");
                  }
                }}
              />
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => addItem("medications", "medication")}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Medical Conditions</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.conditions.map((condition, index) => (
                <Badge variant="secondary" key={`condition-${index}`}>
                  {condition}
                  <button 
                    onClick={() => removeItem("conditions", index)} 
                    className="ml-2 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Input 
                placeholder="Add medical condition"
                value={newItem.condition}
                onChange={(e) => handleNewItemChange(e, "condition")}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addItem("conditions", "condition");
                  }
                }}
              />
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => addItem("conditions", "condition")}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            onClick={handleSave} 
            className="ml-auto"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Profile
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
