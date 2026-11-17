'use client';

import React from 'react';

interface KeycapBadgeProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  size?: 'xs' | 'sm' | 'md';
}

export default function KeycapBadge({
  children,
  className = '',
  size = 'md',
  ...props
}: KeycapBadgeProps) {
  const sizeClasses =
    size === 'xs'
      ? 'px-1 py-0 text-[8.5px] min-w-[14px]'
      : size === 'sm'
      ? 'px-1.5 py-0.5 text-[9.5px] min-w-[18px]'
      : 'px-1.5 py-0.5 text-[10.5px] min-w-[20px]';

  return (
    <kbd
      className={`inline-flex items-center justify-center rounded font-mono font-bold leading-none select-none text-[#52525B] dark:text-[#A1A1AA] bg-[#F4F4F6] dark:bg-[#18191E] border border-[#D1D5DB] dark:border-[#2E3038] shadow-[0_1.5px_0_0_#D1D5DB] dark:shadow-[0_1.5px_0_0_#2E3038] active:shadow-none active:translate-y-[1px] transition-all duration-75 ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </kbd>
  );
}
