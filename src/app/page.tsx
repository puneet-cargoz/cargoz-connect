"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Send, ArrowRight, MapPin, Star, Check, MessageCircle, Phone,
  Building2, ShieldCheck, Zap, TrendingUp, Users, Lock,
  Package, Thermometer, Warehouse, Globe, Sparkles, X
} from "lucide-react";
import { MOCK_WAREHOUSES, POPULAR_LOCATIONS, WAREHOUSE_CATEGORIES } from "@/lib/data";
import WarehouseCard from "@/components/WarehouseCard";
import CargozLogo from "@/components/CargozLogo";

// Extract meaningful tags from a free-text query
function extractTags(q: string): { label: string; color: string }[] {
  const tags: { label: string; color: string }[] = [];
  const lower = q.toLowerCase();

  // Locations (teal)
  const locations = ["jebel ali", "jafza", "dubai", "abu dhabi", "sharjah", "ajman", "al quoz", "dip", "dic", "ras al khor", "mussafah", "kizad", "hamriyah", "fujairah"];
  for (const loc of locations) {
    if (lower.includes(loc)) {
      tags.push({ label: loc.replace(/\b\w/g, c => c.toUpperCase()), color: "teal" });
    }
  }

  // Storage types (blue)
  const types: Record<string, string> = {
    "cold storage": "Cold Storage", "chiller": "Chiller", "dg": "DG Class",
    "food grade": "Food Grade", "open yard": "Open Yard", "ac storage": "AC Storage",
    "ambient": "Ambient", "general": "General Cargo", "e-commerce": "E-commerce",
    "pharma": "Pharma", "pharmaceutical": "Pharmaceutical",
  };
  for (const [key, label] of Object.entries(types)) {
    if (lower.includes(key)) tags.push({ label, color: "blue" });
  }

  // Size / quantity (amber) — e.g. "2,000 sqft", "200 pallets", "500 cbm"
  const sizeMatch = q.match(/[\d,]+\s*(sqft|sq\.?ft|pallets?|cbm|m²|sqm)/i);
  if (sizeMatch) tags.push({ label: sizeMatch[0].trim(), color: "amber" });

  // Product keywords (orange) — anything else meaningful
  const products = ["frozen", "chicken", "fish", "dairy", "pharma", "cosmetics", "electronics", "apparel", "automotive", "chemicals"];
  for (const p of products) {
    if (lower.includes(p) && !tags.find(t => t.label.toLowerCase().includes(p))) {
      tags.push({ label: p.charAt(0).toUpperCase() + p.slice(1), color: "orange" });
    }
  }

  return tags.slice(0, 5); // max 5 tags
}

// ─── AI Prompt Box ─────────────────────────────────────────────────────────────

const PLACEHOLDERS = [
  "Chiller storage 2,000 sqft in Jebel Ali…",
  "DG warehouse near JAFZA…",
  "AC storage for pharma in Dubai…",
  "Food grade facility in Abu Dhabi…",
  "Open yard 10,000 sqft in Sharjah…",
];

