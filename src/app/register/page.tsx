"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { WAREHOUSE_TYPES, UAE_CITIES } from "@/lib/data";
import { CheckCircle2, Building2, Zap, Star, Phone, ClipboardList, MessageCircle, DollarSign, HelpCircle } from "lucide-react";

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showFeeInfo, setShowFeeInfo] = useState(false);

  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    city: "",
    area: "",
    sqft: "",
    emiratesId: "",
  });

  function toggleType(type: string) {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-10 text-center shadow-sm">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="text-emerald-500" size={32} />
          </div>
          <h2 className="font-heading font-bold text-2xl text-slate-900 mb-3">
            Registration Received!
          </h2>
          <p className="text-slate-600 mb-6">
            Your Cargoz partner account is being reviewed. We&apos;ll activate it
            within 24 hours and notify you via WhatsApp. In the meantime, you
            can still browse all open leads.
          </p>
          <Link
            href="/leads"
            className="block w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-colors"
          >
            Browse Open Leads
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* ── Left: Trust Panel ── */}
          <div className="lg:col-span-2 lg:sticky lg:top-24 lg:self-start">
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 mb-3">
              List your warehouse
            </h1>
            <p className="text-slate-600 mb-8">
              Free to register. We only charge a small success fee on confirmed bookings — no upfront cost, ever.
            </p>

            {/* What happens after you register */}
            <div className="space-y-5 mb-8">
              <h3 className="font-heading font-semibold text-sm text-slate-800 uppercase tracking-wider">
                What happens after you register
              </h3>
              {[
                {
                  icon: Phone,
                  title: "Verification call (15 min)",
                  desc: "Our team calls within 24 hours to verify your warehouse details",
                  color: "bg-brand-100 text-brand-600",
                },
                {
                  icon: ClipboardList,
                  title: "Listing goes live",
                  desc: "Your warehouse is visible to our customer network within 48 hours",
                  color: "bg-teal-100 text-teal-600",
                },
                {
                  icon: MessageCircle,
                  title: "Leads on WhatsApp",
                  desc: "New matching leads land directly in your WhatsApp. Quote with one click.",
                  color: "bg-emerald-100 text-emerald-600",
                },
                {
                  icon: DollarSign,
                  title: "First booking",
                  desc: "Most partners receive their first enquiry within 2 weeks of listing",
                  color: "bg-amber-100 text-amber-600",
                },
              ].map((step, i) => (
                <div key={step.title} className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full ${step.color} flex items-center justify-center`}>
                      <step.icon size={18} />
                    </div>
                    {i < 3 && (
                      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-px h-5 bg-slate-200" />
                    )}
                  </div>
                  <div className="pt-1">
                    <p className="font-semibold text-sm text-slate-800">{step.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Commission transparency */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <button
                onClick={() => setShowFeeInfo(!showFeeInfo)}
                className="flex items-center gap-2 w-full text-left"
              >
                <HelpCircle size={16} className="text-brand-500 flex-shrink-0" />
                <span className="font-semibold text-sm text-slate-700">How Cargoz makes money</span>
              </button>
              {showFeeInfo && (
                <p className="mt-2 text-xs text-slate-500 leading-relaxed pl-6">
                  We charge a small success fee on confirmed bookings only. No monthly subscription. No upfront cost. If you don&apos;t earn, we don&apos;t earn.
                </p>
              )}
            </div>

            {/* Partner testimonial */}
            <div className="mt-6 bg-white border border-slate-200 rounded-xl p-5">
              <p className="text-sm text-slate-700 italic leading-relaxed mb-3">
                &ldquo;We went from 40% utilisation to 88% in 8 weeks. The leads come in on WhatsApp — we just respond.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <div>
                  <p className="font-semibold text-sm text-slate-800">Ahmed Al Rashidi</p>
                  <p className="text-xs text-slate-500">Verified partner · RSA Global Logistics · Al Quoz</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
            >
              {/* Section: Company */}
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                <h2 className="font-heading font-semibold text-slate-800 text-sm">
                  Company Details
                </h2>
              </div>
              <div className="p-6 grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Company / Warehouse Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Your company name"
                    value={form.companyName}
                    onChange={(e) =>
                      setForm({ ...form, companyName: e.target.value })
                    }
                    className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Contact Person *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Full name"
                    value={form.contactName}
                    onChange={(e) =>
                      setForm({ ...form, contactName: e.target.value })
                    }
                    className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    WhatsApp / Phone *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+971 50 000 0000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              {/* Section: Warehouse */}
              <div className="px-6 py-4 bg-slate-50 border-y border-slate-200">
                <h2 className="font-heading font-semibold text-slate-800 text-sm">
                  Warehouse Details
                </h2>
              </div>
              <div className="p-6 grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Emirate / City *
                  </label>
                  <select
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                  >
                    <option value="">Select emirate</option>
                    {UAE_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Area / Zone
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Al Quoz, JAFZA, Mussafah"
                    value={form.area}
                    onChange={(e) => setForm({ ...form, area: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Total Area (sqft) *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. 15,000"
                    value={form.sqft}
                    onChange={(e) => setForm({ ...form, sqft: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Trade License / Emirates ID
                  </label>
                  <input
                    type="text"
                    placeholder="License number (optional)"
                    value={form.emiratesId}
                    onChange={(e) =>
                      setForm({ ...form, emiratesId: e.target.value })
                    }
                    className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-2">
                    Types available *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[...WAREHOUSE_TYPES, "Food Grade" as const, "DG Class" as const].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => toggleType(type)}
                        className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                          selectedTypes.includes(type)
                            ? "bg-brand-500 text-white border-brand-500"
                            : "bg-white text-slate-600 border-slate-200 hover:border-brand-300"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="px-6 pb-6">
                <button
                  type="submit"
                  disabled={selectedTypes.length === 0}
                  className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors"
                >
                  Register My Warehouse — Free &rarr;
                </button>
                <p className="text-xs text-center text-slate-400 mt-3">
                  No setup cost. No monthly fee. Small success fee on confirmed bookings only.
                </p>
              </div>
            </form>

            <p className="text-center text-sm text-slate-500 mt-6">
              Already registered?{" "}
              <Link href="/login" className="text-brand-500 font-semibold hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
