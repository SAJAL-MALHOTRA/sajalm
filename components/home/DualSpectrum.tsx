'use client';

import { useState } from 'react';
import { skills } from '@/data/skills';
import { profile } from '@/data/profile';
import { Code2, Palette, Sparkles, Cpu, Layers, Disc3 } from 'lucide-react';

export default function DualSpectrum() {
  const [activeTab, setActiveTab] = useState<'tech' | 'passions'>('tech');

  const aestheticPassions = [
    {
      title: 'Archival Tailoring & Modern Silhouette',
      category: 'Fashion & Style',
      detail: 'Curating structured silhouettes: dark leather jackets, pleated wool trousers, minimalist hardware, and intentional earth tones. Viewing wardrobe design with the exact same architectural rigor as code.',
      tags: ['Leather Blouson', 'Pleated Trousers', 'Monochrome', 'Minimal Hardware'],
    },
    {
      title: 'Runway Modelling & Visual Direction',
      category: 'Stage & Media',
      detail: 'Core model for the NIT Jalandhar Fashion & Modelling Club. Active runway presence, editorial shoots, and digital creative direction commanding over 220,000 monthly impressions.',
      tags: ['220K+ Monthly Reach', 'Runway Choreography', 'Editorial Shoots', 'NITJ FMC'],
    },
    {
      title: 'Intentional Critical Overthinking',
      category: 'Engineering Philosophy',
      detail: 'Refusing to settle for "it works." Obsessively interrogating sub-50ms network roundtrips, race condition fallbacks, zero TypeScript warnings, and intuitive micro-interactions.',
      tags: ['Latency Profiling', 'Type-Safety', 'Resilient Architecture', 'Perfectionist'],
    },
    {
      title: 'Music Curation & Soundscapes',
      category: 'Sensory Orbit',
      detail: 'Deep focus rotations featuring Frank Ocean, Travis Scott, Aphex Twin, Dijon, and atmospheric ambient electronics. Music shapes the tempo of every software system built.',
      tags: ['Frank Ocean', 'Aphex Twin', 'Ambient Soundscapes', 'Focus Loops'],
    },
  ];

  return (
    <section id="skills" className="w-full max-w-5xl py-8 space-y-6 text-left select-none">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E2E4E8] dark:border-[#22242A] pb-3 gap-2">
        <div className="space-y-1">
          <div className="text-[9.5px] font-mono text-[#71717A] uppercase tracking-widest">
            THE DUAL SPECTRUM
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-[#09090B] dark:text-white tracking-tight">
            Skills, Passions &amp; What Drives Me
          </h2>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#ECEEF2] dark:bg-[#16171B] border border-[#D1D5DB] dark:border-[#27272A] text-xs font-mono self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('tech')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
              activeTab === 'tech'
                ? 'bg-black text-white dark:bg-white dark:text-black font-bold shadow-xs'
                : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white'
            }`}
          >
            <Cpu size={12} />
            <span>Technical Arsenal (4)</span>
          </button>

          <button
            onClick={() => setActiveTab('passions')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
              activeTab === 'passions'
                ? 'bg-black text-white dark:bg-white dark:text-black font-bold shadow-xs'
                : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white'
            }`}
          >
            <Palette size={12} />
            <span>Creative Passions (4)</span>
          </button>
        </div>
      </div>

      {/* ── TECHNICAL ARSENAL TAB ── */}
      {activeTab === 'tech' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {skills.categories.map((cat) => (
            <div
              key={cat.title}
              className="p-4 rounded-2xl bg-white dark:bg-[#101115] border border-[#E2E4E8] dark:border-[#22242B] space-y-3 shadow-xs hover:border-black/30 dark:hover:border-white/30 transition-all flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[9px] font-mono text-[#71717A] uppercase font-bold">
                  <span>{cat.title}</span>
                  <Code2 size={12} />
                </div>
                <div className="h-0.5 w-6 bg-black/40 dark:bg-white/40" />
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {cat.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 rounded-md bg-[#F4F4F6] dark:bg-[#18191E] border border-[#E2E4E8] dark:border-[#27272A] text-[#09090B] dark:text-[#EDEDED] font-mono text-[11px] font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="pt-2 border-t border-[#ECEEF2] dark:border-white/5 text-[9.5px] font-mono text-[#71717A]">
                NIT JALANDHAR // VERIFIED STACK
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── CREATIVE PASSIONS TAB ── */}
      {activeTab === 'passions' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {aestheticPassions.map((p) => (
            <div
              key={p.title}
              className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#101115] border border-[#E2E4E8] dark:border-[#22242B] space-y-3 shadow-xs hover:border-black/30 dark:hover:border-white/30 transition-all flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[9px] font-mono text-[#71717A] uppercase font-bold">
                  <span>{p.category}</span>
                  <Sparkles size={12} className="text-amber-500" />
                </div>
                <h3 className="text-base font-bold text-[#09090B] dark:text-white font-sans">
                  {p.title}
                </h3>
                <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] leading-relaxed font-sans">
                  {p.detail}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#ECEEF2] dark:border-white/5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-[#09090B] dark:text-white font-mono text-[10px] font-medium"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

    </section>
  );
}
