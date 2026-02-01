import { useEffect, useState } from "react";
import { sections } from "../../../data/section-data";
import styles from "./Sidebar.module.css";
import { useCodeReveal } from "../utils/useCodeReveal";
import sidebarSource from "./Sidebar.tsx?raw";

export default function Sidebar() {
  const { showCode, CodeView } = useCodeReveal({
    sourceCode: sidebarSource,
    autoReveal: true,
    autoRevealDuration: 4000,
  });
  const [sectionProximities, setSectionProximities] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    let timeoutId: number;

    const calculateProximities = () => {
      const viewportCenter = window.innerHeight / 2;
      const proximities: Record<string, number> = {};

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const sectionCenter = rect.top + rect.height / 2;
          const distance = Math.abs(viewportCenter - sectionCenter);

          const normalizedDistance = Math.min(distance / window.innerHeight, 1);

          const proximity = 1 - normalizedDistance;

          proximities[section.id] = Math.max(0, proximity);
        }
      });

      setSectionProximities(proximities);
    };

    const debouncedCalculate = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(calculateProximities, 0);
    };

    calculateProximities();
    window.addEventListener("scroll", debouncedCalculate);
    window.addEventListener("resize", debouncedCalculate);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", debouncedCalculate);
      window.removeEventListener("resize", debouncedCalculate);
    };
  }, []);

  const getFontSize = (sectionId: string) => {
    const proximity = sectionProximities[sectionId] || 0;
    const baseSize = 0.95;
    const maxSize = 1.9;
    const size = baseSize + proximity * (maxSize - baseSize);
    return `${size}rem`;
  };

  const getColor = (sectionId: string) => {
    const proximity = sectionProximities[sectionId] || 0;
    const lightGrey = 170;
    const black = 0;
    const rgb = Math.round(lightGrey - proximity * (lightGrey - black));
    return `rgb(${rgb}, ${rgb}, ${rgb})`;
  };

  if (showCode) {
    return <CodeView />;
  }

  return (
    <header className={styles.header}>
      <div className={styles.windowFrame}>
        {/* Title bar */}
        <div className={styles.titleBar}>Navigation</div>

        {/* Content area */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={styles.navLink}
                  style={{
                    fontSize: getFontSize(section.id),
                    color: getColor(section.id),
                    transition: "font-size 0.3s ease-out, color 0.3s ease-out",
                  }}
                >
                  {section.id}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
