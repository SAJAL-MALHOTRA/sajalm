'use client';

import { useState, useMemo } from 'react';
import { projects, Project } from '@/data/projects';
import { useSound } from '@/hooks/useSound';
import { ExternalLink, Code2, Layers, ArrowUpRight, Terminal } from 'lucide-react';

interface ProjectsSectionProps {
  onOpenProjectModal: (id: string) => void;
}

export default function ProjectsSection({ onOpenProjectModal }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<'ALL' | 'AI_ML' | 'REALTIME' | 'CV'>('ALL');
  const { playClick, playHover } = useSound();

  const aiMlCount = useMemo(
    () => projects.filter((p) => p.id === 'PRJ-02' || p.id === 'PRJ-04' || p.id === 'PRJ-07' || p.id === 'PRJ-08').length,
    []
  );
  const realtimeCount = useMemo(
    () => projects.filter((p) => p.id === 'PRJ-01' || p.id === 'PRJ-03').length,
    []
  );
  const cvCount = useMemo(
    () => projects.filter((p) => p.id === 'PRJ-05' || p.id === 'PRJ-06').length,
    []
  );

  const filteredProjects = projects.filter((p) => {
    if (filter === 'ALL') return true;
    if (filter === 'AI_ML') {
      return (
        p.id === 'PRJ-02' ||
        p.id === 'PRJ-04' ||
        p.id === 'PRJ-07' ||
        p.id === 'PRJ-08'
      );
    }
    if (filter === 'REALTIME') {
      return p.id === 'PRJ-01' || p.id === 'PRJ-03';
    }
    if (filter === 'CV') {
      return p.id === 'PRJ-05' || p.id === 'PRJ-06';
    }
    return true;
  });

  return (
    <section id="projects" className="w-full max-w-5xl py-8 space-y-6 text-left select-none">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E2E4E8] dark:border-[#22242A] pb-3 gap-3">
        <div className="space-y-1">
          <div className="text-[9.5px] font-mono text-[#71717A] uppercase tracking-widest">
            01 // SHIPPED SYSTEMS · {String(projects.length).padStart(2, '0')} PRODUCTION BUILDS
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-[#09090B] dark:text-white tracking-tight flex items-center gap-2">
            <span>Shipped Technical Systems</span>
            <Code2 size={18} className="text-[#09090B] dark:text-white" />
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="w-full sm:w-auto flex items-center gap-1 p-1 rounded-xl bg-[#ECEEF2] dark:bg-[#16171B] border border-[#D1D5DB] dark:border-[#27272A] text-xs font-mono overflow-x-auto no-scrollbar">
          {[
            { id: 'ALL', label: `ALL (${projects.length})` },
            { id: 'AI_ML', label: `AI & ML (${aiMlCount})` },
            { id: 'REALTIME', label: `REAL-TIME (${realtimeCount})` },
            { id: 'CV', label: `VISION (${cvCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playClick();
                setFilter(tab.id as any);
              }}
              onMouseEnter={playHover}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer text-[11px] whitespace-nowrap shrink-0 ${
                filter === tab.id
                  ? 'bg-black text-white dark:bg-white dark:text-black font-bold shadow-xs'
                  : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── PROJECTS GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] hover:border-black/40 dark:hover:border-white/40 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
          >
            {/* Top Spec Strip */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-1.5 text-xs font-mono">
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-bold text-[#09090B] dark:text-white">#{proj.id}</span>
                  <span className="text-[#A1A1AA]">•</span>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    ● {proj.status}
                  </span>
                </div>

                <span className="px-2 py-0.5 rounded bg-black text-white dark:bg-[#1C1D22] dark:text-[#EDEDED] text-[9.5px] font-mono font-bold border border-black dark:border-white/10 max-w-full">
                  {proj.metric}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-xl font-black font-sans text-[#09090B] dark:text-white tracking-tight">
                  {proj.name}
                </h3>
                {proj.subtitle && (
                  <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] font-mono pt-0.5">
                    {proj.subtitle}
                  </p>
                )}
              </div>

              {/* Description & Key Bullets */}
              <p className="text-xs text-[#3F3F46] dark:text-[#D4D4D8] leading-relaxed font-sans">
                {proj.description}
              </p>

              {proj.bullets && proj.bullets.length > 0 && (
                <div className="space-y-1 pt-1 text-[11px] text-[#52525B] dark:text-[#A1A1AA] font-mono">
                  <div className="flex items-start gap-1.5 leading-snug">
                    <span className="text-black dark:text-white font-bold">&gt;</span>
                    <span>{proj.bullets[0]}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Stack Badges & Actions */}
            <div className="space-y-3 pt-3 border-t border-[#ECEEF2] dark:border-white/10">
              {/* Stack Pills */}
              <div className="flex flex-wrap gap-1">
                {proj.stack.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded bg-[#F4F4F6] dark:bg-[#18191E] border border-[#E2E4E8] dark:border-[#27272A] text-[#09090B] dark:text-[#D4D4D8] text-[10px] font-mono font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2 pt-1 font-mono text-xs">
                <div className="flex items-center gap-1.5 flex-1 min-w-0">
                  {proj.demo && (
                    <a
                      href={proj.demo}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={playHover}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-black hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black font-bold text-[11px] transition-all shadow-xs"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={11} />
                    </a>
                  )}

                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={playHover}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#F4F4F6] text-[#09090B] dark:bg-[#16171B] dark:hover:bg-[#202227] dark:text-white border border-[#D1D5DB] dark:border-[#2B2D35] font-medium text-[11px] transition-all"
                    >
                      <Code2 size={11} className="text-[#71717A] dark:text-[#A1A1AA]" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => {
                    playClick();
                    onOpenProjectModal(proj.id);
                  }}
                  onMouseEnter={playHover}
                  className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#F4F4F6] hover:bg-[#EAECEF] text-[#09090B] dark:bg-[#18191E] dark:hover:bg-[#24262E] dark:text-white border border-[#D1D5DB] dark:border-[#2B2D35] text-[11px] font-medium transition-all cursor-pointer shrink-0"
                >
                  <span>Spec</span>
                  <ArrowUpRight size={12} />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
