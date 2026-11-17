'use client';

import { useState, useEffect, useCallback } from 'react';

export type SoundMode = 'topre' | 'synth';

class WebAudioEngine {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /**
   * Topre / Mechanical Keyboard Tactile Thock
   * Combines high-Q noise transient (stem strike) + low resonant body sine (housing thock)
   */
  public playTopreClick() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;

      // 1. Low Thock Resonance (Housing Body)
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, t);
      osc.frequency.exponentialRampToValueAtTime(45, t + 0.045);

      oscGain.gain.setValueAtTime(0.08, t);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.05);

      // 2. High Tactile Click Transient (Stem Leaf Noise)
      const bufferSize = ctx.sampleRate * 0.015;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2200, t);
      filter.Q.setValueAtTime(3.5, t);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.045, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.015);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noise.start(t);
      noise.stop(t + 0.02);
    } catch {
      // Audio safety
    }
  }

  public playTopreHover() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, t);
      osc.frequency.exponentialRampToValueAtTime(280, t + 0.025);

      gain.gain.setValueAtTime(0.02, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.03);
    } catch {}
  }

  /**
   * Cybernetics Synthesizer Mode (Clean harmonic square/triangle chime)
   */
  public playSynthTone(freq: number, type: OscillatorType = 'square', duration = 0.08, volume = 0.035) {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);

      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {}
      };
    } catch {}
  }
}

const audioEngine = new WebAudioEngine();

let globalAudioEnabled = false;
let globalSoundMode: SoundMode = 'topre';
const listeners = new Set<(enabled: boolean, mode: SoundMode) => void>();

function notifyListeners() {
  listeners.forEach((fn) => fn(globalAudioEnabled, globalSoundMode));
}

export function useSound() {
  const [enabled, setEnabled] = useState(globalAudioEnabled);
  const [mode, setMode] = useState<SoundMode>(globalSoundMode);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const cachedEnabled = localStorage.getItem('sajdex_audio_enabled');
        if (cachedEnabled !== null) {
          globalAudioEnabled = cachedEnabled === 'true';
          setEnabled(globalAudioEnabled);
        }

        const cachedMode = localStorage.getItem('sajdex_sound_mode') as SoundMode | null;
        if (cachedMode === 'topre' || cachedMode === 'synth') {
          globalSoundMode = cachedMode;
          setMode(cachedMode);
        }
      } catch {}
    }

    const listener = (newEnabled: boolean, newMode: SoundMode) => {
      setEnabled(newEnabled);
      setMode(newMode);
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  // Cycles: Mute -> Topre Mechanical -> Cyber Synth -> Mute
  const cycleAudioMode = useCallback(() => {
    let nextEnabled = globalAudioEnabled;
    let nextMode = globalSoundMode;

    if (!globalAudioEnabled) {
      nextEnabled = true;
      nextMode = 'topre';
    } else if (globalSoundMode === 'topre') {
      nextEnabled = true;
      nextMode = 'synth';
    } else {
      nextEnabled = false;
      nextMode = 'topre';
    }

    globalAudioEnabled = nextEnabled;
    globalSoundMode = nextMode;

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('sajdex_audio_enabled', nextEnabled ? 'true' : 'false');
        localStorage.setItem('sajdex_sound_mode', nextMode);
      } catch {}
    }

    notifyListeners();

    if (nextEnabled) {
      if (nextMode === 'topre') audioEngine.playTopreClick();
      else audioEngine.playSynthTone(587.33, 'triangle', 0.1, 0.05); // Musical D5
    }
  }, []);

  const playClick = useCallback(() => {
    if (!globalAudioEnabled) return;
    if (globalSoundMode === 'topre') {
      audioEngine.playTopreClick();
    } else {
      audioEngine.playSynthTone(520, 'square', 0.08, 0.035);
    }
  }, []);

  const playHover = useCallback(() => {
    if (!globalAudioEnabled) return;
    if (globalSoundMode === 'topre') {
      audioEngine.playTopreHover();
    } else {
      audioEngine.playSynthTone(380, 'square', 0.05, 0.02);
    }
  }, []);

  const playModalOpen = useCallback(() => {
    if (!globalAudioEnabled) return;
    if (globalSoundMode === 'topre') {
      audioEngine.playTopreClick();
    } else {
      audioEngine.playSynthTone(440, 'triangle', 0.08, 0.04);
    }
  }, []);

  return {
    enabled,
    mode,
    cycleAudioMode,
    toggleSound: cycleAudioMode,
    playHover,
    playClick,
    playModalOpen,
  };
}
