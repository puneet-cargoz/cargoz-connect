"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin, Star, CheckCircle, Shield, Thermometer, Package,
  Phone, MessageCircle, ArrowLeft, ChevronRight, Calendar,
  Ruler, Clock, Award, Check, Building2
} from "lucide-react";
import { MOCK_WAREHOUSES } from "@/lib/data";
import { use } from "react";

const TEMP_COLORS: Record<string, string> = {
  "Ambient": "bg-slate-100 text-slate-700",
  "AC": "bg-blue-50 text-blue-700",
  "Chiller": "bg-cyan-50 text-cyan-700",
  "Cold Storage": "bg-indigo-50 text-indigo-700",
  "Frozen": "bg-violet-50 text-violet-700",
};

const SPEC_GRADIENTS: Record<string, string> = {
  "General Cargo": "from-slate-400 to-slate-600",
  "Food Grade": "from-emerald-400 to-emerald-600",
  "Dangerous Goods": "from-orange-400 to-orange-600",
  "Pharmaceutical": "from-blue-400 to-blue-600",
  "Chemical": "from-purple-400 to-purple-600",
  "E-commerce": "from-brand-400 to-brand-600",
};

export default function WarehouseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const warehouse = MOCK_WAREHOUSES.find((w) => w.id === id);

  if (!warehouse) notFound();

  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    sqft: "",
    duration: "",
    moveIn: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const gradientClass = SPEC_GRADIENTS[warehouse.specialization] ?? "from-slate-400 to-slate-600";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappMsg = encodeURIComponent(
    `Hi, I'm interested in ${warehouse.name} (${warehouse.id}) at ${warehouse.location}. ` +
    `I need ${form.sqft || "some"} sqft for ${form.duration || "a few months"}.`
  );

  const galleryImages = [
    { label: "Main Area", gradient: gradientClass },
    { label: "Racking / Storage", gradient: "from-slate-300 to-slate-500" },
    { label: "Loading Bay", gradient: "from-teal-300 to-teal-600" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/warehouses" className="hover:text-brand-600 transition-colors">Find Storage</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-800 font-medium">{warehouse.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <Link
          href="/warehouses"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to search results
        </Link>

        <div className="flex gap-8 flex-col lg:flex-row">
          {/* ── Left column ── */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {warehouse.verified && (
                      <span className="flex items-center gap-1 bg-teal-50 text-teal-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${TEMP_COLORS[warehouse.temperature]}`}>
                      <Thermometer className="w-3 h-3 inline mr-0.5" />
                      {warehouse.temperature}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-brand-50 text-brand-700">
                      {warehouse.specialization}
                    </span>
                  </div>
                  <h1 className="font-heading text-2xl font-bold text-slate-900">
                    {warehouse.name}
                  </h1>
                  <div className="flex items-center gap-1.5 mt-1 text-slate-500">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">{warehouse.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="font-semibold text-slate-800">{warehouse.rating}</span>
                    <span className="text-slate-400 text-sm">({warehouse.reviewCount} reviews)</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5">{warehouse.id}</p>
                </div>
              </div>
            </div>

            {/* Image gallery */}
            <div className="grid grid-cols-3 gap-3">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  className={`bg-gradient-to-br ${img.gradient} rounded-2xl ${
                    i === 0 ? "col-span-2 row-span-2" : ""
                  } flex flex-col items-center justify-center text-white/70 aspect-video`}
                  style={i === 0 ? { aspectRatio: "16/9" } : {}}
                >
                  <Package className="w-10 h-10 mb-2 opacity-50" />
                  <span className="text-xs font-medium opacity-70">{img.label}</span>
                </div>
              ))}
            </div>

            {/* Specs grid */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="font-heading font-semibold text-slate-900 text-lg mb-4">
                Warehouse Specifications
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { icon: <Ruler className="w-4 h-4" />, label: "Space Available", value: `${warehouse.minSqft.toLocaleString()} – ${warehouse.maxSqft.toLocaleString()} sqft` },
                  { icon: <Thermometer className="w-4 h-4" />, label: "Temperature", value: warehouse.temperature },
                  { icon: <Package className="w-4 h-4" />, label: "Storage Format", value: warehouse.storageFormat },
                  { icon: <Building2 className="w-4 h-4" />, label: "Specialization", value: warehouse.specialization },
                  { icon: <Clock className="w-4 h-4" />, label: "Min. Contract", value: warehouse.minContract },
                  { icon: <Award className="w-4 h-4" />, label: "Price From", value: `AED ${warehouse.pricePerCbm}/CBM/day` },
                ].map((spec) => (
                  <div key={spec.label} className="bg-slate-50 rounded-xl p-3">
                    <div className="flex items-center gap-1.5 text-brand-500 mb-1">
                      {spec.icon}
                      <span className="text-xs font-medium text-slate-500">{spec.label}</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="font-heading font-semibold text-slate-900 text-lg mb-4">
                Facilities & Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {warehouse.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-emerald-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-sm text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            {warehouse.certifications.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="font-heading font-semibold text-slate-900 text-lg mb-4">
                  Certifications & Approvals
                </h2>
                <div className="flex flex-wrap gap-2">
                  {warehouse.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-full border border-emerald-100"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Location info */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="font-heading font-semibold text-slate-900 text-lg mb-3">
                Location
              </h2>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-800">{warehouse.area}</p>
                  <p className="text-sm text-slate-500">{warehouse.city}, UAE</p>
                  <Link
                    href={`/warehouses?city=${warehouse.city}`}
                    className="text-sm text-brand-600 hover:text-brand-700 mt-1 inline-block"
                  >
                    View more warehouses in {warehouse.city} →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right column: Enquiry form ── */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              {/* Pricing summary */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-heading text-2xl font-bold text-slate-900">
                    AED {warehouse.pricePerCbm.toFixed(2)}
                  </span>
                  <span className="text-slate-500 text-sm">/CBM/day + VAT</span>
                </div>
                <p className="text-sm text-slate-500 mb-4">
                  From AED {warehouse.pricePerSqft}/sqft/month · Min. {warehouse.minContract}
                </p>

                {/* Instant WhatsApp */}
                <a
                  href={`https://wa.me/971544462859?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold rounded-xl transition-colors mb-3"
                >
                  <MessageCircle className="w-5 h-5" />
                  Connect on WhatsApp
                </a>

                <a
                  href="tel:800665544"
                  className="flex items-center justify-center gap-2 w-full py-2.5 border border-slate-200 hover:border-brand-300 text-slate-700 font-medium rounded-xl transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  Call 800 665544
                </a>

                <div className="flex items-center gap-2 mt-4">
                  <div className="h-px flex-1 bg-slate-100" />
                  <span className="text-xs text-slate-400">or submit an enquiry</span>
                  <div className="h-px flex-1 bg-slate-100" />
                </div>
              </div>

              {/* Enquiry form */}
              {submitted ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center">
                  <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="font-heading font-bold text-slate-900 text-lg mb-1">
                    Enquiry Received!
                  </h3>
                  <p className="text-slate-500 text-sm mb-4">
                    Our team will contact you within 2 hours during business hours.
                  </p>
                  <a
                    href={`https://wa.me/971544462859?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold rounded-xl transition-colors text-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Also reach us on WhatsApp
                  </a>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3"
                >
                  <h3 className="font-heading font-semibold text-slate-900">
                    Get a Quote
                  </h3>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-medium text-slate-500 mb-1 block">
                        Your Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 mb-1 block">
                        Company *
                      </label>
                      <input
                        required
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                        placeholder="ACME LLC"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-1 block">
                      Phone / WhatsApp *
                    </label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                      placeholder="+971 50 000 0000"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-1 block">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                      placeholder="you@company.com"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-medium text-slate-500 mb-1 block">
                        Space Required
                      </label>
                      <input
                        type="text"
                        value={form.sqft}
                        onChange={(e) => setForm((f) => ({ ...f, sqft: e.target.value }))}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                        placeholder="e.g. 2,000 sqft"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 mb-1 block">
                        Duration
                      </label>
                      <select
                        value={form.duration}
                        onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none bg-white"
                      >
                        <option value="">Select</option>
                        <option value="1 month">1 month</option>
                        <option value="3 months">3 months</option>
                        <option value="6 months">6 months</option>
                        <option value="12 months">12 months</option>
                        <option value="24+ months">24+ months</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-1 block">
                      Preferred Move-In Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="date"
                        value={form.moveIn}
                        onChange={(e) => setForm((f) => ({ ...f, moveIn: e.target.value }))}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-1 block">
                      Additional Notes
                    </label>
                    <textarea
                      rows={2}
                      value={form.notes}
                      onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none resize-none"
                      placeholder="Any special requirements…"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-colors text-sm shadow-sm"
                  >
                    Send Enquiry
                  </button>

                  <p className="text-xs text-slate-400 text-center">
                    No commitment — our team will get back to you within 2 hours
                  </p>
                </form>
              )}

              {/* Trust signals */}
              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4 space-y-2">
                {[
                  "No brokerage fees",
                  "Verified warehouses only",
                  "Connect within 24 hours",
                  "Flexible contracts available",
                ].map((trust) => (
                  <div key={trust} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-teal-500 flex-shrink-0" />
                    {trust}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
