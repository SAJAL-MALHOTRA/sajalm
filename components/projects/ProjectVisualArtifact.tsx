'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { getAssetPath } from '@/utils/asset';
import { useSound } from '@/hooks/useSound';
import {
  ExternalLink,
  Activity,
  Cpu,
  Radio,
  Video,
  Sparkles,
  Lock,
  Layers,
  Image as ImageIcon,
  Sliders,
  CheckCircle2,
  Terminal,
  Shield,
  Zap,
} from 'lucide-react';

interface ProjectVisualArtifactProps {
  id: string;
  name: string;
  liveUrl?: string;
  onOpenModal?: () => void;
}

export default function ProjectVisualArtifact({
  id,
  name,
  liveUrl,
  onOpenModal,
}: ProjectVisualArtifactProps) {
  const { playClick, playHover } = useSound();
  const [viewMode, setViewMode] = useState<'interactive' | 'screenshot'>('interactive');
  
  // Interactive state for Pairfect simulation
  const [vibeStreaming, setVibeStreaming] = useState(false);
  const [vibeScore, setVibeScore] = useState(98);
  const [vibeFeedback, setVibeFeedback] = useState('Deep conversational synergy detected');

  // Interactive state for DSA RAG simulation
  const [ragSeekTime, setRagSeekTime] = useState('14:22');
  const [activeQuery, setActiveQuery] = useState('how does pathVis array detect cycles?');

  const handleSimulateVibe = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClick();
    setVibeStreaming(true);
    setVibeScore(Math.floor(Math.random() * 5) + 95);
    const feedbackList = [
      'Deep emotional resonance & conversational reciprocity detected.',
      'High mutual intentionality — 42ms Groq LPU token stream.',
      'Synchronized dyad response · zero cognitive dissonance.',
    ];
    setVibeFeedback(feedbackList[Math.floor(Math.random() * feedbackList.length)]);
    setTimeout(() => {
      setVibeStreaming(false);
    }, 1200);
  };

  switch (id) {
    /* ─────────────────────────────────────────────────────────────
       01 // PAIRFECT (pairfect.site) · Rose/Amber Gradient
       ───────────────────────────────────────────────────────────── */
    case 'PRJ-01':
      return (
        <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#1C1318] via-[#151014] to-[#0D0B0E] border border-rose-500/25 group-hover:border-rose-400/50 transition-all duration-300 shadow-[0_4px_24px_rgba(244,63,94,0.08)] flex flex-col select-none">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-rose-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-rose-500/25 transition-all" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Browser / Shell Header */}
          <div className="relative z-10 flex items-center justify-between px-3.5 py-2 bg-black/40 backdrop-blur-md border-b border-rose-500/20 text-xs font-mono">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <a
                href="https://pairfect.site"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  playClick();
                }}
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-[11px] text-neutral-300 hover:text-white transition-colors"
                title="Open pairfect.site in new tab"
              >
                <Lock size={10} className="text-rose-400" />
                <span className="font-semibold text-rose-300">pairfect.site</span>
                <ExternalLink size={10} className="text-neutral-400" />
              </a>
            </div>

            {/* Toggle View & Live Sync Indicator */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>WebSockets 12ms</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playClick();
                  setViewMode((prev) => (prev === 'interactive' ? 'screenshot' : 'interactive'));
                }}
                className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[10px] text-neutral-200 transition-colors flex items-center gap-1 cursor-pointer"
                title="Toggle between Live UI & Screenshot"
              >
                {viewMode === 'interactive' ? (
                  <>
                    <ImageIcon size={10} className="text-rose-300" />
                    <span>View Shot</span>
                  </>
                ) : (
                  <>
                    <Sliders size={10} className="text-rose-300" />
                    <span>Live UI</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Body Content */}
          {viewMode === 'screenshot' ? (
            <div className="relative w-full h-48 sm:h-56 bg-black/60 overflow-hidden group/img">
              <Image
                src={getAssetPath('/projects/pairfect-preview.jpg')}
                alt="Pairfect Web Application Preview"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-mono text-white/90 bg-black/70 px-2.5 py-1 rounded backdrop-blur-xs border border-white/10">
                  pairfect.site · Production UI Snapshot
                </span>
              </div>
            </div>
          ) : (
            <div className="relative z-10 p-3.5 sm:p-4 space-y-3">
              {/* Couple Connection Status Bar */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-[10px] font-bold text-white shadow-xs">
                    S
                  </span>
                  <span className="text-[11px] text-white font-medium">Sajal</span>
                  {/* Dynamic EKG Line */}
                  <svg className="w-12 h-4 stroke-rose-400 fill-none" viewBox="0 0 48 16">
                    <path
                      d="M0 8 h14 l3 -6 l4 12 l3 -8 l3 4 h21"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center text-[10px] font-bold text-white shadow-xs">
                    P
                  </span>
                  <span className="text-[11px] text-neutral-300 font-medium">Partner</span>
                </div>
                <span className="text-[10px] text-rose-300 font-bold bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                  Synced
                </span>
              </div>

              {/* Real-time Daily Ritual & Groq Llama 3 Evaluation Card */}
              <div className="p-3 rounded-lg bg-black/40 border border-rose-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-rose-300 uppercase tracking-wider font-semibold">
                    <Sparkles size={11} className="text-amber-400" />
                    <span>Llama 3 @ Groq LPUs</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">
                    45ms TTFT
                  </span>
                </div>

                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-xs text-neutral-200 font-sans">
                    Vibe Resonance:
                  </span>
                  <span className="text-base font-black font-mono text-rose-400">
                    {vibeStreaming ? 'Evaluating...' : `${vibeScore}% Match`}
                  </span>
                </div>

                <p className="text-[11px] text-neutral-400 font-sans leading-relaxed line-clamp-1">
                  {vibeFeedback}
                </p>

                {/* Interactive Simulation CTA */}
                <div className="pt-1 flex items-center justify-between gap-2">
                  <button
                    onClick={handleSimulateVibe}
                    disabled={vibeStreaming}
                    className="flex-1 py-1 px-2.5 rounded bg-gradient-to-r from-rose-500/20 to-amber-500/20 hover:from-rose-500/30 hover:to-amber-500/30 border border-rose-500/30 text-rose-200 text-[10.5px] font-mono font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    <Sparkles size={11} className={vibeStreaming ? 'animate-spin' : ''} />
                    <span>{vibeStreaming ? 'Generating Token Stream...' : 'Simulate AI Vibe Check'}</span>
                  </button>

                  <a
                    href="https://pairfect.site"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      playClick();
                    }}
                    className="py-1 px-2.5 rounded bg-white/10 hover:bg-white/20 text-white text-[10.5px] font-mono flex items-center gap-1 transition-colors shrink-0"
                  >
                    <span>Visit Live</span>
                    <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Footer Metadata Strip */}
          <div className="px-3.5 py-1.5 bg-black/50 border-t border-rose-500/15 flex items-center justify-between text-[10px] font-mono text-neutral-400">
            <span>77 RPC Routes · PostgreSQL RLS</span>
            <span className="text-rose-400 font-semibold">200+ Active Users</span>
          </div>
        </div>
      );

    /* ─────────────────────────────────────────────────────────────
       02 // DSA LECTURE RAG (striver-dsa-platform) · Cyan/Indigo Gradient
       ───────────────────────────────────────────────────────────── */
    case 'PRJ-02':
      return (
        <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#0F1722] via-[#0D131C] to-[#0A0D14] border border-cyan-500/25 group-hover:border-cyan-400/50 transition-all duration-300 shadow-[0_4px_24px_rgba(6,182,212,0.08)] flex flex-col select-none">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/25 transition-all" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Browser Header */}
          <div className="relative z-10 flex items-center justify-between px-3.5 py-2 bg-black/40 backdrop-blur-md border-b border-cyan-500/20 text-xs font-mono">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500/80" />
              </div>
              <a
                href="https://striver-dsa-platform.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  playClick();
                }}
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-[11px] text-neutral-300 hover:text-white transition-colors"
                title="Open Striver DSA Platform in new tab"
              >
                <Lock size={10} className="text-cyan-400" />
                <span className="font-semibold text-cyan-300">striver-dsa-platform</span>
                <ExternalLink size={10} className="text-neutral-400" />
              </a>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-[10px] text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                FastAPI + PyTorch
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playClick();
                  setViewMode((prev) => (prev === 'interactive' ? 'screenshot' : 'interactive'));
                }}
                className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[10px] text-neutral-200 transition-colors flex items-center gap-1 cursor-pointer"
              >
                {viewMode === 'interactive' ? (
                  <>
                    <ImageIcon size={10} className="text-cyan-300" />
                    <span>View Shot</span>
                  </>
                ) : (
                  <>
                    <Sliders size={10} className="text-cyan-300" />
                    <span>Live UI</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Body Content */}
          {viewMode === 'screenshot' ? (
            <div className="relative w-full h-48 sm:h-56 bg-black/60 overflow-hidden group/img">
              <Image
                src={getAssetPath('/projects/dsa-rag-preview.jpg')}
                alt="DSA Lecture RAG Platform Preview"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-mono text-white/90 bg-black/70 px-2.5 py-1 rounded backdrop-blur-xs border border-white/10">
                  striver-dsa-platform · Video Seek AI Snapshot
                </span>
              </div>
            </div>
          ) : (
            <div className="relative z-10 p-3.5 sm:p-4 space-y-3">
              {/* Video Scrubber & Sub-Chunk Seek Preview */}
              <div className="p-2.5 rounded-lg bg-black/50 border border-cyan-500/20 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <div className="flex items-center gap-1.5 text-cyan-300 font-medium">
                    <Video size={12} className="text-cyan-400" />
                    <span className="line-clamp-1">Lec 23: Cycle Detection in Directed Graph</span>
                  </div>
                  <span className="text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 text-[10px]">
                    @{ragSeekTime}
                  </span>
                </div>

                {/* Progress bar with glowing seek marker */}
                <div className="relative w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-[46%] bg-gradient-to-r from-cyan-500 to-sky-400 rounded-full" />
                  <div className="absolute top-0 left-[46%] w-2 h-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
                </div>
              </div>

              {/* Dual-Channel Retrieval Breakdown (BM25 + Dense RRF) */}
              <div className="grid grid-cols-2 gap-2 text-[10.5px] font-mono">
                <div className="p-2 rounded bg-white/5 border border-white/5 flex flex-col justify-between">
                  <span className="text-neutral-400 text-[10px]">BM25Okapi Lexical</span>
                  <span className="text-cyan-400 font-bold text-xs mt-0.5">0.892 Score</span>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/5 flex flex-col justify-between">
                  <span className="text-neutral-400 text-[10px]">Dense MiniLM-L6</span>
                  <span className="text-sky-400 font-bold text-xs mt-0.5">0.941 Cosine</span>
                </div>
              </div>

              {/* Extractive Quote Citation */}
              <div className="p-2 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-[10.5px] text-neutral-300 font-mono">
                <span className="text-cyan-400 font-bold">[{ragSeekTime}]</span> &quot;if visited[node] &amp;&amp; pathVis[node] $\rightarrow$ cycle confirmed in recursion stack&quot;
              </div>
            </div>
          )}

          {/* Footer Metadata Strip */}
          <div className="px-3.5 py-1.5 bg-black/50 border-t border-cyan-500/15 flex items-center justify-between text-[10px] font-mono text-neutral-400">
            <span>30.0% Hit@3 · 104-Query Benchmark</span>
            <span className="text-cyan-400 font-semibold">&lt;50ms Extractive</span>
          </div>
        </div>
      );

    /* ─────────────────────────────────────────────────────────────
       03 // CYBERNAUTS ARENA · Neon Purple/Magenta Gradient
       ───────────────────────────────────────────────────────────── */
    case 'PRJ-03':
      return (
        <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#181122] via-[#120E1A] to-[#0A0810] border border-purple-500/25 group-hover:border-purple-400/50 transition-all duration-300 shadow-[0_4px_24px_rgba(168,85,247,0.08)] flex flex-col select-none">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/25 transition-all" />

          {/* Control Room Bar */}
          <div className="relative z-10 flex items-center justify-between px-3.5 py-2 bg-black/40 backdrop-blur-md border-b border-purple-500/20 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="font-semibold text-purple-300 text-[11px] tracking-wide">
                CYBERNAUTS ARENA // 4K BROADCAST
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-[10px] text-purple-400 bg-purple-950/60 border border-purple-500/30 px-2 py-0.5 rounded-full">
                2.5s Jitter Buffer
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playClick();
                  setViewMode((prev) => (prev === 'interactive' ? 'screenshot' : 'interactive'));
                }}
                className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[10px] text-neutral-200 transition-colors flex items-center gap-1 cursor-pointer"
              >
                {viewMode === 'interactive' ? (
                  <>
                    <ImageIcon size={10} className="text-purple-300" />
                    <span>View Shot</span>
                  </>
                ) : (
                  <>
                    <Sliders size={10} className="text-purple-300" />
                    <span>Live UI</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Body Content */}
          {viewMode === 'screenshot' ? (
            <div className="relative w-full h-48 sm:h-56 bg-black/60 overflow-hidden group/img">
              <Image
                src={getAssetPath('/projects/cybernauts-preview.jpg')}
                alt="Cybernauts Arena Broadcast Engine Preview"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-mono text-white/90 bg-black/70 px-2.5 py-1 rounded backdrop-blur-xs border border-white/10">
                  Cybernauts Arena · 16-Desk Broadcast Console Snapshot
                </span>
              </div>
            </div>
          ) : (
            <div className="relative z-10 p-3.5 sm:p-4 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-neutral-400">16 Physical Duel Desks (Wi-Fi Mesh):</span>
                <span className="text-emerald-400 font-bold">16 / 16 Synced</span>
              </div>

              {/* 4x4 Table Radar Matrix */}
              <div className="grid grid-cols-8 gap-1.5 p-2 rounded-lg bg-black/50 border border-purple-500/20 font-mono text-[9px] text-center">
                {Array.from({ length: 16 }).map((_, i) => {
                  const isBuzzed = i === 4 || i === 11;
                  return (
                    <div
                      key={i}
                      className={`py-1 rounded border transition-colors ${
                        isBuzzed
                          ? 'bg-rose-500/30 border-rose-500 text-rose-300 font-bold'
                          : 'bg-purple-950/40 border-purple-500/20 text-purple-300'
                      }`}
                    >
                      T{String(i + 1).padStart(2, '0')}
                    </div>
                  );
                })}
              </div>

              {/* Master Clock Countdown & 5-Tier Incident Matrix */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400 text-[10px]">STAGE CLOCK:</span>
                  <span className="text-base font-black text-white">00:14.82</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-amber-400 font-bold">Incident Mitigated</span>
                  <span className="text-[9.5px] text-neutral-400 block">+850 PTS</span>
                </div>
              </div>
            </div>
          )}

          <div className="px-3.5 py-1.5 bg-black/50 border-t border-purple-500/15 flex items-center justify-between text-[10px] font-mono text-neutral-400">
            <span>Authoritative Epoch Server</span>
            <span className="text-purple-400 font-semibold">Zero Clock Drift</span>
          </div>
        </div>
      );

    /* ─────────────────────────────────────────────────────────────
       05 // NATIONAL CV CHALLENGE · Emerald/Teal Gradient
       ───────────────────────────────────────────────────────────── */
    case 'PRJ-05':
      return (
        <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#0F1B17] via-[#0B1512] to-[#070D0B] border border-emerald-500/25 group-hover:border-emerald-400/50 transition-all duration-300 shadow-[0_4px_24px_rgba(16,185,129,0.08)] flex flex-col select-none">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/25 transition-all" />

          <div className="relative z-10 flex items-center justify-between px-3.5 py-2 bg-black/40 backdrop-blur-md border-b border-emerald-500/20 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-emerald-300 text-[11px] tracking-wide">
                SURVEILLANCE CV ENGINE // CPU
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
                🏆 Rank #16 / 227
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playClick();
                  setViewMode((prev) => (prev === 'interactive' ? 'screenshot' : 'interactive'));
                }}
                className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[10px] text-neutral-200 transition-colors flex items-center gap-1 cursor-pointer"
              >
                {viewMode === 'interactive' ? (
                  <>
                    <ImageIcon size={10} className="text-emerald-300" />
                    <span>View Shot</span>
                  </>
                ) : (
                  <>
                    <Sliders size={10} className="text-emerald-300" />
                    <span>Live UI</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Body Content */}
          {viewMode === 'screenshot' ? (
            <div className="relative w-full h-48 sm:h-56 bg-black/60 overflow-hidden group/img">
              <Image
                src={getAssetPath('/projects/cv-challenge-preview.jpg')}
                alt="National CV Challenge Classification Dashboard"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-mono text-white/90 bg-black/70 px-2.5 py-1 rounded backdrop-blur-xs border border-white/10">
                  National CV Challenge · Illumination Classifier Snapshot
                </span>
              </div>
            </div>
          ) : (
            <div className="relative z-10 p-3.5 sm:p-4 space-y-3">
              {/* 16-Grid Spatial Luminance Descriptors */}
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-neutral-400">Spatial Luminance &amp; Albedo Grid:</span>
                <span className="text-emerald-400 font-bold">128-D + 2,304-D Deep</span>
              </div>

              {/* 4x4 Grid Heatmap simulation */}
              <div className="grid grid-cols-4 gap-1 p-2 rounded-lg bg-black/50 border border-emerald-500/20 font-mono text-[9px] text-center">
                {[0.12, 0.24, 0.78, 0.85, 0.15, 0.32, 0.88, 0.92, 0.18, 0.45, 0.65, 0.72, 0.22, 0.38, 0.54, 0.61].map((lum, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: `rgba(16, 185, 129, ${lum * 0.4})`,
                    }}
                    className="py-1 rounded border border-emerald-500/20 text-emerald-200"
                  >
                    {lum.toFixed(2)}
                  </div>
                ))}
              </div>

              {/* 3-Class Probability Bars */}
              <div className="space-y-1 font-mono text-[10px]">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Class: Normal Illumination</span>
                  <span className="text-emerald-400 font-bold">96.4%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                  <div className="h-full w-[96.4%] bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" />
                </div>
              </div>
            </div>
          )}

          <div className="px-3.5 py-1.5 bg-black/50 border-t border-emerald-500/15 flex items-center justify-between text-[10px] font-mono text-neutral-400">
            <span>Score: 0.211 (Top 7%)</span>
            <span className="text-emerald-400 font-semibold">&lt;80ms CPU Inference</span>
          </div>
        </div>
      );

    /* ─────────────────────────────────────────────────────────────
       04 // THINKFOLIO · Amber/Gold Gradient
       ───────────────────────────────────────────────────────────── */
    case 'PRJ-04':
      return (
        <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#1C1710] via-[#14100B] to-[#0A0805] border border-amber-500/25 group-hover:border-amber-400/50 transition-all duration-300 shadow-[0_4px_24px_rgba(245,158,11,0.08)] flex flex-col select-none">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/25 transition-all" />

          <div className="relative z-10 flex items-center justify-between px-3.5 py-2 bg-black/40 backdrop-blur-md border-b border-amber-500/20 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-semibold text-amber-300 text-[11px] tracking-wide">
                THINKFOLIO // FINANCIAL REASONING
              </span>
            </div>
            <span className="text-[10px] text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded-full">
              FinBERT + SHAP
            </span>
          </div>

          <div className="relative z-10 p-3.5 sm:p-4 space-y-3">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-neutral-400 text-[11px]">Predictive Competency Score:</span>
              <span className="text-base font-black text-amber-400">R² = 0.927</span>
            </div>

            {/* SHAP Feature Attribution Waterfall */}
            <div className="space-y-1.5 p-2 rounded-lg bg-black/50 border border-amber-500/20 font-mono text-[10px]">
              <div className="flex items-center justify-between text-neutral-300">
                <span>Alpha Competence</span>
                <span className="text-emerald-400 font-bold">+0.38</span>
              </div>
              <div className="flex items-center justify-between text-neutral-300">
                <span>Tail Risk Management</span>
                <span className="text-emerald-400 font-bold">+0.24</span>
              </div>
              <div className="flex items-center justify-between text-neutral-300">
                <span>Volatility Over-Exposure</span>
                <span className="text-rose-400 font-bold">-0.16</span>
              </div>
            </div>
          </div>

          <div className="px-3.5 py-1.5 bg-black/50 border-t border-amber-500/15 flex items-center justify-between text-[10px] font-mono text-neutral-400">
            <span>FastAPI + Tabular MLP</span>
            <span className="text-amber-400 font-semibold">&lt;100ms ONNX</span>
          </div>
        </div>
      );

    /* ─────────────────────────────────────────────────────────────
       DEFAULT // GENERAL ARCHITECTURAL HUD
       ───────────────────────────────────────────────────────────── */
    default:
      return (
        <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#121316] via-[#0E0F12] to-[#08090B] border border-white/10 group-hover:border-white/25 transition-all duration-300 flex flex-col select-none">
          <div className="relative z-10 flex items-center justify-between px-3.5 py-2 bg-black/40 border-b border-white/10 text-xs font-mono">
            <div className="flex items-center gap-2">
              <Cpu size={12} className="text-neutral-400" />
              <span className="font-semibold text-neutral-300 text-[11px]">
                {name}
              </span>
            </div>
            <span className="text-[10px] text-neutral-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
              Production Verified
            </span>
          </div>

          <div className="relative z-10 p-3.5 sm:p-4 space-y-2">
            <div className="text-xs font-mono text-neutral-400">
              Architecture Blueprint &amp; Telemetry
            </div>
            <div className="p-2 rounded bg-white/5 border border-white/5 font-mono text-[10.5px] text-neutral-300">
              Verified end-to-end implementation with benchmarked outcomes.
            </div>
          </div>

          <div className="px-3.5 py-1.5 bg-black/50 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-neutral-400">
            <span>NIT Jalandhar</span>
            <span className="text-white font-semibold">Ready to Inspect ↗</span>
          </div>
        </div>
      );
  }
}
