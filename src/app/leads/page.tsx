"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import LeadCard from "@/components/LeadCard";
import { MOCK_LEADS, UAE_CITIES, WAREHOUSE_TYPES, type WarehouseType } from "@/lib/data";
import { Search, SlidersHorizontal, X, Sparkles } from "lucide-react";
import { Suspense } from "react";

function LeadsPageInner() {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>(
    searchParams.get("city") || "All"
  );
  const [selectedType, setSelectedType] = useState<string>(
    searchParams.get("type") || "All"
  );
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return MOCK_LEADS.filter((lead) => {
      const matchCity =
        selectedCity === "All" || lead.city === selectedCity;
      const matchType =
        selectedType === "All" || lead.warehouseType === selectedType;
      const matchSearch =
        !search ||
        lead.city.toLowerCase().includes(search.toLowerCase()) ||
        lead.area.toLowerCase().includes(search.toLowerCase()) ||
        lead.industry.toLowerCase().includes(search.toLowerCase()) ||
        lead.warehouseType.toLowerCase().includes(search.toLowerCase());
      return matchCity && matchType && matchSearch;
    });
  }, [search, selectedCity, selectedType]);

  const openCount = filtered.filter((l) => l.status === "Open").length;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Achievement strip */}
      <div className="bg-slate-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center gap-4 sm:gap-12 text-center">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-base sm:text-xl font-bold text-white">2,000+</span>
              <span className="text-[10px] sm:text-xs text-slate-400 leading-tight text-left">Leads<br />Confirmed</span>
            </div>
            <div className="w-px h-6 bg-slate-700" />
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-base sm:text-xl font-bold text-teal-400">AED 50M+</span>
              <span className="text-[10px] sm:text-xs text-slate-400 leading-tight text-left">Storage Value<br />Generated</span>
            </div>
            <div className="w-px h-6 bg-slate-700" />
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-base sm:text-xl font-bold text-brand-400">98%</span>
              <span className="text-[10px] sm:text-xs text-slate-400 leading-tight text-left">Partner<br />Satisfaction</span>
            </div>
          </div>
        </div>
      </div>

      {/* Page header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-heading font-bold text-3xl text-slate-900 mb-1">
                Open Storage Leads
              </h1>
              <p className="text-slate-500 text-sm">
                {openCount} active opportunities across the UAE
              </p>
            </div>
            <button
              className="sm:hidden flex items-center gap-2 text-sm font-medium text-brand-500 border border-brand-200 px-3 py-2 rounded-lg"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── Sidebar Filters ── */}
          <aside
            className={`lg:w-64 shrink-0 ${
              showFilters ? "block" : "hidden lg:block"
            }`}
          >
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-6 sticky top-24">
              {/* AI Search */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-2">
                  <span className="bg-gradient-to-r from-brand-500 to-teal-400 bg-clip-text text-transparent">AI Search</span>
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-brand-500/10 to-teal-400/10 text-[10px] font-bold text-brand-500 normal-case tracking-normal">
                    <Sparkles size={9} className="text-brand-500" />
                    Smart
                  </span>
                </label>
                <div className="relative group">
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-brand-500/40 to-teal-400/40 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-[1px]" />
                  <div className="relative flex items-center">
                    <Sparkles
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400 group-focus-within:text-brand-500 transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Try &quot;500 sqm chiller in Dubai&quot;…"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-8 pr-8 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition-all placeholder:text-slate-400"
                    />
                    {search && (
                      <button
                        onClick={() => setSearch("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>
                </div>
                <p className="mt-1.5 text-[11px] text-slate-400 leading-tight">
                  Search by city, area, type, or describe what you need
                </p>
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Emirate / City
                </label>
                <div className="space-y-1">
                  {["All", ...UAE_CITIES].map((city) => (
                    <button
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${
                        selectedCity === city
                          ? "bg-brand-50 text-brand-600 font-semibold"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Warehouse Type
                </label>
                <div className="space-y-1">
                  {["All", ...WAREHOUSE_TYPES].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${
                        selectedType === type
                          ? "bg-brand-50 text-brand-600 font-semibold"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset */}
              {(selectedCity !== "All" || selectedType !== "All" || search) && (
                <button
                  onClick={() => {
                    setSelectedCity("All");
                    setSelectedType("All");
                    setSearch("");
                  }}
                  className="w-full text-sm text-slate-500 hover:text-red-500 flex items-center gap-1 transition-colors"
                >
                  <X size={12} />
                  Clear all filters
                </button>
              )}
            </div>
          </aside>

          {/* ── Lead Grid ── */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="font-heading font-semibold text-slate-800 mb-2">
                  No leads match your filters
                </h3>
                <p className="text-slate-500 text-sm">
                  Try adjusting your city or warehouse type filter.
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((lead) => (
                  <LeadCard key={lead.id} lead={lead} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LeadsPage() {
  return (
    <Suspense>
      <LeadsPageInner />
    </Suspense>
  );
}
