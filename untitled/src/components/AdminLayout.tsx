import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ListTodo, ShieldCheck, Settings, Plus, LogOut } from "lucide-react";
import { cn } from "../lib/utils";

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      <nav className="bg-surface-container w-64 fixed left-0 top-0 h-screen rounded-r-2xl shadow-[10px_0_20px_rgba(0,0,0,0.05),inset_8px_0_12px_rgba(255,255,255,0.8)] z-40 hidden md:flex flex-col py-8 border-r border-white/50">
        <div className="px-6 mb-8">
          <h1 className="font-heading text-2xl font-bold text-primary">Admin Portal</h1>
          <p className="text-sm text-on-surface-variant mt-1">Manage Transparency</p>
        </div>
        <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-2">
          <Link to="/admin" className={cn("flex items-center px-4 py-3 rounded-xl transition-all text-sm font-medium", location.pathname === "/admin" ? "bg-primary-container text-on-primary-container shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.1),inset_4px_4px_8px_rgba(255,255,255,0.5)] border border-white/50" : "text-on-surface-variant hover:bg-surface-variant/50")}>
            <LayoutDashboard className="mr-3" size={20} /> Dashboard
          </Link>
        </div>
        <div className="px-4 mt-auto space-y-4">
          <div className="flex items-center gap-3 px-2 pt-4 border-t border-outline-variant/30">
            <div className="w-10 h-10 rounded-full bg-surface-variant shadow-sm flex items-center justify-center font-heading font-bold text-primary border border-white">A</div>
            <div className="flex-1 overflow-hidden">
              <p className="font-medium text-sm text-on-surface truncate">Admin User</p>
              <p className="text-xs text-on-surface-variant truncate">admin@assam.gov.in</p>
            </div>
            <Link to="/" className="text-outline hover:text-error transition-colors"><LogOut size={18} /></Link>
          </div>
        </div>
      </nav>
      <main className="flex-1 md:ml-64 h-screen overflow-y-auto p-6 md:p-12">
        <Outlet />
      </main>
    </div>
  );
}
