'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { useSound } from '@/hooks/useSound';
import { useToast } from '@/components/ui/ToastProvider';

interface MicroCopyButtonProps {
  text: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
  title?: string;
}

export default function MicroCopyButton({
  text,
  label = 'COPY',
  copiedLabel = 'COPIED',
  className = '',
  title = 'Copy to clipboard',
}: MicroCopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const { playClick, playHover } = useSound();
  const { toast } = useToast();

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    playClick();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: 'Copied to Clipboard',
        description: text,
        type: 'copy',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard fallback
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleCopy}
      onMouseEnter={playHover}
      whileTap={{ scale: 0.94 }}
      className={`relative px-2.5 py-2 rounded-lg font-mono text-[10px] font-bold border transition-colors cursor-pointer shrink-0 select-none ${
        copied
          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
          : 'bg-white hover:bg-[#F4F4F6] dark:bg-[#16171B] dark:hover:bg-[#1F2127] border-[#E2E4E8] dark:border-[#22242B] text-[#09090B] dark:text-[#EDEDED]'
      } ${className}`}
      title={title}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="copied"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            className="flex items-center gap-1 leading-none"
          >
            <Check size={11} className="shrink-0 stroke-[2.5]" />
            <span>{copiedLabel}</span>
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            className="flex items-center gap-1 leading-none"
          >
            <Copy size={11} className="shrink-0 opacity-60" />
            <span>{label}</span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
