import React, { useState, useEffect } from "react";
import { Users, Mail, Receipt, Calendar, ListTodo, BarChart3, Plus, ArrowRight, Check, Send, Sparkles, RefreshCw, Eye, Download } from "lucide-react";

// ==========================================
// 1. LeadFlow CRM Demo
// ==========================================
export function LeadFlowDemo() {
  interface Lead { id: string; name: string; value: number; company: string; stage: "new" | "contacted" | "proposal" | "won" };
  const [leads, setLeads] = useState<Lead[]>([
    { id: "1", name: "Sarah Connor", value: 3500, company: "Cyberdyne Systems", stage: "new" },
    { id: "2", name: "Bruce Wayne", value: 12000, company: "Wayne Enterprises", stage: "contacted" },
    { id: "3", name: "Clark Kent", value: 1800, company: "Daily Planet", stage: "proposal" },
    { id: "4", name: "Tony Stark", value: 25000, company: "Stark Industries", stage: "won" }
  ]);
  const [newName, setNewName] = useState("");
  const [newValue, setNewValue] = useState("1500");
  const [newCompany, setNewCompany] = useState("");

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newCompany) return;
    const l: Lead = {
      id: Date.now().toString(),
      name: newName,
      company: newCompany,
      value: parseFloat(newValue) || 1000,
      stage: "new"
    };
    setLeads([...leads, l]);
    setNewName("");
    setNewCompany("");
    setNewValue("1500");
  };

  const moveStage = (id: string, current: string) => {
    const nextMap: Record<string, "new" | "contacted" | "proposal" | "won"> = {
      new: "contacted",
      contacted: "proposal",
      proposal: "won",
      won: "new"
    };
    setLeads(leads.map(l => l.id === id ? { ...l, stage: nextMap[current] } : l));
  };

  const calculateSum = (stageName: string) => {
    return leads.filter(l => l.stage === stageName).reduce((acc, l) => acc + l.value, 0);
  };

  return (
    <div className="glass-panel p-5 rounded-xl border border-white/10 text-sm">
      <div className="flex flex-wrap justify-between items-center mb-5 gap-3">
        <div>
          <span className="text-xs text-brand-400 font-semibold uppercase tracking-wider block">LeadFlow Engine Simulator</span>
          <h4 className="text-lg font-bold text-white font-display">Interactive Deal Pipeline</h4>
        </div>
        <div className="flex gap-4 text-xs">
          <div className="bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="text-gray-400 block">Active Value</span>
            <span className="text-emerald-400 font-bold font-mono">
              ${leads.reduce((acc, l) => acc + l.value, 0).toLocaleString()}
            </span>
          </div>
          <div className="bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="text-gray-400 block">Conversion Rate</span>
            <span className="text-blue-400 font-bold font-mono">
              {((leads.filter(l => l.stage === "won").length / leads.length) * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleAddLead} className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-5">
        <input
          type="text"
          placeholder="Contact Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="bg-slate-900 border border-slate-850 px-3 py-2 rounded-lg text-white"
          required
        />
        <input
          type="text"
          placeholder="Company Name"
          value={newCompany}
          onChange={(e) => setNewCompany(e.target.value)}
          className="bg-slate-900 border border-slate-850 px-3 py-2 rounded-lg text-white"
          required
        />
        <input
          type="number"
          placeholder="Deal Value ($)"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          className="bg-slate-900 border border-slate-850 px-3 py-2 rounded-lg text-white font-mono"
          required
        />
        <button type="submit" className="bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-1.5 transition">
          <Plus size={16} /> Create Lead
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {(["new", "contacted", "proposal", "won"] as const).map(stage => (
          <div key={stage} className="bg-slate-900/50 p-3 rounded-lg border border-slate-850">
            <div className="flex justify-between items-center mb-2 pb-1 border-b border-slate-800">
              <span className="font-semibold text-xs text-gray-300 uppercase tracking-widest">
                {stage === "new" && "📥 New Lead"}
                {stage === "contacted" && "💬 Contacted"}
                {stage === "proposal" && "📝 Proposal"}
                {stage === "won" && "🏆 Won Deal"}
              </span>
              <span className="text-gray-500 font-mono text-xs">${calculateSum(stage).toLocaleString()}</span>
            </div>

            <div className="space-y-2 min-h-24">
              {leads.filter(l => l.stage === stage).map(l => (
                <div
                  key={l.id}
                  onClick={() => moveStage(l.id, stage)}
                  className="bg-slate-850 hover:bg-slate-800 border border-slate-800 p-2.5 rounded-lg cursor-pointer transition relative group"
                  title="Click to advance stage"
                >
                  <div className="font-medium text-white flex justify-between">
                    <span>{l.name}</span>
                    <span className="text-brand-405 font-mono text-xs">${l.value.toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{l.company}</div>
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={12} className="text-brand-400" />
                  </div>
                </div>
              ))}
              {leads.filter(l => l.stage === stage).length === 0 && (
                <div className="text-center text-xs py-6 text-gray-650 italic">Drag items or press elements</div>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-4 italic text-center">💡 Quick Interactive Action: Click on any lead card above to advance it through stages!</p>
    </div>
  );
}

// ==========================================
// 2. MailBoost AI Demo
// ==========================================
export function MailBoostDemo() {
  const [prompt, setPrompt] = useState("Special summer campaign welcome discount for active developers");
  const [generatedText, setGeneratedText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [campaignProgress, setCampaignProgress] = useState(0);
  const [metrics, setMetrics] = useState({ sent: 0, opens: 0, clicks: 0 });

  const presets = [
    "Welcome sequence for new trials",
    "Win-back code for dormant accounts",
    "Product launch announcement"
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedText("");
    const result = `Subject: Upgrade your tech stack today with a 25% discount! 🚀

Hello there, Code Builder,

We noticed you are actively developing with our API tools. To help power your next breakthrough, we've enabled code BUILDER2026 on your profile.

Why developers love our platform:
- Zero config database endpoints
- Dynamic metrics hooks
- 99.9% uptime guarantees

Use this link to secure your 25% discount instantly: https://cloudlaunch.example.com/checkout?code=BUILDER2026

Best,
The CloudLaunch Support Bot`;

    let i = 0;
    const interval = setInterval(() => {
      setGeneratedText(prev => prev + result.charAt(i));
      i++;
      if (i >= result.length) {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 15);
  };

  const handleSendMail = () => {
    setIsSending(true);
    setCampaignProgress(0);
    setMetrics({ sent: 0, opens: 0, clicks: 0 });

    const total = 1000;
    const interval = setInterval(() => {
      setCampaignProgress(p => {
        const next = p + 5;
        if (next >= 100) {
          clearInterval(interval);
          setIsSending(false);
          setMetrics({ sent: total, opens: Math.round(total * 0.412), clicks: Math.round(total * 0.185) });
          return 100;
        }
        setMetrics({
          sent: Math.round(total * (next / 100)),
          opens: Math.round(total * (next / 100) * 0.4),
          clicks: Math.round(total * (next / 100) * 0.18)
        });
        return next;
      });
    }, 100);
  };

  return (
    <div className="glass-panel p-5 rounded-xl border border-white/10 text-sm space-y-4">
      <div>
        <span className="text-xs text-brand-400 font-semibold uppercase tracking-wider block">MailBoost Cohorts Engine</span>
        <h4 className="text-lg font-bold text-white font-display">Adaptive Content Campaign Generator</h4>
      </div>

      <div className="flex flex-wrap gap-2">
        {presets.map(p => (
          <button
            key={p}
            onClick={() => setPrompt(p)}
            className="bg-slate-900 hover:bg-slate-800 text-xs text-gray-300 px-3 py-1.5 rounded-full border border-slate-800"
          >
            {p}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="bg-slate-900 border border-slate-800 text-white px-3 py-2 rounded-lg flex-grow"
          placeholder="E.g., Special invite discount for agency clients"
        />
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt}
          className="bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-semibold px-4 py-2 rounded-lg flex items-center justify-center gap-1.5"
        >
          <Sparkles size={16} /> {isGenerating ? "AI Writing..." : "Draft Email"}
        </button>
      </div>

      {generatedText && (
        <div className="bg-slate-900 p-4 rounded-lg border border-slate-850 font-mono text-xs whitespace-pre-wrap text-emerald-400 relative h-48 overflow-y-auto">
          <span className="absolute top-2 right-2 text-gray-500 uppercase tracking-widest text-[9px]">Generated copy</span>
          {generatedText}
        </div>
      )}

      {generatedText && !isGenerating && (
        <div className="border-t border-slate-850 pt-4 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-200">Test Deliverability:</span>
            <button
              onClick={handleSendMail}
              disabled={isSending}
              className="bg-brand-600 hover:bg-brand-700 text-xs text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5"
            >
              <Send size={14} /> Send Blast (1k subscribers)
            </button>
          </div>

          {campaignProgress > 0 && (
            <div className="space-y-2">
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                <div className="bg-brand-500 h-full transition-all" style={{ width: `${campaignProgress}%` }}></div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs mt-1">
                <div className="bg-slate-900/50 p-2 rounded-lg border border-slate-850">
                  <span className="text-gray-400 block">Sent</span>
                  <span className="text-white font-bold font-mono">{metrics.sent}</span>
                </div>
                <div className="bg-slate-900/50 p-2 rounded-lg border border-slate-850">
                  <span className="text-gray-400 block">Opens</span>
                  <span className="text-emerald-400 font-bold font-mono">{metrics.opens} ({((metrics.opens / (metrics.sent || 1)) * 100).toFixed(0)}%)</span>
                </div>
                <div className="bg-slate-900/50 p-2 rounded-lg border border-slate-850">
                  <span className="text-gray-400 block">Clicks</span>
                  <span className="text-blue-400 font-bold font-mono">{metrics.clicks} ({((metrics.clicks / (metrics.sent || 1)) * 100).toFixed(0)}%)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 3. InvoicePro Demo
// ==========================================
export function InvoiceProDemo() {
  const [client, setClient] = useState("Vanguard Tech Corp");
  const [service, setService] = useState("Enterprise Software Delivery");
  const [amount, setAmount] = useState("1200");
  const [taxChecked, setTaxChecked] = useState(true);
  const [invoiceStatus, setInvoiceStatus] = useState<"draft" | "sent" | "paid">("draft");
  const [showInvoicePdf, setShowInvoicePdf] = useState(false);

  const calculateTotal = () => {
    const rawVal = parseFloat(amount) || 0;
    const tax = taxChecked ? rawVal * 0.15 : 0;
    return { sub: rawVal, tax, total: rawVal + tax };
  };

  const sums = calculateTotal();

  return (
    <div className="glass-panel p-5 rounded-xl border border-white/10 text-sm grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-4">
        <div>
          <span className="text-xs text-brand-400 font-semibold uppercase tracking-wider block">InvoicePro Core Ledger</span>
          <h4 className="text-lg font-bold text-white font-display">Invoicing Automator</h4>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-400 block mb-1">To Client Profile</label>
            <input
              type="text"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Services Rendered</label>
            <input
              type="text"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Project Fee ($)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-white font-mono"
              />
            </div>
            <div className="flex items-center pt-5">
              <input
                type="checkbox"
                id="tax"
                checked={taxChecked}
                onChange={(e) => setTaxChecked(e.target.checked)}
                className="rounded text-brand-500 bg-slate-900 border-slate-800 h-4 w-4"
              />
              <label htmlFor="tax" className="text-xs text-gray-300 ml-2">Add Standard Tax (15%)</label>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => { setInvoiceStatus("sent"); setShowInvoicePdf(true); }}
            className="flex-grow bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5"
          >
            <Send size={14} /> Send to Client
          </button>
          <button
            onClick={() => setInvoiceStatus("paid")}
            disabled={invoiceStatus === "draft"}
            className="flex-grow bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5"
          >
            <Check size={14} /> Mark as PAID
          </button>
        </div>
      </div>

      <div className="bg-white text-slate-900 p-4 rounded-lg border border-slate-200 flex flex-col justify-between font-sans shadow-xl shadow-black/30">
        <div>
          <div className="flex justify-between items-start border-b border-slate-100 pb-3">
            <div>
              <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500">CloudLaunch Solutions</h5>
              <p className="text-[10px] text-slate-400 font-mono">INV-2026-90412</p>
            </div>
            <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded ${
              invoiceStatus === "paid" ? "bg-emerald-100 text-emerald-800" :
              invoiceStatus === "sent" ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-800"
            }`}>
              {invoiceStatus}
            </span>
          </div>

          <div className="mt-3 text-xs">
            <span className="text-slate-400 block text-[9px] uppercase tracking-wide">Billed To:</span>
            <p className="font-bold text-slate-800">{client || "Unspecified client"}</p>
          </div>

          <div className="mt-4 border-b border-slate-100 pb-2">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-[9px] uppercase tracking-wider">
                  <th className="text-left py-1 font-normal">Description</th>
                  <th className="text-right py-1 font-normal">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 text-slate-700 font-medium">{service || "Engineering Deliverable"}</td>
                  <td className="text-right py-2 font-mono">${sums.sub.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 text-xs space-y-1">
          <div className="flex justify-between text-slate-500">
            <span>Subtotal</span>
            <span className="font-mono">${sums.sub.toLocaleString()}</span>
          </div>
          {taxChecked && (
            <div className="flex justify-between text-slate-500">
              <span>VAT / Tax (15%)</span>
              <span className="font-mono">${sums.tax.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between text-slate-900 pt-1 border-t border-slate-150 font-bold text-sm">
            <span>Amount Due</span>
            <span className="font-mono">${sums.total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. SocialPilot AI Demo
// ==========================================
export function SocialPilotDemo() {
  interface ScheduledPost { id: string; channel: "twitter" | "linkedin" | "instagram"; copy: string; scheduleTime: string }
  const [channel, setChannel] = useState<"twitter" | "linkedin" | "instagram">("twitter");
  const [copy, setCopy] = useState("We switched our internal pipeline databases over to CloudLaunch Apps and saved 40+ hours this week! Absolute game-changer. 🚀 #SaaS #growth");
  const [queue, setQueue] = useState<ScheduledPost[]>([
    { id: "1", channel: "linkedin", copy: "Highly advice all startup CTOs to adopt lightweight Kanban boards for cross-team alignments.", scheduleTime: "Tomorrow, 09:00 AM" },
    { id: "2", channel: "instagram", copy: "Vanguard Team is relaxing after deploying 6 new SaaS releases under budget bounds!", scheduleTime: "Friday, 02:00 PM" }
  ]);

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!copy) return;
    const item: ScheduledPost = {
      id: Date.now().toString(),
      channel,
      copy,
      scheduleTime: "In 2 hours"
    };
    setQueue([item, ...queue]);
    setCopy("");
  };

  const getAITags = () => {
    if (copy.toLowerCase().includes("crm") || copy.toLowerCase().includes("lead")) return "🤖 AI tags: #CRM #SalesFunnel #B2B";
    if (copy.toLowerCase().includes("code") || copy.toLowerCase().includes("api")) return "🤖 AI tags: #Developer #TechStack #API";
    return "🤖 AI tags: #Productivity #BusinessApps #SaaS";
  };

  return (
    <div className="glass-panel p-5 rounded-xl border border-white/10 text-sm space-y-4">
      <div>
        <span className="text-xs text-brand-400 font-semibold uppercase tracking-wider block">SocialPilot AI Hub</span>
        <h4 className="text-lg font-bold text-white font-display">Multi-Platform Dispatcher Queue</h4>
      </div>

      <form onSubmit={handleSchedule} className="space-y-3">
        <div className="flex gap-2">
          {(["twitter", "linkedin", "instagram"] as const).map(ch => (
            <button
              key={ch}
              type="button"
              onClick={() => setChannel(ch)}
              className={`flex-grow capitalize py-1.5 rounded-lg border text-xs font-semibold uppercase tracking-wider transition ${
                channel === ch ? "bg-brand-600 border-brand-500 text-white" : "bg-slate-900 border-slate-800 text-gray-400 hover:text-white"
              }`}
            >
              {ch}
            </button>
          ))}
        </div>

        <textarea
          value={copy}
          onChange={(e) => setCopy(e.target.value)}
          rows={3}
          className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-white font-sans text-xs focus:ring-1 focus:ring-brand-500"
          placeholder="Compose details to send to multiple pipelines..."
        />

        <div className="flex justify-between items-center text-xs">
          <span className="text-emerald-400 font-medium">{getAITags()}</span>
          <button type="submit" className="bg-brand-600 hover:bg-brand-700 text-white font-semibold py-1.5 px-4 rounded-lg flex items-center gap-1.5">
            <Calendar size={14} /> Schedule Publish
          </button>
        </div>
      </form>

      <div className="space-y-2">
        <span className="text-xs font-bold text-gray-400 block uppercase tracking-widest">Scheduled Queue:</span>
        {queue.map(q => (
          <div key={q.id} className="bg-slate-900/65 border border-slate-850 p-3 rounded-lg flex justify-between gap-3 text-xs relative">
            <div>
              <span className={`text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded inline-block mb-1.5 ${
                q.channel === "linkedin" ? "bg-blue-900/40 text-blue-300 border border-blue-800/40" :
                q.channel === "instagram" ? "bg-pink-900/40 text-pink-300 border border-pink-800/40" :
                "bg-sky-900/40 text-sky-300 border border-sky-800/40"
              }`}>
                {q.channel}
              </span>
              <p className="text-gray-300 font-sans leading-relaxed">{q.copy}</p>
            </div>
            <div className="text-right shrink-0 text-[10px] text-gray-500 self-start font-mono uppercase">
              {q.scheduleTime}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 5. TaskSync Demo
// ==========================================
export function TaskSyncDemo() {
  interface Task { id: string; name: string; priority: "high" | "medium" | "low"; isDone: boolean; owner: string }
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", name: "Review localized secure tax guidelines in InvoicePro", priority: "high", isDone: false, owner: "Sarah" },
    { id: "2", name: "Deploy dynamic GDPR cookie parameters server-side", priority: "medium", isDone: true, owner: "James" },
    { id: "3", name: "Set up Google Maps canvas vectors fallback", priority: "low", isDone: false, owner: "Naomi" }
  ]);
  const [taskName, setTaskName] = useState("");

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName) return;
    const t: Task = {
      id: Date.now().toString(),
      name: taskName,
      priority: "medium",
      isDone: false,
      owner: "You"
    };
    setTasks([...tasks, t]);
    setTaskName("");
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, isDone: !t.isDone } : t));
  };

  return (
    <div className="glass-panel p-5 rounded-xl border border-white/10 text-sm space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs text-brand-400 font-semibold uppercase tracking-wider block">TaskSync Workboards</span>
          <h4 className="text-lg font-bold text-white font-display">Sprint Team Tasks</h4>
        </div>
        <span className="text-xs bg-slate-900 px-2.5 py-1 rounded-full text-brand-400 font-mono border border-slate-800">
          Done: {tasks.filter(t => t.isDone).length}/{tasks.length}
        </span>
      </div>

      <form onSubmit={handleAddTask} className="flex gap-2">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="flex-grow bg-slate-900 border border-slate-800 text-white px-3 py-1.5 rounded-lg"
          placeholder="What needs to get done next?"
        />
        <button type="submit" className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-1.5 rounded-lg flex items-center gap-1">
          <Plus size={16} /> Add
        </button>
      </form>

      <div className="space-y-2">
        {tasks.map(t => (
          <div
            key={t.id}
            onClick={() => toggleTask(t.id)}
            className={`flex justify-between items-center p-2.5 rounded-lg border cursor-pointer transition ${
              t.isDone ? "bg-slate-900/40 border-slate-850 opacity-60 line-through text-gray-500" : "bg-slate-900/80 border-slate-800 hover:bg-slate-850 text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`h-4 w-4 rounded flex items-center justify-center border ${
                t.isDone ? "border-brand-500 bg-brand-600/20 text-brand-400" : "border-slate-700"
              }`}>
                {t.isDone && <Check size={12} />}
              </div>
              <span className="text-xs font-sans">{t.name}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded ${
                t.priority === "high" ? "bg-red-950/50 text-red-400 border border-red-900/30" :
                t.priority === "medium" ? "bg-yellow-950/50 text-yellow-400 border border-yellow-900/30" : "bg-sky-950/50 text-sky-400 border border-sky-900/30"
              }`}>
                {t.priority}
              </span>
              <span className="h-6 w-6 rounded-full bg-slate-800 text-[10px] font-bold flex items-center justify-center text-gray-300 uppercase border border-slate-750">
                {t.owner[0]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 6. AnalyticsHub Demo
// ==========================================
export function AnalyticsHubDemo() {
  const [metric, setMetric] = useState<"mrr" | "users" | "cac">("mrr");
  const [source, setSource] = useState<"stripe" | "database">("stripe");
  const [chartType, setChartType] = useState<"bar" | "line">("line");

  const records: Record<"mrr" | "users" | "cac", { label: string; company: string; val: string; dataPoints: number[] }> = {
    mrr: { label: "Monthly Recurring Revenue", company: "Stripe Stream", val: "$48,935 / mo", dataPoints: [18, 24, 28, 35, 41, 48] },
    users: { label: "Active Platform Cohorts", company: "Secure Database", val: "14,812 Users", dataPoints: [32, 45, 62, 85, 110, 148] },
    cac: { label: "Customer Acquisition Cost", company: "Marketing Leads", val: "$34 on Average", dataPoints: [78, 65, 59, 48, 41, 34] }
  };

  return (
    <div className="glass-panel p-5 rounded-xl border border-white/10 text-sm space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div>
          <span className="text-xs text-brand-400 font-semibold uppercase tracking-wider block">AnalyticsHub Console</span>
          <h4 className="text-lg font-bold text-white font-display">Real-Time Synthesis Dashboard</h4>
        </div>
        <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
          {(["mrr", "users", "cac"] as const).map(m => (
            <button
              key={m}
              onClick={() => setMetric(m)}
              className={`px-2.5 py-1 text-xs uppercase font-semibold tracking-wider rounded ${
                metric === m ? "bg-brand-600 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {m === "mrr" ? "MRR" : m === "users" ? "Users" : "CAC"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-slate-900 p-3 rounded-lg border border-slate-850 relative">
          <span className="text-gray-400 text-xs block">Synthesizing State</span>
          <span className="text-white text-base font-bold flex items-center gap-1 mt-1 font-display">
            {records[metric].label}
          </span>
          <span className="text-[10px] text-brand-444 block">{records[metric].company}</span>
        </div>
        <div className="bg-slate-900 p-3 rounded-lg border border-slate-850">
          <span className="text-gray-400 text-xs block">Active Performance Metric</span>
          <span className="text-emerald-400 text-xl font-bold font-mono block mt-1">
            {records[metric].val}
          </span>
        </div>
        <div className="bg-slate-900 p-3 rounded-lg border border-slate-850 flex flex-col justify-center">
          <span className="text-gray-400 text-xs block">Output Styles</span>
          <div className="flex gap-2 mt-1">
            <button
              onClick={() => setChartType("line")}
              className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider border ${
                chartType === "line" ? "bg-brand-600/30 border-brand-500 text-white" : "bg-transparent border-slate-800 text-gray-400"
              }`}
            >
              Area Spline
            </button>
            <button
              onClick={() => setChartType("bar")}
              className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider border ${
                chartType === "bar" ? "bg-brand-600/30 border-brand-500 text-white" : "bg-transparent border-slate-800 text-gray-400"
              }`}
            >
              Column Bar
            </button>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 p-4 rounded-lg border border-slate-850">
        <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
          <span>Q1-Q2 Cohort Progress</span>
          <span className="text-brand-400 font-mono tracking-widest text-[9px]">INTERACTIVE PLOT</span>
        </div>

        <div className="h-28 flex items-end justify-between gap-2 pt-4 relative">
          {records[metric].dataPoints.map((dp, idx) => {
            const maxVal = Math.max(...records[metric].dataPoints);
            const heightPct = `${(dp / maxVal) * 100}%`;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                <div className="text-[10px] font-mono text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity mb-1 select-none">
                  {dp}
                </div>
                {chartType === "bar" ? (
                  <div
                    className="w-full bg-brand-600 rounded-t hover:bg-brand-500 transition-all duration-300 relative"
                    style={{ height: heightPct }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10"></div>
                  </div>
                ) : (
                  <div className="w-full flex flex-col justify-end" style={{ height: heightPct }}>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 self-center z-10 hover:scale-125 transition-transform shadow shadow-black"></div>
                    <div className="w-[2px] bg-gradient-to-t from-slate-900 via-emerald-600/40 to-emerald-400 h-full self-center"></div>
                  </div>
                )}
                <span className="text-[9px] uppercase tracking-wider font-mono text-gray-500 mt-2">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][idx]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default {
  LeadFlowDemo,
  MailBoostDemo,
  InvoiceProDemo,
  SocialPilotDemo,
  TaskSyncDemo,
  AnalyticsHubDemo
};
