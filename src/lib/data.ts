export type WarehouseType = "Dry" | "Chiller" | "AC" | "Open Yard";
export type LeadStatus = "Open" | "Confirmed" | "Lost";

export interface Lead {
  id: string;
  city: string;
  area: string;
  warehouseType: WarehouseType;
  sqft: string;
  duration: string;
  postedDays: number;
  status: LeadStatus;
  industry: string;
  description: string;
  responses: number;
}

export interface Partner {
  id: string;
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  location: string;
  sqft: number;
  warehouseTypes: WarehouseType[];
  verified: boolean;
}

export const UAE_CITIES = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Ras Al Khaimah",
  "Fujairah",
  "Umm Al Quwain",
];

export const WAREHOUSE_TYPES: WarehouseType[] = [
  "Dry",
  "Chiller",
  "AC",
  "Open Yard",
];

export const MOCK_LEADS: Lead[] = [
  {
    id: "L-1001",
    city: "Dubai",
    area: "Al Quoz",
    warehouseType: "Dry",
    sqft: "5,000–10,000 sqft",
    duration: "12 months",
    postedDays: 1,
    status: "Open",
    industry: "E-commerce",
    description:
      "Looking for a dry warehouse in Al Quoz or surrounding areas for storing general merchandise. Must have 24/7 access and loading dock.",
    responses: 4,
  },
  {
    id: "L-1002",
    city: "Dubai",
    area: "JAFZA",
    warehouseType: "Chiller",
    sqft: "2,000–3,000 sqft",
    duration: "6 months",
    postedDays: 2,
    status: "Open",
    industry: "Food & Beverage",
    description:
      "Food-grade chiller space required in JAFZA or nearby free zone. Temperature range 2–8°C. HACCP certification preferred.",
    responses: 7,
  },
  {
    id: "L-1003",
    city: "Abu Dhabi",
    area: "Mussafah",
    warehouseType: "Open Yard",
    sqft: "20,000+ sqft",
    duration: "24 months",
    postedDays: 3,
    status: "Open",
    industry: "Construction",
    description:
      "Heavy equipment storage in Mussafah Industrial Area. Need secure fenced yard with crane access. Long-term contract preferred.",
    responses: 2,
  },
  {
    id: "L-1004",
    city: "Sharjah",
    area: "SAIF Zone",
    warehouseType: "AC",
    sqft: "1,000–2,000 sqft",
    duration: "3 months",
    postedDays: 1,
    status: "Open",
    industry: "Pharmaceuticals",
    description:
      "Temperature-controlled AC storage in SAIF Zone for pharmaceutical products. Must maintain 20–25°C consistently.",
    responses: 9,
  },
  {
    id: "L-1005",
    city: "Dubai",
    area: "DIP",
    warehouseType: "Dry",
    sqft: "10,000–15,000 sqft",
    duration: "18 months",
    postedDays: 4,
    status: "Open",
    industry: "Retail",
    description:
      "Large dry storage in Dubai Investment Park for a retail chain expanding regionally. Racking system in place preferred.",
    responses: 5,
  },
  {
    id: "L-1006",
    city: "Ajman",
    area: "Ajman Free Zone",
    warehouseType: "Dry",
    sqft: "3,000–5,000 sqft",
    duration: "12 months",
    postedDays: 5,
    status: "Open",
    industry: "Automotive",
    description:
      "Spare parts warehouse in Ajman Free Zone. Good road access and close to main highway preferred.",
    responses: 3,
  },
  {
    id: "L-1007",
    city: "Ras Al Khaimah",
    area: "RAK Free Zone",
    warehouseType: "Chiller",
    sqft: "1,500–2,500 sqft",
    duration: "9 months",
    postedDays: 2,
    status: "Open",
    industry: "Food & Beverage",
    description:
      "Chiller storage for a regional dairy distributor. Requires humidity control and daily access for delivery operations.",
    responses: 1,
  },
  {
    id: "L-1008",
    city: "Dubai",
    area: "Ras Al Khor",
    warehouseType: "Open Yard",
    sqft: "8,000–12,000 sqft",
    duration: "6 months",
    postedDays: 6,
    status: "Open",
    industry: "Logistics",
    description:
      "Temporary open yard for container staging and transit storage near Ras Al Khor. CCTV and security required.",
    responses: 6,
  },
  {
    id: "L-1009",
    city: "Abu Dhabi",
    area: "Khalifa Industrial Zone",
    warehouseType: "AC",
    sqft: "4,000–6,000 sqft",
    duration: "12 months",
    postedDays: 3,
    status: "Open",
    industry: "Electronics",
    description:
      "AC warehouse for high-value electronics storage in KIZAD. Must have fire suppression system and 24/7 security.",
    responses: 8,
  },
  {
    id: "L-1010",
    city: "Fujairah",
    area: "Fujairah Free Zone",
    warehouseType: "Dry",
    sqft: "5,000–8,000 sqft",
    duration: "12 months",
    postedDays: 7,
    status: "Open",
    industry: "Import/Export",
    description:
      "Dry bonded warehouse near Fujairah Port for import/export goods. Customs clearance support a plus.",
    responses: 2,
  },
  {
    id: "L-1011",
    city: "Dubai",
    area: "Al Quoz",
    warehouseType: "Chiller",
    sqft: "500–1,000 sqft",
    duration: "3 months",
    postedDays: 8,
    status: "Confirmed",
    industry: "Catering",
    description:
      "Small chiller unit for a catering company. Needs to be operational immediately. Flexible lease preferred.",
    responses: 12,
  },
  {
    id: "L-1012",
    city: "Sharjah",
    area: "Industrial Area 1",
    warehouseType: "Dry",
    sqft: "7,000–10,000 sqft",
    duration: "24 months",
    postedDays: 10,
    status: "Lost",
    industry: "FMCG",
    description:
      "FMCG distributor looking for dry warehouse in Sharjah with easy highway access. Mezzanine floor preferred.",
    responses: 15,
  },
];

