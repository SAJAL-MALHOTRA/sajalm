'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import BadgeContainer from '@/components/badge/BadgeContainer';
import KeycapBadge from '@/components/ui/KeycapBadge';
import { useSound } from '@/hooks/useSound';

interface InteractiveBadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InteractiveBadgeModal({
  isOpen,
  onClose,
}: InteractiveBadgeModalProps) {
  const { playClick } = useSound();

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
        className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-mono select-none"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative flex flex-col items-center max-w-md w-full"
        >
          {/* Top Control Bar */}
          <div className="w-full flex items-center justify-between pb-3 px-2 text-xs text-[#A1A1AA]">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-white tracking-wide uppercase">
                ENGINEERING CREDENTIAL DOSSIER
              </span>
              <KeycapBadge size="xs" className="text-white bg-white/10 border-white/20">
                FLIP [3D]
              </KeycapBadge>
            </div>

            <div className="flex items-center gap-2">
              <KeycapBadge size="xs" className="hidden sm:inline-flex text-white bg-white/10 border-white/20">
                ESC
              </KeycapBadge>
              <button
                onClick={() => {
                  playClick();
                  onClose();
                }}
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
                title="Close Badge (Esc)"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* 3D Flippable Badge Component */}
          <BadgeContainer onBadgeIn={() => onClose()} />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
