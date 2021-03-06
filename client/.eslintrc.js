module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
  ],
  // required to lint *.vue files
  // plugins: ['vue'],
  rules: {
    'vue/max-len': [
      'error',
      {
        code: 100,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
        ignoreHTMLAttributeValues: true,
        ignoreHTMLTextContents: true,
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': ['error', { props: false }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'object-curly-newline': ['error', { consistent: true }],
    // 'prettier/prettier': ['error', { semi: true }],
    'quote-props': ['error', 'consistent'],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/no-v-html': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/html-closing-bracket-newline': 'off',
  },
};
