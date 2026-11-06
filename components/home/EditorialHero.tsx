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
    <section id="intro" className="relative w-full max-w-[780px] mx-auto pt-8 sm:pt-12 pb-6 select-none space-y-8">
      
      {/* ── TOP SECTION: COMPOSED EDITORIAL SPREAD ── */}
      <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-6 sm:gap-8">
        
        {/* Left Column: Narrative Identity & Manifest */}
        <div className="flex-1 space-y-4 text-left">
          
          {/* Understated Availability Indicator */}
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-[#E2E4E8] dark:border-[#22242B] text-[10.5px] font-mono tracking-wider text-[#71717A] dark:text-[#A1A1AA]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-[#09090B] dark:text-[#EDEDED]">AVAILABLE FOR OPPORTUNITIES</span>
            <span className="text-[#A1A1AA]">·</span>
            <span>JALANDHAR, INDIA</span>
          </div>

          {/* Core Manifesto Headline */}
          <div className="space-y-1.5">
            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-sans font-black tracking-tight text-[#09090B] dark:text-white leading-[1.12]">
              Hey, I&apos;m Sajal.
            </h1>
            <p className="text-base sm:text-lg font-medium text-[#09090B] dark:text-[#EDEDED] font-sans leading-snug">
              I build systems. I care about how things feel.
            </p>
          </div>

          <p className="text-sm sm:text-[14.5px] text-[#52525B] dark:text-[#A1A1AA] leading-relaxed font-sans max-w-xl">
            Software engineering, applied machine learning and creative direction. Currently studying Information Technology at NIT Jalandhar.
          </p>

          {/* Identity Chips & Scroll Cue */}
          <div className="flex items-center justify-between pt-2 border-t border-[#E2E4E8] dark:border-[#22242B] text-[10.5px] font-mono text-[#71717A] dark:text-[#A1A1AA]">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 font-semibold text-[#09090B] dark:text-[#EDEDED]">ENGINEERING</span>
              <span>·</span>
              <span className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 font-semibold text-[#09090B] dark:text-[#EDEDED]">APPLIED ML</span>
              <span>·</span>
              <span className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 font-semibold text-[#09090B] dark:text-[#EDEDED]">CREATIVE DIRECTION</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-[#A1A1AA] uppercase tracking-wider shrink-0">
              <a href="#projects" onClick={playClick} className="hover:text-[#09090B] dark:hover:text-white transition-colors flex items-center gap-1">
                <span>SCROLL TO EXPLORE</span>
                <ArrowDown size={11} />
              </a>
              <span className="text-black/20 dark:text-white/20">|</span>
              <span>01 / 07</span>
            </div>
          </div>

        </div>

        {/* Right Column: Editorial Operator Spec Dossier Card */}
        <div className="w-full sm:w-[310px] md:w-[330px] flex flex-col items-center shrink-0 self-center sm:self-start pt-3 sm:pt-1 relative">
          
          {/* Playful "HIRE ME" Handwritten Arrow pointing at Dossier Card */}
          <div className="absolute -top-7 -left-4 sm:-left-8 flex flex-col items-center justify-center select-none z-30 pointer-events-auto -rotate-12">
            <a
              href="#contact"
              onClick={playClick}
              className="text-base sm:text-lg font-bold text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white hover:scale-110 transition-transform tracking-wider drop-shadow-xs cursor-pointer"
              style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
            >
              HIRE ME
            </a>
            <svg
              width="42"
              height="42"
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

          {/* ── OPERATOR SPEC // SPECTRUM DOSSIER CARD ── */}
          <div className="w-full rounded-2xl bg-white dark:bg-[#0E0F12] border-2 border-black/10 dark:border-white/10 p-4 sm:p-5 shadow-xl space-y-4 text-left transition-all relative">
            
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

      {/* ── FOUNDATION METRICS (BREATHING ROOM & HONEST TELEMETRY) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1 text-xs font-mono">
        <div className="p-3.5 rounded-xl bg-white dark:bg-[#121316] border border-[#E2E4E8] dark:border-[#22242B] space-y-1 shadow-2xs">
          <div className="text-[9px] text-[#71717A] uppercase font-bold tracking-wider">ACADEMIC FOUNDATION</div>
          <div className="font-bold text-[#09090B] dark:text-white text-[12.5px]">NIT Jalandhar · IT &apos;29</div>
          <div className="text-[10px] text-[#71717A]">CGPA: 8.13 (Department of IT)</div>
        </div>

        <a
          href="https://pairfect.site"
          target="_blank"
          rel="noreferrer"
          onClick={playClick}
          className="p-3.5 rounded-xl bg-white dark:bg-[#121316] border border-[#E2E4E8] dark:border-[#22242B] hover:border-black/30 dark:hover:border-white/30 space-y-1 shadow-2xs transition-colors group cursor-pointer block"
          title="Open pairfect.site (Campus Pilot)"
        >
          <div className="flex items-center justify-between text-[9px] text-[#71717A] uppercase font-bold tracking-wider">
            <span>FLAGSHIP PRODUCT</span>
            <span className="text-[#A1A1AA] group-hover:text-black dark:group-hover:text-white transition-colors">↗</span>
          </div>
          <div className="font-bold text-[#09090B] dark:text-white text-[12.5px] group-hover:underline">
            Pairfect (pairfect.site)
          </div>
          <div className="text-[10px] text-[#71717A]">200+ registered pilot users</div>
        </a>

        <div className="p-3.5 rounded-xl bg-white dark:bg-[#121316] border border-[#E2E4E8] dark:border-[#22242B] space-y-1 shadow-2xs">
          <div className="text-[9px] text-[#71717A] uppercase font-bold tracking-wider">COMPETITION RANK</div>
          <div className="font-bold text-[#09090B] dark:text-white text-[12.5px]">#16 / 227 (Top 7%)</div>
          <div className="text-[10px] text-[#71717A]">National CV Challenge (0.211 Score)</div>
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
          className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#F4F4F6] dark:bg-[#121316] dark:hover:bg-[#1C1D22] text-[#09090B] dark:text-[#EDEDED] border border-[#E2E4E8] dark:border-[#22242B] font-medium transition-all shadow-2xs cursor-pointer text-xs"
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
          <span>Developer CLI (~)</span>
        </button>
      </div>

      {/* ── ACTIVE FOCUS TELEMETRY STRIP ── */}
      <div className="p-4 rounded-xl bg-white dark:bg-[#121316] border border-[#E2E4E8] dark:border-[#22242B] space-y-2.5 shadow-2xs">
        <div className="flex items-center justify-between text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-wider">
          <span className="flex items-center gap-1.5 font-semibold text-[#09090B] dark:text-[#EDEDED]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>ACTIVE FOCUS // WHAT I&apos;M BUILDING</span>
          </span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5 text-[#71717A] dark:text-[#A1A1AA] font-mono">
            NIT JALANDHAR &apos;29
          </span>
        </div>

        <ul className="text-xs text-[#52525B] dark:text-[#A1A1AA] font-sans space-y-1 list-none pl-0">
          <li className="flex items-start gap-1.5">
            <span className="text-black/40 dark:text-white/40 font-mono">→</span>
            <span><strong className="text-[#09090B] dark:text-white font-semibold">DSA Lecture RAG</strong> — Lecture-grounded hybrid retrieval and timestamp navigation.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-black/40 dark:text-white/40 font-mono">→</span>
            <span><strong className="text-[#09090B] dark:text-white font-semibold">Cybernauts Arena</strong> — Real-time tournament and broadcast infrastructure for physical event duels.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-black/40 dark:text-white/40 font-mono">→</span>
            <span><strong className="text-[#09090B] dark:text-white font-semibold">Pairfect</strong> — Consumer relationship platform with real-time shared spaces.</span>
          </li>
        </ul>

        <div className="flex items-center gap-1.5 flex-wrap pt-1 text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA]">
          <span className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-[#E2E4E8] dark:border-[#22242B]">Next.js</span>
          <span className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-[#E2E4E8] dark:border-[#22242B]">TypeScript</span>
          <span className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-[#E2E4E8] dark:border-[#22242B]">Python</span>
          <span className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-[#E2E4E8] dark:border-[#22242B]">PyTorch</span>
          <span className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-[#E2E4E8] dark:border-[#22242B]">FastAPI</span>
          <span className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-[#E2E4E8] dark:border-[#22242B]">Supabase</span>
        </div>
      </div>

    </section>
  );
}
