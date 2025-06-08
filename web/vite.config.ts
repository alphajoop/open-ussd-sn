import path from 'node:path';
import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

function copyUssdCsv() {
  const sourcePath = path.resolve(__dirname, '../data/ussd_codes_senegal.csv');
  const targetDir = path.resolve(__dirname, 'public/data');
  const targetPath = path.join(targetDir, 'ussd_codes_senegal.csv');

  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
  }

  copyFileSync(sourcePath, targetPath);
  console.log(`✔ Fichier copié depuis "${sourcePath}" vers "${targetPath}"`);
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'copy-ussd-csv',
      apply: 'build',
      buildStart() {
        copyUssdCsv();
      },
    },
    {
      name: 'copy-ussd-csv-dev',
      apply: 'serve',
      configureServer() {
        copyUssdCsv();
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
