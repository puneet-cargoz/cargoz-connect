"use client";

import { useState, useEffect, useRef } from "react";

/* ─── SVG coordinates ───
   viewBox = 0 0 800 400
   Y-axis: sqft (top = max)
   X-axis: time (left → right)
   Chart area: x=[80..760], y=[40..340]
*/

// The actual demand "steps" — business needs fluctuate
const DEMAND_STEPS = [
  { x: 80,  y: 140 },  // start high
  { x: 180, y: 140 },
  { x: 180, y: 180 },  // drop
  { x: 260, y: 180 },
  { x: 260, y: 120 },  // spike
  { x: 340, y: 120 },
  { x: 340, y: 200 },  // big drop
  { x: 430, y: 200 },
  { x: 430, y: 150 },  // recover
  { x: 520, y: 150 },
  { x: 520, y: 100 },  // peak
  { x: 600, y: 100 },
  { x: 600, y: 170 },  // dip
  { x: 680, y: 170 },
  { x: 680, y: 130 },  // recover
  { x: 760, y: 130 },
];

const FIXED_LEASE_Y = 80; // the fixed lease line — top of the rectangle (constant high)
const CHART_BOTTOM = 340;
const CHART_LEFT = 80;
const CHART_RIGHT = 760;

// Build SVG path for the demand step line
function buildStepPath(steps: { x: number; y: number }[]): string {
  return steps.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
}

// Build the "wasted area" polygon (between fixed lease and demand)
function buildWastedArea(steps: { x: number; y: number }[]): string {
  const topLine = `M${CHART_LEFT},${FIXED_LEASE_Y} L${CHART_RIGHT},${FIXED_LEASE_Y}`;
  const reversedSteps = [...steps].reverse().map((p) => `L${p.x},${p.y}`).join(" ");
  return `${topLine} L${CHART_RIGHT},${steps[steps.length - 1].y} ${reversedSteps} Z`;
}

// Build the "you pay" area (between demand and bottom)
function buildUsedArea(steps: { x: number; y: number }[]): string {
  const stepLine = steps.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  return `${stepLine} L${CHART_RIGHT},${CHART_BOTTOM} L${CHART_LEFT},${CHART_BOTTOM} Z`;
}

// Months for X-axis
const MONTHS = ["Jan", "Mar", "May", "Jul", "Sep", "Nov", "Jan"];

