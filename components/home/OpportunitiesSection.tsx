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
  Coffee,
  Check,
  ShieldCheck,
  Code2,
  ArrowUpRight,
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
    <section id="contact" className="w-full max-w-5xl py-10 space-y-6 text-left select-none">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E2E4E8] dark:border-[#22242A] pb-3 gap-2">
        <div className="space-y-1">
          <div className="text-[9.5px] font-mono text-[#71717A] uppercase tracking-widest">
            03 // OPPORTUNITIES &amp; CONTACT HUB
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-[#09090B] dark:text-white tracking-tight">
            Internships, Roles &amp; Contact
          </h2>
        </div>

        <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 self-start sm:self-auto font-bold">
          ● OPEN TO SWE &amp; ML OPPORTUNITIES
        </span>
      </div>

      {/* Balanced 2-Card Contact Hub (Form Removed) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Card 1: Direct Inquiries & Roles */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] space-y-4 shadow-xs flex flex-col justify-between hover:border-black/30 dark:hover:border-white/30 transition-all">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#71717A] uppercase font-bold">
              <span>ENGINEERING RECRUITMENT</span>
              <span className="text-emerald-600 dark:text-emerald-400">● AVAILABLE NOW</span>
            </div>

            <h3 className="text-lg font-bold text-[#09090B] dark:text-white font-sans">
              Looking for Engineering Opportunities
            </h3>

            <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] leading-relaxed font-sans">
              I thrive in high-ownership environments building real-time products, machine learning reasoning engines, and resilient distributed platforms. Available for Summer 2026 internships, fall co-ops, and high-impact software engineering roles.
            </p>
          </div>

          {/* Email & Phone Contact Relays */}
          <div className="space-y-2 pt-3 border-t border-[#ECEEF2] dark:border-white/10 font-mono text-xs">
            <div className="flex items-center gap-1.5">
              <a
                href={`mailto:${profile.email}`}
                onClick={playClick}
                className="flex-1 p-2.5 rounded-xl bg-[#F9F9FB] hover:bg-[#F1F2F5] dark:bg-[#16171B] dark:hover:bg-[#1F2127] border border-[#D1D5DB] dark:border-[#27272A] text-[#09090B] dark:text-white flex items-center gap-2 transition-colors cursor-pointer min-w-0"
                title="Send Email"
              >
                <Mail size={13} className="text-[#71717A] shrink-0" />
                <span className="truncate text-[11px] sm:text-xs font-medium">{profile.email}</span>
              </a>

              <button
                onClick={() => handleCopy(profile.email, 'email')}
                className="p-2.5 rounded-xl bg-white hover:bg-[#F4F4F6] dark:bg-[#16171B] dark:hover:bg-[#1F2127] border border-[#D1D5DB] dark:border-[#27272A] text-[#09090B] dark:text-[#EDEDED] font-bold text-[10px] transition-colors cursor-pointer shrink-0"
                title="Copy Email to Clipboard"
              >
                {copiedField === 'email' ? 'COPIED!' : 'COPY'}
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <a
                href={`tel:${profile.phone}`}
                onClick={playClick}
                className="flex-1 p-2.5 rounded-xl bg-[#F9F9FB] hover:bg-[#F1F2F5] dark:bg-[#16171B] dark:hover:bg-[#1F2127] border border-[#D1D5DB] dark:border-[#27272A] text-[#09090B] dark:text-white flex items-center gap-2 transition-colors cursor-pointer min-w-0"
                title="Call Phone"
              >
                <Phone size={13} className="text-[#71717A] shrink-0" />
                <span className="text-[11px] sm:text-xs font-medium">{profile.phone}</span>
              </a>

              <button
                onClick={() => handleCopy(profile.phone, 'phone')}
                className="p-2.5 rounded-xl bg-white hover:bg-[#F4F4F6] dark:bg-[#16171B] dark:hover:bg-[#1F2127] border border-[#D1D5DB] dark:border-[#27272A] text-[#09090B] dark:text-[#EDEDED] font-bold text-[10px] transition-colors cursor-pointer shrink-0"
                title="Copy Phone to Clipboard"
              >
                {copiedField === 'phone' ? 'COPIED!' : 'COPY'}
              </button>
            </div>

            <div className="pt-2 text-[9.5px] font-mono text-[#71717A] flex items-center justify-between">
              <span>LOCATION: JALANDHAR, PUNJAB</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">SUB-12HR EMAIL RESPONSE</span>
            </div>
          </div>
        </div>

        {/* Card 2: Quick Links, Resume & Networks */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] space-y-4 shadow-xs flex flex-col justify-between hover:border-black/30 dark:hover:border-white/30 transition-all">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#71717A] uppercase font-bold">
              <span>CHANNELS &amp; REPOSITORIES</span>
              <ShieldCheck size={13} className="text-blue-500" />
            </div>

            <h3 className="text-lg font-bold text-[#09090B] dark:text-white font-sans">
              Profiles &amp; Verified Assets
            </h3>

            <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] leading-relaxed font-sans">
              Access full source repositories, verified competition benchmarks, career history on LinkedIn, or download the latest PDF resume formatted for engineering recruiters.
            </p>
          </div>

          {/* Quick Action Grid (2x2) */}
          <div className="space-y-2 pt-3 border-t border-[#ECEEF2] dark:border-white/10 font-mono text-xs">
            <div className="grid grid-cols-2 gap-2">
              <a
                href={getAssetPath('/resume.pdf')}
                target="_blank"
                rel="noreferrer"
                download="Sajal_Malhotra_Resume.pdf"
                onMouseEnter={playHover}
                className="p-3 rounded-xl bg-black hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black flex items-center justify-between transition-colors cursor-pointer font-bold shadow-xs"
              >
                <span className="text-[11px]">RESUME.PDF</span>
                <Download size={13} />
              </a>

              <a
                href={profile.links.buyMeAChai}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={playHover}
                className="p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30 flex items-center justify-between transition-colors cursor-pointer font-bold"
              >
                <span className="text-[11px]">BUY CHAI</span>
                <Coffee size={13} className="text-amber-700 dark:text-amber-300" />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={playHover}
                className="p-3 rounded-xl bg-[#F9F9FB] hover:bg-[#F1F2F5] dark:bg-[#16171B] dark:hover:bg-[#1F2127] border border-[#D1D5DB] dark:border-[#27272A] text-[#09090B] dark:text-white flex items-center justify-between transition-colors cursor-pointer"
              >
                <span className="font-bold text-[11px]">GITHUB</span>
                <Code2 size={13} className="text-[#71717A] dark:text-[#A1A1AA]" />
              </a>

              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={playHover}
                className="p-3 rounded-xl bg-[#F9F9FB] hover:bg-[#F1F2F5] dark:bg-[#16171B] dark:hover:bg-[#1F2127] border border-[#D1D5DB] dark:border-[#27272A] text-[#09090B] dark:text-white flex items-center justify-between transition-colors cursor-pointer"
              >
                <span className="font-bold text-[11px]">LINKEDIN</span>
                <ArrowUpRight size={13} className="text-[#71717A] dark:text-[#A1A1AA]" />
              </a>
            </div>

            <div className="pt-2 text-[9.5px] font-mono text-[#71717A] flex items-center justify-between">
              <span>NIT JALANDHAR // B.TECH IT</span>
              <a
                href="https://buymeachai.in/sajalmalhotra"
                target="_blank"
                rel="noreferrer"
                className="text-amber-700 dark:text-amber-300 hover:underline"
              >
                buymeachai.in/sajalmalhotra ↗
              </a>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
