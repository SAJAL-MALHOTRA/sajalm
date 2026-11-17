'use client';

import React, { useEffect, useState } from 'react';
import { useSound } from '@/hooks/useSound';
import { ExternalLink, Sparkles } from 'lucide-react';
import { projects } from '@/data/projects';

/* ─────────────────────────────────────────────────────────────
   CORNER BRACKETS COMPONENT
   ───────────────────────────────────────────────────────────── */
function CornerBrackets({ color = 'rgba(255,255,255,0.2)' }: { color?: string }) {
  return (
    <>
      <div
        className="absolute top-1.5 left-1.5 w-1.5 h-1.5 border-t border-l pointer-events-none"
        style={{ borderColor: color }}
      />
      <div
        className="absolute top-1.5 right-1.5 w-1.5 h-1.5 border-t border-r pointer-events-none"
        style={{ borderColor: color }}
      />
      <div
        className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 border-b border-l pointer-events-none"
        style={{ borderColor: color }}
      />
      <div
        className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 border-b border-r pointer-events-none"
        style={{ borderColor: color }}
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   1. PAIRFECT (pairfect.site)
   WebSocket Dyad Sync & Groq Llama-3 LPU Sub-50ms Inference
   ───────────────────────────────────────────────────────────── */
export function PairfectSimulation() {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => (prev + 1) % 4);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-2 select-none bg-[#090A0E]">
      <CornerBrackets color="rgba(244, 63, 94, 0.4)" />

      {/* Top Tag */}
      <div className="flex justify-end pr-1 text-[9px] font-mono text-rose-400 font-semibold">
        WS 12ms · Groq
      </div>

      {/* Centered Dyad Synchronization & LPU Neural Stream */}
      <div className="relative flex-1 flex items-center justify-center">
        <svg viewBox="0 0 160 90" className="w-full h-20 overflow-visible">
          {/* Client A (Sajal) */}
          <circle cx="25" cy="45" r="7" fill="#1C1318" stroke="#F43F5E" strokeWidth="1.5" />
          <text x="25" y="48" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontFamily="monospace" fontWeight="bold">S</text>

          {/* Client B (Partner) */}
          <circle cx="135" cy="45" r="7" fill="#1C1318" stroke="#FB923C" strokeWidth="1.5" />
          <text x="135" y="48" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontFamily="monospace" fontWeight="bold">P</text>

          {/* WebSocket EKG Sync Line */}
          <path
            d="M 32 45 L 55 45 L 60 30 L 66 60 L 72 38 L 76 50 L 80 45 L 128 45"
            fill="none"
            stroke="rgba(244, 63, 94, 0.35)"
            strokeWidth="1.2"
          />

          {/* Groq LPU Core Center Chip */}
          <rect x="70" y="35" width="20" height="20" rx="3" fill="#0D0E12" stroke="#F43F5E" strokeWidth="1.2" />
          <text x="80" y="48" textAnchor="middle" fill="#F43F5E" fontSize="6.5" fontFamily="monospace" fontWeight="bold">LPU</text>

          {/* Animated Token Pulse travelling along stream */}
          <circle
            cx={32 + (pulse / 3) * 96}
            cy="45"
            r="3"
            fill="#FB7185"
            className="transition-all duration-300"
          />
        </svg>
      </div>

      {/* Bottom Technical Telemetry */}
      <div className="flex items-center justify-between font-mono text-[9.5px] px-1 pt-1 border-t border-white/5">
        <span className="text-neutral-500">fwd pass · Llama 3</span>
        <span className="text-rose-400 font-bold">45ms TTFT</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   2. DSA LECTURE RAG (striver-dsa-platform.onrender.com)
   Rotating Radar Sweep & Dual Retrieval (BM25 + Dense RRF)
   ───────────────────────────────────────────────────────────── */
export function DsaRagRadarSimulation() {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    let animId: number;
    const animate = () => {
      setAngle((prev) => (prev + 2.4) % 360);
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Lecture timestamp hit nodes (snapped to video seek points)
  const hits = [
    { x: 75 + 32 * Math.cos(0.9), y: 48 + 32 * Math.sin(0.9), label: '14:22', angleDeg: (0.9 * 180) / Math.PI },
    { x: 75 + 20 * Math.cos(2.4), y: 48 + 20 * Math.sin(2.4), label: '08:15', angleDeg: (2.4 * 180) / Math.PI },
    { x: 75 + 38 * Math.cos(4.2), y: 48 + 38 * Math.sin(4.2), label: '21:04', angleDeg: (4.2 * 180) / Math.PI },
    { x: 75 + 15 * Math.cos(5.5), y: 48 + 15 * Math.sin(5.5), label: '03:40', angleDeg: (5.5 * 180) / Math.PI },
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-2 select-none bg-[#090A0E]">
      <CornerBrackets color="rgba(6, 182, 212, 0.4)" />

      <div className="flex justify-end pr-1 text-[9px] font-mono text-cyan-400 font-semibold">
        RRF #1 · Seek Snap
      </div>

      <div className="relative flex-1 flex items-center justify-center">
        <svg viewBox="0 0 150 96" className="w-full h-20 overflow-visible">
          {/* Concentric Video Timeline Rings */}
          <circle cx="75" cy="48" r="14" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
          <circle cx="75" cy="48" r="28" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
          <circle cx="75" cy="48" r="42" fill="none" stroke="rgba(6, 182, 212, 0.25)" strokeWidth="1" />

          {/* Crosshairs */}
          <line x1="75" y1="6" x2="75" y2="90" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
          <line x1="33" y1="48" x2="117" y2="48" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />

          {/* Rotating Sweep Beam */}
          <g transform={`rotate(${angle} 75 48)`}>
            <path
              d="M 75 48 L 117 48 A 42 42 0 0 0 104.7 18.3 Z"
              fill="url(#rag-sweep-grad)"
              opacity="0.45"
            />
            <line x1="75" y1="48" x2="117" y2="48" stroke="#06B6D4" strokeWidth="1.5" />
          </g>

          <defs>
            <linearGradient id="rag-sweep-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Detected Timestamp Blips */}
          {hits.map((h, idx) => {
            const diff = (angle - h.angleDeg + 360) % 360;
            const isHit = diff < 45;
            return (
              <g key={idx}>
                <circle
                  cx={h.x}
                  cy={h.y}
                  r={isHit ? 3.5 : 2}
                  fill={isHit ? '#22D3EE' : '#38BDF8'}
                  opacity={isHit ? 1 : 0.4}
                  className="transition-all duration-150"
                />
                {isHit && (
                  <text
                    x={h.x + 5}
                    y={h.y - 3}
                    fill="#22D3EE"
                    fontSize="6.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {h.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex items-center justify-between font-mono text-[9.5px] px-1 pt-1 border-t border-white/5">
        <span className="text-neutral-500">BM25 + MiniLM</span>
        <span className="text-cyan-400 font-bold">30% Hit@3</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   3. CYBERNAUTS ARENA
   Authoritative Master-Clock & 16-Desk Wi-Fi Jitter Mesh
   ───────────────────────────────────────────────────────────── */
export function CybernautsMeshSimulation() {
  const [epochTime, setEpochTime] = useState(14.82);
  const [activeDesk, setActiveDesk] = useState(4);

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setEpochTime((prev) => (prev > 0.1 ? Number((prev - 0.05).toFixed(2)) : 15.0));
    }, 50);
    const deskInterval = setInterval(() => {
      setActiveDesk((prev) => (prev + 3) % 16);
    }, 800);
    return () => {
      clearInterval(clockInterval);
      clearInterval(deskInterval);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-2 select-none bg-[#090A0E]">
      <CornerBrackets color="rgba(168, 85, 247, 0.4)" />

      <div className="flex justify-end pr-1 text-[9px] font-mono text-purple-400 font-semibold">
        2.5s Buffer · 16 Desks
      </div>

      {/* 16-Desk Mesh Grid with Center Clock */}
      <div className="relative flex-1 flex flex-col items-center justify-center my-auto">
        <div className="text-sm font-black font-mono text-white tracking-wider mb-1">
          00:{epochTime < 10 ? `0${epochTime.toFixed(2)}` : epochTime.toFixed(2)}
        </div>

        <div className="grid grid-cols-8 gap-1 max-w-[140px]">
          {Array.from({ length: 16 }).map((_, idx) => {
            const isBuzzed = idx === activeDesk;
            return (
              <div
                key={idx}
                className={`w-3.5 h-3.5 rounded-xs flex items-center justify-center font-mono text-[7px] font-bold transition-all ${
                  isBuzzed
                    ? 'bg-rose-500 text-white shadow-[0_0_6px_#F43F5E]'
                    : 'bg-purple-950/60 border border-purple-800/40 text-purple-300'
                }`}
              >
                {idx + 1}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between font-mono text-[9.5px] px-1 pt-1 border-t border-white/5">
        <span className="text-neutral-500">epoch sync</span>
        <span className="text-purple-400 font-bold">0ms drift</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   4. NATIONAL CV CHALLENGE (Rank #16/227)
   16-Grid Spatial Luminance Matrix & Albedo Illusion Solver
   ───────────────────────────────────────────────────────────── */
export function CvAlbedoSimulation() {
  const [activeCell, setActiveCell] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCell((prev) => (prev + 1) % 16);
    }, 250);
    return () => clearInterval(interval);
  }, []);

  const gridLuminance = [
    0.12, 0.28, 0.82, 0.94,
    0.18, 0.35, 0.88, 0.91,
    0.15, 0.42, 0.65, 0.74,
    0.22, 0.39, 0.52, 0.61,
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-2 select-none bg-[#090A0E]">
      <CornerBrackets color="rgba(16, 185, 129, 0.4)" />

      <div className="flex justify-end pr-1 text-[9px] font-mono text-emerald-400 font-semibold">
        Rank #16 / 227
      </div>

      <div className="relative flex-1 flex items-center justify-center">
        <div className="grid grid-cols-4 gap-1 max-w-[110px] p-1 rounded bg-black/60 border border-emerald-500/20">
          {gridLuminance.map((lum, idx) => {
            const isScanning = idx === activeCell;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: isScanning
                    ? '#34D399'
                    : `rgba(16, 185, 129, ${lum * 0.7})`,
                }}
                className={`w-5 h-4 rounded-xs flex items-center justify-center font-mono text-[7px] transition-all ${
                  isScanning ? 'text-black font-bold shadow-[0_0_6px_#34D399]' : 'text-emerald-100 opacity-80'
                }`}
              >
                {lum.toFixed(1)}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between font-mono text-[9.5px] px-1 pt-1 border-t border-white/5">
        <span className="text-neutral-500">FastMLP · CPU</span>
        <span className="text-emerald-400 font-bold">Score: 0.211</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   5. THINKFOLIO
   FinBERT Embeddings & SHAP Feature Attribution Waterfall
   ───────────────────────────────────────────────────────────── */
export function ThinkFolioSimulation() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 3);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const shapBars = [
    { label: 'Alpha', val: 0.38, positive: true },
    { label: 'TailRisk', val: 0.24, positive: true },
    { label: 'VolSkew', val: -0.16, positive: false },
    { label: 'Liquidity', val: 0.19, positive: true },
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-2 select-none bg-[#090A0E]">
      <CornerBrackets color="rgba(245, 158, 11, 0.4)" />

      <div className="flex justify-end pr-1 text-[9px] font-mono text-amber-400 font-semibold">
        R² = 0.927
      </div>

      <div className="relative flex-1 flex flex-col justify-center gap-1.5 px-3">
        {shapBars.map((bar, idx) => (
          <div key={idx} className="flex items-center justify-between font-mono text-[8px]">
            <span className="text-neutral-400 w-12 text-left">{bar.label}</span>
            <div className="flex-1 h-1.5 bg-neutral-800 rounded-full mx-1 overflow-hidden relative">
              <div
                style={{
                  width: `${Math.abs(bar.val) * 180}%`,
                }}
                className={`h-full rounded-full ${
                  bar.positive ? 'bg-amber-400' : 'bg-rose-500'
                }`}
              />
            </div>
            <span className={bar.positive ? 'text-amber-400 font-bold' : 'text-rose-400 font-bold'}>
              {bar.positive ? `+${bar.val}` : bar.val}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between font-mono text-[9.5px] px-1 pt-1 border-t border-white/5">
        <span className="text-neutral-500">FinBERT + SHAP</span>
        <span className="text-amber-400 font-bold">&lt;100ms ONNX</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   6. DEVDEX
   PostgreSQL Row-Level Security (RLS) Cryptographic Filter
   ───────────────────────────────────────────────────────────── */
export function DevDexRlsSimulation() {
  const [authStep, setAuthStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAuthStep((prev) => (prev + 1) % 4);
    }, 450);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-2 select-none bg-[#090A0E]">
      <CornerBrackets color="rgba(99, 102, 241, 0.4)" />

      <div className="flex justify-end pr-1 text-[9px] font-mono text-indigo-400 font-semibold">
        100% RLS Coverage
      </div>

      <div className="relative flex-1 flex items-center justify-center gap-1.5 px-1">
        {/* Token node */}
        <div className="px-1.5 py-1.5 rounded bg-white/5 border border-white/10 font-mono text-[8px] text-neutral-300">
          auth.uid()
        </div>

        {/* Arrow into RLS filter */}
        <div className="text-indigo-400 font-mono text-[9px]">→</div>

        {/* Cryptographic RLS Gate */}
        <div
          className={`p-1.5 rounded border font-mono text-[8.5px] font-bold transition-all ${
            authStep === 2
              ? 'bg-indigo-500 text-white border-indigo-300 shadow-[0_0_8px_#6366F1]'
              : 'bg-indigo-950/60 text-indigo-300 border-indigo-500/30'
          }`}
        >
          RLS Policy
        </div>

        <div className="text-emerald-400 font-mono text-[9px]">→</div>

        {/* Postgres Row Block */}
        <div className="p-1 rounded bg-black/60 border border-emerald-500/30 font-mono text-[7.5px] text-emerald-400">
          [ROW: ALLOW]
        </div>
      </div>

      <div className="flex items-center justify-between font-mono text-[9.5px] px-1 pt-1 border-t border-white/5">
        <span className="text-neutral-500">Next.js 15 App</span>
        <span className="text-indigo-400 font-bold">98 Lighthouse</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   7. AUTOMATED POTHOLE DETECTION
   YOLO Edge CV Reticle with Temporal Debounce Cooldown
   ───────────────────────────────────────────────────────────── */
export function PotholeDetectionSimulation() {
  const [detectPos, setDetectPos] = useState({ x: 65, y: 38 });
  const [locked, setLocked] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setDetectPos({
        x: Math.floor(Math.random() * 30) + 50,
        y: Math.floor(Math.random() * 20) + 30,
      });
      setLocked(true);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-2 select-none bg-[#090A0E]">
      <CornerBrackets color="rgba(249, 115, 22, 0.4)" />

      <div className="flex justify-end pr-1 text-[9px] font-mono text-orange-400 font-semibold">
        &gt;30 FPS Edge
      </div>

      {/* Reticle Viewport with Road Lane Overlay */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 140 85" className="w-full h-20 overflow-visible">
          {/* Road perspective lines */}
          <line x1="20" y1="80" x2="60" y2="20" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="120" y1="80" x2="80" y2="20" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="70" y1="80" x2="70" y2="20" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />

          {/* YOLO Bounding Box */}
          <rect
            x={detectPos.x}
            y={detectPos.y}
            width="28"
            height="18"
            fill="none"
            stroke="#F97316"
            strokeWidth="1.4"
            className="transition-all duration-300"
          />
          <text
            x={detectPos.x + 2}
            y={detectPos.y - 2}
            fill="#F97316"
            fontSize="6"
            fontFamily="monospace"
            fontWeight="bold"
          >
            pothole 0.93
          </text>
        </svg>
      </div>

      <div className="flex items-center justify-between font-mono text-[9.5px] px-1 pt-1 border-t border-white/5">
        <span className="text-neutral-500">YOLO edge CV</span>
        <span className="text-orange-400 font-bold">debounce lock</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   8. INDIA TECH SALARY PREDICTOR
   AmbitionBox 6,000+ Record Random Forest Regression Tree
   ───────────────────────────────────────────────────────────── */
export function SalaryRegressionSimulation() {
  const [activeBranch, setActiveBranch] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBranch((prev) => (prev + 1) % 3);
    }, 550);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-2 select-none bg-[#090A0E]">
      <CornerBrackets color="rgba(132, 204, 22, 0.4)" />

      <div className="flex justify-end pr-1 text-[9px] font-mono text-lime-400 font-semibold">
        6,000+ Records
      </div>

      <div className="relative flex-1 flex items-center justify-center">
        <svg viewBox="0 0 140 85" className="w-full h-20 overflow-visible">
          {/* Root node */}
          <rect x="55" y="10" width="30" height="12" rx="2" fill="#141E11" stroke="#84CC16" strokeWidth="1" />
          <text x="70" y="18" textAnchor="middle" fill="#84CC16" fontSize="6" fontFamily="monospace">Tier-1?</text>

          {/* Tree branches */}
          <line x1="60" y1="22" x2="35" y2="40" stroke="rgba(132, 204, 22, 0.4)" strokeWidth="1" />
          <line x1="80" y1="22" x2="105" y2="40" stroke="rgba(132, 204, 22, 0.4)" strokeWidth="1" />

          {/* Child nodes */}
          <rect x="20" y="40" width="30" height="12" rx="2" fill="#0E140C" stroke="#84CC16" strokeWidth="0.8" />
          <text x="35" y="48" textAnchor="middle" fill="#A3E635" fontSize="5.5" fontFamily="monospace">Yrs &gt; 3</text>

          <rect x="90" y="40" width="30" height="12" rx="2" fill="#0E140C" stroke="#84CC16" strokeWidth="0.8" />
          <text x="105" y="48" textAnchor="middle" fill="#A3E635" fontSize="5.5" fontFamily="monospace">Tier-2</text>

          {/* Leaf prediction pills */}
          <circle cx="25" cy="65" r="5" fill={activeBranch === 0 ? '#84CC16' : '#141E11'} stroke="#84CC16" />
          <text x="25" y="67" textAnchor="middle" fill={activeBranch === 0 ? '#000' : '#84CC16'} fontSize="5" fontFamily="monospace" fontWeight="bold">24L</text>

          <circle cx="45" cy="65" r="5" fill={activeBranch === 1 ? '#84CC16' : '#141E11'} stroke="#84CC16" />
          <text x="45" y="67" textAnchor="middle" fill={activeBranch === 1 ? '#000' : '#84CC16'} fontSize="5" fontFamily="monospace" fontWeight="bold">16L</text>

          <circle cx="105" cy="65" r="5" fill={activeBranch === 2 ? '#84CC16' : '#141E11'} stroke="#84CC16" />
          <text x="105" y="67" textAnchor="middle" fill={activeBranch === 2 ? '#000' : '#84CC16'} fontSize="5" fontFamily="monospace" fontWeight="bold">12L</text>
        </svg>
      </div>

      <div className="flex items-center justify-between font-mono text-[9.5px] px-1 pt-1 border-t border-white/5">
        <span className="text-neutral-500">RandomForest</span>
        <span className="text-lime-400 font-bold">LPA forecast</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FULL 8-PROJECT ARCHITECTURE SIMULATION MATRIX
   ───────────────────────────────────────────────────────────── */
interface TechnicalDesignMapProps {
  onOpenProjectModal?: (id: string) => void;
}

export default function TechnicalDesignMap({ onOpenProjectModal }: TechnicalDesignMapProps) {
  const { playClick, playHover } = useSound();
  const [selectedSim, setSelectedSim] = useState<string>('PRJ-01');

  const myProjectsSimulations = [
    {
      id: 'PRJ-01',
      title: 'Pairfect ↗',
      tagline: 'Distributed Real-Time Sync & Groq LPU',
      component: <PairfectSimulation />,
      liveUrl: 'https://pairfect.site',
      theme: 'border-rose-500/40 hover:border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.2)]',
      accentColor: 'text-rose-400',
    },
    {
      id: 'PRJ-02',
      title: 'DSA Lecture RAG ↗',
      tagline: 'Hybrid Retrieval Radar (BM25 + MiniLM)',
      component: <DsaRagRadarSimulation />,
      liveUrl: 'https://striver-dsa-platform.onrender.com',
      theme: 'border-cyan-500/40 hover:border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]',
      accentColor: 'text-cyan-400',
    },
    {
      id: 'PRJ-03',
      title: 'Cybernauts Arena',
      tagline: 'Authoritative Master-Clock Venue Mesh',
      component: <CybernautsMeshSimulation />,
      theme: 'border-purple-500/40 hover:border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)]',
      accentColor: 'text-purple-400',
    },
    {
      id: 'PRJ-05',
      title: 'National CV Challenge',
      tagline: '16-Grid Spatial Luminance & Albedo ML',
      component: <CvAlbedoSimulation />,
      theme: 'border-emerald-500/40 hover:border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]',
      accentColor: 'text-emerald-400',
    },
    {
      id: 'PRJ-04',
      title: 'ThinkFolio',
      tagline: 'FinBERT Embeddings & SHAP Attribution',
      component: <ThinkFolioSimulation />,
      theme: 'border-amber-500/40 hover:border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]',
      accentColor: 'text-amber-400',
    },
    {
      id: 'PRJ-08',
      title: 'DevDex',
      tagline: 'PostgreSQL Row-Level Security Engine',
      component: <DevDexRlsSimulation />,
      theme: 'border-indigo-500/40 hover:border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.2)]',
      accentColor: 'text-indigo-400',
    },
    {
      id: 'PRJ-06',
      title: 'Pothole Detection',
      tagline: 'Edge YOLO CV with Debounce Gate',
      component: <PotholeDetectionSimulation />,
      theme: 'border-orange-500/40 hover:border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.2)]',
      accentColor: 'text-orange-400',
    },
    {
      id: 'PRJ-07',
      title: 'Salary Predictor',
      tagline: '6k+ Record Random Forest Regression',
      component: <SalaryRegressionSimulation />,
      theme: 'border-lime-500/40 hover:border-lime-500 shadow-[0_0_15px_rgba(132,204,22,0.2)]',
      accentColor: 'text-lime-400',
    },
  ];

  return (
    <section id="design-map" className="w-full max-w-[1020px] mx-auto py-8 text-left select-none space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E2E4E8] dark:border-[#22242B] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-rose-500 via-cyan-500 to-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-widest font-semibold">
              03 // TECHNICAL BLUEPRINT · RUNTIME MICRO-SIMULATIONS
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-[#09090B] dark:text-white">
            Project simulation matrix.
          </h2>
        </div>
        <div className="text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-3 py-1 rounded-full self-start sm:self-auto">
          ● 8 Live Project Kernels
        </div>
      </div>

      <p className="text-xs sm:text-[13px] text-[#52525B] dark:text-[#A1A1AA] font-sans">
        Every system mapped to its core computational kernel: WebSocket dyad synchronization, hybrid radar retrieval, authoritative epoch clock buffers, and spatial luminance tensors.
      </p>

      {/* 4-Column Responsive Simulation Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 pt-2">
        {myProjectsSimulations.map((sim) => {
          const isSelected = selectedSim === sim.id;
          return (
            <div
              key={sim.id}
              onClick={() => {
                playClick();
                setSelectedSim(sim.id);
                if (onOpenProjectModal) {
                  onOpenProjectModal(sim.id);
                }
              }}
              onMouseEnter={playHover}
              className={`rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden group ${
                isSelected
                  ? `${sim.theme} bg-[#0C0E14]`
                  : 'border-white/10 hover:border-white/30 bg-[#090A0E]'
              }`}
            >
              {/* Simulation Canvas (Aspect ~ 4:3) */}
              <div className="relative w-full aspect-[4/3] bg-[#08090C] overflow-hidden">
                {sim.component}
              </div>

              {/* Monospace Footer Box */}
              <div className="py-2 px-2.5 bg-black/70 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                <span className={`font-bold transition-colors ${isSelected ? sim.accentColor : 'text-neutral-300 group-hover:text-white'}`}>
                  {sim.title}
                </span>
                <span className="text-[9.5px] text-neutral-500 group-hover:text-neutral-300 transition-colors uppercase">
                  Spec ↗
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
