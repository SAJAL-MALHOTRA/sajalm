'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ArrowUpRight,
  Terminal,
  Mail,
  Download,
  Moon,
  Sun,
  X,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  BookOpen,
  Send,
  UserCheck,
  Zap,
} from 'lucide-react';
import { projects } from '@/data/projects';
import { useSound } from '@/hooks/useSound';
import { useTheme } from '@/components/theme/ThemeProvider';
import { useToast } from '@/components/ui/ToastProvider';
import { getAssetPath } from '@/utils/asset';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal: () => void;
  onOpenProjectModal: (id: string) => void;
}

interface PaletteItem {
  id: string;
  category: 'NAVIGATION' | 'PROJECTS' | 'ACTIONS';
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onOpenTerminal,
  onOpenProjectModal,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const { playClick, playHover, playModalOpen } = useSound();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();

  const scrollToSection = (id: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const items: PaletteItem[] = useMemo(() => {
    const list: PaletteItem[] = [
      // ── NAVIGATION
      {
        id: 'nav-intro',
        category: 'NAVIGATION',
        title: '00 // Overview & Identity',
        subtitle: 'Sajal Malhotra · Software Engineer · NIT Jalandhar',
        icon: <Layers size={14} className="text-emerald-500" />,
        action: () => scrollToSection('intro'),
      },
      {
        id: 'nav-projects',
        category: 'NAVIGATION',
        title: '02 // Selected Systems',
        subtitle: 'Distributed systems, real-time protocols, and applied ML',
        icon: <Code2 size={14} className="text-blue-500" />,
        shortcut: 'G P',
        action: () => scrollToSection('projects'),
      },
      {
        id: 'nav-design-map',
        category: 'NAVIGATION',
        title: 'Design Map // 10 Runtime Micro-Simulations',
        subtitle: 'tinyGPT, Athena radar, Cortex attention mask, CUDA warp grid, and epoll',
        icon: <Zap size={14} className="text-purple-500" />,
        shortcut: 'G M',
        action: () => scrollToSection('design-map'),
      },
      {
        id: 'nav-skills',
        category: 'NAVIGATION',
        title: '03 // Dual Spectrum & Perspective',
        subtitle: 'Engineering arsenal vs NITJ FMC Runway & Stage Architecture',
        icon: <Cpu size={14} className="text-purple-500" />,
        action: () => scrollToSection('skills'),
      },
      {
        id: 'nav-ml-lab',
        category: 'NAVIGATION',
        title: 'ML Lab // Neural Net Decision Boundary Playground',
        subtitle: 'Interactive 2D multi-layer perceptron running backpropagation at 60fps',
        icon: <Zap size={14} className="text-emerald-500" />,
        shortcut: 'G N',
        action: () => scrollToSection('ml-lab'),
      },
      {
        id: 'nav-guestbook',
        category: 'NAVIGATION',
        title: '04 // Visitor Registry & Guestbook',
        subtitle: 'Sign the dossier with Kokonut UI vector physics pen',
        icon: <Sparkles size={14} className="text-amber-500" />,
        shortcut: 'G G',
        action: () => scrollToSection('guestbook'),
      },
      {
        id: 'nav-contact',
        category: 'NAVIGATION',
        title: '05 // Opportunities & Contact',
        subtitle: 'Direct outreach, email relay, and collaboration',
        icon: <Mail size={14} className="text-rose-500" />,
        shortcut: 'G C',
        action: () => scrollToSection('contact'),
      },

      // ── REAL PROJECTS (8 Flagship Systems)
      ...projects.map((p) => ({
        id: `prj-${p.id}`,
        category: 'PROJECTS' as const,
        title: p.name,
        subtitle: `${p.subtitle || p.tagline} · [${p.metric}]`,
        icon: <Code2 size={14} className="text-[#09090B] dark:text-white" />,
        shortcut: p.id,
        action: () => {
          onClose();
          onOpenProjectModal(p.id);
        },
      })),

      // ── QUICK ACTIONS
      {
        id: 'act-email',
        category: 'ACTIONS',
        title: 'Copy Email Address',
        subtitle: 'malhotrasajal243@gmail.com',
        icon: <Mail size={14} className="text-emerald-500" />,
        shortcut: 'C E',
        action: async () => {
          try {
            await navigator.clipboard.writeText('malhotrasajal243@gmail.com');
            toast({
              title: 'Email Copied to Clipboard',
              description: 'malhotrasajal243@gmail.com',
              type: 'copy',
            });
          } catch {}
          onClose();
        },
      },
      {
        id: 'act-resume',
        category: 'ACTIONS',
        title: 'Download Official Resume',
        subtitle: 'Sajal Malhotra · B.Tech IT NIT Jalandhar (PDF)',
        icon: <Download size={14} className="text-blue-500" />,
        shortcut: 'D R',
        action: () => {
          const link = document.createElement('a');
          link.href = getAssetPath('/resume.pdf');
          link.download = 'Sajal_Malhotra_Resume.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          toast({
            title: 'Resume Downloaded',
            description: 'Sajal_Malhotra_Resume.pdf',
            type: 'success',
          });
          onClose();
        },
      },
      {
        id: 'act-vcard',
        category: 'ACTIONS',
        title: 'Save Contact to Address Book',
        subtitle: 'Download vCard (Sajal_Malhotra.vcf)',
        icon: <UserCheck size={14} className="text-indigo-500" />,
        action: () => {
          const vCardContent = [
            'BEGIN:VCARD',
            'VERSION:3.0',
            'FN:Sajal Malhotra',
            'TITLE:Software Engineer',
            'ORG:NIT Jalandhar',
            'EMAIL;TYPE=INTERNET,PREF:malhotrasajal243@gmail.com',
            'TEL;TYPE=CELL:+916284596119',
            'URL:https://sajal-malhotra.github.io/sajalm/',
            'URL;TYPE=GitHub:https://github.com/SAJAL-MALHOTRA',
            'URL;TYPE=LinkedIn:https://www.linkedin.com/in/sajal-malhotra-007897284/',
            'NOTE:B.Tech Information Technology, Class of 2029. Distributed Systems & Machine Learning.',
            'END:VCARD',
          ].join('\r\n');

          const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'Sajal_Malhotra.vcf');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          toast({
            title: 'Contact vCard Downloaded',
            description: 'Sajal_Malhotra.vcf saved',
            type: 'success',
          });
          onClose();
        },
      },
      {
        id: 'act-terminal',
        category: 'ACTIONS',
        title: 'Open Developer Terminal Shell',
        subtitle: 'Interactive workstation CLI environment with command suite',
        icon: <Terminal size={14} className="text-amber-500" />,
        shortcut: '~',
        action: () => {
          onClose();
          onOpenTerminal();
        },
      },
      {
        id: 'act-theme',
        category: 'ACTIONS',
        title: `Switch to ${theme === 'dark' ? 'Light Atelier' : 'Dark Obsidian'} Mode`,
        subtitle: 'Toggle theme or pull tactile ceiling lamp',
        icon: theme === 'dark' ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} className="text-blue-500" />,
        shortcut: 'L',
        action: () => {
          toggleTheme();
          toast({
            title: `Atmosphere: ${theme === 'dark' ? 'Light Atelier' : 'Dark Obsidian'}`,
            type: 'info',
          });
          onClose();
        },
      },
    ];

    return list;
  }, [theme, toggleTheme, toast, onClose, onOpenTerminal, onOpenProjectModal]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.shortcut && item.shortcut.toLowerCase().includes(q))
    );
  }, [items, query]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard navigation listener (Arrow keys, Enter, Esc)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        playHover();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        playHover();
        setSelectedIndex((prev) => (prev - 1 + (filteredItems.length || 1)) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredItems[selectedIndex];
        if (selected) {
          playClick();
          selected.action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, playClick, playHover, onClose]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        onClick={onClose}
        className="fixed inset-0 z-[140] flex items-start justify-center pt-16 sm:pt-24 px-3 sm:px-4 bg-black/60 dark:bg-black/85 backdrop-blur-md select-none font-sans"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.96, y: -12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -12 }}
          transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl bg-white dark:bg-[#0E0F12] border border-[#E2E4E8] dark:border-[#22242B] rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.25)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col max-h-[80vh]"
        >
          {/* ── SEARCH INPUT HEADER ── */}
          <div className="relative flex items-center px-4 py-3.5 border-b border-[#E2E4E8] dark:border-[#22242B] bg-[#FAFAFC] dark:bg-[#121316]">
            <Search size={16} className="text-[#71717A] dark:text-[#A1A1AA] mr-3 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, skills, commands, or jump to section..."
              className="flex-1 bg-transparent text-[#09090B] dark:text-[#EDEDED] text-sm outline-none placeholder-[#71717A] dark:placeholder-[#71717A] font-sans"
            />
            {query ? (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-md text-[#71717A] hover:text-[#09090B] dark:hover:text-white transition-colors cursor-pointer mr-2"
              >
                <X size={14} />
              </button>
            ) : null}
            <kbd className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 border border-[#E2E4E8] dark:border-[#27272A] text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA] hidden sm:inline-block">
              ESC
            </kbd>
          </div>

          {/* ── COMMAND LIST ── */}
          <div ref={listRef} className="p-2 overflow-y-auto space-y-1 custom-scrollbar max-h-96">
            {filteredItems.length === 0 ? (
              <div className="py-12 text-center text-xs font-mono text-[#71717A] dark:text-[#A1A1AA]">
                No matching results found for &quot;{query}&quot;.
              </div>
            ) : (
              filteredItems.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={item.id}
                    data-index={idx}
                    onClick={() => {
                      playClick();
                      item.action();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-xl text-left transition-colors duration-100 cursor-pointer group ${
                      isSelected
                        ? 'bg-[#ECEEF2] dark:bg-[#18191E] text-black dark:text-white'
                        : 'hover:bg-[#F4F4F6] dark:hover:bg-[#141519] text-[#09090B] dark:text-[#EDEDED]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <div className={`p-2 rounded-lg border transition-colors shrink-0 ${
                        isSelected
                          ? 'bg-white dark:bg-[#202128] border-[#D1D5DB] dark:border-white/10'
                          : 'bg-[#F4F4F6] dark:bg-[#15161B] border-transparent'
                      }`}>
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold font-sans tracking-tight truncate flex items-center gap-2">
                          <span>{item.title}</span>
                          <span className="text-[9px] font-mono font-medium text-[#71717A] dark:text-[#8E92A2] uppercase tracking-wider hidden sm:inline">
                            [{item.category}]
                          </span>
                        </div>
                        <div className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] font-mono truncate">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {item.shortcut && (
                        <kbd className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-[#E2E4E8] dark:border-[#27272A] text-[9.5px] font-mono text-[#71717A] dark:text-[#A1A1AA]">
                          {item.shortcut}
                        </kbd>
                      )}
                      <ArrowUpRight
                        size={13}
                        className={`transition-transform duration-150 ${
                          isSelected
                            ? 'text-black dark:text-white translate-x-0.5 -translate-y-0.5'
                            : 'text-[#71717A] opacity-40 group-hover:opacity-100'
                        }`}
                      />
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* ── FOOTER STATUS BAR ── */}
          <div className="px-4 py-2.5 bg-[#FAFAFC] dark:bg-[#0A0B0D] border-t border-[#E2E4E8] dark:border-[#22242B] flex items-center justify-between text-[10.5px] font-mono text-[#71717A] dark:text-[#A1A1AA]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-[#E2E4E8] dark:border-[#27272A] text-[9px]">↑↓</kbd>
                <span>navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-[#E2E4E8] dark:border-[#27272A] text-[9px]">↵</kbd>
                <span>select</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-[#E2E4E8] dark:border-[#27272A] text-[9px]">esc</kbd>
                <span>close</span>
              </span>
            </div>

            <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest hidden sm:inline">
              SAJDEX PALETTE
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
