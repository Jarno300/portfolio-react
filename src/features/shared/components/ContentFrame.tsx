import { Suspense, lazy } from "react";
import Projects from "../../projects/Projects.tsx";
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
        minHeight: "40vh",
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
  if (!activeSection) return null;

  return (
    <div className={contentStyles.contentFrameSection}>
      <div style={{ display: activeSection === "cv" ? "flex" : "none" }}>
        <Suspense fallback={<CvFallback />}>
          <Cv />
        </Suspense>
      </div>

      <div
        className={carouselStyles.carouselFrame}
        style={{ display: activeSection === "projects" ? "flex" : "none" }}
      >
        <Projects />
      </div>
    </div>
  );
}
