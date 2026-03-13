"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Building2, Phone } from "lucide-react";
import CargozLogo from "./CargozLogo";

const LOCATIONS = [
  { label: "JAFZA", city: "Dubai" },
  { label: "Jebel Ali", city: "Dubai" },
  { label: "DIC", city: "Dubai" },
  { label: "DIP", city: "Dubai" },
  { label: "Al Quoz", city: "Dubai" },
  { label: "Mussafah", city: "Abu Dhabi" },
  { label: "KIZAD", city: "Abu Dhabi" },
  { label: "Hamriyah Free Zone", city: "Sharjah" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [locDropdown, setLocDropdown] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLocDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0" aria-label="Cargoz home">
            <CargozLogo className="h-8 w-auto" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              href="/warehouses"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/warehouses")
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-600 hover:text-brand-600 hover:bg-slate-50"
              }`}
            >
              Find Storage
            </Link>

            {/* Locations dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLocDropdown((v) => !v)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-slate-50 transition-colors"
              >
                Locations
                <ChevronDown className={`w-4 h-4 transition-transform ${locDropdown ? "rotate-180" : ""}`} />
              </button>

              {locDropdown && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl py-3 z-50">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-4 mb-2">
                    Popular Locations
                  </p>
                  {LOCATIONS.map((loc) => (
                    <Link
                      key={loc.label}
                      href={`/warehouses?area=${encodeURIComponent(loc.label)}`}
                      onClick={() => setLocDropdown(false)}
                      className="flex items-center justify-between px-4 py-2 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                    >
                      <span>{loc.label}</span>
                      <span className="text-xs text-slate-400">{loc.city}</span>
                    </Link>
                  ))}
                  <div className="border-t border-slate-100 mt-2 pt-2 px-4">
                    <Link
                      href="/warehouses"
                      onClick={() => setLocDropdown(false)}
                      className="text-sm text-brand-600 font-medium hover:text-brand-700"
                    >
                      View all locations →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/products"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/products")
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-600 hover:text-brand-600 hover:bg-slate-50"
              }`}
            >
              Blocks & Lockers
            </Link>

            {/* Divider */}
            <div className="h-5 w-px bg-slate-200 mx-2" />

            <Link
              href="/leads"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/leads")
                  ? "bg-teal-50 text-teal-700"
                  : "text-teal-600 hover:text-teal-700 hover:bg-teal-50"
              }`}
            >
              <Building2 className="w-4 h-4" />
              For Warehouses
            </Link>
          </div>

          {/* Right CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href="tel:800665544"
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-slate-600 hover:text-brand-600 transition-colors"
            >
              <Phone className="w-4 h-4" />
              800 665544
            </a>
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-brand-600 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
            >
              List Your Warehouse
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-1">
          <Link
            href="/warehouses"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700"
          >
            Find Storage
          </Link>
          <Link
            href="/products"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700"
          >
            Blocks & Lockers
          </Link>
          <div className="pt-1 pb-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 mb-1 mt-1">
              Popular Locations
            </p>
            {LOCATIONS.slice(0, 4).map((loc) => (
              <Link
                key={loc.label}
                href={`/warehouses?area=${encodeURIComponent(loc.label)}`}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 text-sm text-slate-600 hover:text-brand-600"
              >
                {loc.label}, {loc.city}
              </Link>
            ))}
          </div>
          <div className="border-t border-slate-100 pt-2 mt-1">
            <Link
              href="/leads"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium text-teal-600 hover:bg-teal-50"
            >
              <Building2 className="w-4 h-4" />
              For Warehouses
            </Link>
          </div>
          <div className="border-t border-slate-100 pt-3 flex flex-col gap-2">
            <a
              href="tel:800665544"
              className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600"
            >
              <Phone className="w-4 h-4" /> 800 665544
            </a>
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-center border border-slate-200 text-slate-700"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-center bg-brand-500 hover:bg-brand-600 text-white"
            >
              List Your Warehouse
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
