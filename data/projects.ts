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
}

export const projects: Project[] = [
  {
    id: 'PRJ-01',
    name: 'Pairfect',
    subtitle: 'Real-Time Interactive Consumer Platform',
    status: 'ACTIVE',
    metric: '<50ms Latency',
    tagline: 'NEXT.JS · SUPABASE · GROQ LLAMA 3',
    description: 'Full-stack real-time consumer social app (pairfect.site) with live state synchronization and Groq AI conversational analysis.',
    bullets: [
      'Designed and shipped a full-stack real-time social app (pairfect.site) with live state synchronization and LLM-driven prompt analysis.',
      'Built a Groq-accelerated Llama 3 inference pipeline delivering sub-50ms evaluation latency for instant conversational scoring and vibe judging.',
      'Implemented real-time bidirectional communication using Supabase WebSockets with PostgreSQL Row-Level Security (RLS) policies.',
      'Enforced end-to-end TypeScript schemas across all real-time payloads, shipping with zero TypeScript errors across 77 routes.'
    ],
    stack: ['Next.js', 'Supabase', 'Groq API (Llama 3)', 'Tailwind CSS', 'WebSockets', 'TypeScript'],
    githubUrl: 'https://github.com/SAJAL-MALHOTRA/Pairfect---Your-lovespace',
    github: 'https://github.com/SAJAL-MALHOTRA/Pairfect---Your-lovespace',
    demo: 'https://pairfect.site',
    liveUrl: 'https://pairfect.site',
    types: ['Real-Time Social Platform', 'LLM Product'],
    abilities: ['Next.js', 'Supabase Realtime', 'Groq Llama 3', 'PostgreSQL RLS'],
    problem: 'Real-time conversational social apps suffer from slow LLM evaluation latencies and uncoordinated client state.',
    solution: 'Shipped Groq-accelerated Llama 3 pipeline with sub-50ms inference, WebSocket bidirectional sync, and zero TypeScript errors over 77 routes.',
  },
  {
    id: 'PRJ-02',
    name: 'DSA Lecture RAG',
    subtitle: 'Timestamped Video Retrieval & Synthesis Engine',
    status: 'ACTIVE',
    metric: '104-Query Benchmark · <50ms',
    tagline: 'FASTAPI · PYTORCH · BM25 · DENSE RRF',
    description: 'Precision-engineered hybrid RAG system mapping student programming doubts directly to exact video lecture timestamps.',
    bullets: [
      'Engineered a precision hybrid RAG pipeline (BM25Okapi + paraphrase-multilingual-MiniLM dense embeddings via Reciprocal Rank Fusion) mapping student programming doubts directly to exact video lecture timestamps.',
      'Conducted an expanded 104-query benchmark across 18 YouTube lecture videos spanning 8 core DSA topics with non-transcript golden query evaluations.',
      'Developed sub-chunk sentence seek refinement snapping playback to the exact concept introduction, achieving 30.0% Hit@3 on verified moments with <50ms extractive synthesis latency and 0% hallucination.',
      'Integrated client-side Python execution via WebAssembly (Pyodide) and Docker containerization on Render cloud.'
    ],
    stack: ['FastAPI', 'PyTorch', 'sentence-transformers', 'BM25', 'Reciprocal Rank Fusion', 'Docker', 'WebAssembly (Pyodide)'],
    githubUrl: 'https://github.com/SAJAL-MALHOTRA/dsa-lecture-rag',
    github: 'https://github.com/SAJAL-MALHOTRA/dsa-lecture-rag',
    demo: 'https://striver-dsa-platform.onrender.com',
    liveUrl: 'https://striver-dsa-platform.onrender.com',
    types: ['Multimodal RAG', 'Information Retrieval', 'Video AI'],
    abilities: ['FastAPI', 'PyTorch', 'BM25Okapi', 'Dense Embeddings', 'RRF Rank Fusion', 'WebAssembly'],
    problem: 'Technical video lectures have rich explanations, but students spend minutes scrubbing through hours of video trying to find the exact concept timestamp.',
    solution: 'Built a dual-channel hybrid retriever (BM25 + dense MiniLM with RRF rank fusion) snapping seek timestamps with sub-chunk sentence refinement and extractive timestamp citations.',
  },
  {
    id: 'PRJ-03',
    name: 'Cybernauts Arena',
    subtitle: 'Real-Time 16-Team Esports Tournament Platform',
    status: 'ACTIVE',
    metric: '16-Team Sync · 0ms Drift',
    tagline: 'NEXT.JS 16 · EXPRESS · WEB AUDIO · WEBSOCKETS',
    description: 'Esports-grade tournament engine synchronizing 16 physical desks, an auditorium 4K projector, and an authoritative master clock.',
    bullets: [
      'Architected a broadcast-grade esports tournament engine synchronizing 16 physical participant table desks, an auditorium 4K arena projector, and an authoritative host command console.',
      'Eliminated client clock drift across unpredictable venue Wi-Fi networks by calculating authoritative epoch deadlines with a 2.5-second network latency grace buffer.',
      'Engineered a 5-tier incident response decision matrix evaluating real-world cybersecurity outages (Best, Less-Good, Neutral, Less-Bad, Catastrophic) with instant credit calculations.',
      'Integrated Web Audio API synthesizer soundscapes and atomic stage advancement algorithms (Ro16 → Quarterfinals → Semifinals → Finals).'
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Express.js', 'Web Audio API', 'Framer Motion', 'Tailwind CSS'],
    githubUrl: 'https://github.com/SAJAL-MALHOTRA/cybernauts-arena',
    github: 'https://github.com/SAJAL-MALHOTRA/cybernauts-arena',
    types: ['Esports Tournament Platform', 'Distributed Systems'],
    abilities: ['Next.js 16', 'Express.js', 'Authoritative Master Clock', 'Web Audio API', 'Latency Compensation'],
    problem: 'Live technical tournaments suffer from client clock drift, dropped packet race conditions, and disconnect between audience and 16 physical duel desks.',
    solution: 'Engineered authoritative server epoch clock synchronization with 2.5s network grace buffer, 5-tier incident evaluation matrix, and broadcast-grade arena projector.',
  },
  {
    id: 'PRJ-04',
    name: 'ThinkFolio',
    subtitle: 'Adaptive ML Reasoning Engine',
    status: 'ACTIVE',
    metric: 'R² = 0.927',
    tagline: 'PYTORCH · FASTAPI · XGBOOST · FINBERT',
    description: 'Dual-branch ML evaluation engine scoring financial reasoning across 8 dimensions with FinBERT & SHAP explainability.',
    bullets: [
      'Engineered a dual-branch ML evaluation engine (PyTorch Tabular MLP + gradient-boosted trees) scoring financial reasoning across 8 dimensions, reaching R² = 0.927 predictive accuracy.',
      'Integrated FinBERT sentence embeddings with SHAP explainability to deliver real-time feature attribution at under 100ms latency overhead.',
      'Architected a containerized microservice backend with FastAPI, SQLAlchemy, and PostgreSQL, adding EMA-based competency tracking and Alembic migrations.',
      'Built an interactive evaluation UI in Next.js and Tailwind CSS that surfaces dynamic rubric scores and personalized learning trajectories.'
    ],
    stack: ['PyTorch', 'XGBoost', 'FastAPI', 'PostgreSQL', 'Docker', 'Next.js', 'FinBERT', 'SHAP'],
    githubUrl: 'https://github.com/SAJAL-MALHOTRA/thinkfolio',
    github: 'https://github.com/SAJAL-MALHOTRA/thinkfolio',
    types: ['ML Evaluation Engine', 'Financial Reasoning'],
    abilities: ['PyTorch', 'FinBERT', 'SHAP', 'FastAPI', 'PostgreSQL', 'Docker'],
    problem: 'Financial reasoning assessment lacks real-time feature attribution and multi-dimensional competency scoring.',
    solution: 'Engineered dual-branch Tabular MLP + gradient-boosted trees with FinBERT embeddings delivering R² 0.927 accuracy under 100ms latency.',
  },
  {
    id: 'PRJ-05',
    name: 'Surveillance Illumination Classifier',
    subtitle: 'Computer Vision Deep Multi-Backbone Ensemble',
    status: 'SHIPPED',
    metric: 'Rank #16 of 227 (Top 7%) · 0.21 Score',
    tagline: 'PYTORCH · RESNET-34 · EFFICIENTNET · FASTMLP',
    description: 'Leaderboard champion deep CNN ensemble (ResNet-18/34, EfficientNet-B0, FastMLP) for 3-class surveillance illumination classification.',
    bullets: [
      'Engineered a high-performance 3-class surveillance video illumination classifier (Dark, Normal, Bright) reaching 0.21 Platform Score (Rank #16 of 227, "Best Solution" on leaderboard) under strict CPU-only constraints.',
      'Fused 128-D handcrafted luminance descriptors (spatial grid uniformity, HSV saturation ratios, dark-to-bright curves) with 2,304-D deep features from ResNet-18/34 and EfficientNet-B0.',
      'Trained a 10-fold bagged FastMLP with LayerNorm, Dropout (0.35), label smoothing (0.05), and Cosine Annealing learning rate schedules.',
      'Performed extensive visual domain error analysis discovering the Global Luminance Albedo Illusion, correcting high-albedo supermarket and indoor reflections.'
    ],
    stack: ['PyTorch', 'Torchvision', 'OpenCV', 'ResNet-34', 'EfficientNet-B0', 'FastMLP', 'Python'],
    githubUrl: 'https://github.com/SAJAL-MALHOTRA/surveillance-illumination-classification',
    github: 'https://github.com/SAJAL-MALHOTRA/surveillance-illumination-classification',
    types: ['Computer Vision Ensemble', 'National Challenge'],
    abilities: ['PyTorch', 'OpenCV', 'CNN Ensembles', 'Feature Fusion', 'Error Analysis'],
    problem: 'Surveillance camera feeds under erratic lighting (specular glare, high-albedo supermarket floors, night rain) fail naive luminance classification.',
    solution: 'Engineered 128-D physical luminance descriptors with 2304-D deep multi-backbone feature fusion and 10-fold bagged FastMLP, achieving 0.211 Platform Score.',
  },
  {
    id: 'PRJ-06',
    name: 'Automated Pothole Detection',
    subtitle: 'Real-Time Edge Computer Vision Pipeline',
    status: 'SHIPPED',
    metric: 'YOLO Real-Time Detection',
    tagline: 'YOLO · OPENCV · PYTHON · EDGE AI',
    description: 'Real-time edge computer vision pipeline detecting road surface hazards and potholes from vehicle dashcam video feeds.',
    bullets: [
      'Developed an end-to-end edge computer vision pipeline detecting road surface hazards and potholes from vehicle dashcam video feeds in real time.',
      'Implemented YOLO deep learning model inference with custom confidence tuning and temporal cooldown logic to prevent duplicate hazard logging.',
      'Integrated automated timestamped visual evidence capture and disk persistence for road maintenance inspection and geospatial telemetry.'
    ],
    stack: ['Python', 'YOLO', 'OpenCV', 'Computer Vision', 'Edge AI'],
    githubUrl: 'https://github.com/SAJAL-MALHOTRA/Automated-Pothole-Detection',
    github: 'https://github.com/SAJAL-MALHOTRA/Automated-Pothole-Detection',
    types: ['Edge Computer Vision', 'Autonomous Systems'],
    abilities: ['YOLO', 'OpenCV', 'Real-Time Video Analytics', 'Evidence Logging'],
    problem: 'Manual road surface inspection is slow and hazardous; automated hazard detection requires real-time detection without false-positive spam.',
    solution: 'Built a YOLO-powered edge CV pipeline with temporal debounce cooldown and automated evidence archiving.',
  },
  {
    id: 'PRJ-07',
    name: 'India Tech Salary Predictor',
    subtitle: 'Applied Machine Learning Regression Pipeline',
    status: 'SHIPPED',
    metric: '6,000+ Verified Records',
    tagline: 'SCIKIT-LEARN · RANDOM FOREST · STREAMLIT',
    description: 'Compensation regression model trained on 6,000+ AmbitionBox verified Indian tech records with interactive Streamlit forecasting.',
    bullets: [
      'Built an end-to-end compensation prediction system trained on 6,000+ verified Indian tech industry compensation records scraped and cleaned from AmbitionBox.',
      'Trained a Random Forest Regressor modeling non-linear interactions across company tiers, job titles, technical departments, and years of experience.',
      'Deployed an interactive Streamlit web application with dynamic company-to-job filtering and one-hot encoding alignment for instant LPA salary forecasts.'
    ],
    stack: ['Python', 'Scikit-learn', 'Random Forest', 'Pandas', 'Streamlit', 'Joblib'],
    githubUrl: 'https://github.com/SAJAL-MALHOTRA/salary-predictor',
    github: 'https://github.com/SAJAL-MALHOTRA/salary-predictor',
    types: ['Machine Learning', 'Data Science & Regression'],
    abilities: ['Scikit-learn', 'Random Forest', 'Data Cleaning', 'Streamlit UI'],
    problem: 'Tech job seekers face opacity and inconsistent compensation data across companies and experience brackets.',
    solution: 'Cleaned 6,000+ verified data points and trained a Random Forest regressor with one-hot alignment predicting LPA packages.',
  },
  {
    id: 'PRJ-08',
    name: 'ResearchFlow / ScholarAI',
    subtitle: 'Stateful Multi-Agent Literature Synthesis Engine',
    status: 'ACTIVE',
    metric: '5-Node Graph',
    tagline: 'LANGGRAPH · LANGCHAIN · FASTAPI · PGVECTOR',
    description: 'Autonomous multi-agent research synthesis engine with cyclic stateful graph routing and semantic paper retrieval.',
    bullets: [
      'Architected a 5-node stateful LangGraph pipeline (Planner → Researcher → Evidence Collector → Verifier → Writer) automating academic paper discovery, semantic parsing, and structured synthesis.',
      'Implemented vector similarity search over Supabase pgvector with semantic embeddings for high-precision retrieval across technical literature.',
      'Built asynchronous REST APIs with FastAPI to handle long-running multi-agent reasoning cycles with checkpointing and state recovery.'
    ],
    stack: ['LangGraph', 'LangChain', 'Python', 'FastAPI', 'pgvector', 'Supabase'],
    githubUrl: 'https://github.com/SAJAL-MALHOTRA/researchflow',
    github: 'https://github.com/SAJAL-MALHOTRA/researchflow',
    types: ['Autonomous Multi-Agent System', 'AI Research Tools'],
    abilities: ['LangGraph', 'LangChain', 'FastAPI', 'pgvector', 'Vector Search'],
    problem: 'Academic paper literature review requires multi-step autonomous synthesis without agent looping or state loss.',
    solution: 'Designed a 5-node stateful LangGraph pipeline with checkpointing, state recovery, and pgvector semantic retrieval.',
  },
];
