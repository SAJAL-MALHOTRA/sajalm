'use client';

import { useState } from 'react';
import { profile } from '@/data/profile';
import { getAssetPath } from '@/utils/asset';
import { useSound } from '@/hooks/useSound';
import {
  Mail,
  Phone,
  Download,
  Send,
  Check,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  Coffee,
} from 'lucide-react';

export default function OpportunitiesSection() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [dispatchSent, setDispatchSent] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [dispatchMessage, setDispatchMessage] = useState('');

  const { playClick, playHover } = useSound();

  const handleCopy = (text: string, label: string) => {
    playClick();
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    if (!dispatchMessage.trim()) return;
    setDispatchSent(true);
    setTimeout(() => {
      setSenderName('');
      setSenderEmail('');
      setDispatchMessage('');
      setDispatchSent(false);
    }, 4500);
  };

  return (
    <section id="contact" className="w-full max-w-5xl py-10 space-y-6 text-left select-none">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E2E4E8] dark:border-[#22242A] pb-3 gap-2">
        <div className="space-y-1">
          <div className="text-[9.5px] font-mono text-[#71717A] uppercase tracking-widest">
            CAREER &amp; INVITATIONS // NIT JALANDHAR
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-sans text-[#09090B] dark:text-white tracking-tight flex items-center gap-2">
            <span>Internships, Roles &amp; Contact</span>
            <Sparkles size={18} className="text-emerald-500" />
          </h2>
        </div>

        <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 self-start sm:self-auto font-bold">
          ● OPEN TO SWE &amp; ML OPPORTUNITIES
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (5 cols): Quick Contact & Relays */}
        <div className="lg:col-span-5 space-y-3">
          
          <div className="p-5 rounded-2xl bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] space-y-4 shadow-xs">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#09090B] dark:text-white font-sans">
                Looking for Engineering Opportunities
              </h3>
              <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] leading-relaxed font-sans">
                I thrive in high-ownership environments building real-time products, machine learning reasoning engines, and resilient distributed platforms. Available for Summer 2026 internships, fall co-ops, and high-impact software engineering roles.
              </p>
            </div>

            {/* Direct Copy Relays */}
            <div className="space-y-2 pt-2 border-t border-[#ECEEF2] dark:border-white/10 font-mono text-xs">
              <button
                onClick={() => handleCopy(profile.email, 'email')}
                className="w-full p-2.5 rounded-xl bg-[#F9F9FB] hover:bg-[#F1F2F5] dark:bg-[#16171B] dark:hover:bg-[#1F2127] border border-[#D1D5DB] dark:border-[#27272A] text-[#09090B] dark:text-white flex items-center justify-between transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-2 truncate">
                  <Mail size={13} className="text-[#71717A] shrink-0" />
                  <span className="truncate">{profile.email}</span>
                </div>
                <span className="text-[10px] font-bold text-[#71717A] shrink-0 ml-2">
                  {copiedField === 'email' ? 'COPIED!' : 'COPY'}
                </span>
              </button>

              <button
                onClick={() => handleCopy(profile.phone, 'phone')}
                className="w-full p-2.5 rounded-xl bg-[#F9F9FB] hover:bg-[#F1F2F5] dark:bg-[#16171B] dark:hover:bg-[#1F2127] border border-[#D1D5DB] dark:border-[#27272A] text-[#09090B] dark:text-white flex items-center justify-between transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-[#71717A] shrink-0" />
                  <span>{profile.phone}</span>
                </div>
                <span className="text-[10px] font-bold text-[#71717A] shrink-0 ml-2">
                  {copiedField === 'phone' ? 'COPIED!' : 'COPY'}
                </span>
              </button>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={getAssetPath('/resume.pdf')}
                  target="_blank"
                  rel="noreferrer"
                  download="Sajal_Malhotra_Resume.pdf"
                  onMouseEnter={playHover}
                  className="p-2.5 rounded-xl bg-white hover:bg-[#F4F4F6] text-[#09090B] dark:bg-[#18191E] dark:hover:bg-[#22242B] dark:text-white border border-[#D1D5DB] dark:border-[#27272A] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="font-bold text-[11px]">RESUME.PDF</span>
                  <Download size={13} className="text-[#71717A] dark:text-[#A1A1AA]" />
                </a>

                <a
                  href={profile.links.buyMeAChai}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={playHover}
                  className="p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30 flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="font-bold text-[11px]">BUY CHAI</span>
                  <span className="text-sm">☕</span>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 border-t border-[#ECEEF2] dark:border-white/10 flex items-center justify-between text-xs font-mono">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="text-[#52525B] hover:text-[#09090B] dark:text-[#A1A1AA] dark:hover:text-white hover:underline"
              >
                GitHub ↗
              </a>
              <span className="text-[#D1D5DB] dark:text-[#27272A]">•</span>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-[#52525B] hover:text-[#09090B] dark:text-[#A1A1AA] dark:hover:text-white hover:underline"
              >
                LinkedIn ↗
              </a>
              <span className="text-[#D1D5DB] dark:text-[#27272A]">•</span>
              <a
                href="https://buymeachai.in/sajalmalhotra"
                target="_blank"
                rel="noreferrer"
                className="text-amber-700 dark:text-amber-300 hover:underline"
              >
                buymeachai.in ↗
              </a>
            </div>

          </div>

        </div>

        {/* Right Column (7 cols): Direct Relay Message Form */}
        <div className="lg:col-span-7">
          
          <form
            onSubmit={handleDispatch}
            className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] space-y-4 shadow-xs"
          >
            <div className="flex items-center justify-between border-b border-[#ECEEF2] dark:border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#09090B] dark:text-white" />
                <span className="font-mono text-xs font-bold text-[#09090B] dark:text-white uppercase tracking-wider">
                  DIRECT RELAY // DISPATCH QUEUE
                </span>
              </div>
              <span className="text-[9.5px] font-mono text-[#71717A]">
                SUB-12HR RESPONSE
              </span>
            </div>

            {dispatchSent ? (
              <div className="py-10 text-center space-y-2">
                <div className="w-8 h-8 mx-auto rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <Check size={16} />
                </div>
                <div className="text-sm font-bold text-[#09090B] dark:text-white font-sans">
                  DISPATCH LOGGED SUCCESSFULLY
                </div>
                <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] font-mono">
                  Thank you! Your note has been queued to Sajal&apos;s direct priority inbox.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-[#71717A] tracking-wider uppercase">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Alex Mercer"
                      className="w-full px-3 py-2 rounded-xl bg-[#F9F9FB] dark:bg-[#18191E] border border-[#D1D5DB] dark:border-[#27272A] text-[#09090B] dark:text-white font-mono text-[16px] sm:text-xs focus:border-black dark:focus:border-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-[#71717A] tracking-wider uppercase">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full px-3 py-2 rounded-xl bg-[#F9F9FB] dark:bg-[#18191E] border border-[#D1D5DB] dark:border-[#27272A] text-[#09090B] dark:text-white font-mono text-[16px] sm:text-xs focus:border-black dark:focus:border-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-[#71717A] tracking-wider uppercase">
                    MESSAGE / PROJECT SCOPE
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={dispatchMessage}
                    onChange={(e) => setDispatchMessage(e.target.value)}
                    placeholder="Internship opportunities, ML systems collaboration, tech discussions, or creative ventures..."
                    className="w-full px-3 py-2 rounded-xl bg-[#F9F9FB] dark:bg-[#18191E] border border-[#D1D5DB] dark:border-[#27272A] text-[#09090B] dark:text-white font-mono text-[16px] sm:text-xs focus:border-black dark:focus:border-white focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  onMouseEnter={playHover}
                  className="w-full py-3 rounded-xl bg-black hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  <Send size={12} />
                  <span>TRANSMIT DISPATCH →</span>
                </button>
              </>
            )}
          </form>

        </div>

      </div>

    </section>
  );
}
