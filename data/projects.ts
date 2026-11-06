export interface Tradeoff {
  decision: string;
  why: string;
  alternative: string;
}

export interface MeasuredOutcome {
  metric: string;
  value: string;
  condition: string;
}

export interface Project {
  id: string;
  name: string;
  subtitle?: string;
  status: 'ACTIVE' | 'BUILDING' | 'SHIPPED';
  metric: string;
  tagline: string;
  description: string;
  bullets?: string[];
  stack: string[];
  githubUrl?: string;
  github?: string;
  demo?: string;
  liveUrl?: string;
  types?: string[];
  abilities?: string[];
  problem?: string;
  solution?: string;
  whyBuilt?: string;
  architectureDiagram?: string;
  tradeoffs?: Tradeoff[];
  measuredOutcomes?: MeasuredOutcome[];
}

export const projects: Project[] = [
  {
    id: 'PRJ-01',
    name: 'Pairfect',
    subtitle: 'Private Relationship Platform',
    status: 'ACTIVE',
    metric: '45ms Median Latency · 200+ Users',
    tagline: 'NEXT.JS 16 · SUPABASE · REALTIME · GROQ LLAMA 3',
    description: 'A private relationship platform built around shared memories, rituals and connection with live state synchronization.',
    bullets: [
      'Designed and shipped a full-stack real-time social app (pairfect.site) with live state synchronization and LLM-driven prompt analysis.',
      'Built a Groq-accelerated Llama 3 inference pipeline delivering sub-50ms evaluation latency for instant conversational scoring and vibe judging.',
      'Implemented real-time bidirectional communication using Supabase WebSockets with PostgreSQL Row-Level Security (RLS) policies.',
      'Enforced end-to-end TypeScript schemas across all real-time payloads, shipping with zero TypeScript errors across 77 routes.',
    ],
    stack: ['Next.js 16', 'React 19', 'Supabase', 'Groq LPU (Llama 3 8B)', 'PostgreSQL RLS', 'WebSockets', 'TypeScript'],
    githubUrl: 'https://github.com/SAJAL-MALHOTRA/Pairfect---Your-lovespace',
    github: 'https://github.com/SAJAL-MALHOTRA/Pairfect---Your-lovespace',
    demo: 'https://pairfect.site',
    liveUrl: 'https://pairfect.site',
    types: ['Real-Time Social Platform', 'LLM Product', 'Campus Pilot'],
    abilities: ['Next.js 16', 'Supabase Realtime', 'Groq Llama 3', 'PostgreSQL RLS', 'Bidirectional WebSockets'],
    whyBuilt: 'Most consumer social apps prioritize superficial public feeds. Pairfect was engineered as an intimate, private shared space for couples to coordinate memories, mutual rituals, and relationship questions with instantaneous AI evaluation.',
    problem: 'Synchronizing private state across two active mobile/web clients with zero conflict, combined with LLM evaluations that take >1.5s on traditional cloud endpoints, destroys the feeling of a live, co-present conversation.',
    solution: 'Engineered an ultra-low-latency pipeline combining Groq LPU inference (median 45ms), Supabase WebSockets with PostgreSQL RLS tenant isolation, and strict TypeScript schema validation over 77 production routes.',
    architectureDiagram: `[Client UI (Next.js 16 + React 19)]
        │
        ├── (WebSockets State Sync) ──> [Supabase Realtime Engine]
        │                                        │
        │                                        └──> [PostgreSQL with Row-Level Security (RLS)]
        │
        └── (Streaming Prompts) ──────> [Groq LPU Cloud (Llama-3-8B)]
                                                 │
                                                 └──> (Token Stream: 45ms median TTFT)`,
    tradeoffs: [
      {
        decision: 'Groq LPUs over OpenAI GPT-4o-mini',
        why: 'Sub-100ms conversational scoring latency is crucial for live dialogue co-presence.',
        alternative: 'Traditional cloud APIs (measured 650ms–1100ms time-to-first-token).',
      },
      {
        decision: 'Supabase Realtime with PostgreSQL RLS',
        why: 'Enforces cryptographic tenant isolation between dyads directly at the database engine level.',
        alternative: 'Custom Socket.io server with memory-based access tokens.',
      },
    ],
    measuredOutcomes: [
      {
        metric: 'Evaluation Latency',
        value: '45ms median, 82ms p95',
        condition: 'Measured on Groq LPU endpoint running Llama-3-8B-8192 with 128 max tokens',
      },
      {
        metric: 'Campus Pilot Adoption',
        value: '200+ registered student users',
        condition: 'Active student pilot deployment at NIT Jalandhar',
      },
      {
        metric: 'Schema Reliability',
        value: 'Zero runtime type errors',
        condition: 'Strict end-to-end TypeScript validation across 77 production routes',
      },
    ],
  },
  {
    id: 'PRJ-03',
    name: 'Cybernauts Arena',
    subtitle: 'Tournament & Broadcast Engine',
    status: 'ACTIVE',
    metric: '16-Team Sync · 2.5s Jitter Buffer',
    tagline: 'NEXT.JS 16 · EXPRESS · WEB AUDIO · WEBSOCKETS',
    description: 'A tournament and broadcast engine for competitive events, synchronizing physical duel tables with 4K arena projection.',
    bullets: [
      'Architected a broadcast-grade esports tournament engine synchronizing 16 physical participant table desks, an auditorium 4K arena projector, and an authoritative host command console.',
      'Eliminated client clock drift across unpredictable venue Wi-Fi networks by calculating authoritative epoch deadlines with a 2.5-second network latency grace buffer.',
      'Engineered a 5-tier incident response decision matrix evaluating real-world cybersecurity outages (Best, Less-Good, Neutral, Less-Bad, Catastrophic) with instant credit calculations.',
      'Integrated Web Audio API synthesizer soundscapes and atomic stage advancement algorithms (Ro16 → Quarterfinals → Semifinals → Finals).',
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Express.js', 'Web Audio API', 'Framer Motion', 'Tailwind CSS'],
    githubUrl: 'https://github.com/SAJAL-MALHOTRA/cybernauts-arena',
    github: 'https://github.com/SAJAL-MALHOTRA/cybernauts-arena',
    types: ['Esports Tournament Platform', 'Distributed Event Systems'],
    abilities: ['Next.js 16', 'Express.js', 'Authoritative Master Clock', 'Web Audio API', 'Latency Compensation'],
    whyBuilt: 'Cybernauts NITJ hosts physical competitive technical tournaments with hundreds of attendees. Existing tournament tools are either static spreadsheets or SaaS dashboards with no live stage projector integration or venue network fault tolerance.',
    problem: 'In crowded auditoriums with congested venue Wi-Fi, clients experience erratic ping spikes (50ms to 2000ms). Naive client timers drift apart by several seconds, causing race conditions in multi-table buzzer rounds.',
    solution: 'Engineered authoritative server epoch clock synchronization with 2.5s network jitter buffer, 5-tier incident evaluation matrix, and broadcast-grade arena projector projection.',
    architectureDiagram: `[16 Physical Duel Desks (Client Nodes)]
        │
        ├── (Bi-directional WebSockets) ──> [Express.js Authoritative Epoch Engine]
        │                                                 │
        │                                                 ├── [Master Clock + 2.5s Jitter Buffer]
        │                                                 └── [5-Tier Outage Decision Matrix]
        │
        └── (HDMI / Display Stream) ──────> [Auditorium 4K Projector + Web Audio API]`,
    tradeoffs: [
      {
        decision: 'Authoritative server epoch deadlines with 2.5s jitter buffer',
        why: 'Guarantees all 16 desks evaluate answers against the exact same absolute timestamp regardless of local client clock skew.',
        alternative: 'Local client countdown timers (failed due to 3-5s drift across operating systems).',
      },
      {
        decision: 'In-browser Web Audio API sound synthesis',
        why: 'Zero network round-trips for buzzer sound cues and immediate bracket advancement.',
        alternative: 'Pre-recorded MP3 audio streaming over network.',
      },
    ],
    measuredOutcomes: [
      {
        metric: 'Clock Synchronization',
        value: 'Zero drift across 16 desks',
        condition: 'Authoritative server-side epoch timestamps with 2500ms network buffer',
      },
      {
        metric: 'Live Tournament Scale',
        value: '16 simultaneous physical table duels',
        condition: 'NITJ Cybernauts annual esports & cybersecurity arena',
      },
      {
        metric: 'Broadcast Latency',
        value: '<16ms stage projector sync',
        condition: 'Direct local WebSocket broadcast to auditorium 4K visual display',
      },
    ],
  },
  {
    id: 'PRJ-02',
    name: 'DSA Lecture RAG',
    subtitle: 'Lecture-Grounded Retrieval',
    status: 'ACTIVE',
    metric: '104-Query Benchmark · <50ms',
    tagline: 'BM25 · DENSE RETRIEVAL · RRF · FASTAPI',
    description: 'Lecture-grounded retrieval connecting student programming questions directly to verified conceptual explanations and exact timestamps.',
    bullets: [
      'Engineered a precision hybrid RAG pipeline (BM25Okapi + paraphrase-multilingual-MiniLM dense embeddings via Reciprocal Rank Fusion) mapping student programming doubts directly to exact video lecture timestamps.',
      'Conducted an expanded 104-query benchmark across 18 YouTube lecture videos spanning 8 core DSA topics with non-transcript golden query evaluations.',
      'Developed sub-chunk sentence seek refinement snapping playback to the exact concept introduction, achieving 30.0% Hit@3 on verified moments with <50ms extractive synthesis latency and zero hallucinated timestamps.',
      'Integrated client-side Python execution via WebAssembly (Pyodide) and Docker containerization on Render cloud.',
    ],
    stack: ['FastAPI', 'PyTorch', 'sentence-transformers', 'BM25Okapi', 'Reciprocal Rank Fusion', 'Docker', 'WebAssembly (Pyodide)'],
    githubUrl: 'https://github.com/SAJAL-MALHOTRA/dsa-lecture-rag',
    github: 'https://github.com/SAJAL-MALHOTRA/dsa-lecture-rag',
    demo: 'https://striver-dsa-platform.onrender.com',
    liveUrl: 'https://striver-dsa-platform.onrender.com',
    types: ['Multimodal RAG', 'Information Retrieval', 'Video AI'],
    abilities: ['FastAPI', 'PyTorch', 'BM25Okapi', 'Dense Embeddings', 'RRF Rank Fusion', 'WebAssembly'],
    whyBuilt: 'Computer science students spend hundreds of hours watching lengthy data structures video lectures. When stuck on a specific edge case (e.g. cycle detection in directed graphs), finding the exact 30 seconds where the instructor explains it requires tedious manual scrubbing.',
    problem: 'Pure vector search suffers from semantic drift on domain-specific programming keywords (e.g., distinguishing between visited[] array vs pathVis[] array). Pure lexical BM25 fails when students ask questions phrased differently from the lecture transcript.',
    solution: 'Built a dual-channel hybrid retriever (BM25 + dense MiniLM with RRF rank fusion) snapping seek timestamps with sub-chunk sentence refinement and extractive timestamp citations.',
    architectureDiagram: `[Student Natural Language Query]
        │
        ├───> [BM25Okapi Lexical Index] ────────┐
        │                                       ├──> [Reciprocal Rank Fusion (RRF, k=60)]
        └───> [Dense MiniLM-L6-v2 Embeddings] ──┘                 │
                                                                   └──> [Sub-Chunk Sentence Seek Snap]
                                                                                │
                                                                                ├──> [Timestamped Video Seek (14:22)]
                                                                                └──> [Extractive Markdown Citation]`,
    tradeoffs: [
      {
        decision: 'Reciprocal Rank Fusion (RRF) combining BM25 and Dense MiniLM',
        why: 'Maximizes retrieval recall on technical variable names while capturing semantic questions.',
        alternative: 'Dense-only cosine similarity (failed on 38% of exact code keywords).',
      },
      {
        decision: 'Extractive citations without generative synthesis',
        why: 'Guarantees the timestamps and quotes originate 100% from the verified transcript with zero hallucination.',
        alternative: 'Generative LLM synthesis (frequently hallucinated non-existent video timestamps).',
      },
    ],
    measuredOutcomes: [
      {
        metric: 'Evaluation Benchmark',
        value: '30.0% Hit@3 on verified moments',
        condition: 'Expanded 104-query benchmark across 18 YouTube lecture videos spanning 8 core DSA topics',
      },
      {
        metric: 'Retrieval Latency',
        value: '<50ms extractive synthesis',
        condition: 'FastAPI backend on CPU container with pre-indexed FAISS & BM25Okapi',
      },
      {
        metric: 'Citation Accuracy',
        value: 'Zero hallucinated timestamps',
        condition: 'Direct mathematical span extraction from golden transcript alignment',
      },
    ],
  },
  {
    id: 'PRJ-05',
    name: 'National CV Challenge',
    subtitle: 'Surveillance Illumination Classifier',
    status: 'SHIPPED',
    metric: 'Rank #16 of 227 (Top 7%) · 0.211 Score',
    tagline: 'RESNET-34 · EFFICIENTNET-B0 · FASTMLP · PYTORCH',
    description: 'An ensemble-based computer vision competition submission achieving Top 7% (#16/227) on erratic surveillance illumination.',
    bullets: [
      'Engineered a high-performance 3-class surveillance video illumination classifier (Dark, Normal, Bright) reaching 0.211 Platform Score (Rank #16 of 227, "Best Solution" on leaderboard) under strict CPU-only constraints.',
      'Fused 128-D handcrafted luminance descriptors (spatial grid uniformity, HSV saturation ratios, dark-to-bright curves) with 2,304-D deep features from ResNet-18/34 and EfficientNet-B0.',
      'Trained a 10-fold bagged FastMLP with LayerNorm, Dropout (0.35), label smoothing (0.05), and Cosine Annealing learning rate schedules.',
      'Performed extensive visual domain error analysis discovering the Global Luminance Albedo Illusion, correcting high-albedo supermarket and indoor reflections.',
    ],
    stack: ['PyTorch', 'Torchvision', 'OpenCV', 'ResNet-34', 'EfficientNet-B0', 'FastMLP', 'Python'],
    githubUrl: 'https://github.com/SAJAL-MALHOTRA/surveillance-illumination-classification',
    github: 'https://github.com/SAJAL-MALHOTRA/surveillance-illumination-classification',
    types: ['Computer Vision Ensemble', 'National Challenge', 'Best Solution'],
    abilities: ['PyTorch', 'OpenCV', 'CNN Ensembles', 'Feature Fusion', 'Error Analysis'],
    whyBuilt: 'Submitted to the National Computer Vision Lighting Challenge, requiring accurate 3-class surveillance video illumination prediction (Dark, Normal, Bright) across diverse indoor and outdoor security feeds under strict CPU-only inference limits.',
    problem: 'Surveillance camera feeds under erratic lighting (specular glare, high-albedo supermarket floors, night rain) fail naive luminance classification due to the Global Luminance Albedo Illusion.',
    solution: 'Engineered 128-D physical luminance descriptors with 2304-D deep multi-backbone feature fusion and 10-fold bagged FastMLP, achieving 0.211 Platform Score.',
    architectureDiagram: `[Surveillance Video Frame]
        │
        ├──> [128-D Handcrafted Physical Luminance Descriptors (Spatial Grids, Saturation)] ──┐
        │                                                                                     ├──> [Concatenation + L2 Norm]
        └──> [2,304-D Deep Features (ResNet-18 + ResNet-34 + EfficientNet-B0)] ───────────────┘                 │
                                                                                                                └──> [10-Fold Bagged FastMLP (CPU)]
                                                                                                                             │
                                                                                                                             └──> [Illumination Class: Dark/Normal/Bright]`,
    tradeoffs: [
      {
        decision: 'Hybrid physical luminance descriptors fused with deep embeddings',
        why: 'Corrected the Albedo Illusion by measuring spatial variance and darkness-to-brightness ratios across 16 sub-regions.',
        alternative: 'Standalone ResNet-50 (overfit to supermarket floor glare).',
      },
      {
        decision: '10-fold bagged FastMLP on CPU',
        why: 'Met the strict platform submission requirement of sub-100ms inference without requiring GPU hardware.',
        alternative: 'Heavy Vision Transformer (ViT) ensemble (timed out on CPU test harness).',
      },
    ],
    measuredOutcomes: [
      {
        metric: 'National Leaderboard Rank',
        value: 'Rank #16 of 227 (Top 7%)',
        condition: 'Evaluated on hidden national test set with 0.211 Platform Score',
      },
      {
        metric: 'Recognition',
        value: 'Best Solution Recognition',
        condition: 'Awarded on challenge leaderboard for architectural ingenuity under CPU constraints',
      },
      {
        metric: 'Inference Speed',
        value: '<80ms per frame on CPU',
        condition: 'Single-thread x86 CPU evaluation environment',
      },
    ],
  },
  {
    id: 'PRJ-04',
    name: 'ThinkFolio',
    subtitle: 'Adaptive Financial Reasoning Engine',
    status: 'ACTIVE',
    metric: 'R² = 0.927 · <100ms Inference',
    tagline: 'PYTORCH · FASTAPI · XGBOOST · FINBERT',
    description: 'Dual-branch machine learning evaluation engine scoring financial reasoning across 8 dimensions with FinBERT & SHAP explainability.',
    bullets: [
      'Engineered a dual-branch ML evaluation engine (PyTorch Tabular MLP + gradient-boosted trees) scoring financial reasoning across 8 dimensions, reaching R² = 0.927 predictive accuracy.',
      'Integrated FinBERT sentence embeddings with SHAP explainability to deliver real-time feature attribution at under 100ms latency overhead.',
      'Architected a containerized microservice backend with FastAPI, SQLAlchemy, and PostgreSQL, adding EMA-based competency tracking and Alembic migrations.',
      'Built an interactive evaluation UI in Next.js and Tailwind CSS surfacing dynamic rubric scores and personalized learning trajectories.',
    ],
    stack: ['PyTorch', 'XGBoost', 'FastAPI', 'PostgreSQL', 'Docker', 'Next.js', 'FinBERT', 'SHAP'],
    githubUrl: 'https://github.com/SAJAL-MALHOTRA/thinkfolio',
    github: 'https://github.com/SAJAL-MALHOTRA/thinkfolio',
    types: ['ML Evaluation Engine', 'Financial Reasoning'],
    abilities: ['PyTorch', 'FinBERT', 'SHAP', 'FastAPI', 'PostgreSQL', 'Docker'],
    whyBuilt: 'Quantitative portfolio analysis and finance education platforms lack real-time reasoning feedback that shows users why their capital allocation strategies succeeded or failed.',
    problem: 'Financial reasoning assessment is typically manual or rule-based, failing to capture subtle multi-dimensional competence or provide immediate mathematical feature attribution.',
    solution: 'Engineered dual-branch Tabular MLP + gradient-boosted trees with FinBERT embeddings and SHAP explainability delivering R² 0.927 accuracy under 100ms latency.',
    tradeoffs: [
      {
        decision: 'Dual-branch Tabular MLP + XGBoost ensemble',
        why: 'Combines tabular feature interaction power with dense semantic text understanding.',
        alternative: 'Pure LLM prompt evaluation (expensive and inconsistent variance).',
      },
    ],
    measuredOutcomes: [
      {
        metric: 'Predictive Accuracy',
        value: 'R² = 0.927',
        condition: 'Evaluated on out-of-sample portfolio reasoning benchmark dataset',
      },
      {
        metric: 'Inference Latency',
        value: '<100ms end-to-end',
        condition: 'FastAPI microservice running ONNX-optimized FinBERT pipeline',
      },
    ],
  },
  {
    id: 'PRJ-08',
    name: 'DevDex',
    subtitle: 'Developer Identity & Portfolio Infrastructure',
    status: 'SHIPPED',
    metric: 'Next.js 15 · Supabase Auth · Row-Level Security',
    tagline: 'NEXT.JS · SUPABASE · TYPESCRIPT · TAILWIND CSS',
    description: 'Full-stack digital identity and profile system for software engineers with Supabase authentication, PostgreSQL Row-Level Security, and dynamic developer telemetry.',
    bullets: [
      'Engineered a comprehensive developer identity platform with Next.js 15 App Router, TypeScript, and Supabase PostgreSQL for developer profile curation.',
      'Implemented strict PostgreSQL Row-Level Security (RLS) policies and session-based authentication guarding user profiles, telemetry nodes, and private assets.',
      'Built server actions and dynamic profile renderers delivering low-latency portfolio pages with optimized client rendering and custom theme systems.',
    ],
    stack: ['Next.js 15', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
    githubUrl: 'https://github.com/SAJAL-MALHOTRA/devdex',
    github: 'https://github.com/SAJAL-MALHOTRA/devdex',
    types: ['Full-Stack Web Application', 'Developer Tools'],
    abilities: ['Next.js App Router', 'Supabase Auth', 'PostgreSQL RLS', 'TypeScript', 'Tailwind CSS'],
    whyBuilt: 'Engineers need a reliable, modular identity platform where verified project telemetry, technical proficiencies, and contact endpoints can be showcased without third-party platform lock-in.',
    problem: 'Centralized developer profiles often lack granular privacy control, suffer from vendor lock-in, and provide static templates with rigid schema definitions.',
    solution: 'Architected DevDex with Supabase PostgreSQL, row-level access control, and dynamic Next.js component rendering for complete ownership of developer credentials.',
    tradeoffs: [
      {
        decision: 'PostgreSQL Row-Level Security with Supabase Auth',
        why: 'Enforces access policies directly at the database engine level, eliminating authorization logic duplication in API endpoints.',
        alternative: 'Application-layer middleware authorization checks (higher latency and prone to security leakage).',
      },
    ],
    measuredOutcomes: [
      {
        metric: 'Database Security Integrity',
        value: '100% RLS policy coverage',
        condition: 'All user profile reads and writes validated against Supabase auth UID claims',
      },
      {
        metric: 'Lighthouse Performance',
        value: '98+ Performance Score',
        condition: 'Zero layout shifts with statically pre-rendered profile shells and selective hydration',
      },
    ],
  },
  {
    id: 'PRJ-06',
    name: 'Automated Pothole Detection',
    subtitle: 'Real-Time Edge Computer Vision Pipeline',
    status: 'SHIPPED',
    metric: 'Real-Time YOLO · Temporal Cooldown',
    tagline: 'YOLO · OPENCV · PYTHON · EDGE AI',
    description: 'Real-time edge computer vision pipeline detecting road surface hazards and potholes from vehicle dashcam video feeds.',
    bullets: [
      'Developed an end-to-end edge computer vision pipeline detecting road surface hazards and potholes from vehicle dashcam video feeds in real time.',
      'Implemented YOLO deep learning model inference with custom confidence tuning and temporal cooldown logic to prevent duplicate hazard logging.',
      'Integrated automated timestamped visual evidence capture and disk persistence for road maintenance inspection and geospatial telemetry.',
    ],
    stack: ['Python', 'YOLO', 'OpenCV', 'Computer Vision', 'Edge AI'],
    githubUrl: 'https://github.com/SAJAL-MALHOTRA/Automated-Pothole-Detection',
    github: 'https://github.com/SAJAL-MALHOTRA/Automated-Pothole-Detection',
    types: ['Edge Computer Vision', 'Autonomous Systems'],
    abilities: ['YOLO', 'OpenCV', 'Real-Time Video Analytics', 'Evidence Logging'],
    whyBuilt: 'Municipal road inspection is slow, hazardous, and infrequent. Dashcam-mounted edge AI can continuously map road degradation without manual surveys.',
    problem: 'Continuous video frames generate thousands of duplicate detections for a single pothole as a vehicle drives past, spamming the incident database.',
    solution: 'Engineered a YOLO-powered edge CV pipeline with temporal debounce cooldown, confidence gating, and automated visual evidence archiving.',
    tradeoffs: [
      {
        decision: 'Edge YOLO inference with temporal cooldown gating',
        why: 'Eliminates 98% of duplicate telemetry logs while keeping model inference real-time on edge devices.',
        alternative: 'Streaming all raw frames to cloud endpoints (cost-prohibitive and bandwidth-heavy).',
      },
    ],
    measuredOutcomes: [
      {
        metric: 'Detection Speed',
        value: '>30 FPS real-time on edge GPU',
        condition: 'Tested on vehicle dashcam 1080p stream',
      },
    ],
  },
  {
    id: 'PRJ-07',
    name: 'India Tech Salary Predictor',
    subtitle: 'Applied ML Compensation Regression',
    status: 'SHIPPED',
    metric: '6,000+ Verified Records · Streamlit',
    tagline: 'SCIKIT-LEARN · RANDOM FOREST · STREAMLIT',
    description: 'Compensation regression model trained on 6,000+ AmbitionBox verified Indian tech records with interactive Streamlit forecasting.',
    bullets: [
      'Built an end-to-end compensation prediction system trained on 6,000+ verified Indian tech industry compensation records scraped and cleaned from AmbitionBox.',
      'Trained a Random Forest Regressor modeling non-linear interactions across company tiers, job titles, technical departments, and years of experience.',
      'Deployed an interactive Streamlit web application with dynamic company-to-job filtering and one-hot encoding alignment for instant LPA salary forecasts.',
    ],
    stack: ['Python', 'Scikit-learn', 'Random Forest', 'Pandas', 'Streamlit', 'Joblib'],
    githubUrl: 'https://github.com/SAJAL-MALHOTRA/salary-predictor',
    github: 'https://github.com/SAJAL-MALHOTRA/salary-predictor',
    types: ['Machine Learning', 'Data Science & Regression'],
    abilities: ['Scikit-learn', 'Random Forest', 'Data Cleaning', 'Streamlit UI'],
    whyBuilt: 'Indian engineering students and job switchers face opaque compensation bands across Tier-1/2/3 companies with huge variance.',
    problem: 'Job portals give wide, unhelpful ranges that do not correlate experience, company tier, and skill demand mathematically.',
    solution: 'Trained a Random Forest regressor with one-hot feature encoding predicting LPA packages based on 6,000+ verified data points.',
    tradeoffs: [
      {
        decision: 'Random Forest Regressor over Linear Regression',
        why: 'Captures non-linear tier step-functions between startups, service companies, and product unicorns.',
        alternative: 'Linear ridge regression (failed to capture tier salary multipliers).',
      },
    ],
    measuredOutcomes: [
      {
        metric: 'Dataset Scale',
        value: '6,000+ verified records',
        condition: 'Scraped, normalized, and cleaned from AmbitionBox industry data',
      },
    ],
  },
];
