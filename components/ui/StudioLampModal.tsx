'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lamp } from 'lucide-react';
import PullCord from '@/components/kokonutui/pull-cord';
import { useTheme } from '@/components/theme/ThemeProvider';
import { useSound } from '@/hooks/useSound';

interface StudioLampModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StudioLampModal({ isOpen, onClose }: StudioLampModalProps) {
  const { theme, toggleTheme, setTheme } = useTheme();
  const { playClick } = useSound();

  const isLight = theme === 'light';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md select-none font-mono"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative flex flex-col items-center bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] rounded-3xl p-5 shadow-2xl max-w-sm w-full"
        >
          {/* Header Bar */}
          <div className="w-full flex items-center justify-between pb-3 border-b border-[#E2E4E8] dark:border-[#22242B] text-xs">
            <div className="flex items-center gap-2 text-[#09090B] dark:text-white font-bold">
              <Lamp size={14} className="text-amber-500" />
              <span className="tracking-wide">STUDIO LIGHTING</span>
            </div>
            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-[#71717A] hover:text-[#09090B] dark:hover:text-white transition-colors cursor-pointer"
              title="Close (Esc)"
            >
              <X size={14} />
            </button>
          </div>

          {/* Kokonut UI PullCord Lamp */}
          <div className="py-4 flex flex-col items-center justify-center">
            <PullCord
              checked={isLight}
              onCheckedChange={(checked) => {
                playClick();
                setTheme(checked ? 'light' : 'dark');
              }}
              label="Studio Lighting Switch"
              className="shadow-inner"
            />
          </div>

          {/* Explanatory Caption */}
          <div className="w-full text-center pt-2 border-t border-[#E2E4E8] dark:border-[#22242B] text-[11px] text-[#71717A] dark:text-[#8E92A2]">
            <p className="font-semibold text-[#09090B] dark:text-white">
              {isLight ? 'LIGHT ENVIRONMENT ACTIVE' : 'DARK ENVIRONMENT ACTIVE'}
            </p>
            <p className="text-[10px] text-[#71717A] mt-0.5">
              Pull cord past tension threshold to switch mode
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
