'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/data/projects';
import { X, ExternalLink, Code2, ShieldCheck, Cpu, GitBranch, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'tradeoffs' | 'outcomes'>('overview');
  const { playClick, playHover } = useSound();

  // Reset tab on project open
  useEffect(() => {
    if (project) {
      setActiveTab('overview');
    }
  }, [project]);

  // ESC key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const liveUrl = project.liveUrl || project.demo;
  const githubUrl = project.githubUrl || project.github;

  return (
    <AnimatePresence>
      <div
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/60 dark:bg-black/85 backdrop-blur-md overflow-y-auto font-sans"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.97, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 8 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="relative w-full max-w-[720px] bg-white dark:bg-[#0E0F12] border border-[#E2E4E8] dark:border-[#22242B] rounded-2xl p-5 sm:p-7 shadow-2xl space-y-5 my-auto max-h-[90vh] overflow-y-auto text-[#09090B] dark:text-[#EDEDED]"
        >
          {/* ── TOP HEADER ── */}
          <div className="flex items-start justify-between border-b border-[#E2E4E8] dark:border-[#22242B] pb-4 gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="font-bold text-[#71717A] dark:text-[#A1A1AA]">
                  #{project.id}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-[#E2E4E8] dark:border-[#22242B] text-emerald-600 dark:text-emerald-400 font-semibold text-[10px]">
                  ● {project.status}
                </span>
                <span className="text-[#A1A1AA] hidden sm:inline">·</span>
                <span className="text-[#71717A] dark:text-[#A1A1AA] hidden sm:inline">
                  {project.subtitle}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#09090B] dark:text-white tracking-tight uppercase">
                {project.name}
              </h2>
            </div>

            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="p-1.5 rounded-full bg-[#F4F4F6] hover:bg-[#EAECEF] border border-[#D1D5DB] text-[#52525B] hover:text-[#09090B] dark:bg-[#16181F] dark:border-[#27272A] dark:text-[#A1A1AA] dark:hover:text-white transition-colors cursor-pointer shrink-0"
              title="Close (Esc)"
            >
              <X size={15} />
            </button>
          </div>

          {/* ── ARCHITECTURAL CASE STUDY TABS ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 rounded-xl bg-[#F4F4F6] dark:bg-[#14161C] border border-[#E2E4E8] dark:border-[#22242B] text-xs font-mono">
            {[
              { id: 'overview', label: '01 Overview' },
              { id: 'architecture', label: '02 Architecture' },
              { id: 'tradeoffs', label: '03 Tradeoffs' },
              { id: 'outcomes', label: '04 Outcomes' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  playClick();
                  setActiveTab(tab.id as typeof activeTab);
                }}
                onMouseEnter={playHover}
                className={`py-1.5 px-2 rounded-lg transition-all text-center text-[11px] font-medium cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-black text-white dark:bg-white dark:text-black font-bold shadow-xs'
                    : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── TAB 1: OVERVIEW & WHY BUILT ── */}
          {activeTab === 'overview' && (
            <div className="space-y-4 text-left">
              {project.whyBuilt && (
                <div className="space-y-1.5">
                  <span className="font-mono text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-wider font-bold">
                    WHY I BUILT THIS:
                  </span>
                  <p className="text-sm text-[#3F3F46] dark:text-[#D4D4D8] leading-relaxed font-sans">
                    {project.whyBuilt}
                  </p>
                </div>
              )}

              <div className="space-y-1.5 pt-2 border-t border-[#ECEEF2] dark:border-white/5">
                <span className="font-mono text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-wider font-bold">
                  THE CORE PROBLEM:
                </span>
                <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] leading-relaxed font-sans">
                  {project.problem}
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-[#ECEEF2] dark:border-white/5">
                <span className="font-mono text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-wider font-bold">
                  TECHNICAL SOLUTION &amp; EXECUTION:
                </span>
                <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] leading-relaxed font-sans">
                  {project.solution}
                </p>
              </div>

              {/* Technology Stack Tags */}
              <div className="space-y-1.5 pt-2 border-t border-[#ECEEF2] dark:border-white/5 font-mono text-xs">
                <span className="text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase font-bold block">
                  VERIFIED STACK COMPONENTS:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-md bg-[#F4F4F6] dark:bg-[#18191F] border border-[#E2E4E8] dark:border-[#27272A] text-[10.5px] text-[#09090B] dark:text-[#EDEDED]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 2: SYSTEM ARCHITECTURE DIAGRAM ── */}
          {activeTab === 'architecture' && (
            <div className="space-y-4 text-left">
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-wider font-bold">
                  SYSTEM ARCHITECTURE DIAGRAM &amp; DATA PIPELINE:
                </span>
                <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] font-sans">
                  End-to-end component flow across client, network transport, compute layer, and persistence engine.
                </p>
              </div>

              {project.architectureDiagram ? (
                <div className="p-4 rounded-xl bg-[#0C0E14] border border-[#222734] text-emerald-400 font-mono text-[11px] sm:text-xs overflow-x-auto whitespace-pre leading-relaxed shadow-inner">
                  {project.architectureDiagram}
                </div>
              ) : null}

              {project.abilities && (
                <div className="space-y-2 pt-2 border-t border-[#ECEEF2] dark:border-white/5 font-mono text-xs">
                  <span className="text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase font-bold block">
                    ARCHITECTURAL CAPABILITIES:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.abilities.map((a) => (
                      <div
                        key={a}
                        className="p-2.5 rounded-lg bg-[#F4F4F6] dark:bg-[#14151B] border border-[#E2E4E8] dark:border-[#22242B] flex items-center gap-2 text-xs"
                      >
                        <ShieldCheck size={13} className="text-emerald-500 shrink-0" />
                        <span className="text-[#09090B] dark:text-white font-medium">{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── TAB 3: TRADEOFFS & ENGINEERING CHALLENGES ── */}
          {activeTab === 'tradeoffs' && (
            <div className="space-y-3.5 text-left">
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-wider font-bold">
                  ARCHITECTURAL DECISIONS &amp; TRADEOFF ANALYSIS:
                </span>
                <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] font-sans">
                  Every engineering decision requires evaluating trade-offs between latency, consistency, and complexity.
                </p>
              </div>

              {project.tradeoffs && project.tradeoffs.length > 0 ? (
                <div className="space-y-3 font-sans">
                  {project.tradeoffs.map((t, idx) => (
                    <div
                      key={t.decision}
                      className="p-3.5 rounded-xl bg-white dark:bg-[#121318] border border-[#E2E4E8] dark:border-[#22242B] space-y-2 shadow-2xs"
                    >
                      <div className="flex items-center gap-2 text-xs font-bold font-mono text-[#09090B] dark:text-white">
                        <span className="w-4 h-4 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center text-[10px]">
                          {idx + 1}
                        </span>
                        <span>{t.decision}</span>
                      </div>
                      <div className="text-xs text-[#3F3F46] dark:text-[#D4D4D8] leading-relaxed">
                        <strong className="text-[#09090B] dark:text-white font-semibold">Why chosen: </strong>
                        {t.why}
                      </div>
                      <div className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] pt-1 border-t border-[#ECEEF2] dark:border-white/5 font-mono">
                        <span>Rejected alternative: {t.alternative}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#71717A]">No tradeoffs logged.</p>
              )}
            </div>
          )}

          {/* ── TAB 4: VERIFIED OUTCOMES & MEASURED BENCHMARKS ── */}
          {activeTab === 'outcomes' && (
            <div className="space-y-3.5 text-left">
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-wider font-bold">
                  MEASURED OUTCOMES &amp; BENCHMARK CONDITIONS:
                </span>
                <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] font-sans">
                  Defensible metrics accompanied by measurement methodology, hardware constraints, and sample distributions.
                </p>
              </div>

              {project.measuredOutcomes && project.measuredOutcomes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono">
                  {project.measuredOutcomes.map((m) => (
                    <div
                      key={m.metric}
                      className="p-3.5 rounded-xl bg-white dark:bg-[#121318] border border-[#E2E4E8] dark:border-[#22242B] space-y-1 shadow-2xs"
                    >
                      <div className="text-[9px] uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA] font-bold">
                        {m.metric}
                      </div>
                      <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-[#71717A] dark:text-[#A1A1AA] font-sans pt-1 border-t border-[#ECEEF2] dark:border-white/5">
                        {m.condition}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {project.bullets && (
                <div className="space-y-1.5 pt-2 border-t border-[#ECEEF2] dark:border-white/5 font-sans text-xs">
                  <span className="font-mono text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase font-bold block">
                    KEY MILESTONES &amp; DELIVERABLES:
                  </span>
                  <ul className="space-y-1.5 list-none pl-0 text-[#52525B] dark:text-[#A1A1AA]">
                    {project.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 size={12} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* ── ACTION CTAS BAR ── */}
          <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-[#E2E4E8] dark:border-[#22242B] font-mono text-xs">
            {liveUrl ? (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                className="flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-black hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black font-bold text-xs rounded-xl transition-all shadow-sm cursor-pointer"
              >
                <span>OPEN LIVE DEPLOYMENT</span>
                <ArrowUpRight size={13} />
              </a>
            ) : null}

            {githubUrl ? (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                className="flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#F4F4F6] hover:bg-[#EAECEF] dark:bg-[#14161C] dark:hover:bg-[#1E2028] text-[#09090B] dark:text-white border border-[#E2E4E8] dark:border-[#22242B] font-semibold text-xs rounded-xl transition-colors cursor-pointer"
              >
                <Code2 size={13} className="text-[#71717A] dark:text-[#A1A1AA]" />
                <span>INSPECT REPOSITORY</span>
                <ArrowUpRight size={12} className="text-[#71717A] dark:text-[#A1A1AA]" />
              </a>
            ) : null}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
