'use client';

export default function FlowingTicker() {
  const techSkills = [
    'NEXT.JS 16',
    'PYTORCH',
    'FASTAPI',
    'GROQ LLAMA 3 (<50MS)',
    'SUPABASE WEBSOCKETS',
    'TYPESCRIPT',
    'POSTGRESQL & RLS',
    'DOCKER',
    'BM25 LEXICAL RETRIEVAL',
    'LANGGRAPH MULTI-AGENT',
    'PGVECTOR SEMANTIC SEARCH',
    'YOLO COMPUTER VISION',
    'OPENCV',
    'SCIKIT-LEARN & RANDOM FOREST',
    'FINBERT EMBEDDINGS',
    'SHAP EXPLAINABILITY',
    'WASM (PYODIDE)',
  ];

  const passionsAndInterests = [
    'ARCHIVAL FASHION TAILORING',
    'RUNWAY & EDITORIAL MODELLING',
    '220K+ MONTHLY CREATIVE REACH',
    'INTENTIONAL CRITICAL OVERTHINKING',
    'AUDIO ROTATION (FRANK OCEAN · APHEX TWIN)',
    'DISTRIBUTED REAL-TIME CLOCKS',
    'INCIDENT DUEL TOURNAMENTS',
    'HIGH-PRECISION LATENCY AUDITING',
    'SPECIALTY CHAI BREWING',
    'NIT JALANDHAR CYBERNAUTS LEAD',
    'ALGORITHMIC PUZZLES & DSA',
  ];

  return (
    <div id="skills-stream" className="w-full py-4 space-y-2.5 overflow-hidden select-none border-y border-[#E2E4E8] dark:border-[#22242A] bg-white/60 dark:bg-[#0C0D10]/60 backdrop-blur-sm">
      
      {/* Label Bar */}
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between text-[9px] font-mono text-[#71717A] uppercase tracking-widest">
        <span>01 // FLOWING ARSENAL (TECHNICAL STACKS)</span>
        <span className="hidden sm:inline">CONTINUOUS TELEMETRY STREAM</span>
      </div>

      {/* Row 1: Technical Stack flowing Left */}
      <div className="relative w-full overflow-hidden flex">
        <div className="animate-marquee-left flex items-center gap-2 text-xs font-mono">
          {[...techSkills, ...techSkills].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F4F4F6] dark:bg-[#141519] border border-[#E2E4E8] dark:border-[#22242B] text-[#09090B] dark:text-[#EDEDED] font-medium whitespace-nowrap shadow-2xs hover:border-black dark:hover:border-white transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Label Bar 2 */}
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between text-[9px] font-mono text-[#71717A] uppercase tracking-widest pt-1">
        <span>02 // PASSIONS, TASTE &amp; OBSESSIONS</span>
        <span className="hidden sm:inline">CREATIVE FREQUENCIES</span>
      </div>

      {/* Row 2: Creative Passions flowing Right */}
      <div className="relative w-full overflow-hidden flex">
        <div className="animate-marquee-right flex items-center gap-2 text-xs font-mono">
          {[...passionsAndInterests, ...passionsAndInterests].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white dark:bg-[#101115] border border-black/15 dark:border-white/15 text-[#09090B] dark:text-[#EDEDED] font-medium whitespace-nowrap shadow-2xs hover:border-black dark:hover:border-white transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
