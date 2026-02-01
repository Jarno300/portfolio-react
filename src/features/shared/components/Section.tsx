import { useState } from "react";
import type { SectionData, SubSection } from "../../../data/section-data";
import styles from "./Section.module.css";

interface SectionProps {
  data: SectionData;
  renderSubSection?: (subSection: SubSection) => React.ReactNode;
}

export default function Section({ data, renderSubSection }: SectionProps) {
  // -1 = main section, 0+ = subsection index
  const [currentIndex, setCurrentIndex] = useState(-1);

  const hasSubSections = data.subSections && data.subSections.length > 0;
  const isMainSection = currentIndex === -1;
  const currentSubSection = !isMainSection && data.subSections?.[currentIndex];

  const showLeftArrow = currentIndex >= 0;
  const showRightArrow = isMainSection
    ? hasSubSections
    : currentIndex < (data.subSections?.length ?? 0) - 1;

  const handleNext = () => {
    if (isMainSection) {
      setCurrentIndex(0);
    } else if (data.subSections && currentIndex < data.subSections.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(-1);
    }
  };

  return (
    <section
      id={data.id}
      className={styles.section}
      style={{
        backgroundColor: data.backgroundColor || "white",
        color: data.textColor || "#333",
      }}
    >
      {isMainSection ? (
        <div className={styles.container}>
          <h2>{data.title}</h2>
          <p>{data.description}</p>
        </div>
      ) : (
        currentSubSection && (
          <div className={styles.subSectionView}>
            {renderSubSection?.(currentSubSection) || (
              <div className={styles.container}>
                <h2>{currentSubSection.title}</h2>
                <p>{currentSubSection.description}</p>
              </div>
            )}
          </div>
        )
      )}

      {showLeftArrow && (
        <button
          className={`${styles.navButton} ${styles.left}`}
          onClick={handlePrevious}
          aria-label="Previous"
        >
          ‹
        </button>
      )}

      {showRightArrow && (
        <button
          className={`${styles.navButton} ${styles.right}`}
          onClick={handleNext}
          aria-label="Next"
        >
          ›
        </button>
      )}
    </section>
  );
}
