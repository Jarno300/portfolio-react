import { projects, type Project } from "./projects";

export type SubSection = Project;

export interface SectionData {
  id: string;
  title: string;
  description: string;
  subSections?: SubSection[];
  backgroundColor?: string;
  textColor?: string;
}

export const sections: SectionData[] = [
  {
    id: "About",
    title: "me",
    description: "Learn more about my background, skills, and experience.",
    backgroundColor: "white",
  },
  {
    id: "Projects",
    title: "Explore my projects",
    description: "Check out some of the projects I've worked on.",
    backgroundColor: "white",
    textColor: "black",
    subSections: projects,
  },
  {
    id: "Contact",
    title: "Get In Touch",
    description: "Feel free to reach out for collaborations or opportunities.",
    backgroundColor: "white",
    textColor: "black",
  },
];
