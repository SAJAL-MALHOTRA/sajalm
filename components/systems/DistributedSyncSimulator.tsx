'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSound } from '@/hooks/useSound';
import {
  Activity,
  Server,
  Zap,
  Radio,
  Sliders,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface SimulatedNode {
  id: string;
  name: string;
  role: string;
  basePing: number;
  currentPing: number;
  drift: number;
  status: 'SYNCHRONIZED' | 'ABSORBING' | 'AUTHORITATIVE';
}

export default function DistributedSyncSimulator() {
  const { playClick, playHover } = useSound();

  const [jitterMs, setJitterMs] = useState(45);
  const [isSpiking, setIsSpiking] = useState(false);
  const [epochTime, setEpochTime] = useState(0);
  const [packetsDelivered, setPacketsDelivered] = useState(1482);
  const [lastBuzzerWinner, setLastBuzzerWinner] = useState<string | null>(null);

  const [nodes, setNodes] = useState<SimulatedNode[]>([
    { id: 'NODE-01', name: 'Duel Desk A', role: 'Participant Client', basePing: 22, currentPing: 22, drift: 0.12, status: 'SYNCHRONIZED' },
    { id: 'NODE-02', name: 'Duel Desk B', role: 'Participant Client', basePing: 34, currentPing: 34, drift: 0.28, status: 'SYNCHRONIZED' },
    { id: 'NODE-03', name: '4K Stage Display', role: 'Arena Projector Mesh', basePing: 14, currentPing: 14, drift: 0.05, status: 'AUTHORITATIVE' },
    { id: 'NODE-04', name: 'Host Command', role: 'Referee Console', basePing: 28, currentPing: 28, drift: 0.19, status: 'SYNCHRONIZED' },
  ]);

  // High-precision authoritative epoch ticker simulation
  useEffect(() => {
    let animationFrameId: number;
    let lastTick = performance.now();

    const loop = (now: number) => {
      setEpochTime((prev) => (prev + Math.round(now - lastTick)) % 1000000);
      lastTick = now;
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Periodic packet telemetry update
  useEffect(() => {
    const timer = setInterval(() => {
      setPacketsDelivered((p) => p + 4);
      setNodes((prevNodes) =>
        prevNodes.map((n) => {
          const noise = (Math.random() - 0.5) * jitterMs * 0.4;
          const ping = Math.max(12, Math.round(n.basePing + (isSpiking ? 480 + Math.random() * 220 : noise)));
          // Authoritative epoch buffer keeps drift sub-millisecond even during ping spikes
          const drift = Number((Math.random() * 0.35).toFixed(2));
          return {
            ...n,
            currentPing: ping,
            drift,
            status: isSpiking ? 'ABSORBING' : n.role.includes('Projector') ? 'AUTHORITATIVE' : 'SYNCHRONIZED',
          };
        })
      );
    }, 450);

    return () => clearInterval(timer);
  }, [jitterMs, isSpiking]);

  const handleTriggerSpike = () => {
    playClick();
    setIsSpiking(true);
    setTimeout(() => {
      setIsSpiking(false);
    }, 2800);
  };

  const handleSimulateBuzzer = () => {
    playClick();
    // Simulate simultaneous buzzer press with network skew
    // Authoritative server timestamp decides the true winner regardless of client ping
    const deskATime = Date.now() + nodes[0].currentPing;
    const deskBTime = Date.now() + nodes[1].currentPing - 18; // Desk B physically pressed 18ms earlier
    const winner = deskBTime < deskATime ? 'Duel Desk B (Epoch win: -18ms)' : 'Duel Desk A (Epoch win: -8ms)';
    setLastBuzzerWinner(winner);
  };

  return (
    <div className="w-full rounded-2xl bg-white dark:bg-[#0E1015] border border-[#E2E4E8] dark:border-[#22242B] p-4 sm:p-6 shadow-sm space-y-5 select-none font-sans">
      
      {/* ── HEADER & LIVE STATUS ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E4E8] dark:border-[#22242B] gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Radio size={13} className="text-emerald-600 dark:text-emerald-400 animate-pulse" />
            </div>
            <span className="text-xs sm:text-[13px] font-bold text-[#09090B] dark:text-white uppercase tracking-tight">
              Live Architecture Demo // Authoritative Master Clock
            </span>
          </div>
          <p className="text-[11.5px] font-mono text-[#71717A] dark:text-[#A1A1AA]">
            Cybernauts Arena &amp; Pairfect Jitter Buffer Mesh (<span className="text-emerald-600 dark:text-emerald-400">Zero Client Skew</span>)
          </p>
        </div>

        {/* Global Authoritative Time Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 rounded-lg bg-[#F4F4F6] dark:bg-[#15171E] border border-[#E2E4E8] dark:border-[#27272A] font-mono text-xs">
          <Clock size={12} className="text-emerald-500 shrink-0" />
          <span className="text-[11px] text-[#71717A] dark:text-[#A1A1AA]">EPOCH:</span>
          <span className="font-bold text-[#09090B] dark:text-white tracking-widest">
            {epochTime.toString().padStart(6, '0')}ms
          </span>
        </div>
      </div>

      {/* ── SERVER MASTER & CONNECTED DESKS GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-stretch">
        
        {/* Authoritative Server Node (md:col-span-4) */}
        <div className="md:col-span-4 p-4 rounded-xl bg-[#F8F9FA] dark:bg-[#13151B] border border-[#E2E4E8] dark:border-[#252833] flex flex-col justify-between space-y-3">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA]">
              <span className="uppercase tracking-wider font-bold">MASTER ARBITER</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                ROOT EPOCH
              </span>
            </div>
            <h4 className="text-sm font-bold text-[#09090B] dark:text-white font-sans flex items-center gap-1.5">
              <Server size={14} className="text-emerald-500" />
              <span>Express.js Time Server</span>
            </h4>
            <p className="text-[11.5px] text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
              Broadcasts absolute monotonic timestamps to eliminate host OS clock drift during intense physical buzzer rounds.
            </p>
          </div>

          <div className="pt-2 border-t border-[#ECEEF2] dark:border-white/5 space-y-1.5 text-[11px] font-mono">
            <div className="flex justify-between text-[#71717A] dark:text-[#A1A1AA]">
              <span>Jitter Buffer Window:</span>
              <span className="font-semibold text-[#09090B] dark:text-white">2,500ms</span>
            </div>
            <div className="flex justify-between text-[#71717A] dark:text-[#A1A1AA]">
              <span>Packets Dispatched:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {packetsDelivered.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-[#71717A] dark:text-[#A1A1AA]">
              <span>Protocol:</span>
              <span className="font-semibold text-[#09090B] dark:text-white">WebSocket Mesh</span>
            </div>
          </div>
        </div>

        {/* 4 Connected Desks / Nodes (md:col-span-8) */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {nodes.map((node) => (
            <div
              key={node.id}
              className={`p-3 rounded-xl border transition-all duration-200 flex flex-col justify-between space-y-2 ${
                isSpiking
                  ? 'bg-amber-500/[0.04] dark:bg-amber-500/[0.06] border-amber-500/30'
                  : 'bg-white dark:bg-[#13151B] border-[#E2E4E8] dark:border-[#252833]'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-[#71717A] dark:text-[#A1A1AA] font-bold">[{node.id}]</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[9.5px] font-bold uppercase tracking-wide ${
                    isSpiking
                      ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                      : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {node.status}
                </span>
              </div>

              <div>
                <div className="text-xs font-bold text-[#09090B] dark:text-white font-sans">
                  {node.name}
                </div>
                <div className="text-[10.5px] font-mono text-[#71717A] dark:text-[#A1A1AA]">
                  {node.role}
                </div>
              </div>

              <div className="pt-2 border-t border-[#ECEEF2] dark:border-white/5 flex items-center justify-between font-mono text-[11px]">
                <div className="flex items-center gap-1 text-[#71717A] dark:text-[#A1A1AA]">
                  <span>Ping:</span>
                  <span
                    className={`font-semibold ${
                      node.currentPing > 150
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-[#09090B] dark:text-white'
                    }`}
                  >
                    {node.currentPing}ms
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[#71717A] dark:text-[#A1A1AA]">
                  <span>Drift:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    &lt;{node.drift}ms
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── INTERACTIVE CONTROLS: JITTER SLIDER & CHAOS BUTTONS ── */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-[#F8F9FA] dark:bg-[#13151B] border border-[#E2E4E8] dark:border-[#252833] space-y-3 font-mono text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[#09090B] dark:text-white font-semibold">
            <Sliders size={13} className="text-emerald-500" />
            <span>Interactive Stress Controls:</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#71717A] dark:text-[#A1A1AA]">Simulated Wi-Fi Variance:</span>
            <span className="text-xs font-bold text-[#09090B] dark:text-white">±{jitterMs}ms</span>
          </div>
        </div>

        {/* Jitter Slider */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-[#71717A] dark:text-[#A1A1AA]">15ms (Fiber)</span>
          <input
            type="range"
            min="15"
            max="400"
            step="5"
            value={jitterMs}
            onChange={(e) => setJitterMs(Number(e.target.value))}
            className="flex-1 h-1.5 bg-[#E2E4E8] dark:bg-[#27272A] rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <span className="text-[10px] text-[#71717A] dark:text-[#A1A1AA]">400ms (Crowded Hall)</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            onClick={handleTriggerSpike}
            disabled={isSpiking}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
              isSpiking
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-400'
                : 'bg-white hover:bg-[#ECEEF2] dark:bg-[#1A1C23] dark:hover:bg-[#252833] border-[#E2E4E8] dark:border-[#2B2E3B] text-[#09090B] dark:text-white'
            }`}
          >
            <AlertTriangle size={12} className={isSpiking ? 'animate-bounce text-amber-500' : ''} />
            <span>{isSpiking ? 'Buffer Absorbing +600ms Spike...' : 'Simulate 600ms Wi-Fi Spike'}</span>
          </button>

          <button
            type="button"
            onClick={handleSimulateBuzzer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#09090B] hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-[#09090B] text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
          >
            <Zap size={12} />
            <span>Simulate Simultaneous Buzzer Duel</span>
          </button>

          {lastBuzzerWinner && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
              <CheckCircle2 size={12} />
              <span>{lastBuzzerWinner}</span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
