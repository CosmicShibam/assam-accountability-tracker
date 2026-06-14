import { Lock, User, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="absolute top-6 left-6">
        <Link to="/" className="font-heading text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary to-secondary">
          PromiseTracker.
        </Link>
      </div>

      <div className="clay-card w-full max-w-md rounded-3xl p-8 md:p-10 border border-white relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="w-16 h-16 clay-recessed rounded-2xl bg-surface flex items-center justify-center text-primary mb-8 mx-auto">
            <Lock size={32} />
          </div>

          <h1 className="font-heading text-2xl md:text-3xl font-bold text-on-surface text-center mb-2">Editor Access</h1>
          <p className="text-center font-medium text-on-surface-variant mb-8 text-sm">Sign in to manage promises and verification evidence.</p>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate("/admin"); }}>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-on-surface-variant ml-1" htmlFor="username">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={20} />
                <input 
                  id="username"
                  className="w-full clay-input rounded-xl py-3.5 pl-12 pr-4 font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" 
                  placeholder="editor_user" 
                  type="text" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-on-surface-variant ml-1" htmlFor="password">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={20} />
                <input 
                  id="password"
                  className="w-full clay-input rounded-xl py-3.5 pl-12 pr-4 font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" 
                  placeholder="••••••••" 
                  type="password" 
                />
              </div>
            </div>
            
            <button type="submit" className="w-full clay-btn bg-primary text-on-primary py-3.5 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary/90 mt-4 transition-colors">
              Sign In <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-8 text-center">
            <a href="#" className="font-semibold text-sm text-outline hover:text-primary transition-colors inline-block">Forgot password or access token?</a>
          </div>
        </div>
      </div>
    </div>
  );
}
