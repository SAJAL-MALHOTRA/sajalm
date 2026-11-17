'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '@/hooks/useSound';
import SpotlightCard from '@/components/ui/SpotlightCard';
import DisciplineRingsCard from '@/components/ui/DisciplineRingsCard';
import EditorialLookbookStrip from '@/components/ui/EditorialLookbookStrip';
import NeuralPlayground from '@/components/ml/NeuralPlayground';
import {
  Cpu,
  Palette,
  Layers,
  Camera,
  Compass,
  Disc3,
  Code2,
  Network,
  GitBranch,
  Terminal,
} from 'lucide-react';

export default function DualSpectrum() {
  const [activeTab, setActiveTab] = useState<'tech' | 'passions'>('tech');
  const { playClick, playHover } = useSound();

  const technicalCategories = [
    {
      index: '01',
      title: 'Full-Stack Engineering',
      icon: <Code2 size={13} className="text-[#71717A] dark:text-[#A1A1AA]" />,
      detail: 'Architecting end-to-end applications with strict type safety, modular component systems, and low-latency client rendering.',
      skills: ['React 19', 'Next.js 16', 'TypeScript', 'FastAPI', 'Tailwind CSS', 'Node.js'],
    },
    {
      index: '02',
      title: 'Machine Learning & Research',
      icon: <Cpu size={13} className="text-[#71717A] dark:text-[#A1A1AA]" />,
      detail: 'Deep CNN backbones, heterogeneous ensembles, tabular feature engineering, and rigorous statistical evaluation.',
      skills: ['PyTorch', 'Torchvision', 'Scikit-learn', 'NumPy', 'Pandas', 'OpenCV'],
    },
    {
      index: '03',
      title: 'Retrieval & AI Systems',
      icon: <GitBranch size={13} className="text-[#71717A] dark:text-[#A1A1AA]" />,
      detail: 'Dual-channel hybrid search, Reciprocal Rank Fusion, dense semantic embeddings, and low-latency Groq LPU inference.',
      skills: ['BM25Okapi', 'Dense MiniLM', 'RRF Fusion', 'LangChain', 'Groq API', 'SentenceTransformers'],
    },
    {
      index: '04',
      title: 'Infrastructure & Real-Time',
      icon: <Network size={13} className="text-[#71717A] dark:text-[#A1A1AA]" />,
      detail: 'Authoritative server master clocks, WebSockets state synchronization, PostgreSQL schemas with Row-Level Security, and Docker.',
      skills: ['Supabase', 'PostgreSQL', 'WebSockets', 'Docker', 'Express.js', 'Linux'],
    },
    {
      index: '05',
      title: 'Core Computer Science Foundations',
      icon: <Terminal size={13} className="text-[#71717A] dark:text-[#A1A1AA]" />,
      detail: 'Theoretical computer science, algorithmic complexity, operating system concurrency, and database internals at NIT Jalandhar.',
      skills: ['Data Structures & Algorithms', 'Operating Systems', 'DBMS Internals', 'Computer Networks', 'OOP Design'],
    },
  ];

  const creativeDimensions = [
    {
      index: '01',
      title: 'Runway & Stage Architecture',
      subtitle: 'NIT Jalandhar Fashion & Modelling Club',
      icon: <Camera size={13} className="text-[#71717A] dark:text-[#A1A1AA]" />,
      detail: 'Active runway model for NIT Jalandhar FMC. Spatial choreography, stage lighting composure, and high-impact live presentations.',
      tags: ['NITJ FMC', 'Runway', 'Editorial Shoots', '@malhotra.sajal'],
    },
    {
      index: '02',
      title: 'Architectural Style & Silhouettes',
      subtitle: 'Proportion, drape, and monochrome palettes',
      icon: <Layers size={13} className="text-[#71717A] dark:text-[#A1A1AA]" />,
      detail: 'Disciplined focus on tailoring geometry, texture contrast, and structural silhouettes. Applying the exact same rigor of proportion to garments as to layout systems.',
      tags: ['Monochrome', 'Structured Tailoring', 'Geometry', 'Proportion'],
    },
    {
      index: '03',
      title: 'Mindfulness & Cognitive Recovery',
      subtitle: 'Deliberate detachment and focused stillness',
      icon: <Compass size={13} className="text-[#71717A] dark:text-[#A1A1AA]" />,
      detail: 'Disciplined daily meditation and digital detachment routines. Sustaining mental clarity, zero cognitive thrashing, and high-focus engineering sprints.',
      tags: ['Meditation', 'Focus', 'Discipline', 'Stillness'],
    },
    {
      index: '04',
      title: 'Acoustic Focus Environments',
      subtitle: 'Audio landscapes for deep architecture cycles',
      icon: <Disc3 size={13} className="text-[#71717A] dark:text-[#A1A1AA]" />,
      detail: 'Atmospheric sound design on repeat during late-night systems engineering. Ambient electronic textures, precision synth lines, and modern production.',
      tags: ['Frank Ocean', 'Aphex Twin', 'Travis Scott', 'Dijon'],
    },
  ];

  return (
    <section id="skills" className="w-full max-w-[1020px] mx-auto py-8 text-left select-none space-y-6">
      
      {/* ── SECTION HEADER & TWO-STATE INTERACTIVE MATRIX SWITCHER ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E2E4E8] dark:border-[#22242A] pb-3 gap-3">
        <div className="space-y-1">
          <div className="text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-widest font-semibold">
            03 // PERSPECTIVE &amp; DISCIPLINE
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-sans text-[#09090B] dark:text-white tracking-tight">
            Dual Competence. Engineering &amp; Visual Systems.
          </h2>
        </div>

        {/* Interactive Matrix Tab Switcher with Kokonut Fluid Spring */}
        <div className="w-full sm:w-auto grid grid-cols-2 sm:flex items-center gap-1 p-1 rounded-xl bg-[#ECEEF2] dark:bg-[#16171B] border border-[#D1D5DB] dark:border-[#27272A] text-xs font-mono relative">
          {[
            { id: 'tech', label: '01 Engineering', icon: <Cpu size={12} className="shrink-0" /> },
            { id: 'passions', label: '02 Applied Disciplines', icon: <Palette size={12} className="shrink-0" /> },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playClick();
                  setActiveTab(tab.id as 'tech' | 'passions');
                }}
                onMouseEnter={playHover}
                className={`relative flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg cursor-pointer text-center text-[11px] sm:text-xs transition-colors duration-150 ${
                  isActive
                    ? 'text-white dark:text-black font-bold'
                    : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="spectrumTabPill"
                    className="absolute inset-0 rounded-lg bg-black dark:bg-white shadow-xs"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {tab.icon}
                  <span>{tab.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 01 ENGINEERING MATRIX (TECHNICAL INDEX) ── */}
      {activeTab === 'tech' && (
        <div className="space-y-3.5 transition-opacity duration-300">
          <DisciplineRingsCard />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {technicalCategories.map((cat, idx) => {
              const isFullWidth = idx === 4;

              return (
                <SpotlightCard
                  key={cat.title}
                  className={`${isFullWidth ? 'sm:col-span-2' : ''} p-4 sm:p-4.5 rounded-xl bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] space-y-3 shadow-2xs hover:border-black/30 dark:hover:border-white/30 transition-colors duration-200 flex flex-col justify-between`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[9px] font-mono text-[#71717A] uppercase font-bold">
                      <div className="flex items-center gap-1.5">
                        {cat.icon}
                        <span>{cat.title}</span>
                      </div>
                      <span className="font-mono text-[#A1A1AA]">[{cat.index}]</span>
                    </div>
                    <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] font-sans leading-relaxed">
                      {cat.detail}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#ECEEF2] dark:border-white/5">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-[#F4F4F6] dark:bg-[#18191E] border border-[#E2E4E8] dark:border-[#27272A] text-[#09090B] dark:text-[#EDEDED] font-mono text-[10.5px] font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              );
            })}
          </div>

          {/* ── LIVE INTERACTIVE APPLIED ML LAB (DECISION BOUNDARY PERCEPTRON) ── */}
          <div id="ml-lab" className="pt-2">
            <NeuralPlayground />
          </div>

        </div>
      )}

      {/* ── 02 CREATIVE MATRIX (NATURAL & UNPRETENTIOUS) ── */}
      {activeTab === 'passions' && (
        <div className="space-y-4 transition-opacity duration-300">
          
          {/* Grounded Editorial Header */}
          <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] space-y-2 select-none shadow-2xs">
            <div className="flex items-center justify-between font-mono text-[9.5px] tracking-widest uppercase text-[#71717A] dark:text-[#A1A1AA]">
              <span>VISUAL DISCIPLINE &amp; CREATIVE ORBIT</span>
              <span>NIT JALANDHAR FMC</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold font-sans tracking-tight text-[#09090B] dark:text-white">
              Visual rigor and proportion, executed with engineering discipline.
            </h3>
            <p className="text-xs sm:text-[13px] text-[#52525B] dark:text-[#A1A1AA] leading-relaxed font-sans max-w-2xl">
              Stage movement and runway modeling with NIT Jalandhar FMC, structured garment architecture, and disciplined mindfulness routines that keep technical execution grounded.
            </p>
          </div>

          {/* 4 Creative Dimensions (2x2 Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {creativeDimensions.map((p) => (
              <SpotlightCard
                key={p.title}
                className="p-4 sm:p-4.5 rounded-xl bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] space-y-3 shadow-2xs hover:border-black/30 dark:hover:border-white/30 transition-colors duration-200 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[9px] font-mono text-[#71717A] uppercase font-bold">
                    <div className="flex items-center gap-1.5">
                      {p.icon}
                      <span>{p.title}</span>
                    </div>
                    <span className="font-mono text-[#A1A1AA]">[{p.index}]</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#09090B] dark:text-white font-sans">
                    {p.subtitle}
                  </h4>
                  <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] leading-relaxed font-sans">
                    {p.detail}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#ECEEF2] dark:border-white/5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-[#F4F4F6] dark:bg-[#18191E] border border-[#E2E4E8] dark:border-[#27272A] text-[#09090B] dark:text-[#EDEDED] font-mono text-[10px] font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            ))}
          </div>

          {/* FMC Runway & Architectural Lookbook Visual Strip */}
          <EditorialLookbookStrip />

        </div>
      )}

    </section>
  );
}
