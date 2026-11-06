'use client';

import React from 'react';
import { Activity, Cpu, Radio, Scan, ShieldAlert, Video, Brain, Code } from 'lucide-react';

interface ProjectVisualBannerProps {
  id: string;
  name: string;
  metric: string;
}

export default function ProjectVisualBanner({ id, name, metric }: ProjectVisualBannerProps) {
  switch (id) {
    case 'PRJ-01':
      // Pairfect: Real-Time LLM Inference & State Synchronization
      return (
        <div className="relative w-full h-36 sm:h-40 rounded-xl overflow-hidden bg-gradient-to-br from-[#121318] via-[#1A1C23] to-[#0D0E12] border border-white/10 flex items-center justify-between p-4 sm:p-5 group-hover:border-rose-500/40 transition-colors">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:12px_12px] opacity-25" />
          
          {/* Left: Waveform & Node Sync */}
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-rose-400 font-bold uppercase">
                WEBSOCKET SYNC · 77 ROUTES
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black font-sans text-white tracking-tight">
              pairfect.site
            </div>
            <div className="text-[11px] font-mono text-neutral-400">
              Llama 3 @ Groq LPUs · Sub-50ms Latency
            </div>
          </div>

          {/* Right: Graphic Schematic */}
          <div className="relative z-10 hidden sm:flex flex-col items-end gap-1.5 font-mono text-[10px]">
            <div className="px-2.5 py-1 rounded bg-black/60 border border-white/10 text-emerald-400 flex items-center gap-1.5">
              <Activity size={12} className="text-emerald-400" />
              <span>&lt;50ms Response</span>
            </div>
            <div className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-neutral-400">
              PostgreSQL RLS
            </div>
          </div>

          {/* Ambient Glow */}
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-rose-500/20 transition-all" />
        </div>
      );

    case 'PRJ-02':
      // DSA Lecture RAG: Video Timeline & Dense RRF Rank Fusion
      return (
        <div className="relative w-full h-36 sm:h-40 rounded-xl overflow-hidden bg-gradient-to-br from-[#0F141C] via-[#151D2A] to-[#0A0E15] border border-white/10 flex items-center justify-between p-4 sm:p-5 group-hover:border-sky-500/40 transition-colors">
          <div className="absolute inset-0 bg-[radial-gradient(#253346_1px,transparent_1px)] [background-size:12px_12px] opacity-30" />
          
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-sky-400 font-bold uppercase">
                HYBRID RETRIEVAL · BM25 + DENSE RRF
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black font-sans text-white tracking-tight">
              Timestamped Video AI
            </div>
            <div className="text-[11px] font-mono text-neutral-400">
              104-Query Benchmark · 0% Hallucination
            </div>
          </div>

          <div className="relative z-10 hidden sm:flex flex-col items-end gap-1.5 font-mono text-[10px]">
            <div className="px-2.5 py-1 rounded bg-black/60 border border-white/10 text-sky-300 flex items-center gap-1.5">
              <Video size={12} className="text-sky-300" />
              <span>Exact Seek Snapping</span>
            </div>
            <div className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-neutral-400">
              Pyodide Wasm Runner
            </div>
          </div>

          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-sky-500/20 transition-all" />
        </div>
      );

    case 'PRJ-03':
      // Cybernauts Arena: Esports 16-Team Distributed Master Clock
      return (
        <div className="relative w-full h-36 sm:h-40 rounded-xl overflow-hidden bg-gradient-to-br from-[#18141F] via-[#221B2D] to-[#100D16] border border-white/10 flex items-center justify-between p-4 sm:p-5 group-hover:border-purple-500/40 transition-colors">
          <div className="absolute inset-0 bg-[radial-gradient(#3A2E4C_1px,transparent_1px)] [background-size:12px_12px] opacity-30" />
          
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-purple-400 font-bold uppercase">
                AUDITORIUM 4K BROADCAST · 16 TEAMS
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black font-sans text-white tracking-tight">
              Authoritative Master Clock
            </div>
            <div className="text-[11px] font-mono text-neutral-400">
              Zero Drift · 2.5s Wi-Fi Grace Buffer
            </div>
          </div>

          <div className="relative z-10 hidden sm:flex flex-col items-end gap-1.5 font-mono text-[10px]">
            <div className="px-2.5 py-1 rounded bg-black/60 border border-white/10 text-purple-300 flex items-center gap-1.5">
              <Radio size={12} className="text-purple-300" />
              <span>Broadcast Sync</span>
            </div>
            <div className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-neutral-400">
              Web Audio Synthesizer
            </div>
          </div>

          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/20 transition-all" />
        </div>
      );

    case 'PRJ-04':
      // DeepSeek OCR: Document Structure & Math VLM
      return (
        <div className="relative w-full h-36 sm:h-40 rounded-xl overflow-hidden bg-gradient-to-br from-[#121A1A] via-[#192424] to-[#0D1313] border border-white/10 flex items-center justify-between p-4 sm:p-5 group-hover:border-teal-500/40 transition-colors">
          <div className="absolute inset-0 bg-[radial-gradient(#2A3C3C_1px,transparent_1px)] [background-size:12px_12px] opacity-30" />
          
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-teal-400 font-bold uppercase">
                VISION-LANGUAGE MODEL // LATEX EXTRACTION
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black font-sans text-white tracking-tight">
              DeepSeek Document VLM
            </div>
            <div className="text-[11px] font-mono text-neutral-400">
              Complex Equations &amp; Markdown Tables
            </div>
          </div>

          <div className="relative z-10 hidden sm:flex flex-col items-end gap-1.5 font-mono text-[10px]">
            <div className="px-2.5 py-1 rounded bg-black/60 border border-white/10 text-teal-300 flex items-center gap-1.5">
              <Scan size={12} className="text-teal-300" />
              <span>Geometric Parsing</span>
            </div>
            <div className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-neutral-400">
              Multi-Format Export
            </div>
          </div>

          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-teal-500/20 transition-all" />
        </div>
      );

    case 'PRJ-05':
      // DefectLens: Industrial Edge Vision Inspection
      return (
        <div className="relative w-full h-36 sm:h-40 rounded-xl overflow-hidden bg-gradient-to-br from-[#1A1813] via-[#24211A] to-[#12100C] border border-white/10 flex items-center justify-between p-4 sm:p-5 group-hover:border-amber-500/40 transition-colors">
          <div className="absolute inset-0 bg-[radial-gradient(#3E3728_1px,transparent_1px)] [background-size:12px_12px] opacity-30" />
          
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-amber-400 font-bold uppercase">
                YOLOV8 EDGE · 96.4% MAP
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black font-sans text-white tracking-tight">
              Industrial Surface CV
            </div>
            <div className="text-[11px] font-mono text-neutral-400">
              Sub-12ms Edge Hardware Inference
            </div>
          </div>

          <div className="relative z-10 hidden sm:flex flex-col items-end gap-1.5 font-mono text-[10px]">
            <div className="px-2.5 py-1 rounded bg-black/60 border border-white/10 text-amber-300 flex items-center gap-1.5">
              <ShieldAlert size={12} className="text-amber-300" />
              <span>Automated Rejection</span>
            </div>
            <div className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-neutral-400">
              Quantized TensorRT
            </div>
          </div>

          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/20 transition-all" />
        </div>
      );

    default:
      // General Engineering Blueprint
      return (
        <div className="relative w-full h-36 sm:h-40 rounded-xl overflow-hidden bg-gradient-to-br from-[#121316] via-[#18191E] to-[#0E0F12] border border-white/10 flex items-center justify-between p-4 sm:p-5 group-hover:border-white/30 transition-colors">
          <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:12px_12px] opacity-25" />
          
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-bold uppercase">
                PRODUCTION SYSTEM ARCHITECTURE
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black font-sans text-white tracking-tight">
              {name}
            </div>
            <div className="text-[11px] font-mono text-neutral-400">
              {metric}
            </div>
          </div>

          <div className="relative z-10 hidden sm:flex flex-col items-end gap-1.5 font-mono text-[10px]">
            <div className="px-2.5 py-1 rounded bg-black/60 border border-white/10 text-neutral-300 flex items-center gap-1.5">
              <Cpu size={12} className="text-neutral-300" />
              <span>Verified Deployment</span>
            </div>
            <div className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-neutral-400">
              NIT Jalandhar
            </div>
          </div>

          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none group-hover:bg-white/10 transition-all" />
        </div>
      );
  }
}
