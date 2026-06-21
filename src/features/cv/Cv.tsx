import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import cvFile from "../../assets/documents/CV-Jarno-Mommens-EN.pdf";
import styles from "./Cv.module.css";

/* Pinned to the installed version so the worker always matches the library. */
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://unpkg.com/pdfjs-dist@5.7.284/legacy/build/pdf.worker.min.mjs";

export default function Cv() {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const container = viewerRef.current;
    if (!container) return;

    const render = async () => {
      setIsLoading(true);
      setError(null);
      container.innerHTML = "";

      try {
        const res = await fetch(cvFile);
        if (!res.ok) throw new Error(`Failed to load PDF (${res.status})`);

        const buffer = await res.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(buffer) }).promise;

        for (let i = 1; i <= pdf.numPages; i++) {
          if (cancelled) break;

          const page = await pdf.getPage(i);
          const baseVp = page.getViewport({ scale: 1 });
          const availableWidth = Math.min(
            container.clientWidth || baseVp.width,
            1100,
          );
          const scale = availableWidth / baseVp.width;
          const viewport = page.getViewport({ scale });
          const dpr = window.devicePixelRatio || 1;

          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) continue;

          canvas.width = Math.floor(viewport.width * dpr);
          canvas.height = Math.floor(viewport.height * dpr);
          canvas.style.width = `${viewport.width}px`;
          canvas.style.height = `${viewport.height}px`;
          canvas.style.maxWidth = "100%";
          canvas.className = styles.cvCanvas;

          await page.render({
            canvasContext: ctx,
            viewport,
            canvas,
            transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : undefined,
          }).promise;

          const frame = document.createElement("div");
          frame.className = styles.cvCanvasFrame;
          frame.appendChild(canvas);
          container.appendChild(frame);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("CV render failed", err);
          setError(
            err instanceof Error
              ? err.message
              : "Could not render the CV preview.",
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void render();
    return () => { cancelled = true; };
  }, []);

  return (
    <section className={styles.cvContainer}>
      <header className={styles.cvHeader}>
        <a className={styles.cvDownload} href={cvFile} download>
          Download CV
        </a>
      </header>

      <div className={styles.cvViewer}>
        {isLoading && <div className={styles.cvStatus}>Loading preview…</div>}
        {error && <div className={styles.cvStatus}>{error}</div>}
        <div ref={viewerRef} className={styles.cvPages} />
      </div>
    </section>
  );
}
