import { useRef, useState } from "react";
import { workExperience } from "../../data/work-experience";
import { volunteering } from "../../data/volunteering";
import { education } from "../../data/education";
import { about } from "../../data/about";
import { contactInfo } from "../../data/contact";
import AboutNav from "./AboutNav";
import { AboutItem } from "./AboutItem";
import AboutCv from "./AboutCv";
import styles from "./About.module.css";
import { exportCvToWord } from "./cvExport";

export default function Experience() {
  const [activeSection, setActiveSection] = useState("education");
  const [isExporting, setIsExporting] = useState(false);
  const cvRef = useRef<HTMLDivElement>(null);
  const displayDocExport = false;

  const handlePdfExport = async () => {
    if (!cvRef.current || isExporting) {
      return;
    }

    setIsExporting(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      await html2pdf()
        .from(cvRef.current)
        .set({
          margin: [0.4, 0.4, 0.5, 0.4],
          filename: `${about.name.replace(/\s+/g, "_")}_CV.pdf`,
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        })
        .save();
    } finally {
      setIsExporting(false);
    }
  };

  const handleWordExport = async () => {
    if (isExporting) {
      return;
    }

    setIsExporting(true);
    try {
      await exportCvToWord({
        about,
        contactInfo,
        education,
        workExperience,
        volunteering,
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className={styles.aboutContainer}>
      <div className={styles.aboutHeader}>
        <AboutNav
          activeSection={activeSection}
          onNavigate={(href) => {
            setActiveSection(href);
          }}
        />
        <div className={styles.cvActions}>
          <div className={styles.cvDropdown}>
            <button
              className={styles.cvButton}
              type="button"
              disabled={isExporting}
              aria-haspopup="menu"
            >
              {isExporting ? "Preparing CV..." : "Download CV"}
              <span className={styles.cvChevron} aria-hidden="true">
                ▼
              </span>
            </button>
            <div className={styles.cvMenu} role="menu">
              {displayDocExport && (
                <button
                  className={styles.cvMenuItem}
                  type="button"
                  onClick={handleWordExport}
                  disabled={isExporting}
                >
                  .docx
                </button>
              )}
              <button
                className={styles.cvMenuItem}
                type="button"
                onClick={handlePdfExport}
                disabled={isExporting}
              >
                .pdf
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.cvHidden} aria-hidden="true">
        <div ref={cvRef}>
          <AboutCv
            about={about}
            contactInfo={contactInfo}
            education={education}
            workExperience={workExperience}
            volunteering={volunteering}
          />
        </div>
      </div>

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
