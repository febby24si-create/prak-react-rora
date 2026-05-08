import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div id="app-container" className="bg-gray-100 min-h-screen flex">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div id="layout-wrapper" className="flex flex-col flex-1">
        
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="p-5 flex-1 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}