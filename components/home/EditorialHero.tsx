'use client';

import { profile } from '@/data/profile';
import { getAssetPath } from '@/utils/asset';
import { useSound } from '@/hooks/useSound';
import {
  ArrowDown,
  ArrowUpRight,
  FileText,
  Terminal,
  Maximize2,
} from 'lucide-react';

interface EditorialHeroProps {
  onOpenTerminal: () => void;
  onOpenPhotoZoom: () => void;
}

export default function EditorialHero({
  onOpenTerminal,
  onOpenPhotoZoom,
}: EditorialHeroProps) {
  const { playClick, playHover } = useSound();

  return (
    <section id="intro" className="relative w-full max-w-[690px] mx-auto pt-6 sm:pt-8 pb-4 select-none space-y-6">
      
      {/* ── TOP SECTION: BIOGRAPHY & SIGNATURE PORTRAIT DOSSIER ── */}
      <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-6">
        
        {/* Left: Headline, Availability, Bio */}
        <div className="flex-1 space-y-3 text-left">
          
          {/* Availability Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 text-[10.5px] font-mono font-medium tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>OPEN FOR SWE &amp; ML OPPORTUNITIES (SUMMER &apos;26)</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-[#09090B] dark:text-white leading-[1.08]">
              Hey, I&apos;m Sajal.
            </h1>
            <p className="text-xs sm:text-[13px] font-mono text-[#71717A] dark:text-[#A1A1AA]">
              SOFTWARE ENGINEER &amp; APPLIED ML · NIT JALANDHAR &apos;29
            </p>
          </div>

          <p className="text-sm sm:text-[15px] text-[#3F3F46] dark:text-[#D4D4D8] leading-relaxed font-sans">
            I&apos;m a software engineer and applied ML builder at NIT Jalandhar. I love building clean, fast systems and modern products where design, low latency, and even the smallest details matter. Outside code, I explore creative direction and runway modeling. Always open to new engineering roles and interesting work.
          </p>
        </div>

        {/* Right: Centered HIRE ME Callout + Portrait Frame */}
        <div className="flex flex-col items-center shrink-0 self-center sm:self-start">
          
          {/* Centered HIRE ME with downward-pointing hand-drawn arrow redirecting to #contact */}
          <a
            href="#contact"
            onClick={playClick}
            className="flex flex-col items-center group cursor-pointer -mt-1 mb-1 transition-transform hover:scale-105 select-none"
            title="Jump to Contact & Opportunities Hub"
          >
            <span
              className="text-lg sm:text-xl font-bold text-[#71717A] dark:text-[#A1A1AA] group-hover:text-black dark:group-hover:text-white tracking-wider"
              style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
            >
              HIRE ME
            </span>
            <svg
              width="34"
              height="34"
              viewBox="0 0 100 100"
              fill="none"
              className="text-[#71717A] dark:text-[#A1A1AA] group-hover:text-black dark:group-hover:text-white -mt-1 transition-colors"
            >
              {/* Downward curved path */}
              <path
                d="M 50 12 Q 54 44, 49 68"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Downward arrow head */}
              <path
                d="M 36 56 L 49 70 L 62 56"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </a>

          {/* Portrait Image Frame */}
          <div
            onClick={() => {
              playClick();
              onOpenPhotoZoom();
            }}
            onMouseEnter={playHover}
            title="Click to zoom portrait"
            className="relative w-28 h-36 sm:w-32 sm:h-40 rounded-2xl overflow-hidden border-2 border-[#E2E4E8] dark:border-[#27272A] shadow-md group cursor-pointer bg-[#0A0B0E]"
          >
            <img
              src={getAssetPath('/avatar.png')}
              alt={profile.name}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover object-[center_20%] contrast-[1.03] group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Subtle Zoom Hover Overlay */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="p-1.5 rounded-full bg-white/95 text-black shadow-md">
                <Maximize2 size={13} />
              </div>
            </div>

            {/* Corner Badge */}
            <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-md text-[8.5px] font-mono text-white/90 font-bold">
              NITJ &apos;29
            </div>
          </div>

        </div>

      </div>

      {/* ── FOUNDATION & PROOF BADGES (TIGHT 3-COL GRID) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs font-mono">
        <div className="p-3 rounded-xl bg-white dark:bg-[#121316] border border-[#E2E4E8] dark:border-[#22242B] space-y-0.5 shadow-2xs">
          <div className="text-[9px] text-[#71717A] uppercase font-bold tracking-wider">FOUNDATION</div>
          <div className="font-bold text-[#09090B] dark:text-white text-[12px]">NIT Jalandhar IT</div>
          <div className="text-[10px] text-[#71717A]">CGPA: 8.13 (Batch &apos;29)</div>
        </div>

        <a
          href="https://pairfect.site"
          target="_blank"
          rel="noreferrer"
          onClick={playClick}
          className="p-3 rounded-xl bg-white dark:bg-[#121316] border border-[#E2E4E8] dark:border-[#22242B] hover:border-black/40 dark:hover:border-white/40 space-y-0.5 shadow-2xs transition-colors group cursor-pointer block"
          title="Open pairfect.site (Live Platform)"
        >
          <div className="flex items-center justify-between text-[9px] text-[#71717A] uppercase font-bold tracking-wider">
            <span>FLAGSHIP BUILD</span>
            <span className="text-[#A1A1AA] group-hover:text-black dark:group-hover:text-white transition-colors">↗</span>
          </div>
          <div className="font-bold text-[#09090B] dark:text-white text-[12px] group-hover:underline">
            pairfect.site
          </div>
          <div className="text-[10px] text-[#71717A]">200+ Active Users</div>
        </a>

        <div className="p-3 rounded-xl bg-white dark:bg-[#121316] border border-[#E2E4E8] dark:border-[#22242B] space-y-0.5 shadow-2xs">
          <div className="text-[9px] text-[#71717A] uppercase font-bold tracking-wider">COMPETITION RANK</div>
          <div className="font-bold text-[#09090B] dark:text-white text-[12px]">#16 of 227 (Top 7%)</div>
          <div className="text-[10px] text-[#71717A]">National CV Challenge</div>
        </div>
      </div>

      {/* ── ACTION CTAS BAR ── */}
      <div className="flex flex-wrap items-center gap-2.5 pt-1 font-mono text-xs">
        <a
          href="#projects"
          onClick={playClick}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black font-bold transition-all shadow-sm active:scale-95 cursor-pointer text-xs"
        >
          <span>Explore Shipped Systems</span>
          <ArrowDown size={13} />
        </a>

        <a
          href={getAssetPath('/resume.pdf')}
          target="_blank"
          rel="noreferrer"
          onClick={playClick}
          className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#F4F4F6] dark:bg-[#141417] dark:hover:bg-[#1E1E24] text-[#09090B] dark:text-[#EDEDED] border border-[#D1D5DB] dark:border-[#27272A] font-medium transition-all shadow-2xs cursor-pointer text-xs"
        >
          <FileText size={13} className="text-[#71717A] dark:text-[#A1A1AA]" />
          <span>Resume PDF</span>
          <ArrowUpRight size={12} className="text-[#71717A] dark:text-[#A1A1AA]" />
        </a>

        <button
          onClick={() => {
            playClick();
            onOpenTerminal();
          }}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[#71717A] hover:text-[#09090B] dark:text-[#A1A1AA] dark:hover:text-white transition-colors cursor-pointer text-xs font-mono ml-auto"
          title="Open Developer Terminal (~)"
        >
          <Terminal size={12} />
          <span>CLI (~)</span>
        </button>
      </div>

      {/* ── ACTIVE FOCUS & TELEMETRY BOX ── */}
      <div className="p-3.5 rounded-xl bg-white dark:bg-[#121316] border border-[#E2E4E8] dark:border-[#22242B] space-y-2 shadow-2xs">
        <div className="flex items-center justify-between text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-wider">
          <span className="flex items-center gap-1.5 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>ACTIVE FOCUS // WHAT I&apos;M BUILDING</span>
          </span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#F4F4F5] dark:bg-[#1C1D22] text-[#71717A] dark:text-[#A1A1AA]">
            NIT JALANDHAR &apos;29
          </span>
        </div>
        <p className="text-xs text-[#3F3F46] dark:text-[#D4D4D8] font-sans leading-relaxed">
          Engineering <span className="font-semibold text-[#09090B] dark:text-white">DSA Lecture RAG</span> (dense RRF hybrid search) &amp; <span className="font-semibold text-[#09090B] dark:text-white">Cybernauts Arena</span> (broadcast esports engine with 0ms clock drift).
        </p>
        <div className="flex items-center gap-1.5 flex-wrap pt-0.5 text-[10.5px] font-mono text-[#71717A] dark:text-[#A1A1AA]">
          <span className="px-2 py-0.5 rounded-md bg-[#F4F4F5] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A]">Next.js 16</span>
          <span className="px-2 py-0.5 rounded-md bg-[#F4F4F5] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A]">PyTorch</span>
          <span className="px-2 py-0.5 rounded-md bg-[#F4F4F5] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A]">FastAPI</span>
          <span className="px-2 py-0.5 rounded-md bg-[#F4F4F5] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A]">Groq Llama 3</span>
          <span className="px-2 py-0.5 rounded-md bg-[#F4F4F5] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A]">Supabase</span>
        </div>
      </div>

    </section>
  );
}
