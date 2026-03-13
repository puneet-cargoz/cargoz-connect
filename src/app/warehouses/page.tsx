"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search, SlidersHorizontal, X, Map, LayoutGrid,
  ChevronDown, ChevronUp, MapPin
} from "lucide-react";
import WarehouseCard from "@/components/WarehouseCard";
import {
  MOCK_WAREHOUSES,
  POPULAR_LOCATIONS,
  type WarehouseSpecialization,
  type TemperatureType,
  type StorageFormat,
} from "@/lib/data";

const SPECIALIZATIONS: WarehouseSpecialization[] = [
  "General Cargo", "Food Grade", "Dangerous Goods", "Pharmaceutical", "Chemical", "E-commerce",
];

const TEMPERATURES: TemperatureType[] = [
  "Ambient", "AC", "Chiller", "Cold Storage", "Frozen",
];

const FORMATS: StorageFormat[] = [
  "Bulk Space", "Rack Space", "Lockable Unit", "Open Yard",
];

const CITIES = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah"];

const SIZE_RANGES = [
  { label: "< 500 sqft", min: 0, max: 500 },
  { label: "500 – 2,000 sqft", min: 500, max: 2000 },
  { label: "2,000 – 10,000 sqft", min: 2000, max: 10000 },
  { label: "10,000+ sqft", min: 10000, max: Infinity },
];

