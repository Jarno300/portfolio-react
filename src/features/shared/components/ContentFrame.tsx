import { Suspense, lazy } from "react";
import Projects from "../../projects/Projects.tsx";
import Contact from "../../contact/Contact.tsx";
import contentStyles from "./ContentFrame.module.css";
import carouselStyles from "./CarouselFrame.module.css";

const Cv = lazy(() => import("../../cv/Cv.tsx"));

function CvFallback() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        color: "var(--color-text-muted)",
        fontFamily: "var(--font-primary)",
      }}
    >
      Loading CV preview…
    </div>
  );
}

interface ContentFrameProps {
  activeSection: string | null;
}

export default function ContentFrame({ activeSection }: ContentFrameProps) {
  const renderSection = () => {
    switch (activeSection) {
      case "cv":
        return (
          <Suspense fallback={<CvFallback />}>
            <Cv />
          </Suspense>
        );
      case "projects":
        return <Projects />;
      case "contact":
        return <Contact />;
      default:
        return null;
    }
  };

  if (!activeSection) return null;

  const isCarousel = activeSection === "projects";
  const isCv = activeSection === "cv";
  const frameClassName = isCarousel
    ? carouselStyles.carouselFrame
    : `${contentStyles.contentFrame} ${isCv ? contentStyles.cvFrame : ""}`;

  return (
    <div className={contentStyles.contentFrameSection}>
      <div key={activeSection} className={frameClassName}>
        {renderSection()}
      </div>
    </div>
  );
}
