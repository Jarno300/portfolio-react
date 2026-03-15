import { useEffect, useRef, useState } from "react";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import cvFile from "../../assets/documents/CV-Jarno-Mommens-EN.pdf";
import styles from "./Cv.module.css";

GlobalWorkerOptions.workerSrc = workerSrc;

export default function Cv() {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;
    const container = viewerRef.current;

    const renderPdf = async () => {
      if (!container) {
        return;
      }

      setIsLoading(true);
      setError(null);
      container.innerHTML = "";

      try {
        const loadingTask = getDocument(cvFile);
        const pdf = await loadingTask.promise;

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          if (isCancelled) {
            break;
          }

          const page = await pdf.getPage(pageNumber);
          const baseViewport = page.getViewport({ scale: 1 });
          const availableWidth = container.clientWidth || baseViewport.width;
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
          container.appendChild(canvas);
        }
      } catch (renderError) {
        if (!isCancelled) {
          setError("Unable to render the PDF preview.");
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
      <header className={styles.cvHeader}>
        <a className={styles.cvDownload} href={cvFile} download>
          Download PDF
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
