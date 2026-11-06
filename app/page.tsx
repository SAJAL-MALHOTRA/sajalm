'use client';

import { useState, useEffect } from 'react';
import NavigationHeader from '@/components/home/NavigationHeader';
import EditorialHero from '@/components/home/EditorialHero';
import SocialsAndGithubCalendar from '@/components/home/SocialsAndGithubCalendar';
import ProjectsSection from '@/components/home/ProjectsSection';
import DualSpectrum from '@/components/home/DualSpectrum';
import OpportunitiesSection from '@/components/home/OpportunitiesSection';
import MinimalFooter from '@/components/home/MinimalFooter';
import ProjectModal from '@/components/ui/ProjectModal';
import DeveloperTerminal from '@/components/terminal/DeveloperTerminal';
import PhotoLightboxModal from '@/components/ui/PhotoLightboxModal';
import KonamiEasterEgg from '@/components/ui/KonamiEasterEgg';
import { projects } from '@/data/projects';
import { useSound } from '@/hooks/useSound';
import { X, ArrowUp } from 'lucide-react';

export type ViewType = 'overview' | 'hero' | 'home' | 'work' | 'about' | 'skills' | 'experience' | 'contact' | 'resume' | 'terminal';

export default function Home() {
  const [modalProjectId, setModalProjectId] = useState<string | null>(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [photoZoomOpen, setPhotoZoomOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

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
        if (terminalOpen) setTerminalOpen(false);
        else if (modalProjectId) setModalProjectId(null);
        else if (photoZoomOpen) setPhotoZoomOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playClick, terminalOpen, modalProjectId, photoZoomOpen]);

  // Scroll listener for Back to Top button (Throttled with state change guard)
  useEffect(() => {
    let ticking = false;
    let isShown = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldShow = window.scrollY > 400;
          if (shouldShow !== isShown) {
            isShown = shouldShow;
            setShowScrollTop(shouldShow);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#F4F4F6] dark:bg-[#09090B] text-[#09090B] dark:text-[#EDEDED] font-sans antialiased selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black flex flex-col items-center relative overflow-x-hidden">
      
      {/* ── TECHNICAL DOT GRID (GPU-ACCELERATED LAYER) ── */}
      <div className="fixed inset-0 bg-[radial-gradient(#CBD0D8_1px,transparent_1px)] dark:bg-[radial-gradient(#27272A_1px,transparent_1px)] [background-size:20px_20px] opacity-45 dark:opacity-30 pointer-events-none -z-10" />

      {/* ── PERSISTENT TOP AMBIENT STATUS NAVIGATION ── */}
      <NavigationHeader onOpenTerminal={() => setTerminalOpen(true)} />

      {/* ── MAIN EDITORIAL SCROLLING CONTAINER ── */}
      <main className="relative z-10 w-full flex flex-col items-center px-3 sm:px-6">
        
        {/* 0. Hero: Editorial Introduction & Operator Dossier */}
        <EditorialHero
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenPhotoZoom={() => setPhotoZoomOpen(true)}
        />

        {/* 01 // SOCIALS & GITHUB ACTIVITY CALENDAR (SEAMLESS IN LIGHT & DARK MODE) */}
        <SocialsAndGithubCalendar />

        {/* 02 // SHIPPED SYSTEMS: 4-Card Flagship Showcase */}
        <ProjectsSection
          onOpenProjectModal={(id) => {
            playModalOpen();
            setModalProjectId(id);
          }}
        />

        {/* 02 // THE DUAL SPECTRUM: Technical Arsenal + Creative Orbit */}
        <DualSpectrum />

        {/* 03 // OPPORTUNITIES & DISPATCH: Direct Contact Hub */}
        <OpportunitiesSection />

      </main>

      {/* ── MINIMALIST EDITORIAL FOOTER (MATCHING DESIGN SPEC) ── */}
      <MinimalFooter />

      {/* ── FLOATING BACK TO TOP BUTTON ── */}
      {showScrollTop && (
        <a
          href="#intro"
          onClick={playClick}
          className="fixed bottom-5 right-5 z-40 p-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer"
          title="Scroll to Top"
        >
          <ArrowUp size={15} />
        </a>
      )}

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

      {/* ── PORTRAIT ZOOM LIGHTBOX MODAL ── */}
      <PhotoLightboxModal
        isOpen={photoZoomOpen}
        onClose={() => setPhotoZoomOpen(false)}
      />

      {/* ── KONAMI EASTER EGG ── */}
      <KonamiEasterEgg />

    </div>
  );
}
