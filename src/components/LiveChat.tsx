import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Sparkles, User, RefreshCw, Settings, ExternalLink, Check, HelpCircle } from "lucide-react";

interface Message {
  sender: "bot" | "user";
  text: string;
  time: string;
}

// Helper to extract crisp website ID from script tags or raw inputs
const parseCrispId = (input: string): string => {
  const trimmed = input.trim();
  // Match standard Crisp UUID template e.g. "8f7b5e40-bb34-45aa-bb8e-171822cb61ea"
  const uuidMatch = trimmed.match(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/);
  if (uuidMatch) {
    return uuidMatch[0];
  }
  return trimmed;
};

// Helper to extract tawk property ID from script tags or url formats
const parseTawkId = (input: string): string => {
  const trimmed = input.trim();
  // Match standard Tawk embed URI, e.g. "6419ca6631ebfa0fe7f53f93/1gsa950o4" or "PROPERTY_ID/WIDGET_ID"
  const tawkMatch = trimmed.match(/embed\.tawk\.to\/([a-zA-Z0-9]{24}\/[a-zA-Z0-9]+)/);
  if (tawkMatch && tawkMatch[1]) {
    return tawkMatch[1];
  }
  const simpleMatch = trimmed.match(/[a-zA-Z0-9]{24}\/[a-zA-Z0-9]+/);
  if (simpleMatch) {
    return simpleMatch[0];
  }
  return trimmed;
};

const loadCrisp = (websiteId: string) => {
  if (document.getElementById("crisp-widget-script")) return;
  
  (window as any).$crisp = [];
  (window as any).CRISP_WEBSITE_ID = websiteId;
  
  const d = document;
  const s = d.createElement("script");
  s.id = "crisp-widget-script";
  s.src = "https://client.crisp.chat/l.js";
  s.async = true;
  d.getElementsByTagName("head")[0].appendChild(s);
};

const unloadCrisp = () => {
  const script = document.getElementById("crisp-widget-script");
  if (script) {
    script.remove();
  }
  // Remove native Crisp widgets
  const crispElements = document.querySelectorAll(".crisp-client, #crisp-chatbox, [id^='crisp-']");
  crispElements.forEach(el => el.remove());
  
  delete (window as any).$crisp;
  delete (window as any).CRISP_WEBSITE_ID;
};

const loadTawk = (propertyId: string) => {
  if (document.getElementById("tawk-widget-script")) return;
  
  (window as any).Tawk_API = (window as any).Tawk_API || {};
  (window as any).Tawk_LoadStart = new Date();
  
  const d = document;
  const s = d.createElement("script");
  s.id = "tawk-widget-script";
  s.async = true;
  s.src = `https://embed.tawk.to/${propertyId}`;
  s.charset = "UTF-8";
  s.setAttribute("crossorigin", "*");
  
  const s0 = d.getElementsByTagName("script")[0];
  if (s0 && s0.parentNode) {
    s0.parentNode.insertBefore(s, s0);
  } else {
    d.getElementsByTagName("head")[0].appendChild(s);
  }
};