function AIPromptBox() {
  const [query, setQuery] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<typeof MOCK_WAREHOUSES>([]);
  const [searched, setSearched] = useState(false);
  const [hasMatch, setHasMatch] = useState(true);

  // Enquiry form state
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", company: "", phone: "", email: "", space: "", duration: "", startDate: "" });
  const [formSent, setFormSent] = useState(false);

  // Rotate placeholder
  useEffect(() => {
    const t = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const runSearch = (q: string) => {
    setSearching(true);
    setSearched(false);
    setShowForm(false);
    setFormSent(false);
    setTimeout(() => {
      // Split query into meaningful tokens (3+ chars), match any token against any field
      const tokens = q.toLowerCase().split(/\s+/).filter(t => t.length >= 3);
      const matched = MOCK_WAREHOUSES.filter((w) => {
        const haystack = [w.location, w.area, w.specialization, w.temperature, w.storageFormat, w.city].join(" ").toLowerCase();
        return tokens.some(token => haystack.includes(token));
      }).slice(0, 3);
      setHasMatch(matched.length > 0);
      setResults(matched);
      setSearching(false);
      setSearched(true);
    }, 900);
  };

  const doSearch = () => {
    if (!query.trim()) return;
    runSearch(query);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") doSearch();
  };

  const searchParams = new URLSearchParams();
  if (query.trim()) searchParams.set("q", query.trim());

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Input */}
      <div className="relative group">
        {/* Animated gradient glow behind */}
        <div className="absolute -inset-[2px] bg-gradient-to-r from-brand-400 via-teal-400 to-brand-400 rounded-[18px] opacity-60 group-focus-within:opacity-100 blur-sm transition-opacity duration-500 animate-[gradient-shift_3s_ease_infinite]" />
        <div className="relative flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex-1 flex items-center gap-3 px-3 sm:px-5 py-4">
            <div className="relative flex-shrink-0">
              <Sparkles className="w-5 h-5 text-brand-500" />
              <div className="absolute inset-0 w-5 h-5 text-brand-500 animate-ping opacity-20">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKey}
              placeholder={PLACEHOLDERS[placeholderIdx]}
              className="flex-1 text-slate-900 placeholder:text-slate-400 text-base outline-none bg-transparent"
            />
          </div>
          <button
            onClick={doSearch}
            disabled={searching}
            className="m-2 px-4 py-3 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 disabled:opacity-70 text-white font-semibold rounded-xl transition-all flex items-center gap-1 text-sm whitespace-nowrap shadow-lg shadow-brand-500/25"
          >
            {searching ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            {searching ? "Searching…" : "AI-Search"}
          </button>
        </div>
      </div>

      {/* Quick type buttons */}
      <div className="flex justify-center gap-2 mt-4 overflow-x-auto no-scrollbar">
        {["Open Yard", "Chiller", "DG Class", "Food Grade"].map((t) => (
          <button
            key={t}
            onClick={() => {
              setQuery(t);
              runSearch(t);
            }}
            className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 text-sm border border-white/20 transition-colors"
          >
            {t}
          </button>
        ))}
      </div>

      {/* Searching state */}
      {searching && (
        <div className="mt-6 text-center text-white/70 text-sm">
          <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin mx-auto mb-2" />
          Finding matching warehouses…
        </div>
      )}

      {/* Results — matched */}
      {searched && !searching && hasMatch && (() => {
        const tags = extractTags(query);
        const confidence = Math.min(95, 70 + results.length * 8);
        // Simulated total — real pool would be larger; show a plausible number
        const totalOptions = results.length * 7 + Math.floor(Math.random() * 5);
        const TAG_COLORS: Record<string, string> = {
          teal:   "bg-teal-50 text-teal-700 border border-teal-200",
          blue:   "bg-blue-50 text-blue-700 border border-blue-200",
          amber:  "bg-amber-50 text-amber-700 border border-amber-200",
          orange: "bg-orange-50 text-orange-700 border border-orange-200",
        };
        return (
          <div className="mt-6 space-y-3">
            {/* ── Result card ── */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-brand-50 to-teal-50 px-5 py-4 flex items-center gap-3 border-b border-slate-100">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-bold text-slate-900 text-sm">Search Complete</p>
                  <p className="text-xs text-slate-500">{confidence}% match confidence</p>
                </div>
                <button
                  onClick={() => { setSearched(false); setQuery(""); }}
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              {/* Tags */}
              {tags.length > 0 && (
                <div className="px-5 pt-4 pb-2 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag.label} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${TAG_COLORS[tag.color]}`}>
                      <Check className="w-3 h-3" />
                      {tag.label}
                    </span>
                  ))}
                </div>
              )}

              {/* Count */}
              <div className="px-5 py-6 text-center border-b border-slate-100">
                <p className="font-heading text-6xl font-bold bg-gradient-to-r from-brand-500 to-teal-500 bg-clip-text text-transparent leading-none mb-2">
                  {totalOptions}
                </p>
                <p className="font-heading font-bold text-slate-900 text-lg mb-1">
                  options that suit your requirement
                </p>
                <p className="text-slate-500 text-sm">
                  Verified warehouse spaces matched to your needs — ready to explore
                </p>
              </div>

              {/* CTA */}
              <div className="px-5 py-4">
                <Link
                  href={`/warehouses?${searchParams.toString()}`}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl transition-colors text-sm"
                >
                  View All Options <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Footer */}
              <div className="px-5 pb-4 flex items-center justify-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  Updated 2 min ago
                </span>
                <span className="text-slate-300">|</span>
                <span className="flex items-center gap-1.5">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  All spaces verified
                </span>
              </div>
            </div>

            {/* ── Secondary actions ── */}
            <div className="flex gap-2">
              <a
                href={`https://wa.me/971544462859?text=Hi%2C%20I%27m%20looking%20for%3A%20${encodeURIComponent(query)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-colors"
                style={{ backgroundColor: "#25D366" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                Chat on WhatsApp
              </a>
              <button
                onClick={() => setShowForm(true)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 font-semibold text-sm text-white transition-colors"
              >
                <Send className="w-4 h-4" />
                Submit Enquiry
              </button>
            </div>

            {/* Inline enquiry form (same flow as no-match) */}
            {showForm && !formSent && (
              <form
                onSubmit={(e) => { e.preventDefault(); setFormSent(true); }}
                className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-5 text-left space-y-3"
              >
                <p className="text-white/40 text-xs px-1">Fields marked <span className="text-brand-400">*</span> are required</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div><label className="block text-white/50 text-xs mb-1 px-1">Name <span className="text-brand-400">*</span></label><input required placeholder="e.g. Ahmed Al Mansoori" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 text-sm outline-none focus:border-brand-400" /></div>
                  <div><label className="block text-white/50 text-xs mb-1 px-1">Company <span className="text-brand-400">*</span></label><input required placeholder="e.g. Al Futtaim Logistics" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 text-sm outline-none focus:border-brand-400" /></div>
                  <div><label className="block text-white/50 text-xs mb-1 px-1">Phone <span className="text-brand-400">*</span></label><input required type="tel" placeholder="+971 50 000 0000" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 text-sm outline-none focus:border-brand-400" /></div>
                  <div><label className="block text-white/50 text-xs mb-1 px-1">Email <span className="text-brand-400">*</span></label><input required type="email" placeholder="you@company.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 text-sm outline-none focus:border-brand-400" /></div>
                  <div><label className="block text-white/50 text-xs mb-1 px-1">Space needed</label><input placeholder="e.g. 2,000 sqft or 500 CBM" value={formData.space} onChange={(e) => setFormData({ ...formData, space: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 text-sm outline-none focus:border-brand-400" /></div>
                  <div><label className="block text-white/50 text-xs mb-1 px-1">How long do you need it?</label><select value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-sm outline-none focus:border-brand-400 [color-scheme:dark] text-white/60"><option value="">Select duration</option><option value="1 month">1 month</option><option value="3 months">3 months</option><option value="6 months">6 months</option><option value="12 months">12 months</option><option value="12+ months">12+ months (long-term)</option></select></div>
                  <div className="sm:col-span-2"><label className="block text-white/50 text-xs mb-1 px-1">Preferred move-in date <span className="text-brand-400">*</span></label><input required type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm outline-none focus:border-brand-400 [color-scheme:dark]" /></div>
                </div>
                <div className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/50 text-sm">Your search: <span className="text-teal-300">{query}</span></div>
                <div className="flex gap-3 pt-1">
                  <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 text-sm font-medium transition-colors">Back</button>
                  <button type="submit" className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm transition-colors"><Send className="w-3.5 h-3.5" />Send Enquiry</button>
                </div>
              </form>
            )}
            {formSent && (
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-5 text-center">
                <Check className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="font-heading font-bold text-white mb-1">Enquiry received!</p>
                <p className="text-white/60 text-sm">Our team will call <span className="text-white">{formData.phone}</span> within a few hours.</p>
              </div>
            )}
          </div>
        );
      })()}

      {/* Results — no match */}
      {searched && !searching && !hasMatch && (
        <div className="relative mt-6 bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 text-center">
          <button
            onClick={() => { setSearched(false); setQuery(""); }}
            className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={14} />
          </button>
          {!formSent ? (
            <>
              <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6 text-teal-300" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white mb-1">
                We&apos;ll find the perfect match for you
              </h3>
              <p className="text-white/70 text-sm mb-5">
                No exact listing for <span className="text-teal-300 font-medium">&ldquo;{query}&rdquo;</span> — but our team sources custom storage solutions daily across the UAE. Tell us what you need and we&apos;ll get back within a few hours.
              </p>

              {!showForm ? (
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`https://wa.me/971544462859?text=Hi%2C%20I%27m%20looking%20for%3A%20${encodeURIComponent(query)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white transition-colors"
                    style={{ backgroundColor: "#25D366" }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                    Chat on WhatsApp
                  </a>
                  <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 font-semibold text-sm text-white transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Submit Enquiry
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setFormSent(true); }}
                  className="text-left space-y-3 mt-2"
                >
                  <p className="text-white/30 text-xs px-1">Fields marked <span className="text-brand-400">*</span> are required</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-white/50 text-xs mb-1 px-1">Name <span className="text-brand-400">*</span></label>
                      <input
                        required
                        placeholder="e.g. Ahmed Al Mansoori"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 text-sm outline-none focus:border-brand-400"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs mb-1 px-1">Company <span className="text-brand-400">*</span></label>
                      <input
                        required
                        placeholder="e.g. Al Futtaim Logistics"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 text-sm outline-none focus:border-brand-400"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs mb-1 px-1">Phone <span className="text-brand-400">*</span></label>
                      <input
                        required
                        type="tel"
                        placeholder="+971 50 000 0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 text-sm outline-none focus:border-brand-400"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs mb-1 px-1">Email <span className="text-brand-400">*</span></label>
                      <input
                        required
                        type="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 text-sm outline-none focus:border-brand-400"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs mb-1 px-1">Space needed</label>
                      <input
                        placeholder="e.g. 2,000 sqft or 500 CBM"
                        value={formData.space}
                        onChange={(e) => setFormData({ ...formData, space: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 text-sm outline-none focus:border-brand-400"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs mb-1 px-1">How long do you need it?</label>
                      <select
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-sm outline-none focus:border-brand-400 [color-scheme:dark] text-white/60"
                      >
                        <option value="">Select duration</option>
                        <option value="1 month">1 month</option>
                        <option value="3 months">3 months</option>
                        <option value="6 months">6 months</option>
                        <option value="12 months">12 months</option>
                        <option value="12+ months">12+ months (long-term)</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-white/50 text-xs mb-1 px-1">Preferred move-in date <span className="text-brand-400">*</span></label>
                      <input
                        required
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm outline-none focus:border-brand-400 [color-scheme:dark]"
                      />
                    </div>
                  </div>
                  <div className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/50 text-sm">
                    Your search: <span className="text-teal-300">{query}</span>
                  </div>
                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 text-sm font-medium transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Send Enquiry
                    </button>
                  </div>
                </form>
              )}
            </>
          ) : (
            <div className="py-4">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-emerald-300" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white mb-1">Enquiry received!</h3>
              <p className="text-white/70 text-sm mb-4">
                Our team will reach out to <span className="text-white font-medium">{formData.phone}</span> within a few hours with tailored options.
              </p>
              <a
                href={`https://wa.me/971544462859?text=Hi%2C%20I%20just%20submitted%20an%20enquiry%20for%3A%20${encodeURIComponent(query)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white"
                style={{ backgroundColor: "#25D366" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                Follow up on WhatsApp
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Homepage ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [heroMode, setHeroMode] = useState<"need" | "have">("need");

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-slate-950 via-brand-950 to-slate-900 pt-28 pb-20 px-4 overflow-hidden">
        {/* Grid decoration */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#7957ff 1px, transparent 1px), linear-gradient(to right, #7957ff 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        {/* Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">

          {/* ── Toggle ── */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center bg-white/10 backdrop-blur border border-white/20 rounded-full p-1.5 gap-1">
              <button
                onClick={() => setHeroMode("need")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  heroMode === "need"
                    ? "bg-brand-500 text-white shadow-lg"
                    : "text-white/60 hover:text-white/80"
                }`}
              >
                <span className="text-base">🔍</span> I Need Space
              </button>
              <button
                onClick={() => setHeroMode("have")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  heroMode === "have"
                    ? "bg-teal-500 text-white shadow-lg"
                    : "text-white/60 hover:text-white/80"
                }`}
              >
                <Building2 className="w-4 h-4" /> I Have Space
              </button>
            </div>
          </div>

          {/* ── I Need Space ── */}
          {heroMode === "need" && (
            <>
              <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 text-sm font-semibold px-4 py-1.5 rounded-full border border-teal-500/30 mb-6">
                <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
                120,000+ sqft available across the UAE
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                Find Business Storage<br />
                <span className="bg-gradient-to-r from-brand-400 to-teal-400 bg-clip-text text-transparent">
                  in the UAE — Fast
                </span>
              </h1>

              <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
                Search verified warehouses across Dubai, Abu Dhabi and Sharjah.
                Any type. Any size. No brokers. No long negotiations.
              </p>

              <AIPromptBox />

              <div className="mt-8 flex items-center justify-center gap-6 flex-wrap text-sm text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-teal-400" /> No brokerage fees
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-teal-400" /> Verified facilities only
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-teal-400" /> Connect within 24 hours
                </span>
              </div>
            </>
          )}

          {/* ── I Have Space ── */}
          {heroMode === "have" && (
            <div className="max-w-4xl mx-auto">
              <span className="inline-flex items-center gap-1.5 bg-teal-500/20 text-teal-300 text-xs font-semibold px-3 py-1.5 rounded-full border border-teal-500/30 mb-6">
                <Building2 className="w-3.5 h-3.5" />
                For Warehouse Owners
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                Own Warehouse Space?<br />
                <span className="text-teal-400">Connect With Verified Buyers.</span>
              </h1>
              <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
                Stop waiting for tenants to find you. Cargoz brings a pipeline of
                1,000+ verified storage enquiries every month directly to you.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-10">
                {[
                  { icon: <TrendingUp className="w-4 h-4" />, text: "Access 25,000+ verified storage enquiries" },
                  { icon: <Zap className="w-4 h-4" />, text: "Real-time WhatsApp notifications on new leads" },
                  { icon: <ShieldCheck className="w-4 h-4" />, text: "Dedicated Cargoz sales rep manages your account" },
                  { icon: <Check className="w-4 h-4" />, text: "Free to register — no upfront cost" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <div className="w-7 h-7 bg-teal-500/20 rounded-lg flex items-center justify-center text-teal-400 flex-shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-sm text-slate-300">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-10">
                {[
                  { value: "25,000+", label: "Leads Collected" },
                  { value: "1,000+", label: "New Leads / Month" },
                  { value: "2,000+", label: "Orders Converted" },
                  { value: "180+", label: "Partner Warehouses" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                    <p className="font-heading text-xl font-bold text-white">{s.value}</p>
                    <p className="text-xs text-slate-400 mt-0.5 leading-tight">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-3 flex-wrap">
                <Link
                  href="/leads"
                  className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-xl transition-colors text-sm"
                >
                  See Live Leads
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-colors text-sm"
                >
                  Register Your Warehouse — Free
                </Link>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-4 gap-2 sm:gap-6 text-center">
            {[
              { value: "120,000+", label: "sqft in active use", icon: <Warehouse className="w-4 h-4 sm:w-5 sm:h-5 text-brand-500" /> },
              { value: "25+", label: "UAE locations", icon: <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500" /> },
              { value: "500+", label: "businesses served", icon: <Users className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" /> },
              { value: "2", label: "countries", icon: <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" /> },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-50 rounded-xl flex items-center justify-center mb-1">
                  {s.icon}
                </div>
                <p className="font-heading text-lg sm:text-2xl font-bold text-slate-900">{s.value}</p>
                <p className="text-[10px] sm:text-xs text-slate-500 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR WAREHOUSE TYPES ── */}
      <section className="bg-slate-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold text-slate-900 mb-2">
              Find the Right Storage Type
            </h2>
            <p className="text-slate-500">
              From food-grade cold chain to DG Class warehouses — we have it all.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WAREHOUSE_CATEGORIES.filter((cat) => !["Pharmaceutical", "Chemical"].includes(cat.type)).map((cat) => (
              <Link
                key={cat.type}
                href={`/warehouses?spec=${encodeURIComponent(cat.type)}`}
                className={`${cat.color} rounded-2xl p-4 text-center hover:scale-105 transition-transform group cursor-pointer`}
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <p className={`font-heading font-semibold text-sm ${cat.textColor} mb-1`}>
                  {cat.type}
                </p>
                <p className="text-xs text-slate-500 leading-snug hidden sm:block">
                  {cat.description.split(" ").slice(0, 5).join(" ")}…
                </p>
                <span className={`text-xs ${cat.textColor} font-medium mt-2 inline-flex items-center gap-0.5 group-hover:gap-1 transition-all`}>
                  Browse <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR LOCATIONS ── */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <div>
              <h2 className="font-heading text-3xl font-bold text-slate-900 mb-1">
                Storage Across the UAE
              </h2>
              <p className="text-slate-500 text-sm">
                Major industrial zones and free zones covered
              </p>
            </div>
            <Link
              href="/warehouses"
              className="text-sm text-brand-600 font-medium hover:text-brand-700 flex items-center gap-1"
            >
              View all locations <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Dubai */}
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Dubai
            </p>
            <div className="flex flex-wrap gap-2">
              {POPULAR_LOCATIONS.filter((l) => l.city === "Dubai").map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/warehouses?area=${encodeURIComponent(loc.slug)}`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 hover:bg-brand-50 hover:border-brand-200 hover:text-brand-700 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {loc.area}
                </Link>
              ))}
            </div>
          </div>

          {/* Other emirates */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Abu Dhabi · Sharjah · Ajman
            </p>
            <div className="flex flex-wrap gap-2">
              {POPULAR_LOCATIONS.filter((l) => l.city !== "Dubai").map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/warehouses?area=${encodeURIComponent(loc.slug)}`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 hover:bg-brand-50 hover:border-brand-200 hover:text-brand-700 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {loc.area}
                  <span className="text-xs text-slate-400">· {loc.city}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DIGITAL PRODUCTS ── */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full border border-brand-100 mb-3">
              <Zap className="w-3.5 h-3.5" />
              Standardised Products
            </span>
            <h2 className="font-heading text-3xl font-bold text-slate-900 mb-2">
              Need Something Ready-Made?
            </h2>
            <p className="text-slate-500">
              Fixed pricing. No negotiation. Book online, move in within days.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Block */}
            <div className="bg-gradient-to-br from-brand-50 to-slate-50 rounded-3xl border border-brand-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-brand-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Package className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-slate-900 text-xl mb-0.5">
                    Storage Block
                  </h3>
                  <p className="text-slate-500 text-sm mb-3">
                    Your own dedicated, partitioned storage bay
                  </p>
                  <p className="text-2xl font-bold text-brand-600 mb-4">
                    From AED 1,200<span className="text-sm font-normal text-slate-500">/month</span>
                  </p>
                  <ul className="space-y-1.5 mb-5">
                    {["50–5,000 sqft available", "24/7 access & security", "Flexible 1-month minimum"].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                        <Check className="w-4 h-4 text-brand-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl text-sm transition-colors"
                  >
                    Book a Block <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Locker */}
            <div className="bg-gradient-to-br from-teal-50 to-slate-50 rounded-3xl border border-teal-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-teal-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Lock className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-slate-900 text-xl mb-0.5">
                    Storage Locker
                  </h3>
                  <p className="text-slate-500 text-sm mb-3">
                    Personal lockable unit — your key, your control
                  </p>
                  <p className="text-2xl font-bold text-teal-600 mb-4">
                    From AED 250<span className="text-sm font-normal text-slate-500">/month</span>
                  </p>
                  <ul className="space-y-1.5 mb-5">
                    {["Small / Medium / Large units", "Climate controlled", "Weekly or monthly contracts"].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                        <Check className="w-4 h-4 text-teal-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl text-sm transition-colors"
                  >
                    Book a Locker <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOR WAREHOUSE OWNERS ── */}
      <section className="bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 py-20 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#7957ff 1px, transparent 1px), linear-gradient(to right, #7957ff 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 bg-teal-500/20 text-teal-300 text-xs font-semibold px-3 py-1.5 rounded-full border border-teal-500/30 mb-5">
                <Building2 className="w-3.5 h-3.5" />
                For Warehouse Owners
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                Own Warehouse Space?<br />
                <span className="text-teal-400">Connect With Verified Buyers.</span>
              </h2>
              <p className="text-slate-300 text-lg mb-6">
                Stop waiting for tenants to find you. Cargoz brings a pipeline of
                1,000+ verified storage enquiries every month directly to you.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { icon: <TrendingUp className="w-4 h-4" />, text: "Access 25,000+ verified storage enquiries" },
                  { icon: <Zap className="w-4 h-4" />, text: "Real-time WhatsApp notifications on new leads" },
                  { icon: <ShieldCheck className="w-4 h-4" />, text: "Dedicated Cargoz sales rep manages your account" },
                  { icon: <Check className="w-4 h-4" />, text: "Free to register — no upfront cost" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 text-slate-300">
                    <div className="w-7 h-7 bg-brand-500/20 rounded-lg flex items-center justify-center text-brand-400">
                      {item.icon}
                    </div>
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <Link href="/register" className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-colors text-sm">
                  Register Your Warehouse — Free
                </Link>
                <Link href="/leads" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors text-sm border border-white/20">
                  See Live Leads
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "25,000+", label: "Storage Leads Collected", icon: <TrendingUp className="w-5 h-5 text-brand-400" /> },
                { value: "1,000+", label: "New Leads Every Month", icon: <Zap className="w-5 h-5 text-teal-400" /> },
                { value: "2,000+", label: "Orders Converted", icon: <Check className="w-5 h-5 text-emerald-400" /> },
                { value: "180+", label: "Partner Warehouses", icon: <Building2 className="w-5 h-5 text-purple-400" /> },
              ].map((s) => (
                <div key={s.label} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-colors">
                  <div className="flex justify-center mb-2">{s.icon}</div>
                  <p className="font-heading text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST & TESTIMONIALS ── */}
      <section className="bg-slate-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-slate-900 mb-2">
              Trusted by Businesses Across the UAE
            </h2>
            <p className="text-slate-500">From F&amp;B to pharma — we handle every storage need.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              {
                name: "Fatima Al Hamdan",
                company: "Fresh Direct Foods LLC",
                role: "Logistics Manager",
                text: "Found a certified food-grade chiller in JAFZA within 48 hours. The Cargoz team handled everything — no back-and-forth with brokers.",
                rating: 5,
              },
              {
                name: "Ravi Sharma",
                company: "MedStoreHub FZE",
                role: "Supply Chain Head",
                text: "We needed GDP-compliant storage at short notice. Cargoz matched us with a MOH-approved facility in DIC the same day we enquired.",
                rating: 5,
              },
              {
                name: "Ola Bergström",
                company: "Nordic Trade Co.",
                role: "Regional Director",
                text: "Three warehouses in three emirates — all sourced through Cargoz. The platform gives us total visibility and a single point of contact.",
                rating: 5,
              },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-4">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-600 font-bold text-sm">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}, {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Trusted by leading brands
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {["Fairmont Hotels", "Hilton Hotels", "Larsen & Toubro", "Cambridge Univ. Press", "JA Resorts"].map((brand) => (
                <span key={brand} className="text-slate-400 font-semibold text-sm">{brand}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-white py-16 px-4" id="how-it-works">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-slate-900 mb-2">How Cargoz Works</h2>
            <p className="text-slate-500">Simple. Fast. Reliable.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {[
              { step: "01", title: "Search or Tell Us", desc: "Use the AI search box or browse our warehouse listings by type and location.", icon: <Warehouse className="w-6 h-6 text-brand-500" /> },
              { step: "02", title: "Submit Enquiry", desc: "Fill a short form or send a WhatsApp message. No lengthy RFP process.", icon: <Send className="w-6 h-6 text-brand-500" /> },
              { step: "03", title: "We Connect You", desc: "Our team shortlists and connects you with the best-matched warehouse within 24 hours.", icon: <MessageCircle className="w-6 h-6 text-brand-500" /> },
              { step: "04", title: "Move In", desc: "Agree terms directly with the warehouse. No broker fees. Flexible monthly contracts.", icon: <Check className="w-6 h-6 text-brand-500" /> },
            ].map((s, i) => (
              <div key={s.step} className="relative text-center group">
                {i < 3 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%_-_12px)] w-full h-px bg-slate-200 z-0" />
                )}
                <div className="relative z-10 w-16 h-16 bg-brand-50 border-2 border-brand-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-500 group-hover:border-brand-500 transition-colors">
                  <div className="group-hover:[&_*]:text-white transition-colors">{s.icon}</div>
                </div>
                <span className="text-xs font-bold text-brand-500 tracking-widest">{s.step}</span>
                <h3 className="font-heading font-semibold text-slate-900 mt-0.5 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-brand-500 py-14 px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="font-heading text-3xl font-bold mb-3">Ready to Find Your Storage Space?</h2>
          <p className="text-brand-100 mb-8 text-lg">Search our verified warehouse network or talk to our team right now.</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="/warehouses" className="px-7 py-3.5 bg-white text-brand-700 font-bold rounded-xl hover:bg-brand-50 transition-colors text-sm">
              Browse Warehouses
            </Link>
            <a href="https://wa.me/971544462859?text=Hi%2C%20I%27m%20looking%20for%20warehouse%20storage%20in%20UAE" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-7 py-3.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold rounded-xl transition-colors text-sm">
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
            <a href="tel:800665544" className="flex items-center gap-2 px-7 py-3.5 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl transition-colors text-sm">
              <Phone className="w-4 h-4" />
              800 665544
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 text-slate-400 py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 sm:col-span-1">
              <CargozLogo className="h-8 w-auto mb-3 brightness-0 invert opacity-80" />
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                UAE&apos;s trusted marketplace for business warehouse storage across Dubai, Abu Dhabi, Sharjah and beyond.
              </p>
              <div className="flex items-center gap-3">
                <a href="https://wa.me/971544462859" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-[#25D366] rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity">
                  <MessageCircle className="w-4 h-4 text-white" />
                </a>
                <a href="tel:800665544" className="w-9 h-9 bg-slate-700 rounded-xl flex items-center justify-center hover:bg-slate-600 transition-colors">
                  <Phone className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Services</p>
              <ul className="space-y-2">
                {[{ label: "Find Storage", href: "/warehouses" }, { label: "Storage Blocks", href: "/products" }, { label: "Storage Lockers", href: "/products" }, { label: "For Warehouses", href: "/leads" }, { label: "Register Warehouse", href: "/register" }].map((l) => (
                  <li key={l.label}><Link href={l.href} className="text-sm hover:text-white transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Top Locations</p>
              <ul className="space-y-2">
                {["JAFZA, Dubai", "Jebel Ali, Dubai", "DIC, Dubai", "DIP, Dubai", "Mussafah, Abu Dhabi", "Hamriyah, Sharjah"].map((loc) => (
                  <li key={loc}><Link href={`/warehouses?area=${encodeURIComponent(loc.split(",")[0].trim())}`} className="text-sm hover:text-white transition-colors">{loc}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Company</p>
              <ul className="space-y-2">
                {[{ label: "About Cargoz", href: "/" }, { label: "Partner Dashboard", href: "/dashboard" }, { label: "Sign In", href: "/login" }, { label: "Privacy Policy", href: "/" }, { label: "Terms of Use", href: "/" }].map((l) => (
                  <li key={l.label}><Link href={l.href} className="text-sm hover:text-white transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 pb-4">
            <p className="text-xs text-slate-600 leading-relaxed max-w-4xl">
              Cargoz is a UAE-based warehouse storage marketplace connecting businesses with verified storage providers across Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah and Umm Al Quwain. We specialise in general cargo warehouses, food-grade cold storage, dangerous goods (DG) facilities, pharmaceutical GDP-compliant warehouses, and open yard storage. Key areas served include JAFZA, Jebel Ali Free Zone, Dubai Industrial City (DIC), Dubai Investment Park (DIP), Al Quoz, Ras Al Khor, Dubai Logistics City, Mussafah (Abu Dhabi), KIZAD, Hamriyah Free Zone (Sharjah), and SAIF Zone. Contact us on 800 665544 or WhatsApp +971 54 446 2859.
            </p>
          </div>
          <div className="border-t border-slate-800 pt-5 flex items-center justify-between flex-wrap gap-3 text-xs text-slate-600">
            <p>© {new Date().getFullYear()} Cargoz. All rights reserved. Dubai, UAE.</p>
            <div className="flex items-center gap-4">
              <Link href="/" className="hover:text-slate-400 transition-colors">Privacy</Link>
              <Link href="/" className="hover:text-slate-400 transition-colors">Terms</Link>
              <Link href="/" className="hover:text-slate-400 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
