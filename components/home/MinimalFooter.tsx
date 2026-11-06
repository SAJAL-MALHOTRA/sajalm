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

      {/* ── EDITORIAL COLOPHON & ARCHITECTURAL SIGNATURE (UNBOXED & REFINED) ── */}
      <div className="w-full text-left space-y-6 pt-2">
        <div className="flex items-center justify-between text-[9.5px] uppercase tracking-widest text-[#71717A] dark:text-[#A1A1AA] font-bold border-b border-[#E2E4E8] dark:border-[#22242B] pb-2">
          <span>06 // THE COLOPHON · SIGNATURE</span>
          <span>SAJAL MALHOTRA · 2026</span>
        </div>

        {/* Sculptural Thesis Statement */}
        <div className="space-y-1.5 font-sans">
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#09090B] dark:text-white leading-snug">
            Precision in systems. Intention in everything.
          </h3>
          <p className="text-xs sm:text-sm text-[#71717A] dark:text-[#A1A1AA] leading-relaxed max-w-xl font-normal">
            An engineer by discipline. A creative by instinct. A builder by choice. Developing systems with architectural integrity and visual clarity.
          </p>
        </div>

        {/* Architectural Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#ECEEF2] dark:border-white/5 text-[10.5px] font-mono text-[#71717A] dark:text-[#A1A1AA]">
          <div className="space-y-1">
            <div className="text-[9px] uppercase tracking-wider text-[#A1A1AA] dark:text-[#71717A] font-bold">
              EDUCATION &amp; LOCATION
            </div>
            <div className="text-[#09090B] dark:text-white font-medium">
              NIT Jalandhar
            </div>
            <div>B.Tech Information Technology (2025–2029)</div>
            <div>Jalandhar, Punjab, India</div>
          </div>

          <div className="space-y-1">
            <div className="text-[9px] uppercase tracking-wider text-[#A1A1AA] dark:text-[#71717A] font-bold">
              COLOPHON
            </div>
            <div className="text-[#09090B] dark:text-white font-medium">
              Next.js · TypeScript · Tailwind CSS
            </div>
            <div>Typefaces: Inter &amp; JetBrains Mono</div>
            <div className="text-[#71717A] dark:text-[#A1A1AA] pt-0.5">
              Available for Summer &apos;26 &amp; Co-ops
            </div>
          </div>
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
