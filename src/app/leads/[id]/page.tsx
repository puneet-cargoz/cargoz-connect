"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { MOCK_LEADS } from "@/lib/data";
import {
  MapPin,
  Building2,
  Clock,
  TrendingUp,
  ArrowLeft,
  MessageCircle,
  Lock,
  CheckCircle2,
  Info,
  ShieldCheck,
  Search,
  Users,
} from "lucide-react";

const TYPE_COLORS: Record<string, string> = {
  Dry:         "bg-amber-100 text-amber-800 border-amber-200",
  Chiller:     "bg-blue-100 text-blue-800 border-blue-200",
  AC:          "bg-purple-100 text-purple-800 border-purple-200",
  "Open Yard": "bg-green-100 text-green-800 border-green-200",
};

export default function LeadDetailPage() {
  const { id } = useParams<{ id: string }>();
  const lead = MOCK_LEADS.find((l) => l.id === id);

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    location: "",
    sqft: "",
    quote: "",
    notes: "",
  });

  if (!lead) return notFound();

  const isOpen = lead.status === "Open";
  const isHighActivity = lead.responses >= 5;
  const durationMonths = parseInt(lead.duration) || 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const whatsappText = encodeURIComponent(
      `Hi, I'm interested in Lead ${lead!.id} (${lead!.warehouseType} - ${lead!.area}, ${lead!.city}).\n\nCompany: ${form.companyName}\nContact: ${form.contactName}\nWarehouse: ${form.sqft} sqft in ${form.location}\nQuoted Price: ${form.quote}\n\n${form.notes}`
    );
    window.open(`https://wa.me/971544462859?text=${whatsappText}`, "_blank");
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Back */}
        <Link
          href="/leads"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-6 transition-colors"
        >
          <ArrowLeft size={15} />
          Back to all leads
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ── Lead Details ── */}
          <div className="lg:col-span-2 space-y-5">
            {/* Customer signal card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">
                    {lead.industry.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-heading font-semibold text-slate-900 text-sm">
                      {lead.industry} company
                    </h3>
                    <span className="flex items-center gap-1 text-xs text-teal-600 font-medium">
                      <ShieldCheck size={12} />
                      Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">
                    Mid-sized {lead.industry.split(" ")[0].toLowerCase()} company · Enquiry submitted via Cargoz platform · Identity shared after connection
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                      {lead.warehouseType} storage
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                      UAE-based
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                      {durationMonths >= 12 ? "Long-term intent" : "Short-term"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main lead detail */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              {/* Status badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                    TYPE_COLORS[lead.warehouseType]
                  }`}
                >
                  {lead.warehouseType}
                </span>
                {isOpen && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Open
                  </span>
                )}
                {isHighActivity && isOpen && (
                  <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 border border-orange-200">
                    🔥 High activity
                  </span>
                )}
                <span className="text-xs text-slate-400 ml-auto">
                  Lead #{lead.id}
                </span>
              </div>

              <h1 className="font-heading font-bold text-2xl text-slate-900 mb-2">
                {lead.industry} — {lead.warehouseType} Storage Required
              </h1>

              <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-5">
                <MapPin size={14} />
                {lead.area}, {lead.city}
              </div>

              <p className="text-slate-700 leading-relaxed mb-6">{lead.description}</p>

              {/* Meta grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Space Required", value: lead.sqft, icon: Building2 },
                  { label: "Duration", value: lead.duration, icon: Clock },
                  { label: "Posted", value: `${lead.postedDays}d ago`, icon: TrendingUp },
                  { label: "Quotes so far", value: `${lead.responses} — act fast`, icon: MessageCircle, urgent: true },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="bg-slate-50 rounded-xl p-3 border border-slate-100"
                  >
                    <m.icon size={14} className="text-slate-400 mb-1" />
                    <div className="text-xs text-slate-500 mb-0.5">{m.label}</div>
                    <div className={`font-semibold text-sm ${m.urgent ? "text-amber-600" : "text-slate-900"}`}>
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status notice for non-open leads */}
            {!isOpen && (
              <div
                className={`rounded-2xl p-5 border flex items-start gap-3 ${
                  lead.status === "Confirmed"
                    ? "bg-brand-50 border-brand-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                {lead.status === "Confirmed" ? (
                  <CheckCircle2 className="text-brand-500 shrink-0 mt-0.5" size={18} />
                ) : (
                  <Info className="text-red-400 shrink-0 mt-0.5" size={18} />
                )}
                <div>
                  <div className="font-semibold text-sm mb-1 text-slate-800">
                    {lead.status === "Confirmed"
                      ? "This lead has been confirmed"
                      : "This lead is closed"}
                  </div>
                  <div className="text-sm text-slate-600">
                    {lead.status === "Confirmed"
                      ? "A warehouse partner has been selected. Registered partners were notified."
                      : "This requirement was not fulfilled. Registered partners received a notification."}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Quote Form ── */}
          <div className="lg:col-span-1">
            {!isOpen ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center">
                <Lock size={28} className="text-slate-300 mx-auto mb-3" />
                <h3 className="font-heading font-semibold text-slate-700 mb-2">
                  Lead No Longer Active
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                  Register to get notified as soon as similar leads go live.
                </p>
                <Link
                  href="/register"
                  className="block w-full py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-xl text-center transition-colors"
                >
                  Register Free
                </Link>
              </div>
            ) : submitted ? (
              /* ── Post-quote confirmation (§9) ── */
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="p-6 text-center border-b border-slate-100">
                  <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="text-emerald-500" size={28} />
                  </div>
                  <h3 className="font-heading font-bold text-slate-900 text-lg mb-2">
                    Quote submitted — Lead #{lead.id}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Your pitch has been received. A Cargoz rep is reviewing it now and will connect you with the customer on WhatsApp within <span className="font-semibold text-brand-600">2 hours</span>.
                  </p>
                </div>

                {/* What happens next timeline */}
                <div className="p-6">
                  <h4 className="font-heading font-semibold text-sm text-slate-700 mb-4">What happens next</h4>
                  <div className="space-y-4">
                    {[
                      {
                        icon: Search,
                        title: "Quote under review",
                        desc: "Our team checks your warehouse matches the requirement",
                        color: "bg-brand-100 text-brand-600",
                      },
                      {
                        icon: MessageCircle,
                        title: "WhatsApp connection",
                        desc: "We'll intro you and the customer within 2 hours — check your WhatsApp",
                        color: "bg-emerald-100 text-emerald-600",
                      },
                      {
                        icon: Users,
                        title: "Direct negotiation",
                        desc: "You set the final terms — no broker, no commission on the negotiation",
                        color: "bg-teal-100 text-teal-600",
                      },
                    ].map((step, i) => (
                      <div key={step.title} className="flex items-start gap-3">
                        <div className="relative flex-shrink-0">
                          <div className={`w-9 h-9 rounded-full ${step.color} flex items-center justify-center`}>
                            <step.icon size={16} />
                          </div>
                          {i < 2 && (
                            <div className="absolute top-9 left-1/2 -translate-x-1/2 w-px h-4 bg-slate-200" />
                          )}
                        </div>
                        <div className="pt-1">
                          <p className="font-semibold text-sm text-slate-800">{step.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="px-6 pb-6 flex flex-col gap-2">
                  <Link
                    href="/dashboard"
                    className="block w-full py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-xl text-center transition-colors"
                  >
                    View My Quotes Dashboard
                  </Link>
                  <Link
                    href="/leads"
                    className="block w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl text-center transition-colors"
                  >
                    Browse More Leads
                  </Link>
                </div>
              </div>
            ) : (
              /* ── Quote form with SLA (§8) ── */
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="px-5 py-4 bg-brand-500">
                  <h2 className="font-heading font-bold text-white text-base">
                    Respond to this lead
                  </h2>
                  <p className="text-brand-200 text-xs mt-0.5">
                    Registered partner · Unlimited quotes · WhatsApp alerts active
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Company Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Your warehouse company name"
                      value={form.companyName}
                      onChange={(e) =>
                        setForm({ ...form, companyName: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Contact Person *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Your name"
                      value={form.contactName}
                      onChange={(e) =>
                        setForm({ ...form, contactName: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Warehouse Location *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Al Quoz, Dubai"
                      value={form.location}
                      onChange={(e) =>
                        setForm({ ...form, location: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Available Area (sqft) *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. 8,000 sqft"
                      value={form.sqft}
                      onChange={(e) =>
                        setForm({ ...form, sqft: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Quoted Price *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. AED 12/sqft/month or AED 80,000/month"
                      value={form.quote}
                      onChange={(e) =>
                        setForm({ ...form, quote: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Additional Notes <span className="font-normal text-slate-400">optional</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Any special features, certifications, or availability details..."
                      value={form.notes}
                      onChange={(e) =>
                        setForm({ ...form, notes: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors"
                  >
                    <MessageCircle size={16} />
                    Submit & Connect on WhatsApp
                  </button>

                  {/* SLA line */}
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <Clock size={14} className="text-brand-500 flex-shrink-0" />
                    <p className="text-xs text-slate-600">
                      A Cargoz rep will connect you with this customer on WhatsApp within <span className="font-semibold text-brand-600">2 hours</span>
                    </p>
                  </div>

                  {/* What happens next */}
                  <div className="border-t border-slate-100 pt-4 mt-2">
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">What happens next</h4>
                    <div className="space-y-2.5">
                      {[
                        "Your quote is reviewed by our team",
                        "We shortlist and connect you with the customer on WhatsApp",
                        "You negotiate directly — no middleman on pricing",
                      ].map((step, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">
                            {i + 1}
                          </span>
                          <span className="text-xs text-slate-600 leading-relaxed">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
