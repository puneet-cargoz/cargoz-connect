"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import CargozLogo from "@/components/CargozLogo";
import {
  Building2, Users, TrendingUp, Globe, Phone, MessageCircle,
  MapPin, ShieldCheck, Zap, Star, ArrowRight, Check, Mail
} from "lucide-react";

const TEAM = [
  {
    name: "Mohammed Al Rashidi",
    role: "CEO & Founder",
    initials: "MA",
    color: "bg-brand-500",
    bio: "Former logistics director with 15+ years in UAE supply chain. Founded Cargoz to eliminate the broker-driven model and connect warehouses directly with businesses.",
  },
  {
    name: "Karim Aziz",
    role: "COO & Co-Founder",
    initials: "KA",
    color: "bg-teal-500",
    bio: "Operations specialist who scaled warehouse networks across the GCC. Leads the partner onboarding and marketplace operations at Cargoz.",
  },
  {
    name: "Priya Sharma",
    role: "Head of Partner Success",
    initials: "PS",
    color: "bg-amber-500",
    bio: "Manages 180+ warehouse partner relationships. Ensures every partner gets real leads, real support, and real revenue growth.",
  },
];

const STATS = [
  { value: "25,000+", label: "Leads collected", icon: <TrendingUp className="w-5 h-5 text-brand-500" /> },
  { value: "2,000+", label: "Orders converted", icon: <Check className="w-5 h-5 text-emerald-500" /> },
  { value: "180+", label: "Partner warehouses", icon: <Building2 className="w-5 h-5 text-teal-500" /> },
  { value: "7", label: "Emirates covered", icon: <Globe className="w-5 h-5 text-blue-500" /> },
  { value: "AED 50M+", label: "Storage value matched", icon: <Zap className="w-5 h-5 text-amber-500" /> },
  { value: "98%", label: "Partner satisfaction", icon: <Star className="w-5 h-5 text-amber-400" /> },
];

