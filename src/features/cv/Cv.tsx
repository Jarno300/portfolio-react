import { useEffect, useRef, useState } from "react";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import workerSrc from "pdfjs-dist/legacy/build/pdf.worker.min.mjs?url";
import cvFile from "../../assets/documents/CV-Jarno-Mommens-EN.pdf";
import styles from "./Cv.module.css";

GlobalWorkerOptions.workerSrc = workerSrc;

export default function Cv() {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useEmbeddedFallback, setUseEmbeddedFallback] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    const container = viewerRef.current;

    const renderPdf = async () => {
      if (!container) {
        return;
      }

      setIsLoading(true);
      setError(null);
      setUseEmbeddedFallback(false);
      container.innerHTML = "";

      try {
        const pdfResponse = await fetch(cvFile);
        if (!pdfResponse.ok) {
          throw new Error(`Failed to fetch PDF (${pdfResponse.status})`);
        }

        const pdfData = await pdfResponse.arrayBuffer();
        const loadingTask = getDocument({ data: new Uint8Array(pdfData) });
        const pdf = await loadingTask.promise;

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          if (isCancelled) {
            break;
          }

          const page = await pdf.getPage(pageNumber);
          const baseViewport = page.getViewport({ scale: 1 });
          const availableWidth = Math.min(
            container.clientWidth || baseViewport.width,
            900,
          );
          const scale = availableWidth / baseViewport.width;
          const viewport = page.getViewport({ scale });
          const outputScale = window.devicePixelRatio || 1;

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          if (!context) {
            continue;
          }

          canvas.width = Math.floor(viewport.width * outputScale);
          canvas.height = Math.floor(viewport.height * outputScale);
          canvas.style.width = `${viewport.width}px`;
          canvas.style.height = `${viewport.height}px`;
          canvas.style.maxWidth = "100%";
          canvas.className = styles.cvCanvas;

          const renderContext = {
            canvasContext: context,
            viewport,
            canvas,
            transform:
              outputScale !== 1
                ? [outputScale, 0, 0, outputScale, 0, 0]
                : undefined,
          };

          await page.render(renderContext).promise;
          const canvasFrame = document.createElement("div");
          canvasFrame.className = styles.cvCanvasFrame;
          canvasFrame.appendChild(canvas);
          container.appendChild(canvasFrame);
        }
      } catch (renderError) {
        if (!isCancelled) {
          console.error("CV PDF render failed", renderError);
          setUseEmbeddedFallback(true);
          setError(
            "Canvas preview is unavailable in this browser context. Showing embedded preview instead.",
          );
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    renderPdf();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <section className={styles.cvContainer}>
      <div className={styles.cvDownloadDock}>
        <a className={styles.cvDownload} href={cvFile} download>
          Download
        </a>
      </div>
      <div className={styles.cvViewer}>
        {isLoading && <div className={styles.cvStatus}>Loading preview…</div>}
        {error && <div className={styles.cvStatus}>{error}</div>}
        {useEmbeddedFallback ? (
          <iframe
            title="CV Preview"
            src={cvFile}
            className={styles.cvEmbed}
            loading="lazy"
          />
        ) : (
          <div ref={viewerRef} className={styles.cvPages} />
        )}
      </div>
    </section>
  );
}
