import { Outlet } from "react-router-dom";
import { currentTheme } from "@/theme";
import { AppHeader } from "../AppHeader/AppHeader";
import { AppSidebar } from "../AppSidebar/AppSidebar";

export const AppLayout = () => {
  return (
    <div className={`flex min-h-screen ${currentTheme.appBackground} text-slate-900`}>
      <AppSidebar />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <AppHeader />
        <main className="min-h-0 flex-1 overflow-auto p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
