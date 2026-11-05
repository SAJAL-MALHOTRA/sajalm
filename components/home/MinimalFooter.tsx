'use client';

import { useState, useEffect } from 'react';
import { useSound } from '@/hooks/useSound';

const API_BASE = 'https://countapi.mileshilliard.com/api/v1';
const KEY = 'sajal_malhotra_sajalm';
const BASE_COUNT = 14796;

export default function MinimalFooter() {
  const { playClick } = useSound();
  const [visitorCount, setVisitorCount] = useState('14,797');

  useEffect(() => {
    let isMounted = true;

    // Load cached value if available
    const cached = typeof window !== 'undefined'
      ? (localStorage.getItem('sajalm-visitor-count') || localStorage.getItem('sajdex-visitor-count'))
      : null;
    if (cached) {
      const num = parseInt(cached, 10);
      if (!isNaN(num)) {
        setVisitorCount(num.toLocaleString());
      }
    }

    async function syncCount(isInitial = false) {
      try {
        const hasCountedSession = typeof window !== 'undefined' &&
          (sessionStorage.getItem('sajalm-session-hit') || sessionStorage.getItem('sajdex-session-hit'));

        const endpoint = (isInitial && !hasCountedSession)
          ? `${API_BASE}/hit/${KEY}`
          : `${API_BASE}/get/${KEY}`;

        const res = await fetch(endpoint, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.value !== 'undefined' && isMounted) {
            const total = BASE_COUNT + Number(data.value);
            const formatted = total.toLocaleString();
            setVisitorCount(formatted);
            localStorage.setItem('sajalm-visitor-count', String(total));
            if (isInitial && !hasCountedSession) {
              sessionStorage.setItem('sajalm-session-hit', '1');
            }
          }
        }
      } catch {
        // Fallback to default
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
    <footer className="w-full max-w-5xl z-30 py-8 px-4 sm:px-6 border-t border-[#E2E4E8] dark:border-[#22242B] mt-12 font-sans text-xs sm:text-[13px] text-[#71717A] dark:text-[#A1A1AA] select-none shrink-0">
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
          <span>{visitorCount} visitors</span>
          <span className="text-xs">↗</span>
        </a>
      </div>
    </footer>
  );
}
