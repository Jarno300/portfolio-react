export interface ProjectSubsections {
  type: "project";
  id: string;
  title: string;
  description: string;
  images: string[];
  backgroundColor?: string;
  textColor?: string;
}

export const projects: ProjectSubsections[] = [
  {
    type: "project",
    id: "test1",
    title: "project test1 title",
    description:
      "I'm a developer passionate about building amazing web experiences.",
    images: [],
  },
  {
    type: "project",
    id: "test2",
    title: "project test2 title",
    description: "Learn more about my background, skills, and experience.",
    images: [],
  },
  {
    type: "project",
    id: "test3",
    title: "project test3 title",
    description: "Check out some of the projects I've worked on.",
    images: [],
  },
];
