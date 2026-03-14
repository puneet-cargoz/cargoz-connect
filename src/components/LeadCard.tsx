"use client";

import Link from "next/link";
import { MapPin, Clock, Building2, ShieldCheck, Calendar } from "lucide-react";
import type { Lead } from "@/lib/data";

const TYPE_COLORS: Record<string, string> = {
  Dry:        "bg-amber-100 text-amber-800 border-amber-200",
  Chiller:    "bg-blue-100 text-blue-800 border-blue-200",
  AC:         "bg-purple-100 text-purple-800 border-purple-200",
  "Open Yard":"bg-green-100 text-green-800 border-green-200",
};

const STATUS_COLORS: Record<string, string> = {
  Open:      "bg-emerald-100 text-emerald-700",
  Confirmed: "bg-brand-100 text-brand-700",
  Lost:      "bg-red-100 text-red-600",
};

const MAX_RESPONSES = 15;

export default function LeadCard({ lead }: { lead: Lead }) {
  const isActive = lead.status === "Open";
  const isHot = lead.responses >= 7;
  const fillPercent = Math.min(100, (lead.responses / MAX_RESPONSES) * 100);
  const isFillingUp = lead.responses >= 5;

  return (
    <div
      className={`group relative bg-white rounded-2xl border transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
        isActive ? "border-slate-200 hover:border-brand-300" : "border-slate-100 opacity-75"
      }`}
    >
      {/* Top accent bar */}
      {isActive && (
        <div className="absolute top-0 inset-x-0 h-1 rounded-t-2xl bg-gradient-to-r from-brand-500 to-brand-600" />
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border ${
                TYPE_COLORS[lead.warehouseType]
              }`}
            >
              {lead.warehouseType}
            </span>
            <span
              className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${
                STATUS_COLORS[lead.status]
              }`}
            >
              {lead.status === "Open" && (
                <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
              )}
              {lead.status}
            </span>
            {isHot && isActive && (
              <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-600 border border-red-200">
                🔥 Hot lead
              </span>
            )}
          </div>
          <span className="text-xs text-slate-400 shrink-0">#{lead.id}</span>
        </div>

        {/* Verified + customer context */}
        {isActive && (
          <div className="flex items-center gap-2 mb-3 text-xs">
            <span className="flex items-center gap-1 text-teal-600 font-medium">
              <ShieldCheck size={11} />
              Cargoz-verified
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500">Mid-size {lead.industry} company</span>
          </div>
        )}

        {/* Location & industry */}
        <h3 className="font-heading font-semibold text-slate-900 text-base leading-snug mb-1">
          {lead.industry} — {lead.warehouseType} Storage
        </h3>
        <div className="flex items-center gap-1 text-sm text-slate-500 mb-3">
          <MapPin size={13} className="shrink-0" />
          <span>
            {lead.area}, {lead.city}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4">
          {lead.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
          <span className="flex items-center gap-1">
            <Building2 size={12} />
            {lead.sqft}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {lead.duration}
          </span>
          <span className="flex items-center gap-1 ml-auto text-slate-400">
            <Calendar size={11} />
            {lead.postedDays === 1 ? "Today" : `${lead.postedDays}d ago`}
          </span>
        </div>

        {/* Response progress bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-500">{lead.responses} quotes submitted</span>
            {isFillingUp && isActive && (
              <span className="text-amber-600 font-semibold">Filling up</span>
            )}
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                isFillingUp ? "bg-amber-400" : "bg-brand-300"
              }`}
              style={{ width: `${fillPercent}%` }}
            />
          </div>
        </div>

        {/* Action */}
        {isActive ? (
          <Link
            href={`/leads/${lead.id}`}
            className="block w-full text-center py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Quote on This Lead &rarr;
          </Link>
        ) : (
          <div className="block w-full text-center py-2.5 bg-slate-100 text-slate-400 text-sm font-medium rounded-xl cursor-not-allowed">
            {lead.status === "Confirmed" ? "Lead Confirmed" : "Lead Closed"}
          </div>
        )}
      </div>
    </div>
  );
}
