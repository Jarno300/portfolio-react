import type { ProjectSubsections } from "../../data/project-subsections";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: ProjectSubsections;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div
      className={styles.card}
      style={{
        backgroundColor: project.backgroundColor || "#f5f5f5",
        color: project.textColor || "#333",
      }}
    >
      {project.images.length > 0 && (
        <div className={styles.imageContainer}>
          <img src={project.images[0]} alt={project.title} />
        </div>
      )}
      <div className={styles.content}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
      </div>
    </div>
  );
}
