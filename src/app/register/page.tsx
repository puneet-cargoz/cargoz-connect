"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { WAREHOUSE_TYPES, UAE_CITIES } from "@/lib/data";
import { CheckCircle2, Building2, Zap, Star } from "lucide-react";

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

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
    // POST to /api/register in production
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

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 mb-3">
            Register Your Warehouse
          </h1>
          <p className="text-slate-600">
            Join 180+ warehouse partners and start connecting with verified
            customers across the UAE.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { icon: Zap, text: "Instant lead notifications" },
            { icon: Building2, text: "Unlimited daily quotes" },
            { icon: Star, text: "Real-time lead tracking" },
          ].map((b) => (
            <div
              key={b.text}
              className="bg-brand-50 border border-brand-100 rounded-xl p-3 text-center"
            >
              <b.icon size={18} className="text-brand-500 mx-auto mb-1.5" />
              <p className="text-xs font-medium text-brand-700">{b.text}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
        >
          {/* Section: Company */}
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
            <h2 className="font-heading font-semibold text-slate-800 text-sm">
              Company Information
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
                Total Warehouse Area (sqft) *
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
                Warehouse Types Available *
              </label>
              <div className="flex flex-wrap gap-2">
                {WAREHOUSE_TYPES.map((type) => (
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
              Register My Warehouse — Free
            </button>
            <p className="text-xs text-center text-slate-400 mt-3">
              By registering, you agree to Cargoz&apos;s{" "}
              <Link href="#" className="text-brand-500 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-brand-500 hover:underline">
                Privacy Policy
              </Link>
              .
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
  );
}
