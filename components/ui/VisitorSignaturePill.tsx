'use client';

import React, { useState, useEffect } from 'react';
import { useSound } from '@/hooks/useSound';
import { PenTool, CheckCircle2 } from 'lucide-react';

const ACTIVE_USER_KEY = 'sajdex_signed_user';

export default function VisitorSignaturePill() {
  const { playClick, playHover } = useSound();
  const [signedName, setSignedName] = useState<string | null>(null);

  useEffect(() => {
    const checkSignedStatus = () => {
      try {
        const stored = localStorage.getItem(ACTIVE_USER_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.name) {
            setSignedName(parsed.name);
          }
        }
      } catch {
        // Ignore localStorage error
      }
    };

    checkSignedStatus();
    // Re-check periodically or on custom storage event
    window.addEventListener('storage', checkSignedStatus);
    const interval = setInterval(checkSignedStatus, 2500);

    return () => {
      window.removeEventListener('storage', checkSignedStatus);
      clearInterval(interval);
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    playClick();
    const target = document.getElementById('guestbook');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href="#guestbook"
      onClick={handleClick}
      onMouseEnter={playHover}
      className="fixed bottom-5 left-4 sm:left-6 z-40 group flex items-center gap-2 px-3 py-2 rounded-full bg-white/90 hover:bg-white dark:bg-[#111216]/90 dark:hover:bg-[#16171D] border border-[#E2E4E8] dark:border-[#27272A] shadow-md hover:shadow-lg transition-all text-xs font-mono select-none cursor-pointer active:scale-95 backdrop-blur-md"
      title={signedName ? `You signed as ${signedName}` : 'Sign the visitor dossier log'}
    >
      {signedName ? (
        <>
          <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
          <span className="text-[#09090B] dark:text-white font-medium max-w-[130px] truncate">
            Signed · {signedName}
          </span>
        </>
      ) : (
        <>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <PenTool size={12} className="text-[#71717A] dark:text-[#A1A1AA] group-hover:text-black dark:group-hover:text-white transition-colors shrink-0" />
          <span className="text-[#52525B] dark:text-[#D4D4D8] group-hover:text-black dark:group-hover:text-white transition-colors font-medium">
            Sign Dossier
          </span>
        </>
      )}
    </a>
  );
}
