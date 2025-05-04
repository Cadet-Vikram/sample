
import { Outlet } from "react-router-dom";
import AppSidebar from "@/components/AppSidebar";
import { SensorProvider } from "@/context/SensorContext";

export default function Layout() {
  return (
    <SensorProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </SensorProvider>
  );
}
