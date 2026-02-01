import Header from "../features/shared/components/Sidebar";
import Section from "../features/shared/components/Section";
import ProjectCard from "../features/projects/ProjectCard";
import { sections } from "../data/section-data";
import type { SubSection } from "../data/section-data";
import styles from "./App.module.css";

function App() {
  const renderSubSection = (subSection: SubSection) => {
    switch (subSection.type) {
      case "project":
        return <ProjectCard project={subSection} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        {sections.map((section) => (
          <Section
            key={section.id}
            data={section}
            renderSubSection={renderSubSection}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
