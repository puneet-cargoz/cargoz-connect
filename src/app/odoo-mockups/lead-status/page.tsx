import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ArrowLeft, Bell, CheckCircle2, MessageCircle, XCircle } from "lucide-react";

const CHATTER = [
  {
    type: "note",
    avatar: "SM",
    name: "Sarah Mathew",
    time: "Dec 15, 2024 · 10:30 AM",
    content: "Called Ahmed from Al Manarah. Space matches perfectly. Arranging site visit.",
    tag: null,
  },
  {
    type: "note",
    avatar: "SM",
    name: "Sarah Mathew",
    time: "Dec 16, 2024 · 2:15 PM",
    content: "Site visit completed. Customer is happy with location and facility. Moving to negotiation.",
    tag: null,
  },
  {
    type: "won",
    avatar: "SY",
    name: "System",
    time: "Dec 18, 2024 · 4:00 PM",
    content: null,
    tag: "won",
    partner: "Al Manarah Logistics LLC",
    note: "Lead marked as WON. Al Manarah Logistics LLC has been selected as the warehouse partner. Customer signed the contract today.",
  },
  {
    type: "lost-notif",
    avatar: "SY",
    name: "System",
    time: "Dec 18, 2024 · 4:01 PM",
    content: null,
    tag: "lost-notif",
    affectedPartners: ["Gulf Storage Solutions", "Emirates Warehousing Co."],
    note: "Loss notification sent to 2 partners: Gulf Storage Solutions, Emirates Warehousing Co. Lead is now closed.",
  },
];

export default function LeadStatusMockup() {
  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <Link
          href="/odoo-mockups"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-6"
        >
          <ArrowLeft size={14} /> Back to mockups
        </Link>

        {/* Lead header */}
        <div className="bg-white rounded-t-xl border border-slate-300 px-6 py-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 mb-0.5">CRM / Lead · Chatter</div>
            <h1 className="font-heading font-bold text-lg text-slate-900">
              E-commerce — Dry Storage, Al Quoz (L-1001)
            </h1>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full flex items-center gap-1">
              <CheckCircle2 size={11} /> WON
            </span>
          </div>
        </div>

        {/* Status bar */}
        <div className="bg-emerald-50 border-x border-emerald-300 px-6 py-3 flex items-center gap-3">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <p className="text-sm text-emerald-800 font-medium">
            This lead was confirmed on Dec 18, 2024 with{" "}
            <strong>Al Manarah Logistics LLC</strong>. All non-selected partners have been notified.
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white border-x border-slate-300 flex gap-0 overflow-x-auto">
          {["Lead Info", "Log Notes", "Partner", "Activity", "Chatter"].map((tab) => (
            <div
              key={tab}
              className={`px-5 py-3 text-sm font-medium cursor-pointer border-b-2 whitespace-nowrap ${
                tab === "Chatter"
                  ? "border-brand-500 text-brand-600 bg-brand-50/50"
                  : "border-transparent text-slate-500"
              }`}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Chatter */}
        <div className="bg-white border border-slate-300 border-t-0 rounded-b-xl p-6">
          <h2 className="font-heading font-semibold text-slate-800 mb-5 flex items-center gap-2">
            <MessageCircle size={16} className="text-slate-400" />
            Lead Chatter / Activity Log
          </h2>

          <div className="space-y-4">
            {CHATTER.map((c, i) => (
              <div key={i} className="flex gap-3">
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                    c.type === "won"
                      ? "bg-emerald-100 text-emerald-700"
                      : c.type === "lost-notif"
                      ? "bg-red-100 text-red-600"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {c.avatar}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-semibold text-slate-700">{c.name}</span>
                    <span className="text-xs text-slate-400">{c.time}</span>
                  </div>

                  {/* Regular note */}
                  {c.type === "note" && (
                    <div className="bg-slate-50 rounded-xl p-3 text-sm text-slate-700">
                      {c.content}
                    </div>
                  )}

                  {/* WON status entry */}
                  {c.type === "won" && (
                    <div className="border border-emerald-300 bg-emerald-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 size={16} className="text-emerald-600" />
                        <span className="font-semibold text-emerald-800 text-sm">
                          Lead Status Changed → WON
                        </span>
                      </div>
                      <p className="text-sm text-emerald-800 mb-3">{c.note}</p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-medium">
                          <Bell size={10} />
                          Notification sent to: {c.partner}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* LOST notification entry */}
                  {c.type === "lost-notif" && (
                    <div className="border border-red-200 bg-red-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <XCircle size={16} className="text-red-500" />
                        <span className="font-semibold text-red-700 text-sm">
                          Loss Notifications Sent
                        </span>
                      </div>
                      <p className="text-sm text-red-700 mb-3">{c.note}</p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        {c.affectedPartners?.map((p) => (
                          <span
                            key={p}
                            className="flex items-center gap-1 bg-red-100 text-red-600 px-2.5 py-1 rounded-full font-medium"
                          >
                            <Bell size={10} /> {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add status change */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Change Lead Status</h3>
            <div className="flex flex-wrap gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg transition-colors">
                <CheckCircle2 size={13} />
                Mark as WON
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-colors">
                <XCircle size={13} />
                Mark as LOST
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Changing status will automatically notify all attached registered warehouse partners.
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
          <strong>Mockup note:</strong> When a sales rep marks a lead as Won or Lost in ODOO,
          the system auto-creates a chatter entry with the status, adds a comment noting which
          partner was selected (for Won), and sends portal notifications to all associated
          registered warehouse partners. Unregistered partners receive no notifications.
        </div>
      </div>
    </div>
  );
}
