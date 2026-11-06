'use client';

import React, { useState, useEffect } from 'react';
import { sajalContributionsData, DayContribution } from '@/data/githubContributions';
import { profile } from '@/data/profile';
import { useSound } from '@/hooks/useSound';
import { FileText, ArrowUpRight } from 'lucide-react';

// Color tokens for GitHub activity calendar matching Rinkit Adhana's aesthetic
const LIGHT_COLORS: Record<number, string> = {
  0: '#F4F4F5',
  1: '#D4D4D8',
  2: '#A1A1AA',
  3: '#52525B',
  4: '#18181B',
};

const DARK_COLORS: Record<number, string> = {
  0: '#18181B',
  1: '#27272A',
  2: '#3F3F46',
  3: '#71717A',
  4: '#D4D4D8',
};

// Month legends and column offsets across 53 weeks
const MONTH_LABELS = [
  { label: 'Nov', x: 0 },
  { label: 'Dec', x: 50 },
  { label: 'Jan', x: 100 },
  { label: 'Feb', x: 162.5 },
  { label: 'Mar', x: 212.5 },
  { label: 'Apr', x: 262.5 },
  { label: 'May', x: 312.5 },
  { label: 'Jun', x: 375 },
  { label: 'Jul', x: 425 },
  { label: 'Aug', x: 475 },
  { label: 'Sep', x: 537.5 },
  { label: 'Oct', x: 587.5 },
];

