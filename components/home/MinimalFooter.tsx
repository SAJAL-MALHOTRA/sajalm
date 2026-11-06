'use client';

import { useState, useEffect } from 'react';
import { useSound } from '@/hooks/useSound';
import InteractiveCat from '@/components/ui/InteractiveCat';

const API_BASE = 'https://countapi.mileshilliard.com/api/v1';
const KEY = 'sajal_malhotra_sajalm';

export default function MinimalFooter() {
  const { playClick } = useSound();
  const [visitorCount, setVisitorCount] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    // Load actual cached value if available (ignore legacy fabricated counts > 10000)
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
        // Offline / network failure
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
    <footer className="w-full max-w-5xl z-30 pt-10 pb-8 px-4 sm:px-6 border-t border-[#E2E4E8] dark:border-[#22242B] mt-16 font-sans text-xs sm:text-[13px] text-[#71717A] dark:text-[#A1A1AA] select-none shrink-0">
      {/* ── INTERACTIVE CAT EASTER EGG (TOUCH TO PLAY DANCE & SONG) ── */}
      <div className="w-full flex flex-col items-center justify-center pb-8 mb-6 border-b border-[#E2E4E8]/60 dark:border-[#22242B]/60">
        <InteractiveCat size={135} />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span>Made with</span>
          <span className="text-[#EF4444] dark:text-[#F87171] mx-1 text-sm font-normal select-none">♡</span>
          <span>in Jalandhar.</span>
        </div>

        <a
          href="#intro"
          onClick={playClick}
          className="flex items-center gap-1 hover:text-[#09090B] dark:hover:text-white transition-colors cursor-pointer"
          title="Scroll to Top"
        >
          {visitorCount ? (
            <span>{visitorCount} visitors</span>
          ) : (
            <span>Top</span>
          )}
          <span className="text-xs">↗</span>
        </a>
      </div>
    </footer>
  );
}
