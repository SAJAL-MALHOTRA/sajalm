'use client';

import React, { useState } from 'react';
import CardFlip from '@/components/kokonutui/card-flip';
import { getAssetPath } from '@/utils/asset';
import { profile } from '@/data/profile';
import { useSound } from '@/hooks/useSound';
import {
  Maximize2,
  RotateCw,
  CheckCircle2,
  ShieldCheck,
  Mail,
  Phone,
  Copy,
  Check,
  UserPlus,
} from 'lucide-react';

interface HeroBadgeCardProps {
  onOpenPhotoZoom: () => void;
}

export default function HeroBadgeCard({ onOpenPhotoZoom }: HeroBadgeCardProps) {
  const { playClick, playHover } = useSound();
  const [flipped, setFlipped] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const toggleFlip = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    playClick();
    setFlipped((prev) => !prev);
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClick();
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleDownloadVCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClick();
    const cleanPhone = profile.phone.replace(/\s+/g, '');
    const vcardContent = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Malhotra;Sajal;;;',
      'FN:Sajal Malhotra',
      'ORG:NIT Jalandhar',
      'TITLE:Software Engineer',
      `EMAIL;TYPE=INTERNET,PREF:${profile.email}`,
      `TEL;TYPE=CELL:${cleanPhone}`,
      'URL:https://sajal-malhotra.github.io/sajalm/',
      'NOTE:B.Tech Information Technology, NIT Jalandhar Class of 2029',
      'END:VCARD',
    ].join('\r\n');

    const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Sajal_Malhotra.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-[280px] sm:w-[260px] md:w-[270px] shrink-0 self-center sm:self-start select-none">
      <CardFlip
        axis="y"
        flipped={flipped}
        onFlippedChange={setFlipped}
        label="Sajal Malhotra Engineering Credential ID Badge"
        className="w-full aspect-[4/5.4] group/flick"
        faceClassName="bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] rounded-2xl p-2.5 shadow-sm overflow-hidden flex flex-col justify-between"
        front={
          <div className="w-full h-full flex flex-col justify-between">
            {/* Top Lanyard Notch Slot */}
            <div className="w-full flex items-center justify-between px-1 pt-0.5 pb-2">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span>ID // NITJ-29</span>
              </div>
              <div className="w-12 h-1.5 rounded-full bg-[#E2E4E8] dark:bg-[#27272A] border border-black/5 dark:border-white/5" />
              <button
                type="button"
                data-no-flip
                onClick={toggleFlip}
                className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono text-[#71717A] hover:text-[#09090B] dark:text-[#A1A1AA] dark:hover:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10 transition-colors cursor-pointer"
                title="Flip to view engineering dossier card"
              >
                <span>FLIP</span>
                <RotateCw size={9} />
              </button>
            </div>

            {/* Portrait Photo Container with Viewfinder Accents */}
            <div className="relative w-full aspect-[4/4.8] rounded-xl overflow-hidden bg-[#0A0B0E] border border-black/5 dark:border-white/10 group">
              {/* Corner Viewfinder Marks */}
              <span className="absolute top-1.5 left-1.5 w-2 h-2 border-t-2 border-l-2 border-white/60 z-10 pointer-events-none" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 border-t-2 border-r-2 border-white/60 z-10 pointer-events-none" />
              <span className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b-2 border-l-2 border-white/60 z-10 pointer-events-none" />
              <span className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b-2 border-r-2 border-white/60 z-10 pointer-events-none" />

              <img
                src={getAssetPath('/avatar.png')}
                alt={profile.name}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover object-[center_25%] contrast-[1.03] group-hover:scale-105 transition-transform duration-500 pointer-events-none"
              />

              {/* Photo Zoom Overlay Button */}
              <button
                type="button"
                data-no-flip
                onClick={(e) => {
                  e.stopPropagation();
                  playClick();
                  onOpenPhotoZoom();
                }}
                onMouseEnter={playHover}
                className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                title="Click to zoom portrait"
              >
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 text-black text-xs font-mono font-bold shadow-lg">
                  <Maximize2 size={12} />
                  <span>Zoom Portrait</span>
                </div>
              </button>
            </div>

            {/* Clean Footer Caption */}
            <div className="pt-2 px-1 flex items-center justify-between text-xs font-mono text-[#71717A] dark:text-[#A1A1AA]">
              <div className="flex flex-col">
                <span className="font-semibold font-sans text-xs text-[#09090B] dark:text-white leading-tight">
                  Sajal Malhotra
                </span>
                <span className="text-[10px] text-[#71717A] dark:text-[#8E92A2]">
                  Jalandhar, India
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                ACTIVE
              </span>
            </div>
          </div>
        }
        back={
          <div className="w-full h-full flex flex-col justify-between text-left font-mono">
            {/* Top Lanyard Notch Slot */}
            <div className="w-full flex items-center justify-between px-1 pt-0.5 pb-1 border-b border-[#E2E4E8] dark:border-[#22242B]">
              <div className="flex items-center gap-1 text-[10px] font-bold text-[#09090B] dark:text-white tracking-wide">
                <ShieldCheck size={11} className="text-emerald-500" />
                <span>ENGINEERING DOSSIER</span>
              </div>
              <button
                type="button"
                data-no-flip
                onClick={toggleFlip}
                className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] text-[#71717A] hover:text-[#09090B] dark:text-[#A1A1AA] dark:hover:text-white bg-black/5 dark:bg-white/5 transition-colors cursor-pointer"
                title="Flip back to portrait"
              >
                <span>FRONT</span>
                <RotateCw size={9} />
              </button>
            </div>

            {/* Dossier Credential Fields */}
            <div className="space-y-2 py-1 px-1 text-[11px]">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#71717A] dark:text-[#8E92A2] block">
                  IDENTITY &amp; INSTITUTION
                </span>
                <p className="font-sans font-semibold text-xs text-[#09090B] dark:text-white leading-snug">
                  Sajal Malhotra
                </p>
                <p className="text-[10.5px] text-[#52525B] dark:text-[#A1A1AA]">
                  NIT Jalandhar · IT Class of &apos;29
                </p>
              </div>

              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#71717A] dark:text-[#8E92A2] block">
                  CORE SPECIALIZATION
                </span>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  <span className="px-1.5 py-0.5 rounded text-[9.5px] bg-[#F4F4F6] dark:bg-[#1A1C23] text-[#09090B] dark:text-[#D4D4D8] border border-[#E2E4E8] dark:border-[#2B2D38]">
                    Distributed Systems
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9.5px] bg-[#F4F4F6] dark:bg-[#1A1C23] text-[#09090B] dark:text-[#D4D4D8] border border-[#E2E4E8] dark:border-[#2B2D38]">
                    Applied ML
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9.5px] bg-[#F4F4F6] dark:bg-[#1A1C23] text-[#09090B] dark:text-[#D4D4D8] border border-[#E2E4E8] dark:border-[#2B2D38]">
                    WebRTC Mesh
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#71717A] dark:text-[#8E92A2] block">
                  CANONICAL RELAY
                </span>
                <div className="space-y-0.5 text-[10px] text-[#52525B] dark:text-[#A1A1AA]">
                  <div className="flex items-center gap-1 truncate">
                    <Mail size={10} className="shrink-0 text-[#71717A]" />
                    <span className="truncate">malhotrasajal243@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone size={10} className="shrink-0 text-[#71717A]" />
                    <span>+91 62845 96119</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick-Action Relay Bar */}
            <div className="pt-1.5 px-1 border-t border-[#E2E4E8] dark:border-[#22242B] space-y-1.5">
              <div className="flex items-center justify-between text-[8.5px] text-[#71717A] dark:text-[#8E92A2]">
                <span>KEY: NITJ-SM-2029</span>
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={9} />
                  <span>VERIFIED</span>
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  data-no-flip
                  onClick={handleCopyEmail}
                  className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 text-[#09090B] dark:text-white border border-[#E2E4E8] dark:border-[#27272A] text-[10px] font-mono font-medium transition-colors cursor-pointer active:scale-95"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={11} className="text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy size={11} className="text-[#71717A] dark:text-[#A1A1AA]" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  data-no-flip
                  onClick={handleDownloadVCard}
                  className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-black text-white dark:bg-white dark:text-black hover:opacity-90 text-[10px] font-mono font-semibold transition-opacity cursor-pointer active:scale-95 shadow-2xs"
                  title="Download vCard contact"
                >
                  <UserPlus size={11} />
                  <span>Save Contact</span>
                </button>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}
