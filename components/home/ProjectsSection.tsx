'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '@/hooks/useSound';
import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react';
import { projects } from '@/data/projects';
import SpotlightCard from '@/components/ui/SpotlightCard';
import ProjectVisualArtifact from '@/components/projects/ProjectVisualArtifact';

interface ProjectsSectionProps {
  onOpenProjectModal: (id: string) => void;
}

function getProjectColorTokens(id: string) {
  switch (id) {
    case 'PRJ-01': // Pairfect (pairfect.site)
      return {
        spotlight: 'rgba(244, 63, 94, 0.18)',
        borderHover: 'hover:border-rose-500/50 dark:hover:border-rose-500/50',
        badge: 'text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/25',
        accentGlow: 'group-hover:shadow-[0_0_30px_rgba(244,63,94,0.14)]',
        metricAccent: 'text-rose-500 dark:text-rose-400',
      };
    case 'PRJ-02': // DSA Lecture RAG (striver-dsa-platform.onrender.com)
      return {
        spotlight: 'rgba(6, 182, 212, 0.18)',
        borderHover: 'hover:border-cyan-500/50 dark:hover:border-cyan-500/50',
        badge: 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/25',
        accentGlow: 'group-hover:shadow-[0_0_30px_rgba(6,182,212,0.14)]',
        metricAccent: 'text-cyan-500 dark:text-cyan-400',
      };
    case 'PRJ-03': // Cybernauts Arena
      return {
        spotlight: 'rgba(168, 85, 247, 0.18)',
        borderHover: 'hover:border-purple-500/50 dark:hover:border-purple-500/50',
        badge: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/25',
        accentGlow: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.14)]',
        metricAccent: 'text-purple-500 dark:text-purple-400',
      };
    case 'PRJ-05': // National CV Challenge
      return {
        spotlight: 'rgba(16, 185, 129, 0.18)',
        borderHover: 'hover:border-emerald-500/50 dark:hover:border-emerald-500/50',
        badge: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
        accentGlow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.14)]',
        metricAccent: 'text-emerald-500 dark:text-emerald-400',
      };
    case 'PRJ-04': // ThinkFolio
      return {
        spotlight: 'rgba(245, 158, 11, 0.18)',
        borderHover: 'hover:border-amber-500/50 dark:hover:border-amber-500/50',
        badge: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/25',
        accentGlow: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.14)]',
        metricAccent: 'text-amber-500 dark:text-amber-400',
      };
    case 'PRJ-08': // DevDex
      return {
        spotlight: 'rgba(99, 102, 241, 0.18)',
        borderHover: 'hover:border-indigo-500/50 dark:hover:border-indigo-500/50',
        badge: 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/25',
        accentGlow: 'group-hover:shadow-[0_0_30px_rgba(99,102,241,0.14)]',
        metricAccent: 'text-indigo-500 dark:text-indigo-400',
      };
    case 'PRJ-06': // Automated Pothole Detection
      return {
        spotlight: 'rgba(249, 115, 22, 0.18)',
        borderHover: 'hover:border-orange-500/50 dark:hover:border-orange-500/50',
        badge: 'text-orange-600 dark:text-orange-400 bg-orange-500/10 border-orange-500/25',
        accentGlow: 'group-hover:shadow-[0_0_30px_rgba(249,115,22,0.14)]',
        metricAccent: 'text-orange-500 dark:text-orange-400',
      };
    case 'PRJ-07': // Salary Predictor
      return {
        spotlight: 'rgba(132, 204, 22, 0.18)',
        borderHover: 'hover:border-lime-500/50 dark:hover:border-lime-500/50',
        badge: 'text-lime-600 dark:text-lime-400 bg-lime-500/10 border-lime-500/25',
        accentGlow: 'group-hover:shadow-[0_0_30px_rgba(132,204,22,0.14)]',
        metricAccent: 'text-lime-500 dark:text-lime-400',
      };
    default:
      return {
        spotlight: 'rgba(255, 255, 255, 0.08)',
        borderHover: 'hover:border-black/30 dark:hover:border-white/30',
        badge: 'text-neutral-600 dark:text-neutral-400 bg-neutral-500/10 border-neutral-500/20',
        accentGlow: '',
        metricAccent: 'text-[#09090B] dark:text-[#EDEDED]',
      };
  }
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
    <section id="projects" className="w-full max-w-[1020px] mx-auto py-8 text-left select-none space-y-6">
      
      {/* ── SECTION HEADER WITH GRADIENT ACCENT ── */}
      <div className="w-full space-y-2 border-b border-[#E2E4E8] dark:border-[#22242B] pb-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-rose-500 via-cyan-500 to-purple-500 animate-pulse" />
              <span className="text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-widest font-semibold">
                02 // PRODUCTION SYSTEMS &amp; LIVE WEBSITES
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-[#09090B] dark:text-white">
              Selected systems.
            </h2>
          </div>

          {/* Clean Category Filter with Fluid Spring Backdrop */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#ECEEF2] dark:bg-[#16171B] border border-[#D1D5DB] dark:border-[#27272A] text-xs font-mono self-start sm:self-auto relative">
            {[
              { id: 'all', label: `All (${projects.length})` },
              { id: 'systems', label: 'Systems & Real-Time' },
              { id: 'ai', label: 'ML & Research' },
            ].map((tab) => {
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    playClick();
                    setFilter(tab.id as 'all' | 'systems' | 'ai');
                  }}
                  onMouseEnter={playHover}
                  className={`relative px-2.5 py-1 rounded-md transition-colors duration-150 cursor-pointer text-[11px] ${
                    isActive
                      ? 'text-black dark:text-white font-semibold'
                      : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="projectTabPill"
                      className="absolute inset-0 rounded-md bg-white dark:bg-[#27272A] shadow-xs"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="text-xs sm:text-[13px] text-[#52525B] dark:text-[#A1A1AA] font-sans">
          Production deployments, live WebSocket backends, multimodal RAG retrieval benchmarks, and applied deep learning.
        </p>
      </div>

      {/* ── 2-COLUMN ARCHITECTURAL PROJECT GRID WITH VISUAL ARTIFACTS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {filteredProjects.map((project, index) => {
          const indexFormatted = String(index + 1).padStart(2, '0');
          const hasLiveDemo = Boolean(project.liveUrl || project.demo);
          const colorTokens = getProjectColorTokens(project.id);

          return (
            <SpotlightCard
              key={project.id}
              onClick={() => {
                playClick();
                onOpenProjectModal(project.id);
              }}
              onMouseEnter={playHover}
              spotlightDarkColor={colorTokens.spotlight}
              className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#101115] border border-[#E2E4E8] dark:border-[#22242B] ${colorTokens.borderHover} ${colorTokens.accentGlow} transition-all duration-300 cursor-pointer group flex flex-col justify-between shadow-2xs space-y-4 relative overflow-hidden`}
            >
              {/* Top Index & Single Clean Status with Color Badge */}
              <div className="flex items-center justify-between text-xs font-mono text-[#71717A] dark:text-[#A1A1AA]">
                <span className="font-bold text-[#09090B] dark:text-white">
                  [{indexFormatted}]
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${colorTokens.badge}`}>
                  {project.types?.[0] || project.status}
                </span>
              </div>

              {/* Visual App Artifact: Live Interactive Mini-UI or Rendered Snapshot */}
              <div className="w-full">
                <ProjectVisualArtifact
                  id={project.id}
                  name={project.name}
                  liveUrl={project.liveUrl || project.demo}
                  onOpenModal={() => onOpenProjectModal(project.id)}
                />
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
                      className="px-2.5 py-1 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-[10.5px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold transition-all flex items-center gap-1.5 shadow-2xs hover:scale-105 active:scale-95 shrink-0"
                      title="Open Live Deployment in new tab"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Live App</span>
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

              {/* Metric & Telemetry Strip */}
              <div className="p-2.5 rounded-lg bg-[#F9F9FB] dark:bg-[#14151A] border border-[#ECEEF2] dark:border-white/5 text-[11px] font-mono text-[#09090B] dark:text-[#EDEDED] font-medium flex items-center justify-between">
                <span className={colorTokens.metricAccent}>{project.metric}</span>
                <span className="text-[9.5px] text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-wider group-hover:text-black dark:group-hover:text-white transition-colors ml-2 shrink-0">
                  Case Study ↗
                </span>
              </div>

              {/* Clean Typographic Tech Stack */}
              <div className="pt-2 border-t border-[#ECEEF2] dark:border-white/5 text-[10.5px] font-mono text-[#71717A] dark:text-[#A1A1AA] tracking-wide flex items-center justify-between">
                <span>{project.stack.slice(0, 4).join(' · ')}</span>
                <span className="text-[9.5px] text-[#A1A1AA] group-hover:text-black dark:group-hover:text-white transition-colors">
                  Details →
                </span>
              </div>
            </SpotlightCard>
          );
        })}
      </div>

    </section>
  );
}
