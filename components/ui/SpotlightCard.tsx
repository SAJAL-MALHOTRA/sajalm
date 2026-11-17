'use client';

import React, { useRef, useState, useCallback } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightDarkColor?: string;
  radius?: number;
  tilt?: boolean;
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(0, 0, 0, 0.04)',
  spotlightDarkColor = 'rgba(255, 255, 255, 0.09)',
  radius = 320,
  tilt = true,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [tiltStyle, setTiltStyle] = useState<{ rotateX: number; rotateY: number }>({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setPosition({ x, y });

      if (tilt) {
        // Subtle, physical 3D perspective tilt (max ~3.5 deg for weighted feel)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = -((y - centerY) / centerY) * 3.2;
        const rotateY = ((x - centerX) / centerX) * 3.2;
        setTiltStyle({ rotateX, rotateY });
      }
    },
    [tilt]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setPosition(null);
    setTiltStyle({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <div style={{ perspective: 1200 }} className="h-full w-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            isHovered && tilt
              ? `rotateX(${tiltStyle.rotateX}deg) rotateY(${tiltStyle.rotateY}deg) translateZ(3px)`
              : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
          transition: isHovered
            ? 'transform 0.08s ease-out'
            : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className={`relative overflow-hidden group/spotlight will-change-transform ${className}`}
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

        {/* Dark Mode Luminous Obsidian Radial Cursor Wash */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 hidden dark:block z-0"
          style={{
            opacity: isHovered && position ? 1 : 0,
            background: position
              ? `radial-gradient(${radius}px circle at ${position.x}px ${position.y}px, ${spotlightDarkColor}, transparent 80%)`
              : undefined,
          }}
        />

        {/* Specular Hairline Surface Glare */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-10"
          style={{
            opacity: isHovered && position ? 0.45 : 0,
            background: position
              ? `radial-gradient(${radius * 0.6}px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.08), transparent 70%)`
              : undefined,
          }}
        />

        {/* Content wrapper with relative positioning */}
        <div className="relative z-20 w-full h-full flex flex-col justify-between">
          {children}
        </div>
      </div>
    </div>
  );
}
