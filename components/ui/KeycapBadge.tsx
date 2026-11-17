'use client';

import React, { useState, useEffect } from 'react';

interface KeycapBadgeProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  size?: 'xs' | 'sm' | 'md';
  reactiveKey?: string;
}

export default function KeycapBadge({
  children,
  className = '',
  size = 'md',
  reactiveKey,
  ...props
}: KeycapBadgeProps) {
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (!reactiveKey) return;

    const targetKey = reactiveKey.toLowerCase();

    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (e.target as HTMLElement)?.tagName?.toUpperCase();
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;

      const eventKey = e.key.toLowerCase();
      if (
        eventKey === targetKey ||
        (targetKey === '~' && (eventKey === '`' || eventKey === '~')) ||
        (targetKey === 'escape' && eventKey === 'esc')
      ) {
        setIsPressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const eventKey = e.key.toLowerCase();
      if (
        eventKey === targetKey ||
        (targetKey === '~' && (eventKey === '`' || eventKey === '~')) ||
        (targetKey === 'escape' && eventKey === 'esc')
      ) {
        setIsPressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [reactiveKey]);

  const sizeClasses =
    size === 'xs'
      ? 'px-1 py-0 text-[8.5px] min-w-[14px]'
      : size === 'sm'
      ? 'px-1.5 py-0.5 text-[9.5px] min-w-[18px]'
      : 'px-1.5 py-0.5 text-[10.5px] min-w-[20px]';

  const pressedClasses = isPressed
    ? 'translate-y-[1.5px] shadow-none bg-neutral-300 dark:bg-neutral-700 text-black dark:text-white border-neutral-400 dark:border-neutral-500'
    : 'shadow-[0_1.5px_0_0_#D1D5DB] dark:shadow-[0_1.5px_0_0_#2E3038] text-[#52525B] dark:text-[#A1A1AA] bg-[#F4F4F6] dark:bg-[#18191E] border-[#D1D5DB] dark:border-[#2E3038] active:shadow-none active:translate-y-[1px]';

  return (
    <kbd
      className={`inline-flex items-center justify-center rounded font-mono font-bold leading-none select-none border transition-all duration-75 ${sizeClasses} ${pressedClasses} ${className}`}
      {...props}
    >
      {children}
    </kbd>
  );
}
