'use client';

import { useState, useEffect } from 'react';

const API_BASE = 'https://countapi.mileshilliard.com/api/v1';
const KEY = 'sajal_malhotra_sajalm';

export default function VisitorCounter() {
  const [count, setCount] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    // Fast initial load from cache to eliminate flicker
    const cached = typeof window !== 'undefined'
      ? (localStorage.getItem('sajalm-visitor-count') || localStorage.getItem('sajdex-visitor-count'))
      : null;
    if (cached) {
      setCount(cached);
    }

    async function syncCount(isInitial = false) {
      try {
        const hasCountedSession = typeof window !== 'undefined' &&
          (sessionStorage.getItem('sajalm-session-hit') || sessionStorage.getItem('sajdex-session-hit'));
        
        // If initial load and not counted in this session, increment (+1). Otherwise read latest value (/get).
        const endpoint = (isInitial && !hasCountedSession)
          ? `${API_BASE}/hit/${KEY}`
          : `${API_BASE}/get/${KEY}`;

        const res = await fetch(endpoint, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.value !== 'undefined' && isMounted) {
            const formatted = String(data.value);
            setCount(formatted);
            localStorage.setItem('sajalm-visitor-count', formatted);
            if (isInitial && !hasCountedSession) {
              sessionStorage.setItem('sajalm-session-hit', '1');
            }
            return;
          }
        }
      } catch {
        // Network failure / offline
      }

      // Offline / network fallback
      if (isMounted && !count && cached) {
        setCount(cached);
      }
    }

    // Initial hit / get
    syncCount(true);

    // Live sync polling every 30 seconds
    const interval = setInterval(() => {
      syncCount(false);
    }, 30000);

    // Refresh immediately when user switches back to tab
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        syncCount(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      isMounted = false;
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <div
      className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 rounded bg-white hover:bg-[#F4F4F6] dark:bg-[#141417] dark:hover:bg-[#1C1D22] border border-[#D1D5DB] dark:border-[#27272A] text-[#09090B] dark:text-[#EDEDED] font-mono text-[10px] select-none transition-colors shadow-xs"
      title="Live Synchronized Visitor Count"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
      <span className="text-[#71717A] dark:text-[#A1A1AA] text-[9px] hidden xs:inline">VISITS:</span>
      <span className="font-bold text-[#09090B] dark:text-white tabular-nums">
        {count ? `#${count}` : '...'}
      </span>
    </div>
  );
}
