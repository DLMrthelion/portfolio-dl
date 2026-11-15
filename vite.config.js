import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { open: true },
  // GitHub Pages serves the site from /portfolio-dl/ (the repo name). With a custom domain, change this to "/".
  // Image/video/PDF paths in the code go through asset() (src/lib/asset.js), so they follow this automatically.
  base: "/portfolio-dl/"
});
