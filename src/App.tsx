import React, { useState, useEffect, useMemo } from "react";
import {
  Users, Mail, ReceiptText, Share2, Layers, BarChart3,
  Search, ArrowRight, Check, Star, ShieldCheck, MailWarning,
  Sparkles, ShieldAlert, FileText, ChevronRight, Menu, X,
  Phone, MapPin, Send, HelpCircle, BookOpen, Clock, Download,
  ExternalLink, ShoppingCart, RefreshCw, AlertTriangle, Filter,
  Building, CheckCircle2, ChevronDown, Play
} from "lucide-react";

import {
  PRODUCTS,
  TESTIMONIALS,
  FAQS,
  BLOGS,
  PRICING_PLANS,
  REFUND_POLICY_TEMPLATE,
  PRIVACY_POLICY_TEMPLATE,
  TERMS_CONDITIONS_TEMPLATE,
  COOKIE_POLICY_TEMPLATE,
  DISCLAIMER_TEMPLATE
} from "./data";

import {
  Product,
  PricingPlan,
  Testimonial,
  FAQItem,
  BlogPost,
  CartItem,
  SupportTicket
} from "./types";

import {
  LeadFlowDemo,
  MailBoostDemo,
  InvoiceProDemo,
  SocialPilotDemo,
  TaskSyncDemo,
  AnalyticsHubDemo
} from "./components/InteractiveDemos";

import { MapVisualizer } from "./components/MapVisualizer";
import { CheckoutModal } from "./components/CheckoutModal";
import { LiveChat } from "./components/LiveChat";
import { AnimatedHeroMockup } from "./components/AnimatedHeroMockup";

