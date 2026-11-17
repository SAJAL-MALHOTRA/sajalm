'use client';

import React, { useState, useEffect } from 'react';
import SignaturePad from '@/components/kokonutui/signature-pad';
import { useSound } from '@/hooks/useSound';
import SpotlightCard from '@/components/ui/SpotlightCard';
import {
  PenTool,
  CheckCircle2,
  Send,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  User,
  Briefcase,
  MessageSquare,
  Download,
} from 'lucide-react';

export interface SignatureEntry {
  id: string;
  name: string;
  role?: string;
  note?: string;
  signatureSvg: string;
  timestamp: string;
}

const STORAGE_KEY = 'sajdex_guestbook_signatures';
const ACTIVE_USER_KEY = 'sajdex_signed_user';

export default function VisitorRegistry() {
  const { playClick } = useSound();

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [note, setNote] = useState('');
  const [signatureSvg, setSignatureSvg] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);
  const [mySignature, setMySignature] = useState<SignatureEntry | null>(null);
  const [entries, setEntries] = useState<SignatureEntry[]>([]);

  // Load signatures from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Filter out any old mock entries
          const realEntries = parsed.filter(
            (e: SignatureEntry) => !e.id.startsWith('SIG-FOUNDER') && !e.id.startsWith('SIG-NITJ')
          );
          setEntries(realEntries);
        }
      }

      const activeUser = localStorage.getItem(ACTIVE_USER_KEY);
      if (activeUser) {
        const parsedUser = JSON.parse(activeUser);
        if (parsedUser && parsedUser.name) {
          setMySignature(parsedUser);
          setHasSigned(true);
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const handleSubmitSignature = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !signatureSvg) return;

    playClick();
    setIsSubmitting(true);

    const newEntry: SignatureEntry = {
      id: `SIG-${Date.now().toString().slice(-6)}`,
      name: name.trim(),
      role: role.trim() || 'Visitor',
      note: note.trim() || undefined,
      signatureSvg,
      timestamp: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    // 1. Save to local storage
    try {
      const updatedEntries = [newEntry, ...entries];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
      localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(newEntry));
      setEntries(updatedEntries);
      setMySignature(newEntry);
      setHasSigned(true);
    } catch {
      // Continue even if localStorage is disabled
    }

    // 2. Dispatch to email relay (FormSubmit API) so Sajal receives it directly
    try {
      await fetch('https://formsubmit.co/ajax/malhotrasajal243@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `✍️ New SajDex Dossier Signature from ${newEntry.name}`,
          'Visitor Name': newEntry.name,
          'Role / Affiliation': newEntry.role,
          'Personal Note': newEntry.note || 'None',
          'Timestamp': new Date().toISOString(),
          'Signature SVG Code': newEntry.signatureSvg,
        }),
      });
    } catch {
      // Non-blocking email dispatch
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetSignature = () => {
    playClick();
    setHasSigned(false);
    setSignatureSvg(null);
  };

  const handleDownloadSvg = () => {
    if (!mySignature?.signatureSvg) return;
    playClick();
    const blob = new Blob([mySignature.signatureSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${mySignature.name.replace(/\s+/g, '_')}_Signature.svg`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="guestbook" className="w-full max-w-[780px] mx-auto py-8 text-left select-none space-y-6">
      
      {/* ── SECTION HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E2E4E8] dark:border-[#22242A] pb-3 gap-3">
        <div className="space-y-1">
          <div className="text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-widest font-semibold flex items-center gap-1.5">
            <span>04 // VISITOR REGISTRY &amp; GUESTBOOK</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-sans text-[#09090B] dark:text-white tracking-tight">
            Leave your mark on the dossier.
          </h2>
        </div>

        <span className="text-xs font-mono text-[#71717A] dark:text-[#A1A1AA] self-start sm:self-auto flex items-center gap-1">
          <Sparkles size={11} className="text-amber-500" />
          <span>Kokonut UI Vector Pen</span>
        </span>
      </div>

      <p className="text-xs sm:text-[13px] text-[#52525B] dark:text-[#A1A1AA] font-sans leading-relaxed max-w-2xl">
        Every engineer, recruiter, peer, or visitor who stops by is invited to sign the live dossier log.
        Drawn with spring-damped canvas physics, persisted in the registry, and relayed directly to my inbox.
      </p>

      {/* ── TWO-COLUMN INTERACTIVE REGISTRY SPREAD ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        
        {/* Left Column: Signature Form / Verified Signed Card (md:col-span-6) */}
        <div className="md:col-span-6 space-y-4">
          {!hasSigned ? (
            <SpotlightCard className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] space-y-4 shadow-2xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#ECEEF2] dark:border-[#22242B]">
                <div className="flex items-center gap-2">
                  <PenTool size={13} className="text-[#09090B] dark:text-white" />
                  <span className="text-xs font-bold font-sans text-[#09090B] dark:text-white">
                    Digital Sign-In Pad
                  </span>
                </div>
                <span className="text-[9.5px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">
                  Live Capture
                </span>
              </div>

              <form onSubmit={handleSubmitSignature} className="space-y-3.5">
                {/* Name Input */}
                <div className="space-y-1">
                  <label className="flex items-center gap-1 text-[10.5px] font-mono uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA]">
                    <User size={10} />
                    <span>Your Name / Handle *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Chen"
                    className="w-full px-3 py-2 text-xs font-sans rounded-lg bg-[#F9F9FB] dark:bg-[#15161B] border border-[#E2E4E8] dark:border-[#27272A] text-[#09090B] dark:text-white placeholder:text-[#A1A1AA] focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  />
                </div>

                {/* Role / Affiliation Input */}
                <div className="space-y-1">
                  <label className="flex items-center gap-1 text-[10.5px] font-mono uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA]">
                    <Briefcase size={10} />
                    <span>Role / Affiliation (optional)</span>
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. SWE @ Stripe or NITJ Peer"
                    className="w-full px-3 py-2 text-xs font-sans rounded-lg bg-[#F9F9FB] dark:bg-[#15161B] border border-[#E2E4E8] dark:border-[#27272A] text-[#09090B] dark:text-white placeholder:text-[#A1A1AA] focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  />
                </div>

                {/* Personal Note */}
                <div className="space-y-1">
                  <label className="flex items-center gap-1 text-[10.5px] font-mono uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA]">
                    <MessageSquare size={10} />
                    <span>Quick Note / Thoughts (optional)</span>
                  </label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="e.g. Loved the low-latency benchmarks!"
                    className="w-full px-3 py-2 text-xs font-sans rounded-lg bg-[#F9F9FB] dark:bg-[#15161B] border border-[#E2E4E8] dark:border-[#27272A] text-[#09090B] dark:text-white placeholder:text-[#A1A1AA] focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  />
                </div>

                {/* Kokonut UI Signature Pad */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA]">
                    <span>DRAW SIGNATURE WITH PEN / TOUCH *</span>
                    <span>{signatureSvg ? '● INK CAPTURED' : 'EMPTY'}</span>
                  </div>
                  <div className="w-full overflow-hidden rounded-xl border border-[#E2E4E8] dark:border-[#27272A] bg-[#FAFAFC] dark:bg-[#0A0B0E]">
                    <SignaturePad
                      onChange={(svg) => setSignatureSvg(svg)}
                      className="w-full border-0 rounded-none max-w-full"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={!name.trim() || !signatureSvg || isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#09090B] hover:bg-neutral-800 disabled:bg-[#D4D4D8] dark:bg-white dark:hover:bg-neutral-200 dark:disabled:bg-[#27272A] text-white dark:text-[#09090B] dark:disabled:text-[#71717A] text-xs font-mono font-bold transition-all shadow-xs cursor-pointer disabled:cursor-not-allowed active:scale-[0.98]"
                >
                  <Send size={12} />
                  <span>{isSubmitting ? 'Relaying Signature...' : 'Sign Dossier & Submit'}</span>
                </button>
              </form>
            </SpotlightCard>
          ) : (
            /* Verified Signed Confirmation Card */
            <SpotlightCard className="p-5 rounded-xl bg-white dark:bg-[#111216] border border-emerald-500/30 dark:border-emerald-500/30 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-2 border-b border-[#ECEEF2] dark:border-[#22242B]">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={16} />
                  <span className="text-xs font-bold font-sans">
                    Dossier Entry Verified
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA]">
                  {mySignature?.id}
                </span>
              </div>

              {/* Rendered SVG Signature Display */}
              <div className="p-4 rounded-xl bg-[#F8F9FA] dark:bg-[#0D0E12] border border-[#E2E4E8] dark:border-[#22242B] flex flex-col items-center justify-center min-h-[140px] relative overflow-hidden">
                <span className="absolute top-2 left-2 text-[9px] font-mono text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-wider">
                  AUTHENTICATED VECTOR
                </span>
                {mySignature?.signatureSvg ? (
                  <div
                    className="w-full max-w-[280px] h-[90px] flex items-center justify-center dark:invert dark:hue-rotate-180"
                    dangerouslySetInnerHTML={{ __html: mySignature.signatureSvg }}
                  />
                ) : (
                  <div className="text-xs font-mono text-[#71717A]">Signature verified.</div>
                )}
                <div className="w-full flex items-center justify-between pt-2 border-t border-[#ECEEF2] dark:border-[#22242B] text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA]">
                  <span className="font-semibold text-[#09090B] dark:text-white">
                    {mySignature?.name}
                  </span>
                  <span>{mySignature?.role}</span>
                </div>
              </div>

              {mySignature?.note && (
                <div className="p-2.5 rounded-lg bg-black/5 dark:bg-white/5 text-xs text-[#52525B] dark:text-[#A1A1AA] font-sans italic">
                  &ldquo;{mySignature.note}&rdquo;
                </div>
              )}

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleDownloadSvg}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 text-xs font-mono text-[#09090B] dark:text-white transition-colors cursor-pointer"
                >
                  <Download size={12} />
                  <span>Download SVG</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetSignature}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E2E4E8] dark:border-[#22242B] text-xs font-mono text-[#71717A] hover:text-[#09090B] dark:text-[#A1A1AA] dark:hover:text-white transition-colors cursor-pointer"
                  title="Draw a new signature"
                >
                  <RotateCcw size={12} />
                  <span>Re-Sign</span>
                </button>
              </div>
            </SpotlightCard>
          )}
        </div>

        {/* Right Column: Recent Visitors Log Wall (md:col-span-6) */}
        <div className="md:col-span-6 space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#09090B] dark:text-white">
              <ShieldCheck size={13} className="text-emerald-500" />
              <span>RECENT GUESTBOOK LOG</span>
            </div>
            <span className="text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA]">
              {entries.length} VERIFIED ENTRIES
            </span>
          </div>

          <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
            {entries.length === 0 ? (
              <div className="p-8 rounded-xl border border-dashed border-[#E2E4E8] dark:border-[#27272A] bg-white/40 dark:bg-[#111216]/40 flex flex-col items-center justify-center text-center space-y-2.5 text-[#71717A] dark:text-[#A1A1AA] min-h-[220px]">
                <div className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-[#71717A] dark:text-[#A1A1AA]">
                  <PenTool size={16} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-mono font-bold text-[#09090B] dark:text-white">
                    No signatures logged yet
                  </p>
                  <p className="text-[11.5px] font-sans text-[#71717A] dark:text-[#A1A1AA] max-w-[240px]">
                    Draw your signature on the pad to add the first verified entry to the dossier.
                  </p>
                </div>
              </div>
            ) : (
              entries.map((entry) => (
                <SpotlightCard
                  key={entry.id}
                  className="p-3.5 rounded-xl bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] shadow-2xs space-y-2 hover:border-black/30 dark:hover:border-white/30 transition-colors"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#71717A] dark:text-[#A1A1AA]">
                    <span className="font-semibold text-[#09090B] dark:text-white font-sans text-xs">
                      {entry.name}
                    </span>
                    <span>{entry.timestamp}</span>
                  </div>

                  {entry.role && (
                    <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                      {entry.role}
                    </div>
                  )}

                  {/* Vector Stroke Showcase */}
                  <div className="h-16 w-full flex items-center justify-start overflow-hidden py-1 opacity-90 dark:invert dark:hue-rotate-180">
                    <div
                      className="w-full h-full [&>svg]:w-auto [&>svg]:h-full [&>svg]:max-w-[200px]"
                      dangerouslySetInnerHTML={{ __html: entry.signatureSvg }}
                    />
                  </div>

                  {entry.note && (
                    <p className="text-[11.5px] font-sans text-[#52525B] dark:text-[#A1A1AA] italic pt-1 border-t border-[#ECEEF2] dark:border-[#22242B]">
                      &ldquo;{entry.note}&rdquo;
                    </p>
                  )}
                </SpotlightCard>
              ))
            )}
          </div>
        </div>

      </div>

    </section>
  );
}
