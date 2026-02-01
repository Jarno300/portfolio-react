/// <reference types="vite/client" />

// Enable importing files as raw strings
declare module "*?raw" {
  const content: string;
  export default content;
}
