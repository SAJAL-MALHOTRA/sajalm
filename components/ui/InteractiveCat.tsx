'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CatSvg } from './CatSvg';
import { CAT_SIT } from './catData';
import { MOSI_MOSI, LYRICS, AUDIO_SRC, AUDIO_START, HOOK_END, LyricLine } from './catDance';

const STORAGE_KEY_TOUCHED = 'sajalm_cat_touched';
const STORAGE_KEY_COUNT = 'sajalm_cat_touch_count';
const BADGE_PATH = 'sajalm.github.io.cat-touches';

interface FloatingParticle {
  id: number;
  char: string;
  x: number;
  y: number;
}

export default function InteractiveCat({
  size = 130,
  className = ''
}: {
  size?: number;
  className?: string;
}) {
  const [touchCount, setTouchCount] = useState<number | null>(null);
  const [isDancing, setIsDancing] = useState(false);
  const [danceStart, setDanceStart] = useState<number | null>(null);
  const [currentLyric, setCurrentLyric] = useState<LyricLine | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioBlocked, setAudioBlocked] = useState(false);
  const [expression, setExpression] = useState<'neutral' | 'happy' | 'sleepy' | 'surprised' | 'love'>('neutral');
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<FloatingParticle[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const sleepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasTouchedBefore = useRef<boolean>(false);

  // Clear running timeouts
  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  // Fetch / Sync Touch Counter
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      hasTouchedBefore.current = !!localStorage.getItem(STORAGE_KEY_TOUCHED);
      const cached = localStorage.getItem(STORAGE_KEY_COUNT);
      if (cached) {
        const val = parseInt(cached, 10);
        if (!isNaN(val)) setTouchCount(val);
      }
    } catch {}

    // Fetch genuine count from badge / visitor service
    async function fetchCount(increment = false) {
      try {
        const timestamp = Date.now();
        // visitorbadge increments on hit, or reading with cache-busting
        const url = `https://api.visitorbadge.io/api/visitors?path=${BADGE_PATH}&t=${timestamp}`;
        const res = await fetch(url);
        if (res.ok) {
          const svg = await res.text();
          const match = svg.match(/VISITORS:\s*(\d+)/i);
          if (match && match[1]) {
            const remoteVal = parseInt(match[1], 10);
            if (!isNaN(remoteVal)) {
              setTouchCount((prev) => {
                const finalVal = Math.max(prev ?? 0, remoteVal);
                try {
                  localStorage.setItem(STORAGE_KEY_COUNT, String(finalVal));
                } catch {}
                return finalVal;
              });
            }
          }
        }
      } catch {
        // Fallback to local count if offline
      }
    }

    fetchCount(false);
  }, []);

  // Idle cat behaviors: falls asleep if untouched, wakes up on activity
  useEffect(() => {
    const resetIdle = () => {
      if (isDancing) return;
      if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current);

      if (expression === 'sleepy') {
        setExpression('surprised');
        setTimeout(() => {
          setExpression('neutral');
        }, 800);
      }

      sleepTimerRef.current = setTimeout(() => {
        if (!isDancing) setExpression('sleepy');
      }, 24000);
    };

    resetIdle();
    window.addEventListener('pointermove', resetIdle, { passive: true });
    window.addEventListener('keydown', resetIdle);

    return () => {
      if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current);
      window.removeEventListener('pointermove', resetIdle);
      window.removeEventListener('keydown', resetIdle);
    };
  }, [isDancing, expression]);

  // Audio fade-out helper
  const fadeOutAudio = useCallback((durationMs = 800) => {
    const audio = audioRef.current;
    if (!audio || audio.paused) return;

    const startVol = audio.volume;
    const startTime = performance.now();
    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const progress = elapsed / durationMs;
      if (progress >= 1) {
        clearInterval(interval);
        audio.pause();
        audio.volume = startVol;
        setIsPlayingAudio(false);
      } else {
        audio.volume = Math.max(0, startVol * (1 - progress));
      }
    }, 40);
  }, []);

  // Stop Dance
  const endDance = useCallback(() => {
    clearAllTimers();
    fadeOutAudio(900);
    setIsDancing(false);
    setDanceStart(null);
    setCurrentLyric(null);
    setExpression('happy');

    const t = setTimeout(() => {
      setExpression('neutral');
    }, 1800);
    timersRef.current.push(t);
  }, [clearAllTimers, fadeOutAudio]);

  // Start Dance & Audio
  const startDance = useCallback(() => {
    clearAllTimers();
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    const audioUrl = `${basePath}${AUDIO_SRC}`;

    let audio = audioRef.current;
    if (!audio) {
      audio = new Audio(audioUrl);
      audioRef.current = audio;
    }

    audio.muted = isMuted;
    audio.currentTime = AUDIO_START;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlayingAudio(true);
          setAudioBlocked(false);
        })
        .catch(() => {
          // Autoplay blocked by browser policy without user gesture
          setIsPlayingAudio(false);
          setAudioBlocked(true);
        });
    }

    const startTimestamp = performance.now();
    setDanceStart(startTimestamp);
    setIsDancing(true);
    setExpression('neutral');

    // Schedule lyrics
    LYRICS.forEach((lyric) => {
      if (lyric.ja) {
        const timer = setTimeout(() => {
          setCurrentLyric(lyric);
        }, lyric.t * 1000);
        timersRef.current.push(timer);
      } else {
        const timer = setTimeout(() => {
          setCurrentLyric(null);
        }, lyric.t * 1000);
        timersRef.current.push(timer);
      }
    });

    // Schedule dance finish
    const danceEndTimer = setTimeout(() => {
      endDance();
    }, (MOSI_MOSI.duration + 0.1) * 1000);
    timersRef.current.push(danceEndTimer);
  }, [clearAllTimers, endDance, isMuted]);

  // Handle Touch/Click on Cat
  const handleTouchCat = useCallback(() => {
    // 1. Particle effect
    const chars = ['♪', '♫', '♥', '✨', '🐾'];
    const p: FloatingParticle = {
      id: Date.now() + Math.random(),
      char: chars[Math.floor(Math.random() * chars.length)],
      x: (Math.random() - 0.5) * 40,
      y: -20 - Math.random() * 20
    };
    setParticles((prev) => [...prev.slice(-6), p]);

    // 2. Increment touch counter immediately
    setTouchCount((prev) => {
      const next = (prev ?? 0) + 1;
      try {
        localStorage.setItem(STORAGE_KEY_COUNT, String(next));
        localStorage.setItem(STORAGE_KEY_TOUCHED, '1');
      } catch {}
      return next;
    });

    // 3. Ping visitorbadge to register global touch
    try {
      fetch(`https://api.visitorbadge.io/api/visitors?path=${BADGE_PATH}&t=${Date.now()}`).catch(() => {});
    } catch {}

    // 4. Start or restart the dance!
    startDance();
  }, [startDance]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      clearAllTimers();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [clearAllTimers]);

  // Toggle Mute
  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
  };

  // Re-attempt Audio Play if was blocked
  const unmuteAndPlay = () => {
    setIsMuted(false);
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
        setAudioBlocked(false);
      }).catch(() => {});
    }
  };

  // Format counter text
  const getCounterText = () => {
    if (touchCount === null) return 'checking the cat...';
    if (touchCount === 0) return 'nobody has touched the cat yet';
    if (touchCount === 1) return '1 person touched the cat';
    return `${touchCount.toLocaleString('en-US')} people touched the cat`;
  };

  const viewBox = [29, 204, 261, 309].join(' ');
  const aspectRatio = 261 / 309;
  const width = size * aspectRatio;

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center select-none ${className}`}
      onPointerEnter={() => {
        setIsHovered(true);
        if (!isDancing && expression !== 'sleepy') setExpression('love');
      }}
      onPointerLeave={() => {
        setIsHovered(false);
        if (!isDancing && expression !== 'sleepy') setExpression('neutral');
      }}
    >
      {/* ── SPEECH BUBBLE / LYRICS TOOLTIP ── */}
      <AnimatePresence>
        {isDancing && currentLyric && (
          <motion.div
            key={currentLyric.t}
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            className="absolute -top-16 z-30 pointer-events-none whitespace-nowrap"
          >
            <div
              className="relative px-3.5 py-1.5 text-center"
              style={{
                background: '#f7ebd7',
                color: '#060c18',
                border: '1.5px solid #172a46',
                borderRadius: '16px 8px 14px 10px / 9px 15px 8px 14px',
                boxShadow: '2px 3px 0 rgba(23, 42, 70, 0.25)'
              }}
            >
              <p
                lang="ja"
                className="text-[13px] font-bold leading-tight tracking-wide"
                style={{
                  fontFamily: '"Hiragino Maru Gothic ProN", "Noto Sans JP", sans-serif'
                }}
              >
                {currentLyric.ja}
              </p>
              {currentLyric.romaji && (
                <p className="mt-0.5 font-mono text-[10px] text-[#172a46]/80 leading-tight">
                  {currentLyric.romaji}
                </p>
              )}

              {/* Speech bubble pointer notch */}
              <div
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45"
                style={{
                  background: '#f7ebd7',
                  borderRight: '1.5px solid #172a46',
                  borderBottom: '1.5px solid #172a46'
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FLOATING PARTICLES (HEARTS & NOTES) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ opacity: 1, y: p.y, x: p.x, scale: 0.8 }}
            animate={{ opacity: 0, y: p.y - 45, scale: 1.4 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            onAnimationComplete={() => {
              setParticles((prev) => prev.filter((item) => item.id !== p.id));
            }}
            className="absolute left-1/2 top-4 -translate-x-1/2 text-sm text-[#EF4444] dark:text-[#F87171] font-bold"
          >
            {p.char}
          </motion.span>
        ))}
      </div>

      {/* ── THE INTERACTIVE CAT BUTTON ── */}
      <button
        type="button"
        onClick={handleTouchCat}
        aria-label="The cat. Press to watch it dance “mosi mosi?”"
        title="Touch the cat!"
        className="group relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white rounded-2xl transition-transform active:scale-95"
        style={{ width: `${width}px`, height: `${size}px` }}
      >
        <svg
          viewBox={viewBox}
          className="w-full h-full overflow-visible transition-transform duration-300 group-hover:scale-105"
          aria-hidden="true"
        >
          <CatSvg
            data={CAT_SIT}
            action="idle"
            gaze={isHovered ? 'pointer' : 'wander'}
            expression={expression}
            dance={isDancing ? MOSI_MOSI : null}
            danceStart={danceStart}
          />
        </svg>
      </button>

      {/* ── AUDIO TOGGLE CONTROLS ── */}
      <div className="mt-2 flex items-center justify-center min-h-[16px]">
        {isDancing ? (
          audioBlocked ? (
            <button
              type="button"
              onClick={unmuteAndPlay}
              className="font-mono text-[11px] text-amber-600 dark:text-amber-400 hover:underline cursor-pointer tracking-wider"
            >
              ♪ tap for sound
            </button>
          ) : (
            <button
              type="button"
              onClick={toggleMute}
              className="font-mono text-[11px] text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white transition-colors cursor-pointer tracking-wider"
            >
              {isMuted ? '♪ unmute' : '♪ mute'}
            </button>
          )
        ) : (
          <span className="font-mono text-[10px] text-[#A1A1AA] dark:text-[#71717A] opacity-70 group-hover:opacity-100 transition-opacity">
            touch the cat
          </span>
        )}
      </div>

      {/* ── TOUCH COUNTER CAPTION ── */}
      <p className="mt-1 font-mono text-[11px] text-[#71717A] dark:text-[#A1A1AA] tabular-nums whitespace-nowrap tracking-wide select-none">
        {getCounterText()}
      </p>
    </div>
  );
}
