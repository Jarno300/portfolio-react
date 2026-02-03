import styles from "./Hero.module.css";
import profilePicture from "../../assets/images/me-blur.jpg";
import ProfileImage from "./ProfileImage";
import HeroNavigation from "./HeroNavigation.tsx";
import { useState, useEffect } from "react";

const navItems = [
  { href: "about", label: "About" },
  { href: "projects", label: "Projects" },
  { href: "contact", label: "Contact" },
];

export default function Hero() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [delayedActiveSection, setDelayedActiveSection] = useState<
    string | null
  >(null);

  const handleNavigation = (href: string) => {
    setIsCollapsed(true);
    setActiveSection(href);
  };

  useEffect(() => {
    if (activeSection) {
      const timer = setTimeout(() => {
        setDelayedActiveSection(activeSection);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [activeSection]);

  return (
    <>
      <div
        className={`${styles.mainContainer} ${isCollapsed ? styles.collapsed : ""}`}
      >
        <ProfileImage src={profilePicture} alt="Profile" />

        <div className={styles.textContainer}>
          <h1 className={styles.title}>
            Jarno <span className={styles.titleHighlight}>Mommens</span>
          </h1>

          <p className={styles.subtitle}>SOFTWARE DEVELOPER</p>

          <HeroNavigation items={navItems} onNavigate={handleNavigation} />
        </div>
      </div>

      {delayedActiveSection && (
        <div className={styles.contentContainer}>
          <h2>Content for {delayedActiveSection}</h2>
        </div>
      )}
    </>
  );
}
