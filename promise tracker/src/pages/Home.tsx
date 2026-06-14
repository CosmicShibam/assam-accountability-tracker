import React, { useState } from "react";
import { Search, RotateCcw, Box, CheckCircle, RefreshCw, Hourglass, Building2, Bell, Gavel, HandHeart, Briefcase, BookOpen, Sprout, HeartPulse, TrendingUp, MessageSquarePlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { usePromises } from "../context/PromiseContext";
import { getNormalizedStatus, getStatusStyles } from "../types";
import HeroSection from "../components/HeroSection";

export default function Home() {
  const { promises } = usePromises();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const total = promises.length;
  const fulfilledCount = promises.filter(p => getNormalizedStatus(p.status) === 'fulfilled').length;
  const inProgressCount = promises.filter(p => getNormalizedStatus(p.status) === 'in_progress').length;
  const pendingCount = promises.filter(p => getNormalizedStatus(p.status) === 'pending').length;

  const featuredPromises = promises.slice(0, 3); // Get first 3 as featured

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/promises?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/promises');
    }
  };

  return (
    <div className="w-full flex flex-col">
      <HeroSection />

      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-12 flex flex-col gap-12">
        <section className="flex flex-col items-center text-center mt-2">
          <form onSubmit={handleSearch} className="w-full max-w-3xl relative group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-primary">
              <Search size={24} />
            </div>
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-16 pl-16 pr-32 rounded-full clay-recessed text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border-none" 
              placeholder="Search across all government promises, policies, and projects..." 
              type="text" 
            />
            <button type="submit" className="absolute inset-y-2 right-2 bg-primary text-on-primary clay-btn rounded-full px-6 font-medium hover:scale-105 active:scale-95 transition-all text-sm">
              Search
            </button>
          </form>
        </section>

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/promises" className="rounded-3xl p-6 flex flex-col items-center text-center bg-primary-container shadow-[10px_10px_20px_rgba(0,36,136,0.1),inset_4px_4px_10px_rgba(255,255,255,0.8),inset_-4px_-4px_12px_rgba(0,36,136,0.1)] border border-primary-container/50 hover:scale-105 active:scale-95 transition-transform cursor-pointer">
          <Box size={32} className="text-on-primary-container mb-2 opacity-80" />
          <span className="font-heading text-3xl font-bold text-on-primary-container">{total}</span>
          <span className="text-sm font-medium text-on-primary-container opacity-90 mt-1">Total Promises</span>
        </Link>
        <Link to="/promises?status=fulfilled" className="rounded-3xl p-6 flex flex-col items-center text-center bg-secondary-container shadow-[10px_10px_20px_rgba(36,112,62,0.1),inset_4px_4px_10px_rgba(255,255,255,0.8),inset_-4px_-4px_12px_rgba(36,112,62,0.1)] border border-secondary-container/50 hover:scale-105 active:scale-95 transition-transform cursor-pointer">
          <CheckCircle size={32} className="text-on-secondary-container mb-2 opacity-80" />
          <span className="font-heading text-3xl font-bold text-on-secondary-container">{fulfilledCount}</span>
          <span className="text-sm font-medium text-on-secondary-container opacity-90 mt-1">Fulfilled</span>
        </Link>
        <Link to="/promises?status=in_progress" className="rounded-3xl p-6 flex flex-col items-center text-center bg-surface-container-high shadow-[10px_10px_20px_rgba(64,86,184,0.05),inset_4px_4px_10px_rgba(255,255,255,1),inset_-4px_-4px_12px_rgba(64,86,184,0.05)] border border-white hover:scale-105 active:scale-95 transition-transform cursor-pointer">
          <RefreshCw size={32} className="text-primary mb-2 opacity-80" />
          <span className="font-heading text-3xl font-bold text-on-surface">{inProgressCount}</span>
          <span className="text-sm font-medium text-on-surface-variant mt-1">In Progress</span>
        </Link>
        <Link to="/promises?status=pending" className="rounded-3xl p-6 flex flex-col items-center text-center bg-surface-variant shadow-[10px_10px_20px_rgba(68,70,82,0.1),inset_4px_4px_10px_rgba(255,255,255,0.8),inset_-4px_-4px_12px_rgba(68,70,82,0.1)] border border-white hover:scale-105 active:scale-95 transition-transform cursor-pointer">
          <Hourglass size={32} className="text-on-surface-variant mb-2 opacity-80" />
          <span className="font-heading text-3xl font-bold text-on-surface-variant">{pendingCount}</span>
          <span className="text-sm font-medium text-on-surface-variant opacity-90 mt-1">Pending</span>
        </Link>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-12">
          <section>
            <h3 className="font-heading text-2xl font-bold text-primary mb-6">Explore by Category</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { name: "Law and governance", label: "Law", icon: Gavel, color: "text-primary" },
                { name: "Employment", label: "Employment", icon: Briefcase, color: "text-secondary" },
                { name: "Welfare", label: "Welfare", icon: HandHeart, color: "text-on-primary-container" },
                { name: "Infrastructure", label: "Infrastructure", icon: Building2, color: "text-tertiary" },
                { name: "Education", label: "Education", icon: BookOpen, color: "text-primary" },
                { name: "Agriculture", label: "Agriculture", icon: Sprout, color: "text-secondary" },
                { name: "Health", label: "Health", icon: HeartPulse, color: "text-on-primary-container" },
                { name: "Economy & Startup", label: "Economy", icon: TrendingUp, color: "text-tertiary" }
              ].map((cat, i) => (
                <Link to={`/promises?category=${encodeURIComponent(cat.name)}`} key={i} className="clay-card rounded-[2rem] p-6 flex flex-col items-center text-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all group border border-white">
                  <div className={`w-16 h-16 rounded-full clay-recessed flex items-center justify-center ${cat.color} border border-white/50`}>
                    <cat.icon size={32} />
                  </div>
                  <span className="font-medium text-on-surface text-sm">{cat.label}</span>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <div className="flex justify-between items-end mb-6">
              <h3 className="font-heading text-2xl font-bold text-primary">Featured Promises</h3>
              <Link to="/promises" className="text-sm font-medium text-primary hover:underline">View All</Link>
            </div>
            <div className="flex flex-col gap-6">
              {featuredPromises.map((p) => {
                const styles = getStatusStyles(p.status);
                return (
                  <div key={p.id} className="clay-card rounded-[2rem] p-8 flex flex-col gap-6">
                    <div className="flex justify-between items-start gap-4">
                      <h4 className="font-heading text-xl font-medium text-on-surface">{p.title}</h4>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap shadow-sm border ${styles.badge}`}>
                        {styles.label}
                      </span>
                    </div>
                    <p className="text-on-surface-variant font-medium text-sm line-clamp-2">{p.promiseText}</p>
                    <div className="flex justify-between items-center border-t border-surface-variant/50 pt-4 mt-2">
                      <div className="flex items-center gap-2 text-outline">
                        <CheckCircle size={16} />
                        <span className="text-xs font-medium">{p.category}</span>
                      </div>
                      <Link to={`/promises/${p.id}`} className="text-primary text-sm font-semibold hover:underline">View Details</Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 flex flex-col">
          <div className="clay-card rounded-[2rem] p-6 h-full flex flex-col">
            <h3 className="font-heading text-2xl font-bold text-primary mb-6 flex items-center gap-2">
              <Bell size={24} /> Recent Evidence
            </h3>
            <div className="flex flex-col gap-6 relative flex-grow">
              <div className="absolute left-6 top-2 bottom-2 w-px bg-surface-variant"></div>
              
              {[
                { title: "Anti-polygamy bill passed", time: "Nov 2025", desc: "Historical step for women in the assembly.", icon: Box, color: "text-secondary" },
                { title: "Orunodoi 3.0 launched", time: "Oct 2025", desc: "Enhanced ₹1,250 monthly benefit disbursed.", icon: CheckCircle, color: "text-secondary" },
                { title: "₹18,000Cr Flood Mission", time: "Apr 2026", desc: "Details announced in BJP manifesto.", icon: Box, color: "text-primary" }
              ].map((ev, i) => (
                <div key={i} className="flex gap-4 relative z-10">
                  <div className={`w-12 h-12 rounded-full clay-card bg-surface flex-shrink-0 flex items-center justify-center ${ev.color} border border-white`}>
                    <ev.icon size={20} />
                  </div>
                  <div className="clay-recessed rounded-2xl p-4 flex-grow border border-white/30 bg-surface">
                    <span className="text-xs font-medium text-outline block mb-1">{ev.time}</span>
                    <h5 className="font-heading text-sm font-medium text-on-surface mb-1">{ev.title}</h5>
                    <p className="text-xs text-on-surface-variant">{ev.desc}</p>
                  </div>
                </div>
              ))}
              
              <Link to="/evidence" className="mt-auto pt-4 text-center text-sm font-bold text-primary hover:underline">
                View All Updates
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
      
      {/* Floating Action Button */}
      <a 
        href="https://docs.google.com/forms/d/e/1FAIpQLSesbWz8DIA9F6iFvxQ_P9RW7dG_DwyXR4VEy4RW-qfm_7feww/viewform?usp=publish-editor"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-primary text-on-primary clay-btn px-4 py-3 rounded-full font-bold shadow-lg hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm group border border-white/20"
      >
        <MessageSquarePlus size={18} className="group-hover:animate-pulse" />
        <span className="tracking-wide">SUBMIT AN UPDATE</span>
      </a>
    </div>
  );
}
