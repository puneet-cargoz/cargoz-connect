"use client";

import Link from "next/link";
import { MapPin, Star, CheckCircle, ArrowRight, Thermometer, Package } from "lucide-react";
import { WarehouseListing } from "@/lib/data";

const TEMP_COLORS: Record<string, string> = {
  "Ambient": "bg-slate-100 text-slate-700",
  "AC": "bg-blue-50 text-blue-700",
  "Chiller": "bg-cyan-50 text-cyan-700",
  "Cold Storage": "bg-indigo-50 text-indigo-700",
  "Frozen": "bg-violet-50 text-violet-700",
};

const FORMAT_COLORS: Record<string, string> = {
  "Bulk Space": "bg-amber-50 text-amber-700",
  "Rack Space": "bg-brand-50 text-brand-700",
  "Lockable Unit": "bg-emerald-50 text-emerald-700",
  "Open Yard": "bg-green-50 text-green-700",
  "Cage": "bg-orange-50 text-orange-700",
};

const SPEC_BG: Record<string, string> = {
  "General Cargo": "from-slate-400 to-slate-600",
  "Food Grade": "from-emerald-400 to-emerald-600",
  "Dangerous Goods": "from-orange-400 to-orange-600",
  "Pharmaceutical": "from-blue-400 to-blue-600",
  "Chemical": "from-purple-400 to-purple-600",
  "E-commerce": "from-brand-400 to-brand-600",
};

interface Props {
  warehouse: WarehouseListing;
}

export default function WarehouseCard({ warehouse }: Props) {
  const gradientClass = SPEC_BG[warehouse.specialization] ?? "from-slate-400 to-slate-600";

  return (
    <Link
      href={`/warehouses/${warehouse.id}`}
      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col"
    >
      {/* Image placeholder */}
      <div className={`bg-gradient-to-br ${gradientClass} h-44 flex items-center justify-center relative`}>
        <Package className="w-14 h-14 text-white/60" />
        {warehouse.verified && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-teal-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            <CheckCircle className="w-3 h-3" />
            Verified
          </div>
        )}
        {!warehouse.available && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white/90 text-slate-800 text-sm font-semibold px-3 py-1.5 rounded-full">
              Currently Full
            </span>
          </div>
        )}
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-lg font-medium">
          {warehouse.id}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        {/* Title + location */}
        <div>
          <h3 className="font-heading font-semibold text-slate-900 text-base leading-tight group-hover:text-brand-600 transition-colors">
            {warehouse.name}
          </h3>
          <div className="flex items-center gap-1 mt-1 text-slate-500 text-sm">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{warehouse.location}</span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${TEMP_COLORS[warehouse.temperature] ?? "bg-slate-100 text-slate-600"}`}>
            <Thermometer className="w-3 h-3 inline mr-0.5" />
            {warehouse.temperature}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${FORMAT_COLORS[warehouse.storageFormat] ?? "bg-slate-100 text-slate-600"}`}>
            {warehouse.storageFormat}
          </span>
        </div>

        {/* Size + price */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-slate-50 rounded-lg px-3 py-2">
            <p className="text-xs text-slate-500 font-medium">Space</p>
            <p className="font-semibold text-slate-800">
              {warehouse.minSqft.toLocaleString()}–{warehouse.maxSqft.toLocaleString()} sqft
            </p>
          </div>
          <div className="bg-slate-50 rounded-lg px-3 py-2">
            <p className="text-xs text-slate-500 font-medium">From</p>
            <p className="font-semibold text-slate-800">
              AED {warehouse.pricePerCbm.toFixed(2)}<span className="text-xs font-normal text-slate-500">/CBM/day</span>
            </p>
          </div>
        </div>

        {/* Rating + min contract */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-semibold text-slate-800">{warehouse.rating}</span>
            <span className="text-xs text-slate-400">({warehouse.reviewCount} reviews)</span>
          </div>
          <span className="text-xs text-slate-500">Min. {warehouse.minContract}</span>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="text-sm font-semibold text-brand-600 group-hover:text-brand-700">
            Get a Quote
          </span>
          <ArrowRight className="w-4 h-4 text-brand-500 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
