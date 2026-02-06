import { contactInfo } from "../../data/contact";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <div className={styles.contactContainer}>
      <h1>Get in Touch</h1>

      <div className={styles.contactGrid}>
        <div className={styles.contactItem}>
          <span className={styles.contactLabel}>Email</span>
          <a
            href={`mailto:${contactInfo.email}`}
            className={`${styles.contactValue} ${styles.contactLink}`}
          >
            {contactInfo.email}
          </a>
        </div>

        <div className={styles.contactItem}>
          <span className={styles.contactLabel}>Phone</span>
          <a
            href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
            className={`${styles.contactValue} ${styles.contactLink}`}
          >
            {contactInfo.phone}
          </a>
        </div>

        <div className={styles.contactItem}>
          <span className={styles.contactLabel}>LinkedIn</span>
          <a
            href={contactInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.contactValue} ${styles.contactLink}`}
          >
            View Profile →
          </a>
        </div>

        <div className={styles.contactItem}>
          <span className={styles.contactLabel}>GitHub</span>
          <a
            href={`https://${contactInfo.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.contactValue} ${styles.contactLink}`}
          >
            {contactInfo.github}
          </a>
        </div>
      </div>
    </div>
  );
}
