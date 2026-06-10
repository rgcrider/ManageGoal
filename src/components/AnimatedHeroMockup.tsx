import React, { useState, useEffect } from "react";
import { 
  Sparkles, TrendingUp, CheckCircle, Database, Zap, 
  Target, BarChart3, Clock, ArrowRight, Layers 
} from "lucide-react";

export function AnimatedHeroMockup() {
  const [activeCycle, setActiveCycle] = useState(0);
  const [goalProgress, setGoalProgress] = useState(62);
  const [metricValue, setMetricValue] = useState(3840);

  // Smoothly fluctuate mock statistics in the background
  useEffect(() => {
    const statInterval = setInterval(() => {
      setMetricValue(prev => {
        const delta = Math.floor(Math.random() * 81) - 40;
        return Math.max(3700, Math.min(4100, prev + delta));
      });
      setGoalProgress(prev => {
        const delta = Math.floor(Math.random() * 3) - 1;
        const next = prev + delta;
        return next > 90 ? 84 : next < 55 ? 65 : next;
      });
    }, 4000);

    const cycleInterval = setInterval(() => {
      setActiveCycle(prev => (prev + 1) % 3);
    }, 5000);

    return () => {
      clearInterval(statInterval);
      clearInterval(cycleInterval);
    };
  }, []);

  return (
    <div id="saas-hero-mockup" className="relative group max-w-4xl mx-auto pt-10">
      {/* Absolute Ambient Background Glows */}
      <div className="absolute -top-12 left-1/4 w-80 h-80 bg-brand-500/10 rounded-full blur-[100px] animate-pulse-slow pointer-events-none"></div>
      <div className="absolute -bottom-8 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" style={{ animationDelay: '3s' }}></div>

      {/* Decorative Floating Goal Cards with CSS animations */}
      <div className="absolute -left-6 top-1/3 hidden lg:flex items-center gap-3 bg-slate-900/90 border border-white/10 p-3 rounded-2xl shadow-2xl backdrop-blur-md animate-bounce" style={{ animationDuration: '6s' }}>
        <div className="h-8 w-8 bg-brand-500/20 text-brand-400 rounded-lg flex items-center justify-center">
          <Target size={16} className="animate-spin" style={{ animationDuration: '12s' }} />
        </div>
        <div className="text-left">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-bold font-mono">WORKSPACE OKR</span>
          <span className="text-xs text-white font-semibold">Q3 Lead Goal Achieved</span>
        </div>
      </div>

      <div className="absolute -right-8 top-1/4 hidden lg:flex items-center gap-3 bg-slate-900/90 border border-white/10 p-3 rounded-2xl shadow-2xl backdrop-blur-md animate-bounce" style={{ animationDuration: '8s', animationDelay: '1.5s' }}>
        <div className="h-8 w-8 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center">
          <Zap size={16} />
        </div>
        <div className="text-left font-sans">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-bold font-mono">AUTOMATION STATUS</span>
          <span className="text-xs text-emerald-400 font-bold">142 Pipelines Synced</span>
        </div>
      </div>

      {/* Main SaaS Window Frame */}
      <div className="relative bg-slate-900/70 border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
        
        {/* Window Chrome Header */}
        <div className="bg-slate-950/80 border-b border-white/5 py-3 px-4 flex justify-between items-center">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 border border-red-600"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-505/80 border border-yellow-600 bg-amber-500"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600"></span>
          </div>
          <div className="bg-slate-900 text-[10px] font-mono text-gray-400 py-1 px-8 rounded-lg border border-white/5 truncate max-w-[240px] select-none">
            app.managegoal.io/cockpit?workspace=q3_growth
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-[10px] font-mono">
            <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
            Live Node Connection
          </div>
        </div>

        {/* Dashboard Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 min-h-[360px]">
          
          {/* Mock Dashboard Sidebar */}
          <div className="space-y-4 border-r border-white/5 pr-4 hidden md:block">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2.5">
              <div className="h-5 w-5 rounded bg-brand-600 flex items-center justify-center text-white text-[10px] font-extrabold">
                MG
              </div>
              <span className="font-display font-bold text-white text-xs">ManageGoal Suite</span>
            </div>
            
            <nav className="space-y-1.5 text-left text-[11px]">
              <button className="w-full flex items-center gap-2 py-1.5 px-2 bg-brand-500/10 border border-brand-500/20 text-brand-400 rounded-lg font-semibold">
                <Layers size={13} /> Target Dashboard
              </button>
              <button className="w-full flex items-center gap-2 py-1.5 px-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition">
                <Database size={13} /> Connected Clusters
              </button>
              <button className="w-full flex items-center gap-2 py-1.5 px-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition">
                <Target size={13} /> Team Milestones
              </button>
              <button className="w-full flex items-center gap-2 py-1.5 px-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition">
                <Zap size={13} /> Active Campaign Triggers
              </button>
            </nav>

            {/* Account Usage gauge */}
            <div className="bg-slate-950/40 border border-white/5 p-2 rounded-xl text-left space-y-1">
              <div className="flex justify-between items-center text-[9px] text-gray-400">
                <span>API Usage</span>
                <span className="font-mono text-white">84%</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1">
                <div className="bg-gradient-to-r from-brand-500 to-indigo-500 h-1 rounded-full animate-pulse" style={{ width: '84%' }}></div>
              </div>
            </div>
          </div>

          {/* Main Workspace Frame */}
          <div className="col-span-1 md:col-span-3 space-y-4">
            
            {/* Top Stat Cards Row */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="bg-slate-950/40 border border-white/5 p-3 rounded-xl text-left space-y-1 relative overflow-hidden">
                <div className="absolute right-2 top-2 h-1.5 w-1.5 bg-brand-400 rounded-full"></div>
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block font-bold">Goal Velocity</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-black text-white font-mono">{(metricValue / 1000).toFixed(2)}k</span>
                  <span className="text-[9px] font-mono font-bold text-emerald-400 flex items-center">
                    <TrendingUp size={10} /> +14.2%
                  </span>
                </div>
              </div>

              <div className="bg-slate-950/40 border border-white/5 p-3 rounded-xl text-left space-y-1 relative overflow-hidden">
                <div className="absolute right-2 top-2 h-1.5 w-1.5 bg-emerald-400 rounded-full animate-ping"></div>
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block font-bold">Q3 Target</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-black text-white font-mono">{goalProgress}%</span>
                  <span className="text-[9px] font-mono text-gray-400 uppercase">Live OKR</span>
                </div>
              </div>

              <div className="bg-slate-950/40 border border-white/5 p-3 rounded-xl text-left space-y-1 hidden lg:block col-span-1">
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block font-bold">Server Relay</span>
                <div className="flex items-center gap-1.5 py-0.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-xs font-mono font-bold text-white">Active (32ms)</span>
                </div>
              </div>
            </div>

            {/* Glowing Chart Visual Component */}
            <div className="bg-slate-955/60 p-4 rounded-xl border border-white/5 relative overflow-hidden text-left bg-slate-950/40">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Productivity Multiplier (24H Trend)</span>
                <span className="text-[9px] bg-brand-500/10 text-brand-400 font-mono font-bold py-0.5 px-2 rounded-full flex items-center gap-1">
                  ● Real-time Sync
                </span>
              </div>
              
              {/* Dynamic SVG Sparkline Graph */}
              <div className="h-24 w-full pt-1.5 relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Subtle Grid Line Helpers */}
                  <line x1="0" y1="20" x2="400" y2="20" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                  <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                  <line x1="0" y1="80" x2="400" y2="80" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />

                  {/* Area fill under graph line */}
                  <path 
                    d="M 0 100 L 0 65 Q 40 40, 80 50 Q 120 60, 160 30 Q 200 10, 240 45 Q 284 80, 320 25 Q 360 -10, 400 15 L 400 100 Z" 
                    fill="url(#chartGlow)"
                  />
                  
                  {/* Neon animated line graph */}
                  <path 
                    d="M 0 65 Q 40 40, 80 50 Q 120 60, 160 30 Q 200 10, 240 45 Q 284 80, 320 25 Q 360 -10, 400 15" 
                    fill="transparent" 
                    stroke="url(#lineGradient)" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                    className="stroke-brand-402"
                  />
                  
                  {/* Glowing Tracker Dot traveling along the SVG trajectory */}
                  <circle cx="320" cy="25" r="5" fill="#38bdf8" className="animate-ping" />
                  <circle cx="320" cy="25" r="3.5" fill="#ffffff" />
                </svg>
                
                {/* SVG Line Gradient definition */}
                <svg width="0" height="0" className="absolute">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="50%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#60a5fa" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Bottom logs segment with floating steps */}
            <div className="bg-slate-950/40 border border-white/5 p-3 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <div className="text-left">
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block font-bold">Automation Operations Log</span>
                <div className="flex flex-col gap-1 pt-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-300">
                    <span className="h-1 w-1 bg-emerald-400 rounded-full animate-ping"></span>
                    <span>TaskSync synchronized with <strong>Google Calendar API</strong> (4s ago)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                    <span className="h-1 w-1 bg-brand-400 rounded-full"></span>
                    <span>MailBoost AI finalized campaign <strong>Conversion Forecast</strong></span>
                  </div>
                </div>
              </div>

              {/* Little CTA pill */}
              <div className="font-mono text-[10px] text-brand-400 bg-brand-500/10 px-2.5 py-1 rounded-lg border border-brand-500/20 font-bold shrink-0 self-end md:self-auto hover:bg-brand-500/20 transition cursor-pointer">
                Cluster #E8-902 Live
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
