'use client';

import React from 'react';
import { useSound } from '@/hooks/useSound';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

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
  colorTheme: string;
  renderPreview: (isDark?: boolean) => React.ReactNode;
}

export default function ProjectsSection({ onOpenProjectModal }: ProjectsSectionProps) {
  const { playClick, playHover } = useSound();

  const featuredProjects: ProjectCardData[] = [
    {
      id: 'PRJ-01',
      title: 'Pairfect',
      categoryLabel: 'Screenshots',
      statusText: 'Live',
      description: 'Real-time consumer social app with Groq-accelerated Llama 3 inference and live state synchronization.',
      demoUrl: 'https://pairfect.site',
      githubUrl: 'https://github.com/SAJAL-MALHOTRA/Pairfect---Your-lovespace',
      colorTheme: 'rose',
      renderPreview: () => (
        <div className="w-full h-full bg-[#FAFAFA] dark:bg-[#141519] flex flex-col font-mono text-[10px] select-none">
          {/* Mock Browser Header */}
          <div className="h-5 px-2 bg-[#F0F0F2] dark:bg-[#1C1D22] border-b border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <span className="text-[9px] text-[#71717A] dark:text-[#A1A1AA] truncate px-1">pairfect.site</span>
            <span className="text-[8px] px-1 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold">200+ USERS</span>
          </div>
          {/* Mock UI Body */}
          <div className="p-2 space-y-1.5 flex-1 overflow-hidden bg-gradient-to-b from-[#FFFFFF] to-[#F4F4F6] dark:from-[#141519] dark:to-[#0E0F12]">
            <div className="p-1.5 rounded bg-white dark:bg-[#1A1C23] border border-[#E4E4E7] dark:border-[#2A2D38] shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="font-semibold text-[#09090B] dark:text-white text-[10px]">Groq Llama 3</span>
              </div>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[9px] font-bold">&lt;50ms</span>
            </div>
            <div className="p-1.5 rounded bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-900/30 text-[9px] text-rose-900 dark:text-rose-200">
              ⚡ Live WebSockets · 77 Routes Synced
            </div>
            <div className="flex items-center gap-1 pt-0.5">
              <div className="h-1.5 flex-1 rounded-full bg-[#E4E4E7] dark:bg-[#27272A] overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full w-[88%]" />
              </div>
              <span className="text-[8px] text-[#71717A] dark:text-[#A1A1AA]">94% Match</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'PRJ-02',
      title: 'DSA Lecture RAG',
      categoryLabel: 'Dashboard',
      statusText: 'Live',
      description: 'Timestamped video retrieval & synthesis engine mapping programming questions directly to exact lecture moments.',
      demoUrl: 'https://striver-dsa-platform.onrender.com',
      githubUrl: 'https://github.com/SAJAL-MALHOTRA/dsa-lecture-rag',
      colorTheme: 'sky',
      renderPreview: () => (
        <div className="w-full h-full bg-[#FAFAFA] dark:bg-[#141519] flex flex-col font-mono text-[10px] select-none">
          <div className="h-5 px-2 bg-[#F0F0F2] dark:bg-[#1C1D22] border-b border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <span className="text-[9px] text-[#71717A] dark:text-[#A1A1AA] truncate px-1">video-rag.ai</span>
            <span className="text-[8px] px-1 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold">104 BENCH</span>
          </div>
          <div className="p-2 space-y-1.5 flex-1 overflow-hidden bg-gradient-to-b from-[#FFFFFF] to-[#F4F4F6] dark:from-[#141519] dark:to-[#0E0F12]">
            <div className="p-1.5 rounded bg-white dark:bg-[#181C26] border border-[#E4E4E7] dark:border-[#252E3E] shadow-xs space-y-1">
              <div className="flex items-center justify-between text-[9px]">
                <span className="text-[#09090B] dark:text-white font-medium">Detect Cycle (BFS)</span>
                <span className="text-sky-600 dark:text-sky-400 font-bold">14:22 ⏱</span>
              </div>
              <div className="w-full h-1 bg-[#E4E4E7] dark:bg-[#27272A] rounded-full overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full w-[45%]" />
              </div>
            </div>
            <div className="p-1.5 rounded bg-sky-50/70 dark:bg-sky-950/20 border border-sky-200/50 dark:border-sky-900/30 text-[9px] text-sky-900 dark:text-sky-200 flex items-center justify-between">
              <span>Dense RRF Rank Fusion</span>
              <span className="font-bold">0% Halluc</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'PRJ-03',
      title: 'Cybernauts Arena',
      categoryLabel: 'Screenshots',
      statusText: 'Live',
      description: 'Broadcast-grade esports tournament platform orchestrating 16 simultaneous physical table duels with zero clock drift.',
      githubUrl: 'https://github.com/SAJAL-MALHOTRA/cybernauts-arena',
      colorTheme: 'emerald',
      renderPreview: () => (
        <div className="w-full h-full bg-[#FAFAFA] dark:bg-[#141519] flex flex-col font-mono text-[10px] select-none">
          <div className="h-5 px-2 bg-[#F0F0F2] dark:bg-[#1C1D22] border-b border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            </div>
            <span className="text-[9px] text-[#71717A] dark:text-[#A1A1AA] truncate px-1">arena-console.sys</span>
            <span className="text-[8px] px-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">0ms DRIFT</span>
          </div>
          <div className="p-2 space-y-1.5 flex-1 overflow-hidden bg-gradient-to-b from-[#FFFFFF] to-[#F4F4F6] dark:from-[#141519] dark:to-[#0E0F12]">
            <div className="grid grid-cols-2 gap-1 text-[8.5px]">
              <div className="p-1 rounded bg-white dark:bg-[#18221D] border border-[#E4E4E7] dark:border-[#23352A]">
                <div className="text-[#71717A] dark:text-[#A1A1AA]">STAGE</div>
                <div className="font-bold text-emerald-600 dark:text-emerald-400">FINALS</div>
              </div>
              <div className="p-1 rounded bg-white dark:bg-[#18221D] border border-[#E4E4E7] dark:border-[#23352A]">
                <div className="text-[#71717A] dark:text-[#A1A1AA]">TABLES</div>
                <div className="font-bold text-[#09090B] dark:text-white">16 ACTIVE</div>
              </div>
            </div>
            <div className="p-1.5 rounded bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30 text-[9px] text-emerald-900 dark:text-emerald-200">
              🔊 Web Audio Synthesizer + 4K Projector
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'PRJ-05',
      title: 'Surveillance Vision',
      categoryLabel: 'User Profile',
      statusText: 'Top 7%',
      description: 'Leaderboard champion deep CNN ensemble (ResNet-34, EfficientNet) predicting illumination under extreme light variance.',
      githubUrl: 'https://github.com/SAJAL-MALHOTRA/surveillance-illumination-classification',
      colorTheme: 'amber',
      renderPreview: () => (
        <div className="w-full h-full bg-[#FAFAFA] dark:bg-[#141519] flex flex-col font-mono text-[10px] select-none">
          <div className="h-5 px-2 bg-[#F0F0F2] dark:bg-[#1C1D22] border-b border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <span className="text-[9px] text-[#71717A] dark:text-[#A1A1AA] truncate px-1">cv-ensemble.py</span>
            <span className="text-[8px] px-1 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">#16 / 227</span>
          </div>
          <div className="p-2 space-y-1.5 flex-1 overflow-hidden bg-gradient-to-b from-[#FFFFFF] to-[#F4F4F6] dark:from-[#141519] dark:to-[#0E0F12]">
            <div className="p-1.5 rounded bg-white dark:bg-[#221E17] border border-[#E4E4E7] dark:border-[#383023] shadow-xs flex items-center justify-between">
              <div>
                <div className="text-[9px] font-bold text-[#09090B] dark:text-white">ResNet-34 + EfficientNet</div>
                <div className="text-[8px] text-[#71717A] dark:text-[#A1A1AA]">10-Fold Bagged FastMLP</div>
              </div>
              <span className="text-amber-600 dark:text-amber-400 font-bold text-[10px]">0.21 Score</span>
            </div>
            <div className="p-1.5 rounded bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30 text-[9px] text-amber-900 dark:text-amber-200">
              🏆 National CV Challenge &quot;Best Solution&quot;
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
          <h2 className="text-base sm:text-lg font-bold tracking-tight text-[#09090B] dark:text-white">
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
                className="flex flex-col gap-2 cursor-pointer group w-full"
              >
                {/* 1. Outer Preview Frame */}
                <div className="p-[4px] rounded-[10px] border border-[#E4E4E7] dark:border-[#27272A] bg-transparent group-hover:border-black/30 dark:group-hover:border-white/30 transition-colors">
                  <div className="relative w-full bg-[#F4F4F5] dark:bg-[#121316] rounded-[6px] border border-[#E4E4E7] dark:border-[#27272A] h-[190px] sm:h-[175px] md:h-[200px] overflow-hidden select-none">
                    
                    {/* Top-Left Category Label (Animated slide on hover matching Rinkit) */}
                    <span className="absolute top-2 left-2 text-xs text-[#71717A] dark:text-[#A1A1AA] group-hover:text-black dark:group-hover:text-white font-medium transition-all duration-300 group-hover:left-1/2 group-hover:-translate-x-1/2 select-none z-20">
                      {project.categoryLabel}
                    </span>

                    {/* Top-Right Pin / Link Icon */}
                    <div className="absolute top-2 right-2 p-1.5 rounded-[8px] border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#18181B] text-[#71717A] dark:text-[#A1A1AA] group-hover:text-black dark:group-hover:text-white transition-colors z-20 shadow-xs">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="12" width="12">
                        <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a6 6 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707s.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a6 6 0 0 1 1.013.16l3.134-3.133a3 3 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146m.122 2.112v-.002z" />
                      </svg>
                    </div>

                    {/* Mock Window Preview Rising from Bottom */}
                    <div className="bg-white dark:bg-[#18181B] rounded-t-[6px] absolute bottom-0 left-1/2 -translate-x-1/2 w-[82%] h-[76%] group-hover:h-[82%] transition-all duration-300 p-[2px] pb-0 shadow-md border border-b-0 border-[#E4E4E7] dark:border-[#27272A] overflow-hidden">
                      <div className="w-full h-full rounded-t-[4px] overflow-hidden">
                        {project.renderPreview()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Project Info Beneath Preview */}
                <div className="px-1 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[1.08rem] leading-tight text-[#09090B] dark:text-white font-bold tracking-tight">
                      {project.title}
                    </h3>
                    
                    {/* Live indicator dot */}
                    <div className="flex items-center gap-1 select-none">
                      <div className="relative flex items-center justify-center">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping bg-emerald-500 rounded-full w-2 h-2 opacity-50" />
                        <div className="relative z-10 w-2 h-2 rounded-full bg-emerald-500" />
                      </div>
                      <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] font-medium">
                        {project.statusText}
                      </p>
                    </div>
                  </div>

                  {/* 1 crisp sentence description */}
                  <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* View Project link with rotating arrow on hover */}
                  <div className="flex items-center gap-1 text-xs font-medium text-[#09090B] dark:text-white pt-1">
                    <span>View Project</span>
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
