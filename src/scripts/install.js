#!/usr/bin/env node

import { existsSync } from 'fs';
import { mkdir, readFile, readdir, writeFile, unlink } from 'fs/promises';
import { dirname, join } from 'path';

import { log } from '../utils/logs.util.js';

const targetRoot = process.cwd();

const resetConfig = async (files = []) => {
  const prettierConfigFiles = files.filter((filename) => filename.includes('prettier'));
  const eslintConfigFiles = files.filter((filename) => filename.includes('eslint'));
  const stylelintConfigFiles = files.filter((filename) => filename.includes('stylelint'));

  const configFiles = [...prettierConfigFiles, ...eslintConfigFiles, ...stylelintConfigFiles];

  for (const configFile of configFiles) {
    const configPath = join(targetRoot, configFile);

    await unlink(configPath);
    log(`Suppression du fichier ${configFile}`, 'red');
  }
};

const prettierSettings = async (ideaDir) => {
  const prettierXml = `<?xml version="1.0" encoding="UTF-8"?>
<project version="4">
  <component name="PrettierConfiguration">
    <option name="myConfigurationMode" value="AUTOMATIC" />
    <option name="myRunOnSave" value="false" />
    <option name="myRunOnReformat" value="false" />
  </component>
</project>`;

  const prettierPath = join(ideaDir, 'prettier.xml');

  await writeFile(prettierPath, prettierXml);

  log('Creation .idea/prettier.xml', 'green');
};

const eslintSettings = async (ideaDir) => {
  const eslintXml = `<?xml version="1.0" encoding="UTF-8"?>
<project version="4">
  <component name="EslintConfiguration">
    <option name="fix-on-save" value="true" />
  </component>
</project>`;

  const eslintPath = join(ideaDir, 'jsLinters/eslint.xml');

  await writeFile(eslintPath, eslintXml);

  log('Creation .idea/eslintPlugin.xml', 'green');
};

const stylelintSettings = async (ideaDir) => {
  const stylelintXml = `<?xml version="1.0" encoding="UTF-8"?>
<project version="4">
  <component name="StylelintConfiguration">
    <config-file value="$PROJECT_DIR$/stylelint.config.js" />
    <option name="fix-on-save" value="true" />
  </component>
</project>`;

  const stylelintPath = join(ideaDir, 'stylesheetLinters/stylelint.xml');

  await writeFile(stylelintPath, stylelintXml);

  log('Creation .idea/eslintPlugin.xml', 'green');
};

const projectSettings = async (codeStylesDir) => {
  const projectXml = `<component name="ProjectCodeStyleConfiguration">
  <code_scheme name="Project" version="173">
    <option name="FORMATTER_TAGS_ENABLED" value="true" />
    <JSCodeStyleSettings>
      <option name="USE_SEMICOLON_AFTER_STATEMENT" value="true" />
      <option name="FORCE_SEMICOLON_STYLE" value="true" />
      <option name="USE_DOUBLE_QUOTES" value="false" />
      <option name="FORCE_QUOTE_STYlE" value="true" />
      <option name="SPACES_WITHIN_IMPORTS" value="true" />
    </JSCodeStyleSettings>
    <TypeScriptCodeStyleSettings version="0">
      <option name="USE_SEMICOLON_AFTER_STATEMENT" value="true" />
      <option name="FORCE_SEMICOLON_STYLE" value="true" />
      <option name="USE_DOUBLE_QUOTES" value="false" />
      <option name="FORCE_QUOTE_STYlE" value="true" />
      <option name="SPACES_WITHIN_IMPORTS" value="true" />
    </TypeScriptCodeStyleSettings>
    <codeStyleSettings language="JavaScript">
      <option name="INDENT_SIZE" value="2" />
      <option name="TAB_SIZE" value="2" />
    </codeStyleSettings>
    <codeStyleSettings language="TypeScript">
      <option name="INDENT_SIZE" value="2" />
      <option name="TAB_SIZE" value="2" />
    </codeStyleSettings>
  </code_scheme>
</component>`;

  const projectXmlPath = join(codeStylesDir, 'Project.xml');

  await writeFile(projectXmlPath, projectXml);

  log('Creation .idea/codeStyles/Project.xml', 'green');
};

const codeStyleSettings = async (codeStylesDir) => {
  const codeStyleSettingsXml = `<component name="ProjectCodeStyleConfiguration">
  <state>
    <option name="USE_PER_PROJECT_SETTINGS" value="true" />
  </state>
</component>`;

  const codeStyleSettingsPath = join(codeStylesDir, 'codeStyleConfig.xml');

  await writeFile(codeStyleSettingsPath, codeStyleSettingsXml);

  log('Creation .idea/codeStyles/codeStyleConfig.xml', 'green');
};

