import styles from "./Hero.module.css";

interface NavItem {
  href: string;
  label: string;
}

interface HeroNavigationProps {
  items: NavItem[];
  onNavigate: (href: string) => void;
}

export default function HeroNavigation({
  items,
  onNavigate,
}: HeroNavigationProps) {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    onNavigate(href);
  };

  return (
    <nav>
      {items.map((item) => (
        <a
          key={item.href}
          href={`#${item.href}`}
          className={styles.navLink}
          onClick={(e) => handleClick(e, item.href)}
        >
          <span className={styles.navLinkText}>
            {item.label.split("").map((letter, index) => (
              <span
                key={index}
                className={styles.navLetter}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {letter}
              </span>
            ))}
          </span>
        </a>
      ))}
    </nav>
  );
}
