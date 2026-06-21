import { useState, useEffect } from "react";
import Hero from "../features/hero/Hero.tsx";
import ContentFrame from "../features/shared/components/ContentFrame.tsx";
import ErrorBoundary from "../features/shared/components/ErrorBoundary.tsx";
import styles from "./App.module.css";

const VALID_SECTIONS = ["cv", "projects"];

function hashToSection(hash: string): string | null {
  const slug = hash.replace(/^#/, "");
  return VALID_SECTIONS.includes(slug) ? slug : null;
}

const navItems = [
  { href: "cv", label: "CV" },
  { href: "projects", label: "Projects" },
];

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(() =>
    hashToSection(window.location.hash),
  );

  /* Keep state in sync with the URL hash */
  useEffect(() => {
    const onHashChange = () => setActiveSection(hashToSection(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleNavigation = (href: string) => {
    setIsCollapsed(true);
    window.location.hash = href;
  };

  const handleProfileClick = () => {
    setIsCollapsed(false);
    /* Clear the hash without adding a history entry */
    history.replaceState(null, "", window.location.pathname);
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
      <ErrorBoundary>
        <ContentFrame activeSection={activeSection} />
      </ErrorBoundary>
    </div>
  );
}

export default App;
