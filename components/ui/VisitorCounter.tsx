'use client';

import { useState, useEffect } from 'react';

export default function VisitorCounter() {
  const [count, setCount] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchVisitorCount() {
      // Check cached count first to avoid flicker
      const cached = typeof window !== 'undefined' ? localStorage.getItem('sajdex-visitor-count') : null;
      if (cached && isMounted) {
        setCount(cached);
      }

      try {
        const res = await fetch('https://visitor-badge.laobi.icu/badge?page_id=sajal-malhotra.sajdex&nocache=' + Date.now());
        if (res.ok) {
          const svgText = await res.text();
          // Extract the counter number from the SVG text node
          const matches = [...svgText.matchAll(/<text[^>]*>([0-9,]+)<\/text>/g)];
          if (matches.length > 0) {
            // The actual number is the last text element in the badge SVG
            const rawCount = matches[matches.length - 1][1];
            if (rawCount && isMounted) {
              setCount(rawCount);
              localStorage.setItem('sajdex-visitor-count', rawCount);
              return;
            }
          }
        }
      } catch {
        // Fallback gracefully to local increment
      }

      // Fallback: local session-incremented counter
      if (isMounted) {
        const fallbackCount = cached ? String(parseInt(cached.replace(/,/g, ''), 10) + 1) : '12';
        setCount(fallbackCount);
        localStorage.setItem('sajdex-visitor-count', fallbackCount);
      }
    }

    fetchVisitorCount();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div
      className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white hover:bg-[#F4F4F6] dark:bg-[#141417] dark:hover:bg-[#1C1D22] border border-[#D1D5DB] dark:border-[#27272A] text-[#09090B] dark:text-[#EDEDED] font-mono text-[10px] select-none transition-colors shadow-xs"
      title="Live Visitor Count"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      <span className="text-[#71717A] dark:text-[#A1A1AA] text-[9.5px]">VISITS:</span>
      <span className="font-bold text-[#09090B] dark:text-white">
        {count ? `#${count}` : '...'}
      </span>
    </div>
  );
}
