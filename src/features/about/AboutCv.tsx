import styles from "./About.module.css";
import type { Education } from "../../data/education";
import type { WorkExperience } from "../../data/work-experience";
import type { Volunteering } from "../../data/volunteering";
import type { ContactInfo } from "../../data/contact";
import profilePicture from "../../assets/images/me-blur.jpg";

type AboutData = {
  name: string;
  title: string;
  description: string;
};

interface AboutCvProps {
  about: AboutData;
  contactInfo: ContactInfo;
  education: Education[];
  workExperience: WorkExperience[];
  volunteering: Volunteering[];
}

export default function AboutCv({
  about,
  contactInfo,
  education,
  workExperience,
  volunteering,
}: AboutCvProps) {
  return (
    <div className={styles.cvContainer}>
      <div className={styles.cvLayout}>
        <aside className={styles.cvSidebar}>
          <div className={styles.cvSidebarContent}>
            <div className={styles.cvPhotoWrap}>
              <img
                className={styles.cvPhoto}
                src={profilePicture}
                alt={about.name}
              />
            </div>

            <div className={styles.cvSidebarBlock}>
              <h2 className={styles.cvSidebarTitle}>Contact</h2>
              <div className={styles.cvContact}>
                <span>{contactInfo.email}</span>
                <span>{contactInfo.phone}</span>
                <span>{contactInfo.linkedin}</span>
                <span>{contactInfo.github}</span>
              </div>
            </div>

            <div className={styles.cvSidebarBlock}>
              <h2 className={styles.cvSidebarTitle}>Profile</h2>
              <p className={styles.cvSummary}>{about.description}</p>
            </div>
          </div>
        </aside>

        <div className={styles.cvMain}>
          <header className={styles.cvHeader}>
            <div>
              <h1 className={styles.cvName}>{about.name}</h1>
              <p className={styles.cvTitle}>{about.title}</p>
            </div>
          </header>

          <section className={styles.cvSection}>
            <h2 className={styles.cvSectionTitle}>Education</h2>
            {education.map((item) => (
              <div
                className={styles.cvItem}
                key={`${item.institution}-${item.degree}-${item.period}`}
              >
                <div className={styles.cvItemHeader}>
                  <span className={styles.cvItemTitle}>{item.degree}</span>
                  <span className={styles.cvItemPeriod}>{item.period}</span>
                </div>
                <div className={styles.cvItemSubtitle}>{item.institution}</div>
                {item.details && (
                  <p className={styles.cvItemDetails}>{item.details}</p>
                )}
                {item.internships && item.internships.length > 0 && (
                  <div className={styles.cvMeta}>
                    <strong>Internships:</strong> {item.internships.join(", ")}
                  </div>
                )}
              </div>
            ))}
          </section>

          <section className={styles.cvSection}>
            <h2 className={styles.cvSectionTitle}>Volunteering</h2>
            {volunteering.map((item) => (
              <div
                className={styles.cvItem}
                key={`${item.organization}-${item.role}-${item.period}`}
              >
                <div className={styles.cvItemHeader}>
                  <span className={styles.cvItemTitle}>{item.role}</span>
                  <span className={styles.cvItemPeriod}>{item.period}</span>
                </div>
                <div className={styles.cvItemSubtitle}>
                  {item.organization}
                  {item.location ? ` · ${item.location}` : ""}
                </div>
                <ul className={styles.cvList}>
                  {item.responsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className={styles.cvSection}>
            <h2 className={styles.cvSectionTitle}>Work Experience</h2>
            {workExperience.map((item) => (
              <div
                className={styles.cvItem}
                key={`${item.company}-${item.role}-${item.period}`}
              >
                <div className={styles.cvItemHeader}>
                  <span className={styles.cvItemTitle}>{item.role}</span>
                  <span className={styles.cvItemPeriod}>{item.period}</span>
                </div>
                <div className={styles.cvItemSubtitle}>
                  {item.company}
                  {item.location ? ` · ${item.location}` : ""}
                </div>
                <ul className={styles.cvList}>
                  {item.responsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
