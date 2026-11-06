'use client';

import { useState, useMemo } from 'react';
import { projects, Project } from '@/data/projects';
import { useSound } from '@/hooks/useSound';
import { ExternalLink, Code2, ArrowUpRight } from 'lucide-react';
import ProjectVisualBanner from '@/components/ui/ProjectVisualBanner';

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
    <section id="projects" className="w-full max-w-5xl py-10 space-y-8 text-left select-none">
      
      {/* ── SECTION HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E2E4E8] dark:border-[#22242A] pb-4 gap-4">
        <div className="space-y-1.5">
          <div className="text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-widest flex items-center gap-2">
            <span>01 // SHIPPED SYSTEMS</span>
            <span>•</span>
            <span>{String(projects.length).padStart(2, '0')} PRODUCTION BUILDS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-[#09090B] dark:text-white tracking-tight flex items-center gap-2">
            <span>Engineering Showcase &amp; Systems</span>
            <Code2 size={20} className="text-[#09090B] dark:text-white" />
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
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer text-[11px] font-medium whitespace-nowrap shrink-0 ${
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

      {/* ── CINEMATIC PROJECTS GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="group rounded-2xl bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] hover:border-black/50 dark:hover:border-white/50 shadow-sm hover:shadow-xl transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between space-y-5"
          >
            {/* 1. Cinematic Visual Banner Canvas */}
            <div className="space-y-4">
              <ProjectVisualBanner id={proj.id} name={proj.name} metric={proj.metric} />

              {/* Spec & Metrics Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#09090B] dark:text-white">#{proj.id}</span>
                  <span className="text-[#A1A1AA]">•</span>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    ● {proj.status}
                  </span>
                </div>

                <span className="px-2.5 py-0.5 rounded bg-black text-white dark:bg-[#1C1D22] dark:text-[#EDEDED] text-[10px] font-mono font-bold border border-black dark:border-white/10">
                  {proj.metric}
                </span>
              </div>

              {/* Title & Category Subtitle */}
              <div>
                <h3 className="text-xl sm:text-2xl font-black font-sans text-[#09090B] dark:text-white tracking-tight group-hover:text-black dark:group-hover:text-white transition-colors">
                  {proj.name}
                </h3>
                {proj.subtitle && (
                  <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] font-mono pt-1">
                    {proj.subtitle}
                  </p>
                )}
              </div>

              {/* High-Conviction Description */}
              <p className="text-[13px] text-[#3F3F46] dark:text-[#D4D4D8] leading-relaxed font-sans">
                {proj.description}
              </p>

              {/* Problem / Breakthrough Micro-Card (Konica Editorial Style) */}
              {(proj.problem || proj.solution) && (
                <div className="p-3.5 rounded-xl bg-[#F8F9FA] dark:bg-[#15161A] border border-[#E2E4E8] dark:border-[#22242B] space-y-1.5 text-xs font-mono">
                  {proj.problem && (
                    <div className="flex items-start gap-1.5 text-[11px] text-[#52525B] dark:text-[#A1A1AA]">
                      <span className="text-[#EF4444] font-bold shrink-0">PROBLEM:</span>
                      <span className="leading-snug">{proj.problem}</span>
                    </div>
                  )}
                  {proj.solution && (
                    <div className="flex items-start gap-1.5 text-[11px] text-[#09090B] dark:text-[#E4E4E7]">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">SOLUTION:</span>
                      <span className="leading-snug">{proj.solution}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 2. Technical Stack Badges & Tactile Actions */}
            <div className="space-y-4 pt-4 border-t border-[#ECEEF2] dark:border-white/10">
              {/* Stack Pills */}
              <div className="flex flex-wrap gap-1.5">
                {proj.stack.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded bg-[#F4F4F6] dark:bg-[#18191E] border border-[#E2E4E8] dark:border-[#27272A] text-[#09090B] dark:text-[#D4D4D8] text-[10.5px] font-mono font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Tactile Action Button Row */}
              <div className="flex items-center justify-between gap-2 pt-1 font-mono text-xs">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {proj.demo && (
                    <a
                      href={proj.demo}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={playHover}
                      onClick={playClick}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black font-bold text-[11.5px] transition-all shadow-xs cursor-pointer active:scale-95"
                    >
                      <span>Live Platform</span>
                      <ExternalLink size={12} />
                    </a>
                  )}

                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={playHover}
                      onClick={playClick}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#F4F4F6] text-[#09090B] dark:bg-[#16171B] dark:hover:bg-[#202227] dark:text-white border border-[#D1D5DB] dark:border-[#2B2D35] font-medium text-[11.5px] transition-all cursor-pointer active:scale-95"
                    >
                      <Code2 size={12} className="text-[#71717A] dark:text-[#A1A1AA]" />
                      <span>Source</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => {
                    playClick();
                    onOpenProjectModal(proj.id);
                  }}
                  onMouseEnter={playHover}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#F4F4F6] hover:bg-[#EAECEF] text-[#09090B] dark:bg-[#18191E] dark:hover:bg-[#24262E] dark:text-white border border-[#D1D5DB] dark:border-[#2B2D35] text-[11.5px] font-semibold transition-all cursor-pointer shrink-0 active:scale-95"
                >
                  <span>Architecture Spec</span>
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
