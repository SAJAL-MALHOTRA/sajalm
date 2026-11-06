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
    <header className="sticky top-0 z-40 w-full bg-[#F4F4F6]/95 dark:bg-[#09090B]/95 backdrop-blur-md border-b border-[#E2E4E8] dark:border-[#22242B] select-none px-4 sm:px-6">
      <div className="w-full max-w-[780px] mx-auto flex items-center justify-between py-2.5 font-mono text-xs">
        
        {/* Brand & Editorial Identity */}
        <a
          href="#intro"
          onClick={playClick}
          className="flex items-center gap-2 group min-w-0 shrink-0"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" title="System Active / Open for Opportunities" />
          <span className="font-bold text-[#09090B] dark:text-[#EDEDED] tracking-wider text-xs sm:text-[12.5px]">
            SAJAL MALHOTRA
          </span>
          <span className="text-[#A1A1AA] text-[11px] font-normal">/ NITJ &apos;29</span>
        </a>

        {/* Center Editorial Anchors */}
        <nav className="hidden sm:flex items-center gap-1 text-[11px] text-[#71717A] dark:text-[#A1A1AA] tracking-wider font-medium">
          {[
            { id: 'projects', label: 'SYSTEMS' },
            { id: 'skills', label: 'SPECTRUM' },
            { id: 'contact', label: 'CONTACT' },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={playClick}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                activeSection === item.id
                  ? 'text-[#09090B] dark:text-white font-bold bg-black/5 dark:bg-white/5'
                  : 'hover:text-[#09090B] dark:hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Telemetry & Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <span className="hidden md:inline text-[10px] text-[#A1A1AA] uppercase tracking-widest font-mono">
            PORTFOLIO / 2026
          </span>

          {/* Quick Terminal Trigger */}
          <button
            onClick={() => {
              playClick();
              onOpenTerminal();
            }}
            className="flex items-center gap-1.5 px-2 py-1 rounded bg-white hover:bg-[#ECEEF2] dark:bg-[#121316] dark:hover:bg-[#1E1F24] border border-[#E2E4E8] dark:border-[#22242B] text-[#09090B] dark:text-[#EDEDED] font-mono text-[10.5px] transition-colors cursor-pointer shadow-2xs"
            title="Open Developer Terminal (~)"
          >
            <Terminal size={11} className="text-[#71717A] dark:text-[#A1A1AA]" />
            <span>CLI ~</span>
          </button>

          {/* Theme Mode Toggle */}
          <ThemeToggle />
        </div>

      </div>
    </header>
  );
}
