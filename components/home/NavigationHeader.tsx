'use client';

import { useState, useEffect } from 'react';
import ThemeToggle from '@/components/theme/ThemeToggle';
import { useSound } from '@/hooks/useSound';
import { Terminal } from 'lucide-react';

interface NavigationHeaderProps {
  onOpenTerminal: () => void;
}

export default function NavigationHeader({ onOpenTerminal }: NavigationHeaderProps) {
  const { playClick } = useSound();
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    const sectionIds = ['intro', 'projects', 'skills', 'contact'];

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length > 0) {
          const topVisible = intersecting.reduce((prev, curr) =>
            curr.intersectionRatio > prev.intersectionRatio ? curr : prev
          );
          if (topVisible.target.id) {
            setActiveSection(topVisible.target.id);
          }
        }
      },
      {
        rootMargin: '-15% 0px -65% 0px',
        threshold: [0, 0.2, 0.5],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full max-w-5xl mx-auto bg-[#F4F4F6]/90 dark:bg-[#09090B]/90 backdrop-blur-md border-b border-[#E2E4E8] dark:border-[#1E2026] flex items-center justify-between py-2.5 px-4 sm:px-6 font-mono text-xs select-none">
      
      {/* Brand Identity */}
      <a
        href="#intro"
        onClick={playClick}
        className="flex items-center gap-2 group min-w-0 shrink-0"
      >
        <span className="w-2 h-2 rounded-full bg-black dark:bg-white group-hover:scale-125 transition-transform shrink-0" />
        <span className="font-black text-[#09090B] dark:text-white tracking-wider text-xs sm:text-[13px]">
          SAJAL MALHOTRA
        </span>
        <span className="text-[#A1A1AA] hidden sm:inline">•</span>
        <span className="text-[10.5px] text-[#71717A] dark:text-[#A1A1AA] hidden sm:inline">
          NIT JALANDHAR &apos;29
        </span>
      </a>

      {/* Nav Jump Anchors */}
      <nav className="flex items-center gap-1 sm:gap-2 text-xs text-[#71717A] dark:text-[#A1A1AA]">
        {[
          { id: 'projects', label: 'Systems' },
          { id: 'skills', label: 'Spectrum' },
          { id: 'contact', label: 'Opportunities' },
        ].map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={playClick}
            className={`px-2.5 sm:px-3 py-1 rounded-lg transition-colors cursor-pointer text-[11px] sm:text-xs ${
              activeSection === item.id
                ? 'text-[#09090B] dark:text-white font-bold bg-black/5 dark:bg-white/5'
                : 'hover:text-[#09090B] dark:hover:text-white'
            }`}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Clean Right Actions: Theme + Terminal */}
      <div className="flex items-center gap-2 shrink-0">
        <ThemeToggle />

        <button
          onClick={() => {
            playClick();
            onOpenTerminal();
          }}
          className="hidden xs:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white hover:bg-[#ECEEF2] dark:bg-[#16171B] dark:hover:bg-[#202227] border border-[#D1D5DB] dark:border-[#27272A] text-[#09090B] dark:text-[#EDEDED] font-medium transition-colors cursor-pointer text-[11px] shadow-2xs"
          title="Open Developer Terminal (~)"
        >
          <Terminal size={11} className="text-[#52525B] dark:text-[#A1A1AA]" />
          <span>CLI</span>
        </button>
      </div>

    </header>
  );
}
