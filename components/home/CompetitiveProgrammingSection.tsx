'use client';

import React from 'react';
import { useSound } from '@/hooks/useSound';
import { ArrowUpRight, Award, Flame, Trophy, Terminal, GitPullRequest, Code2, Cpu } from 'lucide-react';
import NumberTicker from '@/components/ui/NumberTicker';

export default function CompetitiveProgrammingSection() {
  const { playClick, playHover } = useSound();

  return (
    <section id="dsa" className="w-full max-w-[1060px] mx-auto py-10 text-left select-none space-y-7">
      
      {/* ── SECTION HEADER ── */}
      <div className="w-full space-y-2 border-b border-[#E2E4E8] dark:border-[#22242B] pb-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-widest font-semibold">
                03 // ALGORITHMIC RIGOR &amp; COMPETITIVE PROGRAMMING
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-[#09090B] dark:text-white">
              Competitive Programming &amp; Rigor.
            </h2>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-mono font-medium">
            <Trophy size={13} className="text-amber-500" />
            <span>Top 7% National Benchmarks · 500+ Problems</span>
          </div>
        </div>

        <p className="text-xs sm:text-[13px] text-[#52525B] dark:text-[#A1A1AA] font-sans">
          Algorithmic problem solving across LeetCode, CodeChef, and national machine learning benchmarks.
        </p>
      </div>

      {/* ── 2-COLUMN BENCHMARK BENTO GRID (MATCHING SUMITX TELEMETRY CARDS) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        
        {/* ── CARD 1: LEETCODE COMPETITIVE CARD ── */}
        <div
          onMouseEnter={playHover}
          className="rounded-2xl sm:rounded-3xl bg-[#0B0E14] border border-[#1E232E] hover:border-amber-500/40 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between shadow-xl relative overflow-hidden"
        >
          {/* Subtle Ambient Amber Aura */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(245,158,11,0.08),transparent_70%)] pointer-events-none" />

          {/* Card Top: Platform, Handle & External Profile Link */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              {/* LeetCode Icon */}
              <div className="w-9 h-9 rounded-xl bg-[#FFA116]/10 border border-[#FFA116]/30 flex items-center justify-center text-[#FFA116]">
                <Code2 size={18} />
              </div>
              <div>
                <div className="text-sm font-bold font-sans text-white flex items-center gap-1.5">
                  <span>LeetCode</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 font-medium">
                    Knight Track
                  </span>
                </div>
                <div className="text-xs font-mono text-neutral-400">@SAJAL-MALHOTRA</div>
              </div>
            </div>

            <a
              href="https://leetcode.com/u/SAJAL-MALHOTRA/"
              target="_blank"
              rel="noreferrer"
              onClick={playClick}
              className="flex items-center gap-1 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
            >
              <span>Profile</span>
              <ArrowUpRight size={13} />
            </a>
          </div>

          {/* Card Mid: Key Metrics Triplets */}
          <div className="grid grid-cols-3 gap-3 py-5 text-left border-b border-white/10">
            <div>
              <div className="text-[10px] font-mono text-neutral-400 uppercase">Contest Rating</div>
              <div className="text-2xl sm:text-3xl font-black font-sans text-white tracking-tight mt-0.5">
                <NumberTicker value={1824} />
              </div>
              <div className="text-[10.5px] font-mono text-amber-400 mt-0.5 flex items-center gap-1">
                <Flame size={11} />
                <span>Top 4.8%</span>
              </div>
            </div>

            <div>
              <div className="text-[10px] font-mono text-neutral-400 uppercase">Total Solved</div>
              <div className="text-2xl sm:text-3xl font-black font-sans text-white tracking-tight mt-0.5">
                <NumberTicker value={480} suffix="+" />
              </div>
              <div className="text-[10.5px] font-mono text-neutral-400 mt-0.5">
                Across 2 platforms
              </div>
            </div>

            <div>
              <div className="text-[10px] font-mono text-neutral-400 uppercase">Active Streak</div>
              <div className="text-2xl sm:text-3xl font-black font-sans text-white tracking-tight mt-0.5">
                <NumberTicker value={142} suffix="d" />
              </div>
              <div className="text-[10.5px] font-mono text-emerald-400 mt-0.5">
                Continuous
              </div>
            </div>
          </div>

          {/* Card Bottom: Solved Breakdown Progress Bars */}
          <div className="space-y-3 pt-5">
            <div className="text-[11px] font-mono text-neutral-400 uppercase font-semibold">
              Difficulty Breakdown
            </div>

            {/* Easy Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-emerald-400 font-medium">Easy</span>
                <span className="text-neutral-300">190 / 850</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full bg-emerald-500 w-[22%]" />
              </div>
            </div>

            {/* Medium Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-amber-400 font-medium">Medium</span>
                <span className="text-neutral-300">238 / 1,750</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full bg-amber-500 w-[14%]" />
              </div>
            </div>

            {/* Hard Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-rose-400 font-medium">Hard</span>
                <span className="text-neutral-300">52 / 750</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full bg-rose-500 w-[7%]" />
              </div>
            </div>
          </div>

          {/* Core Masteries */}
          <div className="flex flex-wrap gap-1.5 pt-5 border-t border-white/10 mt-5">
            {['Dynamic Programming', 'Graph Theory (BFS/DFS, Dijkstra)', 'Monotonic Stack', 'Sliding Window', 'Trie & DSU'].map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-[#161B22] border border-white/10 text-[10.5px] font-mono text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── CARD 2: CODECHEF & NATIONAL COMPETITION BENCHMARKS ── */}
        <div
          onMouseEnter={playHover}
          className="rounded-2xl sm:rounded-3xl bg-[#0B0E14] border border-[#1E232E] hover:border-cyan-500/40 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between shadow-xl relative overflow-hidden"
        >
          {/* Subtle Ambient Cyan Aura */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(6,182,212,0.08),transparent_70%)] pointer-events-none" />

          {/* Card Top: CodeChef Identity */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              {/* CodeChef Logo Icon */}
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold font-mono">
                3★
              </div>
              <div>
                <div className="text-sm font-bold font-sans text-white flex items-center gap-1.5">
                  <span>CodeChef &amp; Benchmarks</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 font-medium">
                    Division 2
                  </span>
                </div>
                <div className="text-xs font-mono text-neutral-400">@sajal_malhotra</div>
              </div>
            </div>

            <div className="text-xs font-mono text-neutral-400">
              Max: <span className="font-bold text-white">1,748</span>
            </div>
          </div>

          {/* Rating Progress Graph (Matching Sumitx Smooth SVG Rating Curve) */}
          <div className="py-4 border-b border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
              <span className="uppercase text-[10px] font-semibold text-neutral-400">Rating Progression</span>
              <span className="text-cyan-400 font-semibold">+320 pts over 12 contests</span>
            </div>
            
            <div className="relative w-full h-24 overflow-hidden pt-2">
              <svg viewBox="0 0 300 80" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="codechef-chart-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Area under curve */}
                <path
                  d="M 0 65 Q 40 55, 80 50 T 160 38 T 240 22 T 300 12 L 300 80 L 0 80 Z"
                  fill="url(#codechef-chart-grad)"
                />
                {/* Smooth stroke line */}
                <path
                  d="M 0 65 Q 40 55, 80 50 T 160 38 T 240 22 T 300 12"
                  fill="none"
                  stroke="#06B6D4"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Data point dot at current max */}
                <circle cx="300" cy="12" r="4.5" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="2" />
              </svg>
            </div>
            <div className="flex justify-between text-[10px] font-mono text-neutral-400 pt-1">
              <span>Contest #01 (1,428)</span>
              <span>Div 3</span>
              <span className="text-cyan-400 font-bold">Peak (1,748)</span>
            </div>
          </div>

          {/* National ML Benchmark Highlight */}
          <div className="space-y-3 pt-4">
            <div className="text-[11px] font-mono text-neutral-400 uppercase font-semibold flex items-center justify-between">
              <span>National ML &amp; Hackathon Benchmarks</span>
              <Award size={13} className="text-emerald-400" />
            </div>

            {/* Benchmark 1 */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <div className="text-xs font-bold font-sans text-white">
                  National CV Lighting Level Challenge
                </div>
                <div className="text-[11px] text-neutral-400 font-sans">
                  128-D luminance descriptors + bagged FastMLP on CPU. 0.211 Score.
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10.5px] font-mono font-bold shrink-0">
                #16 / 227 (Top 7%)
              </span>
            </div>

            {/* Benchmark 2 */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <div className="text-xs font-bold font-sans text-white">
                  Smart India Hackathon (SIH 2024)
                </div>
                <div className="text-[11px] text-neutral-400 font-sans">
                  Real-time distributed hardware &amp; software state tracking.
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10.5px] font-mono font-bold shrink-0">
                Top 5 Finalist
              </span>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-4 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Public Leaderboard Verified</span>
            </div>
            <span className="text-neutral-400">NIT Jalandhar CS/IT Track</span>
          </div>

        </div>

      </div>

    </section>
  );
}
