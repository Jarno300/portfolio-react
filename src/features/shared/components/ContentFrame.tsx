import Projects from "../../projects/Projects.tsx";
import Contact from "../../contact/Contact.tsx";
import contentStyles from "./ContentFrame.module.css";
import carouselStyles from "./CarouselFrame.module.css";
import Cv from "../../cv/Cv.tsx";

interface ContentFrameProps {
  activeSection: string | null;
}

export default function ContentFrame({ activeSection }: ContentFrameProps) {
  const renderSection = () => {
    switch (activeSection) {
      case "cv":
        return <Cv />;
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