const unloadTawk = () => {
  const script = document.getElementById("tawk-widget-script");
  if (script) {
    script.remove();
  }
  // Remove native Tawk widgets
  const tawkElements = document.querySelectorAll("[class*='tawk'], [id*='tawk'], iframe[title='chat widget']");
  tawkElements.forEach(el => el.remove());
  
  // Attempt to call hide/shutdown if initialized
  if ((window as any).Tawk_API && typeof (window as any).Tawk_API.hideWidget === 'function') {
    try {
      (window as any).Tawk_API.hideWidget();
    } catch (e) {}
  }
  
  delete (window as any).Tawk_API;
  delete (window as any).Tawk_LoadStart;
};

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Choices: "simulated" | "crisp" | "tawk"
  const [chatMode, setChatMode] = useState<"simulated" | "crisp" | "tawk">(() => {
    return (localStorage.getItem("cl_chat_mode") as "simulated" | "crisp" | "tawk") || "simulated";
  });
  
  const [crispId, setCrispId] = useState(() => {
    return localStorage.getItem("cl_crisp_id") || "d6f0be65-9833-40bf-95c5-eabcb6c6d0d2"; // default test UUID
  });
  
  const [tawkId, setTawkId] = useState(() => {
    return localStorage.getItem("cl_tawk_id") || "6419ca6631ebfa0fe7f53f93/1gsa950o4"; // default test path
  });

  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hello! I am your ManageGoal Assistant. How can I help you pick the right SaaS tool today? Ask me about 'LAUNCH20' or refund terms!", time: "12:00 PM" }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sync script injection with selected mode parameters
  useEffect(() => {
    // Shutdown both widgets first on changes
    unloadCrisp();
    unloadTawk();
    
    // Inject active
    if (chatMode === "crisp" && crispId.trim()) {
      loadCrisp(crispId.trim());
    } else if (chatMode === "tawk" && tawkId.trim()) {
      loadTawk(tawkId.trim());
    }

    return () => {
      unloadCrisp();
      unloadTawk();
    };
  }, [chatMode, crispId, tawkId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, showSettings]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: Message = {
      sender: "user",
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const promptText = inputText.toLowerCase();
    setInputText("");
    setIsTyping(true);

    // Simulate responsive agent answers
    setTimeout(() => {
      setIsTyping(false);
      let reply = "I would be delighted to assist you with that configuration! If you need specific API support or enterprise customization contracts, just drop us a ticket in the Contact page!";

      if (promptText.includes("coupon") || promptText.includes("discount") || promptText.includes("promo") || promptText.includes("launch")) {
        reply = "You can use code 'LAUNCH20' at our secure checkout modal right now to get an immediate 20% discount on any SaaS single product or Growth Bundle! 🎉";
      } else if (promptText.includes("refund") || promptText.includes("money") || promptText.includes("guarantee")) {
        reply = "We offer a strict 14-day hassle-free 100% money-back guarantee. If you are not fully satisfied with our apps, we initiate returns within 2 days of request.";
      } else if (promptText.includes("crm") || promptText.includes("leadflow")) {
        reply = "LeadFlow CRM ($29/mo) can automate lead ingestion, contact enrichment, and displays neat drag-and-drop pipeline stages! You can test the interactive board simulation on the LeadFlow sales page.";
      } else if (promptText.includes("email") || promptText.includes("mailboost")) {
        reply = "MailBoost AI ($19/mo) lets you segment contacts, draft responsive campaigns with native LLM suggestions, and run automated drip sequences. Visit the MailBoost sales tab to see it build copies in real-time!";
      } else if (promptText.includes("cancel") || promptText.includes("subscription")) {
        reply = "Subscriptions are contract-free and can be self-cancelled in one click through your account's Billing tab. You keep premium access through the end of your current cycle.";
      }

      setMessages(prev => [...prev, {
        sender: "bot",
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1200);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 font-sans text-xs">
      {isOpen ? (
        <div id="live-chat-panel" className="bg-slate-900 border border-slate-800 rounded-2xl w-80 sm:w-85 h-96 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          {/* Header */}
          <div className="p-3.5 bg-brand-600 border-b border-brand-500 rounded-t-2xl flex justify-between items-center text-white shrink-0">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-slate-900 text-brand-400 font-bold flex items-center justify-center border border-brand-400/20">
                CL
              </div>
              <div>
                <h5 className="font-bold text-sm">
                  {showSettings ? "Chat settings" : "ManageGoal Support"}
                </h5>
                <span className="text-[10px] text-emerald-300 block">
                  {showSettings ? "Configure Live Integrations" : "● Active Live Assistance"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowSettings(!showSettings)} 
                className={`p-1.5 rounded transition ${showSettings ? "bg-white/25 text-white" : "text-white/70 hover:text-white hover:bg-white/10"}`}
                title="Configure Live Support Providers"
              >
                <Settings size={14} className={showSettings ? "animate-spin-slow" : ""} />
              </button>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition p-1 rounded hover:bg-white/10">
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Body */}
          {showSettings ? (
            <div className="flex-1 p-4 overflow-y-auto bg-slate-950 text-slate-300 flex flex-col justify-between space-y-4">
              <div className="space-y-3.5">
                <div>
                  <h6 className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Support Provider</h6>
                  <div className="grid grid-cols-1 gap-2">
                    
                    {/* Simulated option */}
                    <button
                      type="button"
                      onClick={() => {
                        setChatMode("simulated");
                        localStorage.setItem("cl_chat_mode", "simulated");
                      }}
                      className={`text-left p-2.5 rounded-xl border transition flex items-start gap-2.5 w-full ${chatMode === "simulated" ? "border-brand-500 bg-brand-600/10 text-white" : "border-slate-800 bg-slate-900/40 hover:bg-slate-900"}`}
                    >
                      <Sparkles size={14} className={`shrink-0 mt-0.5 ${chatMode === "simulated" ? "text-brand-400" : "text-slate-500"}`} />
                      <div>
                        <div className="font-bold text-xs flex items-center justify-between gap-2">
                          <span>AI Support Simulator</span>
                          {chatMode === "simulated" && <span className="text-[9px] bg-brand-600 px-1.5 py-0.5 rounded text-white font-mono uppercase font-black tracking-widest">Active</span>}
                        </div>
                        <p className="text-[10px] text-slate-400 leading-normal mt-0.5">Quick responses to billing, discounts, and apps.</p>
                      </div>
                    </button>

                    {/* Crisp option */}
                    <button
                      type="button"
                      onClick={() => {
                        setChatMode("crisp");
                        localStorage.setItem("cl_chat_mode", "crisp");
                      }}
                      className={`text-left p-2.5 rounded-xl border transition flex items-start gap-2.5 w-full ${chatMode === "crisp" ? "border-brand-500 bg-brand-600/10 text-white" : "border-slate-800 bg-slate-900/40 hover:bg-slate-900"}`}
                    >
                      <MessageSquare size={14} className={`shrink-0 mt-0.5 ${chatMode === "crisp" ? "text-brand-400" : "text-slate-500"}`} />
                      <div>
                        <div className="font-bold text-xs flex items-center justify-between gap-2">
                          <span>Real Crisp Chat</span>
                          {chatMode === "crisp" && <span className="text-[9px] bg-brand-600 px-1.5 py-0.5 rounded text-white font-mono uppercase font-black tracking-widest">Active</span>}
                        </div>
                        <p className="text-[10px] text-slate-400 leading-normal mt-0.5">Injects the official crisp.chat visitor widget on all pages.</p>
                      </div>
                    </button>

                    {/* Tawk.to option */}
                    <button
                      type="button"
                      onClick={() => {
                        setChatMode("tawk");
                        localStorage.setItem("cl_chat_mode", "tawk");
                      }}
                      className={`text-left p-2.5 rounded-xl border transition flex items-start gap-2.5 w-full ${chatMode === "tawk" ? "border-brand-500 bg-brand-600/10 text-white" : "border-slate-800 bg-slate-900/40 hover:bg-slate-900"}`}
                    >
                      <RefreshCw size={14} className={`shrink-0 mt-0.5 ${chatMode === "tawk" ? "text-brand-400" : "text-slate-500"}`} />
                      <div>
                        <div className="font-bold text-xs flex items-center justify-between gap-2">
                          <span>Real Tawk.to Widget</span>
                          {chatMode === "tawk" && <span className="text-[9px] bg-brand-600 px-1.5 py-0.5 rounded text-white font-mono uppercase font-black tracking-widest">Active</span>}
                        </div>
                        <p className="text-[10px] text-slate-400 leading-normal mt-0.5">Embeds the standard Tawk.to real-time responder.</p>
                      </div>
                    </button>

                  </div>
                </div>

                {chatMode !== "simulated" && (
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-white">
                        {chatMode === "crisp" ? "Crisp Settings" : "Tawk.to Settings"}
                      </span>
                      <a 
                        href={chatMode === "crisp" ? "https://crisp.chat" : "https://www.tawk.to"} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-[10px] text-brand-400 hover:underline flex items-center gap-0.5 font-bold"
                      >
                        Sign Up <ExternalLink size={9} />
                      </a>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-[9px] text-slate-400 block font-mono font-bold uppercase tracking-wider">
                        {chatMode === "crisp" ? "WEBSITE ID OR PASTE SCRIPT:" : "PROPERTY ID OR PASTE SCRIPT:"}
                      </label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border border-slate-800 px-2.5 py-1.5 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-brand-500"
                        placeholder={chatMode === "crisp" ? "e.g. d6f0be65-9833-40bf..." : "e.g. 6419ca6631ebfa0fe7f53f93/1gsa950o4"}
                        value={chatMode === "crisp" ? crispId : tawkId}
                        onChange={(e) => {
                          if (chatMode === "crisp") {
                            const parsed = parseCrispId(e.target.value);
                            setCrispId(parsed);
                            localStorage.setItem("cl_crisp_id", parsed);
                          } else {
                            const parsed = parseTawkId(e.target.value);
                            setTawkId(parsed);
                            localStorage.setItem("cl_tawk_id", parsed);
                          }
                        }}
                      />
                      <div className="flex items-center justify-between text-[10px] pt-1">
                        <span className="text-slate-500">Pasted script tags are auto-parsed!</span>
                        <button
                          type="button"
                          onClick={() => {
                            if (chatMode === "crisp") {
                              const demo = "d6f0be65-9833-40bf-95c5-eabcb6c6d0d2";
                              setCrispId(demo);
                              localStorage.setItem("cl_crisp_id", demo);
                            } else {
                              const demo = "6419ca6631ebfa0fe7f53f93/1gsa950o4";
                              setTawkId(demo);
                              localStorage.setItem("cl_tawk_id", demo);
                            }
                          }}
                          className="text-brand-400 hover:underline hover:text-brand-300 font-bold font-mono text-[9px]"
                        >
                          🪄 USE DEMO KEY
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-850 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setShowSettings(false);
                    // If live chat is loaded, we can close our config box to let the real widget shine
                    if (chatMode !== "simulated") {
                      setIsOpen(false);
                    }
                  }}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2 rounded-xl text-center text-xs transition"
                >
                  Activate Support Strategy
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Message Simulator view */}
              <div ref={scrollRef} className="flex-grow p-4 space-y-3 overflow-y-auto bg-slate-950/70">
                {chatMode !== "simulated" && (
                  <div className="p-3 bg-brand-600/10 border border-brand-500/20 text-slate-300 rounded-xl space-y-2 mb-2">
                    <p className="font-bold text-white">🚀 Real Client Widget Running!</p>
                    <p className="leading-normal text-slate-400 text-[10px]">
                      The genuine visitor widget was injected. Look for the floating support launcher on the screen to chat live.
                    </p>
                    <button 
                      onClick={() => setShowSettings(true)}
                      className="text-brand-400 hover:underline font-bold text-[10px] flex items-center gap-1"
                    >
                      Adjust settings/Switch back <Settings size={10} />
                    </button>
                  </div>
                )}

                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-2 max-w-[85%] ${m.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                  >
                    {m.sender === "bot" && (
                      <div className="h-5 w-5 rounded-full bg-brand-600/20 border border-brand-500/20 text-brand-400 font-bold text-[9px] shrink-0 flex items-center justify-center">
                        AI
                      </div>
                    )}
                    <div
                      className={`p-2.5 rounded-2xl leading-normal text-xs ${
                        m.sender === "user"
                          ? "bg-brand-600 text-white rounded-tr-none"
                          : "bg-slate-900/90 text-gray-200 border border-slate-800 rounded-tl-none"
                      }`}
                    >
                      <p>{m.text}</p>
                      <span className="text-[8px] text-gray-500 block text-right mt-1 font-mono">{m.time}</span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-2 max-w-[85%] mr-auto items-center">
                    <div className="h-5 w-5 rounded-full bg-brand-600/20 text-brand-400 font-bold text-[9px] shrink-0 flex items-center justify-center">
                      AI
                    </div>
                    <div className="bg-slate-900/90 py-1.5 px-3 rounded-2xl rounded-tl-none border border-slate-800 text-gray-400 font-medium">
                      Assistant typing...
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Form Footer */}
              <form onSubmit={handleSendMessage} className="p-2 border-t border-slate-850 flex gap-1.5 bg-slate-900/80 rounded-b-2xl shrink-0">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={chatMode === "simulated" ? "Ask support anything..." : "Real live chat widget is running below!"}
                  disabled={chatMode !== "simulated"}
                  className="flex-grow bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500 disabled:opacity-40"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || chatMode !== "simulated"}
                  className="bg-brand-600 hover:bg-brand-700 disabled:opacity-30 text-white rounded-xl p-2 shrink-0 transition"
                >
                  <Send size={14} />
                </button>
              </form>
            </>
          )}
        </div>
      ) : (
        <>
          {/* Main Floating Trigger button */}
          {chatMode === "simulated" ? (
            <button
              onClick={() => setIsOpen(true)}
              className="bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-4 rounded-full flex items-center gap-2 shadow-2xl shadow-brand-600/30 transition-transform hover:scale-105"
            >
              <MessageSquare size={16} /> Chat Support
            </button>
          ) : (
            /* Sleek Mini Config capsule staying completely apart from the real native widget launcher in bottom-right */
            <button
              onClick={() => {
                setIsOpen(true);
                setShowSettings(true);
              }}
              className="fixed bottom-5 right-24 z-50 bg-slate-950/90 hover:bg-slate-900 text-slate-300 hover:text-white border border-white/10 shadow-2xl rounded-full p-2.5 transition flex items-center justify-center gap-1.5 font-sans hover:scale-105"
              title="Configure Chat Widgets"
            >
              <Settings size={14} className="text-brand-400" />
              <span className="text-[10px] font-semibold tracking-wider uppercase font-mono">Chat Config</span>
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default LiveChat;
