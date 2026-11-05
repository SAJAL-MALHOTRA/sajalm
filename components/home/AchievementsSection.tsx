'use client';

import { profile } from '@/data/profile';
import { Trophy, TrendingUp, Users, Award, ShieldCheck, Star } from 'lucide-react';

export default function AchievementsSection() {
  return (
    <section id="achievements" className="w-full max-w-5xl py-8 space-y-6 text-left select-none">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E2E4E8] dark:border-[#22242A] pb-3 gap-2">
        <div className="space-y-1">
          <div className="text-[9.5px] font-mono text-[#71717A] uppercase tracking-widest">
            MILESTONES &amp; RECORDED IMPACT
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-[#09090B] dark:text-white tracking-tight flex items-center gap-2.5">
            <span>Verified Achievements</span>
            <Trophy size={20} className="text-amber-500" />
          </h2>
        </div>
        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 self-start sm:self-auto font-bold">
          ● VERIFIED BENCHMARKS &amp; USER GROWTH
        </span>
      </div>

      {/* ── ACHIEVEMENTS BENTO GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        
        {/* Highlight 1: Pairfect 200+ Users (Large Banner Card) */}
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-white via-white to-amber-500/5 dark:from-[#111216] dark:via-[#111216] dark:to-amber-500/10 border-2 border-black/15 dark:border-white/15 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-900 dark:text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold uppercase">
                SCALED CONSUMER PLATFORM
              </span>
              <span className="text-[10px] font-mono text-[#71717A]">PRODUCT MILESTONE</span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-black font-sans tracking-tight text-[#09090B] dark:text-white">
                200+
              </span>
              <span className="text-base sm:text-lg font-bold font-mono text-amber-700 dark:text-amber-400">
                Active Users on Pairfect
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#3F3F46] dark:text-[#D4D4D8] leading-relaxed font-sans">
              Designed and shipped <span className="font-bold text-[#09090B] dark:text-white">pairfect.site</span>, scaling it organically to over 200 active users. Engineered a low-latency Groq Llama 3 inference pipeline delivering sub-50ms conversational analysis, bidirectional Supabase WebSockets, and zero TypeScript compile errors over 77 production routes.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#ECEEF2] dark:border-white/10 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[#52525B] dark:text-[#A1A1AA]">Next.js · Supabase · Groq Llama 3</span>
            </div>
            <a
              href="https://pairfect.site"
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1 rounded bg-black text-white dark:bg-white dark:text-black font-bold text-[10.5px] hover:opacity-90 transition-opacity"
            >
              Visit pairfect.site ↗
            </a>
          </div>
        </div>

        {/* Highlight 2: National CV Challenge (Top 7%) */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] shadow-xs space-y-3 flex flex-col justify-between hover:border-black/30 dark:hover:border-white/30 transition-all">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#71717A] uppercase font-bold">
              <span>MACHINE LEARNING</span>
              <Award size={13} className="text-emerald-500" />
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black font-sans text-[#09090B] dark:text-white">
                #16
              </span>
              <span className="text-sm font-bold font-mono text-[#71717A] dark:text-[#A1A1AA]">
                of 227 (Top 7%)
              </span>
            </div>

            <div className="text-xs font-bold font-mono text-emerald-700 dark:text-emerald-400">
              Score: 0.21 · Best Solution Leaderboard
            </div>

            <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] leading-relaxed font-sans">
              Ranked #16 of 227 (National Top 7%) on “Lighting Level” illumination prediction from camera images with a score of 0.21. Earned &apos;Best Solution&apos; recognition with 128-D luminance descriptors and 10-fold bagged FastMLP on CPU.
            </p>
          </div>

          <div className="pt-2 border-t border-[#ECEEF2] dark:border-white/5 text-[10px] font-mono text-[#71717A]">
            PyTorch · ResNet-34 · EfficientNet
          </div>
        </div>

        {/* Highlight 3: Content Creator & Model (220K+ Views) */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] shadow-xs space-y-3 flex flex-col justify-between hover:border-black/30 dark:hover:border-white/30 transition-all">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#71717A] uppercase font-bold">
              <span>CREATIVE &amp; FASHION</span>
              <Star size={13} className="text-rose-500" />
            </div>

            <div className="text-3xl font-black font-sans text-[#09090B] dark:text-white">
              220K+
            </div>

            <div className="text-xs font-bold font-mono text-rose-700 dark:text-rose-400">
              Monthly Creative Reach
            </div>

            <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] leading-relaxed font-sans">
              Built personal creative presence generating 2.2L+ (220,000+) monthly views across fashion styling, runway choreography, and tech lifestyle. Stage and runway performer for the NIT Jalandhar Fashion &amp; Modelling Club.
            </p>
          </div>

          <div className="pt-2 border-t border-[#ECEEF2] dark:border-white/5 text-[10px] font-mono text-[#71717A]">
            Runway · Editorial Direction · Video
          </div>
        </div>

        {/* Highlight 4: Cybernauts Arena (0ms Drift Esports Platform) */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] shadow-xs space-y-3 flex flex-col justify-between hover:border-black/30 dark:hover:border-white/30 transition-all">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#71717A] uppercase font-bold">
              <span>DISTRIBUTED SYSTEMS</span>
              <ShieldCheck size={13} className="text-blue-500" />
            </div>

            <div className="text-3xl font-black font-sans text-[#09090B] dark:text-white">
              16 TEAMS
            </div>

            <div className="text-xs font-bold font-mono text-blue-700 dark:text-blue-400">
              0ms Drift Authoritative Clock
            </div>

            <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] leading-relaxed font-sans">
              Core Member at Cybernauts NITJ. Architected the broadcast-grade tournament platform orchestrating 16 simultaneous physical table duels with a 2.5s network grace buffer, 5-tier incident scoring, and 4K arena projector.
            </p>
          </div>

          <div className="pt-2 border-t border-[#ECEEF2] dark:border-white/5 text-[10px] font-mono text-[#71717A]">
            Next.js 16 · Express · Web Audio API
          </div>
        </div>

        {/* Highlight 5: Academic Foundation (CGPA 8.13) */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] shadow-xs space-y-3 flex flex-col justify-between hover:border-black/30 dark:hover:border-white/30 transition-all">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#71717A] uppercase font-bold">
              <span>ACADEMICS</span>
              <Users size={13} className="text-purple-500" />
            </div>

            <div className="text-3xl font-black font-sans text-[#09090B] dark:text-white">
              8.13 CGPA
            </div>

            <div className="text-xs font-bold font-mono text-purple-700 dark:text-purple-400">
              NIT Jalandhar B.Tech IT
            </div>

            <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] leading-relaxed font-sans">
              Undergraduate in Information Technology at Dr. B. R. Ambedkar National Institute of Technology Jalandhar (2025–2029). Core coursework in Data Structures, Algorithms, Machine Learning, OS, DBMS, and Networks.
            </p>
          </div>

          <div className="pt-2 border-t border-[#ECEEF2] dark:border-white/5 text-[10px] font-mono text-[#71717A]">
            NITJ IT Batch: 2025–2029
          </div>
        </div>

      </div>

    </section>
  );
}
