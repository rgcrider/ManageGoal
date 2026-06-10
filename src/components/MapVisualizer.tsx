import React, { useState } from "react";
import { Pin, Info, Wifi, Compass } from "lucide-react";

interface NodeLocation {
  city: string;
  lat: string;
  lon: string;
  role: string;
  latency: string;
  address: string;
  phone: string;
}

export function MapVisualizer() {
  const nodes: NodeLocation[] = [
    { city: "San Francisco", lat: "37.7749", lon: "-122.4194", role: "HQ & Design Studio", latency: "12ms", address: "548 Market St, Suite 904, San Francisco, CA 94104", phone: "+1 (415) 555-0142" },
    { city: "Lisbon", lat: "38.7223", lon: "-9.1393", role: "European Support Core", latency: "42ms", address: "Av. da Liberdade 110, 1250-146 Lisboa, Portugal", phone: "+351 21 555 0199" },
    { city: "Tokyo", lat: "35.6762", lon: "139.6503", role: "Database Engineering Hub", latency: "88ms", address: "6-chome Toyosu, Koto-ku, Tokyo 135-0061, Japan", phone: "+81 3-5555-0177" },
    { city: "Sydney", lat: "-33.8688", lon: "151.2093", role: "APAC Operations Array", latency: "105ms", address: "Level 14, 201 Sussex St, Sydney NSW 2000, Australia", phone: "+61 2 5555 0122" }
  ];

  const [activeNode, setActiveNode] = useState<NodeLocation>(nodes[0]);

  return (
    <div className="glass-panel p-5 rounded-xl border border-white/10 text-sm space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs text-brand-400 font-semibold uppercase tracking-wider block">Server Node Topology</span>
          <h4 className="text-lg font-bold text-white font-display">ManageGoal Physical Presence</h4>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2 py-1 rounded-full text-xs font-mono text-emerald-400">
          <Wifi size={12} /> System Status: Online
        </div>
      </div>

      <div className="relative bg-slate-950 rounded-lg aspect-video w-full overflow-hidden border border-slate-850 flex items-center justify-center">
        {/* Styled World Map background pattern representation using responsive CSS vectors */}
        <div className="absolute inset-0 opacity-15 bg-radial-grid flex flex-col justify-between p-4 pointer-events-none">
          <div className="h-full w-full flex flex-wrap gap-4 justify-around content-around text-[10px] text-gray-500 font-mono">
            {Array.from({ length: 24 }).map((_, i) => (
              <span key={i}>+ .</span>
            ))}
          </div>
        </div>

        {/* Dynamic Nodes Mapping */}
        {nodes.map((node, index) => {
          // Approximate layout offsets representing a map projection layout
          const positions: Record<string, { top: string; left: string }> = {
            "San Francisco": { top: "35%", left: "20%" },
            "Lisbon": { top: "42%", left: "48%" },
            "Tokyo": { top: "45%", left: "82%" },
            "Sydney": { top: "78%", left: "88%" }
          };

          const pos = positions[node.city] || { top: "50%", left: "50%" };

          return (
            <button
              key={node.city}
              onClick={() => setActiveNode(node)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-505 z-20"
              style={{ top: pos.top, left: pos.left }}
            >
              <div className="relative flex items-center justify-center">
                <span className={`animate-ping absolute inline-flex h-5 w-5 rounded-full opacity-75 ${
                  activeNode.city === node.city ? "bg-brand-500" : "bg-slate-700"
                }`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 ${
                  activeNode.city === node.city ? "bg-brand-500" : "bg-slate-500"
                }`}></span>
              </div>
              <span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap bg-slate-900/90 text-[10px] text-gray-300 font-mono py-0.5 px-2 rounded border border-slate-805 group-hover:block hidden shadow shadow-black">
                {node.city}
              </span>
            </button>
          );
        })}

        {/* Coordinate indicator overlay */}
        <div className="absolute bottom-2 left-2 text-[9px] text-gray-600 font-mono uppercase tracking-widest flex items-center gap-1">
          <Compass size={10} /> Projection Mode: Equirectangular WGS84
        </div>
      </div>

      <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-850 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <span className="text-xs text-brand-400 font-semibold uppercase tracking-widest block font-mono">SELECTED STATION</span>
          <h5 className="text-white font-bold text-base mt-0.5 font-display flex items-center gap-1">
            <Pin size={16} className="text-brand-500" /> {activeNode.city}
          </h5>
          <p className="text-xs text-gray-400 mt-1 italic font-mono">{activeNode.role}</p>
          <div className="mt-3 space-y-1 text-xs text-gray-300">
            <p><strong className="text-gray-400">Address:</strong> {activeNode.address}</p>
            <p><strong className="text-gray-400">Phone:</strong> {activeNode.phone}</p>
          </div>
        </div>

        <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-4">
          <div className="space-y-2">
            <div>
              <span className="text-gray-400 text-xs block">Connection Latency Test:</span>
              <span className="text-emerald-400 font-mono font-semibold text-sm flex items-center gap-1.5 mt-0.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 block animate-pulse"></span> {activeNode.latency} (RTT)
              </span>
            </div>
            <div>
              <span className="text-gray-400 text-xs block">Operational Coordinates:</span>
              <span className="text-gray-300 font-mono text-xs block mt-0.5">
                Lat: {activeNode.lat} , Lon: {activeNode.lon}
              </span>
            </div>
          </div>
          <div className="text-[11px] text-gray-500 flex items-center gap-1 mt-2">
            <Info size={12} /> Contact support from {activeNode.city} node during native business hours.
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapVisualizer;