export const STATS = {
  totalLeads: 25000,
  convertedOrders: 2000,
  monthlyLeads: 1000,
  partnerWarehouses: 180,
  uaeCities: 7,
};

// ─── Customer-facing Warehouse Listings ───────────────────────────────────────

export type TemperatureType =
  | "Ambient"
  | "AC"
  | "Chiller"
  | "Cold Storage"
  | "Frozen";

export type StorageFormat =
  | "Bulk Space"
  | "Rack Space"
  | "Lockable Unit"
  | "Open Yard"
  | "Cage";

export type WarehouseSpecialization =
  | "General Cargo"
  | "Food Grade"
  | "Dangerous Goods"
  | "Pharmaceutical"
  | "Chemical"
  | "E-commerce";

export interface WarehouseListing {
  id: string;
  name: string;
  city: string;
  area: string;         // sub-area / zone e.g. "JAFZA"
  location: string;     // display string e.g. "JAFZA, Dubai"
  specialization: WarehouseSpecialization;
  storageFormat: StorageFormat;
  temperature: TemperatureType;
  minSqft: number;
  maxSqft: number;
  pricePerCbm: number;  // AED per CBM per day
  pricePerSqft: number; // AED per sqft per month
  rating: number;
  reviewCount: number;
  features: string[];
  certifications: string[];
  verified: boolean;
  available: boolean;
  minContract: string;  // "1 month", "3 months" etc.
}

