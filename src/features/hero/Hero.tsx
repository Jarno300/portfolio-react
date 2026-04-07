import styles from "./Hero.module.css";
import profilePicture from "../../assets/images/me-blur.jpg";
import ProfileImage from "./ProfileImage";
import HeroNavigation from "./HeroNavigation.tsx";

interface NavItem {
  href: string;
  label: string;
}

interface HeroProps {
  isCollapsed: boolean;
  navItems: NavItem[];
  onNavigate: (href: string) => void;
  onProfileClick: () => void;
}

export default function Hero({
  isCollapsed,
  navItems,
  onNavigate,
  onProfileClick,
}: HeroProps) {
  return (
    <div
      className={`${styles.heroContainer} ${isCollapsed ? styles.collapsed : ""}`}
    >
      <ProfileImage
        src={profilePicture}
        alt="Profile"
        onClick={onProfileClick}
      />

      <div className={styles.textContainer}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>
            Jarno <span className={styles.titleHighlight}>Mommens</span>
          </h1>

          <p className={styles.subtitle}>DATA & CLOUD ENGINEER</p>
        </div>

        <HeroNavigation items={navItems} onNavigate={onNavigate} />
      </div>
    </div>
  );
}
