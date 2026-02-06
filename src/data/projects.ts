import project1 from "../assets/images/project-portfolio.png";
import testImage from "../assets/images/test-image.png";
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
      "This is my personal portfolio website showcasing my projects and skills.",
    image: project1,
    githubUrl: "https://github.com/Jarno300/portfolio-react",
    icons: [react, typeScript, css3, html5],
  },
  {
    id: 1,
    title: "Coming soon",
    description: "Coming soon",
    image: testImage,
    githubUrl: "https://github.com/Jarno300/portfolio-react",
    icons: [react, typeScript, css3],
  },
  {
    id: 2,
    title: "Coming soon",
    description: "Coming soon",
    image: testImage,
    githubUrl: "https://github.com/Jarno300/portfolio-react",
    icons: [react, css3, html5],
  },
];
