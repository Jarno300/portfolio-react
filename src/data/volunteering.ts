export interface Volunteering {
  organization: string;
  location: string;
  role: string;
  period: string;
  responsibilities: string[];
  acquiredSkills?: string[];
}

export const volunteering: Volunteering[] = [
  {
    organization: "Digipunt",
    location: "Holsbeek",
    role: "Digital Coach",
    period: "2023 - 2025",
    responsibilities: [
      "Begeleiding van inwoners bij digitale vaardigheden.",
      "Toegankelijk maken van technologie voor ouderen en kwetsbare groepen.",
    ],
    acquiredSkills: [],
  },
];
