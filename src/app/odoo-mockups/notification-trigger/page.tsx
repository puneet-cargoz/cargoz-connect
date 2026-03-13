import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ArrowLeft, Bell, CheckCircle2, MessageCircle, Send } from "lucide-react";

const ATTACHED_PARTNERS = [
  { id: "W-001", company: "Al Manarah Logistics LLC", contact: "Ahmed Al Rashidi", phone: "+971 50 123 4567", status: "Shortlisted", notified: true },
  { id: "W-002", company: "Gulf Storage Solutions", contact: "Ravi Menon", phone: "+971 55 987 6543", status: "Pending", notified: false },
  { id: "W-003", company: "Emirates Warehousing Co.", contact: "Faisal Al Hamdan", phone: "+971 54 321 0987", status: "Pending", notified: false },
];

const NOTIFICATION_TEMPLATES = [
  { id: 1, label: "Lead Update", text: "There is a new update on Lead #L-1001 (E-commerce — Dry Storage, Al Quoz). Please log in to your Cargoz dashboard for details." },
  { id: 2, label: "Customer Ready", text: "The customer for Lead #L-1001 is ready to proceed. Please submit your final quote if you haven't already." },
  { id: 3, label: "Site Visit Scheduled", text: "A site visit has been scheduled for Lead #L-1001 on [DATE]. Please confirm your availability." },
  { id: 4, label: "Custom Message", text: "" },
];

export default function NotificationTriggerMockup() {
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
        <div className="bg-white rounded-t-xl border border-slate-300 px-6 py-4">
          <div className="text-xs text-slate-400 mb-0.5">CRM / Lead · Notification Manager</div>
          <h1 className="font-heading font-bold text-lg text-slate-900">
            E-commerce — Dry Storage, Al Quoz (L-1001)
          </h1>
        </div>

        <div className="bg-white border border-slate-300 border-t-0 rounded-b-xl p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Compose notification */}
            <div>
              <h2 className="font-heading font-semibold text-slate-800 mb-1 flex items-center gap-2">
                <Bell size={16} className="text-brand-500" />
                Send Notification to Partners
              </h2>
              <p className="text-xs text-slate-500 mb-5">
                Messages are sent via WhatsApp to attached registered partners. Unregistered
                partners are excluded.
              </p>

              {/* Template picker */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-600 mb-2">
                  Message Template
                </label>
                <div className="space-y-2">
                  {NOTIFICATION_TEMPLATES.map((t) => (
                    <label
                      key={t.id}
                      className="flex items-start gap-2.5 p-3 border border-slate-200 rounded-xl cursor-pointer hover:border-brand-300 transition-colors group"
                    >
                      <input
                        type="radio"
                        name="template"
                        defaultChecked={t.id === 1}
                        className="mt-0.5 accent-brand-500"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-slate-700 mb-0.5">{t.label}</div>
                        {t.text && (
                          <div className="text-xs text-slate-500 line-clamp-2">{t.text}</div>
                        )}
                        {t.id === 4 && (
                          <textarea
                            rows={3}
                            placeholder="Type a custom message…"
                            className="mt-2 w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-brand-400"
                          />
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Recipients selector */}
              <div className="mb-5">
                <label className="block text-xs font-semibold text-slate-600 mb-2">
                  Send To
                </label>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-brand-500" />
                    <span className="text-slate-700">All attached partners (3)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input type="checkbox" className="accent-brand-500" />
                    <span className="text-slate-700">Shortlisted partners only (1)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input type="checkbox" className="accent-brand-500" />
                    <span className="text-slate-700">Select specific partners</span>
                  </label>
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-2 py-3 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold rounded-xl transition-colors">
                <Send size={15} />
                Send via WhatsApp to 3 Partners
              </button>
            </div>

            {/* Right: Partner list */}
            <div>
              <h2 className="font-heading font-semibold text-slate-800 mb-1 flex items-center gap-2">
                <MessageCircle size={16} className="text-teal-500" />
                Attached Partners
              </h2>
              <p className="text-xs text-slate-500 mb-5">
                Only registered partners are shown. Notifications are sent via WhatsApp.
              </p>

              <div className="space-y-3">
                {ATTACHED_PARTNERS.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-start gap-3 border border-slate-200 rounded-xl p-3.5"
                  >
                    <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 font-bold text-xs flex items-center justify-center shrink-0">
                      {p.company.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-sm font-semibold text-slate-800">{p.company}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          p.status === "Shortlisted"
                            ? "bg-teal-50 text-teal-600 border border-teal-200"
                            : "bg-slate-100 text-slate-500"
                        }`}>
                          {p.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500">{p.contact} · {p.phone}</div>
                    </div>
                    <div className="shrink-0 mt-0.5">
                      {p.notified ? (
                        <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                          <CheckCircle2 size={12} /> Notified
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">Pending</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Notification log */}
              <div className="mt-5 pt-5 border-t border-slate-100">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Recent Notification History
                </h3>
                <div className="space-y-2">
                  {[
                    { text: "Lead update sent to all partners", time: "2 hours ago", count: 3 },
                    { text: "Shortlist notification sent to Al Manarah", time: "1 day ago", count: 1 },
                  ].map((log, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-500">
                      <Bell size={11} className="text-slate-400 shrink-0" />
                      <span className="flex-1">{log.text}</span>
                      <span className="bg-slate-100 px-1.5 py-0.5 rounded-full text-slate-500">{log.count}</span>
                      <span className="text-slate-400 shrink-0">{log.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
          <strong>Mockup note:</strong> This panel is accessible from within the ODOO lead record.
          Sales reps can compose a message using pre-built templates or a custom message and send
          it as a WhatsApp notification to all or selected registered warehouse partners. The
          notification log maintains a full history of communications for the lead.
        </div>
      </div>
    </div>
  );
}
