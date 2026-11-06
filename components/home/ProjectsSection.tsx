'use client';

import React, { useState } from 'react';
import { useSound } from '@/hooks/useSound';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { projects } from '@/data/projects';

interface ProjectsSectionProps {
  onOpenProjectModal: (id: string) => void;
}

export default function ProjectsSection({ onOpenProjectModal }: ProjectsSectionProps) {
  const { playClick, playHover } = useSound();
  const [filter, setFilter] = useState<'all' | 'systems' | 'ai'>('all');

  // Filter categories
  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true;
    if (filter === 'systems') {
      return ['PRJ-01', 'PRJ-03', 'PRJ-06', 'PRJ-08'].includes(project.id);
    }
    if (filter === 'ai') {
      return ['PRJ-02', 'PRJ-05', 'PRJ-04', 'PRJ-07'].includes(project.id);
    }
    return true;
  });

  return (
    <section id="projects" className="w-full max-w-[780px] mx-auto py-8 text-left select-none space-y-6">
      
      {/* ── SECTION HEADER ── */}
      <div className="w-full space-y-2 border-b border-[#E2E4E8] dark:border-[#22242B] pb-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-widest font-semibold">
              02 // FEATURED SYSTEMS
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-[#09090B] dark:text-white">
              Selected systems.
            </h2>
          </div>

          {/* Clean Category Filter */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#ECEEF2] dark:bg-[#16171B] border border-[#D1D5DB] dark:border-[#27272A] text-xs font-mono self-start sm:self-auto">
            {[
              { id: 'all', label: `All (${projects.length})` },
              { id: 'systems', label: 'Systems & Real-Time' },
              { id: 'ai', label: 'ML & Research' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  playClick();
                  setFilter(tab.id as 'all' | 'systems' | 'ai');
                }}
                onMouseEnter={playHover}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer text-[11px] ${
                  filter === tab.id
                    ? 'bg-white text-black dark:bg-[#27272A] dark:text-white font-semibold shadow-xs'
                    : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs sm:text-[13px] text-[#52525B] dark:text-[#A1A1AA] font-sans">
          Production code, distributed broadcast engines, multimodal retrieval benchmarks, and applied deep learning.
        </p>
      </div>

      {/* ── 2-COLUMN ARCHITECTURAL PROJECT GRID ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredProjects.map((project, index) => {
          const indexFormatted = String(index + 1).padStart(2, '0');
          const hasLiveDemo = Boolean(project.liveUrl || project.demo);

          return (
            <div
              key={project.id}
              onClick={() => {
                playClick();
                onOpenProjectModal(project.id);
              }}
              onMouseEnter={playHover}
              className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] hover:border-black/30 dark:hover:border-white/30 transition-colors duration-200 cursor-pointer group flex flex-col justify-between shadow-2xs space-y-4"
            >
              {/* Top Index & Single Clean Status */}
              <div className="flex items-center justify-between text-xs font-mono text-[#71717A] dark:text-[#A1A1AA]">
                <span className="font-bold text-[#09090B] dark:text-white">
                  [{indexFormatted}]
                </span>
                <span className="text-[11px]">
                  {project.types?.[0] || project.status}
                </span>
              </div>

              {/* Title, Subtitle & Description */}
              <div className="space-y-1.5">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-base sm:text-[17px] font-bold font-sans tracking-tight text-[#09090B] dark:text-white group-hover:underline inline-flex items-center gap-1.5">
                    <span>{project.name}</span>
                    <ArrowUpRight
                      size={14}
                      className="text-[#71717A] dark:text-[#A1A1AA] group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0"
                    />
                  </h3>

                  {hasLiveDemo && (
                    <a
                      href={project.liveUrl || project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        playClick();
                      }}
                      className="text-[10.5px] font-mono text-[#71717A] hover:text-[#09090B] dark:text-[#A1A1AA] dark:hover:text-white transition-colors flex items-center gap-1 shrink-0"
                      title="Open Live Deployment"
                    >
                      <span>Live</span>
                      <ExternalLink size={10} />
                    </a>
                  )}
                </div>

                {project.subtitle && (
                  <div className="text-[11.5px] font-mono text-[#71717A] dark:text-[#A1A1AA]">
                    {project.subtitle}
                  </div>
                )}

                <p className="text-xs sm:text-[13px] text-[#52525B] dark:text-[#A1A1AA] font-sans leading-relaxed pt-1">
                  {project.description}
                </p>
              </div>

              {/* Metric & Telemetry Strip (Full Text, Never Truncated) */}
              <div className="p-2.5 rounded-lg bg-[#F9F9FB] dark:bg-[#15161B] border border-[#ECEEF2] dark:border-white/5 text-[11px] font-mono text-[#09090B] dark:text-[#EDEDED] font-medium flex items-center justify-between">
                <span>{project.metric}</span>
                <span className="text-[9.5px] text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-wider group-hover:text-black dark:group-hover:text-white transition-colors ml-2 shrink-0">
                  Case Study ↗
                </span>
              </div>

              {/* Clean Typographic Tech Stack (No Boxed Pill Borders) */}
              <div className="pt-2 border-t border-[#ECEEF2] dark:border-white/5 text-[10.5px] font-mono text-[#71717A] dark:text-[#A1A1AA] tracking-wide">
                {project.stack.slice(0, 4).join(' · ')}
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}