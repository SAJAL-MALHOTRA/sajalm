'use client';

import { useTheme } from './ThemeProvider';
import { useSound } from '@/hooks/useSound';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { playClick, playHover } = useSound();

  const handleToggle = () => {
    playClick();
    toggleTheme();
  };

  const isLight = theme === 'light';

  return (
    <button
      onClick={handleToggle}
      onMouseEnter={playHover}
      className={`flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 rounded border text-[10px] font-mono tracking-wider transition-colors cursor-pointer select-none ${
        isLight
          ? 'bg-white hover:bg-[#F4F4F6] text-[#09090B] border-[#D1D5DB] shadow-xs'
          : 'bg-[#141417] hover:bg-[#1E1E24] text-[#EDEDED] border-[#27272A]'
      }`}
      title={isLight ? 'Switch to Dark Mode (☾)' : 'Switch to Light Mode (☼)'}
      aria-label="Toggle light/dark theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isLight ? (
          <motion.div
            key="light"
            initial={{ rotate: -60, scale: 0.7, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 60, scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1 sm:gap-1.5"
          >
            <Sun size={10} className="text-amber-500 fill-amber-400/20 shrink-0" />
            <span className="font-semibold tracking-wider hidden xs:inline">LIGHT</span>
          </motion.div>
        ) : (
          <motion.div
            key="dark"
            initial={{ rotate: -60, scale: 0.7, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 60, scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1 sm:gap-1.5"
          >
            <Moon size={10} className="text-zinc-300 fill-zinc-400/20 shrink-0" />
            <span className="font-semibold tracking-wider hidden xs:inline">DARK</span>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
