'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAssetPath } from '@/utils/asset';
import { useSound } from '@/hooks/useSound';
import { Maximize2, Camera, X, Layers, Sparkles } from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';

interface LookbookItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  tag: string;
  imageSrc: string;
  description: string;
}

const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: 'fmc-runway',
    index: '01',
    title: 'Stage Choreography & Composure',
    subtitle: 'NIT Jalandhar Fashion & Modelling Club',
    tag: 'FMC RUNWAY',
    imageSrc: '/avatar.png',
    description: 'Disciplined runway walking, stage lighting composure, and high-impact live presentations at NIT Jalandhar.',
  },
  {
    id: 'tailoring-geometry',
    index: '02',
    title: 'Structured Silhouette & Drape',
    subtitle: 'Proportion, texture contrast, and weight',
    tag: 'TAILORING',
    imageSrc: '/fit_leather_jacket.png',
    description: 'Disciplined focus on tailoring geometry, texture contrast, and structural leather drape—applying systems rigor to silhouette.',
  },
  {
    id: 'monochrome-purity',
    index: '03',
    title: 'Monochrome Tonal Precision',
    subtitle: 'High contrast, black/graphite palettes',
    tag: 'ATELIER',
    imageSrc: '/sajal.png',
    description: 'Exacting visual clarity and proportion without decorative excess. Minimalist tonal hierarchy shared across code and fashion.',
  },
];

export default function EditorialLookbookStrip() {
  const { playClick, playHover } = useSound();
  const [activeImage, setActiveImage] = useState<LookbookItem | null>(null);

  return (
    <div className="space-y-3 pt-2">
      <div className="flex items-center justify-between font-mono text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-wider pb-1">
        <span className="flex items-center gap-1.5 font-bold text-[#09090B] dark:text-white">
          <Camera size={12} className="text-purple-500" />
          <span>FMC Runway &amp; Editorial Lookbook</span>
        </span>
        <span>NITJ RUNWAY &apos;25 // 3 ARCHIVES</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {LOOKBOOK_ITEMS.map((item) => (
          <SpotlightCard
            key={item.id}
            onClick={() => {
              playClick();
              setActiveImage(item);
            }}
            onMouseEnter={playHover}
            className="group relative rounded-xl overflow-hidden bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] p-3 space-y-3 cursor-pointer shadow-2xs hover:border-black/30 dark:hover:border-white/30 transition-all"
          >
            {/* Image Preview Container */}
            <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-[#0A0B0E] border border-black/5 dark:border-white/5">
              <img
                src={getAssetPath(item.imageSrc)}
                alt={item.title}
                className="w-full h-full object-cover object-center grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />

              {/* Tactical Viewfinder Corner Marks */}
              <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-white/70 pointer-events-none" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-white/70 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-white/70 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-white/70 pointer-events-none" />

              {/* Hover Zoom Reticle Pill */}
              <div className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded-md bg-black/75 backdrop-blur-sm text-white text-[9.5px] font-mono flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>ZOOM</span>
                <Maximize2 size={10} />
              </div>

              {/* Tag Pill */}
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-sm text-white text-[9px] font-mono font-semibold tracking-wider">
                [{item.index}] {item.tag}
              </div>
            </div>

            {/* Captions */}
            <div className="space-y-1">
              <div className="text-xs font-bold font-sans text-[#09090B] dark:text-white group-hover:underline">
                {item.title}
              </div>
              <div className="text-[10.5px] font-mono text-[#71717A] dark:text-[#A1A1AA] line-clamp-1">
                {item.subtitle}
              </div>
              <p className="text-[11.5px] font-sans text-[#52525B] dark:text-[#A1A1AA] leading-relaxed pt-1">
                {item.description}
              </p>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* ── LIGHTBOX ZOOM MODAL ── */}
      <AnimatePresence>
        {activeImage && (
          <div
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md cursor-pointer select-none"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 12 }}
              transition={{ type: 'spring', damping: 26, stiffness: 340 }}
              className="relative max-w-sm sm:max-w-md w-full bg-[#0E0F12] border border-white/20 rounded-2xl overflow-hidden shadow-2xl cursor-default"
            >
              <div className="relative aspect-[4/5] w-full bg-black">
                <img
                  src={getAssetPath(activeImage.imageSrc)}
                  alt={activeImage.title}
                  className="w-full h-full object-cover object-center"
                />
                <button
                  onClick={() => setActiveImage(null)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-black/75 hover:bg-white hover:text-black text-white border border-white/30 transition-colors cursor-pointer"
                  title="Close"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="p-4 space-y-1.5 bg-[#121316] border-t border-white/10 text-white font-sans">
                <div className="flex items-center justify-between font-mono text-[10px] text-[#A1A1AA]">
                  <span>[{activeImage.index}] {activeImage.tag}</span>
                  <span>NIT JALANDHAR FMC</span>
                </div>
                <h4 className="text-base font-bold text-white tracking-tight">
                  {activeImage.title}
                </h4>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  {activeImage.description}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
