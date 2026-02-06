export interface Education {
  institution: string;
  degree: string;
  period: string;
  details?: string;
  acquiredSkills?: string[];
  internships?: string[];
}

export const education: Education[] = [
  {
    institution: "UCLL",
    degree: "Graduaat Programmeren",
    period: "2024 - 2026",
    details: "Hoogste onderscheiding",
    internships: [
      "Stage UCLL - Game development in Java",
      "Stage Opteamal - Full stack web development in Nuxt.js en FastAPI/Django",
    ],
  },
  {
    institution: "KU Leuven",
    degree: "Bachelor Wijsbegeerte",
    period: "2013 - 2015",
    details: "Diploma niet behaald",
  },
  {
    institution: "Sint-Jozefinstituut Genk",
    degree: "ASO Wetenschappen - Moderne Talen",
    period: "2007 - 2013",
  },
];
