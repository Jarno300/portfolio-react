import { projects } from "../../data/projects";
import { useState } from "react";
import styles from "./Projects.module.css";

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;

  const prevProject = projects[prevIndex];
  const currentProject = projects[currentIndex];
  const nextProject = projects[nextIndex];

  return (
    <div className={styles.projectWrapper}>
      <div className={styles.projectContainer}>
        <button className={styles.navButton} onClick={goPrev}>
          {"<"}
        </button>

        <div className={styles.carouselTrack}>
          <div
            className={`${styles.projectCard} ${styles.prevCard}`}
            style={{ backgroundImage: `url(${prevProject.image})` }}
            onClick={goPrev}
          ></div>

          <div
            className={`${styles.projectCard} ${styles.currentCard}`}
            style={{ backgroundImage: `url(${currentProject.image})` }}
          >
            <div className={styles.projectContent}>
              <h2>{currentProject.title}</h2>
              <p>{currentProject.description}</p>
              {currentProject.githubUrl && (
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.githubLink}
                >
                  View on GitHub →
                </a>
              )}
            </div>
          </div>

          <div
            className={`${styles.projectCard} ${styles.nextCard}`}
            style={{ backgroundImage: `url(${nextProject.image})` }}
            onClick={goNext}
          ></div>
        </div>

        <button className={styles.navButton} onClick={goNext}>
          {">"}
        </button>
      </div>

      <div className={styles.iconsRow}>
        {currentProject.icons && currentProject.icons.length > 0 && (
          <>
            {currentProject.icons.map((icon, index) => (
              <img
                key={index}
                src={icon}
                alt={`Technology ${index + 1}`}
                className={styles.icon}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
