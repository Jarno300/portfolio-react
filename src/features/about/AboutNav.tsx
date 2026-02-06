import Styles from "./About.module.css";

interface AboutNavProps {
  onNavigate: (href: string) => void;
  activeSection: string;
  className?: string;
}

interface AboutNavItem {
  label: string;
  href: string;
}

export default function AboutNav({ onNavigate, activeSection }: AboutNavProps) {
  const navItems: AboutNavItem[] = [
    { label: "Education", href: "education" },
    { label: "Volunteering", href: "volunteering" },
    { label: "Work Experience", href: "work-experience" },
  ];
  return (
    <nav className={Styles.aboutNav}>
      {navItems.map((item) => (
        <a
          className={`${Styles.aboutNavLink} ${activeSection === item.href ? Styles.active : ""}`}
          key={item.href}
          href={`#${item.href}`}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(item.href);
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
