'use client';

import { useState } from 'react';
import { skills } from '@/data/skills';
import { profile } from '@/data/profile';
import { Code2, Palette, Cpu, Layers, Disc3, Compass, Camera } from 'lucide-react';

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
      title: 'Spirituality, Mindfulness & Grounded Focus',
      category: 'Inner Balance & Discipline',
      detail: 'Grounding high-tempo engineering sprints with daily meditation, mindfulness, and philosophical reflection. Cultivating deep inner stillness, intentional focus, and mental calm amidst rapid execution and complex systems.',
      tags: ['Mindfulness', 'Inner Balance', 'Meditation', 'Mental Discipline'],
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
            03 // THE DUAL SPECTRUM · ARSENAL &amp; CREATIVE ORBIT
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-[#09090B] dark:text-white tracking-tight">
            Skills, Passions &amp; What Drives Me
          </h2>
        </div>

        {/* Tab Toggle */}
        <div className="w-full sm:w-auto grid grid-cols-2 sm:flex items-center gap-1 p-1 rounded-xl bg-[#ECEEF2] dark:bg-[#16171B] border border-[#D1D5DB] dark:border-[#27272A] text-xs font-mono">
          <button
            onClick={() => setActiveTab('tech')}
            className={`flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-1 rounded-lg transition-all cursor-pointer text-center text-[11px] sm:text-xs ${
              activeTab === 'tech'
                ? 'bg-black text-white dark:bg-white dark:text-black font-bold shadow-xs'
                : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white'
            }`}
          >
            <Cpu size={12} className="shrink-0" />
            <span className="truncate">Technical ({skills.categories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('passions')}
            className={`flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-1 rounded-lg transition-all cursor-pointer text-center text-[11px] sm:text-xs ${
              activeTab === 'passions'
                ? 'bg-black text-white dark:bg-white dark:text-black font-bold shadow-xs'
                : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white'
            }`}
          >
            <Palette size={12} className="shrink-0" />
            <span className="truncate">Passions ({aestheticPassions.length})</span>
          </button>
        </div>
      </div>

      {/* ── TECHNICAL ARSENAL TAB (PERFECTLY BALANCED 5-CARD MATRIX) ── */}
      {activeTab === 'tech' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3.5">
          {skills.categories.map((cat, idx) => {
            const spanClass =
              idx < 3
                ? 'md:col-span-1 lg:col-span-2'
                : idx === 4
                ? 'md:col-span-2 lg:col-span-3'
                : 'md:col-span-1 lg:col-span-3';

            return (
              <div
                key={cat.title}
                className={`${spanClass} p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#101115] border border-[#E2E4E8] dark:border-[#22242B] space-y-3 shadow-xs hover:border-black/30 dark:hover:border-white/30 transition-all flex flex-col justify-between`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[9px] font-mono text-[#71717A] uppercase font-bold">
                    <span>{cat.title}</span>
                    <span className="font-mono text-[#A1A1AA]">[{String(idx + 1).padStart(2, '0')}]</span>
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
            );
          })}
        </div>
      )}

      {/* ── CREATIVE & MINDFUL PASSIONS TAB ── */}
      {activeTab === 'passions' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {aestheticPassions.map((p, idx) => {
            const getPassionIcon = (cat: string) => {
              if (cat.includes('Fashion')) return <Layers size={12} className="text-[#71717A] dark:text-[#A1A1AA]" />;
              if (cat.includes('Stage')) return <Camera size={12} className="text-[#71717A] dark:text-[#A1A1AA]" />;
              if (cat.includes('Inner')) return <Compass size={12} className="text-[#71717A] dark:text-[#A1A1AA]" />;
              return <Disc3 size={12} className="text-[#71717A] dark:text-[#A1A1AA]" />;
            };

            return (
              <div
                key={p.title}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#101115] border border-[#E2E4E8] dark:border-[#22242B] space-y-3 shadow-xs hover:border-black/30 dark:hover:border-white/30 transition-all flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[9px] font-mono text-[#71717A] uppercase font-bold">
                    <div className="flex items-center gap-1.5">
                      {getPassionIcon(p.category)}
                      <span>{p.category}</span>
                    </div>
                    <span className="font-mono text-[#A1A1AA]">[{String(idx + 1).padStart(2, '0')}]</span>
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
            );
          })}
        </div>
      )}

    </section>
  );
}
