"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { MOCK_LEADS } from "@/lib/data";
import {
  Bell,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  Info,
  MapPin,
  MessageCircle,
  TrendingUp,
  XCircle,
  Zap,
} from "lucide-react";

// Mock registered partner data
const PARTNER = {
  companyName: "Al Manarah Logistics LLC",
  contactName: "Ahmed Al Rashidi",
  city: "Dubai",
  area: "Al Quoz",
  sqft: 15000,
  types: ["Dry", "AC"],
};

// Mock activity for this partner
const MY_LEADS = [
  { ...MOCK_LEADS[0], myStatus: "Quoted", myQuote: "AED 14/sqft/month" },
  { ...MOCK_LEADS[1], myStatus: "Shortlisted", myQuote: "AED 22/sqft/month" },
  { ...MOCK_LEADS[4], myStatus: "Quoted", myQuote: "AED 11/sqft/month" },
  { ...MOCK_LEADS[10], myStatus: "Won", myQuote: "AED 25/sqft/month" },
  { ...MOCK_LEADS[11], myStatus: "Lost", myQuote: "AED 18/sqft/month" },
];

const NOTIFICATIONS = [
  {
    id: 1,
    type: "shortlisted",
    message: "You've been shortlisted for Lead #L-1002 (Chiller, JAFZA, Dubai)",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "won",
    message: "Congratulations! Lead #L-1011 has been confirmed with you.",
    time: "1 day ago",
    read: false,
  },
  {
    id: 3,
    type: "lost",
    message: "Lead #L-1012 has been closed. Another partner was selected.",
    time: "3 days ago",
    read: true,
  },
  {
    id: 4,
    type: "update",
    message: "Sales rep added a note on Lead #L-1001: Customer is flexible on move-in date.",
    time: "4 days ago",
    read: true,
  },
];

const STATUS_STYLE: Record<string, string> = {
  Quoted:      "bg-brand-50 text-brand-600 border border-brand-200",
  Shortlisted: "bg-teal-50 text-teal-600 border border-teal-200",
  Won:         "bg-emerald-50 text-emerald-600 border border-emerald-200",
  Lost:        "bg-red-50 text-red-500 border border-red-200",
};

