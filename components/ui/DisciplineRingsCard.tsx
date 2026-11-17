'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Terminal, Layers } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

interface Pillar {
  id: string;
  index: string;
  title: string;
  share: number; // Percentage of engineering focus (50 + 30 + 20 = 100)
  role: string;
  proof: string;
  stack: string;
  color: string;
  darkColor: string;
  icon: React.ReactNode;
}

const PILLARS: Pillar[] = [
  {
    id: 'systems',
    index: '01',
    title: 'Systems & Real-Time',
    share: 50,
    role: 'High-concurrency architectures, distributed state, and WebSockets/WebRTC signaling.',
    proof: '4 Shipped Production Systems',
    stack: 'Next.js 16 · Supabase · PostgreSQL RLS · WebSockets',
    color: '#09090B',
    darkColor: '#F4F4F6',
    icon: <Code2 size={13} />,
  },
  {
    id: 'ml',
    index: '02',
    title: 'Applied Machine Learning',
    share: 30,
    role: 'Computer vision backbones, heterogeneous ensembles, and dual-channel hybrid RAG.',
    proof: 'Top 7% ML Challenge Ranking',
    stack: 'PyTorch · ResNet-34 · BM25 + Dense RRF · Groq',
    color: '#059669',
    darkColor: '#10B981',
    icon: <Cpu size={13} />,
  },
  {
    id: 'foundations',
    index: '03',
    title: 'CS Foundations & Core',
    share: 20,
    role: 'Theoretical rigor, operating system concurrency, memory layout, and database internals.',
    proof: 'NIT Jalandhar IT \'29 Coursework',
    stack: 'Data Structures · OS Concurrency · DBMS · Linux',
    color: '#0284C7',
    darkColor: '#38BDF8',
    icon: <Terminal size={13} />,
  },
];

export default function DisciplineRingsCard() {
  const [activePillar, setActivePillar] = useState<string | null>(null);
  const { playHover, playClick } = useSound();

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] shadow-2xs space-y-4 select-none">
      
      {/* ── CARD HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#ECEEF2] dark:border-[#22242B] gap-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="font-bold font-mono text-[11px] text-[#09090B] dark:text-white uppercase tracking-wider">
            TECHNICAL DOMAIN ALLOCATION
          </span>
          <span className="text-[#D4D4D8] dark:text-[#3F3F46]">/</span>
          <span className="text-[10.5px] font-mono text-[#71717A] dark:text-[#A1A1AA]">
            ENGINEERING FOCUS
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10.5px] font-mono text-[#71717A] dark:text-[#A1A1AA]">
          <Layers size={11} className="text-[#71717A]" />
          <span>100% BANDWIDTH ALLOCATION</span>
        </div>
      </div>

      {/* ── GROUNDED SPECTRUM ALLOCATION BAR (SUM = 100%) ── */}
      <div className="space-y-1.5 pt-1">
        <div className="w-full h-2 rounded-full bg-[#ECEEF2] dark:bg-[#1C1D24] overflow-hidden flex gap-0.5 p-0.5">
          {PILLARS.map((p) => {
            const isHovered = activePillar === p.id;
            const hasOtherHovered = activePillar !== null && !isHovered;

            return (
              <motion.div
                key={p.id}
                initial={{ width: 0 }}
                whileInView={{ width: `${p.share}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => {
                  playHover();
                  setActivePillar(p.id);
                }}
                onMouseLeave={() => setActivePillar(null)}
                className="h-full rounded-full cursor-pointer transition-opacity duration-200"
                style={{
                  backgroundColor: p.color,
                  opacity: hasOtherHovered ? 0.35 : 1,
                }}
                title={`${p.title}: ${p.share}% engineering focus`}
              />
            );
          })}
        </div>

        {/* Proportional Segment Legend */}
        <div className="flex items-center justify-between text-[10.5px] font-mono text-[#71717A] dark:text-[#A1A1AA] px-0.5">
          {PILLARS.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                playClick();
                setActivePillar(activePillar === p.id ? null : p.id);
              }}
              onMouseEnter={() => {
                playHover();
                setActivePillar(p.id);
              }}
              onMouseLeave={() => setActivePillar(null)}
              className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                activePillar === p.id
                  ? 'text-[#09090B] dark:text-white font-bold'
                  : 'hover:text-[#09090B] dark:hover:text-white'
              }`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: p.color }}
              />
              <span className="hidden xs:inline">{p.title}</span>
              <span className="font-semibold">{p.share}%</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── 3-COLUMN ARCHITECTURE MATRIX (CLEAN, AIRY, UNCLUTTERED) ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
        {PILLARS.map((pillar) => {
          const isSelected = activePillar === pillar.id;

          return (
            <div
              key={pillar.id}
              onMouseEnter={() => {
                playHover();
                setActivePillar(pillar.id);
              }}
              onMouseLeave={() => setActivePillar(null)}
              onClick={() => {
                playClick();
                setActivePillar(activePillar === pillar.id ? null : pillar.id);
              }}
              className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-2.5 ${
                isSelected
                  ? 'bg-[#F9F9FB] dark:bg-[#17181F] border-black/30 dark:border-white/30 shadow-xs scale-[1.01]'
                  : 'bg-[#FAFAFC] dark:bg-[#131418] border-[#E2E4E8] dark:border-[#22242B] hover:border-black/20 dark:hover:border-white/20'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-[#09090B] dark:text-white font-bold">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: pillar.color }}
                    />
                    <span className="text-[12px] font-sans">{pillar.title}</span>
                  </div>
                  <span className="text-[10px] text-[#71717A] dark:text-[#A1A1AA] font-bold">
                    {pillar.share}%
                  </span>
                </div>

                <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] font-sans leading-relaxed">
                  {pillar.role}
                </p>
              </div>

              {/* Grounded Metric & Proof Tag */}
              <div className="pt-2 border-t border-[#ECEEF2] dark:border-white/5 space-y-1.5 font-mono text-[10.5px]">
                <div className="flex items-center justify-between text-[#09090B] dark:text-[#EDEDED] font-semibold">
                  <span className="truncate">{pillar.proof}</span>
                </div>
                <div className="text-[10px] text-[#71717A] dark:text-[#8E92A2] truncate">
                  {pillar.stack}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
