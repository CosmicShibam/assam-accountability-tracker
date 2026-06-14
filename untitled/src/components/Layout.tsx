import { Outlet, Link, useLocation } from "react-router-dom";
import { Landmark } from "lucide-react";
import { cn } from "../lib/utils";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-surface/80 backdrop-blur-md shadow-[0_10px_20px_rgba(64,86,184,0.05),inset_0_8px_12px_rgba(255,255,255,0.8)] w-full sticky top-0 z-50 transition-all">
        <div className="flex justify-between items-center h-20 px-6 max-w-[1280px] mx-auto">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-full clay-card flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <Landmark size={20} className="text-primary" />
            </div>
            <h1 className="font-heading text-xl font-bold text-primary tracking-tight">Assam Promise Tracker</h1>
          </Link>
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
            <Link to="/" className={cn("pb-1 px-1 transition-colors", location.pathname === "/" ? "text-primary font-bold border-b-2 border-primary" : "text-on-surface-variant hover:text-primary")}>Home</Link>
            <Link to="/promises" className={cn("pb-1 px-1 transition-colors", location.pathname.startsWith("/promises") ? "text-primary font-bold border-b-2 border-primary" : "text-on-surface-variant hover:text-primary")}>Promises</Link>
            <Link to="/evidence" className={cn("pb-1 px-1 transition-colors", location.pathname === "/evidence" ? "text-primary font-bold border-b-2 border-primary" : "text-on-surface-variant hover:text-primary")}>Evidence</Link>
            <Link to="/methodology" className={cn("pb-1 px-1 transition-colors", location.pathname === "/methodology" ? "text-primary font-bold border-b-2 border-primary" : "text-on-surface-variant hover:text-primary")}>Methodology</Link>
          </nav>
          <div className="flex items-center">
            <Link to="/admin/login" className="bg-primary text-on-primary clay-btn font-medium px-6 py-2.5 rounded-full hover:scale-105 transition-transform duration-200 active:scale-95 text-sm">
              Login
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-grow flex flex-col w-full">
        <Outlet />
      </div>

      <footer className="bg-surface-container-highest shadow-[0_-10px_20px_rgba(0,0,0,0.02),inset_0_8px_12px_rgba(255,255,255,0.4)] w-full mt-12 rounded-t-3xl border-t border-white/50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 py-12 max-w-[1280px] mx-auto text-sm">
          <div className="md:col-span-2 flex flex-col gap-4">
            <h2 className="font-heading text-xl text-primary font-bold">Assam Promise Tracker</h2>
            <p className="text-on-surface-variant max-w-sm">
              © 2024 Assam Promise Tracker. Civic transparency initiative dedicated to accountability and progress tracking.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-on-surface font-bold mb-2">Platform</span>
            <Link to="/methodology" className="text-on-surface-variant hover:text-primary transition-colors">Methodology</Link>
            <Link to="/evidence" className="text-on-surface-variant hover:text-primary transition-colors">Evidence</Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-on-surface font-bold mb-2">Legal</span>
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
