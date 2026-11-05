'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile } from '@/data/profile';
import { getAssetPath } from '@/utils/asset';
import { useSound } from '@/hooks/useSound';
import {
  ArrowDown,
  ExternalLink,
  CheckCircle2,
  Terminal,
  FileText,
  Mail,
  X,
  Maximize2,
  Code2,
  Briefcase,
  Compass,
  Layers,
  Camera,
  Coffee,
  Activity,
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
  const [activeTrait, setActiveTrait] = useState<string | null>(null);

  return (
    <section id="intro" className="relative w-full max-w-5xl py-6 sm:py-10 space-y-8 select-none">
      
      {/* ── TOP BADGE & LIVE DISPATCH STATUS ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono border-b border-[#E2E4E8] dark:border-[#22242A] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[#09090B] dark:text-white font-bold tracking-wider text-[11px]">
            SAJAL MALHOTRA // NIT JALANDHAR
          </span>
          <span className="text-[#A1A1AA] hidden sm:inline">•</span>
          <span className="text-[#71717A] text-[10.5px] hidden sm:inline">
            B.TECH IT · BATCH 2025–2029 (CGPA: 8.13)
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px]">
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 font-medium">
            ● ACTIVELY SEEKING INTERNSHIPS &amp; SWE/ML ROLES
          </span>
        </div>
      </div>

      {/* ── TWO-COLUMN HERO BANNER & PERSONALITY POP-UP CARD ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Column (7 cols): Main Typography & Manifesto */}
        <div className="lg:col-span-7 space-y-5 text-left">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[10.5px] font-mono text-[#52525B] dark:text-[#A1A1AA]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>A REFLECTION OF WHO I AM</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black tracking-tight text-[#09090B] dark:text-white leading-[1.05]">
              Hey, I&apos;m Sajal.
            </h1>
          </div>

          <p className="text-base sm:text-lg text-[#3F3F46] dark:text-[#D4D4D8] leading-relaxed font-sans font-normal">
            Software engineer &amp; machine learning researcher by daylight. Fashion model &amp; creative director after hours. Grounded in spirituality and engineering rigor, building fast, resilient, and beautiful distributed platforms at NIT Jalandhar.
          </p>

          {/* Quick Manifesto Badges (Prioritizing Tech First) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-white dark:bg-[#121316] border border-[#E2E4E8] dark:border-[#22242B] space-y-0.5 shadow-xs">
              <div className="text-[9px] text-[#71717A] uppercase font-bold">FOUNDATION</div>
              <div className="font-bold text-[#09090B] dark:text-white text-[11px]">NIT Jalandhar IT</div>
              <div className="text-[10px] text-[#71717A]">CGPA: 8.13</div>
            </div>

            <a
              href="https://pairfect.site"
              target="_blank"
              rel="noreferrer"
              onClick={playClick}
              className="p-2.5 rounded-xl bg-white dark:bg-[#121316] border border-[#E2E4E8] dark:border-[#22242B] hover:border-black/40 dark:hover:border-white/40 space-y-0.5 shadow-xs transition-colors group cursor-pointer block"
              title="Open pairfect.site (Live Platform)"
            >
              <div className="flex items-center justify-between text-[9px] text-[#71717A] uppercase font-bold">
                <span>PRODUCTION IMPACT</span>
                <span className="text-[#A1A1AA] group-hover:text-black dark:group-hover:text-white transition-colors">↗</span>
              </div>
              <div className="font-bold text-[#09090B] dark:text-white text-[11px] group-hover:underline">
                pairfect.site
              </div>
              <div className="text-[10px] text-[#71717A]">200+ Active Users</div>
            </a>

            <div className="p-2.5 rounded-xl bg-white dark:bg-[#121316] border border-[#E2E4E8] dark:border-[#22242B] space-y-0.5 shadow-xs col-span-2 sm:col-span-1">
              <div className="text-[9px] text-[#71717A] uppercase font-bold">COMPETITION RANK</div>
              <div className="font-bold text-[#09090B] dark:text-white text-[11px]">#16 of 227 (Top 7%)</div>
              <div className="text-[10px] text-[#71717A]">CV Lighting Challenge</div>
            </div>
          </div>

          {/* Call-to-Action Bar */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 pt-3 font-mono text-xs">
            <a
              href="#projects"
              onClick={playClick}
              className="col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black font-bold transition-all shadow-md active:scale-95 cursor-pointer text-center"
            >
              <span>Explore Projects</span>
              <ArrowDown size={14} />
            </a>

            <a
              href="#achievements"
              onClick={playClick}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white hover:bg-[#F4F4F6] dark:bg-[#141417] dark:hover:bg-[#1E1E24] text-[#09090B] dark:text-[#EDEDED] border border-[#D1D5DB] dark:border-[#27272A] font-medium transition-all shadow-xs cursor-pointer text-center text-[11px] sm:text-xs"
            >
              <span>Achievements</span>
            </a>

            <a
              href={getAssetPath('/resume.pdf')}
              target="_blank"
              rel="noreferrer"
              onClick={playClick}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white hover:bg-[#F4F4F6] dark:bg-[#141417] dark:hover:bg-[#1E1E24] text-[#09090B] dark:text-[#EDEDED] border border-[#D1D5DB] dark:border-[#27272A] font-medium transition-all shadow-xs cursor-pointer text-center text-[11px] sm:text-xs"
            >
              <FileText size={13} className="text-[#71717A] dark:text-[#A1A1AA]" />
              <span>Resume PDF</span>
            </a>

            <button
              onClick={() => {
                playClick();
                onOpenTerminal();
              }}
              className="col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white hover:bg-[#F4F4F6] dark:bg-[#141417] dark:hover:bg-[#1E1E24] text-[#09090B] dark:text-[#EDEDED] border border-[#D1D5DB] dark:border-[#27272A] font-medium transition-all shadow-xs cursor-pointer text-center text-[11px] sm:text-xs"
              title="Open Terminal Shell (~)"
            >
              <Terminal size={13} className="text-[#71717A] dark:text-[#A1A1AA]" />
              <span>Developer CLI (~)</span>
            </button>
          </div>

        </div>

        {/* Right Column (5 cols): The Signature Personality Card Pop-Up */}
        <div className="lg:col-span-5 relative">
          
          <div className="rounded-2xl bg-white dark:bg-[#0E0F12] border-2 border-black/10 dark:border-white/10 p-4 sm:p-5 shadow-xl space-y-4 text-left transition-all relative overflow-hidden">
            
            {/* Top Header of the Pop-Up */}
            <div className="flex items-center justify-between border-b border-[#ECEEF2] dark:border-[#1E2026] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-black dark:bg-white" />
                <span className="font-mono text-xs font-black tracking-wider text-[#09090B] dark:text-white uppercase">
                  OPERATOR SPEC // SPECTRUM
                </span>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-[#52525B] dark:text-[#A1A1AA] border border-black/10 dark:border-white/10">
                WHO I AM
              </span>
            </div>

            {/* Photo Thumbnail + Verified Candidate Tag */}
            <div className="flex items-center gap-3.5">
              <button
                onClick={() => {
                  playClick();
                  onOpenPhotoZoom();
                }}
                onMouseEnter={playHover}
                title="Click to zoom portrait"
                className="group relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl bg-[#F1F2F5] dark:bg-[#0A0B0E] border-2 border-black/20 hover:border-black dark:border-white/20 dark:hover:border-white overflow-hidden flex items-center justify-center shadow-md transition-all cursor-pointer"
              >
                <img
                  src={getAssetPath('/avatar.png')}
                  alt={profile.name}
                  className="w-full h-full object-cover object-top contrast-[1.03] group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 size={13} className="text-white" />
                </div>
              </button>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base font-black text-[#09090B] dark:text-white font-sans truncate">
                    {profile.name}
                  </span>
                  <span className="text-[8.5px] px-1.5 py-0.2 rounded bg-black text-white dark:bg-white dark:text-black font-mono font-bold">
                    VERIFIED
                  </span>
                </div>
                <p className="text-[11px] text-[#52525B] dark:text-[#A1A1AA] font-mono leading-tight">
                  B.Tech IT @ NIT Jalandhar · 2025–2029
                </p>
                <div className="flex items-center gap-1.5 pt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                    Open for Summer 2026 &amp; Co-ops
                  </span>
                </div>
              </div>
            </div>

            {/* ── THE 6 CORE PERSONALITY TRAITS (REQUESTED BY SAJAL) ── */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[9px] font-mono text-[#71717A] uppercase tracking-wider font-bold px-0.5">
                PERSONALITY SPECTRUM (TAP TO EXPLORE)
              </div>

              <div className="space-y-1">
                {profile.personality.map((trait, idx) => {
                  const isSelected = activeTrait === trait.id;
                  const renderTraitIcon = (id: string) => {
                    const iconClass = isSelected
                      ? 'text-white dark:text-black shrink-0'
                      : 'text-[#52525B] dark:text-[#A1A1AA] shrink-0';
                    switch (id) {
                      case 'tech':
                        return <Terminal size={12} className={iconClass} />;
                      case 'nerd':
                        return <Code2 size={12} className={iconClass} />;
                      case 'opportunities':
                        return <Briefcase size={12} className={isSelected ? iconClass : 'text-emerald-700 dark:text-emerald-400 shrink-0'} />;
                      case 'spirituality':
                        return <Compass size={12} className={iconClass} />;
                      case 'fashion':
                        return <Layers size={12} className={iconClass} />;
                      case 'modelling':
                        return <Camera size={12} className={iconClass} />;
                      default:
                        return <Terminal size={12} className={iconClass} />;
                    }
                  };

                  return (
                    <button
                      key={trait.id}
                      onClick={() => {
                        playClick();
                        setActiveTrait(isSelected ? null : trait.id);
                      }}
                      onMouseEnter={playHover}
                      className={`w-full p-2 rounded-xl text-left transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-sm'
                          : trait.isHighlight
                          ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-[#09090B] dark:text-white border-emerald-500/30'
                          : 'bg-[#F9F9FB] hover:bg-[#F1F2F5] dark:bg-[#141519] dark:hover:bg-[#1B1D22] text-[#09090B] dark:text-[#EDEDED] border-[#E2E4E8] dark:border-[#22242B]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1.5">
                        <div className="flex items-start gap-2 min-w-0">
                          <span className={`font-mono text-[10px] font-bold shrink-0 mt-0.5 ${
                            isSelected ? 'text-white/70 dark:text-black/70' : 'text-[#71717A] dark:text-[#A1A1AA]'
                          }`}>
                            [{trait.code || String(idx + 1).padStart(2, '0')}]
                          </span>
                          <span className="mt-0.5 shrink-0">{renderTraitIcon(trait.id)}</span>
                          <span className={`text-[11.5px] font-bold leading-snug break-words ${isSelected ? 'text-white dark:text-black' : 'text-[#09090B] dark:text-white'}`}>
                            {trait.title}
                          </span>
                        </div>
                        <span className={`text-[8.5px] sm:text-[9px] font-mono px-1.5 py-0.2 rounded uppercase shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-white/20 text-white dark:bg-black/20 dark:text-black font-bold'
                            : 'text-[#71717A] dark:text-[#A1A1AA]'
                        }`}>
                          {trait.badge}
                        </span>
                      </div>

                      {/* Expandable Trait Detail */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.18 }}
                            className="pt-2 text-[11px] leading-relaxed border-t border-white/20 dark:border-black/20 mt-1.5 font-mono"
                          >
                            <p>{trait.detail}</p>
                            {trait.id === 'opportunities' && (
                              <div className="pt-2">
                                <a
                                  href="#contact"
                                  className="inline-flex items-center gap-1 font-bold underline text-xs"
                                >
                                  <span>View contact channels ↓</span>
                                </a>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="pt-2 border-t border-[#ECEEF2] dark:border-[#1E2026] flex items-center justify-between text-[10px] font-mono text-[#71717A]">
              <span>LOCATION: JALANDHAR, PUNJAB</span>
              <a
                href={profile.links.buyMeAChai}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400 font-semibold hover:underline"
              >
                <Coffee size={11} className="shrink-0" />
                <span>Buy Me a Chai ↗</span>
              </a>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
