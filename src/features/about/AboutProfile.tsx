import { about } from "../../data/about";
import { aboutProfile } from "../../data/about-profile";
import styles from "./AboutProfile.module.css";

export default function AboutProfile() {
  return (
    <section className={styles.profile}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>About</span>
        <h2 className={styles.name}>{about.name}</h2>
        <p className={styles.title}>{about.title}</p>
        <p className={styles.intro}>{aboutProfile.intro}</p>
      </header>

      <div className={styles.grid}>
        <article className={styles.card}>
          <h3 className={styles.cardTitle}>Languages</h3>
          <ul className={styles.languageList}>
            {aboutProfile.languages.map((language) => (
              <li key={language.name} className={styles.languageItem}>
                <span>{language.name}</span>
                <span className={styles.languageLevel}>{language.level}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className={styles.card}>
          <h3 className={styles.cardTitle}>Technical Skills</h3>
          <div className={styles.pillGroup}>
            {aboutProfile.technicalSkills.map((skill) => (
              <span key={skill} className={styles.pill}>
                {skill}
              </span>
            ))}
          </div>
        </article>

        <article className={styles.card}>
          <h3 className={styles.cardTitle}>Soft Skills</h3>
          <div className={styles.pillGroup}>
            {aboutProfile.softSkills.map((skill) => (
              <span key={skill} className={styles.pill}>
                {skill}
              </span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
