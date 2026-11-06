'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile } from '@/data/profile';
import { getAssetPath } from '@/utils/asset';
import { X } from 'lucide-react';

interface PhotoLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PhotoLightboxModal({ isOpen, onClose }: PhotoLightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md cursor-pointer select-none"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.88, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 14 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative flex flex-col items-center cursor-default max-w-sm sm:max-w-md w-full"
          >
            {/* Image Frame with Distinct White Border & Viewfinder Reticles */}
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border-2 border-white shadow-[0_0_50px_rgba(255,255,255,0.25)] bg-[#0A0B0E]">
              {/* Precision Tactical Viewfinder Corner Reticles */}
              <span className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-white z-20 pointer-events-none" />
              <span className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-white z-20 pointer-events-none" />
              <span className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-white z-20 pointer-events-none" />
              <span className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-white z-20 pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 z-30 p-1.5 rounded-full bg-black/75 hover:bg-white hover:text-black text-white border border-white/40 transition-colors cursor-pointer"
                title="Close (Esc)"
              >
                <X size={15} />
              </button>

              {/* Natural Full Color Portrait */}
              <img
                src={getAssetPath('/avatar.png')}
                alt={profile.name}
                className="w-full h-full object-cover object-[center_25%] contrast-[1.03] brightness-100"
              />

              {/* Bottom Spec Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent p-3.5 pt-8 flex items-center justify-between text-white font-mono text-[11px] z-10">
                <div>
                  <div className="font-bold text-white text-xs tracking-wide">{profile.name}</div>
                  <div className="text-[9.5px] text-[#A1A1AA]">NIT JALANDHAR // IT · 2025–2029</div>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded bg-white text-black font-bold uppercase tracking-wider">
                  VERIFIED
                </span>
              </div>
            </div>

            <div className="mt-2.5 text-center font-mono text-[10px] text-white/80 tracking-widest uppercase">
              ESC TO CLOSE // VERIFIED OPERATOR PORTRAIT
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
