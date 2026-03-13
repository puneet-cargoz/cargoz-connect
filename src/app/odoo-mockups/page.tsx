import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ArrowRight } from "lucide-react";

const MOCKUPS = [
  {
    slug: "partner-tab",
    title: "Partner Activity Tab",
    desc: "New 'Partner' tab on the ODOO lead record capturing warehouse partner interactions, quotes, and sales rep notes — visible to registered partners.",
  },
  {
    slug: "warehouse-finder",
    title: "Warehouse Finder",
    desc: "Sales rep tool to search, filter, and shortlist registered warehouse partners that match a lead's requirements and attach them to the lead.",
  },
  {
    slug: "lead-status",
    title: "Lead Status Comments",
    desc: "Won and Lost status entries in the ODOO comment/chatter section with auto-notifications to associated registered warehouse partners.",
  },
  {
    slug: "notification-trigger",
    title: "Notification Trigger Interface",
    desc: "Interface for sales reps to send targeted notifications to registered partners when they are attached to or updated on a lead.",
  },
];

export default function OdooMockupsIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            ODOO Enhancement Mockups
          </div>
          <h1 className="font-heading font-bold text-3xl text-slate-900 mb-3">
            ODOO Feature Designs
          </h1>
          <p className="text-slate-600 max-w-xl">
            UI/UX mockups for the proposed enhancements to the Cargoz ODOO backend,
            enabling sales reps and warehouse partners to collaborate more effectively.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {MOCKUPS.map((m) => (
            <Link
              key={m.slug}
              href={`/odoo-mockups/${m.slug}`}
              className="bg-white rounded-2xl border border-slate-200 hover:border-brand-300 hover:shadow-md p-6 transition-all group"
            >
              <h2 className="font-heading font-bold text-slate-900 text-lg mb-2 group-hover:text-brand-500 transition-colors">
                {m.title}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">{m.desc}</p>
              <div className="flex items-center gap-1 text-sm font-semibold text-brand-500">
                View Mockup <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
