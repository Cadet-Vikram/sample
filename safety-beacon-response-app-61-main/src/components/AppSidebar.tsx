
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useSensors } from "@/context/SensorContext";
import { 
  Bell,
  Home,
  User,
  Users,
  Map,
  AlertCircle,
  Activity,
  Menu,
  X
} from "lucide-react";
import EmergencyButton from "./EmergencyButton";

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
};

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { alerts, sosActive } = useSensors();
  
  const unacknowledgedAlerts = alerts.filter(alert => !alert.acknowledged).length;
  
  const navItems: NavItem[] = [
    { title: "Dashboard", href: "/", icon: Home },
    { title: "Health Data", href: "/health", icon: Activity },
    { title: "Alerts", href: "/alerts", icon: Bell },
    { title: "Profile", href: "/profile", icon: User },
    { title: "Emergency Contacts", href: "/contacts", icon: Users },
    { title: "Location", href: "/location", icon: Map },
    { title: "Emergency Help", href: "/emergency", icon: AlertCircle },
  ];

  return (
    <div className={cn(
      "flex flex-col bg-sidebar text-sidebar-foreground min-h-screen border-r border-sidebar-border transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="flex items-center">
            <AlertCircle className="w-6 h-6 text-emergency mr-2" />
            <h1 className="text-xl font-bold">ALERTCORE</h1>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:text-white hover:bg-sidebar-accent"
        >
          {collapsed ? <Menu /> : <X />}
        </Button>
      </div>
      <Separator className="bg-sidebar-border" />
      <div className="flex-1 py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => (
            <Link to={item.href} key={item.href}>
              <div className={cn(
                "flex items-center py-2 px-3 rounded-md transition-colors relative",
                location.pathname === item.href ? "bg-sidebar-accent text-white" : "text-sidebar-foreground hover:bg-sidebar-accent/60"
              )}>
                <item.icon className="h-5 w-5" />
                {!collapsed && (
                  <>
                    <span className="ml-3">{item.title}</span>
                    {item.title === "Alerts" && unacknowledgedAlerts > 0 && (
                      <span className="ml-auto bg-emergency text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {unacknowledgedAlerts}
                      </span>
                    )}
                  </>
                )}
                {collapsed && item.title === "Alerts" && unacknowledgedAlerts > 0 && (
                  <span className="absolute -right-1 -top-1 bg-emergency text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
                    {unacknowledgedAlerts}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4">
        {collapsed ? (
          <Link to="/emergency">
            <Button 
              variant="destructive" 
              size="icon"
              className={cn(
                "w-full", 
                sosActive ? "animate-pulse" : ""
              )}
            >
              <AlertCircle className="h-5 w-5" />
            </Button>
          </Link>
        ) : (
          <EmergencyButton />
        )}
      </div>
    </div>
  );
}