const MILESTONES = [
  { year: "2021", title: "Cargoz founded", desc: "Started with a WhatsApp group connecting warehouse owners to businesses in Dubai." },
  { year: "2022", title: "1,000 leads milestone", desc: "Expanded to Abu Dhabi and Sharjah. Launched the digital lead marketplace." },
  { year: "2023", title: "10,000 leads & 100 partners", desc: "Onboarded 100+ verified warehouse partners. Introduced Blocks & Lockers." },
  { year: "2024", title: "AED 50M+ matched", desc: "Over AED 50M in storage value matched. Serving F&B, pharma, e-commerce, and industrial sectors." },
  { year: "2025", title: "Full marketplace launch", desc: "Launched AI-powered warehouse search, digital booking, and partner dashboard." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-950 via-brand-950 to-slate-900 pt-28 pb-20 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#7957ff 1px, transparent 1px), linear-gradient(to right, #7957ff 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 bg-brand-500/20 text-brand-300 text-xs font-semibold px-3 py-1.5 rounded-full border border-brand-500/30 mb-6">
            <Building2 className="w-3.5 h-3.5" />
            About Cargoz
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            We&apos;re making warehouse storage<br />
            <span className="bg-gradient-to-r from-brand-400 to-teal-400 bg-clip-text text-transparent">
              simple, fast, and transparent
            </span>
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto">
            Cargoz is the UAE&apos;s first marketplace that connects businesses needing storage
            with verified warehouse owners — no brokers, no hidden fees, no long negotiations.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-heading text-3xl font-bold text-slate-900 mb-4">Our Story</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Cargoz was born out of a simple frustration: finding warehouse space in the UAE
                  was too complicated. Businesses spent weeks calling brokers, visiting facilities,
                  and negotiating terms — only to end up overpaying for space that didn&apos;t quite fit.
                </p>
                <p>
                  Meanwhile, warehouse owners had idle space costing them money, with no easy way
                  to reach the businesses who needed it. The industry ran on phone calls, WhatsApp
                  forwards, and personal connections.
                </p>
                <p>
                  We built Cargoz to fix this. A transparent marketplace where businesses find verified
                  storage in minutes, and warehouse owners fill their space without expensive sales teams.
                  No brokerage fees. No lock-in contracts. Just direct connections.
                </p>
              </div>
            </div>

            {/* Milestones */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
              <h3 className="font-heading font-semibold text-slate-800 text-sm uppercase tracking-wider mb-5">
                Our Journey
              </h3>
              <div className="space-y-5">
                {MILESTONES.map((m, i) => (
                  <div key={m.year} className="flex gap-4">
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 bg-brand-50 border-2 border-brand-200 rounded-xl flex items-center justify-center">
                        <span className="font-heading font-bold text-xs text-brand-600">{m.year}</span>
                      </div>
                      {i < MILESTONES.length - 1 && (
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-px h-5 bg-slate-200" />
                      )}
                    </div>
                    <div className="pt-1">
                      <p className="font-semibold text-sm text-slate-800">{m.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="bg-slate-50 border-y border-slate-100 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-4 text-center">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                  {s.icon}
                </div>
                <p className="font-heading text-xl font-bold text-slate-900">{s.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-slate-900 mb-2">
              Meet the Team
            </h2>
            <p className="text-slate-500">
              Logistics professionals building the future of warehouse storage in the UAE.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl border border-slate-200 p-6 text-center hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className={`w-16 h-16 ${member.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-white font-bold text-xl">{member.initials}</span>
                </div>
                <h3 className="font-heading font-bold text-slate-900 text-lg">{member.name}</h3>
                <p className="text-sm text-brand-600 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="bg-slate-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-slate-900 mb-8 text-center">
            What We Believe
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <ShieldCheck className="w-5 h-5 text-teal-500" />,
                title: "Transparency first",
                desc: "No hidden fees. No brokerage commissions. Every warehouse on Cargoz is verified by our team before it goes live.",
              },
              {
                icon: <Zap className="w-5 h-5 text-amber-500" />,
                title: "Speed matters",
                desc: "Businesses shouldn't wait weeks for a warehouse quote. We connect you within 24 hours and handle all the back-and-forth.",
              },
              {
                icon: <Users className="w-5 h-5 text-brand-500" />,
                title: "Fair for both sides",
                desc: "Customers get verified options fast. Warehouse owners get real leads without paying for ads. We only earn when both sides succeed.",
              },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mb-3">
                  {v.icon}
                </div>
                <h3 className="font-heading font-semibold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / CTA */}
      <section className="bg-brand-500 py-14 px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="font-heading text-3xl font-bold mb-3">Get in Touch</h2>
          <p className="text-brand-100 mb-8 text-lg">
            Whether you need storage or have space to offer — we&apos;d love to hear from you.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap mb-8">
            <Link
              href="/warehouses"
              className="px-7 py-3.5 bg-white text-brand-700 font-bold rounded-xl hover:bg-brand-50 transition-colors text-sm"
            >
              Browse Warehouses
            </Link>
            <Link
              href="/register"
              className="px-7 py-3.5 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl transition-colors text-sm"
            >
              List Your Warehouse
            </Link>
            <a
              href="https://wa.me/971544462859?text=Hi%2C%20I%27d%20like%20to%20learn%20more%20about%20Cargoz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold rounded-xl transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
          <div className="flex items-center justify-center gap-6 flex-wrap text-brand-100 text-sm">
            <a href="tel:800665544" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-4 h-4" /> 800 665544
            </a>
            <a href="mailto:hello@cargoz.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-4 h-4" /> hello@cargoz.com
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" /> Dubai, UAE
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3 text-xs text-slate-600">
          <p>&copy; {new Date().getFullYear()} Cargoz. All rights reserved. Dubai, UAE.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-slate-400 transition-colors">Home</Link>
            <Link href="/warehouses" className="hover:text-slate-400 transition-colors">Warehouses</Link>
            <Link href="/leads" className="hover:text-slate-400 transition-colors">Leads</Link>
            <Link href="/register" className="hover:text-slate-400 transition-colors">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
