import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { copyFileSync, mkdirSync, existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

function copyUssdCsv() {
  const sourcePath = resolve(__dirname, '../../data/ussd_codes_senegal.csv');
  const targetDir = resolve(__dirname, '../public/data');
  const targetPath = join(targetDir, 'ussd_codes_senegal.csv');

  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
  }

  copyFileSync(sourcePath, targetPath);
  console.log(`✔ Fichier copié depuis "${sourcePath}" vers "${targetPath}"`);
}

copyUssdCsv();
