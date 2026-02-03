import styles from "./Hero.module.css";

interface ProfileImageProps {
  src: string;
  alt: string;
}

export default function ProfileImage({ src, alt }: ProfileImageProps) {
  return (
    <div className={styles.pictureWrapper}>
      <div className={styles.profileFrame}>
        <img src={src} className={styles.profilePicture} alt={alt} />
      </div>
    </div>
  );
}
