import styles from "./Hero.module.css";

interface ProfileImageProps {
  src: string;
  alt: string;
  onClick?: () => void;
}

export default function ProfileImage({ src, alt, onClick }: ProfileImageProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === " ") && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={styles.pictureWrapper}
      role="button"
      tabIndex={0}
      aria-label="Return to hero"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      style={{ cursor: "pointer" }}
    >
      <div className={styles.profileFrame}>
        <img src={src} className={styles.profilePicture} alt={alt} loading="lazy" />
      </div>
    </div>
  );
}
