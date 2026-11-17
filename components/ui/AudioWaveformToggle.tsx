'use client';

import React from 'react';
import { useSound } from '@/hooks/useSound';

export default function AudioWaveformToggle() {
  const { enabled, toggleSound } = useSound();

  return (
    <button
      onClick={toggleSound}
      className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg border transition-all cursor-pointer font-mono text-xs select-none shadow-2xs ${
        enabled
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
          : 'bg-white hover:bg-[#ECEEF2] dark:bg-[#121316] dark:hover:bg-[#1E1F24] border-[#E2E4E8] dark:border-[#22242B] text-[#71717A] dark:text-[#A1A1AA]'
      }`}
      title={enabled ? 'Mute Web Audio Synthesizer' : 'Enable Web Audio Synthesizer (Opt-in sound effects)'}
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
                ? 'bg-emerald-500 animate-pulse'
                : 'bg-neutral-400 dark:bg-neutral-600'
            }`}
            style={{
              height: enabled ? bar.activeH : bar.baseH,
              animationDelay: bar.delay,
            }}
          />
        ))}
      </div>

      <span className="text-[9.5px] font-bold">
        {enabled ? 'SFX ON' : 'SFX'}
      </span>
    </button>
  );
}
