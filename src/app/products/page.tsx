"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Package, Lock, Check, CheckCircle, ArrowRight,
  MessageCircle, Phone, Shield, Zap, ChevronDown, ChevronUp
} from "lucide-react";

const FAQS = [
  {
    q: "What is the difference between a Block and a Locker?",
    a: "A Block is a dedicated, fixed storage area (50–5,000 sqft) ideal for pallets, large shipments, or bulk goods. A Locker is a smaller lockable unit for higher-security storage of individual items, documents, or high-value goods.",
  },
  {
    q: "Can I upgrade or change my space requirement later?",
    a: "Yes. We offer flexible agreements that allow you to scale up or down with 30 days' notice. Our team will match you to available space at the same or nearby location.",
  },
  {
    q: "Is VAT included in the quoted prices?",
    a: "All prices shown are exclusive of 5% UAE VAT, which will be applied at invoicing.",
  },
  {
    q: "What is the minimum contract duration?",
    a: "Blocks can be reserved from 1 month. Lockers are available weekly, monthly, or annually.",
  },
  {
    q: "Do I get a dedicated access point or shared entry?",
    a: "Both products include dedicated or clearly partitioned access. Lockers have individual padlock provisions. Blocks have separate bay doors or access points where available.",
  },
];

interface ProductFormState {
  name: string;
  company: string;
  phone: string;
  email: string;
  size: string;
  duration: string;
  location: string;
}