const NOTIF_ICON: Record<string, JSX.Element> = {
  shortlisted: <Zap size={14} className="text-teal-500" />,
  won:         <CheckCircle2 size={14} className="text-emerald-500" />,
  lost:        <XCircle size={14} className="text-red-400" />,
  update:      <Info size={14} className="text-brand-400" />,
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"leads" | "notifications" | "profile">(
    "leads"
  );
  const unread = NOTIFICATIONS.filter((n) => !n.read).length;

  const stats = [
    { label: "Active Quotes", value: MY_LEADS.filter((l) => l.myStatus === "Quoted").length, icon: TrendingUp, color: "text-brand-500" },
    { label: "Shortlisted", value: MY_LEADS.filter((l) => l.myStatus === "Shortlisted").length, icon: Zap, color: "text-teal-500" },
    { label: "Won", value: MY_LEADS.filter((l) => l.myStatus === "Won").length, icon: CheckCircle2, color: "text-emerald-500" },
    { label: "Lost", value: MY_LEADS.filter((l) => l.myStatus === "Lost").length, icon: XCircle, color: "text-red-400" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Page header */}
      <div className="bg-white border-b border-slate-200 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading font-bold text-2xl text-slate-900">
                Partner Dashboard
              </h1>
              <p className="text-slate-500 text-sm mt-0.5">
                Welcome back, {PARTNER.contactName}
              </p>
            </div>
            <Link
              href="/leads"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              <Zap size={14} />
              Browse New Leads
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-4">
              <s.icon size={20} className={`mb-2 ${s.color}`} />
              <div className="font-heading font-bold text-2xl text-slate-900">{s.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-6 w-fit">
          {(["leads", "notifications", "profile"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all capitalize ${
                activeTab === tab
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
              {tab === "notifications" && unread > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-brand-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unread}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Leads Tab ── */}
        {activeTab === "leads" && (
          <div className="space-y-4">
            {MY_LEADS.map((lead) => (
              <div
                key={lead.id}
                className="bg-white rounded-2xl border border-slate-200 p-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="font-heading font-semibold text-slate-900 text-sm">
                        {lead.industry} — {lead.warehouseType} Storage
                      </span>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          STATUS_STYLE[lead.myStatus]
                        }`}
                      >
                        {lead.myStatus}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={11} />
                        {lead.area}, {lead.city}
                      </span>
                      <span className="flex items-center gap-1">
                        <Building2 size={11} />
                        {lead.sqft}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {lead.duration}
                      </span>
                      <span className="text-slate-400">#{lead.id}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <div className="text-xs text-slate-400 mb-0.5">Your Quote</div>
                      <div className="font-semibold text-sm text-slate-800">
                        {lead.myQuote}
                      </div>
                    </div>
                    {lead.myStatus !== "Lost" && (
                      <Link
                        href={`/leads/${lead.id}`}
                        className="p-2 bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-200 rounded-lg transition-colors text-slate-500 hover:text-brand-500"
                      >
                        <ChevronRight size={16} />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Status note for won/lost */}
                {lead.myStatus === "Won" && (
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-start gap-2 text-xs text-emerald-700">
                    <CheckCircle2 size={13} className="mt-0.5 shrink-0" />
                    <span>
                      Your warehouse was selected for this customer. Cargoz sales rep will
                      coordinate the next steps.
                    </span>
                  </div>
                )}
                {lead.myStatus === "Lost" && (
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-start gap-2 text-xs text-red-500">
                    <XCircle size={13} className="mt-0.5 shrink-0" />
                    <span>
                      This lead was awarded to another partner. Keep quoting — new leads
                      arrive daily.
                    </span>
                  </div>
                )}
              </div>
            ))}

            <div className="text-center pt-4">
              <Link
                href="/leads"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Browse More Open Leads
                <ChevronRight size={15} />
              </Link>
            </div>
          </div>
        )}

        {/* ── Notifications Tab ── */}
        {activeTab === "notifications" && (
          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
            {NOTIFICATIONS.map((n) => (
              <div
                key={n.id}
                className={`flex items-start gap-3 p-4 ${
                  !n.read ? "bg-brand-50/40" : ""
                }`}
              >
                <div className="mt-0.5 shrink-0 w-6 h-6 flex items-center justify-center">
                  {NOTIF_ICON[n.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm leading-relaxed ${!n.read ? "text-slate-900 font-medium" : "text-slate-600"}`}>
                    {n.message}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{n.time}</p>
                </div>
                {!n.read && (
                  <span className="h-2 w-2 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Profile Tab ── */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h2 className="font-heading font-semibold text-slate-800 text-sm">
                Warehouse Profile
              </h2>
              <button className="text-xs text-brand-500 font-semibold hover:text-brand-600">
                Edit
              </button>
            </div>
            <div className="p-6 grid sm:grid-cols-2 gap-5">
              {[
                { label: "Company Name", value: PARTNER.companyName },
                { label: "Contact Person", value: PARTNER.contactName },
                { label: "City", value: PARTNER.city },
                { label: "Area / Zone", value: PARTNER.area },
                { label: "Total Area", value: `${PARTNER.sqft.toLocaleString()} sqft` },
                { label: "Warehouse Types", value: PARTNER.types.join(", ") },
              ].map((f) => (
                <div key={f.label}>
                  <div className="text-xs text-slate-400 mb-0.5">{f.label}</div>
                  <div className="text-sm font-medium text-slate-800">{f.value}</div>
                </div>
              ))}
            </div>

            <div className="px-6 pb-6">
              <div className="flex items-center gap-2 p-3 bg-teal-50 border border-teal-200 rounded-xl">
                <MessageCircle size={16} className="text-teal-500 shrink-0" />
                <p className="text-xs text-teal-700">
                  Your Cargoz sales rep:{" "}
                  <strong>Sarah Mathew</strong> — available on WhatsApp
                </p>
                <a
                  href="https://wa.me/971544462859"
                  target="_blank"
                  rel="noreferrer"
                  className="ml-auto text-xs font-semibold text-teal-600 hover:text-teal-700 shrink-0"
                >
                  Message →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