// 1.
const createVSCodeSettings = async () => {
  const targetPath = join(targetRoot, '.vscode', 'settings.json');

  const settings = {
    'editor.formatOnSave': true,
    'editor.defaultFormatter': 'esbenp.prettier-vscode',
    'editor.codeActionsOnSave': {
      'source.fixAll.eslint': 'explicit',
      'source.fixAll.stylelint': 'explicit',
      'source.organizeImports': 'explicit',
    },
    'eslint.enable': true,
    'eslint.validate': [
      'javascript',
      'javascriptreact',
      'typescript',
      'typescriptreact',
      'vue',
      'html',
    ],
    'stylelint.enable': true,
    'stylelint.validate': ['css', 'scss', 'sass', 'less', 'vue'],
    '[javascript]': { 'editor.defaultFormatter': 'esbenp.prettier-vscode' },
    '[typescript]': { 'editor.defaultFormatter': 'esbenp.prettier-vscode' },
    '[vue]': { 'editor.defaultFormatter': 'esbenp.prettier-vscode' },
    '[html]': { 'editor.defaultFormatter': 'esbenp.prettier-vscode' },
    '[css]': { 'editor.defaultFormatter': 'esbenp.prettier-vscode' },
    '[json]': { 'editor.defaultFormatter': 'esbenp.prettier-vscode' },
    '[markdown]': { 'editor.defaultFormatter': 'esbenp.prettier-vscode' },
    'files.eol': '\n',
    'files.insertFinalNewline': true,
    'files.trimTrailingWhitespace': true,
  };

  await mkdir(dirname(targetPath), { recursive: true });
  await writeFile(targetPath, `${JSON.stringify(settings, null, 2)}\n`);

  log('Creation .vscode/settings.json', 'green');
};
const createVSCodeExtensions = async () => {
  const targetPath = join(targetRoot, '.vscode', 'extensions.json');

  const extensions = {
    recommendations: [
      'esbenp.prettier-vscode',
      'dbaeumer.vscode-eslint',
      'stylelint.vscode-stylelint',
    ],
  };

  await mkdir(dirname(targetPath), { recursive: true });
  await writeFile(targetPath, `${JSON.stringify(extensions, null, 2)}\n`);

  log('Creation .vscode/extensions.json', 'green');
};

// 2.
const createIntellijSettings = async () => {
  const ideaDir = join(targetRoot, '.idea');
  await mkdir(ideaDir, { recursive: true });

  await prettierSettings(ideaDir);
  await eslintSettings(ideaDir);
  await stylelintSettings(ideaDir);

  const codeStylesDir = join(ideaDir, 'codeStyles');
  await mkdir(codeStylesDir, { recursive: true });

  await projectSettings(codeStylesDir);
  await codeStyleSettings(codeStylesDir);
};

// 3.
async function updateGitignore() {
  const gitignorePath = join(targetRoot, '.gitignore');

  const ideaEntries = [
    '',
    '# IntelliJ IDEA',
    '.idea/',
    '!.idea/prettier.xml',
    '!.idea/eslintPlugin.xml',
    '!.idea/codeStyles/',
  ];

  if (existsSync(gitignorePath)) {
    let content = await readFile(gitignorePath, 'utf-8');

    if (!content.includes('.idea/')) {
      content += `\n${ideaEntries.join('\n')}\n`;
      await writeFile(gitignorePath, content);
      log('.gitignore mis a jour avec succès', 'green');
    } else {
      log('.gitignore contient deja les exclusion pour Intellij', 'yellow');
    }
  } else {
    await writeFile(gitignorePath, `${ideaEntries.join('\n')}\n`);
    log('Creation .gitignore', 'green');
  }
}

// 4.
const createJsFilesConfig = async () => {
  const files = [
    {
      target: 'eslint.config.js',
      content: `import config from 'config-linter-front/eslint';

export default config;
`,
    },
    {
      target: 'prettier.config.js',
      content: `import config from 'config-linter-front/prettier';

export default config;
`,
    },
    {
      target: 'stylelint.config.js',
      content: `import config from 'config-linter-front/stylelint';

export default config;
`,
    },
  ];

  for (const file of files) {
    const targetPath = join(targetRoot, file.target);
    await writeFile(targetPath, file.content, 'utf-8');

    log(`Creation : ${targetPath}`, 'green');
  }
};

const main = async () => {
  log('\n Installation de config-linter-front...\n', 'blue');

  try {
    log('\n 0. Suppression des précédents fichiers de config.', 'blue');
    const files = await readdir(targetRoot);
    await resetConfig(files);

    log('\n 1. Création des réglages VS Code...', 'blue');
    await createVSCodeSettings();
    await createVSCodeExtensions();

    log('\n 2. Création des réglages IntelliJ...', 'blue');
    await createIntellijSettings(files);

    log('\n 3. Mise à jour du .gitignore...', 'blue');
    await updateGitignore();

    log('4. Création des fichiers de config du linter...', 'blue');
    await createJsFilesConfig();

    log('\n --- Installation complete ! ---\n', 'green');
    log(' Étape suivante :', 'blue');
    log('  1. Pour VS Code: Installer les extensions recommandées');
    log('  2. Pour IntelliJ : File → Invalidate Caches / Restart\n');
  } catch (error) {
    log(`\n Erreur : ${error.message}\n`, 'red');
    process.exit(1);
  }
};

main();
