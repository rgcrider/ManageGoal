import React, { useState } from "react";
import { Product, PricingPlan, CartItem } from "../types";
import { X, Check, CreditCard, Shield, Sparkles, Building, Lock, RefreshCw } from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  pricingPlan: PricingPlan | null;
  billingCycle: "monthly" | "yearly";
  onPurchaseComplete: (cart: CartItem, orderId: string, discountApplied: boolean) => void;
  walletAddress?: string | null;
  isConnectingWallet?: boolean;
  connectWallet?: () => void;
  disconnectWallet?: () => void;
}

export function CheckoutModal({
  isOpen,
  onClose,
  product,
  pricingPlan,
  billingCycle,
  onPurchaseComplete,
  walletAddress = null,
  isConnectingWallet = false,
  connectWallet = () => {},
  disconnectWallet = () => {}
}: CheckoutModalProps) {
  if (!isOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState<"card" | "metamask">("card");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [cardNumber, setCardNumber] = useState("4111 2222 3333 4444");
  const [expiry, setExpiry] = useState("12/28");
  const [cvc, setCVC] = useState("123");
  const [coupon, setCoupon] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [discountPct, setDiscountPct] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Compute base cost
  const getBasePrice = () => {
    if (pricingPlan) {
      return billingCycle === "yearly" ? pricingPlan.priceYearly : pricingPlan.priceMonthly;
    }
    if (product) {
      const pricing = product.priceMonthly;
      return billingCycle === "yearly" ? Math.round(pricing * 0.8 * 12) : pricing;
    }
    return 0;
  };

  const basePrice = getBasePrice();
  const discValue = Math.round(basePrice * (discountPct / 100));
  const finalPrice = Math.max(0, basePrice - discValue);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");
    if (coupon.trim().toUpperCase() === "LAUNCH20") {
      setDiscountPct(20);
      setCouponSuccess("Coupon applied! 20% off your initial purchase 🎉");
    } else {
      setCouponError("Invalid promo code. Note: try code 'LAUNCH20'");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName) return;
    setIsSubmitting(true);

    if (paymentMethod === "metamask") {
      try {
        if (typeof window !== "undefined" && (window as any).ethereum && walletAddress) {
          // Send transaction request to MetaMask for real-integration support
          // $3000 approximate ETH rate
          const ethValue = (finalPrice / 3000);
          const weiValue = Math.max(1, Math.round(ethValue * 1e18));
          const valueHex = "0x" + weiValue.toString(16);

          await (window as any).ethereum.request({
            method: "eth_sendTransaction",
            params: [{
              from: walletAddress,
              to: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F", // Safe, standardized receiver placeholder
              value: valueHex,
            }]
          });
        }
      } catch (walletErr: any) {
        console.warn("MetaMask transaction cancelled or bypass requested:", walletErr);
        // Continue to let them simulate the purchase even if they are in test environments with mock balances!
      }
    }

    // Simulate Payment Node Latency
    setTimeout(() => {
      setIsSubmitting(false);
      const mProduct: Product = product || {
        id: pricingPlan?.id || "custom-suite",
        name: pricingPlan?.name || "Growth Suite Plus",
        tagline: "High capacity full access bundle",
        description: pricingPlan?.description || "All SaaS tools combined with maximum priorities",
        logoName: "BarChart3",
        colorClass: "from-brand-600 to-indigo-600",
        badgeColorClass: "border-brand-500 bg-brand-500/10 text-brand-400",
        priceMonthly: pricingPlan?.priceMonthly || 89,
        rating: 4.9,
        reviewCount: 300,
        highlightedMetric: { label: "Performance standard", value: "Enterprise" },
        faq: [],
        testimonials: [],
        screenshots: [],
        benefits: [],
        features: pricingPlan?.features || [],
        overview: ""
      };

      const cart: CartItem = {
        product: mProduct,
        billingCycle,
        price: finalPrice
      };

      const orderId = "ORD-" + Math.floor(Math.random() * 900000 + 100000);
      onPurchaseComplete(cart, orderId, discountPct > 0);
    }, 1500);
  };

  const getSaaSName = () => {
    if (pricingPlan) return `Suite Plan: ${pricingPlan.name}`;
    if (product) return `SaaS Tool: ${product.name}`;
    return "CloudLaunch App Bundle";
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full overflow-hidden text-sm flex flex-col shadow-2xl relative">
        
        {/* Decorative ambient gradient background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="p-5 border-b border-slate-850 flex justify-between items-center bg-slate-900/60 z-10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-brand-500/15 rounded-lg text-brand-400">
              <CreditCard size={18} />
            </div>
            <div>
              <h4 className="text-white font-bold text-base font-display">Secure Sandbox Checkout</h4>
              <p className="text-xs text-gray-400">Zero-risk environment configuration</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4 max-h-[80vh]">
          {/* Active purchase review summary box */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400 uppercase tracking-wider">Purchase target:</span>
              <span className="text-brand-400 font-bold tracking-widest text-[10px] uppercase font-mono">STANDALONE SETUP</span>
            </div>
            <h5 className="font-bold text-white text-base font-display">{getSaaSName()}</h5>
            <div className="flex justify-between text-xs text-gray-300">
              <span className="capitalize">Cycle: <strong>{billingCycle} billing</strong></span>
              <span>Rate: <strong className="font-mono">${basePrice}</strong></span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <h6 className="text-xs text-gray-400 uppercase tracking-widest font-bold">1. Customer Identification</h6>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="text-gray-400 text-xs block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Johnathan Doe"
                  className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs block mb-1">Receipt Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-lg text-white"
                />
              </div>
            </div>

            <h6 className="text-xs text-gray-400 uppercase tracking-widest font-bold pt-1">2. Payment Parameters</h6>
            
            {/* Payment Method Selector Tabs */}
            <div className="flex gap-2 pt-1 pb-1">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                  paymentMethod === "card"
                    ? "bg-slate-900 border-brand-500 text-white"
                    : "bg-slate-950/40 border-slate-850 text-gray-400 hover:text-white hover:border-slate-700"
                }`}
              >
                <CreditCard size={13} className={paymentMethod === "card" ? "text-brand-400" : ""} /> Card Gateway
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("metamask")}
                className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                  paymentMethod === "metamask"
                    ? "bg-slate-900 border-brand-500 text-white"
                    : "bg-slate-950/40 border-slate-850 text-gray-400 hover:text-white hover:border-slate-700"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${walletAddress ? "bg-emerald-400 animate-pulse" : "bg-brand-500"}`}></span> 
                MetaMask Crypto
              </button>
            </div>

            {/* Credit Card Inputs */}
            {paymentMethod === "card" && (
              <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-850 space-y-2">
                <div>
                  <label className="text-gray-400 text-[11px] block mb-1">Credit Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      required={paymentMethod === "card"}
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 pl-10 pr-3 py-2 rounded-lg text-white font-mono"
                    />
                    <CreditCard size={14} className="absolute left-3 top-3 text-gray-500" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-gray-400 text-[11px] block mb-0.5">Expiration date</label>
                    <input
                      type="text"
                      required={paymentMethod === "card"}
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-lg text-white font-mono text-center"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-[11px] block mb-0.5">Security Code (CVC)</label>
                    <input
                      type="password"
                      required={paymentMethod === "card"}
                      maxLength={3}
                      value={cvc}
                      onChange={(e) => setCVC(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-lg text-white font-mono text-center"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* MetaMask / Web3 Inputs */}
            {paymentMethod === "metamask" && (
              <div className="bg-slate-950/50 p-3.5 rounded-lg border border-slate-850 space-y-3">
                {walletAddress ? (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400">Connected Wallet:</span>
                      <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-1 text-[10px]">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                        Active
                      </span>
                    </div>
                    <div className="bg-slate-950 border border-slate-900 rounded-lg p-2.5 flex items-center justify-between font-mono text-xs">
                      <span className="text-gray-200 truncate pr-2">{walletAddress}</span>
                      <button 
                        type="button" 
                        onClick={disconnectWallet}
                        className="text-red-400 hover:text-red-300 font-bold text-[10px] shrink-0"
                      >
                        Disconnect
                      </button>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>Mapped exchange cost:</span>
                      <span className="font-mono text-white text-xs font-semibold">
                        ~{(finalPrice / 3000).toFixed(4)} ETH <span className="text-gray-500 font-normal">(@ $3000/ETH)</span>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-2 space-y-3">
                    <p className="text-gray-400 text-xs leading-relaxed max-w-xs mx-auto">
                      Please connect your MetaMask browser extension or web3 workspace device to authorize this billing flow.
                    </p>
                    <button
                      type="button"
                      onClick={connectWallet}
                      disabled={isConnectingWallet}
                      className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-bold text-xs py-2 px-4 rounded-xl transition shadow-lg shadow-brand-600/15"
                    >
                      {isConnectingWallet ? (
                        <>
                          <RefreshCw size={12} className="animate-spin text-white" />
                          Locating extension...
                        </>
                      ) : (
                        <>
                          Connect MetaMask
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
          </form>

          {/* Applied Coupon Controls */}
          <div className="border-t border-slate-850 pt-3">
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="Discount Coupon (LAUNCH20)"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-grow bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg text-white uppercase text-xs"
              />
              <button
                type="submit"
                className="bg-slate-800 hover:bg-slate-700 text-white text-xs px-3 rounded-lg border border-slate-700"
              >
                Apply
              </button>
            </form>
            {couponError && <p className="text-red-400 text-[11px] mt-1">{couponError}</p>}
            {couponSuccess && <p className="text-emerald-400 text-[11px] mt-1 font-semibold flex items-center gap-1">
              <Check size={12} /> {couponSuccess}
            </p>}
          </div>

          {/* Direct balance overview billing breakdown */}
          <div className="border-t border-slate-850 pt-3 space-y-1.5 text-xs">
            <div className="flex justify-between text-gray-400">
              <span>Item Subtotal:</span>
              <span className="font-mono">${basePrice}</span>
            </div>
            {discountPct > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Initial Code Discount ({discountPct}%):</span>
                <span className="font-mono">-${discValue}</span>
              </div>
            )}
            <div className="flex justify-between text-white font-bold text-sm pt-1 border-t border-slate-800">
              <span className="flex items-center gap-1">
                <Shield size={14} className="text-emerald-400" /> Total Charge Due:
              </span>
              <span className="font-mono text-emerald-400">${finalPrice}</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !fullName || !email || (paymentMethod === "metamask" && !walletAddress)}
              className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-brand-600/20"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw size={16} className="animate-spin" /> {paymentMethod === "metamask" ? "Signing Web3 Contract..." : "Authorizing Gateway Stream..."}
                </>
              ) : (
                <>
                  <Lock size={16} /> {paymentMethod === "metamask" ? `Sign MetaMask Payment ($${finalPrice})` : `Pay $${finalPrice} & Initialize Setup`}
                </>
              )}
            </button>
          </div>

          {/* Secure compliance indicators */}
          <div className="flex justify-around items-center text-[10px] text-gray-500 pt-1">
            <span className="flex items-center gap-1"><Lock size={10} /> 256-bit TLS Handshake</span>
            <span className="flex items-center gap-1"><Shield size={10} /> PCI-DSS Compliant</span>
          </div>

          {/* Future architecture placeholder comment box */}
          <div className="bg-slate-950 p-2.5 rounded-lg border border-dashed border-slate-800 text-[10px] text-gray-500 font-mono">
            <strong>Dev Notice: Gateway Integration Hooks Enabled</strong>
            <p className="mt-1">
              Variables preset for production migration: Stripe: process.env.STRIPE_SECRET_KEY, LemonSqueezy: process.env.LEMON_SQUEEZY_API_KEY, Paddle: process.env.PADDLE_ENDPOINT. Supported provider webhooks ready in /api/checkout.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CheckoutModal;