export default function SocialsAndGithubCalendar() {
  const [data, setData] = useState<{ total: number; contributions: DayContribution[] }>(sajalContributionsData);
  const [tooltip, setTooltip] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  const { playClick, playHover } = useSound();

  // Background fetch for fresh live contributions (with resilient fallback to bundled data)
  useEffect(() => {
    let active = true;
    const fetchFreshData = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);
        const res = await fetch('https://github-contributions-api.jogruber.de/v4/SAJAL-MALHOTRA?y=last', {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        if (!res.ok) return;
        const json = await res.json();
        if (active && json.contributions && Array.isArray(json.contributions)) {
          setData({
            total: json.total?.lastYear ?? json.total?.[Object.keys(json.total || {})[0]] ?? 420,
            contributions: json.contributions,
          });
        }
      } catch {
        // Fallback silently to bundled 420 contributions
      }
    };

    fetchFreshData();
    return () => {
      active = false;
    };
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const contributions = data.contributions;
  const totalWeeks = Math.ceil(contributions.length / 7);

  // Render SVG calendar grid
  const renderCalendarSvg = (isDark: boolean) => {
    const colors = isDark ? DARK_COLORS : LIGHT_COLORS;
    const stroke = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.08)';

    return (
      <svg
        width="660"
        height="105"
        viewBox="0 0 660 105"
        className="block overflow-visible select-none"
        style={{ minWidth: '660px' }}
      >
        {/* Month labels */}
        <g className="text-[10px] font-sans fill-[#71717A] dark:fill-[#A1A1AA] select-none">
          {MONTH_LABELS.map((m, idx) => (
            <text key={idx} x={m.x} y="10" dominantBaseline="hanging">
              {m.label}
            </text>
          ))}
        </g>

        {/* Days grid */}
        <g transform="translate(0, 0)">
          {contributions.map((item, idx) => {
            const col = Math.floor(idx / 7);
            const row = idx % 7;
            const x = col * 12.5;
            const y = 20 + row * 12.5;
            const fill = colors[item.level] ?? colors[0];

            return (
              <rect
                key={item.date}
                x={x}
                y={y}
                width="10"
                height="10"
                rx="2"
                ry="2"
                fill={fill}
                stroke={stroke}
                data-date={item.date}
                data-count={item.count}
                data-level={item.level}
                className="hover:opacity-75 transition-opacity duration-200 cursor-pointer outline-none"
                onMouseEnter={(e) => {
                  playHover();
                  const rect = e.currentTarget.getBoundingClientRect();
                  setTooltip({
                    date: item.date,
                    count: item.count,
                    x: rect.left + rect.width / 2,
                    y: rect.top,
                  });
                }}
                onMouseLeave={() => setTooltip(null)}
              />
            );
          })}
        </g>
      </svg>
    );
  };

  return (
    <section className="w-full max-w-[690px] mx-auto py-5 px-3 sm:px-0 text-left select-none space-y-6">
      
      {/* ── TOP REPEATING DASHED LINE (RINKIT STYLE) ── */}
      <div
        className="w-full h-px opacity-70"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to right, var(--border-color) 0px, var(--border-color) 6px, transparent 6px, transparent 14px)',
          backgroundSize: '100% 1px',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* ── HERE ARE MY SOCIALS ── */}
      <div className="flex flex-col gap-2.5">
        <h2 className="text-sm sm:text-base font-normal text-[#52525B] dark:text-[#A1A1AA] tracking-normal">
          Here are my <span className="font-semibold text-[#09090B] dark:text-white">socials</span>
        </h2>

        {/* Social Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* GitHub */}
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-[#F4F4F5] hover:bg-[#E4E4E7] dark:bg-[#18181B] dark:hover:bg-[#27272A] border border-[#E4E4E7] dark:border-[#27272A] rounded-[6px] text-xs font-medium text-[#09090B] dark:text-[#EDEDED] transition-colors duration-200 shadow-xs"
          >
            <svg stroke="currentColor" fill="currentColor" viewBox="0 0 496 512" height="13" width="13">
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
            </svg>
            <span>GitHub</span>
          </a>

          {/* Twitter / X */}
          <a
            href={profile.links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-[#F4F4F5] hover:bg-[#E4E4E7] dark:bg-[#18181B] dark:hover:bg-[#27272A] border border-[#E4E4E7] dark:border-[#27272A] rounded-[6px] text-xs font-medium text-[#09090B] dark:text-[#EDEDED] transition-colors duration-200 shadow-xs"
          >
            <svg stroke="currentColor" fill="currentColor" viewBox="0 0 512 512" height="12" width="12">
              <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
            </svg>
            <span>Twitter</span>
          </a>

          {/* LinkedIn */}
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-[#F4F4F5] hover:bg-[#E4E4E7] dark:bg-[#18181B] dark:hover:bg-[#27272A] border border-[#E4E4E7] dark:border-[#27272A] rounded-[6px] text-xs font-medium text-[#09090B] dark:text-[#EDEDED] transition-colors duration-200 shadow-xs"
          >
            <svg stroke="currentColor" fill="currentColor" viewBox="0 0 448 512" height="12" width="12">
              <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
            </svg>
            <span>LinkedIn</span>
          </a>

          {/* Buy Me A Chai */}
          <a
            href={profile.links.buyMeAChai}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-[#F4F4F5] hover:bg-[#E4E4E7] dark:bg-[#18181B] dark:hover:bg-[#27272A] border border-[#E4E4E7] dark:border-[#27272A] rounded-[6px] text-xs font-medium text-[#09090B] dark:text-[#EDEDED] transition-colors duration-200 shadow-xs"
          >
            <span>☕</span>
            <span>Buy Me A Chai</span>
          </a>

          {/* Resume */}
          <a
            href={profile.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-[#F4F4F5] hover:bg-[#E4E4E7] dark:bg-[#18181B] dark:hover:bg-[#27272A] border border-[#E4E4E7] dark:border-[#27272A] rounded-[6px] text-xs font-medium text-[#09090B] dark:text-[#EDEDED] transition-colors duration-200 shadow-xs"
          >
            <FileText size={12} />
            <span>Resume</span>
            <ArrowUpRight size={11} className="text-[#71717A] dark:text-[#A1A1AA]" />
          </a>
        </div>
      </div>

      {/* ── GITHUB ACTIVITY CALENDAR (SEAMLESS IN LIGHT & DARK MODE) ── */}
      <div className="w-full flex flex-col gap-2 pt-1">
        <div className="w-full overflow-x-auto no-scrollbar pb-1">
          {/* Light Mode SVG */}
          <div className="block dark:hidden">
            {renderCalendarSvg(false)}
          </div>

          {/* Dark Mode SVG */}
          <div className="hidden dark:block">
            {renderCalendarSvg(true)}
          </div>
        </div>

        {/* Summary Footer & Legend */}
        <div className="flex items-center justify-between text-xs text-[#71717A] dark:text-[#A1A1AA] pt-1">
          <span className="font-mono text-[11px] sm:text-xs">
            {data.total} activities in the last year
          </span>

          <div className="flex items-center gap-1.5 text-[11px]">
            <span>Less</span>
            <div className="flex items-center gap-[2.5px] dark:hidden">
              {[0, 1, 2, 3, 4].map((lvl) => (
                <div
                  key={lvl}
                  className="w-2.5 h-2.5 rounded-[2px]"
                  style={{
                    backgroundColor: LIGHT_COLORS[lvl],
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                  }}
                />
              ))}
            </div>
            <div className="hidden dark:flex items-center gap-[2.5px]">
              {[0, 1, 2, 3, 4].map((lvl) => (
                <div
                  key={lvl}
                  className="w-2.5 h-2.5 rounded-[2px]"
                  style={{
                    backgroundColor: DARK_COLORS[lvl],
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>

      {/* ── FLOATING TOOLTIP ── */}
      {tooltip && (
        <div
          className="fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-full mb-2 px-2.5 py-1 rounded bg-[#09090B] text-white dark:bg-white dark:text-[#09090B] text-[11px] font-sans shadow-lg font-medium tracking-tight whitespace-nowrap"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y - 8}px`,
          }}
        >
          <span>
            {tooltip.count === 0 ? 'No activities' : `${tooltip.count} activit${tooltip.count === 1 ? 'y' : 'ies'}`} on {formatDate(tooltip.date)}
          </span>
        </div>
      )}

      {/* ── BOTTOM REPEATING DASHED LINE (RINKIT STYLE) ── */}
      <div
        className="w-full h-px opacity-70"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to right, var(--border-color) 0px, var(--border-color) 6px, transparent 6px, transparent 14px)',
          backgroundSize: '100% 1px',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </section>
  );
}
