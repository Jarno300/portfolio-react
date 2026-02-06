import About from "../../about/About.tsx";
import Projects from "../../projects/Projects.tsx";
import Contact from "../../contact/Contact.tsx";
import heroStyles from "../../hero/Hero.module.css";
import carouselStyles from "./CarouselFrame.module.css";

interface ContentFrameProps {
  activeSection: string | null;
}

export default function ContentFrame({ activeSection }: ContentFrameProps) {
  const renderSection = () => {
    switch (activeSection) {
      case "about":
        return <About />;
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
  const frameClassName = isCarousel
    ? carouselStyles.carouselFrame
    : heroStyles.contentFrame;

  return (
    <div key={activeSection} className={frameClassName}>
      {renderSection()}
    </div>
  );
}
