'use client';

import React, { useState } from 'react';
import UptimeCard, { type UptimeService } from '@/components/kokonutui/uptime-card';
import { useSound } from '@/hooks/useSound';
import { Activity, ChevronDown, ChevronUp, Server, ShieldCheck } from 'lucide-react';

const SAJAL_SERVICES: UptimeService[] = [
  {
    name: 'Pairfect (WebRTC Signaling Mesh)',
    incidents: {
      76: {
        title: 'STUN/TURN relay bandwidth saturation in ap-south-1',
        status: 'degraded',
        minutes: 14,
        updates: [
          { time: '16:10', label: 'Investigating', note: 'ICE negotiation latency spiked by 35ms.' },
          { time: '16:18', label: 'Mitigated', note: 'Autoscaled TURN fallback relay pool.' },
          { time: '16:24', label: 'Resolved', note: 'ICE connection latency returned to p95 < 28ms.' },
        ],
      },
    },
  },
  {
    name: 'DevDex (Distributed Identity Keystore)',
    incidents: {},
  },
  {
    name: 'Cybernauts (Sandboxed CTF Execution Engine)',
    incidents: {
      32: {
        title: 'Docker cgroup memory limits triggered in challenge runtime',
        status: 'degraded',
        minutes: 18,
        updates: [
          { time: '02:14', label: 'Investigating', note: 'Binary exploitation jail memory pressure.' },
          { time: '02:26', label: 'Mitigated', note: 'Recycled worker pool & upgraded sandbox container swap.' },
          { time: '02:32', label: 'Resolved', note: 'Container spin-up time normalized to < 180ms.' },
        ],
      },
    },
  },
  {
    name: 'Fastly & GitHub Edge CDN Relay',
    incidents: {},
  },
];

export default function SystemHealthMonitor() {
  const [isOpen, setIsOpen] = useState(false);
  const { playClick } = useSound();

  const handleToggle = () => {
    playClick();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-full rounded-xl bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] overflow-hidden shadow-2xs transition-all">
      {/* Header Bar */}
      <button
        type="button"
        onClick={handleToggle}
        className="w-full px-4 sm:px-5 py-3.5 flex items-center justify-between text-left hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors cursor-pointer select-none"
      >
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <Activity size={14} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-[13px] font-bold font-sans text-[#09090B] dark:text-white">
                Production System Health &amp; Telemetry
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            </div>
            <p className="text-[11px] font-mono text-[#71717A] dark:text-[#A1A1AA]">
              99.98% 90-day availability · 4 active distributed services
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#71717A] dark:text-[#A1A1AA]">
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-[10.5px]">
            {isOpen ? 'COLLAPSE' : 'INSPECT 90-DAY UPTIME'}
          </span>
          {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </div>
      </button>

      {/* Collapsible Telemetry Panel */}
      {isOpen && (
        <div className="px-3 sm:px-5 pb-5 pt-3 border-t border-[#E2E4E8] dark:border-[#22242B] space-y-3">
          {/* Latency & Reliability Telemetry Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[11px]">
            <div className="p-2 rounded-lg bg-[#F8F9FA] dark:bg-[#16171B] border border-[#E2E4E8] dark:border-[#22242B]">
              <div className="text-[9px] uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA]">Latency (p50 / p99)</div>
              <div className="text-xs font-bold text-[#09090B] dark:text-white mt-0.5">18ms / 76ms</div>
            </div>
            <div className="p-2 rounded-lg bg-[#F8F9FA] dark:bg-[#16171B] border border-[#E2E4E8] dark:border-[#22242B]">
              <div className="text-[9px] uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA]">Edge Cache Hit</div>
              <div className="text-xs font-bold text-[#09090B] dark:text-white mt-0.5">98.4%</div>
            </div>
            <div className="p-2 rounded-lg bg-[#F8F9FA] dark:bg-[#16171B] border border-[#E2E4E8] dark:border-[#22242B]">
              <div className="text-[9px] uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA]">Master Clock Drift</div>
              <div className="text-xs font-bold text-[#09090B] dark:text-white mt-0.5">&lt;0.5ms</div>
            </div>
            <div className="p-2 rounded-lg bg-[#F8F9FA] dark:bg-[#16171B] border border-[#E2E4E8] dark:border-[#22242B]">
              <div className="text-[9px] uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA]">Deployment Status</div>
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">ALL HEALTHY</div>
            </div>
          </div>

          <div className="pt-1">
            <UptimeCard
              title="Infrastructure Telemetry Status"
              services={SAJAL_SERVICES}
              days={90}
              className="border-0 shadow-none p-0 bg-transparent"
            />
          </div>
        </div>
      )}
    </div>
  );
}