// UAE SVG Map with location pins
function UAEMap({
  activeArea,
  onSelectArea,
}: {
  activeArea: string;
  onSelectArea: (area: string) => void;
}) {
  const pins = [
    { id: "JAFZA", label: "JAFZA", x: 155, y: 195 },
    { id: "Jebel Ali", label: "Jebel Ali", x: 135, y: 210 },
    { id: "Al Quoz", label: "Al Quoz", x: 190, y: 185 },
    { id: "DIP", label: "DIP", x: 165, y: 200 },
    { id: "Ras Al Khor", label: "Ras Al Khor", x: 220, y: 175 },
    { id: "Mussafah", label: "Mussafah", x: 90, y: 230 },
    { id: "KIZAD", label: "KIZAD", x: 70, y: 215 },
    { id: "Hamriyah", label: "Hamriyah", x: 255, y: 150 },
    { id: "SAIF Zone", label: "SAIF Zone", x: 260, y: 160 },
  ];

  return (
    <div className="relative bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
      <div className="p-3 border-b border-slate-100 bg-white">
        <p className="text-sm font-medium text-slate-700">UAE Warehouse Locations</p>
        <p className="text-xs text-slate-400">Click a pin to filter by area</p>
      </div>
      <svg viewBox="0 0 380 300" className="w-full" style={{ height: 260 }}>
        {/* Simple UAE outline */}
        <rect width="380" height="300" fill="#f8fafc" />
        {/* Gulf coastline rough shape */}
        <path
          d="M20,120 Q60,80 100,90 Q130,70 160,80 Q200,60 240,75 Q270,65 300,80 Q330,70 360,90 L370,200 Q340,220 310,215 Q290,240 260,230 Q240,250 200,245 Q180,260 160,250 Q130,255 100,240 Q70,260 40,240 Q20,230 20,210 Z"
          fill="#dbeafe"
          stroke="#93c5fd"
          strokeWidth="1.5"
        />
        {/* Saudi border area */}
        <path
          d="M20,120 L20,280 L80,280 L80,260 Q60,240 40,240 Q20,230 20,210 Z"
          fill="#f1f5f9"
          stroke="#cbd5e1"
          strokeWidth="1"
        />
        {/* Oman border area */}
        <path
          d="M310,215 Q330,220 360,200 L360,280 L310,280 Z"
          fill="#f1f5f9"
          stroke="#cbd5e1"
          strokeWidth="1"
        />
        {/* Water label */}
        <text x="185" y="50" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="500">Arabian Gulf</text>

        {/* Emirates labels */}
        <text x="185" y="195" textAnchor="middle" fill="#64748b" fontSize="9">Dubai</text>
        <text x="80" y="235" textAnchor="middle" fill="#64748b" fontSize="9">Abu Dhabi</text>
        <text x="265" y="165" textAnchor="middle" fill="#64748b" fontSize="9">Sharjah</text>

        {/* Pins */}
        {pins.map((pin) => {
          const isActive = activeArea === pin.id;
          return (
            <g
              key={pin.id}
              onClick={() => onSelectArea(isActive ? "" : pin.id)}
              style={{ cursor: "pointer" }}
            >
              <circle
                cx={pin.x}
                cy={pin.y}
                r={isActive ? 9 : 6}
                fill={isActive ? "#7957ff" : "#94a3b8"}
                stroke="white"
                strokeWidth="2"
              />
              {isActive && (
                <text
                  x={pin.x}
                  y={pin.y - 14}
                  textAnchor="middle"
                  fill="#7957ff"
                  fontSize="8"
                  fontWeight="700"
                >
                  {pin.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      {activeArea && (
        <div className="p-3 bg-brand-50 border-t border-brand-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-600" />
              <span className="text-sm font-medium text-brand-700">{activeArea}</span>
            </div>
            <button
              onClick={() => onSelectArea("")}
              className="text-xs text-brand-500 hover:text-brand-700"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function WarehouseSearchContent() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState(searchParams.get("city") ?? "");
  const [selectedArea, setSelectedArea] = useState(searchParams.get("area") ?? "");
  const [selectedSpec, setSelectedSpec] = useState<WarehouseSpecialization | "">("");
  const [selectedTemp, setSelectedTemp] = useState<TemperatureType | "">("");
  const [selectedFormat, setSelectedFormat] = useState<StorageFormat | "">("");
  const [selectedSize, setSelectedSize] = useState<number>(-1);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [sortBy, setSortBy] = useState<"price" | "rating" | "default">("default");
  const [expandedSections, setExpandedSections] = useState({
    city: true, spec: true, temp: true, format: false, size: false,
  });

  const toggleSection = (key: keyof typeof expandedSections) =>
    setExpandedSections((p) => ({ ...p, [key]: !p[key] }));

  const filtered = useMemo(() => {
    let results = MOCK_WAREHOUSES.filter((w) => {
      if (
        search &&
        !w.name.toLowerCase().includes(search.toLowerCase()) &&
        !w.location.toLowerCase().includes(search.toLowerCase()) &&
        !w.specialization.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      if (selectedCity && w.city !== selectedCity) return false;
      if (selectedArea && !w.area.toLowerCase().includes(selectedArea.toLowerCase())) return false;
      if (selectedSpec && w.specialization !== selectedSpec) return false;
      if (selectedTemp && w.temperature !== selectedTemp) return false;
      if (selectedFormat && w.storageFormat !== selectedFormat) return false;
      if (selectedSize >= 0) {
        const range = SIZE_RANGES[selectedSize];
        if (w.maxSqft < range.min || w.minSqft > range.max) return false;
      }
      return true;
    });

    if (sortBy === "price") results = [...results].sort((a, b) => a.pricePerCbm - b.pricePerCbm);
    if (sortBy === "rating") results = [...results].sort((a, b) => b.rating - a.rating);

    return results;
  }, [search, selectedCity, selectedArea, selectedSpec, selectedTemp, selectedFormat, selectedSize, sortBy]);

  const hasFilters =
    search || selectedCity || selectedArea || selectedSpec || selectedTemp || selectedFormat || selectedSize >= 0;

  const resetFilters = () => {
    setSearch("");
    setSelectedCity("");
    setSelectedArea("");
    setSelectedSpec("");
    setSelectedTemp("");
    setSelectedFormat("");
    setSelectedSize(-1);
  };

  const FilterSection = ({
    title,
    sectionKey,
    children,
  }: {
    title: string;
    sectionKey: keyof typeof expandedSections;
    children: React.ReactNode;
  }) => (
    <div className="border-b border-slate-100 pb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full text-sm font-semibold text-slate-800 mb-3"
      >
        {title}
        {expandedSections[sectionKey] ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>
      {expandedSections[sectionKey] && children}
    </div>
  );

  const PillButton = ({
    label,
    active,
    onClick,
  }: {
    label: string;
    active: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
        active
          ? "bg-brand-500 text-white"
          : "bg-slate-100 text-slate-600 hover:bg-brand-50 hover:text-brand-700"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page header */}
      <div className="bg-white border-b border-slate-200 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="font-heading text-2xl font-bold text-slate-900">
                Find Warehouse Storage in UAE
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                {filtered.length} warehouse{filtered.length !== 1 ? "s" : ""} available across the UAE
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-700 bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="default">Sort: Recommended</option>
                <option value="price">Price: Low to High</option>
                <option value="rating">Top Rated</option>
              </select>

              {/* View toggle */}
              <div className="flex rounded-lg border border-slate-200 overflow-hidden bg-white">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${
                    viewMode === "grid" ? "bg-brand-500 text-white" : "text-slate-500 hover:bg-slate-50"
                  }`}
                  title="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={`p-2 transition-colors ${
                    viewMode === "map" ? "bg-brand-500 text-white" : "text-slate-500 hover:bg-slate-50"
                  }`}
                  title="Map view"
                >
                  <Map className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile filter toggle */}
              <button
                onClick={() => setShowFilters((v) => !v)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 bg-white"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {hasFilters && (
                  <span className="ml-1 w-2 h-2 bg-brand-500 rounded-full" />
                )}
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="mt-4 relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, location, or cargo type…"
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none bg-white"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick location pills */}
          <div className="mt-3 flex flex-wrap gap-2">
            {POPULAR_LOCATIONS.slice(0, 7).map((loc) => (
              <button
                key={loc.slug}
                onClick={() =>
                  setSelectedArea(selectedArea === loc.slug ? "" : loc.slug)
                }
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedArea === loc.slug
                    ? "bg-brand-500 text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-brand-300 hover:text-brand-700"
                }`}
              >
                {loc.area}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block w-full lg:w-64 flex-shrink-0`}
          >
            <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-4 sticky top-24">
              <div className="flex items-center justify-between">
                <h2 className="font-heading font-semibold text-slate-900 text-sm">Filters</h2>
                {hasFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-xs text-brand-600 hover:text-brand-700 font-medium"
                  >
                    Reset all
                  </button>
                )}
              </div>

              {/* City */}
              <FilterSection title="Emirate" sectionKey="city">
                <div className="flex flex-wrap gap-1.5">
                  <PillButton
                    label="All"
                    active={!selectedCity}
                    onClick={() => setSelectedCity("")}
                  />
                  {CITIES.map((c) => (
                    <PillButton
                      key={c}
                      label={c}
                      active={selectedCity === c}
                      onClick={() =>
                        setSelectedCity(selectedCity === c ? "" : c)
                      }
                    />
                  ))}
                </div>
              </FilterSection>

              {/* Specialization */}
              <FilterSection title="Cargo Type" sectionKey="spec">
                <div className="space-y-1.5">
                  {SPECIALIZATIONS.map((s) => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedSpec === s}
                        onChange={() =>
                          setSelectedSpec(selectedSpec === s ? "" : s)
                        }
                        className="w-4 h-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500"
                      />
                      <span className="text-sm text-slate-600 group-hover:text-slate-800">
                        {s}
                      </span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Temperature */}
              <FilterSection title="Temperature" sectionKey="temp">
                <div className="flex flex-wrap gap-1.5">
                  {TEMPERATURES.map((t) => (
                    <PillButton
                      key={t}
                      label={t}
                      active={selectedTemp === t}
                      onClick={() =>
                        setSelectedTemp(selectedTemp === t ? "" : t)
                      }
                    />
                  ))}
                </div>
              </FilterSection>

              {/* Format */}
              <FilterSection title="Storage Format" sectionKey="format">
                <div className="space-y-1.5">
                  {FORMATS.map((f) => (
                    <label key={f} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedFormat === f}
                        onChange={() =>
                          setSelectedFormat(selectedFormat === f ? "" : f)
                        }
                        className="w-4 h-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500"
                      />
                      <span className="text-sm text-slate-600 group-hover:text-slate-800">
                        {f}
                      </span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Size */}
              <FilterSection title="Size Required" sectionKey="size">
                <div className="space-y-1.5">
                  {SIZE_RANGES.map((r, i) => (
                    <label key={r.label} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="size"
                        checked={selectedSize === i}
                        onChange={() =>
                          setSelectedSize(selectedSize === i ? -1 : i)
                        }
                        className="w-4 h-4 border-slate-300 text-brand-500 focus:ring-brand-500"
                      />
                      <span className="text-sm text-slate-600 group-hover:text-slate-800">
                        {r.label}
                      </span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Map (sidebar) */}
              {viewMode === "map" && (
                <UAEMap
                  activeArea={selectedArea}
                  onSelectArea={setSelectedArea}
                />
              )}
            </div>
          </aside>

          {/* Results */}
          <main className="flex-1 min-w-0">
            {viewMode === "map" ? (
              <div className="flex gap-4">
                {/* Full map */}
                <div className="flex-1">
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    <div className="p-4 border-b border-slate-100">
                      <p className="text-sm font-medium text-slate-700">
                        {filtered.length} warehouses in selected area
                      </p>
                    </div>
                    <UAEMap
                      activeArea={selectedArea}
                      onSelectArea={setSelectedArea}
                    />
                    <div className="p-4">
                      <p className="text-xs text-slate-400 text-center">
                        Click a pin to filter by location
                      </p>
                    </div>
                  </div>
                </div>
                {/* Side list */}
                <div className="w-80 space-y-3 overflow-y-auto" style={{ maxHeight: 600 }}>
                  {filtered.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
                      <p className="text-2xl mb-2">🔍</p>
                      <p className="font-medium text-slate-700">No warehouses found</p>
                      <p className="text-sm text-slate-400 mt-1">Try adjusting your filters</p>
                    </div>
                  ) : (
                    filtered.map((w) => <WarehouseCard key={w.id} warehouse={w} />)
                  )}
                </div>
              </div>
            ) : (
              <>
                {filtered.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
                    <p className="text-4xl mb-4">🔍</p>
                    <p className="font-heading font-semibold text-slate-700 text-lg">
                      No warehouses match your filters
                    </p>
                    <p className="text-slate-500 text-sm mt-2 mb-6">
                      Try clearing some filters or searching a different location
                    </p>
                    <button
                      onClick={resetFilters}
                      className="px-5 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-lg transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filtered.map((w) => (
                      <WarehouseCard key={w.id} warehouse={w} />
                    ))}
                  </div>
                )}

                {/* WhatsApp CTA */}
                <div className="mt-10 bg-gradient-to-r from-brand-500 to-brand-700 rounded-2xl p-6 text-white text-center">
                  <p className="font-heading font-bold text-lg mb-1">
                    Can&apos;t find what you need?
                  </p>
                  <p className="text-brand-100 text-sm mb-4">
                    Our team has access to unlisted warehouses across the UAE
                  </p>
                  <div className="flex items-center justify-center gap-3 flex-wrap">
                    <a
                      href="https://wa.me/971544462859?text=Hi%2C%20I%20need%20help%20finding%20warehouse%20storage%20in%20UAE"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold rounded-lg text-sm transition-colors"
                    >
                      💬 WhatsApp Us
                    </a>
                    <a
                      href="tel:800665544"
                      className="px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg text-sm transition-colors"
                    >
                      📞 Call 800 665544
                    </a>
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function WarehousesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-slate-500 text-sm">Loading warehouses…</p>
        </div>
      </div>
    }>
      <WarehouseSearchContent />
    </Suspense>
  );
}
