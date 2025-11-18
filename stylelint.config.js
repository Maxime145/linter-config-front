/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],

  rules: {
    // Règles générales
    'color-hex-length': 'short',
    'color-named': 'never',
    'font-family-name-quotes': 'always-where-recommended',
    'function-url-quotes': 'always',
    'number-max-precision': 4,
    'selector-max-id': 0,
    'value-keyword-case': 'lower',

    // Règles CSS
    'order/properties-alphabetical-order': true,

    // Règles adaptées pour Tailwind
    'declaration-block-no-redundant-longhand-properties': null,
    'no-descending-specificity': null,
    'selector-class-pattern': null,
    'custom-property-pattern': null,
    'value-no-vendor-prefix': null,
    'property-no-vendor-prefix': null,
    'declaration-no-important': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'layer',
          'config',
          'variants',
          'responsive',
          'screen',
          'utility',
        ],
      },
    ],
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['theme', 'screen'],
      },
    ],

    // Règles de qualité
    'alpha-value-notation': 'percentage',
    'color-function-notation': 'modern',
    'selector-not-notation': 'complex',
    'import-notation': 'string',
    'keyframes-name-pattern': null,
  },

  overrides: [
    // Vue
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
      rules: {
        'selector-pseudo-class-no-unknown': [
          true,
          {
            ignorePseudoClasses: ['deep', 'slotted', 'global'],
          },
        ],
        'selector-pseudo-element-no-unknown': [
          true,
          {
            ignorePseudoElements: ['v-deep', 'v-slotted', 'v-global'],
          },
        ],
      },
    },

    // Angular
    {
      files: ['**/*.html'],
      customSyntax: 'postcss-html',
      rules: {
        'selector-pseudo-element-no-unknown': [
          true,
          {
            ignorePseudoElements: ['ng-deep'],
          },
        ],
        'selector-pseudo-class-no-unknown': [
          true,
          {
            ignorePseudoClasses: ['host', 'host-context'],
          },
        ],
      },
    },
  ],

  ignoreFiles: ['**/node_modules/**', '**/dist/**', '**/build/**'],
};
