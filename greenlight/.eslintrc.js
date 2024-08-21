module.exports = {
  parser: 'babel/eslint-parser',
  env: {
    browser: true, // If you're using web-specific code
    es2021: true, // Enables modern ECMAScript features
  },
  extends: [
    'eslint:recommended', // Base ESLint recommended rules
    'plugin:react/recommended', // Recommended rules for React
    'plugin:react-native/all', // All rules for React Native
  ],
  parserOptions: {
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true, // Enable JSX parsing
    },
    ecmaVersion: 12, // ECMAScript 2021
    sourceType: 'module', // Enables import/export syntax
    babelOptions: {
      presets: ['@babel/preset-react'], // Ensures Babel understands JSX
    },
  },
  plugins: [
    'react', // React specific linting rules
    'react-native', // React Native specific linting rules
    'import', // Linting for ES6+ import/export syntax
    'jsx-a11y', // Accessibility linting for JSX
  ],
  rules: {
    // Customize these rules based on your preferences
    'react/prop-types': 'off', // Turn off prop-types requirement
    'react-native/no-inline-styles': 'off', // Allow inline styles in React Native
    'react-native/no-color-literals': 'off', // Allow color literals
    '@typescript-eslint/ban-ts-comment': 'off',
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
};