export const MOCK_WAREHOUSES: WarehouseListing[] = [
  {
    id: "WH-100201",
    name: "Gulf Logistics Hub",
    city: "Dubai",
    area: "JAFZA",
    location: "JAFZA, Dubai",
    specialization: "General Cargo",
    storageFormat: "Bulk Space",
    temperature: "Ambient",
    minSqft: 1000,
    maxSqft: 50000,
    pricePerCbm: 0.45,
    pricePerSqft: 8,
    rating: 4.8,
    reviewCount: 42,
    features: ["24/7 Access", "CCTV", "Fire Fighting", "Loading Docks", "Forklift Available", "WMS Software"],
    certifications: ["HCIS Approved", "Civil Defense Certified"],
    verified: true,
    available: true,
    minContract: "1 month",
  },
  {
    id: "WH-100202",
    name: "Jebel Ali Cold Chain Center",
    city: "Dubai",
    area: "Jebel Ali",
    location: "Jebel Ali, Dubai",
    specialization: "Food Grade",
    storageFormat: "Rack Space",
    temperature: "Chiller",
    minSqft: 500,
    maxSqft: 10000,
    pricePerCbm: 1.2,
    pricePerSqft: 22,
    rating: 4.9,
    reviewCount: 28,
    features: ["Temperature Monitoring", "HACCP Compliant", "Blast Freezer", "24/7 Security", "Humidity Control"],
    certifications: ["HACCP Certified", "Food Grade Approved", "ISO 22000"],
    verified: true,
    available: true,
    minContract: "3 months",
  },
  {
    id: "WH-100203",
    name: "DIP Premium Storage",
    city: "Dubai",
    area: "DIP",
    location: "Dubai Investment Park, Dubai",
    specialization: "E-commerce",
    storageFormat: "Rack Space",
    temperature: "AC",
    minSqft: 200,
    maxSqft: 15000,
    pricePerCbm: 0.85,
    pricePerSqft: 15,
    rating: 4.7,
    reviewCount: 61,
    features: ["AC Throughout", "Mezzanine Floor", "CCTV", "Loading Bay", "Racking System", "WMS Integration"],
    certifications: ["HCIS Approved"],
    verified: true,
    available: true,
    minContract: "1 month",
  },
  {
    id: "WH-100204",
    name: "Al Quoz Industrial Yard",
    city: "Dubai",
    area: "Al Quoz",
    location: "Al Quoz, Dubai",
    specialization: "General Cargo",
    storageFormat: "Open Yard",
    temperature: "Ambient",
    minSqft: 500,
    maxSqft: 30000,
    pricePerCbm: 0.3,
    pricePerSqft: 5,
    rating: 4.3,
    reviewCount: 19,
    features: ["Fenced & Gated", "CCTV", "Crane Access", "24/7 Security", "Hardstand Surface"],
    certifications: ["Civil Defense Certified"],
    verified: true,
    available: true,
    minContract: "1 month",
  },
  {
    id: "WH-100205",
    name: "DIC Pharma Vault",
    city: "Dubai",
    area: "DIC",
    location: "Dubai Industrial City, Dubai",
    specialization: "Pharmaceutical",
    storageFormat: "Rack Space",
    temperature: "AC",
    minSqft: 500,
    maxSqft: 8000,
    pricePerCbm: 1.1,
    pricePerSqft: 20,
    rating: 4.9,
    reviewCount: 35,
    features: ["GDP Compliant", "Temperature Logging", "Restricted Access", "Fire Suppression", "Backup Generator"],
    certifications: ["GDP Certified", "MOH Approved", "ISO 9001"],
    verified: true,
    available: true,
    minContract: "3 months",
  },
  {
    id: "WH-100206",
    name: "JAFZA DG Storage",
    city: "Dubai",
    area: "JAFZA",
    location: "JAFZA, Dubai",
    specialization: "Dangerous Goods",
    storageFormat: "Bulk Space",
    temperature: "Ambient",
    minSqft: 1000,
    maxSqft: 20000,
    pricePerCbm: 0.75,
    pricePerSqft: 14,
    rating: 4.6,
    reviewCount: 22,
    features: ["DG Compliant Bunds", "Explosion-Proof Fittings", "24/7 Security", "Fire Suppression", "Spill Containment"],
    certifications: ["HCIS Approved", "DG Class I–IX", "Civil Defense Certified"],
    verified: true,
    available: true,
    minContract: "1 month",
  },
  {
    id: "WH-100207",
    name: "Ras Al Khor Logistics Park",
    city: "Dubai",
    area: "Ras Al Khor",
    location: "Ras Al Khor, Dubai",
    specialization: "General Cargo",
    storageFormat: "Bulk Space",
    temperature: "Ambient",
    minSqft: 2000,
    maxSqft: 40000,
    pricePerCbm: 0.4,
    pricePerSqft: 7,
    rating: 4.4,
    reviewCount: 33,
    features: ["Loading Docks x 6", "Forklift Available", "CCTV", "Canteen", "Office Space"],
    certifications: ["HCIS Approved"],
    verified: true,
    available: true,
    minContract: "1 month",
  },
  {
    id: "WH-100208",
    name: "Mussafah Cold Storage",
    city: "Abu Dhabi",
    area: "Mussafah",
    location: "Mussafah, Abu Dhabi",
    specialization: "Food Grade",
    storageFormat: "Rack Space",
    temperature: "Cold Storage",
    minSqft: 500,
    maxSqft: 12000,
    pricePerCbm: 1.5,
    pricePerSqft: 28,
    rating: 4.7,
    reviewCount: 18,
    features: ["Multi-Temperature Zones", "Blast Freezer", "HACCP", "24/7 Monitoring", "Loading Bay"],
    certifications: ["HACCP Certified", "ADFCA Approved", "ISO 22000"],
    verified: true,
    available: true,
    minContract: "3 months",
  },
  {
    id: "WH-100209",
    name: "KIZAD General Warehouse",
    city: "Abu Dhabi",
    area: "KIZAD",
    location: "Khalifa Industrial Zone, Abu Dhabi",
    specialization: "General Cargo",
    storageFormat: "Bulk Space",
    temperature: "Ambient",
    minSqft: 1000,
    maxSqft: 60000,
    pricePerCbm: 0.38,
    pricePerSqft: 6.5,
    rating: 4.5,
    reviewCount: 27,
    features: ["Free Zone Benefits", "Port Access", "24/7 Security", "Loading Docks", "CCTV"],
    certifications: ["HCIS Approved", "Free Zone Compliant"],
    verified: true,
    available: true,
    minContract: "1 month",
  },
  {
    id: "WH-100210",
    name: "Hamriyah Free Zone Depot",
    city: "Sharjah",
    area: "Hamriyah",
    location: "Hamriyah Free Zone, Sharjah",
    specialization: "Chemical",
    storageFormat: "Bulk Space",
    temperature: "Ambient",
    minSqft: 1000,
    maxSqft: 25000,
    pricePerCbm: 0.55,
    pricePerSqft: 9.5,
    rating: 4.3,
    reviewCount: 14,
    features: ["Chemical Bunding", "Ventilation System", "Fire Suppression", "CCTV", "Loading Access"],
    certifications: ["HCIS Approved", "SIRA Certified"],
    verified: true,
    available: true,
    minContract: "1 month",
  },
  {
    id: "WH-100211",
    name: "Sharjah Industrial Racked Store",
    city: "Sharjah",
    area: "Sharjah Industrial Area",
    location: "Industrial Area 1, Sharjah",
    specialization: "E-commerce",
    storageFormat: "Rack Space",
    temperature: "AC",
    minSqft: 500,
    maxSqft: 10000,
    pricePerCbm: 0.7,
    pricePerSqft: 12,
    rating: 4.5,
    reviewCount: 24,
    features: ["Racking System", "AC Throughout", "CCTV", "24/7 Access", "Office Space"],
    certifications: ["HCIS Approved"],
    verified: false,
    available: true,
    minContract: "1 month",
  },
  {
    id: "WH-100212",
    name: "Ajman Open Yard & Covered Store",
    city: "Ajman",
    area: "Ajman Industrial",
    location: "Ajman Industrial Area, Ajman",
    specialization: "General Cargo",
    storageFormat: "Bulk Space",
    temperature: "Ambient",
    minSqft: 500,
    maxSqft: 20000,
    pricePerCbm: 0.32,
    pricePerSqft: 5.5,
    rating: 4.1,
    reviewCount: 9,
    features: ["Combined Covered + Yard", "CCTV", "Loading Bay", "Security Guard"],
    certifications: ["Civil Defense Certified"],
    verified: true,
    available: true,
    minContract: "1 month",
  },
];

