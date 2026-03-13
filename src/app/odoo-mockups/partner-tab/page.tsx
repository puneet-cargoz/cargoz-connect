import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ArrowLeft, MessageCircle, Plus, Star, User } from "lucide-react";

const PARTNER_RESPONSES = [
  {
    id: 1,
    partner: "Al Manarah Logistics LLC",
    contact: "Ahmed Al Rashidi",
    phone: "+971 50 123 4567",
    sqft: "15,000",
    location: "Al Quoz, Dubai",
    quote: "AED 14/sqft/month",
    notes: "24/7 access, CCTV, loading dock available. Can accommodate from next week.",
    time: "2 hours ago",
    status: "Shortlisted",
    avatar: "AM",
  },
  {
    id: 2,
    partner: "Gulf Storage Solutions",
    contact: "Ravi Menon",
    phone: "+971 55 987 6543",
    sqft: "12,000",
    location: "DIP, Dubai",
    quote: "AED 12/sqft/month",
    notes: "Racking system included. HACCP certified for food storage.",
    time: "5 hours ago",
    status: "Pending",
    avatar: "GS",
  },
  {
    id: 3,
    partner: "Emirates Warehousing Co.",
    contact: "Faisal Al Hamdan",
    phone: "+971 54 321 0987",
    sqft: "20,000",
    location: "Jebel Ali, Dubai",
    quote: "AED 10/sqft/month",
    notes: "Large space available. Flexible on lease terms.",
    time: "1 day ago",
    status: "Pending",
    avatar: "EW",
  },
];

const SALES_NOTES = [
  {
    rep: "Sarah Mathew",
    avatar: "SM",
    note: "Called Ahmed from Al Manarah — space is available immediately, suitable for e-commerce. Recommended shortlisting.",
    time: "1 hour ago",
  },
  {
    rep: "Sarah Mathew",
    avatar: "SM",
    note: "Customer confirmed they can visit the warehouse on Thursday. Arranged site visit with Al Manarah.",
    time: "30 minutes ago",
  },
];

const STATUS_STYLE: Record<string, string> = {
  Shortlisted: "bg-teal-50 text-teal-700 border border-teal-200",
  Pending:     "bg-slate-100 text-slate-600",
  Won:         "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Lost:        "bg-red-50 text-red-500 border border-red-200",
};

export default function PartnerTabMockup() {
  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <Link
          href="/odoo-mockups"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-6"
        >
          <ArrowLeft size={14} /> Back to mockups
        </Link>

        {/* ODOO-style header */}
        <div className="bg-white rounded-t-xl border border-slate-300 px-6 py-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 mb-0.5">CRM / Lead</div>
            <h1 className="font-heading font-bold text-lg text-slate-900">
              E-commerce — Dry Storage, Al Quoz (L-1001)
            </h1>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">Open</span>
            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">4 Partners</span>
          </div>
        </div>

        {/* Tabs row — ODOO-style */}
        <div className="bg-white border-x border-slate-300 flex gap-0 overflow-x-auto">
          {["Lead Info", "Log Notes", "Partner", "Activity", "Attachments"].map((tab) => (
            <div
              key={tab}
              className={`px-5 py-3 text-sm font-medium cursor-pointer border-b-2 whitespace-nowrap transition-colors ${
                tab === "Partner"
                  ? "border-brand-500 text-brand-600 bg-brand-50/50"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
              {tab === "Partner" && (
                <span className="ml-1.5 text-xs bg-brand-500 text-white px-1.5 py-0.5 rounded-full">
                  3
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Partner tab content */}
        <div className="bg-white border border-slate-300 border-t-0 rounded-b-xl p-6">
          {/* Section: Partner Responses */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-slate-800 text-base flex items-center gap-2">
              <User size={16} className="text-brand-500" />
              Partner Responses
            </h2>
            <button className="flex items-center gap-1.5 text-xs text-brand-500 font-semibold hover:text-brand-600 border border-brand-200 px-3 py-1.5 rounded-lg">
              <Plus size={12} />
              Add Partner Manually
            </button>
          </div>

          <div className="space-y-4 mb-8">
            {PARTNER_RESPONSES.map((p) => (
              <div
                key={p.id}
                className="border border-slate-200 rounded-xl p-4 hover:border-brand-200 transition-colors"
              >
                <div className="flex flex-wrap items-start gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-600 font-bold text-xs flex items-center justify-center shrink-0">
                    {p.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-sm text-slate-900">{p.partner}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLE[p.status]}`}>
                        {p.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {p.contact} · {p.phone}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs text-slate-400">{p.time}</div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-4 gap-3 text-xs mb-3">
                  <div><span className="text-slate-400">Location:</span> <span className="font-medium text-slate-700">{p.location}</span></div>
                  <div><span className="text-slate-400">Area:</span> <span className="font-medium text-slate-700">{p.sqft} sqft</span></div>
                  <div><span className="text-slate-400">Quoted:</span> <span className="font-semibold text-brand-600">{p.quote}</span></div>
                </div>

                <p className="text-xs text-slate-600 bg-slate-50 rounded-lg p-2.5 italic mb-3">
                  &quot;{p.notes}&quot;
                </p>

                <div className="flex gap-2 flex-wrap">
                  <button className="text-xs px-3 py-1.5 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors flex items-center gap-1">
                    <Star size={11} /> Shortlist
                  </button>
                  <a
                    href="https://wa.me/971544462859"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors flex items-center gap-1"
                  >
                    <MessageCircle size={11} /> WhatsApp
                  </a>
                  <button className="text-xs px-3 py-1.5 border border-red-200 text-red-500 hover:bg-red-50 font-medium rounded-lg transition-colors">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Section: Sales Rep Notes */}
          <div>
            <h2 className="font-heading font-semibold text-slate-800 text-base flex items-center gap-2 mb-4">
              <MessageCircle size={16} className="text-slate-400" />
              Sales Rep Notes
              <span className="text-xs text-slate-400 font-normal">(visible to registered warehouse partners)</span>
            </h2>

            <div className="space-y-3 mb-4">
              {SALES_NOTES.map((note, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 font-bold text-xs flex items-center justify-center shrink-0">
                    {note.avatar}
                  </div>
                  <div className="flex-1 bg-slate-50 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-slate-700">{note.rep}</span>
                      <span className="text-xs text-slate-400">{note.time}</span>
                    </div>
                    <p className="text-sm text-slate-700">{note.note}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add note input */}
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 font-bold text-xs flex items-center justify-center shrink-0 mt-1">
                SM
              </div>
              <div className="flex-1">
                <textarea
                  rows={2}
                  placeholder="Add a note visible to associated warehouse partners…"
                  className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-brand-400"
                />
                <div className="flex items-center gap-2 mt-2">
                  <button className="text-xs px-4 py-1.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-lg transition-colors">
                    Add Note
                  </button>
                  <label className="flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer">
                    <input type="checkbox" className="rounded" defaultChecked />
                    Notify all associated partners
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Design note */}
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
          <strong>Mockup note:</strong> This shows the new &quot;Partner&quot; tab on the ODOO lead
          record. Partner responses submitted via the web portal auto-populate this tab.
          Sales rep notes added here are visible to all registered warehouse partners
          who are attached to this lead in their portal dashboard.
        </div>
      </div>
    </div>
  );
}
