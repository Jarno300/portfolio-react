import project1 from "../assets/images/project1.jpg";
import project2 from "../assets/images/project2.jpg";
import project3 from "../assets/images/project3.jpg";
import css3 from "../assets/icons/CSS3.png";
import react from "../assets/icons/React.png";
import typeScript from "../assets/icons/TypeScript.png";
import html5 from "../assets/icons/HTML5.png";

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  githubUrl?: string;
  icons?: string[];
}

export const projects: Project[] = [
  {
    id: 0,
    title: "Portfolio website",
    description:
      "This is my personal portfolio website showcasing my projects and skills. Built with React, TypeScript and CSS.",
    image: project1,
    githubUrl: "https://github.com/Jarno300/portfolio-react",
    icons: [react, typeScript, css3, html5],
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
