'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useSound } from '@/hooks/useSound';
import { ArrowUpRight, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import { projects, Project } from '@/data/projects';
import { getAssetPath } from '@/utils/asset';

interface ProjectsSectionProps {
  onOpenProjectModal: (id: string) => void;
}

/* ─────────────────────────────────────────────────────────────
   3D PERSPECTIVE DEVICE MOCKUP WITH RADIANT AMBIENT GLOW
   (Matching sumitx.me 3D tilted screen archetype)
   ───────────────────────────────────────────────────────────── */
interface VisualConfig {
  imageSrc?: string;
  auraGradient: string;
  accentGlow: string;
  domain: string;
}

const VISUAL_CONFIG: Record<string, VisualConfig> = {
  'PRJ-01': {
    imageSrc: '/projects/pairfect-preview.jpg',
    auraGradient: 'from-fuchsia-600/30 via-purple-600/20 to-transparent',
    accentGlow: '#D946EF',
    domain: 'pairfect.site',
  },
  'PRJ-02': {
    imageSrc: '/projects/dsa-rag-preview.jpg',
    auraGradient: 'from-cyan-500/30 via-blue-600/20 to-transparent',
    accentGlow: '#06B6D4',
    domain: 'dsa-rag.internal',
  },
  'PRJ-03': {
    imageSrc: '/projects/cybernauts-preview.jpg',
    auraGradient: 'from-rose-600/30 via-orange-600/20 to-transparent',
    accentGlow: '#F43F5E',
    domain: 'arena.cybernauts.io',
  },
  'PRJ-05': {
    imageSrc: '/projects/cv-challenge-preview.jpg',
    auraGradient: 'from-emerald-500/30 via-teal-600/20 to-transparent',
    accentGlow: '#10B981',
    domain: 'cv-lighting.benchmark.org',
  },
  'PRJ-04': {
    auraGradient: 'from-amber-500/30 via-yellow-600/20 to-transparent',
    accentGlow: '#F59E0B',
    domain: 'thinkfolio.alpha',
  },
  'PRJ-06': {
    auraGradient: 'from-orange-500/30 via-amber-600/20 to-transparent',
    accentGlow: '#F97316',
    domain: 'pothole.edge-cv.live',
  },
  'PRJ-07': {
    auraGradient: 'from-lime-500/30 via-emerald-600/20 to-transparent',
    accentGlow: '#84CC16',
    domain: 'salary-forecaster.streamlit.app',
  },
  'PRJ-08': {
    auraGradient: 'from-indigo-600/30 via-purple-600/20 to-transparent',
    accentGlow: '#6366F1',
    domain: 'sajdex.terminal.sys',
  },
};

function ProjectCardVisual({
  project,
  onOpenModal,
}: {
  project: Project;
  onOpenModal: () => void;
}) {
  const { playClick } = useSound();
  const liveUrl = project.liveUrl || project.demo;
  const config = VISUAL_CONFIG[project.id] || {
    auraGradient: 'from-cyan-500/25 via-blue-600/15 to-transparent',
    accentGlow: '#06B6D4',
    domain: 'internal.system',
  };

  return (
    <div
      onClick={onOpenModal}
      className="relative w-full h-52 sm:h-56 rounded-xl sm:rounded-2xl overflow-hidden bg-[#0A0D14] border border-white/10 group-hover:border-white/25 transition-all duration-300 flex items-center justify-center p-3 select-none cursor-pointer"
    >
      {/* ── AMBIENT NEON GLOW AURA (MATCHING SUMITX VIBRANT GRADIENTS) ── */}
      <div
        className={`absolute inset-0 bg-gradient-to-t ${config.auraGradient} opacity-60 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none`}
      />
      <div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-20 rounded-full blur-2xl pointer-events-none transition-all duration-500 group-hover:scale-125"
        style={{ backgroundColor: config.accentGlow, opacity: 0.3 }}
      />

      {/* ── 3D ISOMETRIC/TILTED BROWSER CHASSIS ── */}
      <div className="relative w-full h-full flex items-center justify-center [perspective:1000px]">
        <div
          className="relative w-full h-[95%] rounded-lg sm:rounded-xl overflow-hidden bg-[#11141E] border border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.65)] [transform:rotateX(13deg)_rotateY(-6deg)_rotateZ(1deg)_scale(0.95)_translateY(4px)] group-hover:[transform:rotateX(0deg)_rotateY(0deg)_rotateZ(0deg)_scale(1)_translateY(0px)] transition-transform duration-500 ease-out flex flex-col"
        >
          {/* Chrome Titlebar */}
          <div className="h-6 sm:h-7 px-2.5 bg-[#171B26] border-b border-white/10 flex items-center justify-between shrink-0 select-none">
            {/* 3 Traffic Dots */}
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500/80" />
              <span className="w-2 h-2 rounded-full bg-amber-500/80" />
              <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
            </div>

            {/* Address Pill */}
            <div className="px-2.5 py-0.5 rounded-full bg-black/50 border border-white/10 text-[9px] sm:text-[10px] font-mono text-neutral-300 max-w-[170px] truncate text-center flex items-center gap-1">
              <span className="text-emerald-400">🔒</span>
              <span>{config.domain}</span>
            </div>

            <div className="w-6" />
          </div>

          {/* Viewport Content */}
          <div className="relative flex-1 w-full bg-[#07090E] overflow-hidden">
            {config.imageSrc ? (
              <div className="relative w-full h-full">
                <Image
                  src={getAssetPath(config.imageSrc)}
                  alt={`${project.name} preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
            ) : project.id === 'PRJ-04' ? (
              /* ThinkFolio Custom Visual */
              <div className="relative w-full h-full flex flex-col items-center justify-center p-3 bg-gradient-to-br from-[#1C160C] via-[#120E07] to-[#0A0704]">
                <svg viewBox="0 0 160 90" className="w-full h-24 overflow-visible opacity-90">
                  <ellipse
                    cx="80"
                    cy="45"
                    rx="46"
                    ry="20"
                    fill="none"
                    stroke="url(#gold-torus-grad-3d)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  <defs>
                    <linearGradient id="gold-torus-grad-3d" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F59E0B" />
                      <stop offset="50%" stopColor="#FEF08A" />
                      <stop offset="100%" stopColor="#B45309" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
                  <span className="text-sm sm:text-base font-black font-sans text-amber-100 tracking-tight drop-shadow-md">
                    Reasoning Evaluator
                  </span>
                  <span className="text-[10px] font-mono text-amber-300/80 mt-0.5">
                    R² = 0.927 · FinBERT + SHAP
                  </span>
                </div>
              </div>
            ) : project.id === 'PRJ-08' ? (
              /* DevDex Identity Visual */
              <div className="relative w-full h-full flex flex-col justify-between p-3.5 bg-gradient-to-br from-[#101426] via-[#0B0D18] to-[#06080E]">
                <div className="flex items-center gap-1.5 font-mono text-[9px] text-indigo-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                  <span>PostgreSQL · RLS Tenant Engine</span>
                </div>
                <div className="space-y-0.5 text-center my-auto">
                  <div className="text-sm sm:text-base font-black font-sans text-white tracking-tight">
                    Developer Identity Engine
                  </div>
                  <div className="text-[10px] font-mono text-indigo-300/80">
                    Next.js 15 App · 100% RLS Coverage
                  </div>
                </div>
                <div className="flex items-center justify-between font-mono text-[9px] text-neutral-400 border-t border-white/5 pt-1">
                  <span>Supabase Auth</span>
                  <span className="text-indigo-400">98+ Lighthouse</span>
                </div>
              </div>
            ) : project.id === 'PRJ-06' ? (
              /* Pothole Detection Visual */
              <div className="relative w-full h-full flex flex-col justify-between p-3.5 bg-gradient-to-br from-[#1C120A] via-[#130B05] to-[#080502]">
                <div className="flex items-center justify-between font-mono text-[9px] text-orange-400">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                    <span>YOLOv8 Edge CV</span>
                  </span>
                  <span>&gt;30 FPS</span>
                </div>
                <div className="relative my-auto flex items-center justify-center">
                  <div className="w-20 h-14 border-2 border-orange-500/80 rounded-xs flex items-start justify-end p-1 shadow-[0_0_12px_rgba(249,115,22,0.4)]">
                    <span className="text-[8px] font-mono bg-orange-500 text-black font-bold px-1 rounded-xs">
                      0.93
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between font-mono text-[9px] text-neutral-400 border-t border-white/5 pt-1">
                  <span>Dashcam Stream</span>
                  <span className="text-orange-400">Temporal Filter</span>
                </div>
              </div>
            ) : (
              /* Salary Predictor Visual */
              <div className="relative w-full h-full flex flex-col justify-between p-3.5 bg-gradient-to-br from-[#121A0C] via-[#0B1006] to-[#060803]">
                <div className="flex items-center justify-between font-mono text-[9px] text-lime-400">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-500 animate-pulse" />
                    <span>Compensation Regression</span>
                  </span>
                  <span>6k+ Records</span>
                </div>
                <div className="space-y-0.5 text-center my-auto">
                  <div className="text-sm sm:text-base font-black font-sans text-white tracking-tight">
                    Tech Salary Forecaster
                  </div>
                  <div className="text-[10px] font-mono text-lime-300/80">
                    AmbitionBox Dataset
                  </div>
                </div>
                <div className="flex items-center justify-between font-mono text-[9px] text-neutral-400 border-t border-white/5 pt-1">
                  <span>Random Forest</span>
                  <span className="text-lime-400">Streamlit Cloud</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Orange/Colored Circular ↗ Button */}
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.stopPropagation();
            playClick();
          }}
          className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg cursor-pointer"
          title={`Visit ${project.name} live`}
        >
          <ArrowUpRight size={15} strokeWidth={2.4} />
        </a>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN PROJECTS SECTION (3-COLUMN ARCHITECTURAL GRID)
   ───────────────────────────────────────────────────────────── */
export default function ProjectsSection({ onOpenProjectModal }: ProjectsSectionProps) {
  const { playClick, playHover } = useSound();
  const [filter, setFilter] = useState<'all' | 'systems' | 'ai'>('all');

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
    <section id="projects" className="w-full max-w-[1060px] mx-auto py-10 text-left select-none space-y-7">
      
      {/* ── SECTION HEADER ── */}
      <div className="w-full space-y-2 border-b border-[#E2E4E8] dark:border-[#22242B] pb-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-widest font-semibold">
                02 // SELECTED SYSTEMS &amp; PRODUCTION APPS
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-[#09090B] dark:text-white">
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
                  className={`relative px-3 py-1 rounded-md transition-colors duration-150 cursor-pointer text-[11px] ${
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
          Production systems, low-latency distributed protocols, multimodal retrieval benchmarks, and evaluated ML pipelines.
        </p>
      </div>

      {/* ── 3-COLUMN HIGH-IMPACT ARCHITECTURAL CARD GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredProjects.map((project, index) => {
          const indexFormatted = String(index + 1).padStart(2, '0');
          const liveUrl = project.liveUrl || project.demo;

          return (
            <div
              key={project.id}
              onClick={() => {
                playClick();
                onOpenProjectModal(project.id);
              }}
              onMouseEnter={playHover}
              className="rounded-2xl sm:rounded-3xl bg-[#0B0E14] border border-[#1E232E] hover:border-neutral-500/50 transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between group shadow-xl relative overflow-hidden cursor-pointer"
            >
              {/* TOP: 3D PERSPECTIVE MOCKUP WINDOW WITH VIBRANT GLOW */}
              <ProjectCardVisual
                project={project}
                onOpenModal={() => onOpenProjectModal(project.id)}
              />

              {/* MIDDLE: TYPOGRAPHY, ACTION ICONS & ENGINEERING PROBLEM/HOW */}
              <div className="space-y-4 text-left flex-1 flex flex-col justify-between pt-4">
                
                {/* Title Row with Action Buttons */}
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs sm:text-sm font-mono text-neutral-400 font-semibold">
                        {indexFormatted}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold font-sans text-white tracking-tight leading-tight group-hover:text-cyan-300 transition-colors">
                        {project.name}
                      </h3>
                    </div>

                    {/* Circular Action Icons */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {liveUrl && (
                        <a
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            playClick();
                          }}
                          className="w-8 h-8 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 flex items-center justify-center text-neutral-300 hover:text-white transition-all cursor-pointer shadow-2xs"
                          title="Open Live Deployment"
                        >
                          <ExternalLink size={13} />
                        </a>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playClick();
                          onOpenProjectModal(project.id);
                        }}
                        className="w-8 h-8 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 flex items-center justify-center text-neutral-300 hover:text-white transition-all cursor-pointer shadow-2xs"
                        title="View Architecture Specification"
                      >
                        <FileText size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Subtitle / Tagline in Cyan Monospace */}
                  <p className="text-xs font-mono text-cyan-400/90 mt-1.5 leading-snug">
                    {project.subtitle || project.tagline}
                  </p>
                </div>

                {/* Structured "Problem I solved" */}
                {project.problem && (
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold block">
                      Problem I solved
                    </span>
                    <p className="text-xs sm:text-[13px] text-neutral-200 leading-relaxed font-sans line-clamp-3">
                      {project.problem}
                    </p>
                  </div>
                )}

                {/* Structured "How" (Technical Execution) */}
                {project.solution && (
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold block">
                      How
                    </span>
                    <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed font-sans line-clamp-3">
                      {project.solution}
                    </p>
                  </div>
                )}

                {/* TECH STACK PILLS */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10 mt-auto">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-[#161B22] border border-white/10 text-[11px] font-mono text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* ── GROUNDED STATUS & VIEW DETAILS STRIP ── */}
                <div className="flex items-center justify-between pt-2 text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    {liveUrl ? (
                      <>
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-[11px] text-emerald-400 font-medium">
                          Live Production
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80"></span>
                        <span className="text-[11px] text-neutral-400 font-mono truncate max-w-[175px]">
                          {project.metric}
                        </span>
                      </>
                    )}
                  </div>

                  <span className="text-[11px] text-cyan-400 group-hover:text-cyan-300 font-medium flex items-center gap-1 transition-colors">
                    <span>View Details</span>
                    <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
