'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tradeoff } from '@/data/projects';
import { useSound } from '@/hooks/useSound';
import KeycapBadge from '@/components/ui/KeycapBadge';
import { GitCompare, Columns, Minus, Plus, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ArchitectureDiffViewerProps {
  tradeoffs: Tradeoff[];
  projectName?: string;
}

export default function ArchitectureDiffViewer({
  tradeoffs,
  projectName = 'SYSTEM',
}: ArchitectureDiffViewerProps) {
  const [viewMode, setViewMode] = useState<'diff' | 'split'>('diff');
  const { playClick, playHover } = useSound();

  if (!tradeoffs || tradeoffs.length === 0) {
    return null;
  }

  return (
    <div className="w-full space-y-4 font-sans select-none">
      
      {/* ── CONTROLS & HEADER STRIP ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-[#E2E4E8] dark:border-[#22242B]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#09090B] dark:text-white uppercase">
            <GitCompare size={13} className="text-emerald-500" />
            <span>Architecture Diff Inspector</span>
          </div>
          <KeycapBadge size="xs" className="hidden sm:inline-flex">DIFF</KeycapBadge>
        </div>

        {/* Kokonut UI Fluid Spring View Mode Toggle */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[#ECEEF2] dark:bg-[#16171B] border border-[#D1D5DB] dark:border-[#27272A] text-xs font-mono self-start sm:self-auto relative">
          <button
            onClick={() => {
              playClick();
              setViewMode('diff');
            }}
            onMouseEnter={playHover}
            className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] cursor-pointer transition-colors ${
              viewMode === 'diff'
                ? 'text-black dark:text-white font-bold'
                : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white'
            }`}
          >
            {viewMode === 'diff' && (
              <motion.div
                layoutId="diffModeTab"
                className="absolute inset-0 rounded-md bg-white dark:bg-[#27272A] shadow-xs"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1">
              <GitCompare size={11} />
              <span>Unified Diff</span>
            </span>
          </button>

          <button
            onClick={() => {
              playClick();
              setViewMode('split');
            }}
            onMouseEnter={playHover}
            className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] cursor-pointer transition-colors ${
              viewMode === 'split'
                ? 'text-black dark:text-white font-bold'
                : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white'
            }`}
          >
            {viewMode === 'split' && (
              <motion.div
                layoutId="diffModeTab"
                className="absolute inset-0 rounded-md bg-white dark:bg-[#27272A] shadow-xs"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1">
              <Columns size={11} />
              <span>Side-by-Side</span>
            </span>
          </button>
        </div>
      </div>

      {/* ── ARCHITECTURAL DIFF CARDS ── */}
      <div className="space-y-4">
        {tradeoffs.map((t, idx) => (
          <div
            key={t.decision}
            className="rounded-xl bg-[#FAFAFC] dark:bg-[#0D0F13] border border-[#E2E4E8] dark:border-[#22242B] overflow-hidden shadow-2xs space-y-0"
          >
            {/* Git-like Diff Commit / Decision Header */}
            <div className="px-3.5 py-2 bg-[#F1F3F6] dark:bg-[#13151B] border-b border-[#E2E4E8] dark:border-[#22242B] flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#71717A] dark:text-[#A1A1AA] text-[10px]">
                  diff --git a/arch/{projectName.toLowerCase().replace(/[^a-z0-9]/g, '-')}/spec-0{idx + 1}.ts
                </span>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5 text-[9.5px] text-[#71717A] dark:text-[#A1A1AA] uppercase">
                Tradeoff #{idx + 1}
              </span>
            </div>

            {/* Git Chunk Header */}
            <div className="px-3.5 py-1.5 bg-[#E8EBF0]/50 dark:bg-[#101217] border-b border-[#E2E4E8]/60 dark:border-white/5 font-mono text-[10.5px] text-[#71717A] dark:text-[#7A7F8D]">
              @@ -1,1 +1,1 @@ Decision: {t.decision}
            </div>

            {/* ── UNIFIED DIFF VIEW ── */}
            {viewMode === 'diff' ? (
              <div className="divide-y divide-[#E2E4E8]/50 dark:divide-white/5 font-mono text-xs">
                {/* Red Deletion Line: Rejected Baseline Alternative */}
                <div className="p-3 sm:p-3.5 bg-rose-50/70 dark:bg-rose-950/20 border-l-[3px] border-rose-500 space-y-1">
                  <div className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400 font-bold text-[11px]">
                    <Minus size={12} className="shrink-0 stroke-[3]" />
                    <span className="uppercase text-[10px] tracking-wider px-1.5 py-0.2 rounded bg-rose-500/10">
                      REJECTED BASELINE
                    </span>
                    <span className="font-semibold">{t.alternative}</span>
                  </div>
                  <div className="pl-4 text-[11.5px] text-[#6E3B46] dark:text-rose-200/80 font-sans leading-relaxed">
                    Bottleneck: Inferior latency, clock drift, or security boundaries unacceptable for production.
                  </div>
                </div>

                {/* Green Addition Line: Chosen Production Decision */}
                <div className="p-3 sm:p-3.5 bg-emerald-50/70 dark:bg-emerald-950/20 border-l-[3px] border-emerald-500 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold text-[11px]">
                    <Plus size={12} className="shrink-0 stroke-[3]" />
                    <span className="uppercase text-[10px] tracking-wider px-1.5 py-0.2 rounded bg-emerald-500/10">
                      PRODUCTION DECISION
                    </span>
                    <span className="font-semibold">{t.decision}</span>
                  </div>
                  <div className="pl-4 text-[12px] text-[#1E5638] dark:text-emerald-200/90 font-sans leading-relaxed font-medium">
                    Architectural Rationale: {t.why}
                  </div>
                </div>
              </div>
            ) : (
              /* ── SIDE-BY-SIDE SPLIT VIEW ── */
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#E2E4E8] dark:divide-[#22242B] font-mono text-xs">
                {/* Left Side: Rejected Baseline */}
                <div className="p-3.5 bg-rose-50/40 dark:bg-rose-950/15 space-y-2 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400 font-bold text-[10.5px]">
                      <AlertCircle size={12} className="shrink-0" />
                      <span className="uppercase tracking-wider">REJECTED ALTERNATIVE</span>
                    </div>
                    <div className="font-bold text-xs text-[#09090B] dark:text-white font-mono">
                      {t.alternative}
                    </div>
                    <p className="text-[11.5px] font-sans text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
                      Evaluated during initial benchmark and abandoned due to measured operational overhead or performance bottlenecks.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-rose-200/50 dark:border-rose-900/30 text-[9.5px] text-rose-600 dark:text-rose-400 font-bold uppercase">
                    Status: Discarded
                  </div>
                </div>

                {/* Right Side: Chosen Production Decision */}
                <div className="p-3.5 bg-emerald-50/40 dark:bg-emerald-950/15 space-y-2 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold text-[10.5px]">
                      <CheckCircle2 size={12} className="shrink-0" />
                      <span className="uppercase tracking-wider">CHOSEN ARCHITECTURE</span>
                    </div>
                    <div className="font-bold text-xs text-[#09090B] dark:text-white font-mono">
                      {t.decision}
                    </div>
                    <p className="text-[11.5px] font-sans text-[#1E5638] dark:text-emerald-200 leading-relaxed font-medium">
                      {t.why}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-emerald-200/50 dark:border-emerald-900/30 text-[9.5px] text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                    Status: Verified in Production
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
