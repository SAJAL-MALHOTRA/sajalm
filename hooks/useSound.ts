'use client';

import { useState, useEffect, useCallback } from 'react';

class WebAudioSynth {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public playTone(freq: number, type: OscillatorType = 'square', duration: number = 0.08, volume: number = 0.05) {
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

      // Critical node cleanup on ended to prevent oscillator leaks
      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {
          // Disconnection safety
        }
      };
    } catch {
      // Audio safety
    }
  }

  public playHover() {
    this.playTone(380, 'square', 0.05, 0.025);
  }

  public playClick() {
    this.playTone(520, 'square', 0.08, 0.035);
  }

  public playModalOpen() {
    this.playTone(440, 'triangle', 0.08, 0.04);
  }
}

const audioSynth = new WebAudioSynth();

let globalAudioEnabled = false;
const listeners = new Set<(enabled: boolean) => void>();

function setGlobalAudio(enabled: boolean) {
  globalAudioEnabled = enabled;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('sajdex_audio_enabled', enabled ? 'true' : 'false');
    } catch {}
  }
  listeners.forEach((fn) => fn(enabled));
}

export function useSound() {
  const [enabled, setEnabled] = useState(globalAudioEnabled);

  useEffect(() => {
    const cached = typeof window !== 'undefined' ? localStorage.getItem('sajdex_audio_enabled') : null;
    if (cached !== null) {
      const val = cached === 'true';
      if (val !== globalAudioEnabled) {
        globalAudioEnabled = val;
      }
      setEnabled(val);
    }

    const listener = (val: boolean) => setEnabled(val);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const toggleSound = useCallback(() => {
    const next = !globalAudioEnabled;
    setGlobalAudio(next);
    if (next) {
      audioSynth.playClick();
    }
  }, []);

  const playHover = useCallback(() => {
    if (globalAudioEnabled) audioSynth.playHover();
  }, []);

  const playClick = useCallback(() => {
    if (globalAudioEnabled) audioSynth.playClick();
  }, []);

  const playModalOpen = useCallback(() => {
    if (globalAudioEnabled) audioSynth.playModalOpen();
  }, []);

  return {
    enabled,
    toggleSound,
    playHover,
    playClick,
    playModalOpen,
  };
}
