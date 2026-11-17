'use client';

import React, { useRef, useState, useCallback } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightDarkColor?: string;
  radius?: number;
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(0, 0, 0, 0.035)',
  spotlightDarkColor = 'rgba(255, 255, 255, 0.07)',
  radius = 300,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setPosition(null);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden group/spotlight ${className}`}
      {...props}
    >
      {/* Light Mode Subtle Radial Cursor Wash */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 dark:hidden z-0"
        style={{
          opacity: isHovered && position ? 1 : 0,
          background: position
            ? `radial-gradient(${radius}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`
            : undefined,
        }}
      />

      {/* Dark Mode Subtle Radial Cursor Wash */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 hidden dark:block z-0"
        style={{
          opacity: isHovered && position ? 1 : 0,
          background: position
            ? `radial-gradient(${radius}px circle at ${position.x}px ${position.y}px, ${spotlightDarkColor}, transparent 80%)`
            : undefined,
        }}
      />

      {/* Content wrapper with relative positioning so it sits above the spotlight */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}
