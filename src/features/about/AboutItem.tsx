import styles from "./About.module.css";

interface AboutItemProps {
  title: string;
  subtitle: string;
  period: string;
  details?: string;
  list?: string[];
  skills?: string[];
  technologies?: string[];
}

export function AboutItem({
  title,
  subtitle,
  period,
  details,
  list,
  skills,
  technologies,
}: AboutItemProps) {
  return (
    <div className={styles.aboutItem}>
      <h3 className={styles.aboutItemTitle}>{title}</h3>
      <p className={styles.aboutItemSubtitle}>
        {subtitle} {period}
      </p>

      {details && <p className={styles.aboutItemDetails}>{details}</p>}

      {list && list.length > 0 && (
        <ul className={styles.aboutItemList}>
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}

      {skills && skills.length > 0 && (
        <div className={styles.aboutItemMeta}>
          <strong>Skills: </strong>
          <span>{skills.join(", ")}</span>
        </div>
      )}

      {technologies && technologies.length > 0 && (
        <div className={styles.aboutItemMetaLast}>
          <strong>Technologies: </strong>
          <span>{technologies.join(", ")}</span>
        </div>
      )}
    </div>
  );
}
