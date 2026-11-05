'use client';

import { useState, useEffect } from 'react';
import FieldConsole from '@/components/console/FieldConsole';
import ProjectModal from '@/components/ui/ProjectModal';
import DeveloperTerminal from '@/components/terminal/DeveloperTerminal';
import KonamiEasterEgg from '@/components/ui/KonamiEasterEgg';
import SajalsTastePlayer from '@/components/layout/SajalsTastePlayer';
import ThemeToggle from '@/components/theme/ThemeToggle';
import VisitorCounter from '@/components/ui/VisitorCounter';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { useSound } from '@/hooks/useSound';
import { Terminal, X } from 'lucide-react';

export type ViewType = 'overview' | 'hero' | 'home' | 'work' | 'about' | 'skills' | 'experience' | 'contact' | 'resume' | 'terminal';

export default function Home() {
  const [modalProjectId, setModalProjectId] = useState<string | null>(null);
  const [terminalOpen, setTerminalOpen] = useState(false);

  const { playClick, playModalOpen } = useSound();

  const activeModalProject = modalProjectId
    ? projects.find((p) => p.id === modalProjectId) || null
    : null;

  // Keyboard shortcut listener (`~` for terminal, Esc to close modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const targetTag = (e.target as HTMLElement)?.tagName?.toUpperCase();
      if (targetTag === 'INPUT' || targetTag === 'TEXTAREA') return;

      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        playClick();
        setTerminalOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        if (terminalOpen) {
          setTerminalOpen(false);
        } else if (modalProjectId) {
          setModalProjectId(null);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playClick, terminalOpen, modalProjectId]);

  return (
    <main className="min-h-screen w-full lg:h-screen lg:max-h-screen bg-[#F4F4F6] dark:bg-[#09090B] text-[#09090B] dark:text-[#EDEDED] font-mono antialiased selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black flex flex-col justify-between items-center p-2 sm:p-3 relative overflow-x-hidden overflow-y-auto lg:overflow-hidden">
      
      {/* ── MINIMALIST TECHNICAL GRID (LIGHT & DARK ADAPTIVE) ── */}
      <div className="fixed inset-0 bg-[radial-gradient(#CBD0D8_1px,transparent_1px)] dark:bg-[radial-gradient(#27272A_1px,transparent_1px)] [background-size:20px_20px] opacity-50 dark:opacity-35 pointer-events-none" />

      {/* ── TOP AMBIENT STATUS STRIP (FULLY RESPONSIVE) ── */}
      <header className="w-full max-w-5xl z-30 flex items-center justify-between font-mono text-[10px] sm:text-[10.5px] text-[#52525B] dark:text-[#71717A] select-none py-1.5 px-1 shrink-0 gap-1.5 sm:gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <span className="w-1.5 h-1.5 rounded-full bg-black/80 dark:bg-white/80 shrink-0" />
          <span className="text-[#09090B] dark:text-white font-medium tracking-wider text-[10px] sm:text-[11px] truncate">SAJAL MALHOTRA</span>
          <span className="text-[#D1D5DB] dark:text-[#3F3F46] hidden sm:inline">•</span>
          <span className="text-[#52525B] dark:text-[#A1A1AA] hidden sm:inline">NIT JALANDHAR // IT (2025–2029)</span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <span className="text-[9.5px] text-[#71717A] dark:text-[#52525B] hidden md:inline">
            PRESS &lsquo;1-5&rsquo; TO SWITCH MODULES
          </span>
          <VisitorCounter />
          <a
            href={profile.links.buyMeAChai || 'https://buymeachai.in/sajalmalhotra'}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30 transition-colors font-mono text-[10px] font-medium shadow-xs"
            title="Buy Me a Chai"
          >
            <span>☕</span>
            <span className="hidden xs:inline">CHAI</span>
          </a>
          <ThemeToggle />
          <SajalsTastePlayer />
          <button
            onClick={() => {
              playClick();
              setTerminalOpen(true);
            }}
            className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2.5 py-0.5 rounded bg-white hover:bg-[#F4F4F6] dark:bg-[#141417] dark:hover:bg-[#1E1E24] border border-[#D1D5DB] dark:border-[#27272A] text-[#09090B] dark:text-[#EDEDED] font-medium transition-colors cursor-pointer text-[10px] shadow-xs"
            title="Terminal (~)"
          >
            <Terminal size={10} className="text-[#52525B] dark:text-[#A1A1AA] shrink-0" />
            <span className="hidden xs:inline">CLI (~)</span>
            <span className="xs:hidden">CLI</span>
          </button>
        </div>
      </header>

      {/* ── BESPOKE R&D FIELD CONSOLE (100% IN VIEWPORT) ── */}
      <div className="relative z-10 w-full max-w-5xl flex-1 lg:min-h-0 flex items-center justify-center my-auto py-1">
        <FieldConsole
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenProjectModal={(id) => {
            playModalOpen();
            setModalProjectId(id);
          }}
        />
      </div>

      {/* ── BOTTOM FOOTER CAPTION ── */}
      <footer className="w-full max-w-5xl z-30 flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2 font-mono text-[8.5px] sm:text-[9px] text-[#71717A] dark:text-[#52525B] tracking-wider select-none py-1.5 px-1 border-t border-[#E4E4E7] dark:border-[#18181B] shrink-0 text-center sm:text-left">
        <div>
          DEVDEX // MODEL DX-042 · SM-NITJ-2029
        </div>
        <div>
          MACHINE LEARNING &times; FULL-STACK SYSTEMS &times; AGENTIC ARCHITECTURES
        </div>
      </footer>

      {/* ── PROJECT ARCHITECTURE SPEC MODAL ── */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setModalProjectId(null)}
        />
      )}

      {/* ── DEVELOPER TERMINAL OVERLAY ── */}
      {terminalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-black/60 dark:bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-[#0E0E11] border border-[#E2E4E8] dark:border-[#27272A] rounded-xl shadow-2xl overflow-hidden flex flex-col">
            <div className="h-9 px-3 sm:px-4 bg-[#F4F4F6] dark:bg-[#141417] text-[#09090B] dark:text-white font-mono text-xs font-medium flex items-center justify-between border-b border-[#E2E4E8] dark:border-[#27272A] select-none shrink-0">
              <span className="tracking-wide text-[11px] sm:text-xs">DEVDEX TERMINAL // SHELL</span>
              <button
                onClick={() => setTerminalOpen(false)}
                className="hover:bg-black/10 dark:hover:bg-white/10 p-1 rounded text-[#71717A] hover:text-[#09090B] dark:hover:text-white cursor-pointer transition-colors"
              >
                <X size={14} />
              </button>
            </div>
            <div className="h-[380px] sm:h-[460px] max-h-[75vh] overflow-hidden">
              <DeveloperTerminal
                onOpenModalProject={(id) => {
                  setTerminalOpen(false);
                  setModalProjectId(id);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── KONAMI EASTER EGG ── */}
      <KonamiEasterEgg />

    </main>
  );
}
