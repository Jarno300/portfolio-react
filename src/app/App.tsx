import { useState } from "react";
import Hero from "../features/hero/Hero.tsx";
import ContentFrame from "../features/shared/components/ContentFrame.tsx";
import styles from "./App.module.css";

const navItems = [
  { href: "about", label: "About" },
  { href: "experience", label: "Experience" },
  { href: "projects", label: "Projects" },
  { href: "contact", label: "Contact" },
];

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleNavigation = (href: string) => {
    setIsCollapsed(true);
    setActiveSection(href);
  };

  const handleProfileClick = () => {
    setIsCollapsed(false);
    setActiveSection(null);
  };

  return (
    <div className={styles.app}>
      <Hero
        isCollapsed={isCollapsed}
        navItems={navItems}
        onNavigate={handleNavigation}
        onProfileClick={handleProfileClick}
      />
      <ContentFrame activeSection={activeSection} />
    </div>
  );
}

export default App;
