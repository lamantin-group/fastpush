module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    "plugin:promise/recommended",
    // "plugin:node/recommended",
  ],
  parserOptions: {
    sourceType: 'module', // Allows for the use of imports
    ecmaVersion: 2020
  },
  // env: {"es6": true},
  plugins: ["promise"],
  rules: {
    "@typescript-eslint/indent": ['warn', 2],
    "@typescript-eslint/member-delimiter-style": ['warn', {
        "multiline": {
        "delimiter": "none",
        "requireLast": true
    },
    "singleline": {
        "delimiter": "semi",
        "requireLast": false
    }}],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-use-before-define": ["error", { "functions": false, "classes": true }]
  }
};
