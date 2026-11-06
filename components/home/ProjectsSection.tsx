'use client';

import React from 'react';
import { useSound } from '@/hooks/useSound';
import { ArrowUpRight } from 'lucide-react';

interface ProjectsSectionProps {
  onOpenProjectModal: (id: string) => void;
}

interface ProjectCardData {
  id: string;
  title: string;
  categoryLabel: string;
  statusText: string;
  description: string;
  demoUrl?: string;
  githubUrl: string;
  renderPreview: () => React.ReactNode;
}

export default function ProjectsSection({ onOpenProjectModal }: ProjectsSectionProps) {
  const { playClick, playHover } = useSound();

  const featuredProjects: ProjectCardData[] = [
    {
      id: 'PRJ-01',
      title: 'Pairfect',
      categoryLabel: 'Live Platform',
      statusText: 'Live',
      description: 'Real-time consumer social app with Groq-accelerated Llama 3 inference and live state synchronization.',
      demoUrl: 'https://pairfect.site',
      githubUrl: 'https://github.com/SAJAL-MALHOTRA/Pairfect---Your-lovespace',
      renderPreview: () => (
        <div className="w-full h-full bg-[#FAFAFA] dark:bg-[#121316] flex flex-col font-sans select-none overflow-hidden">
          {/* Chrome Header */}
          <div className="h-6 px-2.5 bg-[#F0F1F4] dark:bg-[#1A1B20] border-b border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
              <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
              <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
            </div>
            <div className="px-2 py-0.5 rounded-md bg-white/80 dark:bg-[#121316]/80 border border-[#E4E4E7] dark:border-[#27272A] text-[9.5px] font-mono text-[#71717A] dark:text-[#A1A1AA]">
              pairfect.site
            </div>
            <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              ● 200+ Live
            </span>
          </div>

          {/* App Canvas */}
          <div className="p-2.5 space-y-2 flex-1 bg-gradient-to-b from-[#FFFFFF] to-[#F8F9FA] dark:from-[#141519] dark:to-[#0D0E11] flex flex-col justify-between">
            {/* Conversation Compatibility Card */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-[8px] text-white font-bold">
                  S
                </div>
                <span className="text-[10px] font-semibold text-[#09090B] dark:text-white">Compatibility Radar</span>
                <span className="text-[9px] font-mono text-[#71717A] ml-auto">Groq Llama 3 · &lt;50ms</span>
              </div>
              <div className="p-2 rounded-lg bg-white dark:bg-[#1B1D24] border border-[#E4E4E7] dark:border-[#27272A] shadow-xs text-[10px] text-[#3F3F46] dark:text-[#D4D4D8] leading-tight">
                &ldquo;Shared obsession with high-craft design and low-latency systems.&rdquo;
              </div>
            </div>

            {/* Dyad Resonance Metric */}
            <div className="p-2 rounded-lg bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-900/30 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-[8.5px] font-mono uppercase text-rose-700 dark:text-rose-300 font-bold tracking-wider">
                  DYAD RESONANCE
                </div>
                <div className="text-xs font-bold text-[#09090B] dark:text-white">96.4% Match</div>
              </div>
              <div className="w-20 h-2 bg-rose-200/60 dark:bg-rose-900/40 rounded-full overflow-hidden">
                <div className="w-[96%] h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'PRJ-02',
      title: 'DSA Lecture RAG',
      categoryLabel: 'Video AI',
      statusText: 'Live',
      description: 'Timestamped video retrieval & synthesis engine mapping programming questions directly to exact lecture moments.',
      demoUrl: 'https://striver-dsa-platform.onrender.com',
      githubUrl: 'https://github.com/SAJAL-MALHOTRA/dsa-lecture-rag',
      renderPreview: () => (
        <div className="w-full h-full bg-[#FAFAFA] dark:bg-[#121316] flex flex-col font-sans select-none overflow-hidden">
          <div className="h-6 px-2.5 bg-[#F0F1F4] dark:bg-[#1A1B20] border-b border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
              <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
              <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
            </div>
            <div className="px-2 py-0.5 rounded-md bg-white/80 dark:bg-[#121316]/80 border border-[#E4E4E7] dark:border-[#27272A] text-[9.5px] font-mono text-[#71717A] dark:text-[#A1A1AA] truncate max-w-[170px]">
              striver-dsa-platform.onrender.com
            </div>
            <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400">
              104 Bench
            </span>
          </div>

          <div className="p-2.5 space-y-2 flex-1 bg-gradient-to-b from-[#FFFFFF] to-[#F8F9FA] dark:from-[#141519] dark:to-[#0D0E11] flex flex-col justify-between">
            {/* Mini Video Player Viewport */}
            <div className="relative rounded-lg bg-[#0A0D14] border border-[#252E3E] p-2 flex flex-col justify-between overflow-hidden h-[62px]">
              <div className="flex items-center justify-between z-10 text-[9px] font-mono text-sky-300">
                <span className="font-semibold truncate">Cycle Detection in Directed Graphs</span>
                <span className="px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 font-bold shrink-0">14:22</span>
              </div>
              <div className="space-y-1 z-10">
                <div className="relative w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div className="w-[45%] h-full bg-sky-400 rounded-full" />
                </div>
                <div className="flex justify-between text-[7.5px] font-mono text-neutral-400">
                  <span>00:00</span>
                  <span className="text-sky-400 font-bold">14:22 (Exact Seek Snap)</span>
                  <span>31:40</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-transparent pointer-events-none" />
            </div>

            {/* Extractive Citation Box */}
            <div className="p-1.5 rounded-lg bg-sky-50/70 dark:bg-sky-950/20 border border-sky-200/50 dark:border-sky-900/30 flex items-center justify-between text-[9px]">
              <div className="space-y-0.5 truncate">
                <div className="font-semibold text-[#09090B] dark:text-white truncate">BM25Okapi + Dense MiniLM RRF</div>
                <div className="text-[#71717A] dark:text-[#A1A1AA] text-[8.5px]">0% Hallucination · Extractive Synthesis</div>
              </div>
              <span className="text-sky-600 dark:text-sky-400 font-mono font-bold shrink-0 ml-1">&lt;50ms</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'PRJ-03',
      title: 'Cybernauts Arena',
      categoryLabel: 'Esports Engine',
      statusText: 'Live',
      description: 'Broadcast-grade esports tournament platform orchestrating 16 simultaneous physical table duels with zero clock drift.',
      githubUrl: 'https://github.com/SAJAL-MALHOTRA/cybernauts-arena',
      renderPreview: () => (
        <div className="w-full h-full bg-[#FAFAFA] dark:bg-[#121316] flex flex-col font-sans select-none overflow-hidden">
          <div className="h-6 px-2.5 bg-[#F0F1F4] dark:bg-[#1A1B20] border-b border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
              <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
              <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
            </div>
            <div className="px-2 py-0.5 rounded-md bg-white/80 dark:bg-[#121316]/80 border border-[#E4E4E7] dark:border-[#27272A] text-[9.5px] font-mono text-[#71717A] dark:text-[#A1A1AA] truncate max-w-[170px]">
              Cybernauts Arena (Ro16)
            </div>
            <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              ● 0ms Drift
            </span>
          </div>

          <div className="p-2.5 space-y-2 flex-1 bg-gradient-to-b from-[#FFFFFF] to-[#F8F9FA] dark:from-[#141519] dark:to-[#0D0E11] flex flex-col justify-between">
            {/* Live Duel Matchup */}
            <div className="p-2 rounded-lg bg-white dark:bg-[#171A21] border border-[#E4E4E7] dark:border-[#262C38] shadow-xs space-y-1.5">
              <div className="flex items-center justify-between text-[9px] font-mono">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase">TABLE 01 // RO16 DUEL</span>
                <span className="text-[#09090B] dark:text-white font-bold">04:18.42</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-[9px]">
                <div className="p-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                  <div className="text-[7.5px] font-mono uppercase">TEAM CYBER</div>
                  <div className="font-bold">450 PTS [WIN]</div>
                </div>
                <div className="p-1 rounded bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/50 text-[#52525B] dark:text-[#A1A1AA]">
                  <div className="text-[7.5px] font-mono uppercase">TEAM BYTE</div>
                  <div className="font-bold">390 PTS</div>
                </div>
              </div>
            </div>

            {/* Hardware Telemetry Bar */}
            <div className="p-1.5 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30 flex items-center justify-between text-[9px]">
              <span className="text-emerald-900 dark:text-emerald-200 font-medium truncate">16 Physical Desks Synchronized</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold shrink-0 ml-1">2.5s BUFFER</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'PRJ-05',
      title: 'Surveillance Vision',
      categoryLabel: 'Computer Vision',
      statusText: 'Top 7%',
      description: 'Leaderboard champion deep CNN ensemble (ResNet-34, EfficientNet) predicting illumination under extreme light variance.',
      githubUrl: 'https://github.com/SAJAL-MALHOTRA/surveillance-illumination-classification',
      renderPreview: () => (
        <div className="w-full h-full bg-[#FAFAFA] dark:bg-[#121316] flex flex-col font-sans select-none overflow-hidden">
          <div className="h-6 px-2.5 bg-[#F0F1F4] dark:bg-[#1A1B20] border-b border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
              <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
              <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
            </div>
            <div className="px-2 py-0.5 rounded-md bg-white/80 dark:bg-[#121316]/80 border border-[#E4E4E7] dark:border-[#27272A] text-[9.5px] font-mono text-[#71717A] dark:text-[#A1A1AA] truncate max-w-[170px]">
              National CV Challenge
            </div>
            <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
              #16 of 227
            </span>
          </div>

          <div className="p-2.5 space-y-2 flex-1 bg-gradient-to-b from-[#FFFFFF] to-[#F8F9FA] dark:from-[#141519] dark:to-[#0D0E11] flex flex-col justify-between">
            {/* Vision Reticle Display */}
            <div className="relative rounded-lg bg-[#0C0E14] border border-[#272C38] p-2 flex flex-col justify-between overflow-hidden h-[62px]">
              <div className="flex items-center justify-between z-10 text-[8.5px] font-mono text-amber-300">
                <span>CAM-04 // ALBEDO REFLECTION</span>
                <span className="text-emerald-400 font-bold">CONF: 98.4%</span>
              </div>
              <div className="z-10 flex items-center justify-between text-[8px] font-mono text-neutral-400">
                <span>128-D Luminance Grid</span>
                <span className="text-amber-400 font-bold">CLASS: NORMAL</span>
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_45%,rgba(245,158,11,0.08)_50%,transparent_55%)] bg-[length:100%_8px] pointer-events-none" />
            </div>

            {/* Leaderboard Recognition Bar */}
            <div className="p-1.5 rounded-lg bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30 flex items-center justify-between text-[9px]">
              <div className="space-y-0.5 truncate">
                <div className="font-semibold text-[#09090B] dark:text-white truncate">ResNet-34 + EfficientNet-B0</div>
                <div className="text-[#71717A] dark:text-[#A1A1AA] text-[8.5px]">10-Fold Bagged FastMLP on CPU</div>
              </div>
              <span className="text-amber-600 dark:text-amber-400 font-mono font-bold shrink-0 ml-1">0.211 SCORE</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="projects" className="w-full py-8 text-left select-none space-y-4">
      
      {/* ── TOP SECTION TITLE & DASHED DIVIDER ── */}
      <div className="max-w-[690px] mx-auto w-full px-3 sm:px-0 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold font-sans tracking-tight text-[#09090B] dark:text-white">
            Projects
          </h2>
          <span className="text-[11px] font-mono text-[#71717A] dark:text-[#A1A1AA] tracking-wider uppercase">
            04 Flagship Systems
          </span>
        </div>

        {/* Dashed Horizontal Line */}
        <div
          className="w-full h-px opacity-70"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to right, var(--border-color) 0px, var(--border-color) 6px, transparent 6px, transparent 14px)',
            backgroundSize: '100% 1px',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </div>

      {/* ── 2x2 PROJECT GRID WITH SURROUNDING & CROSS DASHED BORDERS (RINKIT EXACT SPEC) ── */}
      <div
        className="max-w-[690px] mx-auto w-full relative"
        style={{
          backgroundImage: `
            repeating-linear-gradient(to bottom, var(--border-color) 0px, var(--border-color) 6px, transparent 6px, transparent 14px),
            repeating-linear-gradient(to bottom, var(--border-color) 0px, var(--border-color) 6px, transparent 6px, transparent 14px)
          `,
          backgroundSize: '1px 100%, 1px 100%',
          backgroundPosition: 'left top, right top',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Horizontal Center Dashed Line */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-0 hidden sm:block pointer-events-none">
          <div
            className="w-full h-px opacity-70"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to right, var(--border-color) 0px, var(--border-color) 6px, transparent 6px, transparent 14px)',
              backgroundSize: '100% 1px',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>

        {/* Vertical Center Dashed Line */}
        <div className="absolute left-1/2 top-0 h-full -translate-x-1/2 z-0 hidden sm:block pointer-events-none">
          <div
            className="h-full w-px opacity-70"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, var(--border-color) 0px, var(--border-color) 6px, transparent 6px, transparent 14px)',
              backgroundSize: '1px 100%',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>

        {/* Grid Cells */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-0 z-10">
          {featuredProjects.map((project) => (
            <div key={project.id} className="p-3">
              <div
                onClick={() => {
                  playClick();
                  onOpenProjectModal(project.id);
                }}
                onMouseEnter={playHover}
                className="flex flex-col gap-2.5 cursor-pointer group w-full"
              >
                {/* 1. Outer Preview Frame */}
                <div className="p-[4px] rounded-[10px] border border-[#E4E4E7] dark:border-[#27272A] bg-transparent group-hover:border-black/30 dark:group-hover:border-white/30 transition-colors">
                  <div className="relative w-full bg-[#F4F4F5] dark:bg-[#121316] rounded-[6px] border border-[#E4E4E7] dark:border-[#27272A] h-[195px] sm:h-[180px] md:h-[205px] overflow-hidden select-none">
                    
                    {/* Top-Left Category Label (Animated slide on hover matching Rinkit) */}
                    <span className="absolute top-2 left-2 text-xs font-sans text-[#71717A] dark:text-[#A1A1AA] group-hover:text-black dark:group-hover:text-white font-medium transition-all duration-300 group-hover:left-1/2 group-hover:-translate-x-1/2 select-none z-20">
                      {project.categoryLabel}
                    </span>

                    {/* Top-Right Pin / Link Icon */}
                    <div className="absolute top-2 right-2 p-1.5 rounded-[8px] border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#18181B] text-[#71717A] dark:text-[#A1A1AA] group-hover:text-black dark:group-hover:text-white transition-colors z-20 shadow-xs">
                      <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>

                    {/* Mock Window Preview Rising from Bottom */}
                    <div className="bg-white dark:bg-[#18181B] rounded-t-[6px] absolute bottom-0 left-1/2 -translate-x-1/2 w-[84%] h-[78%] group-hover:h-[84%] transition-all duration-300 p-[2px] pb-0 shadow-md border border-b-0 border-[#E4E4E7] dark:border-[#27272A] overflow-hidden">
                      <div className="w-full h-full rounded-t-[4px] overflow-hidden">
                        {project.renderPreview()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Project Info Beneath Preview (Sans-Serif Editorial Standard) */}
                <div className="px-1.5 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[17px] font-sans font-bold leading-tight text-[#09090B] dark:text-white tracking-tight">
                      {project.title}
                    </h3>
                    
                    {/* Live indicator dot */}
                    <div className="flex items-center gap-1.5 select-none font-sans">
                      <div className="relative flex items-center justify-center">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping bg-emerald-500 rounded-full w-2 h-2 opacity-50" />
                        <div className="relative z-10 w-2 h-2 rounded-full bg-emerald-500" />
                      </div>
                      <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] font-medium font-sans">
                        {project.statusText}
                      </p>
                    </div>
                  </div>

                  {/* 1 crisp sentence description (Natural line height, no premature clipping) */}
                  <p className="text-[13px] font-sans font-normal text-[#52525B] dark:text-[#A1A1AA] line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* View Project link with rotating arrow on hover */}
                  <div className="flex items-center gap-1 text-xs font-semibold font-sans text-[#09090B] dark:text-white pt-0.5">
                    <span className="group-hover:underline">View Project</span>
                    <ArrowUpRight
                      size={13}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM DASHED LINE ── */}
      <div className="max-w-[690px] mx-auto w-full px-3 sm:px-0">
        <div
          className="w-full h-px opacity-70"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to right, var(--border-color) 0px, var(--border-color) 6px, transparent 6px, transparent 14px)',
            backgroundSize: '100% 1px',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </div>

    </section>
  );
}
