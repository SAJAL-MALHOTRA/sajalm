'use client';

import React, { useState, useEffect } from 'react';

export default function LocalTimeStatus() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#ECEEF2] dark:bg-[#15161B] border border-[#D1D5DB] dark:border-[#27272A] text-[11px] font-mono text-[#52525B] dark:text-[#A1A1AA] select-none">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
      <span>Jalandhar, IN</span>
      <span className="text-[#A1A1AA] dark:text-[#3F3F46]">·</span>
      <span className="font-semibold text-[#09090B] dark:text-[#EDEDED]">
        {time || 'IST (UTC+5:30)'}
      </span>
    </div>
  );
}
