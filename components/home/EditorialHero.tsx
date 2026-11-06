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
  Coffee,
  Code2,
  Sparkles,
  Award,
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
    <section id="intro" className="relative w-full max-w-5xl pt-4 sm:pt-6 pb-6 sm:pb-10 space-y-6 select-none">
      
      {/* ── TWO-COLUMN HERO: CLEAR NARRATIVE & VISUAL ANCHOR ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Column (7 cols): Main Typography & Manifesto */}
        <div className="lg:col-span-7 space-y-5 text-left">
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 text-[10.5px] font-mono font-medium tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>OPEN FOR SWE &amp; ML OPPORTUNITIES (SUMMER &apos;26)</span>
              </div>
            </div>

            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black tracking-tight text-[#09090B] dark:text-white leading-[1.05]">
                Hey, I&apos;m Sajal.
              </h1>
              <p className="text-xs sm:text-sm font-mono text-[#71717A] dark:text-[#A1A1AA] pt-1">
                SOFTWARE ENGINEER &amp; APPLIED ML · NIT JALANDHAR &apos;29
              </p>
            </div>
          </div>

          <p className="text-base sm:text-lg text-[#3F3F46] dark:text-[#D4D4D8] leading-relaxed font-sans font-normal">
            I&apos;m a software engineer and applied ML builder at NIT Jalandhar. I love building clean, fast systems and modern products where design, low latency, and even the smallest details matter. Outside code, I explore creative direction and runway modeling. Always open to new engineering roles and interesting work.
          </p>

          {/* Quick Manifesto Badges (Immediate Proof of Impact) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-xs font-mono">
            <div className="p-3 rounded-xl bg-white dark:bg-[#121316] border border-[#E2E4E8] dark:border-[#22242B] space-y-0.5 shadow-xs">
              <div className="text-[9px] text-[#71717A] uppercase font-bold tracking-wider">FOUNDATION</div>
              <div className="font-bold text-[#09090B] dark:text-white text-[11.5px]">NIT Jalandhar IT</div>
              <div className="text-[10px] text-[#71717A]">CGPA: 8.13 (Batch &apos;29)</div>
            </div>

            <a
              href="https://pairfect.site"
              target="_blank"
              rel="noreferrer"
              onClick={playClick}
              className="p-3 rounded-xl bg-white dark:bg-[#121316] border border-[#E2E4E8] dark:border-[#22242B] hover:border-black/40 dark:hover:border-white/40 space-y-0.5 shadow-xs transition-colors group cursor-pointer block"
              title="Open pairfect.site (Live Platform)"
            >
              <div className="flex items-center justify-between text-[9px] text-[#71717A] uppercase font-bold tracking-wider">
                <span>FLAGSHIP BUILD</span>
                <span className="text-[#A1A1AA] group-hover:text-black dark:group-hover:text-white transition-colors">↗</span>
              </div>
              <div className="font-bold text-[#09090B] dark:text-white text-[11.5px] group-hover:underline">
                pairfect.site
              </div>
              <div className="text-[10px] text-[#71717A]">200+ Active Users</div>
            </a>

            <div className="p-3 rounded-xl bg-white dark:bg-[#121316] border border-[#E2E4E8] dark:border-[#22242B] space-y-0.5 shadow-xs col-span-2 sm:col-span-1">
              <div className="text-[9px] text-[#71717A] uppercase font-bold tracking-wider">COMPETITION RANK</div>
              <div className="font-bold text-[#09090B] dark:text-white text-[11.5px]">#16 of 227 (Top 7%)</div>
              <div className="text-[10px] text-[#71717A]">National CV Challenge</div>
            </div>
          </div>

          {/* Focused Call-to-Action Bar (Clear, Decisive 2-Button Choice) */}
          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
            <a
              href="#projects"
              onClick={playClick}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-black hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black font-bold transition-all shadow-md active:scale-95 cursor-pointer text-xs"
            >
              <span>Explore Shipped Systems</span>
              <ArrowDown size={14} />
            </a>

            <a
              href={getAssetPath('/resume.pdf')}
              target="_blank"
              rel="noreferrer"
              onClick={playClick}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-[#F4F4F6] dark:bg-[#141417] dark:hover:bg-[#1E1E24] text-[#09090B] dark:text-[#EDEDED] border border-[#D1D5DB] dark:border-[#27272A] font-medium transition-all shadow-xs cursor-pointer text-xs"
            >
              <FileText size={14} className="text-[#71717A] dark:text-[#A1A1AA]" />
              <span>Resume PDF</span>
              <ArrowUpRight size={13} className="text-[#71717A] dark:text-[#A1A1AA]" />
            </a>

            <button
              onClick={() => {
                playClick();
                onOpenTerminal();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[#71717A] hover:text-[#09090B] dark:text-[#A1A1AA] dark:hover:text-white transition-colors cursor-pointer text-xs font-mono"
              title="Open Developer Terminal (~)"
            >
              <Terminal size={13} />
              <span>Developer CLI (~)</span>
            </button>
          </div>

          {/* Active Focus & Technology Telemetry (Balances vertical space seamlessly) */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-[#121316] border border-[#E2E4E8] dark:border-[#22242B] space-y-2 shadow-xs">
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

        </div>

        {/* Right Column (5 cols): The Signature Operator Dossier & Visual Anchor */}
        <div className="lg:col-span-5 relative pt-4 sm:pt-0">
          
          {/* Playful "HIRE ME" Handwritten Arrow (Rinkit Style) Positioned Aside Picture */}
          <div className="absolute -top-6 -left-8 sm:-left-12 lg:-left-14 flex flex-col items-center justify-center select-none z-30 pointer-events-auto -rotate-12">
            <a
              href={`mailto:${profile.email}`}
              onClick={playClick}
              className="text-lg sm:text-xl font-bold text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white hover:scale-110 transition-transform tracking-wider drop-shadow-xs"
              style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
            >
              HIRE ME
            </a>
            <svg
              width="46"
              height="46"
              viewBox="0 0 512 512"
              fill="none"
              className="rotate-12 text-[#71717A] dark:text-[#A1A1AA] shrink-0"
            >
              <path
                d="M 437 441 Q 363 418, 264 351 Q 198 295, 160 225 Q 138 178, 122 119"
                stroke="currentColor"
                strokeWidth="24"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M 161 149 L 125 73"
                stroke="currentColor"
                strokeWidth="24"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M 123 71 L 83 148"
                stroke="currentColor"
                strokeWidth="24"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>

          <div className="rounded-2xl bg-white dark:bg-[#0E0F12] border-2 border-black/10 dark:border-white/10 p-4 sm:p-5 shadow-xl space-y-4 text-left transition-all relative">
            
            {/* Top Header of the Dossier */}
            <div className="flex items-center justify-between border-b border-[#ECEEF2] dark:border-[#1E2026] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-black dark:bg-white" />
                <span className="font-mono text-xs font-black tracking-wider text-[#09090B] dark:text-white uppercase">
                  OPERATOR SPEC // SPECTRUM
                </span>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-wider">
                VERIFIED [NITJ]
              </span>
            </div>

            {/* Prominent Editorial Portrait (Natural 4:5 Aspect Ratio) */}
            <div className="relative group rounded-xl overflow-hidden border border-[#E2E4E8] dark:border-[#22242B] bg-[#0A0B0E]">
              <button
                onClick={() => {
                  playClick();
                  onOpenPhotoZoom();
                }}
                onMouseEnter={playHover}
                title="Click to zoom portrait"
                className="w-full aspect-[4/5] max-h-[345px] sm:max-h-[360px] block relative cursor-pointer overflow-hidden"
              >
                <img
                  src={getAssetPath('/avatar.png')}
                  alt={profile.name}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover object-[center_25%] contrast-[1.03] group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Subtle Hover Reveal */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-black text-xs font-mono font-bold shadow-lg">
                    <Maximize2 size={12} />
                    <span>Zoom Portrait</span>
                  </div>
                </div>

                {/* Status Badges in the Upper Night Sky (No Face Obscuration) */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/75 dark:bg-black/85 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] flex items-center gap-1.5 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold text-emerald-300">Open for Summer &apos;26 &amp; Co-ops</span>
                </div>

                <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/75 dark:bg-black/85 backdrop-blur-md border border-white/20 text-white/80 font-mono text-[9px] font-bold">
                  NITJ &apos;29
                </div>
              </button>
            </div>

            {/* Elegant Editorial Caption Strip */}
            <div className="pt-2.5 border-t border-[#ECEEF2] dark:border-[#1E2026] flex items-center justify-between text-[11px] font-mono text-[#71717A] dark:text-[#A1A1AA]">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Jalandhar, Punjab</span>
              </div>
              <span className="font-semibold text-[#09090B] dark:text-white">NITJ IT &apos;29 · CGPA 8.13</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
