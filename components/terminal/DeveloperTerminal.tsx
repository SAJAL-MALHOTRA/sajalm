'use client';

import { useState, useRef, useEffect } from 'react';
import { projects } from '@/data/projects';
import { profile } from '@/data/profile';
import { skills } from '@/data/skills';
import { experiences } from '@/data/experience';
import { Terminal as TerminalIcon } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

interface DeveloperTerminalProps {
  onOpenModalProject?: (id: string) => void;
}

interface CommandLog {
  cmd: string;
  output: React.ReactNode;
}

export default function DeveloperTerminal({ onOpenModalProject }: DeveloperTerminalProps) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [logs, setLogs] = useState<CommandLog[]>([]);
  const [isBooting, setIsBooting] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const { playClick } = useSound();
  const hasBooted = useRef(false);

  // Auto focus input on mount
  useEffect(() => {
    if (!isBooting && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isBooting]);

  // Auto scroll to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs, isBooting]);

  // Boot sequence
  useEffect(() => {
    if (hasBooted.current) return;
    hasBooted.current = true;

    const bootSequence = async () => {
      await new Promise((r) => setTimeout(r, 400));
      executeCommand('whoami', true);
      setIsBooting(false);
    };

    bootSequence();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const newIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIdx);
      setInputVal(history[newIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const newIdx = historyIndex + 1;
      if (newIdx >= history.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(newIdx);
        setInputVal(history[newIdx] || '');
      }
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      setLogs([]);
      setInputVal('');
    }
  };

  const handleExecuteCommandForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    executeCommand(inputVal);
  };

  const executeCommand = (rawCmd: string, silent = false) => {
    if (!silent) playClick();
    const cmdStr = rawCmd.trim();
    const lowerCmd = cmdStr.toLowerCase();
    
    if (!silent) {
      setHistory((prev) => [...prev, cmdStr]);
      setHistoryIndex(-1);
      setInputVal('');
    }

    let responseNode: React.ReactNode = null;

    if (lowerCmd === 'clear' || lowerCmd === 'cls') {
      setLogs([]);
      return;
    } else if (lowerCmd === 'cat about' || lowerCmd === 'about' || lowerCmd === 'whoami' || lowerCmd === 'cd /') {
      responseNode = (
        <div className="space-y-1 text-xs text-[#9E9EA8] font-mono">
          <div className="text-[#F4F4F6] font-semibold">Sajal Malhotra. IT undergraduate at NIT Jalandhar.</div>
          <div className="text-[#EDEDED]">Engineer by discipline. Creative by instinct. Builder by choice.</div>
          <div className="text-[#62636C] pt-1">Software engineering, applied machine learning and creative direction.</div>
        </div>
      );
    } else if (lowerCmd === 'ls projects' || lowerCmd === 'projects' || lowerCmd === 'ls' || lowerCmd === 'cd /projects') {
      responseNode = (
        <div className="space-y-2 pt-1 font-mono text-xs">
          <div className="font-semibold text-white">sajal@portfolio:~$ ls projects</div>
          <div className="text-emerald-400 font-mono tracking-wide">
            pairfect/&nbsp;&nbsp;&nbsp;&nbsp;cybernauts-arena/&nbsp;&nbsp;&nbsp;&nbsp;dsa-lecture-rag/&nbsp;&nbsp;&nbsp;&nbsp;cv-challenge/
          </div>
          <div className="text-[#62636C] text-[11px] pt-1">
            Type &apos;open PRJ-01&apos; or &apos;open pairfect&apos; to view architecture dossier.
          </div>
        </div>
      );
    } else if (lowerCmd === 'fetch resume' || lowerCmd === 'resume') {
      if (typeof window !== 'undefined') {
        window.open(profile.links.resume, '_blank');
      }
      responseNode = (
        <div className="space-y-1 text-xs text-emerald-400 font-mono">
          <div>[200 OK] Fetching verified curriculum vitae...</div>
          <div className="text-[#9E9EA8]">Opened resume PDF in a new tab.</div>
        </div>
      );
    } else if (lowerCmd === 'ping stats' || lowerCmd === 'stats') {
      responseNode = (
        <div className="space-y-1.5 pt-1 font-mono text-xs text-[#9E9EA8]">
          <div className="font-semibold text-white">Verified Public Telemetry:</div>
          <div><span className="text-emerald-400 font-bold">NIT Jalandhar:</span> B.Tech IT &apos;29 · CGPA 8.13</div>
          <div><span className="text-emerald-400 font-bold">Pairfect:</span> 200+ registered campus pilot users</div>
          <div><span className="text-emerald-400 font-bold">National CV Challenge:</span> #16 of 227 (Top 7%, 0.211 Score)</div>
          <div><span className="text-emerald-400 font-bold">Creative Reach:</span> 220,000+ monthly impressions across media</div>
        </div>
      );
    } else if (lowerCmd.startsWith('open ')) {
      const targetQuery = cmdStr.split(' ').slice(1).join(' ').trim().toLowerCase();
      const proj = projects.find(
        (p) =>
          p.id.toLowerCase() === targetQuery ||
          p.name.toLowerCase() === targetQuery ||
          p.name.toLowerCase().includes(targetQuery)
      );
      if (proj) {
        if (onOpenModalProject) onOpenModalProject(proj.id);
        responseNode = (
          <div className="space-y-1 text-xs text-emerald-400 font-mono">
            <div>Opening architecture dossier: {proj.id} ({proj.name})</div>
          </div>
        );
      } else {
        responseNode = (
          <div className="text-xs text-red-400 font-mono">
            Project &apos;{targetQuery}&apos; not found. Type &apos;ls projects&apos; for list.
          </div>
        );
      }
    } else if (lowerCmd === 'contact' || lowerCmd === 'email' || lowerCmd === 'reach') {
      responseNode = (
        <div className="space-y-1.5 pt-1 font-mono text-xs text-[#9E9EA8]">
          <div className="font-semibold text-white">Direct Relay &amp; Contact</div>
          <div className="space-y-1">
            <div>
              <span className="text-[#62636C]">Email: </span>
              <a href={`mailto:${profile.email}`} className="text-white hover:underline">
                {profile.email}
              </a>
            </div>
            <div>
              <span className="text-[#62636C]">Phone: </span>
              <span className="text-white">{profile.phone}</span>
            </div>
            <div>
              <span className="text-[#62636C]">GitHub: </span>
              <a href={profile.links.github} target="_blank" rel="noreferrer" className="text-[#38BDF8] hover:underline">
                {profile.links.github}
              </a>
            </div>
            <div>
              <span className="text-[#62636C]">LinkedIn: </span>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="text-[#38BDF8] hover:underline">
                {profile.links.linkedin}
              </a>
            </div>
          </div>
        </div>
      );
    } else if (lowerCmd === 'skills' || lowerCmd === 'stack') {
      responseNode = (
        <div className="space-y-3 pt-1 font-mono text-xs">
          <div className="font-semibold text-white">Technical Arsenal</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skills.categories.map((cat) => (
              <div key={cat.title} className="space-y-0.5">
                <div className="text-white/60 font-medium">{cat.title}</div>
                <div className="text-[#F4F4F6]">{cat.items.join(' · ')}</div>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (lowerCmd === 'experience' || lowerCmd === 'history') {
      responseNode = (
        <div className="space-y-3 pt-1 font-mono text-xs">
          <div className="font-semibold text-white">Experience Timeline</div>
          {experiences.map((exp) => (
            <div key={exp.id} className="space-y-0.5 border-l border-white/20 pl-3">
              <div className="text-[#F4F4F6] font-medium">{exp.role} <span className="text-[#9E9EA8]">@ {exp.organization}</span></div>
              <div className="text-[#62636C] text-[11px]">{exp.period}</div>
              <div className="text-[#9E9EA8]">{exp.summary}</div>
            </div>
          ))}
        </div>
      );
    } else if (lowerCmd === 'rotation') {
      responseNode = (
        <div className="space-y-2 pt-1 font-mono text-xs">
          <div className="font-semibold text-white">Current Rotation // SS26</div>
          <div className="text-[#9E9EA8]"><span className="text-emerald-400 font-bold">On the Desk:</span> {profile.rotation.building}</div>
          <div className="text-[#9E9EA8]"><span className="text-amber-400 font-bold">On the Rack:</span> {profile.rotation.wearing}</div>
          <div className="text-[#9E9EA8]"><span className="text-white font-bold">Audio Track:</span> {profile.rotation.listening}</div>
        </div>
      );
    } else if (lowerCmd === 'help') {
      responseNode = (
        <div className="space-y-1 text-xs text-[#9E9EA8]">
          <div className="text-white font-medium pb-1">Available commands:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
            <div><span className="text-white">whoami</span> — Identity &amp; bio</div>
            <div><span className="text-white">projects</span> — Shipped systems</div>
            <div><span className="text-white">skills</span> — Tech stack</div>
            <div><span className="text-white">experience</span> — Career timeline</div>
            <div><span className="text-white">contact</span> — Reach out &amp; relays</div>
            <div><span className="text-white">clear</span> — Clear terminal screen</div>
            <div><span className="text-white">open [ID]</span> — Inspect project modal</div>
            <div><span className="text-white">help</span> — List commands</div>
          </div>
        </div>
      );
    } else {
      responseNode = (
        <div className="text-xs text-red-400">
          zsh: command not found: {cmdStr}. Type &apos;help&apos; for list.
        </div>
      );
    }

    setLogs((prev) => [...prev, { cmd: cmdStr, output: responseNode }]);
  };

  return (
    <div
      onClick={() => { if (!isBooting) inputRef.current?.focus(); }}
      className="w-full h-full bg-[#111216] border border-white/10 rounded-2xl overflow-hidden font-mono select-text flex flex-col justify-between cursor-text shadow-xl relative min-h-[340px]"
    >
      {/* Native macOS Header */}
      <div className="h-9 sm:h-10 px-3 sm:px-4 bg-[#16181F] border-b border-white/[0.06] flex items-center justify-between select-none shrink-0">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E5484D]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#30A46C]" />
        </div>

        <div className="text-[11px] sm:text-xs text-[#9E9EA8] font-medium flex items-center gap-1.5 truncate">
          <span>sajal@portfolio ~ (zsh)</span>
        </div>

        <div className="w-8 sm:w-12" />
      </div>

      {/* Terminal Content Box */}
      <div className="p-3 sm:p-5 space-y-3 sm:space-y-4 text-xs overflow-y-auto custom-scrollbar flex-1 pb-24 sm:pb-20 pr-1.5 sm:pr-2">
        {logs.map((log, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center gap-2 text-white font-medium text-[11px] sm:text-xs">
              <span className="text-[#9E9EA8]">sajal@portfolio ~ %</span>
              <span>{log.cmd}</span>
            </div>
            {log.output}
          </div>
        ))}

        {/* Active Input Line */}
        {!isBooting && (
          <form onSubmit={handleExecuteCommandForm} className="flex items-center gap-1.5 sm:gap-2 pt-1">
            <span className="text-[#9E9EA8] font-medium shrink-0 text-[11px] sm:text-xs">
              <span className="hidden sm:inline">sajal@portfolio </span>~ %
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-[#F4F4F6] text-[16px] sm:text-xs outline-none font-mono caret-white min-w-0"
              autoFocus
            />
          </form>
        )}

        <div ref={terminalEndRef} />
      </div>

      {/* Quick Run Chips */}
      <div className="absolute bottom-2 sm:bottom-3 left-2.5 right-2.5 sm:left-4 sm:right-4 border-t border-white/[0.06] pt-2 sm:pt-3 bg-[#111216]">
        <div className="flex items-center gap-1 sm:gap-1.5 text-xs flex-wrap">
          <span className="text-[#62636C] text-[10px] sm:text-[11px]">Run:</span>
          {['cat about', 'ls projects', 'fetch resume', 'ping stats', 'contact', 'clear'].map((cmd) => (
            <button
              key={cmd}
              onClick={(e) => {
                e.stopPropagation();
                executeCommand(cmd);
              }}
              className="px-1.5 sm:px-2 py-0.5 bg-white/[0.04] hover:bg-white/10 rounded text-[10px] sm:text-[11px] text-[#9E9EA8] hover:text-white transition-colors cursor-pointer"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