export default function PayAsYouGoChart() {
  const [phase, setPhase] = useState<"initial" | "fixed" | "wasted" | "flexible">("initial");
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection observer for scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  // Sequenced animation phases
  useEffect(() => {
    if (!isVisible) return;
    const timers = [
      setTimeout(() => setPhase("fixed"), 400),
      setTimeout(() => setPhase("wasted"), 1800),
      setTimeout(() => setPhase("flexible"), 3600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  const stepPath = buildStepPath(DEMAND_STEPS);
  const wastedAreaPath = buildWastedArea(DEMAND_STEPS);
  const usedAreaPath = buildUsedArea(DEMAND_STEPS);

  // Calculate total path length for stroke animation
  const pathLength = 2200;

  return (
    <div ref={containerRef} className="w-full">
      <style>{`
        @keyframes drawLine {
          from { stroke-dashoffset: ${pathLength}; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseWaste {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 0.75; }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes countSavings {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .draw-line {
          stroke-dasharray: ${pathLength};
          stroke-dashoffset: ${pathLength};
          animation: drawLine 1.2s ease-out forwards;
        }
        .fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .pulse-waste {
          animation: pulseWaste 2s ease-in-out infinite;
        }
        .slide-in {
          animation: slideInRight 0.5s ease-out forwards;
        }
        .count-savings {
          animation: countSavings 0.4s ease-out forwards;
        }
        .hatch-pattern {
          background-image: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 4px,
            rgba(239, 68, 68, 0.2) 4px,
            rgba(239, 68, 68, 0.2) 5px
          );
        }
      `}</style>

      <div className="relative max-w-3xl mx-auto">
        <svg
          viewBox="0 0 800 420"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Hatch pattern for wasted area */}
            <pattern id="wasteHatch" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(-45)">
              <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(239,68,68,0.4)" strokeWidth="2" />
            </pattern>
            {/* Gradient for the used/flexible area */}
            <linearGradient id="usedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#40bcaa" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#40bcaa" stopOpacity="0.1" />
            </linearGradient>
            {/* Gradient for fixed lease waste */}
            <linearGradient id="wasteGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          {/* ── Grid lines ── */}
          {[100, 160, 220, 280, 340].map((y) => (
            <line key={y} x1={80} y1={y} x2={760} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          ))}
          {[180, 280, 380, 480, 580, 680].map((x) => (
            <line key={x} x1={x} y1={40} x2={x} y2={340} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          ))}

          {/* ── Axes ── */}
          <line x1={80} y1={40} x2={80} y2={345} stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <line x1={75} y1={340} x2={765} y2={340} stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />

          {/* Y-axis label */}
          <text x="25" y="195" fill="rgba(255,255,255,0.5)" fontSize="12" fontFamily="Arial" textAnchor="middle" transform="rotate(-90 25 195)">
            Space (sq ft)
          </text>

          {/* X-axis label */}
          <text x="420" y="390" fill="rgba(255,255,255,0.5)" fontSize="12" fontFamily="Arial" textAnchor="middle">
            Time
          </text>

          {/* X-axis month labels */}
          {MONTHS.map((m, i) => (
            <text key={`${m}-${i}`} x={80 + i * ((760 - 80) / 6)} y="360" fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="Arial" textAnchor="middle">
              {m}
            </text>
          ))}

          {/* Y-axis scale labels */}
          {["10k", "8k", "6k", "4k", "2k", "0"].map((label, i) => (
            <text key={label} x="70" y={40 + i * 60 + 4} fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="Arial" textAnchor="end">
              {label}
            </text>
          ))}

          {/* ── Phase: Fixed lease rectangle ── */}
          {(phase === "fixed" || phase === "wasted" || phase === "flexible") && (
            <g className="fade-in-up">
              <rect
                x={CHART_LEFT} y={FIXED_LEASE_Y}
                width={CHART_RIGHT - CHART_LEFT} height={CHART_BOTTOM - FIXED_LEASE_Y}
                fill="rgba(239,68,68,0.06)"
                stroke="rgba(239,68,68,0.5)"
                strokeWidth="2"
                strokeDasharray="8 4"
                rx="2"
              />
              {/* "Fixed annual lease" label */}
              <text x={CHART_RIGHT - 5} y={FIXED_LEASE_Y - 8} fill="rgba(239,68,68,0.8)" fontSize="11" fontFamily="Arial" textAnchor="end" fontWeight="600">
                Fixed Annual Lease
              </text>
            </g>
          )}

          {/* ── Phase: Show wasted area ── */}
          {(phase === "wasted" || phase === "flexible") && (
            <g>
              {/* Wasted area fill */}
              <path
                d={wastedAreaPath}
                fill="url(#wasteGradient)"
                className={phase === "wasted" ? "pulse-waste" : ""}
                style={{ opacity: phase === "flexible" ? 0.3 : 0.6, transition: "opacity 0.8s" }}
              />
              {/* Hatch overlay */}
              <path
                d={wastedAreaPath}
                fill="url(#wasteHatch)"
                style={{ opacity: phase === "flexible" ? 0.2 : 0.7, transition: "opacity 0.8s" }}
              />

              {/* "Wasted spend" label */}
              {phase === "wasted" && (
                <g className="slide-in">
                  <rect x="330" y="95" width="140" height="32" rx="6" fill="rgba(239,68,68,0.9)" />
                  <text x="400" y="116" fill="white" fontSize="12" fontFamily="Arial" textAnchor="middle" fontWeight="700">
                    Wasted Spend
                  </text>
                  {/* Arrow pointing down */}
                  <polygon points="400,127 394,121 406,121" fill="rgba(239,68,68,0.9)" />
                </g>
              )}

              {/* Demand step line */}
              <path
                d={stepPath}
                fill="none"
                stroke={phase === "flexible" ? "#40bcaa" : "rgba(255,255,255,0.7)"}
                strokeWidth="2.5"
                className="draw-line"
                style={{ transition: "stroke 0.8s" }}
              />
            </g>
          )}

          {/* ── Phase: Flexible model ── */}
          {phase === "flexible" && (
            <g>
              {/* Used area (teal) */}
              <path
                d={usedAreaPath}
                fill="url(#usedGradient)"
                className="fade-in-up"
              />

              {/* Bright step line */}
              <path
                d={stepPath}
                fill="none"
                stroke="#40bcaa"
                strokeWidth="3"
              />

              {/* "You only pay this" label */}
              <g className="slide-in" style={{ animationDelay: "0.3s", opacity: 0 }}>
                <rect x="160" y="240" width="180" height="36" rx="8" fill="rgba(64,188,170,0.95)" />
                <text x="250" y="263" fill="white" fontSize="12" fontFamily="Arial" textAnchor="middle" fontWeight="700">
                  You Only Pay This
                </text>
                <polygon points="250,276 244,270 256,270" fill="rgba(64,188,170,0.95)" />
              </g>

              {/* Savings badge */}
              <g className="count-savings" style={{ animationDelay: "0.8s", opacity: 0 }}>
                <rect x="540" y="155" width="160" height="50" rx="10" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.4)" strokeWidth="1.5" />
                <text x="620" y="175" fill="#10b981" fontSize="11" fontFamily="Arial" textAnchor="middle" fontWeight="600">
                  Save up to
                </text>
                <text x="620" y="196" fill="#10b981" fontSize="18" fontFamily="Arial" textAnchor="middle" fontWeight="800">
                  40% on rent
                </text>
              </g>

              {/* Dotted line markers at step changes */}
              {[180, 260, 340, 430, 520, 600, 680].map((x) => (
                <line
                  key={`dot-${x}`}
                  x1={x} y1={340} x2={x}
                  y2={DEMAND_STEPS.find((s) => s.x === x)?.y ?? 200}
                  stroke="rgba(64,188,170,0.2)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
              ))}
            </g>
          )}
        </svg>

        {/* ── Legend below chart ── */}
        <div
          className={`flex flex-wrap justify-center gap-4 sm:gap-8 mt-2 transition-opacity duration-700 ${
            phase === "flexible" ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-3 rounded-sm border-2 border-dashed border-red-400/60 bg-red-400/10" />
            <span className="text-xs sm:text-sm text-slate-400">Fixed annual lease</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-3 rounded-sm bg-gradient-to-r from-teal-400/50 to-teal-400/20" />
            <span className="text-xs sm:text-sm text-teal-400 font-medium">Cargoz flexible model</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="32" height="12"><pattern id="legendHatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(-45)"><line x1="0" y1="0" x2="0" y2="6" stroke="rgba(239,68,68,0.5)" strokeWidth="1.5" /></pattern><rect width="32" height="12" rx="2" fill="url(#legendHatch)" /></svg>
            <span className="text-xs sm:text-sm text-red-400/70">Wasted spend</span>
          </div>
        </div>

        {/* ── Replay button ── */}
        {phase === "flexible" && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => {
                setPhase("initial");
                setTimeout(() => setPhase("fixed"), 400);
                setTimeout(() => setPhase("wasted"), 1800);
                setTimeout(() => setPhase("flexible"), 3600);
              }}
              className="text-xs text-white/30 hover:text-white/60 transition-colors flex items-center gap-1.5"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
              Replay animation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
