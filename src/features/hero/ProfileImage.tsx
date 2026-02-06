import styles from "./Hero.module.css";

interface ProfileImageProps {
  src: string;
  alt: string;
  onClick?: () => void;
}

export default function ProfileImage({ src, alt, onClick }: ProfileImageProps) {
  return (
    <div
      className={styles.pictureWrapper}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className={styles.profileFrame}>
        <img src={src} className={styles.profilePicture} alt={alt} />
      </div>
    </div>
  );
}
