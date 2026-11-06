'use client';

import React from 'react';
import { useSound } from '@/hooks/useSound';
import { ArrowUpRight } from 'lucide-react';

interface ProjectsSectionProps {
  onOpenProjectModal: (id: string) => void;
}

interface ProjectCardData {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  categoryLabel: string;
  statusText: string;
  description: string;
  stackTags: string[];
  demoUrl?: string;
  githubUrl: string;
  renderPreview: () => React.ReactNode;
}

export default function ProjectsSection({ onOpenProjectModal }: ProjectsSectionProps) {
  const { playClick, playHover } = useSound();

  const featuredProjects: ProjectCardData[] = [
    {
      id: 'PRJ-01',
      index: '01',
      title: 'PAIRFECT',
      subtitle: 'Private Relationship Platform',
      categoryLabel: 'Consumer Product',
      statusText: 'Campus Pilot',
      description: 'A private relationship platform built around shared memories, rituals and connection with live state synchronization.',
      stackTags: ['NEXT.JS', 'SUPABASE', 'REALTIME', 'GROQ LLAMA 3'],
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
            <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              ● 200+ Pilot Users
            </span>
          </div>

          {/* App Canvas */}
          <div className="p-2.5 space-y-2 flex-1 bg-gradient-to-b from-[#FFFFFF] to-[#F8F9FA] dark:from-[#141519] dark:to-[#0D0E11] flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-[8px] text-white font-bold">
                  P
                </div>
                <span className="text-[10px] font-semibold text-[#09090B] dark:text-white">Shared Love Space</span>
                <span className="text-[9px] font-mono text-[#71717A] ml-auto">Measured &lt;50ms API</span>
              </div>
              <div className="p-2 rounded-lg bg-white dark:bg-[#1B1D24] border border-[#E4E4E7] dark:border-[#27272A] shadow-2xs text-[10px] text-[#3F3F46] dark:text-[#D4D4D8] leading-tight">
                &ldquo;Private rituals, mutual milestones, and low-latency state sync.&rdquo;
              </div>
            </div>

            <div className="p-2 rounded-lg bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-900/30 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-[8.5px] font-mono uppercase text-rose-700 dark:text-rose-300 font-bold tracking-wider">
                  REALTIME SYNCHRONIZATION
                </div>
                <div className="text-xs font-bold text-[#09090B] dark:text-white">Supabase WebSockets</div>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-700 dark:text-rose-300 font-bold">
                RLS Guarded
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'PRJ-03',
      index: '02',
      title: 'CYBERNAUTS ARENA',
      subtitle: 'Tournament & Broadcast Engine',
      categoryLabel: 'Event Infrastructure',
      statusText: 'NITJ Production',
      description: 'A tournament and broadcast engine for competitive events, synchronizing physical duel tables with 4K arena projection.',
      stackTags: ['REALTIME', 'EVENT SYSTEMS', 'EXPRESS', 'WEB AUDIO'],
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
            <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              ● 16-Team Sync
            </span>
          </div>

          <div className="p-2.5 space-y-2 flex-1 bg-gradient-to-b from-[#FFFFFF] to-[#F8F9FA] dark:from-[#141519] dark:to-[#0D0E11] flex flex-col justify-between">
            <div className="p-2 rounded-lg bg-white dark:bg-[#171A21] border border-[#E4E4E7] dark:border-[#262C38] shadow-2xs space-y-1.5">
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

            <div className="p-1.5 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30 flex items-center justify-between text-[9px]">
              <span className="text-emerald-900 dark:text-emerald-200 font-medium truncate">Authoritative Epoch Clock</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold shrink-0 ml-1">2.5s BUFFER</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'PRJ-02',
      index: '03',
      title: 'DSA LECTURE RAG',
      subtitle: 'Lecture-Grounded Retrieval',
      categoryLabel: 'Video AI & Retrieval',
      statusText: '104 Benchmark',
      description: 'Lecture-grounded retrieval connecting student programming questions directly to verified conceptual explanations and exact timestamps.',
      stackTags: ['BM25', 'DENSE RETRIEVAL', 'RRF', 'FASTAPI'],
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
            <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400">
              104 Benchmark
            </span>
          </div>

          <div className="p-2.5 space-y-2 flex-1 bg-gradient-to-b from-[#FFFFFF] to-[#F8F9FA] dark:from-[#141519] dark:to-[#0D0E11] flex flex-col justify-between">
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

            <div className="p-1.5 rounded-lg bg-sky-50/70 dark:bg-sky-950/20 border border-sky-200/50 dark:border-sky-900/30 flex items-center justify-between text-[9px]">
              <div className="space-y-0.5 truncate">
                <div className="font-semibold text-[#09090B] dark:text-white truncate">BM25Okapi + Dense MiniLM RRF</div>
                <div className="text-[#71717A] dark:text-[#A1A1AA] text-[8.5px]">0% Hallucination · Extractive Citations</div>
              </div>
              <span className="text-sky-600 dark:text-sky-400 font-mono font-bold shrink-0 ml-1">&lt;50ms</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'PRJ-05',
      index: '04',
      title: 'NATIONAL CV CHALLENGE',
      subtitle: 'Surveillance Illumination Classifier',
      categoryLabel: 'Computer Vision',
      statusText: 'Top 7% Leaderboard',
      description: 'An ensemble-based computer vision competition submission achieving Top 7% (#16/227) on erratic surveillance illumination.',
      stackTags: ['RESNET-34', 'EFFICIENTNET-B0', 'FASTMLP', 'PYTORCH'],
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
            <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
              #16 / 227
            </span>
          </div>

          <div className="p-2.5 space-y-2 flex-1 bg-gradient-to-b from-[#FFFFFF] to-[#F8F9FA] dark:from-[#141519] dark:to-[#0D0E11] flex flex-col justify-between">
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
    <section id="projects" className="w-full max-w-[780px] mx-auto py-8 text-left select-none space-y-6">
      
      {/* ── TOP SECTION TITLE & ARCHITECTURAL HEADER ── */}
      <div className="w-full space-y-3">
        <div className="flex items-end justify-between border-b border-[#E2E4E8] dark:border-[#22242B] pb-3">
          <div>
            <div className="text-[9.5px] font-mono text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-widest">
              03 // THE EVIDENCE · SHIPPED SYSTEMS
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-sans tracking-tight text-[#09090B] dark:text-white pt-1">
              Selected systems.
            </h2>
          </div>
          <span className="text-[11px] font-mono text-[#71717A] dark:text-[#A1A1AA] tracking-wider uppercase">
            04 PROJECTS / INDEX
          </span>
        </div>
      </div>

      {/* ── 2x2 ARCHITECTURAL PROJECT INDEX WITH THIN DIVIDERS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {featuredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => {
              playClick();
              onOpenProjectModal(project.id);
            }}
            onMouseEnter={playHover}
            className="p-4 rounded-xl bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] hover:border-black/30 dark:hover:border-white/30 transition-all cursor-pointer group flex flex-col justify-between shadow-2xs space-y-3.5"
          >
            {/* Top Index & Status Line */}
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#71717A] dark:text-[#A1A1AA]">
                [{project.index}]
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[10.5px] text-[#71717A] dark:text-[#A1A1AA]">
                  {project.statusText}
                </span>
              </div>
            </div>

            {/* Interactive Preview Window Frame */}
            <div className="relative w-full rounded-lg border border-[#E2E4E8] dark:border-[#22242B] bg-[#F4F4F5] dark:bg-[#141519] h-[175px] sm:h-[185px] overflow-hidden select-none">
              {project.renderPreview()}

              {/* Pin Indicator */}
              <div className="absolute top-2 right-2 p-1.5 rounded-md border border-[#E2E4E8] dark:border-[#27272A] bg-white dark:bg-[#18181B] text-[#71717A] dark:text-[#A1A1AA] group-hover:text-black dark:group-hover:text-white transition-colors z-20 shadow-2xs">
                <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>

            {/* Project Editorial Metadata */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold font-sans tracking-tight text-[#09090B] dark:text-white group-hover:underline">
                  {project.title}
                </h3>
                <span className="text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA]">
                  {project.categoryLabel}
                </span>
              </div>

              <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] font-sans leading-relaxed line-clamp-2">
                {project.description}
              </p>

              {/* Architectural Stack Tags */}
              <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-[#ECEEF2] dark:border-white/5 text-[9.5px] font-mono text-[#71717A] dark:text-[#A1A1AA]">
                {project.stackTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5 font-semibold text-[#09090B] dark:text-[#EDEDED]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
