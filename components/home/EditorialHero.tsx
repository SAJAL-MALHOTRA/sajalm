'use client';

import { profile } from '@/data/profile';
import { getAssetPath } from '@/utils/asset';
import { useSound } from '@/hooks/useSound';
import MagneticButton from '@/components/ui/MagneticButton';
import HeroBadgeCard from '@/components/badge/HeroBadgeCard';
import KeycapBadge from '@/components/ui/KeycapBadge';
import {
  ArrowDown,
  ArrowUpRight,
  FileText,
} from 'lucide-react';

interface EditorialHeroProps {
  onOpenTerminal: () => void;
  onOpenPhotoZoom: () => void;
}

export default function EditorialHero({
  onOpenPhotoZoom,
}: EditorialHeroProps) {
  const { playClick, playHover } = useSound();

  return (
    <section id="intro" className="relative w-full max-w-[1020px] mx-auto pt-8 sm:pt-14 pb-8 select-none">
      
      {/* ── BALANCED TWO-COLUMN SPREAD (CLEAN, PROPORTIONAL, EXPANSIVE) ── */}
      <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-8 md:gap-12">
        
        {/* Left Column: Identity, Bio & Clear CTAs */}
        <div className="flex-1 space-y-4 text-left">
          
          {/* Subtle Status Line */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#71717A] dark:text-[#A1A1AA]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span>Open to Winter &apos;26 &amp; Summer &apos;27 opportunities</span>
            <span className="text-[#D4D4D8] dark:text-[#3F3F46]">/</span>
            <span>Jalandhar, India</span>
          </div>

          {/* Headline & Core Statement */}
          <div className="space-y-1.5">
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-sans font-black tracking-tight text-[#09090B] dark:text-white leading-[1.08]">
              Hey, I&apos;m Sajal.
            </h1>
            <p className="text-lg sm:text-xl font-medium text-[#09090B] dark:text-[#EDEDED] font-sans leading-snug">
              Distributed systems, low-latency protocols, and applied machine learning.
            </p>
          </div>

          {/* Grounded Bio */}
          <p className="text-sm sm:text-base text-[#52525B] dark:text-[#A1A1AA] leading-relaxed font-sans max-w-2xl">
            Software engineer studying Information Technology at NIT Jalandhar. Building low-latency backend architectures, synchronization primitives, and evaluated inference pipelines.
          </p>

          {/* Disciplines Line */}
          <div className="text-xs font-mono text-[#71717A] dark:text-[#A1A1AA] tracking-wide pt-1">
            Distributed Systems · WebSockets &amp; WebRTC Mesh · Evaluated Machine Learning
          </div>

          {/* ── HERO CTAS ── */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <MagneticButton>
              <a
                href="#projects"
                onClick={playClick}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#09090B] hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-[#09090B] font-medium text-xs font-sans transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                <span>View Work</span>
                <ArrowDown size={13} />
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href={getAssetPath('/resume.pdf')}
                target="_blank"
                rel="noreferrer"
                onClick={playClick}
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-white hover:bg-[#F4F4F6] dark:bg-[#121316] dark:hover:bg-[#1C1D22] text-[#09090B] dark:text-[#EDEDED] border border-[#E2E4E8] dark:border-[#22242B] font-medium text-xs font-sans transition-all shadow-2xs cursor-pointer"
              >
                <FileText size={13} className="text-[#71717A] dark:text-[#A1A1AA]" />
                <span>Resume</span>
                <ArrowUpRight size={12} className="text-[#71717A] dark:text-[#A1A1AA]" />
              </a>
            </MagneticButton>

            <a
              href="mailto:malhotrasajal243@gmail.com"
              onClick={playClick}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white transition-colors"
            >
              <span>malhotrasajal243@gmail.com</span>
            </a>
          </div>

          {/* ── QUICK TELEMETRY KPI STRIP IN HERO ── */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E2E4E8] dark:border-[#22242B] max-w-xl font-mono text-xs">
            <div>
              <div className="text-[10px] text-[#71717A] dark:text-[#8E92A2] uppercase tracking-wider">Institution</div>
              <div className="font-bold text-[#09090B] dark:text-white mt-0.5">NIT Jalandhar &apos;29</div>
              <div className="text-[10.5px] text-emerald-600 dark:text-emerald-400 font-medium">8.13 CGPA</div>
            </div>
            <div>
              <div className="text-[10px] text-[#71717A] dark:text-[#8E92A2] uppercase tracking-wider">Production Pilot</div>
              <div className="font-bold text-[#09090B] dark:text-white mt-0.5">Pairfect Engine</div>
              <div className="text-[10.5px] text-[#71717A] dark:text-[#A1A1AA]">200+ Active Users</div>
            </div>
            <div>
              <div className="text-[10px] text-[#71717A] dark:text-[#8E92A2] uppercase tracking-wider">National Rank</div>
              <div className="font-bold text-[#09090B] dark:text-white mt-0.5">Top 7% (#16/227)</div>
              <div className="text-[10.5px] text-emerald-600 dark:text-emerald-400 font-medium">Best Solution</div>
            </div>
          </div>

        </div>

        {/* Right Column: Tactile Flippable Engineering ID Badge Card */}
        <HeroBadgeCard onOpenPhotoZoom={onOpenPhotoZoom} />

      </div>

    </section>
  );
}