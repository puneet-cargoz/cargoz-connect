"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import LeadCard from "@/components/LeadCard";
import { MOCK_LEADS, UAE_CITIES, WAREHOUSE_TYPES, type WarehouseType } from "@/lib/data";
import { Search, SlidersHorizontal, X, Eye, Lock } from "lucide-react";
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
  const GATE_INDEX = 5;

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

      {/* Guest registration banner */}
      <div className="bg-gradient-to-r from-brand-50 to-teal-50 border-b border-brand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                <Eye className="w-4 h-4 text-brand-600" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm text-slate-800">
                  You&apos;re browsing as a guest — <span className="text-brand-600">1 quote per day</span>
                </p>
                <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">
                  Register free to quote unlimited leads, get WhatsApp alerts for new matches, and track all your quotes in one dashboard
                </p>
              </div>
            </div>
            <Link
              href="/register"
              className="px-5 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-lg transition-colors flex-shrink-0"
            >
              Register Free &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Page header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <h1 className="font-heading font-bold text-3xl text-slate-900">
                  Live storage enquiries
                </h1>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-teal-50 text-teal-600 text-xs font-semibold border border-teal-100">
                  +8 new this week
                </span>
              </div>
              <p className="text-slate-500 text-sm">
                {openCount} unmatched leads today — each one is a potential long-term tenant
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
              {/* Search */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Search leads
                </label>
                <div className="relative">
                  <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    placeholder="City, area, type..."
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

              {/* Sidebar register nudge */}
              <div className="bg-brand-50 border border-brand-100 rounded-xl p-4 text-center">
                <p className="text-xs font-semibold text-brand-700 mb-2">
                  Browsing as guest — 1 quote/day
                </p>
                <Link
                  href="/register"
                  className="block w-full py-2 bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Register Free &rarr;
                </Link>
              </div>
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
                {filtered.slice(0, GATE_INDEX).map((lead) => (
                  <LeadCard key={lead.id} lead={lead} />
                ))}

                {/* 6th-card registration gate */}
                {filtered.length > GATE_INDEX && (
                  <div className="relative bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 p-6 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mb-4">
                      <Lock className="w-5 h-5 text-brand-500" />
                    </div>
                    <h3 className="font-heading font-bold text-slate-800 text-lg mb-1">
                      {filtered.length - GATE_INDEX} more leads available
                    </h3>
                    <p className="text-sm text-slate-500 mb-5 leading-relaxed">
                      Register free to see all leads, quote unlimited, and get WhatsApp alerts
                    </p>
                    <Link
                      href="/register"
                      className="w-full py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold rounded-xl transition-colors text-center block"
                    >
                      Register for Free &rarr;
                    </Link>
                    <span className="mt-3 text-xs text-slate-400">
                      Load more (guest — 1 per day)
                    </span>
                  </div>
                )}

                {filtered.slice(GATE_INDEX).map((lead) => (
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
