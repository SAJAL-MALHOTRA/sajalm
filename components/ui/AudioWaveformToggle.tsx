'use client';

import React from 'react';
import { useSound } from '@/hooks/useSound';
import { Volume2, VolumeX, Keyboard } from 'lucide-react';

export default function AudioWaveformToggle() {
  const { enabled, mode, cycleAudioMode } = useSound();

  return (
    <button
      onClick={cycleAudioMode}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer font-mono text-xs select-none shadow-2xs ${
        enabled
          ? mode === 'topre'
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
            : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400'
          : 'bg-white hover:bg-[#ECEEF2] dark:bg-[#121316] dark:hover:bg-[#1E1F24] border-[#E2E4E8] dark:border-[#22242B] text-[#71717A] dark:text-[#A1A1AA]'
      }`}
      title={
        enabled
          ? `Current Sound: ${mode === 'topre' ? 'Topre Mechanical Thock' : 'Cyber Synth'} · Click to cycle mode`
          : 'Enable Audio Feedback (Topre mechanical clicks & synth)'
      }
    >
      {/* Animated Waveform Equalizer Bars */}
      <div className="flex items-center gap-[2px] h-3">
        {[
          { baseH: '4px', activeH: '10px', delay: '0ms' },
          { baseH: '4px', activeH: '13px', delay: '120ms' },
          { baseH: '4px', activeH: '7px', delay: '240ms' },
          { baseH: '4px', activeH: '11px', delay: '360ms' },
        ].map((bar, i) => (
          <span
            key={i}
            className={`w-[2px] rounded-full transition-all duration-200 ${
              enabled
                ? mode === 'topre'
                  ? 'bg-emerald-500 animate-pulse'
                  : 'bg-cyan-500 animate-pulse'
                : 'bg-neutral-400 dark:bg-neutral-600'
            }`}
            style={{
              height: enabled ? bar.activeH : bar.baseH,
              animationDelay: bar.delay,
            }}
          />
        ))}
      </div>

      <span className="text-[10px] font-bold uppercase tracking-wider">
        {enabled ? (mode === 'topre' ? 'TOPRE' : 'SYNTH') : 'MUTE'}
      </span>
    </button>
  );
}
