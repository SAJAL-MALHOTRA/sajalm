'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSound } from '@/hooks/useSound';
import { ExternalLink, Sparkles, Terminal } from 'lucide-react';

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
   1. TINYGPT // NEURAL FWD PASS & KV CACHE
   ───────────────────────────────────────────────────────────── */
function TinyGptSimulation() {
  const [activeLayer, setActiveLayer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLayer((prev) => (prev + 1) % 4);
    }, 450);
    return () => clearInterval(interval);
  }, []);

  const layers = [
    [25, 45, 65, 85],
    [15, 38, 62, 85, 105],
    [20, 48, 75, 100],
    [45, 75],
  ];
  const layerX = [25, 65, 105, 145];

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-2 select-none">
      <CornerBrackets color="rgba(56, 189, 248, 0.3)" />

      {/* Top Tag */}
      <div className="flex justify-end pr-1 text-[9.5px] font-mono text-sky-400 font-semibold">
        KV 88%
      </div>

      {/* Centered Neural Network SVG */}
      <div className="relative flex-1 flex items-center justify-center">
        <svg viewBox="0 0 170 120" className="w-full h-24 overflow-visible">
          {/* Synapses */}
          {layers.slice(0, -1).map((col, cIdx) =>
            col.map((y1, r1) =>
              layers[cIdx + 1].map((y2, r2) => (
                <line
                  key={`${cIdx}-${r1}-${r2}`}
                  x1={layerX[cIdx]}
                  y1={y1}
                  x2={layerX[cIdx + 1]}
                  y2={y2}
                  stroke={
                    activeLayer === cIdx
                      ? 'rgba(56, 189, 248, 0.45)'
                      : 'rgba(255, 255, 255, 0.08)'
                  }
                  strokeWidth={activeLayer === cIdx ? 1.2 : 0.6}
                  className="transition-colors duration-300"
                />
              ))
            )
          )}

          {/* Nodes */}
          {layers.map((col, cIdx) =>
            col.map((y, rIdx) => {
              const isActive = activeLayer === cIdx;
              return (
                <g key={`node-${cIdx}-${rIdx}`}>
                  <circle
                    cx={layerX[cIdx]}
                    cy={y}
                    r={isActive ? 5.5 : 3.5}
                    fill={isActive ? '#38BDF8' : '#1E293B'}
                    stroke={isActive ? '#7DD3FC' : '#475569'}
                    strokeWidth={isActive ? 1.5 : 0.8}
                    className="transition-all duration-300"
                  />
                  {isActive && (
                    <circle
                      cx={layerX[cIdx]}
                      cy={y}
                      r={9}
                      fill="none"
                      stroke="rgba(56, 189, 248, 0.4)"
                      strokeWidth={1}
                      className="animate-ping"
                    />
                  )}
                </g>
              );
            })
          )}
        </svg>
      </div>

      {/* Bottom Technical Telemetry */}
      <div className="flex items-center justify-between font-mono text-[9.5px] px-1 pt-1 border-t border-white/5">
        <span className="text-neutral-500">fwd pass</span>
        <span className="text-sky-400 font-bold">121 tok/s</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   2. ATHENA // BM25 + DENSE MINI-LM RADAR SEARCH (DSA RAG)
   ───────────────────────────────────────────────────────────── */
