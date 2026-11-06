'use client';

import { useState } from 'react';
import { profile } from '@/data/profile';
import { getAssetPath } from '@/utils/asset';
import { useSound } from '@/hooks/useSound';
import {
  Mail,
  Phone,
  Download,
  ExternalLink,
  ShieldCheck,
  ArrowUpRight,
  Send,
} from 'lucide-react';

export default function OpportunitiesSection() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { playClick, playHover } = useSound();

  const handleCopy = (text: string, label: string) => {
    playClick();
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section id="contact" className="w-full max-w-[780px] mx-auto py-8 text-left select-none space-y-6">
      
      {/* ── SECTION HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E2E4E8] dark:border-[#22242A] pb-3 gap-3">
        <div className="space-y-1">
          <div className="text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-widest font-semibold">
            04 // CONTACT &amp; OPPORTUNITIES
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-sans text-[#09090B] dark:text-white tracking-tight">
            Have something interesting in mind?
          </h2>
        </div>

        <span className="text-xs font-mono text-[#71717A] dark:text-[#A1A1AA] self-start sm:self-auto">
          malhotrasajal243@gmail.com
        </span>
      </div>

      <p className="text-sm text-[#52525B] dark:text-[#A1A1AA] font-sans leading-relaxed max-w-2xl">
        I&apos;m interested in engineering challenges, applied ML, research, and building products with people who care about the details.
      </p>

      {/* ── TWO PRIMARY PATHS: ENGINEERING & VERIFIED ASSETS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Path 1: Engineering Opportunities */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] space-y-4 shadow-2xs flex flex-col justify-between hover:border-black/30 dark:hover:border-white/30 transition-all">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[9.5px] font-mono text-[#71717A] uppercase font-bold">
              <span>01 // DIRECT COLLABORATION</span>
              <span className="text-emerald-600 dark:text-emerald-400">● AVAILABLE</span>
            </div>

            <h3 className="text-base font-bold text-[#09090B] dark:text-white font-sans">
              Engineering Opportunities
            </h3>

            <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] leading-relaxed font-sans">
              Software engineering, applied ML, and research collaborations. Open to Winter &apos;26 and Summer &apos;27 opportunities, co-ops, and high-impact engineering roles where performance and architecture matter.
            </p>
          </div>

          {/* Email & Phone Contact Relays */}
          <div className="space-y-2 pt-3 border-t border-[#ECEEF2] dark:border-white/10 font-mono text-xs">
            <div className="flex items-center gap-1.5">
              <a
                href={`mailto:${profile.email}`}
                onClick={playClick}
                className="flex-1 p-2.5 rounded-lg bg-[#F9F9FB] hover:bg-[#F1F2F5] dark:bg-[#16171B] dark:hover:bg-[#1F2127] border border-[#E2E4E8] dark:border-[#22242B] text-[#09090B] dark:text-white flex items-center gap-2 transition-colors cursor-pointer min-w-0"
                title="Send Email"
              >
                <Mail size={13} className="text-[#71717A] shrink-0" />
                <span className="truncate text-xs font-medium">{profile.email}</span>
              </a>

              <button
                onClick={() => handleCopy(profile.email, 'email')}
                className="p-2.5 rounded-lg bg-white hover:bg-[#F4F4F6] dark:bg-[#16171B] dark:hover:bg-[#1F2127] border border-[#E2E4E8] dark:border-[#22242B] text-[#09090B] dark:text-[#EDEDED] font-bold text-[10px] transition-colors cursor-pointer shrink-0"
                title="Copy Email to Clipboard"
              >
                {copiedField === 'email' ? 'COPIED' : 'COPY'}
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <a
                href={`tel:${profile.phone}`}
                onClick={playClick}
                className="flex-1 p-2.5 rounded-lg bg-[#F9F9FB] hover:bg-[#F1F2F5] dark:bg-[#16171B] dark:hover:bg-[#1F2127] border border-[#E2E4E8] dark:border-[#22242B] text-[#09090B] dark:text-white flex items-center gap-2 transition-colors cursor-pointer min-w-0"
                title="Call Phone"
              >
                <Phone size={13} className="text-[#71717A] shrink-0" />
                <span className="text-xs font-medium">{profile.phone}</span>
              </a>

              <button
                onClick={() => handleCopy(profile.phone, 'phone')}
                className="p-2.5 rounded-lg bg-white hover:bg-[#F4F4F6] dark:bg-[#16171B] dark:hover:bg-[#1F2127] border border-[#E2E4E8] dark:border-[#22242B] text-[#09090B] dark:text-[#EDEDED] font-bold text-[10px] transition-colors cursor-pointer shrink-0"
                title="Copy Phone to Clipboard"
              >
                {copiedField === 'phone' ? 'COPIED' : 'COPY'}
              </button>
            </div>

            <div className="pt-1.5 text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA] flex items-center justify-between">
              <span>LOCATION: JALANDHAR, PUNJAB</span>
              <span>NIT JALANDHAR &apos;29</span>
            </div>
          </div>
        </div>

        {/* Path 2: Selected Assets */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] space-y-4 shadow-2xs flex flex-col justify-between hover:border-black/30 dark:hover:border-white/30 transition-all">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[9.5px] font-mono text-[#71717A] uppercase font-bold">
              <span>02 // VERIFIED ASSETS</span>
              <ShieldCheck size={13} className="text-blue-500" />
            </div>

            <h3 className="text-base font-bold text-[#09090B] dark:text-white font-sans">
              Selected Assets &amp; Profiles
            </h3>

            <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] leading-relaxed font-sans">
              Download the latest engineering curriculum vitae, explore open-source system repositories, or connect across verified professional networks.
            </p>
          </div>

          {/* Quick Action Grid */}
          <div className="space-y-2 pt-3 border-t border-[#ECEEF2] dark:border-white/10 font-mono text-xs">
            <div className="grid grid-cols-2 gap-2">
              <a
                href={getAssetPath('/resume.pdf')}
                target="_blank"
                rel="noreferrer"
                download="Sajal_Malhotra_Resume.pdf"
                onMouseEnter={playHover}
                className="p-2.5 rounded-lg bg-black hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black flex items-center justify-between transition-colors cursor-pointer font-bold shadow-2xs"
              >
                <span className="text-[11px]">RESUME.PDF</span>
                <Download size={13} />
              </a>

              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={playHover}
                className="p-2.5 rounded-lg bg-white hover:bg-[#F4F4F6] dark:bg-[#16171B] dark:hover:bg-[#202227] border border-[#E2E4E8] dark:border-[#22242B] text-[#09090B] dark:text-[#EDEDED] flex items-center justify-between transition-colors cursor-pointer font-bold"
              >
                <span className="text-[11px]">LINKEDIN</span>
                <ArrowUpRight size={13} />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={playHover}
                className="p-2.5 rounded-lg bg-white hover:bg-[#F4F4F6] dark:bg-[#16171B] dark:hover:bg-[#202227] border border-[#E2E4E8] dark:border-[#22242B] text-[#09090B] dark:text-[#EDEDED] flex items-center justify-between transition-colors cursor-pointer font-medium"
              >
                <span className="text-[11px]">GITHUB</span>
                <ArrowUpRight size={13} />
              </a>

              <a
                href={profile.links.twitter}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={playHover}
                className="p-2.5 rounded-lg bg-white hover:bg-[#F4F4F6] dark:bg-[#16171B] dark:hover:bg-[#202227] border border-[#E2E4E8] dark:border-[#22242B] text-[#09090B] dark:text-[#EDEDED] flex items-center justify-between transition-colors cursor-pointer font-medium"
              >
                <span className="text-[11px]">X (TWITTER)</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
