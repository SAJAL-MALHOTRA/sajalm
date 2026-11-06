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
  metricsBadge: string;
  stackTags: string[];
  demoUrl?: string;
  githubUrl: string;
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
      metricsBadge: '200+ Registered Pilot Users · <50ms Realtime Sync',
      stackTags: ['NEXT.JS 16', 'SUPABASE', 'REALTIME', 'GROQ LLAMA 3', 'POSTGRESQL'],
      demoUrl: 'https://pairfect.site',
      githubUrl: 'https://github.com/SAJAL-MALHOTRA/Pairfect---Your-lovespace',
    },
    {
      id: 'PRJ-03',
      index: '02',
      title: 'CYBERNAUTS ARENA',
      subtitle: 'Tournament & Broadcast Engine',
      categoryLabel: 'Event Infrastructure',
      statusText: 'NITJ Production',
      description: 'A tournament and broadcast engine for competitive events, synchronizing physical duel tables with 4K arena projection.',
      metricsBadge: '16-Team Live Duel Sync · 2.5s Jitter Buffer',
      stackTags: ['REALTIME', 'EVENT SYSTEMS', 'EXPRESS', 'WEB AUDIO', 'NEXT.JS'],
      githubUrl: 'https://github.com/SAJAL-MALHOTRA/cybernauts-arena',
    },
    {
      id: 'PRJ-02',
      index: '03',
      title: 'DSA LECTURE RAG',
      subtitle: 'Lecture-Grounded Retrieval',
      categoryLabel: 'Video AI & Retrieval',
      statusText: '104 Benchmark',
      description: 'Lecture-grounded retrieval connecting student programming questions directly to verified conceptual explanations and exact timestamps.',
      metricsBadge: '104-Query Benchmark · 0% Hallucination · <50ms',
      stackTags: ['BM25OKAPI', 'DENSE MINILM', 'RRF FUSION', 'FASTAPI', 'PYTORCH'],
      demoUrl: 'https://striver-dsa-platform.onrender.com',
      githubUrl: 'https://github.com/SAJAL-MALHOTRA/dsa-lecture-rag',
    },
    {
      id: 'PRJ-05',
      index: '04',
      title: 'NATIONAL CV CHALLENGE',
      subtitle: 'Surveillance Illumination Classifier',
      categoryLabel: 'Computer Vision',
      statusText: 'Top 7% Leaderboard',
      description: 'An ensemble-based computer vision competition submission achieving Top 7% (#16/227) on erratic surveillance illumination.',
      metricsBadge: 'Rank #16 / 227 (Top 7%) · 0.211 Score · Best Solution',
      stackTags: ['RESNET-34', 'EFFICIENTNET-B0', 'FASTMLP', 'PYTORCH', 'OPENCV'],
      githubUrl: 'https://github.com/SAJAL-MALHOTRA/surveillance-illumination-classification',
    },
  ];

  return (
    <section id="projects" className="w-full max-w-[780px] mx-auto py-8 text-left select-none space-y-6">
      
      {/* ── TOP SECTION TITLE & ARCHITECTURAL HEADER ── */}
      <div className="w-full space-y-3">
        <div className="flex items-end justify-between border-b border-[#E2E4E8] dark:border-[#22242B] pb-3">
          <div>
            <div className="text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-widest font-semibold">
              02 // FEATURED SYSTEMS
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

      {/* ── 2x2 ARCHITECTURAL PROJECT INDEX (NO PREVIEW BOXES) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {featuredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => {
              playClick();
              onOpenProjectModal(project.id);
            }}
            onMouseEnter={playHover}
            className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] hover:border-black/30 dark:hover:border-white/30 transition-colors duration-200 cursor-pointer group flex flex-col justify-between shadow-2xs space-y-3.5"
          >
            {/* Top Index & Status Line */}
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#71717A] dark:text-[#A1A1AA]">
                [{project.index}]
              </span>
              <span className="text-[10.5px] font-mono text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-wider">
                {project.statusText}
              </span>
            </div>

            {/* Project Title, Subtitle & Description */}
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-sans tracking-tight text-[#09090B] dark:text-white group-hover:underline flex items-center gap-1.5">
                    <span>{project.title}</span>
                    <ArrowUpRight
                      size={14}
                      className="text-[#71717A] dark:text-[#A1A1AA] group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0"
                    />
                  </h3>
                  <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold pt-0.5">
                    {project.subtitle}
                  </div>
                </div>
                <span className="text-[9.5px] font-mono text-[#71717A] dark:text-[#A1A1AA] shrink-0 px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-[#E2E4E8] dark:border-[#22242B]">
                  {project.categoryLabel}
                </span>
              </div>

              <p className="text-xs sm:text-[13px] text-[#52525B] dark:text-[#A1A1AA] font-sans leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Verified Metric Badge Strip */}
            <div className="p-2.5 rounded-lg bg-[#F9F9FB] dark:bg-[#15161B] border border-[#ECEEF2] dark:border-white/5 text-[10.5px] font-mono flex items-center justify-between">
              <span className="text-[#09090B] dark:text-[#EDEDED] font-semibold truncate text-[10px] sm:text-[10.5px]">
                {project.metricsBadge}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA] shrink-0 ml-1">
                DOSSIER ↗
              </span>
            </div>

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
        ))}
      </div>

    </section>
  );
}
