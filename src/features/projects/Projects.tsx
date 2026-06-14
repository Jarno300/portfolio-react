import { projects, type Project } from "../../data/projects";
import { useMemo, useState, useEffect } from "react";
import styles from "./Projects.module.css";
import githubIcon from "../../assets/icons/github.svg";

/* ------------------------------------------------------------------ */
/*  Shared card content — used by both carousel and feed layouts      */
/* ------------------------------------------------------------------ */

function ProjectContent({ project }: { project: Project }) {
  return (
    <>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <div className={styles.bottomRow}>
        <div className={styles.iconsRow}>
          {project.icons?.map((icon, idx) => (
            <img
              key={idx}
              src={icon}
              alt={`Technology ${idx + 1}`}
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
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Carousel layout (desktop)                                         */
/* ------------------------------------------------------------------ */

function CarouselView({ projects }: { projects: Project[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = projects.length;

  const goPrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  const goNext = () =>
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));

  const prevIndex = currentIndex === 0 ? total - 1 : currentIndex - 1;
  const nextIndex = currentIndex === total - 1 ? 0 : currentIndex + 1;

  const currentProject = projects[currentIndex];

  return (
    <div className={styles.projectContainer}>
      <div className={styles.carouselTrack} data-total={total}>
        {/* Previous card — hidden when only 1 project */}
        {total > 1 && (
          <div
            className={`${styles.projectCard} ${styles.prevCard}`}
            style={{ backgroundImage: `url(${projects[prevIndex].image})` }}
            role="button"
            tabIndex={0}
            aria-label={`Previous: ${projects[prevIndex].title}`}
            onClick={goPrev}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                goPrev();
              }
            }}
          />
        )}

        {/* Current card */}
        <div
          className={`${styles.projectCard} ${styles.currentCard}`}
          style={{ backgroundImage: `url(${currentProject.image})` }}
        >
          <div className={styles.projectContent}>
            <ProjectContent project={currentProject} />
          </div>
        </div>

        {/* Next card — hidden when only 1 project */}
        {total > 1 && (
          <div
            className={`${styles.projectCard} ${styles.nextCard}`}
            style={{ backgroundImage: `url(${projects[nextIndex].image})` }}
            role="button"
            tabIndex={0}
            aria-label={`Next: ${projects[nextIndex].title}`}
            onClick={goNext}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                goNext();
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Feed layout (mobile)                                              */
/* ------------------------------------------------------------------ */

function FeedView({ projects }: { projects: Project[] }) {
  return (
    <div className={styles.projectsFeed}>
      {projects.map((project) => (
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
              <ProjectContent project={project} />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Responsive hook                                                   */
/* ------------------------------------------------------------------ */

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

/* ------------------------------------------------------------------ */
/*  Projects (top-level)                                              */
/* ------------------------------------------------------------------ */

export default function Projects() {
  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => a.id - b.id),
    [],
  );
  const isMobile = useMediaQuery("(max-width: 900px)");

  return (
    <div className={styles.projectWrapper}>
      {isMobile ? (
        <FeedView projects={sortedProjects} />
      ) : (
        <CarouselView projects={sortedProjects} />
      )}
    </div>
  );
}
