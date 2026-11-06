'use client';

import { profile } from '@/data/profile';
import { getAssetPath } from '@/utils/asset';
import { useSound } from '@/hooks/useSound';
import {
  ArrowDown,
  ArrowUpRight,
  FileText,
  Maximize2,
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
    <section id="intro" className="relative w-full max-w-[780px] mx-auto pt-8 sm:pt-12 pb-6 select-none">
      
      {/* ── BALANCED TWO-COLUMN SPREAD (CLEAN, PROPORTIONAL, ZERO FILLER) ── */}
      <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-6 sm:gap-8">
        
        {/* Left Column: Identity, Bio & Clear CTAs */}
        <div className="flex-1 space-y-4 text-left">
          
          {/* Subtle Status Line */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#71717A] dark:text-[#A1A1AA]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span>Winter &apos;26 &amp; Summer &apos;27 Opportunities</span>
            <span className="text-[#D4D4D8] dark:text-[#3F3F46]">/</span>
            <span>Jalandhar, India</span>
          </div>

          {/* Headline & Core Statement */}
          <div className="space-y-1.5">
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-sans font-bold tracking-tight text-[#09090B] dark:text-white leading-[1.12]">
              Hey, I&apos;m Sajal.
            </h1>
            <p className="text-base sm:text-lg font-medium text-[#09090B] dark:text-[#EDEDED] font-sans leading-snug">
              I build systems. I care about how things feel.
            </p>
          </div>

          {/* Grounded Bio (Single Natural Mention of NIT Jalandhar) */}
          <p className="text-sm sm:text-[14.5px] text-[#52525B] dark:text-[#A1A1AA] leading-relaxed font-sans max-w-xl">
            Software engineering, applied machine learning, and creative direction. Currently studying Information Technology at NIT Jalandhar.
          </p>

          {/* Disciplines Line */}
          <div className="text-xs font-mono text-[#71717A] dark:text-[#A1A1AA] tracking-wide pt-1">
            Systems Architecture · Applied Machine Learning · Creative Direction
          </div>

          {/* ── PROMINENT HERO CTAS (DIRECTLY IN THE HERO FOLD) ── */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <a
              href="#projects"
              onClick={playClick}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#09090B] hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-[#09090B] font-medium text-xs font-sans transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <span>View Work</span>
              <ArrowDown size={13} />
            </a>

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

            <a
              href="mailto:malhotrasajal243@gmail.com"
              onClick={playClick}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white transition-colors"
            >
              <span>malhotrasajal243@gmail.com</span>
            </a>
          </div>

        </div>

        {/* Right Column: Clean Editorial Portrait Card */}
        <div className="w-full max-w-[280px] sm:w-[260px] md:w-[270px] shrink-0 self-center sm:self-start">
          <div className="rounded-2xl bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] p-2.5 shadow-sm space-y-2.5">
            <button
              onClick={() => {
                playClick();
                onOpenPhotoZoom();
              }}
              onMouseEnter={playHover}
              title="Click to zoom portrait"
              className="w-full aspect-[4/5] rounded-xl overflow-hidden block relative cursor-pointer group bg-[#0A0B0E]"
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
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 text-black text-xs font-mono font-bold shadow-lg">
                  <Maximize2 size={12} />
                  <span>Zoom Portrait</span>
                </div>
              </div>
            </button>

            {/* Clean Footer Caption */}
            <div className="px-1 flex items-center justify-between text-xs font-mono text-[#71717A] dark:text-[#A1A1AA]">
              <span className="font-semibold font-sans text-[#09090B] dark:text-white">
                Sajal Malhotra
              </span>
              <span className="text-[11px]">
                Jalandhar, India
              </span>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}