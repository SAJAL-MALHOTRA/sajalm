import { getAssetPath } from "@/utils/asset";

export const profile = {
  id: "SM-NITJ-2029",
  name: "Sajal Malhotra",
  fullName: "Sajal Malhotra",
  handle: "@SAJAL-MALHOTRA",
  phone: "+91 62845 96119",
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
  tagline: "Software engineer & ML researcher by daylight. Grounded in spirituality, engineering rigor, and creative direction. Building fast, resilient, and beautiful systems at NIT Jalandhar.",
  description:
    "Information Technology undergraduate at NIT Jalandhar (CGPA 8.13) specializing in ML reasoning engines, multi-agent systems, and full-stack real-time platforms. Core Member at Cybernauts, practitioner of spirituality and mindfulness, and creative director.",
  transcript:
    "Sajal Malhotra is an Information Technology undergraduate at NIT Jalandhar with an 8.13 CGPA. He specializes in ML reasoning engines, multi-agent systems, and full-stack real-time platforms. Creator of DSA Lecture RAG with a 104-query benchmark, Cybernauts Arena for 16-team simultaneous esports tournaments, Pairfect with 200+ registered pilot users and sub-50ms median Groq Llama 3 inference, ThinkFolio with R² 0.927 accuracy, and ranked #16 of 227 (National Top 7%, Score 0.211) in the Computer Vision Lighting Challenge with Best Solution recognition. He is a Core Member of Cybernauts and an active fashion & creative content creator with over 220,000 monthly views.",

  // Aspects of Personality requested by Sajal (Tech prioritized, clean & emoji-free)
  personality: [
    {
      id: "tech",
      code: "01",
      title: "I do tech.",
      subtitle: "Full-stack & distributed systems",
      detail: "Building real-time WebSockets, sub-50ms LLM pipelines (Groq Llama 3), and robust cloud infrastructure serving real users.",
      badge: "SYSTEMS & CODE",
    },
    {
      id: "nerd",
      code: "02",
      title: "I'm a nerd.",
      subtitle: "DSA benchmarks, PyTorch & arXiv papers",
      detail: "Obsessed with algorithmic optimization, statistical test sets, Reciprocal Rank Fusion, and exploring modern AI research.",
      badge: "RESEARCH & DSA",
    },
    {
      id: "opportunities",
      code: "03",
      title: "I'm looking for internships, jobs & opportunities.",
      subtitle: "B.Tech IT '29 · Open to SWE & ML roles",
      detail: "Actively seeking summer internships, high-impact engineering roles, and innovative collaborations where I can ship production code.",
      badge: "OPEN FOR HIRE",
      isHighlight: true,
    },
    {
      id: "spirituality",
      code: "04",
      title: "I do spirituality.",
      subtitle: "Mindfulness, inner clarity & grounded focus",
      detail: "Grounding technical rigor with meditation, mindfulness, and introspection. Cultivating deep inner stillness and mental clarity amidst rapid execution and complex systems.",
      badge: "MINDFULNESS",
    },
    {
      id: "fashion",
      code: "05",
      title: "I do fashion.",
      subtitle: "Archival tailoring & clean silhouettes",
      detail: "Passionate about tailoring, layered textures, and high-fashion aesthetics. Expressing intentional design both in code and wardrobe.",
      badge: "STYLE & SILHOUETTE",
    },
    {
      id: "modelling",
      code: "06",
      title: "I do modelling.",
      subtitle: "Runway & editorial visual direction",
      detail: "Active runway and stage model for the NIT Jalandhar Fashion & Modelling Club with 220,000+ monthly impressions across creative channels.",
      badge: "RUNWAY & STAGE",
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
      title: "Shipped Pairfect (Campus Pilot)",
      stat: "200+ PILOT USERS",
      metricNumber: "200+",
      detail: "Designed and deployed relationship platform (pairfect.site) with 200+ registered student users, median ~45ms Groq Llama 3 API inference, Supabase real-time sync, and zero TypeScript bugs over 77 production routes.",
      category: "Product & Growth",
      highlight: true,
    },
    {
      title: "National Computer Vision Challenge",
      stat: "TOP 7%",
      metricNumber: "16/227",
      detail: "Ranked #16 of 227 (National Top 7%) on “Lighting Level” illumination prediction from camera images with a score of 0.211. Earned 'Best Solution' recognition on leaderboard with 128-D luminance descriptors and 10-fold bagged FastMLP on CPU.",
      category: "Machine Learning",
      highlight: true,
    },
    {
      title: "Content Creator & Model",
      stat: "220K+ VIEWS",
      metricNumber: "220K+",
      detail: "Built personal creative presence generating 2.2L+ (220,000+) monthly views across fashion, runway modeling, and digital creative direction.",
      category: "Creative & Media",
      highlight: true,
    },
    {
      title: "Cybernauts Arena Tournament Platform",
      stat: "16-TEAM SYNC",
      metricNumber: "2.5s BUFFER",
      detail: "Core Member at Cybernauts NITJ. Architected the broadcast tournament platform orchestrating 16 simultaneous physical table duels with authoritative epoch master clocks and 2.5s network jitter buffer.",
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
    twitter: "https://x.com/slothinslowlane",
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
