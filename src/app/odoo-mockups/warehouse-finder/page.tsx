import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ArrowLeft, CheckCircle2, Filter, MapPin, Plus, Search } from "lucide-react";

const WAREHOUSES = [
  {
    id: "W-001",
    company: "Al Manarah Logistics LLC",
    contact: "Ahmed Al Rashidi",
    city: "Dubai",
    area: "Al Quoz",
    sqft: 15000,
    types: ["Dry", "AC"],
    verified: true,
    attached: false,
  },
  {
    id: "W-002",
    company: "Gulf Storage Solutions",
    contact: "Ravi Menon",
    city: "Dubai",
    area: "DIP",
    sqft: 12000,
    types: ["Dry"],
    verified: true,
    attached: true,
  },
  {
    id: "W-003",
    company: "Emirates Warehousing Co.",
    contact: "Faisal Al Hamdan",
    city: "Dubai",
    area: "Jebel Ali",
    sqft: 20000,
    types: ["Dry", "Open Yard"],
    verified: true,
    attached: false,
  },
  {
    id: "W-004",
    company: "Zonelink Storage FZE",
    contact: "Priya Sharma",
    city: "Dubai",
    area: "JAFZA",
    sqft: 8000,
    types: ["Dry", "Chiller", "AC"],
    verified: false,
    attached: false,
  },
];

const TYPE_PILL: Record<string, string> = {
  Dry:         "bg-amber-50 text-amber-700",
  Chiller:     "bg-blue-50 text-blue-700",
  AC:          "bg-purple-50 text-purple-700",
  "Open Yard": "bg-green-50 text-green-700",
};

export default function WarehouseFinderMockup() {
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

        {/* ODOO lead header */}
        <div className="bg-white rounded-t-xl border border-slate-300 px-6 py-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 mb-0.5">CRM / Lead · Warehouse Finder</div>
            <h1 className="font-heading font-bold text-lg text-slate-900">
              E-commerce — Dry Storage, Al Quoz (L-1001)
            </h1>
          </div>
          <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full">
            2 Attached
          </span>
        </div>

        <div className="bg-white border border-slate-300 border-t-0 rounded-b-xl p-6">
          {/* Finder header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
            <div>
              <h2 className="font-heading font-semibold text-slate-900">Warehouse Finder</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Search and shortlist registered warehouse partners for this lead. Attached
                partners receive a notification and see this lead in their dashboard.
              </p>
            </div>
            <button className="flex items-center gap-1.5 text-xs text-brand-500 font-semibold border border-brand-200 px-3 py-1.5 rounded-lg hover:bg-brand-50 transition-colors whitespace-nowrap">
              <Plus size={12} />
              Create New Partner
            </button>
          </div>

          {/* Lead requirements reminder */}
          <div className="bg-brand-50 border border-brand-200 rounded-xl p-3 mb-5 text-xs text-brand-800 flex flex-wrap gap-4">
            <span><strong>Lead requires:</strong> Dry Storage</span>
            <span><strong>Location:</strong> Al Quoz, Dubai</span>
            <span><strong>Size:</strong> 5,000–10,000 sqft</span>
            <span><strong>Duration:</strong> 12 months</span>
          </div>

          {/* Search & filter bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by company name, area, or contact…"
                className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400"
                defaultValue="Dubai"
              />
            </div>
            <button className="flex items-center gap-2 text-sm text-slate-600 border border-slate-200 px-3 py-2 rounded-lg hover:bg-slate-50">
              <Filter size={14} />
              Filter: Dry · Dubai
            </button>
          </div>

          {/* Warehouse list */}
          <div className="space-y-3">
            {WAREHOUSES.map((w) => (
              <div
                key={w.id}
                className={`rounded-xl border p-4 transition-all ${
                  w.attached
                    ? "border-teal-300 bg-teal-50/40"
                    : "border-slate-200 hover:border-brand-200"
                }`}
              >
                <div className="flex flex-wrap items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-600 font-bold text-xs flex items-center justify-center shrink-0">
                    {w.company.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-semibold text-sm text-slate-900">{w.company}</span>
                      {w.verified && (
                        <span className="flex items-center gap-0.5 text-xs text-emerald-600 font-medium">
                          <CheckCircle2 size={11} /> Verified
                        </span>
                      )}
                      {w.attached && (
                        <span className="text-xs bg-teal-500 text-white font-semibold px-2 py-0.5 rounded-full">
                          Attached
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-2">
                      <span className="flex items-center gap-1">
                        <MapPin size={11} /> {w.area}, {w.city}
                      </span>
                      <span>{w.sqft.toLocaleString()} sqft</span>
                      <span>{w.contact}</span>
                      <span className="text-slate-400">#{w.id}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {w.types.map((t) => (
                        <span
                          key={t}
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${TYPE_PILL[t]}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="shrink-0">
                    {w.attached ? (
                      <button className="text-xs px-3 py-1.5 border border-red-200 text-red-500 hover:bg-red-50 font-medium rounded-lg transition-colors">
                        Detach
                      </button>
                    ) : (
                      <button className="text-xs px-3 py-1.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-lg transition-colors">
                        Attach to Lead
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-400 mt-4 text-center">
            Showing 4 of 47 registered warehouses matching Dubai · Dry
          </p>
        </div>

        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
          <strong>Mockup note:</strong> The Warehouse Finder is embedded in the ODOO lead
          record. When a sales rep attaches a warehouse partner, that partner instantly
          receives a notification and sees the lead in their portal dashboard with &quot;Shortlisted&quot;
          status. Detaching removes them from the lead and sends a notification.
        </div>
      </div>
    </div>
  );
}
