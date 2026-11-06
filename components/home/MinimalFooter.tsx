'use client';

import { useState, useEffect } from 'react';
import { useSound } from '@/hooks/useSound';
import InteractiveCat from '@/components/ui/InteractiveCat';
import { ArrowUp } from 'lucide-react';

const API_BASE = 'https://countapi.mileshilliard.com/api/v1';
const KEY = 'sajal_malhotra_sajalm';

export default function MinimalFooter() {
  const { playClick } = useSound();
  const [visitorCount, setVisitorCount] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const cached = typeof window !== 'undefined'
      ? localStorage.getItem('sajalm-visitor-count')
      : null;
    if (cached) {
      const num = parseInt(cached, 10);
      if (!isNaN(num) && num < 10000) {
        setVisitorCount(String(num));
      }
    }

    async function syncCount(isInitial = false) {
      try {
        const hasCountedSession = typeof window !== 'undefined' &&
          sessionStorage.getItem('sajalm-session-hit');

        const endpoint = (isInitial && !hasCountedSession)
          ? `${API_BASE}/hit/${KEY}`
          : `${API_BASE}/get/${KEY}`;

        const res = await fetch(endpoint, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.value !== 'undefined' && isMounted) {
            const realVal = String(data.value);
            setVisitorCount(realVal);
            localStorage.setItem('sajalm-visitor-count', realVal);
            if (isInitial && !hasCountedSession) {
              sessionStorage.setItem('sajalm-session-hit', '1');
            }
          }
        }
      } catch {
        // Offline / network fallback
      }
    }

    syncCount(true);
    const interval = setInterval(() => syncCount(false), 30000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <footer className="w-full max-w-[780px] mx-auto z-30 pt-10 pb-12 select-none shrink-0 space-y-8 font-mono text-xs px-4 sm:px-6">
      
      {/* ── THIN ARCHITECTURAL DIVIDER ── */}
      <div className="w-full border-t border-[#E2E4E8] dark:border-[#22242B]" />

      {/* ── CHARMING INTERACTIVE CAT (TOUCH TO DANCE, OPT-IN AUDIO) ── */}
      <div className="w-full flex flex-col items-center justify-center pb-4">
        <InteractiveCat size={110} />
      </div>

      {/* ── EDITORIAL SIGNATURE & CREATIVE THESIS ── */}
      <div className="p-5 rounded-xl bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] space-y-3 text-left">
        <div className="text-[9.5px] uppercase tracking-widest text-[#71717A] dark:text-[#A1A1AA] font-bold">
          06 // THE SIGNATURE · CREATIVE THESIS
        </div>

        <div className="space-y-1 font-sans">
          <p className="text-sm sm:text-base font-bold text-[#09090B] dark:text-white leading-snug">
            Precision in systems. Intention in everything.
          </p>
          <p className="text-xs text-[#52525B] dark:text-[#A1A1AA]">
            An engineer by discipline. A creative by instinct. A builder by choice.
          </p>
        </div>

        <div className="pt-2 border-t border-[#ECEEF2] dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between text-[10.5px] text-[#71717A] dark:text-[#A1A1AA] gap-2">
          <span>SAJAL MALHOTRA · JALANDHAR, INDIA</span>
          <span>NIT JALANDHAR IT &apos;29 · CGPA 8.13</span>
        </div>
      </div>

      {/* ── BOTTOM UTILITY STRIP ── */}
      <div className="flex items-center justify-between text-[11px] text-[#71717A] dark:text-[#A1A1AA] pt-2">
        <div className="flex items-center">
          <span>Made with</span>
          <span className="text-[#EF4444] dark:text-[#F87171] mx-1 text-sm font-normal select-none">♡</span>
          <span>in Jalandhar.</span>
        </div>

        <div className="flex items-center gap-4">
          {visitorCount && (
            <span className="text-[10.5px] text-[#A1A1AA]">
              {visitorCount} visitors
            </span>
          )}

          <a
            href="#intro"
            onClick={playClick}
            className="flex items-center gap-1 hover:text-[#09090B] dark:hover:text-white transition-colors cursor-pointer font-bold"
            title="Scroll to Top"
          >
            <span>Top</span>
            <ArrowUp size={11} />
          </a>
        </div>
      </div>

    </footer>
  );
}
