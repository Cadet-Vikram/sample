
import { useState } from "react";
import { useSensors } from "@/context/SensorContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, UserPlus, Phone, Mail, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function EmergencyContacts() {
  const { emergencyContacts, addEmergencyContact, removeEmergencyContact } = useSensors();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    relationship: "",
    phone: "",
    email: "",
    notifyOn: ["sos"] as ("critical" | "warning" | "sos")[],
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewContact(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCheckboxChange = (value: "critical" | "warning" | "sos") => {
    setNewContact(prev => {
      if (prev.notifyOn.includes(value)) {
        return {
          ...prev,
          notifyOn: prev.notifyOn.filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          notifyOn: [...prev.notifyOn, value]
        };
      }
    });
  };
  
  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) {
      return; // Validation would go here
    }
    
    addEmergencyContact(newContact);
    setNewContact({
      name: "",
      relationship: "",
      phone: "",
      email: "",
      notifyOn: ["sos"],
    });
    setIsAddDialogOpen(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Users className="mr-2 h-6 w-6" /> Emergency Contacts
          </h1>
          <p className="text-muted-foreground">People to notify in case of emergency</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Emergency Contact</DialogTitle>
              <DialogDescription>
                Add someone who should be notified in case of emergency
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newContact.name}
                  onChange={handleInputChange}
                  placeholder="Full name"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="relationship" className="text-right">
                  Relationship
                </Label>
                <Input
                  id="relationship"
                  name="relationship"
                  value={newContact.relationship}
                  onChange={handleInputChange}
                  placeholder="e.g. Spouse, Parent, Friend"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={newContact.phone}
                  onChange={handleInputChange}
                  placeholder="Phone number"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  value={newContact.email}
                  onChange={handleInputChange}
                  placeholder="Email address"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Notify On
                </Label>
                <div className="col-span-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="notify-sos"
                      checked={newContact.notifyOn.includes("sos")}
                      onCheckedChange={() => handleCheckboxChange("sos")}
                    />
                    <label
                      htmlFor="notify-sos"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      SOS Emergency
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="notify-critical"
                      checked={newContact.notifyOn.includes("critical")}
                      onCheckedChange={() => handleCheckboxChange("critical")}
                    />
                    <label
                      htmlFor="notify-critical"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Critical Alerts
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="notify-warning"
                      checked={newContact.notifyOn.includes("warning")}
                      onCheckedChange={() => handleCheckboxChange("warning")}
                    />
                    <label
                      htmlFor="notify-warning"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Warning Alerts
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddContact}>Add Contact</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Emergency Contacts</CardTitle>
          <CardDescription>
            These people will be notified based on your alert settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          {emergencyContacts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-2 opacity-20" />
              <p>No emergency contacts added yet</p>
              <p className="text-sm">Add contacts to notify during emergencies</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Relationship</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Notify On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {emergencyContacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">{contact.name}</TableCell>
                    <TableCell>{contact.relationship}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          <span className="text-sm">{contact.phone}</span>
                        </div>
                        {contact.email && (
                          <div className="flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            <span className="text-sm">{contact.email}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {contact.notifyOn.includes("sos") && (
                          <span className="bg-emergency/20 text-emergency text-xs px-2 py-1 rounded">
                            SOS
                          </span>
                        )}
                        {contact.notifyOn.includes("critical") && (
                          <span className="bg-alert-high/20 text-alert-high text-xs px-2 py-1 rounded">
                            Critical
                          </span>
                        )}
                        {contact.notifyOn.includes("warning") && (
                          <span className="bg-alert-medium/20 text-alert-medium text-xs px-2 py-1 rounded">
                            Warning
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeEmergencyContact(contact.id)}
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
