'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, Code2, Terminal } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

interface RingData {
  id: string;
  label: string;
  shortLabel: string;
  metric: string;
  percentage: number;
  color: string;
  darkColor: string;
  bgColor: string;
  icon: React.ReactNode;
}

const RINGS: RingData[] = [
  {
    id: 'systems',
    label: 'Systems Architecture',
    shortLabel: 'Systems',
    metric: 'Next.js 16 · Supabase · PostgreSQL RLS · WebSockets',
    percentage: 94,
    color: '#E11D48',
    darkColor: '#FB7185',
    bgColor: 'rgba(225, 29, 72, 0.15)',
    icon: <Code2 size={12} />,
  },
  {
    id: 'ml',
    label: 'Applied Machine Learning',
    shortLabel: 'Applied ML',
    metric: 'PyTorch · ResNet-34 · Hybrid RAG · Top 7% Challenge',
    percentage: 88,
    color: '#059669',
    darkColor: '#34D399',
    bgColor: 'rgba(5, 150, 105, 0.15)',
    icon: <Cpu size={12} />,
  },
  {
    id: 'foundations',
    label: 'CS Foundations & Algorithms',
    shortLabel: 'Foundations',
    metric: 'Data Structures · Operating Systems · Distributed Clocks',
    percentage: 85,
    color: '#0284C7',
    darkColor: '#38BDF8',
    bgColor: 'rgba(2, 132, 199, 0.15)',
    icon: <Terminal size={12} />,
  },
];

export default function DisciplineRingsCard() {
  const [activeRing, setActiveRing] = useState<string | null>(null);
  const { playHover, playClick } = useSound();

  // SVG parameters
  const size = 140;
  const strokeWidth = 10;
  const center = size / 2;

  // Ring radii
  const radii = [52, 38, 24];

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] shadow-2xs space-y-4 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <Activity size={13} className="text-emerald-500 animate-pulse" />
          <span className="font-bold text-[#09090B] dark:text-white uppercase tracking-wider text-[11px]">
            Technical Discipline Focus Rings
          </span>
        </div>
        <span className="text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase">
          Kokonut Activity Spec
        </span>
      </div>

      {/* Main Rings + Metrics Row */}
      <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
        
        {/* Concentric SVG Rings */}
        <div className="relative shrink-0 flex items-center justify-center">
          <svg width={size} height={size} className="transform -rotate-90">
            {RINGS.map((ring, idx) => {
              const r = radii[idx];
              const circumference = 2 * Math.PI * r;
              const offset = circumference - (ring.percentage / 100) * circumference;
              const isHovered = activeRing === ring.id;

              return (
                <g key={ring.id} className="transition-all duration-200">
                  {/* Background Track */}
                  <circle
                    cx={center}
                    cy={center}
                    r={r}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="none"
                    className="text-black/5 dark:text-white/5"
                  />
                  {/* Foreground Animated Ring */}
                  <motion.circle
                    cx={center}
                    cy={center}
                    r={r}
                    stroke={ring.color}
                    strokeWidth={isHovered ? strokeWidth + 2 : strokeWidth}
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    whileInView={{ strokeDashoffset: offset }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.2,
                      delay: idx * 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="cursor-pointer"
                    onMouseEnter={() => {
                      playHover();
                      setActiveRing(ring.id);
                    }}
                    onMouseLeave={() => setActiveRing(null)}
                  />
                </g>
              );
            })}
          </svg>

          {/* Center Indicator */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none font-mono">
            <span className="text-[10px] font-bold text-[#09090B] dark:text-white">
              {activeRing
                ? `${RINGS.find((r) => r.id === activeRing)?.percentage}%`
                : '3-AXIS'}
            </span>
            <span className="text-[8px] text-[#71717A] dark:text-[#A1A1AA] uppercase">
              {activeRing
                ? RINGS.find((r) => r.id === activeRing)?.shortLabel
                : 'FOCUS'}
            </span>
          </div>
        </div>

        {/* Legend / Metrics List */}
        <div className="flex-1 w-full space-y-2 font-sans">
          {RINGS.map((ring) => {
            const isHovered = activeRing === ring.id;

            return (
              <div
                key={ring.id}
                onMouseEnter={() => {
                  playHover();
                  setActiveRing(ring.id);
                }}
                onMouseLeave={() => setActiveRing(null)}
                onClick={playClick}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isHovered
                    ? 'bg-[#F4F4F6] dark:bg-[#18191E] border-black/20 dark:border-white/20 shadow-xs'
                    : 'bg-[#FAFAFC] dark:bg-[#141519] border-[#E2E4E8] dark:border-[#22242B]'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: ring.color }}
                    />
                    <span className="font-bold font-sans text-[#09090B] dark:text-white text-[12.5px]">
                      {ring.label}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-[#09090B] dark:text-white">
                    {ring.percentage}%
                  </span>
                </div>
                <div className="text-[11px] font-mono text-[#71717A] dark:text-[#A1A1AA] pt-1 truncate">
                  {ring.metric}
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
