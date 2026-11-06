'use client';

import { useState } from 'react';
import { useSound } from '@/hooks/useSound';
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
  Music,
  Sparkles,
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
      title: 'Sartorial Eye',
      subtitle: 'Silhouette, proportion, restraint',
      icon: <Layers size={13} className="text-[#71717A] dark:text-[#A1A1AA]" />,
      detail: 'Curating structured silhouettes: dark leather blousons, pleated wool trousers, minimalist hardware, and intentional monochrome tones. Wardrobe treated with the exact same architectural rigor as software systems.',
      tags: ['Archival Tailoring', 'Leather Blouson', 'Pleated Trousers', 'Monochrome'],
    },
    {
      index: '02',
      title: 'Runway & Stage Direction',
      subtitle: 'Presence and visual direction',
      icon: <Camera size={13} className="text-[#71717A] dark:text-[#A1A1AA]" />,
      detail: 'Core runway and editorial model for the NIT Jalandhar Fashion & Modelling Club (NITJ FMC). Commanding stage choreography, high-contrast visual framing, and digital creative direction with over 220,000+ monthly impressions.',
      tags: ['NITJ FMC', 'Runway Choreography', 'Editorial Shoots', 'Visual Direction'],
    },
    {
      index: '03',
      title: 'Stillness & Mindfulness',
      subtitle: 'Clarity beyond the screen',
      icon: <Compass size={13} className="text-[#71717A] dark:text-[#A1A1AA]" />,
      detail: 'Grounding high-velocity engineering sprints with daily meditation, contemplation, and philosophical calm. Cultivating deep inner stillness and mental clarity amidst rapid execution.',
      tags: ['Mindfulness', 'Inner Balance', 'Daily Meditation', 'Grounded Focus'],
    },
    {
      index: '04',
      title: 'Sound & Sensory Orbit',
      subtitle: 'An orbit of musical influences',
      icon: <Disc3 size={13} className="text-[#71717A] dark:text-[#A1A1AA]" />,
      detail: 'Deep focus rotations featuring Frank Ocean, Travis Scott, Aphex Twin, Dijon, and atmospheric ambient electronics. Sound shapes the rhythm and velocity of every codebase built.',
      tags: ['Frank Ocean', 'Aphex Twin', 'Ambient Soundscapes', 'Focus Rotations'],
    },
  ];

  const audioRotations = [
    {
      artist: 'Frank Ocean',
      tracks: 'White Ferrari · Nights · In My Room',
      mood: 'Nocturnal focus & aesthetic clarity',
    },
    {
      artist: 'Aphex Twin',
      tracks: '#3 (Rhubarb) · Alberto Balsalm · Avril 14th',
      mood: 'Deep algorithmic & systems flow',
    },
    {
      artist: 'Travis Scott',
      tracks: 'Telekinesis · My Eyes · Skeletons',
      mood: 'High-tempo engineering execution',
    },
    {
      artist: 'Dijon',
      tracks: 'The Dress · Many Times · Big Mike\'s',
      mood: 'Organic warmth & analog texture',
    },
  ];

  return (
    <section id="skills" className="w-full max-w-[780px] mx-auto py-8 text-left select-none space-y-6">
      
      {/* ── SECTION HEADER & TWO-STATE INTERACTIVE MATRIX SWITCHER ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E2E4E8] dark:border-[#22242A] pb-3 gap-3">
        <div className="space-y-1">
          <div className="text-[9.5px] font-mono text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-widest">
            04 // THE DUAL SPECTRUM · TWO SIDES. ONE PERSPECTIVE.
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-sans text-[#09090B] dark:text-white tracking-tight">
            Two sides. One perspective.
          </h2>
        </div>

        {/* Interactive Matrix Tab Switcher */}
        <div className="w-full sm:w-auto grid grid-cols-2 sm:flex items-center gap-1 p-1 rounded-xl bg-[#ECEEF2] dark:bg-[#16171B] border border-[#D1D5DB] dark:border-[#27272A] text-xs font-mono">
          <button
            onClick={() => {
              playClick();
              setActiveTab('tech');
            }}
            onMouseEnter={playHover}
            className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer text-center text-[11px] sm:text-xs ${
              activeTab === 'tech'
                ? 'bg-black text-white dark:bg-white dark:text-black font-bold shadow-xs'
                : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white'
            }`}
          >
            <Cpu size={12} className="shrink-0" />
            <span>01 Engineering</span>
          </button>

          <button
            onClick={() => {
              playClick();
              setActiveTab('passions');
            }}
            onMouseEnter={playHover}
            className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer text-center text-[11px] sm:text-xs ${
              activeTab === 'passions'
                ? 'bg-black text-white dark:bg-white dark:text-black font-bold shadow-xs'
                : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white'
            }`}
          >
            <Palette size={12} className="shrink-0" />
            <span>02 Creative orbit</span>
          </button>
        </div>
      </div>

      {/* ── 01 ENGINEERING MATRIX (TECHNICAL INDEX) ── */}
      {activeTab === 'tech' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 transition-opacity duration-300">
          {technicalCategories.map((cat, idx) => {
            const isFullWidth = idx === 4;

            return (
              <div
                key={cat.title}
                className={`${isFullWidth ? 'sm:col-span-2' : ''} p-4 sm:p-4.5 rounded-xl bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] space-y-3 shadow-2xs hover:border-black/30 dark:hover:border-white/30 transition-all flex flex-col justify-between`}
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
              </div>
            );
          })}
        </div>
      )}

      {/* ── 02 CREATIVE ORBIT MATRIX (VISUAL MAGAZINE SPREAD) ── */}
      {activeTab === 'passions' && (
        <div className="space-y-4 transition-opacity duration-300">
          
          {/* Magazine Editorial Masthead */}
          <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] space-y-2 select-none shadow-2xs">
            <div className="flex items-center justify-between font-mono text-[9.5px] tracking-widest uppercase text-[#71717A] dark:text-[#A1A1AA]">
              <span>MAGAZINE ISSUE 01 // AESTHETIC CONVICTION</span>
              <span>NIT JALANDHAR FMC</span>
            </div>
            <h3 className="text-base sm:text-lg font-black font-sans tracking-tight text-[#09090B] dark:text-white">
              Wardrobe, silhouette and visual direction curated with the exact same architectural rigor as code.
            </h3>
            <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] leading-relaxed font-sans max-w-2xl">
              High-contrast monochrome silhouettes, disciplined runway presence with 220,000+ monthly views, and quiet mental stillness amidst high-velocity systems engineering.
            </p>
          </div>

          {/* 4 Creative Dimensions (2x2 Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {creativeDimensions.map((p) => (
              <div
                key={p.title}
                className="p-4 sm:p-4.5 rounded-xl bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] space-y-3 shadow-2xs hover:border-black/30 dark:hover:border-white/30 transition-all flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[9px] font-mono text-[#71717A] uppercase font-bold">
                    <div className="flex items-center gap-1.5">
                      {p.icon}
                      <span>{p.title}</span>
                    </div>
                    <span className="font-mono text-[#A1A1AA]">[{p.index}]</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#09090B] dark:text-white font-sans">
                    {p.subtitle}
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

          {/* Curated Personal Listening Archive */}
          <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] space-y-3 shadow-2xs">
            <div className="flex items-center justify-between font-mono text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-wider font-bold">
              <span className="flex items-center gap-1.5">
                <Music size={13} className="text-emerald-500" />
                <span>PERSONAL LISTENING ARCHIVE // SOUNDSCAPES OF FOCUS</span>
              </span>
              <span>4 ROTATIONS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {audioRotations.map((track) => (
                <div
                  key={track.artist}
                  className="p-3 rounded-lg bg-[#F9F9FB] dark:bg-[#16181F] border border-[#E2E4E8] dark:border-[#22242B] space-y-1"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-[#09090B] dark:text-white font-mono">
                    <span>{track.artist}</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-black/5 dark:bg-white/5 text-[#71717A] dark:text-[#A1A1AA]">
                      ACTIVE
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
                    {track.tracks}
                  </div>
                  <div className="text-[10px] text-[#71717A] dark:text-[#A1A1AA] font-sans">
                    {track.mood}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </section>
  );
}
