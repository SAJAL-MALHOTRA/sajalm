'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useSound } from '@/hooks/useSound';
import { ExternalLink, FileText } from 'lucide-react';
import { projects, Project } from '@/data/projects';
import { getAssetPath } from '@/utils/asset';

interface ProjectsSectionProps {
  onOpenProjectModal: (id: string) => void;
}

/* ─────────────────────────────────────────────────────────────
   CLEAN HERO PREVIEW BOX (MATCHING EXACT REFERENCE IMAGE)
   ───────────────────────────────────────────────────────────── */
function ProjectCardVisual({
  project,
  onOpenModal,
}: {
  project: Project;
  onOpenModal: () => void;
}) {
  // Dedicated preview image mapping
  const imageMap: Record<string, string> = {
    'PRJ-01': '/projects/pairfect-preview.jpg',
    'PRJ-02': '/projects/dsa-rag-preview.jpg',
    'PRJ-03': '/projects/cybernauts-preview.jpg',
    'PRJ-05': '/projects/cv-challenge-preview.jpg',
  };

  const imageSrc = imageMap[project.id];

  return (
    <div
      onClick={onOpenModal}
      className="relative w-full h-48 sm:h-52 rounded-xl sm:rounded-2xl overflow-hidden bg-[#0C1017] border border-white/10 group-hover:border-white/25 transition-all duration-300 select-none cursor-pointer"
    >
      {/* ── CASE 1: REAL HIGH-RESOLUTION SCREENSHOT PREVIEW ── */}
      {imageSrc ? (
        <div className="relative w-full h-full">
          <Image
            src={getAssetPath(imageSrc)}
            alt={`${project.name} preview`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
        </div>
      ) : project.id === 'PRJ-04' ? (
        /* ── CASE 2: THINKFOLIO (GOLDEN REASONING RADAR MATCHING CARD 3 IN REFERENCE) ── */
        <div className="relative w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#1C160C] via-[#120E07] to-[#0A0704] overflow-hidden">
          <svg viewBox="0 0 160 100" className="w-full h-28 overflow-visible opacity-90">
            <ellipse
              cx="80"
              cy="50"
              rx="46"
              ry="22"
              fill="none"
              stroke="url(#gold-torus-grad-clean)"
              strokeWidth="9"
              strokeLinecap="round"
              className="group-hover:scale-105 transition-transform duration-500"
            />
            <defs>
              <linearGradient id="gold-torus-grad-clean" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#FEF08A" />
                <stop offset="100%" stopColor="#B45309" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
            <span className="text-base sm:text-lg font-black font-sans text-amber-100 tracking-tight leading-tight drop-shadow-md">
              Reasoning Evaluator
            </span>
            <span className="text-[11px] font-mono text-amber-300/80 mt-1">
              R² = 0.927 · FinBERT + SHAP
            </span>
          </div>
        </div>
      ) : project.id === 'PRJ-08' ? (
        /* ── CASE 3: DEVDEX (INDIGO/VIOLET DATABASE IDENTITY) ── */
        <div className="relative w-full h-full flex flex-col justify-between p-4 bg-gradient-to-br from-[#101426] via-[#0B0D18] to-[#06080E]">
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-indigo-400">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <span>PostgreSQL · Row-Level Security</span>
          </div>
          <div className="space-y-1 text-center my-auto">
            <div className="text-base sm:text-lg font-black font-sans text-white tracking-tight">
              Developer Identity Engine
            </div>
            <div className="text-[11px] font-mono text-indigo-300/80">
              Next.js 15 App · 100% RLS Coverage
            </div>
          </div>
          <div className="flex items-center justify-between font-mono text-[9px] text-neutral-400 border-t border-white/5 pt-1">
            <span>Supabase Auth</span>
            <span className="text-indigo-400">98+ Lighthouse</span>
          </div>
        </div>
      ) : project.id === 'PRJ-06' ? (
        /* ── CASE 4: POTHOLE DETECTION (EDGE CV HUD) ── */
        <div className="relative w-full h-full flex flex-col justify-between p-4 bg-gradient-to-br from-[#1C120A] via-[#130B05] to-[#080502]">
          <div className="flex items-center justify-between font-mono text-[10px] text-orange-400">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span>YOLOv8 Edge CV</span>
            </span>
            <span>&gt;30 FPS</span>
          </div>
          <div className="relative my-auto flex items-center justify-center">
            <div className="w-24 h-16 border-2 border-orange-500/80 rounded-xs flex items-start justify-end p-1 shadow-[0_0_12px_rgba(249,115,22,0.3)]">
              <span className="text-[9px] font-mono bg-orange-500 text-black font-bold px-1 rounded-xs">
                0.93
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between font-mono text-[9px] text-neutral-400 border-t border-white/5 pt-1">
            <span>Dashcam 1080p Stream</span>
            <span className="text-orange-400">Temporal Filter</span>
          </div>
        </div>
      ) : (
        /* ── CASE 5: SALARY PREDICTOR (REGRESSION TREE) ── */
        <div className="relative w-full h-full flex flex-col justify-between p-4 bg-gradient-to-br from-[#121A0C] via-[#0B1006] to-[#060803]">
          <div className="flex items-center justify-between font-mono text-[10px] text-lime-400">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-500 animate-pulse" />
              <span>Compensation Regression</span>
            </span>
            <span>6k+ Records</span>
          </div>
          <div className="space-y-1 text-center my-auto">
            <div className="text-base sm:text-lg font-black font-sans text-white tracking-tight">
              Indian Tech Salary Forecaster
            </div>
            <div className="text-[11px] font-mono text-lime-300/80">
              AmbitionBox Verified Dataset
            </div>
          </div>
          <div className="flex items-center justify-between font-mono text-[9px] text-neutral-400 border-t border-white/5 pt-1">
            <span>Random Forest Model</span>
            <span className="text-lime-400">Streamlit Cloud</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN PROJECTS SECTION (MATCHING EXACT 3-COLUMN REFERENCE)
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

      {/* ── 3-COLUMN CLEAN REFERENCE CARD GRID ── */}
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
              {/* TOP: VISUAL HERO PREVIEW */}
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

                {/* BOTTOM: TECH STACK PILLS IN HORIZONTAL ROW */}
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

              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
