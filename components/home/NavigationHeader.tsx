'use client';

import { useState, useEffect } from 'react';
import VisitorCounter from '@/components/ui/VisitorCounter';
import ThemeToggle from '@/components/theme/ThemeToggle';
import SajalsTastePlayer from '@/components/layout/SajalsTastePlayer';
import { profile } from '@/data/profile';
import { useSound } from '@/hooks/useSound';
import { Terminal, Coffee } from 'lucide-react';

interface NavigationHeaderProps {
  onOpenTerminal: () => void;
}

export default function NavigationHeader({ onOpenTerminal }: NavigationHeaderProps) {
  const { playClick } = useSound();
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'skills', 'achievements', 'projects', 'contact'];
      const scrollY = window.scrollY + 120;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full max-w-5xl mx-auto py-2 px-2.5 sm:px-4 bg-[#F4F4F6]/85 dark:bg-[#09090B]/85 backdrop-blur-md border-b border-[#E2E4E8] dark:border-[#1E2026] flex items-center justify-between font-mono text-xs select-none gap-2">
      
      {/* Brand Identity */}
      <a
        href="#intro"
        onClick={playClick}
        className="flex items-center gap-2 group min-w-0 shrink-0"
      >
        <span className="w-2 h-2 rounded-full bg-black dark:bg-white group-hover:scale-125 transition-transform" />
        <span className="font-black text-[#09090B] dark:text-white tracking-wider text-[11px] sm:text-xs truncate">
          SAJAL MALHOTRA
        </span>
        <span className="text-[#A1A1AA] hidden md:inline">•</span>
        <span className="text-[10px] text-[#71717A] hidden md:inline">NIT JALANDHAR &apos;29</span>
      </a>

      {/* Nav Jump Anchors (Visible on desktop) */}
      <nav className="hidden lg:flex items-center gap-1 text-[11px] text-[#71717A] dark:text-[#A1A1AA]">
        {[
          { id: 'intro', label: 'Intro' },
          { id: 'skills', label: 'Skills & Passions' },
          { id: 'achievements', label: 'Achievements' },
          { id: 'projects', label: 'Projects' },
          { id: 'contact', label: 'Opportunities' },
        ].map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={playClick}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              activeSection === item.id
                ? 'text-[#09090B] dark:text-white font-bold bg-black/5 dark:bg-white/5'
                : 'hover:text-[#09090B] dark:hover:text-white'
            }`}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Controls & Badges */}
      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        <VisitorCounter />

        <a
          href={profile.links.buyMeAChai}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30 transition-colors font-mono text-[10px] font-medium shadow-2xs"
          title="Buy Me a Chai"
        >
          <Coffee size={10} className="text-amber-700 dark:text-amber-400 shrink-0" />
          <span className="hidden xs:inline font-bold">CHAI</span>
        </a>

        <ThemeToggle />

        <SajalsTastePlayer />

        <button
          onClick={() => {
            playClick();
            onOpenTerminal();
          }}
          className="flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 rounded bg-white hover:bg-[#F4F4F6] dark:bg-[#141417] dark:hover:bg-[#1E1E24] border border-[#D1D5DB] dark:border-[#27272A] text-[#09090B] dark:text-[#EDEDED] font-medium transition-colors cursor-pointer text-[10px] shadow-2xs"
          title="Developer Terminal (~)"
        >
          <Terminal size={10} className="text-[#52525B] dark:text-[#A1A1AA] shrink-0" />
          <span className="hidden xs:inline">CLI (~)</span>
          <span className="xs:hidden">CLI</span>
        </button>
      </div>

    </header>
  );
}
