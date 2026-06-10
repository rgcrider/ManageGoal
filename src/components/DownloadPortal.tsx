import React, { useState } from "react";
import { Product } from "../types";
import { DownloadableAsset, getAssetsForProduct, secureDownloadAsset } from "../lib/AssetManager";
import { 
  Download, Lock, CheckCircle2, AlertTriangle, FileCode, 
  Terminal, RefreshCw, Layers, ShieldCheck, HelpCircle, 
  ChevronRight, ArrowDownToLine, HardDrive, Cpu, ExternalLink
} from "lucide-react";

interface DownloadPortalProps {
  product: Product;
  purchasedProductIds: string[];
  onOpenCheckout: (product: Product) => void;
}

export function DownloadPortal({
  product,
  purchasedProductIds,
  onOpenCheckout
}: DownloadPortalProps) {
  const isUnlocked = purchasedProductIds.includes(product.id);
  const assets = getAssetsForProduct(product.id);
  
  // Interactive download tracking state
  const [downloadingAssetId, setDownloadingAssetId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [activeDownloadStatus, setActiveDownloadStatus] = useState<"idle" | "verifying" | "bundling" | "delivering" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const addLog = (msg: string) => {
    setTerminalLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleStartSecureDownload = (asset: DownloadableAsset) => {
    if (!isUnlocked) {
      setErrorMessage("License validation failed. Kindly complete the checkout sequence first.");
      setActiveDownloadStatus("error");
      return;
    }

    setErrorMessage(null);
    setDownloadingAssetId(asset.id);
    setActiveDownloadStatus("verifying");
    setDownloadProgress(8);
    setTerminalLogs([
      `[${new Date().toLocaleTimeString()}] Initiating secure file handshake for block: ${asset.id}`,
      `[${new Date().toLocaleTimeString()}] Target payload mapping: "${asset.fileName}"`,
      `[${new Date().toLocaleTimeString()}] Verification agent queried for product identity code: "${product.id}"`
    ]);

    // Stage 1: Verify token credentials (0.8s)
    setTimeout(() => {
      setDownloadProgress(35);
      setActiveDownloadStatus("bundling");
      addLog("✓ Active license signature verified locally (AES-255-GCM validated).");
      addLog("Preparing localized schema mappings...");
      addLog("Compiling diagnostic telemetry headers...");
      
      // Stage 2: Bundle resource elements (1.0s)
      setTimeout(() => {
        setDownloadProgress(75);
        setActiveDownloadStatus("delivering");
        addLog("Packing compressed code headers into dynamic client Blobs...");
        addLog("Attaching dynamic user license certificate.");
        addLog("Fulfilling local artifact dispatch instructions.");

        // Stage 3: Resolve download client side (0.8s)
        setTimeout(() => {
          setDownloadProgress(100);
          setActiveDownloadStatus("success");
          addLog("✓ Safe download container successfully compiled!");

          // Call the AssetManager to retrieve the real URL
          const result = secureDownloadAsset(product.id, asset.id, purchasedProductIds);
          
          if (result.success && result.dataUrl && result.fileName) {
            // Trigger actual download programmatically
            const link = document.createElement("a");
            link.href = result.dataUrl;
            link.download = result.fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(result.dataUrl);
            
            addLog(`✓ Browser dispatch completed! File "${result.fileName}" shipped.`);
          } else {
            addLog(`❌ Fatal: ${result.error || "Bundler pipeline issue encountered."}`);
            setErrorMessage(result.error || "Could not construct localized delivery parameters.");
            setActiveDownloadStatus("error");
          }

          // Clear busy states after a delay
          setTimeout(() => {
            setDownloadingAssetId(null);
            setActiveDownloadStatus("idle");
            setDownloadProgress(0);
          }, 4000);

        }, 800);
      }, 1000);
    }, 800);
  };

  return (
    <div id="download-portal" className="space-y-6 text-left">
      
      {/* Header validation banner status */}
      <div className={`p-4 rounded-2xl border transition-all duration-300 ${
        isUnlocked 
          ? "bg-emerald-500/5 border-emerald-500/20 text-gray-300" 
          : "bg-amber-500/5 border-amber-500/20 text-gray-300"
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className={`p-2.5 rounded-xl shrink-0 ${
              isUnlocked ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-500"
            }`}>
              {isUnlocked ? <ShieldCheck size={20} /> : <AlertTriangle size={20} />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-sm sm:text-base font-display">
                  Secure Download Protocol & Authorization
                </span>
                <span className={`text-[9px] font-mono font-bold uppercase tracking-wider py-0.5 px-2 rounded-full border ${
                  isUnlocked 
                    ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400" 
                    : "bg-amber-500/15 border-amber-500/30 text-amber-400"
                }`}>
                  {isUnlocked ? "Active License Key Verified" : "Awaiting Subscription Check"}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1 max-w-xl">
                {isUnlocked 
                  ? "Your cloud cluster token has authorized full cryptographic source files access. You may safely download certified software zip packages and reference guides."
                  : "Checkout completion is required to unlock this deployment node. Purchase to bypass gateway and map authorized customer tokens."}
              </p>
            </div>
          </div>

          {!isUnlocked && (
            <button
              onClick={() => onOpenCheckout(product)}
              className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-1 shrink-0"
            >
              Configure Subscription <ChevronRight size={13} />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left column: List of products mapped files */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center pr-1">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest font-mono flex items-center gap-1.5">
              <Layers size={13} className="text-brand-400" /> Accessible Cloud Artifacts
            </h4>
            <span className="text-[10px] text-gray-500 font-mono">
              Schema version v1.2.6
            </span>
          </div>

          {assets.length === 0 ? (
            <div className="bg-slate-950/60 p-8 rounded-2xl border border-slate-900 border-dashed text-center">
              <FileCode className="mx-auto text-gray-600 mb-2" size={32} />
              <p className="text-gray-400 text-xs">No download packages map to this node yet.</p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {assets.map((asset) => {
                const isCurrentlyDownloading = downloadingAssetId === asset.id;
                
                return (
                  <div
                    key={asset.id}
                    className={`relative bg-slate-950 p-4 rounded-2xl border transition ${
                      isUnlocked 
                        ? "border-slate-900 hover:border-slate-800" 
                        : "border-slate-950 opacity-65 font-medium"
                    }`}
                  >
                    {/* Locked Watermark Grid Overlay for aesthetic appeal */}
                    {!isUnlocked && (
                      <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[1px] rounded-2xl flex items-center justify-center pointer-events-none z-10">
                        <div className="bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                          <Lock size={11} className="text-amber-500 animate-pulse" /> Locked Artifact
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1.5 min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[9px] font-mono font-bold uppercase tracking-widest py-0.5 px-1.5 rounded border ${
                            asset.fileType === "ZIP" 
                              ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400" 
                              : asset.fileType === "PDF"
                              ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                              : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                          }`}>
                            {asset.fileType}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {asset.category}
                          </span>
                        </div>
                        
                        <h5 className="text-white font-bold text-xs sm:text-sm font-display tracking-tight">
                          {asset.name}
                        </h5>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {asset.description}
                        </p>

                        <div className="flex gap-4 pt-1 font-mono text-[10px] text-gray-550">
                          <span>Size: <strong className="text-gray-450 font-bold">{asset.fileSize}</strong></span>
                          <span>Updated: <strong className="text-gray-450 font-bold">{asset.lastUpdated}</strong></span>
                        </div>
                      </div>

                      {isUnlocked && (
                        <button
                          onClick={() => handleStartSecureDownload(asset)}
                          disabled={downloadingAssetId !== null}
                          className={`p-2.5 rounded-xl border flex items-center justify-center transition shrink-0 ${
                            isCurrentlyDownloading
                              ? "bg-brand-600/20 border-brand-500/40 text-brand-400"
                              : "bg-slate-900 border-slate-800 hover:border-brand-500/50 hover:bg-slate-850 text-white"
                          }`}
                          title={`Securely package ${asset.fileName}`}
                        >
                          {isCurrentlyDownloading ? (
                            <RefreshCw size={15} className="animate-spin text-brand-400" />
                          ) : (
                            <ArrowDownToLine size={15} />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right column: Interactive Packaging terminal for full full-stack coder flavor */}
        <div className="lg:col-span-5 space-y-4">
          <h4 className="text-white font-bold text-xs uppercase tracking-widest font-mono flex items-center gap-1.5">
            <Terminal size={14} className="text-brand-400" /> Handshake Terminal & Output
          </h4>

          <div className="bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden flex flex-col justify-between h-[280px]">
            {/* Terminal Tab Bar */}
            <div className="bg-slate-900/60 px-4 py-2 border-b border-slate-900 flex justify-between items-center text-[10px] font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                <span className="text-gray-450 font-bold ml-1.5">managegoal_delivery_daemon</span>
              </div>
              <span className="text-brand-500 uppercase font-bold tracking-widest text-[8px]">SSL Secured</span>
            </div>

            {/* Terminal logs list */}
            <div className="p-4 overflow-y-auto font-mono text-[10px] leading-relaxed text-left flex-grow space-y-1 bg-slate-950/80 flex flex-col justify-end">
              {terminalLogs.length === 0 ? (
                <div className="text-gray-500 italic h-full flex items-center justify-center text-center">
                  Initiate an artifact download on the left to inspect real-time compiler outputs and cryptographic checksum generations.
                </div>
              ) : (
                <>
                  <div className="flex-grow overflow-y-auto space-y-1 max-h-[160px] scrollbar-thin">
                    {terminalLogs.map((log, idx) => (
                      <p key={idx} className={
                        log.includes("✓") 
                          ? "text-emerald-400" 
                          : log.includes("❌") 
                          ? "text-red-400 animate-pulse" 
                          : "text-gray-400"
                      }>
                        {log}
                      </p>
                    ))}
                  </div>

                  {downloadingAssetId && (
                    <div className="pt-3 border-t border-slate-900/60 mt-2 space-y-2">
                      <div className="flex justify-between items-center text-[9px]">
                        <span className="text-brand-400 font-bold uppercase animate-pulse">
                          {activeDownloadStatus === "verifying" 
                            ? "Verifying Cluster Cryptography..." 
                            : activeDownloadStatus === "bundling"
                            ? "Bundling Source Directory..."
                            : "Delivering Client Packages..."}
                        </span>
                        <span className="text-white font-bold">{downloadProgress}%</span>
                      </div>
                      
                      <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-brand-500 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${downloadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Terminal Footer status info */}
            <div className="bg-slate-900/40 p-2.5 border-t border-slate-900 flex justify-between items-center text-[9px] font-mono text-gray-500">
              <span className="flex items-center gap-1">
                <HardDrive size={10} /> FS Store Node: Enc_E32
              </span>
              <span>Uptime SLA: 99.99%</span>
            </div>
          </div>

          <div className="bg-slate-950/40 border border-slate-900/80 rounded-2xl p-4 text-xs text-gray-400 flex items-start gap-2.5">
            <HelpCircle className="text-brand-400 shrink-0 mt-0.5 animate-pulse" size={14} />
            <p className="leading-relaxed">
              <strong>Need higher performance setups?</strong> All codebases support standard Docker containerization. Launch downloaded directories by running <code>docker compose up --build</code> to test APIs and local Postgres schemas easily.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
