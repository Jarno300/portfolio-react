import { projects } from "../../data/projects";
import { useState } from "react";
import styles from "./Projects.module.css";
import githubIcon from "../../assets/icons/github.svg";

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sortedProjects = [...projects].sort((a, b) => a.id - b.id);

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? sortedProjects.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev === sortedProjects.length - 1 ? 0 : prev + 1));
  };

  const prevIndex = currentIndex === 0 ? sortedProjects.length - 1 : currentIndex - 1;
  const nextIndex =
    currentIndex === sortedProjects.length - 1 ? 0 : currentIndex + 1;

  const prevProject = sortedProjects[prevIndex];
  const currentProject = sortedProjects[currentIndex];
  const nextProject = sortedProjects[nextIndex];

  return (
    <div className={styles.projectWrapper}>
      <div className={styles.carouselOnly}>
        <div className={styles.projectContainer}>
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
                <div className={styles.bottomRow}>
                  <div className={styles.iconsRow}>
                    {currentProject.icons &&
                      currentProject.icons.length > 0 && (
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
                  {currentProject.githubUrl && (
                    <a
                      href={currentProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.githubLink}
                    >
                      <img src={githubIcon} alt="GitHub" />
                      <span>View code</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div
              className={`${styles.projectCard} ${styles.nextCard}`}
              style={{ backgroundImage: `url(${nextProject.image})` }}
              onClick={goNext}
            ></div>
          </div>
        </div>
      </div>

      <div className={styles.feedOnly}>
        <div className={styles.projectsFeed}>
          {sortedProjects.map((project) => (
            <article className={styles.feedCard} key={project.id}>
              <img
                className={styles.feedImage}
                src={project.image}
                alt={project.title}
                loading="lazy"
              />
              <div className={styles.feedBody}>
                <header className={styles.feedHeader}>
                  <h2 className={styles.feedTitle}>{project.title}</h2>
                </header>
                <p className={styles.feedDescription}>{project.description}</p>
                <div className={styles.feedFooter}>
                  <div className={styles.iconsRow}>
                    {project.icons?.map((icon, iconIndex) => (
                      <img
                        key={iconIndex}
                        src={icon}
                        alt={`Technology ${iconIndex + 1}`}
                        className={styles.icon}
                        loading="lazy"
                      />
                    ))}
                  </div>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.githubLink}
                    >
                      <img src={githubIcon} alt="GitHub" />
                      <span>View code</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