// ─── Popular Locations ─────────────────────────────────────────────────────────

export interface PopularLocation {
  area: string;
  city: string;
  slug: string;   // URL-safe param
}

export const POPULAR_LOCATIONS: PopularLocation[] = [
  { area: "JAFZA", city: "Dubai", slug: "JAFZA" },
  { area: "Jebel Ali", city: "Dubai", slug: "Jebel Ali" },
  { area: "DIC", city: "Dubai", slug: "DIC" },
  { area: "DIP", city: "Dubai", slug: "DIP" },
  { area: "Al Quoz", city: "Dubai", slug: "Al Quoz" },
  { area: "Ras Al Khor", city: "Dubai", slug: "Ras Al Khor" },
  { area: "Dubai Logistics City", city: "Dubai", slug: "Dubai Logistics City" },
  { area: "Mussafah", city: "Abu Dhabi", slug: "Mussafah" },
  { area: "KIZAD", city: "Abu Dhabi", slug: "KIZAD" },
  { area: "Hamriyah Free Zone", city: "Sharjah", slug: "Hamriyah" },
  { area: "SAIF Zone", city: "Sharjah", slug: "SAIF Zone" },
  { area: "Ajman Free Zone", city: "Ajman", slug: "Ajman Free Zone" },
];

// ─── Warehouse Type Categories ─────────────────────────────────────────────────

export interface WarehouseCategory {
  type: WarehouseSpecialization;
  icon: string;
  description: string;
  color: string; // tailwind bg color class
  textColor: string;
}

export const WAREHOUSE_CATEGORIES: WarehouseCategory[] = [
  {
    type: "General Cargo",
    icon: "📦",
    description: "Standard dry storage for all types of goods",
    color: "bg-slate-100",
    textColor: "text-slate-700",
  },
  {
    type: "Food Grade",
    icon: "🌡️",
    description: "HACCP-certified facilities for food & beverages",
    color: "bg-emerald-50",
    textColor: "text-emerald-700",
  },
  {
    type: "Dangerous Goods",
    icon: "⚠️",
    description: "HCIS-approved DG Class I–IX compliant storage",
    color: "bg-orange-50",
    textColor: "text-orange-700",
  },
  {
    type: "Pharmaceutical",
    icon: "💊",
    description: "GDP-certified, MOH-approved pharma storage",
    color: "bg-blue-50",
    textColor: "text-blue-700",
  },
  {
    type: "Chemical",
    icon: "🧪",
    description: "Bunded and ventilated chemical storage facilities",
    color: "bg-purple-50",
    textColor: "text-purple-700",
  },
  {
    type: "E-commerce",
    icon: "🛒",
    description: "Racked, WMS-enabled fulfilment-ready warehouses",
    color: "bg-brand-50",
    textColor: "text-brand-700",
  },
];
