import project1 from "../assets/images/project-portfolio.png";
import project2 from "../assets/images/project-investment.jpg";
import testImage from "../assets/images/test-image.png";
import css3 from "../assets/icons/CSS3.png";
import react from "../assets/icons/React.png";
import typeScript from "../assets/icons/TypeScript.png";
import html5 from "../assets/icons/HTML5.png";
import javaSpringboot from "../assets/icons/Java-Springboot.png";
import java from "../assets/icons/Java.png";
import vue from "../assets/icons/Vue.png";

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
    title: "Investment Tracker",
    description:
      "Track investments and portfolio performance across different asset classes and markets. Work in progress.",
    image: project2,
    githubUrl: "https://github.com/Jarno300/investment-tracker",
    icons: [vue, typeScript, javaSpringboot, java],
  },
  {
    id: 2,
    title: "Coming soon",
    description: "Coming soon",
    image: testImage,
    githubUrl: "https://github.com/Jarno300/portfolio-react",
    icons: [],
  },
];
