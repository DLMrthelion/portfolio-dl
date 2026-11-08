import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { open: true },
  // GitHub Pages serves the site from /portfolio-dl/; Vercel (which sets VERCEL=1) serves it from /.
  // Image/video/PDF paths in the code go through asset() (src/lib/asset.js), so they follow this automatically.
  base: process.env.VERCEL ? "/" : "/portfolio-dl/"
});
