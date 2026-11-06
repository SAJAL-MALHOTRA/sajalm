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
    <footer className="w-full max-w-[780px] mx-auto z-30 pt-4 pb-12 select-none shrink-0 space-y-8 px-4 sm:px-6">
      
      {/* ── 05 SECTION: THE COLOPHON & SIGNATURE (MATCHING SECTION 04 ARCHITECTURE) ── */}
      <section id="colophon" className="w-full text-left space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E2E4E8] dark:border-[#22242B] pb-3 gap-3">
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-widest font-semibold">
              05 // THE COLOPHON &amp; SIGNATURE
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-sans text-[#09090B] dark:text-white tracking-tight">
              Precision in systems. Intention in everything.
            </h2>
          </div>

          <span className="text-xs font-mono text-[#71717A] dark:text-[#A1A1AA] self-start sm:self-auto">
            SAJAL MALHOTRA · 2026
          </span>
        </div>

        <p className="text-sm text-[#52525B] dark:text-[#A1A1AA] font-sans leading-relaxed max-w-2xl">
          An engineer by discipline. A creative by instinct. A builder by choice. Developing systems with architectural integrity and visual clarity.
        </p>

        {/* Symmetrical 2-Card Grid (Exact Match to Section 04) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Card 1: Education & Location */}
          <div className="p-5 rounded-xl bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] space-y-4 shadow-2xs flex flex-col justify-between hover:border-black/30 dark:hover:border-white/30 transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[9.5px] font-mono text-[#71717A] uppercase font-bold">
                <span>01 // EDUCATION &amp; LOCATION</span>
                <span className="text-emerald-600 dark:text-emerald-400">● B.TECH IT &apos;29</span>
              </div>

              <h3 className="text-base font-bold text-[#09090B] dark:text-white font-sans">
                NIT Jalandhar
              </h3>

              <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] leading-relaxed font-sans">
                Dr. B. R. Ambedkar National Institute of Technology Jalandhar (Punjab, India). Focus on distributed architecture, algorithms, and applied machine learning.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#ECEEF2] dark:border-white/5 font-mono text-[10.5px]">
              <span className="px-2 py-0.5 rounded-md bg-[#F4F4F6] dark:bg-[#18191E] border border-[#E2E4E8] dark:border-[#27272A] text-[#09090B] dark:text-[#EDEDED]">
                CGPA 8.13
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#F4F4F6] dark:bg-[#18191E] border border-[#E2E4E8] dark:border-[#27272A] text-[#09090B] dark:text-[#EDEDED]">
                Jalandhar, Punjab
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#F4F4F6] dark:bg-[#18191E] border border-[#E2E4E8] dark:border-[#27272A] text-[#09090B] dark:text-[#EDEDED]">
                Class of 2029
              </span>
            </div>
          </div>

          {/* Card 2: Colophon & Technical Spec */}
          <div className="p-5 rounded-xl bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] space-y-4 shadow-2xs flex flex-col justify-between hover:border-black/30 dark:hover:border-white/30 transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[9.5px] font-mono text-[#71717A] uppercase font-bold">
                <span>02 // COLOPHON &amp; SPECIFICATION</span>
                <span className="text-[#71717A] dark:text-[#A1A1AA]">VERIFIED SPEC</span>
              </div>

              <h3 className="text-base font-bold text-[#09090B] dark:text-white font-sans">
                Next.js · TypeScript · Tailwind CSS
              </h3>

              <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] leading-relaxed font-sans">
                Architected with Next.js 16, TypeScript, Tailwind CSS, and Web Audio API. Strictly two complementary typefaces: Inter and JetBrains Mono.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#ECEEF2] dark:border-white/5 font-mono text-[10.5px]">
              <span className="px-2 py-0.5 rounded-md bg-[#F4F4F6] dark:bg-[#18191E] border border-[#E2E4E8] dark:border-[#27272A] text-[#09090B] dark:text-[#EDEDED]">
                Inter &amp; JetBrains Mono
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#F4F4F6] dark:bg-[#18191E] border border-[#E2E4E8] dark:border-[#27272A] text-[#09090B] dark:text-[#EDEDED]">
                Open to Winter &apos;26 &amp; Summer &apos;27 opportunities
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ── CHARMING INTERACTIVE CAT (TOUCH TO DANCE, OPT-IN AUDIO) ── */}
      <div className="w-full flex flex-col items-center justify-center pt-2">
        <InteractiveCat size={110} />
      </div>

      {/* ── BOTTOM UTILITY STRIP ── */}
      <div className="flex items-center justify-between text-[11px] font-mono text-[#71717A] dark:text-[#A1A1AA] pt-4 border-t border-[#E2E4E8] dark:border-[#22242B]">
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
