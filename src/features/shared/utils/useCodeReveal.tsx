import { useEffect, useRef, useState } from "react";

interface UseCodeRevealProps {
  sourceCode: string;
  autoReveal?: boolean;
  autoRevealDuration?: number;
  typingAnimationDuration?: number;
}

export function useCodeReveal({
  sourceCode,
  autoReveal = false,
  autoRevealDuration = 4000,
}: UseCodeRevealProps) {
  const [showCode, setShowCode] = useState(false);
  const [displayedChars, setDisplayedChars] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Disable page scrolling when code is shown
  useEffect(() => {
    if (showCode) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showCode]);

  // Auto-reveal code for specified duration on mount
  useEffect(() => {
    if (autoReveal) {
      setShowCode(true);
      const timer = setTimeout(() => {
        setShowCode(false);
      }, autoRevealDuration);

      return () => clearTimeout(timer);
    }
  }, [autoReveal, autoRevealDuration]);

  // Typing animation effect
  useEffect(() => {
    if (showCode) {
      setDisplayedChars(0);
      const totalChars = sourceCode.length;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / autoRevealDuration, 1);
        const charsToShow = Math.floor(progress * totalChars);

        setDisplayedChars(charsToShow);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      const animationFrame = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animationFrame);
    } else {
      setDisplayedChars(0);
    }
  }, [showCode, sourceCode, autoRevealDuration]);

  // Auto-scroll to bottom as text appears
  useEffect(() => {
    if (containerRef.current && displayedChars > 0) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedChars]);

  const CodeView = () => (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width: "15rem",
        margin: "1rem",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#2a2620",
        border: "4px solid #8b8378",
        boxShadow:
          "0 4px 12px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(139, 131, 120, 0.15)",
        borderRadius: "2px",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          background: "linear-gradient(180deg, #c9bc9f 0%, #a89968 100%)",
          color: "#3d3426",
          padding: "6px 10px",
          fontFamily: '"Courier New", monospace',
          fontSize: "0.7rem",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          minHeight: "22px",
          borderBottom: "2px solid #8b8378",
          textShadow: "1px 1px 0 rgba(255, 255, 255, 0.3)",
        }}
      >
        ▶ Loading...
      </div>

      {/* Content area with vintage CRT effect */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          backgroundColor: "#2a2620",
          overflow: "hidden",
          padding: "12px",
          position: "relative",
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(201, 188, 159, 0.02) 2px, rgba(201, 188, 159, 0.02) 4px)",
        }}
      >
        <pre
          style={{
            color: "#d4c5a0",
            fontFamily: 'monospace, "Courier New", "Consolas", "Monaco"',
            fontSize: "0.7rem",
            lineHeight: "1.4",
            margin: 0,
            padding: 0,
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            textShadow: "0 0 3px rgba(212, 197, 160, 0.4)",
          }}
        >
          <code>{sourceCode.slice(0, displayedChars)}</code>
        </pre>
      </div>
    </div>
  );

  return { showCode, CodeView, setShowCode };
}