function ProductForm({
  product,
  onClose,
}: {
  product: "block" | "locker";
  onClose: () => void;
}) {
  const [form, setForm] = useState<ProductFormState>({
    name: "", company: "", phone: "", email: "",
    size: "", duration: "", location: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const isBlock = product === "block";
  const whatsappMsg = encodeURIComponent(
    `Hi, I'd like to book a Storage ${isBlock ? "Block" : "Locker"} — ${form.size || "size TBD"} at ${form.location || "location TBD"} for ${form.duration || "duration TBD"}.`
  );

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="font-heading font-bold text-slate-900 text-xl mb-2">Enquiry Received!</h3>
        <p className="text-slate-500 text-sm mb-6">
          Our team will call you within 2 business hours to confirm availability and pricing.
        </p>
        <a
          href={`https://wa.me/971544462859?text=${whatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold rounded-xl transition-colors text-sm"
        >
          <MessageCircle className="w-4 h-4" />
          Chat on WhatsApp too
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-slate-500 mb-1 block">Name *</label>
          <input
            required
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Your name"
            className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-500 mb-1 block">Company *</label>
          <input
            required
            type="text"
            value={form.company}
            onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
            placeholder="Company name"
            className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
          />
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-slate-500 mb-1 block">Phone / WhatsApp *</label>
        <input
          required
          type="tel"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          placeholder="+971 50 000 0000"
          className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
        />
      </div>
      <div>
        <label className="text-xs font-medium text-slate-500 mb-1 block">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          placeholder="you@company.com"
          className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-slate-500 mb-1 block">
            {isBlock ? "Block Size Needed" : "Locker Size"}
          </label>
          <select
            value={form.size}
            onChange={(e) => setForm((f) => ({ ...f, size: e.target.value }))}
            className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none bg-white"
          >
            <option value="">Select size</option>
            {isBlock ? (
              <>
                <option>50–200 sqft (Small)</option>
                <option>200–500 sqft (Medium)</option>
                <option>500–2,000 sqft (Large)</option>
                <option>2,000+ sqft (XL)</option>
              </>
            ) : (
              <>
                <option>Small Locker (~10 CBM)</option>
                <option>Medium Locker (~30 CBM)</option>
                <option>Large Locker (~60 CBM)</option>
              </>
            )}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-slate-500 mb-1 block">Duration</label>
          <select
            value={form.duration}
            onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
            className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none bg-white"
          >
            <option value="">Select</option>
            {isBlock ? (
              <>
                <option>1 month</option>
                <option>3 months</option>
                <option>6 months</option>
                <option>12 months</option>
              </>
            ) : (
              <>
                <option>1 week</option>
                <option>1 month</option>
                <option>3 months</option>
                <option>6 months</option>
                <option>12 months</option>
              </>
            )}
          </select>
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-slate-500 mb-1 block">Preferred Location</label>
        <select
          value={form.location}
          onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
          className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none bg-white"
        >
          <option value="">Any UAE location</option>
          <option>JAFZA, Dubai</option>
          <option>Jebel Ali, Dubai</option>
          <option>DIP, Dubai</option>
          <option>Al Quoz, Dubai</option>
          <option>Mussafah, Abu Dhabi</option>
          <option>Hamriyah, Sharjah</option>
        </select>
      </div>
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-colors text-sm"
        >
          Get a Quote
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-3 border border-slate-200 text-slate-600 rounded-xl text-sm hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function ProductsPage() {
  const [activeForm, setActiveForm] = useState<"block" | "locker" | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-brand-500/20 text-brand-300 text-sm font-semibold px-4 py-1.5 rounded-full border border-brand-500/30 mb-6">
            <Zap className="w-4 h-4" />
            Ready-to-Book Storage Products
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
            Standardised Storage.<br />
            <span className="text-brand-400">Book Online, Move In Fast.</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            No long negotiations. No site visits before booking. Fixed pricing, clear contracts,
            and availability confirmed within 24 hours.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-16">
        <div className="grid md:grid-cols-2 gap-6">

          {/* Block */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
            <div className="bg-gradient-to-br from-brand-400 to-brand-700 p-8 text-white">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-heading text-2xl font-bold mb-1">Storage Block</h2>
              <p className="text-brand-100 text-sm">
                A dedicated, fixed storage bay — your own partitioned space
              </p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold">AED 1,200</span>
                <span className="text-brand-200 text-sm">/month</span>
                <span className="text-brand-300 text-xs ml-1">(from · excl. VAT)</span>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-2.5 mb-6">
                {[
                  "50 – 5,000 sqft available",
                  "24/7 secured access",
                  "CCTV monitoring",
                  "Fire fighting systems",
                  "Loading dock access",
                  "Flexible 1-month minimum",
                  "Key Account Manager assigned",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-brand-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-brand-600" />
                    </div>
                    <span className="text-sm text-slate-700">{f}</span>
                  </div>
                ))}
              </div>

              {activeForm === "block" ? (
                <div className="border border-brand-100 rounded-2xl p-5 bg-brand-50">
                  <h3 className="font-heading font-semibold text-slate-900 mb-4">
                    Book a Storage Block
                  </h3>
                  <ProductForm product="block" onClose={() => setActiveForm(null)} />
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => setActiveForm("block")}
                    className="flex items-center justify-between w-full px-5 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-colors"
                  >
                    Book a Block
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <a
                    href="https://wa.me/971544462859?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20a%20Storage%20Block"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 border border-slate-200 hover:border-green-300 text-slate-700 font-medium rounded-xl transition-colors text-sm"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    Ask on WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Locker */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
            <div className="bg-gradient-to-br from-teal-400 to-teal-700 p-8 text-white">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-heading text-2xl font-bold mb-1">Storage Locker</h2>
              <p className="text-teal-100 text-sm">
                A personal lockable unit — your lock, your key, your control
              </p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold">AED 250</span>
                <span className="text-teal-200 text-sm">/month</span>
                <span className="text-teal-300 text-xs ml-1">(from · excl. VAT)</span>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-2.5 mb-6">
                {[
                  "Small / Medium / Large units",
                  "Personal padlock provision",
                  "Climate-controlled environment",
                  "24/7 access with keycard",
                  "CCTV in all common areas",
                  "Weekly or monthly contracts",
                  "Available in Dubai, Abu Dhabi & Sharjah",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-teal-600" />
                    </div>
                    <span className="text-sm text-slate-700">{f}</span>
                  </div>
                ))}
              </div>

              {activeForm === "locker" ? (
                <div className="border border-teal-100 rounded-2xl p-5 bg-teal-50">
                  <h3 className="font-heading font-semibold text-slate-900 mb-4">
                    Book a Storage Locker
                  </h3>
                  <ProductForm product="locker" onClose={() => setActiveForm(null)} />
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => setActiveForm("locker")}
                    className="flex items-center justify-between w-full px-5 py-3.5 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl transition-colors"
                  >
                    Book a Locker
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <a
                    href="https://wa.me/971544462859?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20a%20Storage%20Locker"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 border border-slate-200 hover:border-green-300 text-slate-700 font-medium rounded-xl transition-colors text-sm"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    Ask on WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trust bar */}
        <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
          <div className="grid sm:grid-cols-4 gap-6 text-center">
            {[
              { icon: <Shield className="w-5 h-5 text-emerald-600" />, label: "Verified Facilities", desc: "All warehouses are inspected and certified" },
              { icon: <Zap className="w-5 h-5 text-brand-600" />, label: "24-Hour Confirmation", desc: "Availability confirmed within one business day" },
              { icon: <Check className="w-5 h-5 text-teal-600" />, label: "No Hidden Fees", desc: "Fixed monthly rate — only VAT added" },
              { icon: <Phone className="w-5 h-5 text-purple-600" />, label: "Dedicated Support", desc: "A Key Account Manager for your account" },
            ].map((t) => (
              <div key={t.label} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                  {t.icon}
                </div>
                <p className="font-semibold text-slate-800 text-sm">{t.label}</p>
                <p className="text-xs text-slate-500">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-12">
          <h2 className="font-heading text-2xl font-bold text-slate-900 text-center mb-6">
            Frequently Asked Questions
          </h2>
          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100">
            {FAQS.map((faq, i) => (
              <div key={i} className="p-5">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex items-start justify-between w-full text-left gap-4"
                >
                  <span className="font-medium text-slate-800 text-sm leading-relaxed">
                    {faq.q}
                  </span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  )}
                </button>
                {openFaq === i && (
                  <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-brand-500 to-brand-700 rounded-2xl p-8 text-center text-white">
          <h2 className="font-heading text-2xl font-bold mb-2">
            Need a custom warehouse solution?
          </h2>
          <p className="text-brand-100 mb-6">
            For larger spaces, longer contracts, or specialised requirements — our team will find the right fit.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/warehouses"
              className="px-6 py-3 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-colors text-sm"
            >
              Browse All Warehouses
            </Link>
            <a
              href="https://wa.me/971544462859?text=Hi%2C%20I%20have%20a%20custom%20storage%20requirement"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold rounded-xl transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
