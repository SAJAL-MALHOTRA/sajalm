import { getAssetPath } from "@/utils/asset";

export const profile = {
  id: "SM-NITJ-2029",
  name: "Sajal Malhotra",
  fullName: "Sajal Malhotra",
  handle: "@SAJAL-MALHOTRA",
  phone: "+91-62845-96119",
  email: "malhotrasajal243@gmail.com",
  title: "B.TECH INFORMATION TECHNOLOGY",
  department: "INFORMATION TECHNOLOGY",
  college: "NIT JALANDHAR",
  collegeFull: "Dr. B. R. Ambedkar National Institute of Technology Jalandhar",
  cgpa: "8.13 CGPA",
  batch: "2025 – 2029",
  location: "Jalandhar, Punjab, India",
  organization: "NIT JALANDHAR",
  model: "MODEL DX-042",
  quote: "Building ML evaluation engines, real-time products, and multi-agent systems.",
  tagline: "Software engineer & ML researcher by daylight. Fashion model & creative mind after hours. An intentional overthinker building fast, beautiful, and resilient systems.",
  description:
    "Information Technology undergraduate at NIT Jalandhar (CGPA 8.13) specializing in ML reasoning engines, multi-agent systems, and full-stack real-time platforms. Core Member at Cybernauts and fashion & creative content creator (220K+ monthly views).",
  transcript:
    "Sajal Malhotra is an Information Technology undergraduate at NIT Jalandhar with an 8.13 CGPA. He specializes in ML reasoning engines, multi-agent systems, and full-stack real-time platforms. Creator of DSA Lecture RAG with a 104-query benchmark, Cybernauts Arena for 16-team simultaneous esports tournaments, Pairfect with 200+ users and sub-50ms Groq Llama 3 inference, ThinkFolio with R² 0.927 accuracy, and a Computer Vision Illumination Classifier ranked in the national Top 7%. He is a Core Member of Cybernauts and an active fashion & creative content creator with over 220,000 monthly views.",

  // Aspects of Personality requested by Sajal
  personality: [
    {
      id: "fashion",
      title: "I do fashion.",
      subtitle: "Archival tailoring & clean silhouettes",
      detail: "Passionate about tailoring, layered textures, and high-fashion aesthetics. Expressing intentional design both in code and wardrobe.",
      emoji: "👔",
      badge: "STYLE & SILHOUETTE",
    },
    {
      id: "modelling",
      title: "I do modelling.",
      subtitle: "Runway & editorial visual direction",
      detail: "Active runway and stage model for the NIT Jalandhar Fashion & Modelling Club with 220,000+ monthly impressions across creative channels.",
      emoji: "📸",
      badge: "RUNWAY & STAGE",
    },
    {
      id: "tech",
      title: "I do tech.",
      subtitle: "Full-stack & distributed systems",
      detail: "Building real-time WebSockets, sub-50ms LLM pipelines (Groq Llama 3), and robust cloud infrastructure serving real users.",
      emoji: "⚡",
      badge: "SYSTEMS & CODE",
    },
    {
      id: "nerd",
      title: "I'm a nerd.",
      subtitle: "DSA benchmarks, PyTorch & arXiv papers",
      detail: "Obsessed with algorithmic optimization, statistical test sets, Reciprocal Rank Fusion, and exploring modern AI research.",
      emoji: "🧠",
      badge: "RESEARCH & DSA",
    },
    {
      id: "overthinker",
      title: "I'm a critical overthinker.",
      subtitle: "Micro-detail obsessive & latency purist",
      detail: "Meticulous about every millisecond of network latency, edge case handling, typographic rhythm, and failure-mode recovery.",
      emoji: "🔍",
      badge: "PERFECTIONIST",
    },
    {
      id: "opportunities",
      title: "I'm looking for internships, jobs & opportunities.",
      subtitle: "B.Tech IT '29 · Open to SWE & ML roles",
      detail: "Actively seeking summer internships, high-impact engineering roles, and innovative collaborations where I can ship production code.",
      emoji: "🎯",
      badge: "OPEN FOR HIRE",
      isHighlight: true,
    },
  ],

  coursework: [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Operating Systems",
    "DBMS",
    "Machine Learning",
    "Computer Networks",
  ],

  achievements: [
    {
      title: "Grew Pairfect to 200+ Active Users",
      stat: "200+ USERS",
      metricNumber: "200+",
      detail: "Scaled relationship platform (pairfect.site) organically to 200+ active users with sub-50ms Groq Llama 3 AI inference, Supabase real-time sync, and zero TypeScript bugs over 77 production routes.",
      category: "Product & Growth",
      highlight: true,
    },
    {
      title: "National Computer Vision Challenge",
      stat: "TOP 7%",
      metricNumber: "0.211",
      detail: "Ranked in top 7% (169/227) on surveillance illumination classification. Earned 'Best Solution' badge on leaderboard with 128-D luminance descriptors and 10-fold bagged FastMLP on CPU.",
      category: "Machine Learning",
      highlight: true,
    },
    {
      title: "Content Creator & Model",
      stat: "220K+ VIEWS",
      metricNumber: "220K+",
      detail: "Built personal creative presence generating 2.2L+ (220,000+) monthly views across fashion, tech lifestyle, and creative direction.",
      category: "Creative & Media",
      highlight: true,
    },
    {
      title: "Cybernauts Arena Tournament Platform",
      stat: "16-TEAM SYNC",
      metricNumber: "0ms DRIFT",
      detail: "Core Member at Cybernauts NITJ. Architected the broadcast-grade tournament platform orchestrating 16 simultaneous physical table duels with 2.5s network grace buffer and 4K arena projector.",
      category: "Distributed Systems",
      highlight: true,
    },
    {
      title: "Academic Excellence — B.Tech IT",
      stat: "CGPA 8.13",
      metricNumber: "8.13",
      detail: "Dr. B. R. Ambedkar National Institute of Technology Jalandhar (2025–2029). Core coursework in Data Structures, Machine Learning, OS, DBMS, and Networks.",
      category: "Academics",
    },
  ],

  links: {
    github: "https://github.com/SAJAL-MALHOTRA",
    linkedin: "https://linkedin.com/in/sajal-malhotra1",
    twitter: "https://x.com/sajal",
    instagram: "https://instagram.com/sajal",
    email: "malhotrasajal243@gmail.com",
    resume: getAssetPath("/resume.pdf"),
    buyMeAChai: "https://buymeachai.in/sajalmalhotra",
  },

  // Backward compatibility for standalone showcase modules
  audioGreeting: "Hi, I'm Sajal.",
  audioBriefing: "Audio briefing for Sajal Malhotra · NIT Jalandhar",
  society: "Fashion & Modelling Club / Cybernauts NITJ",
  issue: "ISSUE N° 01 // 2026",
  issn: "ISSN 2026-NITJ",

  rotation: {
    building: "DSA Lecture RAG (FastAPI/PyTorch) & Cybernauts Arena (Next.js/Express)",
    wearing: "Dark brown leather blouson, olive zip fleece, tailored gray pleated trousers",
    listening: "Frank Ocean, Travis Scott, Aphex Twin, Dijon",
  },
};
