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
import brainstorm from "../assets/images/brainstorm.png";
import postgresql from "../assets/icons/PostgreSQL.png";
import redis from "../assets/icons/Redis.png";
import fastapi from "../assets/icons/FastAPI.png";
import airflow from "../assets/icons/Airflow.png";

export interface TechIcon {
  src: string;
  name: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  githubUrl?: string;
  icons?: TechIcon[];
}

export const projects: Project[] = [
  {
    id: 0,
    title: "Brainstorm: AI knowledge mapping tool",
    description: "A tool that uses AI to map and visualize knowledge, helping users to brainstorm and organize ideas effectively, by visualizing connected topics and exploring relationships between concepts.",
    image: brainstorm,
    githubUrl: "https://github.com/Jarno300/brainstorm",
    icons: [
      { src: react, name: "React" },
      { src: postgresql, name: "PostgreSQL" },
      { src: redis, name: "Redis" },
      { src: fastapi, name: "FastAPI" },
    ],
  },
  {
    id: 1,
    title: "Flock: Belgian Bird Data Pipeline",
    description: "A data pipeline for collecting and analyzing bird observation data in Belgium.",
    image: testImage,
    githubUrl: "https://github.com/Jarno300/flock",
    icons: [{ src: airflow, name: "Airflow" }],
  },
  {
    id: 2,
    title: "Investment Tracker",
    description:
      "Track investments and portfolio performance across different asset classes and markets. Work in progress.",
    image: project2,
    githubUrl: "https://github.com/Jarno300/investment-tracker",
    icons: [
      { src: vue, name: "Vue" },
      { src: typeScript, name: "TypeScript" },
      { src: javaSpringboot, name: "Spring Boot" },
      { src: java, name: "Java" },
    ],
  },
  {
    id: 3,
    title: "Portfolio website",
    description:
      "This is my personal portfolio website showcasing my projects and skills.",
    image: project1,
    githubUrl: "https://github.com/Jarno300/portfolio-react",
    icons: [
      { src: react, name: "React" },
      { src: typeScript, name: "TypeScript" },
      { src: css3, name: "CSS3" },
      { src: html5, name: "HTML5" },
    ],
  },
];
