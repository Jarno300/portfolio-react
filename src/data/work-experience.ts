export interface WorkExperience {
  company: string;
  location?: string;
  role: string;
  period: string;
  responsibilities: string[];
  acquiredSkills?: string[];
  technologies?: string[];
}

export const workExperience = [
  {
    company: "Marsh",
    location: "Brussel",
    role: "Client Executive",
    period: "2021 - 2024",
    responsibilities: [
      "Onderhoud B2B relaties met het netwerk van Renault en Nissan garages in Vlaanderen",
      "Onderhandelen met klanten en verzekeringsmaatschappijen over voorwaarden, prijzen en strategieën",
      "Samenwerken met interne teams om klanttevredenheid te waarborgen en problemen op te lossen",
    ],
    acquiredSkills: [
      "Professionele communicatie",
      "Onderhandelingsvaardigheden",
      "Analytisch denken",
    ],
  },
  {
    company: "Marsh",
    location: "Brussel",
    role: "Productiebeheerder",
    period: "2019 - 2021",
    responsibilities: [
      "Productie van verzekeringspolissen in verschillende takken",
      "Klanten ondersteunen via digitale kanalen en fysiek op kantoor",
    ],
    acquiredSkills: [
      "Klantgerichtheid",
      "Stressbestendigheid",
      "Probleemoplossend denken",
    ],
  },
  {
    company: "BioPlanet",
    location: "Nossegem",
    role: "Bediende-verkoper",
    period: "2016 - 2018",
    responsibilities: [
      "Polyvalent werk in alle dagelijkse activiteiten van een biologische supermarkt",
    ],
    acquiredSkills: ["Verantwoordelijkheid", "Teamwork", "Flexibiliteit"],
  },
];
