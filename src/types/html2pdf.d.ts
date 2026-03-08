declare module "html2pdf.js" {
  const html2pdf: (options?: unknown) => {
    from: (element: HTMLElement) => {
      set: (options: unknown) => {
        save: () => Promise<void>;
      };
    };
  };
  export default html2pdf;
}