function AthenaRadarSimulation() {
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

  // Target coordinates relative to center (75, 55)
  const targets = [
    { x: 75 + 32 * Math.cos(0.8), y: 55 + 32 * Math.sin(0.8), angleDeg: (0.8 * 180) / Math.PI },
    { x: 75 + 22 * Math.cos(2.2), y: 55 + 22 * Math.sin(2.2), angleDeg: (2.2 * 180) / Math.PI },
    { x: 75 + 40 * Math.cos(4.1), y: 55 + 40 * Math.sin(4.1), angleDeg: (4.1 * 180) / Math.PI },
    { x: 75 + 16 * Math.cos(5.4), y: 55 + 16 * Math.sin(5.4), angleDeg: (5.4 * 180) / Math.PI },
    { x: 75 + 36 * Math.cos(3.5), y: 55 + 36 * Math.sin(3.5), angleDeg: (3.5 * 180) / Math.PI },
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-2 select-none">
      <CornerBrackets color="rgba(168, 85, 247, 0.4)" />

      <div className="relative flex-1 flex items-center justify-center">
        <svg viewBox="0 0 150 110" className="w-full h-24 overflow-visible">
          {/* Concentric Radar Rings */}
          <circle cx="75" cy="55" r="16" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <circle cx="75" cy="55" r="32" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <circle cx="75" cy="55" r="46" fill="none" stroke="rgba(168,85,247,0.25)" strokeWidth="1" />

          {/* Crosshairs */}
          <line x1="75" y1="9" x2="75" y2="101" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
          <line x1="29" y1="55" x2="121" y2="55" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />

          {/* Rotating Sweep Beam Cone */}
          <g transform={`rotate(${angle} 75 55)`}>
            <path
              d="M 75 55 L 121 55 A 46 46 0 0 0 107.5 18 Z"
              fill="url(#athena-radar-sweep)"
              opacity="0.45"
            />
            <line x1="75" y1="55" x2="121" y2="55" stroke="#A855F7" strokeWidth="1.6" />
          </g>

          <defs>
            <linearGradient id="athena-radar-sweep" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A855F7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Target Blips */}
          {targets.map((t, idx) => {
            const diff = (angle - t.angleDeg + 360) % 360;
            const isHit = diff < 45;
            return (
              <circle
                key={idx}
                cx={t.x}
                cy={t.y}
                r={isHit ? 3.5 : 2}
                fill={isHit ? '#A855F7' : '#38BDF8'}
                opacity={isHit ? 1 : 0.4}
                className="transition-all duration-150"
              />
            );
          })}
        </svg>
      </div>

      <div className="flex items-center justify-between font-mono text-[9.5px] px-1 pt-1 border-t border-white/5">
        <span className="text-neutral-500">BM25+LLM</span>
        <span className="text-purple-400 font-bold">k=5 · 30% Hit</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   3. CORTEX // CAUSAL ATTENTION LOWER-TRIANGULAR MATRIX
   ───────────────────────────────────────────────────────────── */
function CortexAttentionSimulation() {
  const [activeStep, setActiveStep] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-2 select-none">
      <CornerBrackets color="rgba(192, 132, 252, 0.3)" />

      {/* Top Coordinate Tags */}
      <div className="flex items-center justify-between font-mono text-[8.5px] text-neutral-500 px-6">
        <span>k0</span>
        <span>k1</span>
        <span className="text-purple-300 font-bold">k2</span>
        <span>k3</span>
        <span>k4</span>
      </div>

      {/* Matrix Rows */}
      <div className="flex flex-col items-center justify-center gap-1 my-auto">
        {[0, 1, 2, 3, 4].map((row) => (
          <div key={row} className="flex items-center gap-1">
            <span className={`w-3 text-[8.5px] font-mono text-right mr-1 ${row === activeStep ? 'text-purple-400 font-bold' : 'text-neutral-600'}`}>
              q{row}
            </span>
            {[0, 1, 2, 3, 4].map((col) => {
              const isMasked = col > row;
              const isCurrent = row === activeStep && col <= row;
              return (
                <div
                  key={col}
                  className={`w-4 h-4 rounded-xs border transition-all duration-200 ${
                    isMasked
                      ? 'bg-black/30 border-white/5 opacity-15'
                      : isCurrent
                      ? 'bg-purple-500 border-purple-300 shadow-[0_0_8px_rgba(168,85,247,0.8)]'
                      : 'bg-purple-950/60 border-purple-800/40 opacity-70'
                  }`}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between font-mono text-[9.5px] px-1 pt-1 border-t border-white/5">
        <span className="text-neutral-500">Attn(Q,K,V)</span>
        <span className="text-purple-400 font-bold">causal mask</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   4. CUDA KERNELS // 8x8 GPU WARP THREAD BLOCKS
   ───────────────────────────────────────────────────────────── */
function CudaKernelsSimulation() {
  const [waveCol, setWaveCol] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveCol((prev) => (prev + 1) % 9);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-2 select-none">
      <CornerBrackets color="rgba(59, 130, 246, 0.3)" />

      <div className="grid grid-cols-8 gap-0.5 max-w-[130px] mx-auto my-auto p-1 rounded bg-black/40 border border-white/5">
        {Array.from({ length: 48 }).map((_, idx) => {
          const col = idx % 8;
          const isDone = col < waveCol;
          const isCurrent = col === waveCol;
          return (
            <div
              key={idx}
              className={`w-3 h-3 rounded-[1px] transition-all duration-100 ${
                isCurrent
                  ? 'bg-cyan-300 border border-white shadow-[0_0_6px_#38BDF8]'
                  : isDone
                  ? 'bg-sky-500/80 border border-sky-400/30'
                  : 'bg-neutral-900 border border-neutral-800'
              }`}
            />
          );
        })}
      </div>

      <div className="flex items-center justify-between font-mono text-[9.5px] px-1 pt-1 border-t border-white/5">
        <span className="text-neutral-500">GFLOP/s</span>
        <span className="text-sky-400 font-bold">312 sm_89</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   5. LINALG // 5x5 EIGEN MATRIX (CV CHALLENGE ALBEDO)
   ───────────────────────────────────────────────────────────── */
function LinalgSimulation() {
  const [activeCell, setActiveCell] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCell((prev) => (prev + 1) % 5);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-2 select-none">
      <CornerBrackets color="rgba(16, 185, 129, 0.3)" />

      <div className="grid grid-cols-5 gap-1 max-w-[125px] mx-auto my-auto p-1.5 rounded bg-black/40 border border-emerald-500/20">
        {Array.from({ length: 25 }).map((_, idx) => {
          const row = Math.floor(idx / 5);
          const col = idx % 5;
          const isDiagonal = row === col;
          const isHighlighted = isDiagonal && row === activeCell;
          return (
            <div
              key={idx}
              className={`w-4 h-4 rounded-xs border transition-all duration-200 ${
                isHighlighted
                  ? 'bg-emerald-400 border-white shadow-[0_0_8px_#34D399]'
                  : isDiagonal
                  ? 'bg-emerald-600/70 border-emerald-400/50'
                  : 'bg-cyan-950/40 border-cyan-900/30'
              }`}
            />
          );
        })}
      </div>

      <div className="flex items-center justify-between font-mono text-[9.5px] px-1 pt-1 border-t border-white/5">
        <span className="text-neutral-500">det(A)</span>
        <span className="text-emerald-400 font-bold">rank 5 · 0.211</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   6. HTTP-SERVER // RAW SOCKET EPOLL (CYBERNAUTS ARENA)
   ───────────────────────────────────────────────────────────── */
function HttpServerSimulation() {
  const [blinkingLed, setBlinkingLed] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlinkingLed((prev) => (prev + 1) % 4);
    }, 350);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-2 select-none">
      <CornerBrackets color="rgba(34, 197, 94, 0.3)" />

      {/* Network Pipeline Visual */}
      <div className="flex items-center justify-center gap-2 my-auto px-1">
        {/* CLI client box */}
        <div className="px-1.5 py-2 rounded bg-white/5 border border-white/10 font-mono text-[9px] text-neutral-400">
          cli
        </div>

        {/* Pulse transmission line */}
        <div className="flex items-center">
          <div className="w-3 h-0.5 border-t border-dashed border-neutral-600" />
          <span className="px-1 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-mono text-[8.5px] font-bold">
            200
          </span>
          <div className="w-3 h-0.5 border-t border-dashed border-neutral-600" />
        </div>

        {/* Server Rack with 4 LED blades */}
        <div className="p-1.5 rounded bg-black/60 border border-neutral-700 space-y-1">
          {[0, 1, 2, 3].map((blade) => (
            <div key={blade} className="w-10 h-2 bg-neutral-900 rounded-xs flex items-center justify-end pr-1 border border-neutral-800">
              <span
                className={`w-1 h-1 rounded-full ${
                  blade === blinkingLed ? 'bg-emerald-400 shadow-[0_0_4px_#34D399]' : 'bg-neutral-700'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between font-mono text-[9.5px] px-1 pt-1 border-t border-white/5">
        <span className="text-neutral-500">raw socket</span>
        <span className="text-emerald-400 font-bold">epoll · 2.5s</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   7. EPSE // CENTROID EMBEDDING SPACE (FAISS CLUSTERS)
   ───────────────────────────────────────────────────────────── */
function EpseEmbeddingSimulation() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => !prev);
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-2 select-none">
      <CornerBrackets color="rgba(56, 189, 248, 0.3)" />

      <div className="relative flex-1 flex items-center justify-center">
        <svg viewBox="0 0 150 110" className="w-full h-24 overflow-visible">
          {/* Cluster 1: Cyan */}
          <circle cx="45" cy="45" r="22" fill="none" stroke="rgba(56, 189, 248, 0.3)" strokeDasharray="2 2" />
          <circle cx="45" cy="45" r="3" fill="#38BDF8" />
          <circle cx="36" cy="40" r="1.5" fill="rgba(56, 189, 248, 0.6)" />
          <circle cx="52" cy="38" r="1.5" fill="rgba(56, 189, 248, 0.6)" />
          <circle cx="40" cy="54" r="1.5" fill="rgba(56, 189, 248, 0.6)" />

          {/* Cluster 2: Purple */}
          <circle cx="105" cy="40" r="26" fill="none" stroke="rgba(168, 85, 247, 0.3)" strokeDasharray="2 2" />
          <circle cx="105" cy="40" r="3" fill="#A855F7" />
          <circle cx="95" cy="32" r="1.5" fill="rgba(168, 85, 247, 0.6)" />
          <circle cx="116" cy="35" r="1.5" fill="rgba(168, 85, 247, 0.6)" />
          <circle cx="100" cy="50" r="1.5" fill="rgba(168, 85, 247, 0.6)" />
          <circle cx="112" cy="48" r="1.5" fill="rgba(168, 85, 247, 0.6)" />

          {/* Cluster 3: Amber (Bottom) */}
          <circle cx="75" cy="85" r="18" fill="none" stroke="rgba(251, 191, 36, 0.3)" strokeDasharray="2 2" />
          <circle cx="75" cy="85" r="3" fill="#FBBF24" />
          <circle cx="68" cy="80" r="1.5" fill="rgba(251, 191, 36, 0.6)" />
          <circle cx="82" cy="88" r="1.5" fill="rgba(251, 191, 36, 0.6)" />

          {/* Query Vector Flying In */}
          <circle
            cx={pulse ? 102 : 65}
            cy={pulse ? 42 : 60}
            r="3.5"
            fill="#EC4899"
            className="transition-all duration-700 ease-out"
          />
          <line
            x1="65"
            y1="60"
            x2={pulse ? 102 : 65}
            y2={pulse ? 42 : 60}
            stroke="#EC4899"
            strokeWidth="1"
            strokeDasharray="2 2"
            className="transition-all duration-700 ease-out"
          />
        </svg>
      </div>

      <div className="flex items-center justify-between font-mono text-[9.5px] px-1 pt-1 border-t border-white/5">
        <span className="text-neutral-500">centroids</span>
        <span className="text-sky-400 font-bold">query $\rightarrow$ FAISS</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   8. BARNES-HUT // QUADTREE N-BODY GRAVITY SIMULATION
   ───────────────────────────────────────────────────────────── */
function BarnesHutSimulation() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    let animId: number;
    const animate = () => {
      setFrame((prev) => prev + 0.05);
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-2 select-none">
      <CornerBrackets color="rgba(16, 185, 129, 0.3)" />

      <div className="relative flex-1 flex items-center justify-center">
        <svg viewBox="0 0 120 100" className="w-full h-24 overflow-visible">
          {/* Quadtree Grid Lines */}
          <rect x="20" y="10" width="80" height="80" fill="none" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1" />
          <line x1="60" y1="10" x2="60" y2="90" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1" />
          <line x1="20" y1="50" x2="100" y2="50" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1" />
          {/* Sub-quadrant */}
          <line x1="40" y1="10" x2="40" y2="50" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="0.8" />
          <line x1="20" y1="30" x2="60" y2="30" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="0.8" />

          {/* Central Gravity Well */}
          <circle cx="60" cy="50" r="4" fill="#10B981" />
          <circle cx="60" cy="50" r="8" fill="none" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1" />

          {/* Orbiting particles */}
          <circle cx={60 + 24 * Math.cos(frame * 1.2)} cy={50 + 24 * Math.sin(frame * 1.2)} r="2" fill="#38BDF8" />
          <circle cx={60 + 16 * Math.cos(-frame * 1.6 + 1)} cy={50 + 16 * Math.sin(-frame * 1.6 + 1)} r="2" fill="#34D399" />
          <circle cx={60 + 32 * Math.cos(frame * 0.9 + 2)} cy={50 + 32 * Math.sin(frame * 0.9 + 2)} r="1.5" fill="#A855F7" />
        </svg>
      </div>

      <div className="flex items-center justify-between font-mono text-[9.5px] px-1 pt-1 border-t border-white/5">
        <span className="text-neutral-500">quadtree</span>
        <span className="text-emerald-400 font-bold">O(N log N)</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   9. MINIMAX // TIC-TAC-TOE GAME TREE
   ───────────────────────────────────────────────────────────── */
function MinimaxSimulation() {
  return (
    <div className="relative w-full h-full flex flex-col justify-between p-2 select-none">
      <CornerBrackets color="rgba(234, 179, 8, 0.3)" />

      <div className="flex items-center justify-center my-auto">
        <div className="relative w-20 h-20 grid grid-cols-3 grid-rows-3">
          {/* Grid lines */}
          <div className="absolute top-[33%] left-0 right-0 h-0.5 bg-neutral-700" />
          <div className="absolute top-[66%] left-0 right-0 h-0.5 bg-neutral-700" />
          <div className="absolute top-0 bottom-0 left-[33%] w-0.5 bg-neutral-700" />
          <div className="absolute top-0 bottom-0 left-[66%] w-0.5 bg-neutral-700" />

          {/* O piece */}
          <div className="flex items-center justify-center">
            <span className="w-4 h-4 rounded-full border-2 border-amber-400" />
          </div>
          <div />
          <div />

          {/* X piece */}
          <div />
          <div className="flex items-center justify-center font-mono font-black text-sky-400 text-lg">
            ✕
          </div>
          <div />

          <div />
          <div />
          <div className="flex items-center justify-center font-mono font-black text-sky-400 text-lg">
            ✕
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between font-mono text-[9.5px] px-1 pt-1 border-t border-white/5">
        <span className="text-neutral-500">minimax</span>
        <span className="text-amber-400 font-bold">depth=9</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   10. Q-LEARNING // GRIDWORLD MAZE PATHFINDER
   ───────────────────────────────────────────────────────────── */
function QLearningSimulation() {
  const [step, setStep] = useState(0);

  const path = [
    { r: 0, c: 0 },
    { r: 0, c: 1 },
    { r: 1, c: 1 },
    { r: 1, c: 2 },
    { r: 2, c: 2 },
    { r: 2, c: 3 },
    { r: 3, c: 3 },
    { r: 3, c: 4 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % path.length);
    }, 400);
    return () => clearInterval(interval);
  }, [path.length]);

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-2 select-none">
      <CornerBrackets color="rgba(34, 197, 94, 0.3)" />

      <div className="grid grid-cols-5 gap-1 max-w-[110px] mx-auto my-auto p-1.5 rounded bg-black/40 border border-white/10">
        {Array.from({ length: 20 }).map((_, idx) => {
          const r = Math.floor(idx / 5);
          const c = idx % 5;
          const isAgent = path[step].r === r && path[step].c === c;
          const isGoal = r === 3 && c === 4;
          const isWall = (r === 0 && c === 2) || (r === 2 && c === 1);

          return (
            <div
              key={idx}
              className={`w-4 h-4 rounded-xs flex items-center justify-center text-[8.5px] font-mono font-bold transition-all ${
                isAgent
                  ? 'bg-sky-400 text-black shadow-[0_0_8px_#38BDF8]'
                  : isGoal
                  ? 'bg-emerald-600 text-white'
                  : isWall
                  ? 'bg-neutral-800'
                  : 'bg-neutral-900 border border-white/5'
              }`}
            >
              {isGoal && 'G'}
              {isAgent && '•'}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between font-mono text-[9.5px] px-1 pt-1 border-t border-white/5">
        <span className="text-neutral-500">Q-agent</span>
        <span className="text-emerald-400 font-bold">+1.0</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FULL 10-SIMULATION MATRIX GRID
   ───────────────────────────────────────────────────────────── */
export default function TechnicalDesignMap() {
  const { playClick, playHover } = useSound();
  const [selectedSim, setSelectedSim] = useState<string | null>('athena');

  const simulations = [
    { id: 'tinygpt', title: 'tinyGPT', component: <TinyGptSimulation />, theme: 'border-sky-500/30' },
    { id: 'epse', title: 'EPSE', component: <EpseEmbeddingSimulation />, theme: 'border-sky-500/30' },
    { id: 'cortex', title: 'Cortex', component: <CortexAttentionSimulation />, theme: 'border-purple-500/30' },
    { id: 'linalg', title: 'linalg', component: <LinalgSimulation />, theme: 'border-emerald-500/30' },
    { id: 'cuda', title: 'cuda kernels', component: <CudaKernelsSimulation />, theme: 'border-blue-500/30' },
    { id: 'barnes', title: 'Barnes-Hut', component: <BarnesHutSimulation />, theme: 'border-emerald-500/30' },
    { id: 'athena', title: 'Athena ↗', component: <AthenaRadarSimulation />, theme: 'border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]', isFeatured: true },
    { id: 'http', title: 'http-server', component: <HttpServerSimulation />, theme: 'border-emerald-500/30' },
    { id: 'minimax', title: 'minimax', component: <MinimaxSimulation />, theme: 'border-amber-500/30' },
    { id: 'qlearning', title: 'maze-runner', component: <QLearningSimulation />, theme: 'border-emerald-500/30' },
  ];

  return (
    <section id="design-map" className="w-full max-w-[1020px] mx-auto py-8 text-left select-none space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E2E4E8] dark:border-[#22242B] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-widest font-semibold">
              TECHNICAL BLUEPRINT // RUNTIME MICRO-SIMULATIONS
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-[#09090B] dark:text-white">
            Architecture simulation matrix.
          </h2>
        </div>
        <div className="text-xs font-mono text-purple-400 bg-purple-950/40 border border-purple-500/30 px-3 py-1 rounded-full self-start sm:self-auto">
          ● 10 Live Micro-Kernels
        </div>
      </div>

      <p className="text-xs sm:text-[13px] text-[#52525B] dark:text-[#A1A1AA] font-sans">
        Real-time in-browser computational models: neural feedforward propagation, dual-channel radar search, causal self-attention masks, GPU warp execution, and epoll socket multiplexing.
      </p>

      {/* 5-Column Responsive Simulation Grid Matching User Reference */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 pt-2">
        {simulations.map((sim) => {
          const isSelected = selectedSim === sim.id;
          return (
            <div
              key={sim.id}
              onClick={() => {
                playClick();
                setSelectedSim(sim.id);
              }}
              onMouseEnter={playHover}
              className={`rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden group ${
                isSelected
                  ? 'border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.25)] bg-[#0C0E14]'
                  : 'border-white/10 hover:border-white/25 bg-[#090A0E]'
              }`}
            >
              {/* Simulation Canvas (Aspect 1:1) */}
              <div className="relative w-full aspect-square bg-[#08090C] overflow-hidden">
                {sim.component}
              </div>

              {/* Monospace Footer Box */}
              <div className="py-1.5 px-2 bg-black/60 border-t border-white/5 text-center font-mono text-xs text-neutral-300 group-hover:text-white transition-colors">
                <span className={isSelected ? 'text-purple-300 font-bold' : ''}>
                  {sim.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
