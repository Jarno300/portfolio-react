export interface AboutProfile {
  intro: string;
  languages: { name: string; level: string }[];
  technicalSkills: string[];
  softSkills: string[];
}

export const aboutProfile: AboutProfile = {
  intro:
    "I build reliable, user-first software with a balance of clean architecture and thoughtful UX. I enjoy working across the stack, translating complex requirements into intuitive experiences.",
  languages: [
    { name: "Dutch", level: "Native" },
    { name: "English", level: "Professional" },
    { name: "French", level: "Conversational" },
  ],
  technicalSkills: [
    "TypeScript",
    "React",
    "Node.js",
    "Vite",
    "REST APIs",
    "SQL",
    "Git",
    "Testing",
  ],
  softSkills: [
    "Communication",
    "Collaboration",
    "Problem Solving",
    "Ownership",
    "Adaptability",
    "Attention to Detail",
  ],
};