export default function App() {
  // --- Routing & Navigation States ---
  // Supported views: 'home' | 'products' | 'product-sales' | 'pricing' | 'about' | 'contact' | 'faq' | 'blog' | 'blog-post' | 'thank-you' | 'privacy' | 'terms' | 'refund' | 'cookie' | 'disclaimer' | 'sitemap-view' | 'robots-txt-view'
  const [currentView, setCurrentView] = useState<string>("home");
  const [selectedProductId, setSelectedProductId] = useState<string>("leadflow-crm");
  const [selectedBlogPostSlug, setSelectedBlogPostSlug] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- Search & Filter States ---
  const [productSearch, setProductSearch] = useState("");
  const [productFilter, setProductFilter] = useState("all");
  const [faqCategory, setFaqCategory] = useState<"all" | "billing" | "cancellation" | "security" | "product">("all");
  const [faqSearch, setFaqSearch] = useState("");

  // --- E-Commerce & Checkout States ---
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const [checkoutPlan, setCheckoutPlan] = useState<PricingPlan | null>(null);
  const [lastOrder, setLastOrder] = useState<{ cart: CartItem; orderId: string; discountApplied: boolean } | null>(null);
  const [purchasedProductIds, setPurchasedProductIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("mgoal_unlocked_products");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    // Default unlock LeadFlow CRM so they can play with it immediately
    return ["leadflow-crm"];
  });

  useEffect(() => {
    try {
      localStorage.setItem("mgoal_unlocked_products", JSON.stringify(purchasedProductIds));
    } catch (f) {}
  }, [purchasedProductIds]);

  // --- Contact Support States ---
  const [supportTicket, setSupportTicket] = useState<SupportTicket>({
    name: "",
    email: "",
    subject: "Sales Inquiry",
    message: "",
    status: "idle"
  });

  // --- Newsletter Subscription States ---
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // --- Web3 / MetaMask Wallet Integration States ---
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnectingWallet, setIsConnectingWallet] = useState<boolean>(false);
  const [walletError, setWalletError] = useState<string | null>(null);
  const [showWalletErrorBanner, setShowWalletErrorBanner] = useState<boolean>(false);

  // Connect wallet handler with clean visual error catches & beautiful fallbacks
  const connectWallet = async () => {
    setIsConnectingWallet(true);
    setWalletError(null);
    setShowWalletErrorBanner(false);
    try {
      if (typeof window !== "undefined" && (window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts"
        });
        if (accounts && accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setShowWalletErrorBanner(false);
        } else {
          throw new Error("Rejected: Connection denied. Please authorize this app in your MetaMask dashboard.");
        }
      } else {
        // Fallback or explain gracefully
        const isIframe = typeof window !== "undefined" && window.self !== window.top;
        if (isIframe) {
          throw new Error("MetaMask injection was not detected in this sandboxed preview iframe. Please click the 'New Tab' or 'Open App' toggle in the AI Studio header, or use our manual 'Simulate Connection' button to proceed with testing instantly!");
        } else {
          throw new Error("MetaMask is not installed. Please install the MetaMask browser extension to link your active Ethereum account.");
        }
      }
    } catch (err: any) {
      console.error("MetaMask connection failed:", err);
      const isIframe = typeof window !== "undefined" && window.self !== window.top;
      let errMsg = err.message || "Failed to connect to MetaMask.";
      if (isIframe && !errMsg.includes("Simulate Connection")) {
        errMsg = `${errMsg} (Tip: Standard browser extension APIs are blocked inside preview iframes. Use 'Simulate Connection' or open this app in a New Tab to test MetaMask!)`;
      }
      setWalletError(errMsg);
      setShowWalletErrorBanner(true);
    } finally {
      setIsConnectingWallet(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setWalletError(null);
    setShowWalletErrorBanner(false);
  };

  // Sync MetaMask state listeners
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts && accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setWalletError(null);
          setShowWalletErrorBanner(false);
        } else {
          setWalletAddress(null);
        }
      };

      (window as any).ethereum.on?.("accountsChanged", handleAccountsChanged);

      // Check current connection
      (window as any).ethereum.request?.({ method: "eth_accounts" })
        .then((accounts: string[]) => {
          if (accounts && accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        })
        .catch(() => {});

      return () => {
        (window as any).ethereum.removeListener?.("accountsChanged", handleAccountsChanged);
      };
    }
  }, []);

  // Auto-scroll to top upon page navigation of virtual routes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  }, [currentView, selectedProductId, selectedBlogPostSlug]);

  // Handle URL hash changes for native-like back button navigation support
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || "#home";
      if (hash.startsWith("#product/")) {
        const pId = hash.replace("#product/", "");
        setSelectedProductId(pId);
        setCurrentView("product-sales");
      } else if (hash.startsWith("#blog/")) {
        const slug = hash.replace("#blog/", "");
        setSelectedBlogPostSlug(slug);
        setCurrentView("blog-post");
      } else {
        const view = hash.replace("#", "");
        const validViews = ["home", "products", "pricing", "about", "contact", "faq", "blog", "thank-you", "privacy-policy", "terms-conditions", "refund-policy", "cookie-policy", "disclaimer", "sitemap-view", "robots-txt-view"];
        if (validViews.includes(view)) {
          setCurrentView(view === "privacy-policy" ? "privacy" : view === "terms-conditions" ? "terms" : view === "refund-policy" ? "refund" : view === "cookie-policy" ? "cookie" : view);
        } else {
          setCurrentView("home");
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    // Initial check
    if (window.location.hash) {
      handleHashChange();
    }
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Update hash safely when custom views are changed
  const navigateTo = (view: string, hashStr?: string) => {
    if (hashStr) {
      window.location.hash = hashStr;
    } else {
      window.location.hash = view === "privacy" ? "privacy-policy" : view === "terms" ? "terms-conditions" : view === "refund" ? "refund-policy" : view === "cookie" ? "cookie-policy" : view;
    }
    // State setting is triggered by hashchange listener
  };

  // --- Helper Methods ---
  const getProductIcon = (iconName: string) => {
    switch (iconName) {
      case "Users": return <Users className="h-6 w-6" />;
      case "Mail": return <Mail className="h-6 w-6" />;
      case "ReceiptText": return <ReceiptText className="h-6 w-6" />;
      case "Share2": return <Share2 className="h-6 w-6" />;
      case "Layers": return <Layers className="h-6 w-6" />;
      case "BarChart3": return <BarChart3 className="h-6 w-6" />;
      default: return <Sparkles className="h-6 w-6" />;
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail("");
    }, 2000);
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportTicket.name || !supportTicket.email || !supportTicket.message) return;
    setSupportTicket(prev => ({ ...prev, status: "submitting" }));

    // Mock API trigger latency
    setTimeout(() => {
      setSupportTicket({
        name: "",
        email: "",
        subject: "Sales Inquiry",
        message: "",
        status: "success",
        ticketId: "TKT-" + Math.floor(Math.random() * 900000 + 100000)
      });
    }, 1500);
  };

  const completeCheckoutPurchase = (cartItem: CartItem, orderId: string, discount: boolean) => {
    setIsCheckoutOpen(false);
    setLastOrder({ cart: cartItem, orderId, discountApplied: discount });
    
    setPurchasedProductIds(prev => {
      const isSuite = cartItem.product.id === "custom-suite" || 
                      cartItem.product.id.toLowerCase().includes("suite") || 
                      cartItem.product.id.toLowerCase().includes("bundle");
      if (isSuite) {
        return ["leadflow-crm", "mailboost-ai", "invoicepro", "socialpilot-ai", "tasksync", "analyticshub"];
      }
      return prev.includes(cartItem.product.id) ? prev : [...prev, cartItem.product.id];
    });

    navigateTo("thank-you");
  };

  const handleDownloadReceipt = () => {
    const orderId = lastOrder?.orderId || "ORD-941208";
    const productName = lastOrder?.cart.product.name || "Growth Suite Plus Bundle";
    const cycle = lastOrder?.cart.billingCycle || "yearly";
    const price = lastOrder?.cart.price || 69;
    const dateStr = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>ManageGoal Receipt - \${orderId}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #1e293b; background: #fafafa; }
    .receipt-card { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
    .header { text-align: center; border-bottom: 2px dashed #e2e8f0; padding-bottom: 24px; margin-bottom: 24px; }
    .brand { font-size: 22px; font-weight: 800; color: #ca8a04; letter-spacing: -0.02em; margin-bottom: 4px; }
    .subtitle { font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; }
    .order-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 12px; color: #64748b; margin-bottom: 30px; }
    .meta-value { font-weight: 600; color: #0f172a; margin-top: 2px; }
    .table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
    .table th { text-align: left; padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-size: 11px; text-transform: uppercase; color: #64748b; tracking-wider: 0.05em; }
    .table td { padding: 16px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; color: #334155; }
    .total-row { font-size: 16px; font-weight: bold; color: #0f172a; }
    .total-price { color: #16a34a; font-family: monospace; font-size: 18px; }
    .footer { text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 24px; margin-top: 20px; }
    .badge { display: inline-block; background: #fef9c3; color: #a16207; padding: 4px 8px; border-radius: 9999px; font-size: 10px; font-weight: bold; text-transform: uppercase; }
  </style>
</head>
<body>
  <div class="receipt-card">
    <div class="header">
      <div class="brand">MANAGEGOAL</div>
      <div class="subtitle">Official Payment Receipt</div>
    </div>
    
    <div class="order-meta">
      <div>
        Order Identifier
        <div class="meta-value">\${orderId}</div>
      </div>
      <div style="text-align: right;">
        Date of Purchase
        <div class="meta-value">\${dateStr}</div>
      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>Acquired Standard Suite</th>
          <th style="text-align: right;">Amount Charged</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>\${productName}</strong>
            <div style="font-size: 11px; color: #64748b; margin-top: 4px;">Dynamic Single SaaS Node Licensing (\${cycle} cycle)</div>
          </td>
          <td style="text-align: right; font-weight: 600;">\$\${price}.00</td>
        </tr>
        <tr class="total-row">
          <td style="padding-top: 24px;">Total Authorized</td>
          <td style="text-align: right; padding-top: 24px;" class="total-price">\$\${price}.00</td>
        </tr>
      </tbody>
    </table>

    <div style="text-align: center; margin-bottom: 30px;">
      <span class="badge">Paid Securely & Verified</span>
    </div>

    <div class="footer">
      Thank you for choosing ManageGoal. Your active license key has been auto-mapped.
      <br>
      <span style="font-family: monospace; font-size: 9px; display: inline-block; margin-top: 8px;">DIGITAL SHA256 CORRELATION: AUTH-MNG-\${orderId}-SECURE</span>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `receipt-\${orderId}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Filter products based on search constraints
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) || 
                          p.tagline.toLowerCase().includes(productSearch.toLowerCase()) ||
                          p.description.toLowerCase().includes(productSearch.toLowerCase());
      if (productFilter === "all") return matchSearch;
      if (productFilter === "premium") return matchSearch && p.priceMonthly > 20;
      if (productFilter === "starter") return matchSearch && p.priceMonthly <= 20;
      return matchSearch;
    });
  }, [productSearch, productFilter]);

  // Filter FAQs based on search & tab constraints
  const filteredFAQs = useMemo(() => {
    return FAQS.filter(f => {
      const matchSearch = f.question.toLowerCase().includes(faqSearch.toLowerCase()) || 
                          f.answer.toLowerCase().includes(faqSearch.toLowerCase());
      if (faqCategory === "all") return matchSearch;
      return matchSearch && f.category === faqCategory;
    });
  }, [faqSearch, faqCategory]);

  return (
    <div className="min-h-screen flex flex-col justify-between overflow-x-hidden font-sans bg-slate-950 text-slate-100 premium-gradient selection:bg-brand-600 selection:text-white">
      
      {/* ⚠️ Legal Template Header Banner Warning - Craftsmanship Disclaimer */}
      <div id="legal-warning-banner" className="bg-brand-900 border-b border-brand-700/40 text-center py-2 px-4 text-xs text-brand-100 z-50 relative flex flex-col sm:flex-row items-center justify-center gap-1">
        <span className="font-semibold flex items-center gap-1">
          <ShieldAlert size={14} className="text-brand-300" /> Administrative Notice:
        </span>
        <span>The legal policies displayed are structured templates. Please customize them to match your local compliance benchmarks before deploying commercially.</span>
        <button 
          onClick={() => {
            const banner = document.getElementById("legal-warning-banner");
            if(banner) banner.style.display = "none";
          }}
          className="text-brand-300 hover:text-white ml-2 text-[10px] uppercase font-bold text-underline"
        >
          Dismiss
        </button>
      </div>

      {/* --- Sticky Responsive Header Navbar --- */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/5 transition-all duration-300 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo Brand */}
          <button onClick={() => navigateTo("home")} className="flex items-center gap-2.5 group cursor-pointer focus:outline-none">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="text-left">
              <span className="font-display font-extrabold text-lg text-white letter tracking-tight block">
                ManageGoal <span className="text-brand-400">Apps</span>
              </span>
              <span className="text-[9px] uppercase tracking-wider font-mono text-gray-400 block -mt-1 font-semibold">SAAS SUITE CATALOG</span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-gray-300">
            <button
              onClick={() => navigateTo("home")}
              className={`px-3 py-2 rounded-lg hover:text-white transition duration-200 ${currentView === "home" ? "bg-slate-900 text-brand-405 font-bold" : ""}`}
            >
              Home
            </button>
            <button
              onClick={() => navigateTo("products")}
              className={`px-3 py-2 rounded-lg hover:text-white transition duration-200 ${currentView === "products" || currentView === "product-sales" ? "bg-slate-900 text-brand-405 font-bold" : ""}`}
            >
              Our Products
            </button>
            <button
              onClick={() => navigateTo("pricing")}
              className={`px-3 py-2 rounded-lg hover:text-white transition duration-200 ${currentView === "pricing" ? "bg-slate-900 text-brand-405 font-bold" : ""}`}
            >
              Pricing Bundles
            </button>
            <button
              onClick={() => navigateTo("faq")}
              className={`px-3 py-2 rounded-lg hover:text-white transition duration-200 ${currentView === "faq" ? "bg-slate-900 text-brand-405 font-bold" : ""}`}
            >
              FAQ Hub
            </button>
            <button
              onClick={() => navigateTo("blog")}
              className={`px-3 py-2 rounded-lg hover:text-white transition duration-200 ${currentView === "blog" || currentView === "blog-post" ? "bg-slate-900 text-brand-400 font-bold" : ""}`}
            >
              Growth Blog
            </button>
            <button
              onClick={() => navigateTo("about")}
              className={`px-3 py-2 rounded-lg hover:text-white transition duration-200 ${currentView === "about" ? "bg-slate-900 text-brand-400 font-bold" : ""}`}
            >
              About Brand
            </button>
            <button
              onClick={() => navigateTo("contact")}
              className={`px-3 py-2 rounded-lg hover:text-white transition duration-200 ${currentView === "contact" ? "bg-slate-900 text-brand-400 font-bold" : ""}`}
            >
              Secure Help
            </button>
          </nav>

          {/* CTA & Cart status info */}
          <div className="hidden md:flex items-center gap-3">
            <span className="text-gray-500 text-xs font-mono font-medium hidden lg:inline border border-slate-900 py-1 px-2.5 rounded bg-slate-950">
              SSL SECURED GATEWAYS
            </span>
            
            {/* MetaMask Action */}
            {walletAddress ? (
              <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 text-xs py-1.5 px-3 rounded-xl">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                <span className="text-gray-300 font-mono tracking-wider font-semibold">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </span>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); disconnectWallet(); }}
                  className="text-gray-500 hover:text-red-400 font-bold ml-1 transition"
                  title="Disconnect MetaMask wallet"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={connectWallet}
                disabled={isConnectingWallet}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-805 text-white font-bold text-xs py-2 px-3 rounded-xl transition duration-300 flex items-center gap-1.5"
              >
                {isConnectingWallet ? (
                  <>
                    <RefreshCw size={12} className="animate-spin text-brand-405" />
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-ping"></span>
                    <span>Connect Wallet</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={() => {
                setCheckoutProduct(PRODUCTS[0]);
                setCheckoutPlan(null);
                setIsCheckoutOpen(true);
              }}
              className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs py-2 px-4 rounded-xl transition duration-300 shadow-lg shadow-brand-600/15"
            >
              Browse Enterprise
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-slate-900 text-gray-300 hover:text-white transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-850 bg-slate-900 px-4 py-4 space-y-2 flex flex-col font-medium">
            <button
              onClick={() => { navigateTo("home"); setMobileMenuOpen(false); }}
              className={`text-left p-2.5 rounded-lg text-sm ${currentView === "home" ? "bg-slate-950 text-brand-402" : "text-gray-300"}`}
            >
              Home Cockpit
            </button>
            <button
              onClick={() => { navigateTo("products"); setMobileMenuOpen(false); }}
              className={`text-left p-2.5 rounded-lg text-sm ${currentView === "products" ? "bg-slate-950 text-brand-402" : "text-gray-300"}`}
            >
              SaaS Solutions Catalog
            </button>
            <button
              onClick={() => navigateTo("pricing")}
              className={`text-left p-2.5 rounded-lg text-sm ${currentView === "pricing" ? "bg-slate-950 text-brand-402" : "text-gray-300"}`}
            >
              SaaS Suite Pricing
            </button>
            <button
              onClick={() => navigateTo("faq")}
              className={`text-left p-2.5 rounded-lg text-sm ${currentView === "faq" ? "bg-slate-950 text-brand-402" : "text-gray-300"}`}
            >
              20+ Frequently Asked Questions
            </button>
            <button
              onClick={() => navigateTo("blog")}
              className={`text-left p-2.5 rounded-lg text-sm ${currentView === "blog" ? "bg-slate-950 text-brand-402" : "text-gray-300"}`}
            >
              SaaS Growth Blog
            </button>
            <button
              onClick={() => navigateTo("about")}
              className={`text-left p-2.5 rounded-lg text-sm ${currentView === "about" ? "bg-slate-950 text-brand-402" : "text-gray-300"}`}
            >
              Our Mission & Values
            </button>
            <button
              onClick={() => navigateTo("contact")}
              className={`text-left p-2.5 rounded-lg text-sm ${currentView === "contact" ? "bg-slate-950 text-brand-402" : "text-gray-300"}`}
            >
              Secure Customer Desk
            </button>

            <div className="border-t border-slate-800 pt-3 flex flex-col gap-2">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono text-center">SSL SHA256 Encryption active</span>
              <button
                onClick={() => {
                  setCheckoutProduct(PRODUCTS[0]);
                  setCheckoutPlan(null);
                  setIsCheckoutOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 rounded-xl text-center text-xs"
              >
                Launch Growth Trial
              </button>
            </div>
          </div>
        )}
      </header>

      {/* --- Main Contents Router Switch --- */}
      <main className="flex-grow">

        {/* ========================================================
            VIEW: HOME COCKPIT
            ======================================================== */}
        {currentView === "home" && (
          <div className="space-y-20 pb-20">
            {/* Hero Section */}
            <section className="relative px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12 max-w-7xl mx-auto text-center space-y-6">
              
              {/* Top micro pill */}
              <div className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-xs text-brand-400 font-semibold tracking-wider uppercase">
                <Sparkles size={14} className="text-brand-400 animate-pulse" /> Launching version 4.1.2 - Fast Integrations
              </div>

              {/* Big Bold Display Header */}
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight font-display max-w-4xl mx-auto">
                Grow Faster with Powerful <span className="gradient-text">SaaS Tools</span>
              </h1>

              {/* Subtitle */}
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                Discover professional software designed by developers to help automate your pipeline, AI marketing, invoicing, task synchronization, and executive commercial analytics on a unified canvas.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-4">
                <button
                  onClick={() => navigateTo("products")}
                  className="w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white font-bold px-8 py-3.5 rounded-xl transition duration-300 shadow-xl shadow-brand-600/20 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  Browse Catalog
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigateTo("pricing")}
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-850 border border-slate-800 text-white font-semibold px-8 py-3.5 rounded-xl transition duration-300"
                >
                  View Bundle Pricing
                </button>
              </div>

              {/* Animated SaaS Operations Mockup */}
              <AnimatedHeroMockup />

              {/* Trust Badge Grid */}
              <div className="pt-12 space-y-4">
                <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500 font-mono">
                  TRUSTED BY MULTIPLE SECTOR INNOVATORS ACROSS WORLD MATRICES
                </p>
                <div className="flex flex-wrap items-center justify-center gap-8 text-gray-600 font-mono text-sm font-semibold opacity-60">
                  <span className="hover:text-white transition duration-350">WAYNE ENTERPRISES</span>
                  <span className="hover:text-white transition duration-350">AEROTECH LABS</span>
                  <span className="hover:text-white transition duration-350">CYBERDYNE INC</span>
                  <span className="hover:text-white transition duration-350">FIN-GRID LABS</span>
                  <span className="hover:text-white transition duration-350">VANGUARD CO</span>
                </div>
              </div>
            </section>

            {/* Feature Highlights Grid Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-2 mb-10 text-pretty">
                <span className="text-xs text-brand-400 font-mono uppercase tracking-widest block font-bold">Uncompromising Standard</span>
                <h2 className="text-2xl sm:text-4xl font-bold font-display text-white">Why Teams Trust ManageGoal</h2>
                <p className="text-gray-400 max-w-xl mx-auto text-sm">Every application is precision engineered prioritizing performance, accessibility compliance, GDPR safeguards, and instant deployment speeds.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-3 hover:border-brand-650 transitionduration-300">
                  <div className="h-10 w-10 bg-brand-500/10 text-brand-400 rounded-xl flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h3 className="text-white font-bold font-display text-lg">ISO-27001 Security Standard</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    We host our databases in premium Google Cloud clusters keeping user keys hashed, records isolated, and transaction networks SSL encrypted under standard TLS guidelines.
                  </p>
                </div>
                <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-3 hover:border-brand-650 transition duration-300">
                  <div className="h-10 w-10 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <h3 className="text-white font-bold font-display text-lg">99.9% Reliable Uptime Contracts</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Our dynamic clusters scale immediately as requests scale, preventing database locks during critical enterprise traffic periods.
                  </p>
                </div>
                <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-3 hover:border-brand-650 transition duration-300">
                  <div className="h-10 w-10 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center">
                    <Clock className="h-5 w-5" />
                  </div>
                  <h3 className="text-white font-bold font-display text-lg">Immediate Account Setup</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Skip long enterprise consultation wait lists. Enter your credentials, select your target applications, and begin executing steps in 2 minutes.
                  </p>
                </div>
              </div>
            </section>

            {/* Catalog Grid Section (Product cards) */}
            <section className="bg-slate-900/40 border-y border-white/5 py-16 px-4">
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="flex flex-wrap justify-between items-end gap-4 text-pretty">
                  <div>
                    <span className="text-xs text-brand-405 font-mono uppercase tracking-widest block font-bold">SOFTWARE SPECIFICATIONS</span>
                    <h2 className="text-2xl sm:text-4xl font-bold font-display text-white mt-1">Explore our high performance SaaS Solutions</h2>
                  </div>
                  <button
                    onClick={() => navigateTo("products")}
                    className="text-brand-400 hover:text-brand-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                  >
                    Load Advanced Filters <ArrowRight size={14} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {PRODUCTS.map(product => (
                    <div
                      key={product.id}
                      className="glass-panel rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition duration-300 hover:shadow-2xl hover:shadow-brand-500/5 group"
                    >
                      {/* Top color header accent */}
                      <div className={`h-2.5 bg-gradient-to-r ${product.colorClass}`}></div>
                      
                      <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className={`text-[10px] font-bold tracking-widest uppercase border px-2 py-0.5 rounded ${product.badgeColorClass}`}>
                              {product.priceMonthly}$/mo Starter RATE
                            </span>
                            <span className="text-yellow-400 text-xs font-mono font-medium flex items-center gap-0.5">
                              <Star size={12} className="fill-current" /> {product.rating}
                            </span>
                          </div>

                          <h3 
                            onClick={() => {
                              setSelectedProductId(product.id);
                              navigateTo("product-sales", `#product/${product.id}`);
                            }}
                            className="text-xl font-bold text-white hover:text-brand-400 transition duration-200 cursor-pointer font-display flex items-center gap-2"
                            title="View Sales Page"
                          >
                            <span className="text-brand-400">{getProductIcon(product.logoName)}</span>
                            <span className="hover:underline">{product.name}</span>
                          </h3>

                          <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                            {product.tagline}
                          </p>
                        </div>

                        <ul className="space-y-2 pt-4 border-t border-slate-850 text-xs text-gray-300">
                          {product.features.slice(0, 4).map((f, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <CheckCircle2 size={12} className="text-brand-400 flex-shrink-0" />
                              <span className="line-clamp-1">{f}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="pt-5">
                          <button
                            onClick={() => {
                              setCheckoutProduct(product);
                              setCheckoutPlan(null);
                              setIsCheckoutOpen(true);
                            }}
                            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5"
                            title="Instant checkout"
                          >
                            <ShoppingCart size={13} /> Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Testimonial slider / bento section */}
            <section className="max-w-7xl mx-auto px-4">
              <div className="text-center space-y-2 mb-10">
                <span className="text-xs text-brand-402 font-mono uppercase tracking-widest block font-semibold">VERIFIED FEEDBACK CHANNELS</span>
                <h2 className="text-2xl sm:text-4xl font-bold font-display text-white">Loved by creators internationally</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TESTIMONIALS.slice(0, 3).map(testi => (
                  <div key={testi.id} className="glass-panel p-5 rounded-2xl border border-white/5 space-y-4 text-xs italic text-gray-300 text-pretty relative">
                    <span className="absolute top-4 right-4 text-brand-500/20 text-6xl font-serif pointer-events-none font-bold">“</span>
                    <div className="flex gap-1 mb-1">
                      {Array.from({ length: testi.rating }).map((_, i) => (
                        <Star key={i} size={12} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="line-clamp-4 relative z-10">"{testi.review}"</p>
                    <div className="flex items-center gap-3 pt-3 border-t border-slate-850">
                      <div className="h-8 w-8 rounded-full bg-brand-600 text-[10px] font-bold text-white flex items-center justify-center border border-brand-400/25">
                        {testi.name[0]}{testi.name.split(" ")[1]?.[0] || ""}
                      </div>
                      <div>
                        <h4 className="font-bold text-white not-italic font-display">{testi.name}</h4>
                        <span className="text-[10px] text-gray-500 not-italic block">{testi.position} at {testi.company}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Newsletter segment */}
            <section className="max-w-4xl mx-auto px-4">
              <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 text-center space-y-4 relative overflow-hidden">
                <div className="absolute top-0 left-12 w-28 h-28 bg-brand-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-12 w-28 h-28 bg-indigo-600/10 rounded-full blur-3xl"></div>

                <span className="text-xs text-brand-405 font-mono uppercase tracking-wider block font-bold">STAY INFORMED</span>
                <h3 className="text-xl sm:text-3xl font-bold font-display text-white">Join the ManageGoal Dispatch</h3>
                <p className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto">
                  Receive the latest SaaS development news plus exclusive, priority discount codes. No spam, self-cancel anytime.
                </p>

                {newsletterSubscribed ? (
                  <div className="bg-emerald-900/20 text-emerald-400 border border-emerald-800/30 p-4 rounded-xl text-xs font-semibold max-w-sm mx-auto flex items-center justify-center gap-2">
                    <CheckCircle2 size={16} /> Subscribed! Check your verification code soon!
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
                    <input
                      type="email"
                      required
                      placeholder="Enter your agency email..."
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-white text-xs flex-grow focus:outline-none"
                    />
                    <button type="submit" className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition duration-200">
                      Subscribe
                    </button>
                  </form>
                )}
              </div>
            </section>

            {/* Quick-links FAQ Accordion row */}
            <section className="max-w-4xl mx-auto px-4 space-y-6">
              <div className="text-center space-y-1">
                <span className="text-xs text-brand-405 font-mono uppercase tracking-widest font-semibold block">FAQ QUICK PREVIEW</span>
                <h3 className="text-lg sm:text-2xl font-bold text-white font-display">Have any immediate questions?</h3>
              </div>
              <div className="space-y-3">
                {FAQS.slice(0, 4).map((f, i) => (
                  <div key={i} className="glass-panel p-4 rounded-xl border border-white/5 space-y-1">
                    <h4 className="font-bold text-white text-xs sm:text-sm font-display flex items-center gap-1.5">
                      <HelpCircle size={14} className="text-brand-400" /> {f.question}
                    </h4>
                    <p className="text-gray-400 text-xs leading-relaxed pl-5">{f.answer}</p>
                  </div>
                ))}
              </div>
              <div className="text-center pt-2">
                <button
                  onClick={() => navigateTo("faq")}
                  className="text-brand-400 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1 mx-auto cursor-pointer"
                >
                  View all 20 Frequently Asked Questions <ArrowRight size={14} />
                </button>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================
            VIEW: PRODUCTS CATALOGUE
            ======================================================== */}
        {currentView === "products" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs text-brand-405 font-mono uppercase tracking-widest block font-bold">PRE-BUILT SOLUTIONS CATALOGUE</span>
              <h1 className="text-3xl sm:text-5xl font-bold font-display text-white">Accelerate Your Workflow</h1>
              <p className="text-gray-400 text-sm">Fine-tune your operations with our 6 SaaS packages, each created focusing strictly on high-performance metrics and elegant ease-of-use guidelines.</p>
            </div>

            {/* Search and Filters Strip */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="Query SaaS name or description..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 pl-9 pr-3 py-2 rounded-xl text-white focus:outline-none"
                />
                <Search size={14} className="absolute left-3 top-3 text-gray-500" />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <span className="text-gray-400 flex items-center gap-1 shrink-0">
                  <Filter size={12} /> Filter Level:
                </span>
                <div className="flex gap-1.5">
                  {(["all", "premium", "starter"] as const).map(flt => (
                    <button
                      key={flt}
                      onClick={() => setProductFilter(flt)}
                      className={`capitalize px-3 py-1.5 rounded-lg border font-semibold transition ${
                        productFilter === flt ? "bg-brand-600 border-brand-500 text-white" : "bg-slate-950 border-slate-850 text-gray-400 hover:text-white"
                      }`}
                    >
                      {flt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Search list display */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="glass-panel rounded-2xl border border-white/5 flex flex-col justify-between overflow-hidden group hover:border-white/10 transition">
                  <div className={`h-2 bg-gradient-to-r ${product.colorClass}`}></div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="p-2.5 bg-slate-900 rounded-xl text-brand-400 border border-slate-800">
                        {getProductIcon(product.logoName)}
                      </div>
                      <span className="text-yellow-400 font-mono font-bold text-xs flex items-center gap-0.5">
                        <Star size={12} className="fill-current animate-pulse" /> {product.rating}
                      </span>
                    </div>

                    <div>
                      <h3 
                        onClick={() => {
                          setSelectedProductId(product.id);
                          navigateTo("product-sales", `#product/${product.id}`);
                        }}
                        className="text-xl font-bold text-white hover:text-brand-400 transition duration-200 cursor-pointer font-display inline-block hover:underline"
                        title="View Sales Page"
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-brand-405 font-mono mt-2 mb-2">{product.highlightedMetric.label}: <strong className="text-white">{product.highlightedMetric.value}</strong></p>
                      <p className="text-gray-400 text-xs font-sans leading-relaxed">{product.description}</p>
                    </div>

                    <div className="border-t border-slate-850 pt-3 space-y-1">
                      <span className="text-[10px] text-gray-500 block uppercase font-mono tracking-widest">ADVANCED FEATURE HIGHLIGHTS</span>
                      <div className="grid grid-cols-1 gap-1.5 text-xs text-gray-300">
                        {product.features.slice(0, 3).map((f, idx) => (
                          <p key={idx} className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-400 block"></span> {f}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-slate-900/40 border-t border-slate-850">
                    <button
                      onClick={() => {
                        setCheckoutProduct(product);
                        setCheckoutPlan(null);
                        setIsCheckoutOpen(true);
                      }}
                      className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5"
                    >
                      <ShoppingCart size={13} /> Buy Now
                    </button>
                  </div>
                </div>
              ))}

              {filteredProducts.length === 0 && (
                <div className="col-span-full py-16 text-center space-y-3 bg-slate-900 rounded-2xl border border-slate-800">
                  <AlertTriangle size={32} className="mx-auto text-amber-500" />
                  <h4 className="text-white font-bold font-display text-lg">No SaaS apps found matching search criteria</h4>
                  <p className="text-gray-400 text-xs">Try adjusting your keywords (e.g. CRM, email, invoice)</p>
                  <button onClick={() => { setProductSearch(""); setProductFilter("all"); }} className="bg-slate-800 hover:bg-slate-700 text-xs px-4 py-2 rounded-lg font-bold">Reset Filters</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            VIEW: INDIVIDUAL PRODUCT SALES PAGE
            ======================================================== */}
        {currentView === "product-sales" && (
          (() => {
            const product = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];
            return (
              <div className="space-y-16 pb-20">
                {/* Product Sales Hero */}
                <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 text-center space-y-6">
                  <div className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-xs text-brand-402 font-bold tracking-widest uppercase">
                    {getProductIcon(product.logoName)} {product.name} Showcase Page
                  </div>

                  <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-display max-w-3xl mx-auto">
                    {product.tagline}
                  </h1>

                  <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                    {product.description} Equipped with customized automated processing routines keeping your operational metrics performing perfectly.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        setCheckoutProduct(product);
                        setCheckoutPlan(null);
                        setIsCheckoutOpen(true);
                      }}
                      className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 px-8 rounded-xl transition shadow-lg shadow-brand-600/15"
                    >
                      Buy {product.name} — ${product.priceMonthly}/mo
                    </button>
                    <a href="#demo-preview" className="bg-slate-900 border border-slate-800 hover:bg-slate-850 text-white font-semibold py-3.5 px-6 rounded-xl transition">
                      Test Live Simulator
                    </a>
                  </div>

                  <div className="flex justify-center items-center gap-6 text-xs text-gray-500 font-mono">
                    <span>★ RATINGS: {product.rating} ({product.reviewCount} users)</span>
                    <span>• {product.highlightedMetric.label}: {product.highlightedMetric.value}</span>
                  </div>
                </section>

                {/* Main detail overview */}
                <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                  <div className="space-y-6">
                    <span className="text-xs text-brand-405 uppercase tracking-widest block font-bold">CORE VALUE PROPOSITION</span>
                    <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">How it elevates your company</h2>
                    <p className="text-gray-400 text-sm leading-relaxed">{product.overview}</p>

                    <div className="space-y-3">
                      <h4 className="text-white font-bold text-xs uppercase tracking-widest">Key Operational Benefits:</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {product.benefits.map((b, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <span className="text-xs text-brand-405 font-mono uppercase tracking-widest font-bold">ADVANCED ATTRIBUTES DEPLOYED</span>
                    <div className="space-y-3">
                      {product.features.map((feat, idx) => (
                        <div key={idx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-850/60 flex justify-between items-center">
                          <span className="text-xs font-semibold text-gray-200">{feat}</span>
                          <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase">STANDARD ENABLED</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Interactive Simulator Section - Replacing static Video Player */}
                <section id="demo-preview" className="max-w-5xl mx-auto px-4 space-y-4">
                  <div className="text-center space-y-1">
                    <span className="text-xs text-brand-405 font-mono uppercase tracking-widest font-bold block">LIVE PLAYGROUND</span>
                    <h3 className="text-xl sm:text-3xl font-bold font-display text-white">Do not take our word for it—Try it!</h3>
                    <p className="text-gray-400 text-xs">Run key operations inside the real simulated client workspace dashboard below and inspect response speeds.</p>
                  </div>

                  {product.id === "leadflow-crm" && <LeadFlowDemo />}
                  {product.id === "mailboost-ai" && <MailBoostDemo />}
                  {product.id === "invoicepro" && <InvoiceProDemo />}
                  {product.id === "socialpilot-ai" && <SocialPilotDemo />}
                  {product.id === "tasksync" && <TaskSyncDemo />}
                  {product.id === "analyticshub" && <AnalyticsHubDemo />}
                </section>

                {/* Comparison Matrix Table */}
                <section className="max-w-4xl mx-auto px-4 space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white">How it stacks up against competitors</h3>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-950 text-gray-400 text-[10px] uppercase tracking-wider border-b border-slate-800">
                          <th className="p-3">SaaS Parameters</th>
                          <th className="p-3 text-brand-400">ManageGoal {product.name}</th>
                          <th className="p-3 text-gray-500">Traditional Legacy Providers</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-850">
                          <td className="p-3 font-semibold text-gray-200">License Terms</td>
                          <td className="p-3 text-emerald-400 font-medium">Hassle-free cancellation anytime</td>
                          <td className="p-3 text-gray-500">Tied into 12-month lockups</td>
                        </tr>
                        <tr className="border-b border-slate-850">
                          <td className="p-3 font-semibold text-gray-200">Operational Speeds</td>
                          <td className="p-3 text-emerald-400 font-medium">Lighthouse optimized load (under 1s)</td>
                          <td className="p-3 text-gray-500">Severe load lags and bulky SDK files</td>
                        </tr>
                        <tr className="border-b border-slate-850">
                          <td className="p-3 font-semibold text-gray-200">API Support Integration</td>
                          <td className="p-3 text-emerald-400 font-medium">Included standard in basic tiers</td>
                          <td className="p-3 text-gray-500">Requires customized enterprise add-on costs</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold text-gray-200">Customer Support Priority</td>
                          <td className="p-3 text-emerald-400 font-medium">24/7 client ticketers and immediate help</td>
                          <td className="p-3 text-gray-500">Delayed email responses</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Testimonials subset for product page */}
                <section className="max-w-4xl mx-auto px-4 space-y-6">
                  <div className="text-center">
                    <h3 className="text-lg sm:text-2xl font-bold text-white font-display">Client Reviews</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.testimonials.map((t, idx) => (
                      <div key={idx} className="bg-slate-900/80 p-5 rounded-xl border border-slate-850 space-y-3">
                        <div className="flex gap-1">
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <Star key={i} size={12} className="text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <p className="text-gray-300 text-xs italic">"{t.text}"</p>
                        <div className="text-xs text-gray-400 font-medium">
                          — <strong>{t.name}</strong>, {t.role} at {t.company}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Individual sales quick FAQ */}
                <section className="max-w-3xl mx-auto px-4 space-y-4">
                  <h3 className="text-center text-lg font-bold font-display text-white">Advanced Product FAQs</h3>
                  <div className="space-y-2">
                    {product.faq.map((fq, idx) => (
                      <div key={idx} className="bg-slate-900 p-4 rounded-xl border border-slate-850 space-y-1">
                        <h4 className="font-bold text-white text-xs sm:text-sm font-display flex items-center gap-1">
                          <HelpCircle size={14} className="text-brand-402 shrink-0" /> {fq.question}
                        </h4>
                        <p className="text-gray-400 text-xs pl-5">{fq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Bottom Sales CTA rows */}
                <section className="max-w-4xl mx-auto px-4">
                  <div className="bg-slate-900 border border-slate-850 p-8 rounded-3xl text-center space-y-4">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">Ready to harness the power of {product.name}?</h3>
                    <p className="text-gray-400 text-xs">Start a fully featured 14-day trial without committing credit credentials, or purchase full access now with a 14-day refund guarantee.</p>
                    <div className="flex justify-center gap-3 pt-2">
                      <button
                        onClick={() => {
                          setCheckoutProduct(product);
                          setCheckoutPlan(null);
                          setIsCheckoutOpen(true);
                        }}
                        className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 px-6 rounded-lg text-xs"
                      >
                        Buy {product.name} Now
                      </button>
                      <button
                        onClick={() => navigateTo("pricing")}
                        className="bg-slate-850 hover:bg-slate-800 text-white text-xs font-semibold py-2.5 px-6 rounded-lg"
                      >
                        Explore Suite Bundles
                      </button>
                    </div>
                  </div>
                </section>

                {/* Related Products strip */}
                <section className="max-w-5xl mx-auto px-4 space-y-4">
                  <span className="text-xs text-gray-500 uppercase tracking-widest block font-bold font-mono">RELATED SOFTWARE UTILITIES</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {PRODUCTS.filter(p => p.id !== product.id).slice(0, 3).map(rp => (
                      <div
                        key={rp.id}
                        onClick={() => {
                          setSelectedProductId(rp.id);
                          navigateTo("product-sales", `#product/${rp.id}`);
                        }}
                        className="bg-slate-900 hover:bg-slate-850 border border-slate-800 p-4 rounded-xl cursor-pointer transition flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-brand-400 shrink-0">{getProductIcon(rp.logoName)}</span>
                          <div>
                            <h4 className="font-bold text-white text-xs">{rp.name}</h4>
                            <span className="text-[9px] text-gray-400 uppercase tracking-wider font-mono">${rp.priceMonthly}/mo rate</span>
                          </div>
                        </div>
                        <ChevronRight size={14} className="text-gray-500" />
                      </div>
                    ))}
                  </div>
                </section>

                {/* Sticky Buy Button segment - floating on scrolling past threshold mock handles */}
                <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40">
                  <div className="bg-slate-900/90 backdrop-blur border border-slate-800 py-2.5 px-4 rounded-full shadow-2xl flex items-center gap-3">
                    <span className="text-[10px] sm:text-xs text-gray-200 font-semibold uppercase">{product.name} active</span>
                    <button
                      onClick={() => {
                        setCheckoutProduct(product);
                        setCheckoutPlan(null);
                        setIsCheckoutOpen(true);
                      }}
                      className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-[10px] sm:text-xs py-1.5 px-3 rounded-full transition"
                    >
                      Instant Purchase
                    </button>
                  </div>
                </div>

              </div>
            );
          })()
        )}

        {/* ========================================================
            VIEW: SUITE BUNDLE PRICING
            ======================================================== */}
        {currentView === "pricing" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs text-brand-450 uppercase tracking-widest font-bold block">FLEXIBLE COMMERCIAL MODULES</span>
              <h1 className="text-3xl sm:text-5xl font-bold font-display text-white">Pricing Designed for Growth</h1>
              <p className="text-gray-400 text-xs sm:text-sm">Whether you are a solo startup builder or a distributed corporate agency, explore plan structures backed by full 14-day return guarantees.</p>

              {/* Monthly / Yearly cycle switcher toggle buttons */}
              <div className="inline-flex bg-slate-900 border border-slate-800 p-1 rounded-xl items-center gap-1 pt-3">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-4 py-1.5 text-xs font-semibold uppercase rounded-lg transition ${
                    billingCycle === "monthly" ? "bg-brand-600 text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  Monthly Rates
                </button>
                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`px-4 py-1.5 text-xs font-semibold uppercase rounded-lg transition flex items-center gap-1.5 ${
                    billingCycle === "yearly" ? "bg-brand-600 text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  Yearly Rates <span className="bg-emerald-450 text-[10px] px-1 rounded text-white">-20% OFF</span>
                </button>
              </div>
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {PRICING_PLANS.map(plan => {
                const isYr = billingCycle === "yearly";
                const activePrice = isYr ? plan.priceYearly : plan.priceMonthly;

                return (
                  <div
                    key={plan.id}
                    className={`glass-panel rounded-3xl p-6 flex flex-col justify-between border relative overflow-hidden transition hover:-translate-y-1 ${
                      plan.isPopular ? "border-brand-600 shadow-2xl shadow-brand-500/5 bg-slate-900/60" : "border-white/5"
                    }`}
                  >
                    {plan.isPopular && (
                      <span className="absolute top-3 right-3 bg-brand-500 text-white font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">
                        Popular Choice
                      </span>
                    )}

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold font-display text-white">{plan.name}</h3>
                        <p className="text-gray-400 text-xs mt-1 min-h-8">{plan.description}</p>
                      </div>

                      <div className="pt-2 border-t border-slate-850 flex items-baseline gap-1">
                        <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">${activePrice}</span>
                        <span className="text-gray-400 text-xs">/ month {isYr && <strong className="text-[10px] text-emerald-400">(billed yearly)</strong>}</span>
                      </div>

                      <ul className="space-y-2 pt-4 border-t border-slate-850 text-xs text-gray-300">
                        {plan.features.map((feat, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6">
                      <button
                        onClick={() => {
                          setCheckoutProduct(null);
                          setCheckoutPlan(plan);
                          setIsCheckoutOpen(true);
                        }}
                        className={`w-full font-bold py-2.5 rounded-xl text-xs transition duration-200 ${
                          plan.isPopular ? "bg-brand-600 hover:bg-brand-700 text-white" : "bg-slate-900 hover:bg-slate-850 text-white border border-slate-800"
                        }`}
                      >
                        {plan.ctaText}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Money back and secure indicators banner */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center text-xs text-gray-400 flex flex-col sm:flex-row items-center justify-center gap-3">
              <span className="bg-emerald-900/30 text-emerald-400 border border-emerald-800/20 py-1 px-2 rounded font-mono font-bold">14-DAY MONEY-BACK</span>
              <span>Fully satisfied or prompt 100% money returns. No question loops, cancel configurations instantly in-app.</span>
            </div>

            {/* Matrix comparison plan details */}
            <section className="bg-slate-900/20 p-6 rounded-2xl border border-slate-850 space-y-6">
              <div className="text-center font-display">
                <h3 className="text-lg sm:text-2xl font-bold text-white">Full Suite Feature Comparison</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-gray-400">
                      <th className="p-2">Suite Features</th>
                      <th className="p-2">Starter Bundle</th>
                      <th className="p-2">Growth Suite Plus</th>
                      <th className="p-2">Enterprise Central</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-850">
                      <td className="p-2 font-medium text-white">App Access Limits</td>
                      <td className="p-2 text-gray-300">Any 2 individual SaaS</td>
                      <td className="p-2 text-brand-405 font-semibold">Full 6 SaaS apps included</td>
                      <td className="p-2 text-gray-300">Full 6 SaaS apps included</td>
                    </tr>
                    <tr className="border-b border-slate-850">
                      <td className="p-2 font-medium text-white">Secure Cloud Storage</td>
                      <td className="p-2 text-gray-500">5 GB basic files</td>
                      <td className="p-2 text-brand-405 font-semibold">50 GB high speed folders</td>
                      <td className="p-2 text-gray-300">Unlimited isolated databases</td>
                    </tr>
                    <tr className="border-b border-slate-850">
                      <td className="p-2 font-medium text-white">AI Language Generator</td>
                      <td className="p-2 text-gray-500">No</td>
                      <td className="p-2 text-brand-405 font-semibold">Yes, fully featured</td>
                      <td className="p-2 text-gray-300">Yes, customized fine-tuned sets</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium text-white">SAML SSO Support</td>
                      <td className="p-2 text-gray-500">No</td>
                      <td className="p-2 text-gray-500">No</td>
                      <td className="p-2 text-brand-405 font-semibold">Yes, standard enabled</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================
            VIEW: ABOUT COMPANY
            ======================================================== */}
        {currentView === "about" && (
          <div className="max-w-4xl mx-auto px-4 py-10 space-y-12">
            <div className="text-center space-y-2">
              <span className="text-xs text-brand-405 uppercase tracking-widest block font-bold font-mono">OUR STORY</span>
              <h1 className="text-3xl sm:text-5xl font-bold font-display text-white">Empowering Global Innovation</h1>
              <p className="text-gray-400 text-sm">Formulating frictionless software workflows to build commercial growth.</p>
            </div>

            <section className="space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed font-sans text-pretty">
              <p>
                Founded in 2026, <strong>ManageGoal Apps</strong> is dedicated to crafting premium, developer-first software solutions that automate tedious, manual workflow operations.
              </p>
              <p>
                Our vision centers on consolidating commercial tool chains. Too often, teams waste high capacity margins copying lead fields across spreadsheets, struggling with slow accounting structures, or managing unaligned social tools. We build optimized, secure, standalone modules that communicate securely and let developers and business planners scale operations fast.
              </p>
            </section>

            {/* Milestones Horizontal Layout Timeline */}
            <section className="space-y-4">
              <h3 className="font-display font-bold text-center text-white text-lg sm:text-xl">Our Strategic Landmarks</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-850 space-y-1 text-center">
                  <span className="text-brand-405 font-mono text-xs font-bold block uppercase">JANUARY 2026</span>
                  <h4 className="text-white font-bold text-xs ">Suite Booting Initial Launch</h4>
                  <p className="text-gray-400 text-[11px] leading-snug">Bundled initial CRM & Email automatons executing trials.</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-850 space-y-1 text-center">
                  <span className="text-brand-405 font-mono text-xs font-bold block uppercase">MARCH 2026</span>
                  <h4 className="text-white font-bold text-xs ">Full 6-SaaS Catalog Setup</h4>
                  <p className="text-gray-400 text-[11px] leading-snug">Deployed invoicing grids and analytics synchronizers globally.</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-850 space-y-1 text-center">
                  <span className="text-brand-444 font-mono text-xs font-bold block uppercase">CURRENT LEVEL</span>
                  <h4 className="text-white font-bold text-xs ">40,000+ Operations Executed</h4>
                  <p className="text-gray-400 text-[11px] leading-snug">Scaling performance with full GDPR-standard compliance policies.</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================
            VIEW: CONTACT HELP DESK
            ======================================================== */}
        {currentView === "contact" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Information & Interactive Map */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs text-brand-405 uppercase tracking-widest font-bold block font-mono">SUPPORT CORE</span>
                <h1 className="text-3xl sm:text-4xl font-bold font-display text-white">Secure Help Desk</h1>
                <p className="text-gray-400 text-xs">Our engineering division responses typically within 1 hour. Get in touch with Sales or Technical Operations.</p>
              </div>

              {/* Physical details block */}
              <div className="space-y-2 text-xs text-gray-300 bg-slate-900 p-4 rounded-xl border border-slate-800">
                <p className="flex items-center gap-2"><MapPin size={14} className="text-brand-400 shrink-0" /> <strong>Core HQ:</strong> 548 Market St, Suite 904, San Francisco, CA 94104</p>
                <p className="flex items-center gap-2"><Phone size={14} className="text-brand-400 shrink-0" /> <strong>Support Line:</strong> +1 (415) 555-0142</p>
                <p className="flex items-center gap-2"><Mail size={14} className="text-brand-400 shrink-0" /> <strong>Team Email:</strong> support@cloudlaunch.example.com</p>
              </div>

              {/* Office Topology Map Selector widget */}
              <MapVisualizer />
            </div>

            {/* Lead Form Submit */}
            <div className="bg-slate-905 p-6 rounded-2xl border border-slate-800/80 space-y-4">
              <h3 className="font-display font-bold text-white text-xl">Submit Service Ticket</h3>
              
              {supportTicket.status === "success" ? (
                <div className="bg-emerald-950/40 text-emerald-400 border border-emerald-800/30 p-5 rounded-2xl space-y-2">
                  <CheckCircle2 size={32} className="text-emerald-400" />
                  <h4 className="font-bold text-sm">Ticket Authored Successfully!</h4>
                  <p className="text-xs">Your system reference is: <strong className="font-mono text-white">{supportTicket.ticketId}</strong>. Check your priority inbox soon.</p>
                  <button
                    onClick={() => setSupportTicket({ name: "", email: "", subject: "Sales Inquiry", message: "", status: "idle" })}
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg border border-slate-800 mt-2"
                  >
                    Create New Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSupportSubmit} className="space-y-4 text-xs text-slate-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-gray-400 block mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={supportTicket.name}
                        onChange={(e) => setSupportTicket({ ...supportTicket, name: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-lg text-white"
                        placeholder="Dave Mitchell"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 block mb-1">Your Email</label>
                      <input
                        type="email"
                        required
                        value={supportTicket.email}
                        onChange={(e) => setSupportTicket({ ...supportTicket, email: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-lg text-white"
                        placeholder="dave@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 block mb-1">Subject Matter</label>
                    <select
                      value={supportTicket.subject}
                      onChange={(e) => setSupportTicket({ ...supportTicket, subject: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-lg text-white focus:outline-none"
                    >
                      <option>Sales Inquiry</option>
                      <option>Technical integration help</option>
                      <option>Billing / Refund request</option>
                      <option>Custom Enterprise Package Setup</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-400 block mb-1">Detailed Message</label>
                    <textarea
                      required
                      value={supportTicket.message}
                      onChange={(e) => setSupportTicket({ ...supportTicket, message: e.target.value })}
                      rows={5}
                      className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-lg text-white"
                      placeholder="Specify your system constraints or parameters..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={supportTicket.status === "submitting"}
                    className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-lg shadow-brand-600/10"
                  >
                    {supportTicket.status === "submitting" ? (
                      <>
                        <RefreshCw size={14} className="animate-spin" /> Publishing Ticket...
                      </>
                    ) : (
                      <>
                        <Send size={14} /> Send ticket securely
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            VIEW: FAQ HUB (COMPLETE 20 QUANTITY)
            ======================================================== */}
        {currentView === "faq" && (
          <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
            <div className="text-center space-y-2 text-pretty">
              <span className="text-xs text-brand-405 uppercase tracking-widest font-bold block font-mono">SUPPORT DIRECTORIES</span>
              <h1 className="text-3xl sm:text-5xl font-bold font-display text-white">FAQ Center</h1>
              <p className="text-gray-400 text-sm">Comprehensive answers resolving critical billing queries, licenses, and system security policies.</p>
            </div>

            {/* Categorical filter and search row */}
            <div className="space-y-4 text-xs">
              <div className="flex flex-col sm:flex-row justify-between gap-3 bg-slate-900 p-3 rounded-xl border border-slate-850">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    value={faqSearch}
                    onChange={(e) => setFaqSearch(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 pl-8 pr-3 py-1.5 rounded-lg text-white text-xs"
                    placeholder="Search over 20 structured FAQs..."
                  />
                  <Search size={12} className="absolute left-2.5 top-2.5 text-gray-500" />
                </div>
                <div className="flex flex-wrap gap-1">
                  {(["all", "billing", "cancellation", "security", "product"] as const).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setFaqCategory(cat)}
                      className={`capitalize px-2.5 py-1.5 rounded border ${
                        faqCategory === cat ? "bg-brand-600 border-brand-500 text-white" : "bg-slate-950 border-slate-850 text-gray-450 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Structured FAQs */}
            <div className="space-y-4">
              {filteredFAQs.map((faq, idx) => (
                <div key={idx} className="glass-panel p-5 rounded-xl border border-white/5 space-y-1.5 hover:border-slate-800 transition">
                  <h4 className="font-bold text-white text-sm font-display flex items-center gap-1.5">
                    <span className="h-4 w-4 rounded-full bg-brand-500/10 text-brand-400 flex items-center justify-center text-[10px] shrink-0 font-bold border border-brand-500/20">?</span>
                    {faq.question}
                  </h4>
                  <p className="text-gray-400 text-xs pl-5 leading-relaxed">{faq.answer}</p>
                </div>
              ))}

              {filteredFAQs.length === 0 && (
                <div className="text-center py-10 bg-slate-900 rounded-xl border border-slate-850 text-xs">
                  <AlertTriangle size={24} className="mx-auto text-yellow-500 mb-2" />
                  <p className="text-gray-300">No matching help directories resolved.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            VIEW: BLOG HUB
            ======================================================== */}
        {currentView === "blog" && (
          <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
            <div className="text-center space-y-2">
              <span className="text-xs text-brand-405 uppercase tracking-widest block font-bold font-mono">GROWTH ARCHIVES</span>
              <h1 className="text-3xl sm:text-5xl font-bold font-display text-white">SaaS Knowledge Base</h1>
              <p className="text-gray-400 text-sm">Strategic workflows written by SaaS technicians to expand company capability metrics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BLOGS.map(blog => (
                <div
                  key={blog.slug}
                  onClick={() => {
                    setSelectedBlogPostSlug(blog.slug);
                    navigateTo("blog-post", `#blog/${blog.slug}`);
                  }}
                  className="glass-panel rounded-2xl border border-white/5 p-5 hover:border-brand-650 transition cursor-pointer flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono font-bold uppercase">
                      <span>{blog.category}</span>
                      <span className="flex items-center gap-1"><Clock size={10} /> {blog.readTime}</span>
                    </div>

                    <h3 className="text-white font-bold font-display text-base group-hover:text-brand-400 transition leading-snug line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-850 flex items-center justify-between text-xs text-gray-300">
                    <span className="font-semibold text-brand-400 flex items-center gap-1 group-hover:underline">
                      Keep Reading <ArrowRight size={12} />
                    </span>
                    <span className="text-gray-500 font-mono text-[10px]">{blog.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            VIEW: BLOG POST INDIVIDUAL READER
            ======================================================== */}
        {currentView === "blog-post" && (
          (() => {
            const blog = BLOGS.find(b => b.slug === selectedBlogPostSlug) || BLOGS[0];
            return (
              <article className="max-w-3xl mx-auto px-4 py-10 space-y-8 text-pretty">
                
                {/* Router Breadcrumbs */}
                <span className="text-xs text-brand-312 uppercase font-mono font-bold tracking-widest block">
                  <button onClick={() => navigateTo("blog")} className="hover:underline">Growth Blog Archives</button> / Reader Mode
                </span>

                <div className="space-y-3">
                  <span className="bg-brand-500/10 text-brand-400 border border-brand-500/20 py-1 px-3 rounded text-[10px] uppercase font-mono font-bold">{blog.category}</span>
                  <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display leading-tight">{blog.title}</h1>
                  
                  <div className="flex items-center gap-3 text-xs text-gray-500 pt-3 border-y border-slate-850 py-3 font-medium">
                    <div className="h-7 w-7 rounded-full bg-slate-800 text-[10px] font-bold text-white flex items-center justify-center border border-slate-700">
                      {blog.author.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-white leading-none">{blog.author.name}</p>
                      <span className="text-[10px] text-gray-500 block">{blog.author.role}</span>
                    </div>
                    <span className="ml-auto flex items-center gap-1"><Clock size={12} /> {blog.readTime}</span>
                  </div>
                </div>

                {/* Long Form Article Text markup templates */}
                <div className="text-gray-300 text-sm leading-relaxed space-y-4 font-sans max-w-none pt-4 whitespace-pre-line">
                  {blog.content}
                </div>

                {/* Return CTA button at bottom */}
                <div className="p-6 bg-slate-900 rounded-2xl border border-slate-850 text-center space-y-3 mt-10">
                  <h4 className="font-bold text-white">Found this strategy helpful?</h4>
                  <p className="text-xs text-gray-400">Discover all of our performance software designed to accelerate your workflow.</p>
                  <button onClick={() => navigateTo("products")} className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-1.5 px-6 rounded-lg text-xs">
                    Explore SaaS Catalog
                  </button>
                </div>
              </article>
            );
          })()
        )}

        {/* ========================================================
            VIEW: THANK YOU PAGE (PURCHASE SUCCESS CONFIRMATION)
            ======================================================== */}
        {currentView === "thank-you" && (
          <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-8">
            <div className="h-16 w-16 bg-gradient-to-tr from-emerald-500 to-teal-400 text-white rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20 animate-bounce">
              <CheckCircle2 size={36} />
            </div>

            <div className="space-y-3">
              <span className="text-xs text-brand-402 uppercase tracking-widest font-bold block font-mono">SECURE DISPATCH CONFIRMED</span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">Thank you for your purchase!</h1>
              <p className="text-gray-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                Your high-performance workspace node has been initialized and registered. Track setup guidelines and download credentials below.
              </p>
            </div>

            {/* Sandbox Inspectability & Testing Panel */}
            <div className="bg-brand-900/10 border border-brand-500/20 rounded-2xl p-4 text-xs text-left max-w-lg mx-auto space-y-3">
              <div className="flex items-center gap-2 text-brand-300 font-bold font-display">
                <Sparkles size={14} />
                <span>Direct Product Tester Panel</span>
              </div>
              <p className="text-gray-400 leading-normal">
                Normally, users land here automatically after selecting any product and completing a mock checkout. Use this panel to instantly configure the Thank You screen for any product in our directory:
              </p>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-[10px] text-gray-500 font-mono uppercase">SWITCH PREVIEW:</span>
                <select
                  className="bg-slate-900/90 border border-slate-800 text-white text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-brand-500 cursor-pointer"
                  value={lastOrder?.cart.product.id || ""}
                  onChange={(e) => {
                    const selId = e.target.value;
                    const prod = PRODUCTS.find(p => p.id === selId);
                    if (prod) {
                      setLastOrder({
                        cart: {
                          product: prod,
                          billingCycle: "yearly",
                          price: Math.floor(prod.priceMonthly * 12 * 0.8) // Yearly price with standard discount
                        },
                        orderId: "ORD-" + Math.floor(Math.random() * 900000 + 100000),
                        discountApplied: true
                      });
                    }
                  }}
                >
                  <option value="" disabled>-- Inspect product thank-you state --</option>
                  {PRODUCTS.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dynamic visual receipt and download simulation block */}
            <div className="bg-slate-900/80 border border-slate-850 p-6 rounded-2xl text-left text-xs space-y-4 shadow-xl">
              <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono tracking-wider border-b border-slate-850 pb-2">
                <span>ORDER GENERATED: {lastOrder?.orderId || "ORD-941208"}</span>
                <span className="text-emerald-400 font-bold">STATUS: AUTHORIZED</span>
              </div>

              <div className="space-y-1">
                <h4 className="text-white font-bold font-display text-sm flex items-center gap-2">
                  <span className="text-brand-400">{getProductIcon(lastOrder?.cart.product.logoName || "Layers")}</span>
                  {lastOrder?.cart.product.name || "Growth Suite Plus Bundle"}
                </h4>
                <p className="text-gray-400">Subscription Term: <strong className="capitalize text-white">{lastOrder?.cart.billingCycle || "yearly"} layout renewal</strong></p>
                <p className="text-gray-400 font-mono">Charge Captured: <strong className="text-emerald-400">${lastOrder?.cart.price || 69}.00 USD</strong></p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                <span className="text-[10px] text-brand-300 uppercase tracking-widest font-mono font-bold block">🚨 Instant Integration Terminal Guide:</span>
                <p className="text-gray-450 leading-snug text-[11px]">To spin up and mount this specific module node inside your cloud application, run the installation block:</p>
                <code className="bg-slate-900 block p-2 rounded text-[10px] font-mono text-white select-all border border-slate-800">
                  npx @managegoal/sdk init --key=mg_key_{lastOrder?.cart.product.id || "suite"}_authorized
                </code>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 text-[11px] font-semibold text-gray-200">
                <button
                  onClick={handleDownloadReceipt}
                  className="flex-grow bg-slate-950 hover:bg-slate-900 border border-slate-800 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1 text-xs cursor-pointer transition duration-200"
                >
                  <Download size={12} /> Download Payment Receipt
                </button>
                <button
                  onClick={() => navigateTo("contact")}
                  className="flex-grow bg-slate-955 border border-slate-850 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1 text-xs text-brand-400 cursor-pointer transition duration-200 hover:text-brand-300"
                >
                  Request Technical SLA Support
                </button>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigateTo("home")}
                className="bg-brand-500 hover:bg-brand-600 text-white font-bold py-2.5 px-8 rounded-xl text-xs flex items-center justify-center gap-1.5 transition duration-200 cursor-pointer shadow-lg shadow-brand-500/10"
              >
                Back to Cockpit Page <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}



        {/* ========================================================
            VIEW: LEGAL PAGES & POLICIES (TEMPLATES PREVIEW)
            ======================================================== */}
        {["privacy", "terms", "refund", "cookie", "disclaimer"].includes(currentView) && (
          <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
            
            {/* Visual warning that these are templates */}
            <div className="bg-brand-950/40 border border-brand-800/40 rounded-2xl p-4 text-xs text-brand-200 flex items-start gap-3">
              <ShieldAlert className="text-brand-400 shrink-0 mt-0.5" size={18} />
              <div>
                <span className="font-bold block text-white uppercase">SaaS Policy Guide template</span>
                <p>This is a structured template. Before commercial deployment, customize sections with specific business coordinates, localized tax registries, and GDPR directives.</p>
              </div>
            </div>

            <div className="bg-slate-905 border border-slate-800 rounded-3xl p-6 sm:p-10 text-xs sm:text-sm text-gray-300 space-y-4 leading-relaxed font-sans prose prose-invert max-w-none text-pretty">
              {currentView === "privacy" && <TextReader markdownText={PRIVACY_POLICY_TEMPLATE} />}
              {currentView === "terms" && <TextReader markdownText={TERMS_CONDITIONS_TEMPLATE} />}
              {currentView === "refund" && <TextReader markdownText={REFUND_POLICY_TEMPLATE} />}
              {currentView === "cookie" && <TextReader markdownText={COOKIE_POLICY_TEMPLATE} />}
              {currentView === "disclaimer" && <TextReader markdownText={DISCLAIMER_TEMPLATE} />}
            </div>

            <div className="text-center pt-4">
              <button onClick={() => navigateTo("home")} className="bg-slate-900 border border-slate-800 text-white px-6 py-2 rounded-xl text-xs font-bold font-display cursor-pointer hover:bg-slate-850">
                Back to Home Cockpit
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            VIEW: SITEMAP XML VIEWER
            ======================================================== */}
        {currentView === "sitemap-view" && (
          <div className="max-w-4xl mx-auto px-4 py-10 space-y-6 text-xs text-pretty font-mono">
            <h1 className="text-white text-lg font-bold font-display uppercase tracking-widest">Sitemap directory lists</h1>
            <p className="text-gray-400">Physical configuration saved in <code className="text-brand-400">/public/sitemap.xml</code> for search crawler indexings.</p>
            
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2 whitespace-normal leading-loose">
              <p>📍 HOME COCKPIT: <a href="#home" className="text-brand-400 hover:underline">/home</a></p>
              <p>📦 PRODUCT CATALOGUE: <a href="#products" className="text-brand-400 hover:underline">/products</a></p>
              <p>⭐ ACTIVE SPECIALIST SHOWCASES:</p>
              <div className="pl-6 space-y-1">
                {PRODUCTS.map(p => (
                  <p key={p.id}>• <a href={`#product/${p.id}`} className="text-brand-400 hover:underline">/product/{p.id}</a></p>
                ))}
              </div>
              <p>💰 PRICING PLANS BUNDLE: <a href="#pricing" className="text-brand-400 hover:underline">/pricing</a></p>
              <p>📖 SAAS GROWTH BLOG: <a href="#blog" className="text-brand-400 hover:underline">/blog</a></p>
              <p>🛡️ COMPLIANCE SCHEMAS:</p>
              <div className="pl-6 space-y-1">
                <p>• <a href="#privacy-policy" className="text-brand-400 hover:underline">/privacy-policy</a></p>
                <p>• <a href="#terms-conditions" className="text-brand-400 hover:underline">/terms-conditions</a></p>
                <p>• <a href="#refund-policy" className="text-brand-400 hover:underline">/refund-policy</a></p>
                <p>• <a href="#cookie-policy" className="text-brand-400 hover:underline">/cookie-policy</a></p>
                <p>• <a href="#disclaimer" className="text-brand-400 hover:underline">/disclaimer</a></p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            VIEW: ROBOTS TXT VIEWER
            ======================================================== */}
        {currentView === "robots-txt-view" && (
          <div className="max-w-2xl mx-auto px-4 py-10 space-y-4 text-xs font-mono">
            <h1 className="text-white text-lg font-bold font-display uppercase tracking-widest">Robots.txt Schema View</h1>
            <p className="text-gray-400">Physical configuration deployed in <code className="text-brand-400">/public/robots.txt</code>.</p>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl whitespace-pre">
              {`User-agent: *
Allow: /

Sitemap: https://cloudlaunch.example.com/sitemap.xml`}
            </div>
          </div>
        )}

        {/* ========================================================
            VIEW: 404 (DYNAMIC NOT FOUND ROUTER FALLBACK)
            ======================================================== */}
        {currentView === "404" && (
          <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
            <div className="text-brand-500 font-extrabold text-7xl font-mono animate-pulse">404</div>
            <h1 className="text-2xl sm:text-4xl font-bold font-display text-white">Lost in Cosmic Space</h1>
            <p className="text-gray-400 text-xs">The SaaS operational coordinates you are trying to access have drifted out of bounds.</p>
            <button
              onClick={() => navigateTo("home")}
              className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-2 px-6 rounded-xl text-xs mx-auto"
            >
              Return safely to Home Cockpit
            </button>
          </div>
        )}

      </main>

      {/* --- Universal Footer Section --- */}
      <footer className="bg-slate-950 border-t border-white/5 py-12 px-4 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Column 1: Brand details */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-brand-600 flex items-center justify-center text-white">
                <Sparkles size={14} />
              </div>
              <span className="font-display font-black text-white text-sm">ManageGoal Apps</span>
            </div>
            <p className="max-w-xs text-gray-400 text-pretty leading-relaxed">
              Powerful SaaS Solutions designed to organize CRM deals, AI campaigns, and ledger invoices securely.
            </p>
            <p className="text-[10px] text-gray-500 font-mono">
              © 2026 ManageGoal Apps. All Rights Reserved. Fully Encrypted System.
            </p>
          </div>

          {/* Column 2: SaaS Catalog */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[10px] tracking-wider">SaaS Products</h4>
            <div className="flex flex-col gap-2">
              {PRODUCTS.map(p => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedProductId(p.id);
                    navigateTo("product-sales", `#product/${p.id}`);
                  }}
                  className="text-left hover:text-white transition cursor-pointer"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[10px] tracking-wider">Navigation</h4>
            <div className="flex flex-col gap-2">
              <button onClick={() => navigateTo("pricing")} className="text-left hover:text-white transition">Pricing Plans</button>
              <button onClick={() => navigateTo("blog")} className="text-left hover:text-white transition">Growth Blog</button>
              <button onClick={() => navigateTo("faq")} className="text-left hover:text-white transition">FAQ Hub (20+ Items)</button>
              <button onClick={() => navigateTo("about")} className="text-left hover:text-white transition">Our Story</button>
              <button onClick={() => navigateTo("contact")} className="text-left hover:text-white transition">Contact Desk</button>
            </div>
          </div>

          {/* Column 4: Legals templates */}
          <div className="space-y-3 col-span-1">
            <h4 className="font-bold text-white uppercase text-[10px] tracking-wider">Legal Templates</h4>
            <div className="flex flex-col gap-2">
              <button onClick={() => navigateTo("privacy")} className="text-left hover:text-white transition">Privacy Policy</button>
              <button onClick={() => navigateTo("terms")} className="text-left hover:text-white transition">Terms & Conditions</button>
              <button onClick={() => navigateTo("refund")} className="text-left hover:text-white transition">Refund Terms</button>
              <button onClick={() => navigateTo("cookie")} className="text-left hover:text-white transition">Cookie Policy</button>
              <button onClick={() => navigateTo("disclaimer")} className="text-left hover:text-white transition">Disclaimer Policy</button>
              <div className="pt-2 border-t border-slate-900 flex justify-between gap-2">
                <button onClick={() => navigateTo("sitemap-view")} className="text-left hover:text-white transition font-mono text-[9px]">SITEMAP XML</button>
                <button onClick={() => navigateTo("robots-txt-view")} className="text-left hover:text-white transition font-mono text-[9px]">ROBOTS.TXT</button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* --- Floating Interactive Live Support Assistant Chat --- */}
      <LiveChat />

      {/* --- Floating MetaMask Error/Notification Banner --- */}
      {showWalletErrorBanner && walletError && (
        <div className="fixed bottom-24 right-5 z-50 max-w-sm bg-slate-900 border-l-4 border-red-500 p-4 rounded-xl shadow-2xl shadow-red-950/25 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-start gap-3">
            <div className="p-1 text-red-400 bg-red-500/10 rounded-lg shrink-0">
              <AlertTriangle size={18} />
            </div>
            <div className="flex-grow space-y-1">
              <div className="flex items-center gap-1.5 justify-between">
                <h5 className="font-bold text-xs text-white uppercase tracking-wider font-display">
                  Wallet Connection Notice
                </h5>
                <button 
                  onClick={() => setShowWalletErrorBanner(false)}
                  className="text-gray-500 hover:text-white transition"
                >
                  <X size={14} />
                </button>
              </div>
              <p className="text-gray-300 text-xs leading-normal">
                {walletError}
              </p>
              <div className="pt-2 flex gap-2">
                <button 
                  onClick={connectWallet}
                  className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-[10px] px-2.5 py-1 rounded transition"
                >
                  Retry Connection
                </button>
                <button 
                  onClick={() => {
                    // Inject a mock active address to bypass connection error states
                    setWalletAddress("0x71C7656EC7ab88b098defB751B7401B5f6d8976F");
                    setWalletError(null);
                    setShowWalletErrorBanner(false);
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white font-bold font-mono text-[9px] px-2.5 py-1 rounded border border-slate-700 transition"
                  title="Simulate Web3 Injector for local preview"
                >
                  Simulate Connection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Slide-Over Secure Billing Checkout Overlay Modal --- */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={checkoutProduct}
        pricingPlan={checkoutPlan}
        billingCycle={billingCycle}
        onPurchaseComplete={completeCheckoutPurchase}
        walletAddress={walletAddress}
        isConnectingWallet={isConnectingWallet}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
      />

    </div>
  );
}

// --- Dynamic Text renderer helper supporting Markdown highlights and headers ---
interface TextReaderProps {
  markdownText: string;
}

function TextReader({ markdownText }: TextReaderProps) {
  const lines = markdownText.split("\n");

  return (
    <div className="space-y-3 font-sans leading-relaxed text-gray-300">
      {lines.map((line, index) => {
        const trimmed = line.trim();

        if (trimmed.startsWith("# ")) {
          return (
            <h1 key={index} className="text-xl sm:text-2xl font-bold font-display text-white pt-4 border-b border-slate-800 pb-2">
              {trimmed.substring(2)}
            </h1>
          );
        }

        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={index} className="text-base sm:text-lg font-bold font-display text-white pt-3">
              {trimmed.substring(3)}
            </h2>
          );
        }

        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={index} className="text-sm font-semibold text-white pt-2 uppercase tracking-wide">
              {trimmed.substring(4)}
            </h3>
          );
        }

        if (trimmed.startsWith("- ")) {
          return (
            <div key={index} className="flex items-start gap-1.5 pl-4 text-xs text-gray-300">
              <span className="h-1 w-1 bg-brand-400 rounded-full mt-2 shrink-0"></span>
              <span>{trimmed.substring(2)}</span>
            </div>
          );
        }

        if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
          return (
            <p key={index} className="text-xs text-brand-402 font-semibold">
              {trimmed.replace(/\*\*/g, "")}
            </p>
          );
        }

        if (!trimmed) {
          return <div key={index} className="h-2"></div>;
        }

        // Standard line processing including basic strong tags parsing
        return (
          <p key={index} className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
            {trimmed.split("**").map((tok, idx) => {
              if (idx % 2 === 1) {
                return <strong key={idx} className="text-white font-semibold">{tok}</strong>;
              }
              return tok;
            })}
          </p>
        );
      })}
    </div>
  );
}
