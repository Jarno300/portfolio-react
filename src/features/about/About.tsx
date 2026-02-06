import { useState } from "react";
import { workExperience } from "../../data/work-experience";
import { volunteering } from "../../data/volunteering";
import { education } from "../../data/education";
import AboutNav from "./AboutNav";
import { AboutItem } from "./AboutItem";
import styles from "./About.module.css";

export default function About() {
  const [activeSection, setActiveSection] = useState("education");

  return (
    <div className={styles.aboutContainer}>
      <AboutNav
        activeSection={activeSection}
        onNavigate={(href) => {
          setActiveSection(href);
        }}
      />

      {activeSection === "education" && (
        <section id="education" className={styles.aboutSection}>
          {education.map((item, index) => (
            <AboutItem
              key={index}
              title={item.degree}
              subtitle={item.institution}
              period={item.period}
              details={item.details}
              list={item.internships}
              skills={item.acquiredSkills}
            />
          ))}
        </section>
      )}

      {activeSection === "volunteering" && (
        <section id="volunteering" className={styles.aboutSection}>
          {volunteering.map((item, index) => (
            <AboutItem
              key={index}
              title={item.role}
              subtitle={`${item.organization}${item.location ? ` - ${item.location}` : ""}`}
              period={item.period}
              list={item.responsibilities}
              skills={item.acquiredSkills}
            />
          ))}
        </section>
      )}

      {activeSection === "work-experience" && (
        <section id="work-experience" className={styles.aboutSection}>
          {workExperience.map((item, index) => (
            <AboutItem
              key={index}
              title={item.role}
              subtitle={`${item.company}${item.location ? ` - ${item.location}` : ""}`}
              period={item.period}
              list={item.responsibilities}
              skills={item.acquiredSkills}
            />
          ))}
        </section>
      )}
    </div>
  );
}
