import { projects, type ProjectSubsections } from "./project-subsections";

// Base interface for all subsection types
export interface BaseSubSection {
  id: string;
  type: string;
}

// Union type for all possible subsection types
export type SubSection = ProjectSubsections; // Add more types like: ProjectSubsections | AboutData | etc.

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
    id: "Welcome",
    title: "Welcome to My Portfolio",
    description:
      "I'm a developer passionate about building amazing web experiences.",
    backgroundColor: "white",
  },
  {
    id: "About",
    title: "About Me",
    description: "Learn more about my background, skills, and experience.",
    backgroundColor: "black",
    textColor: "white",
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
