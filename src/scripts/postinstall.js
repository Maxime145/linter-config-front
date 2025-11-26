import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { log } from '../utils/logs.util.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, '..');

// Vérifier si on est dans le package lui-même ou dans node_modules
const isInstalledAsPackage = packageRoot.includes('node_modules');

if (isInstalledAsPackage) {
  log('\n config-linter-front installe avec success !\n', 'blue');
  log('Pour configurer votre projet, run:', 'green');
  log('  npm run setup\n', 'yellow');
  log('Ajouter a votre package.json ceci:', 'blue');
  log('  "scripts": {', 'yellow');
  log('    "setup": "install-linter-front"');
  log('  }\n', 'reset');
  log('ou avec npm link (en local) ceci:', 'blue');
  log('  npx install-linter-front${colorsUtil.reset}\n', 'yellow');
}
