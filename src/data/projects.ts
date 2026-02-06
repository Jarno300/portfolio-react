import project1 from "../assets/images/project1.jpg";
import project2 from "../assets/images/project2.jpg";
import project3 from "../assets/images/project3.jpg";

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: 0,
    title: "Portfolio website",
    description:
      "This is my personal portfolio website showcasing my projects and skills. Built with React and TypeScript.",
    image: project1,
    githubUrl: "",
  },
  {
    id: 1,
    title: "project test2 title",
    description:
      "description of project test2. This is a longer description to test the layout and styling of the project item component.",
    image: project2,
  },
  {
    id: 2,
    title: "project test3 title",
    description:
      "description of project test3. This is a longer description to test the layout and styling of the project item component.",
    image: project3,
  },
];
