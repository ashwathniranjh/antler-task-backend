module.exports = {
  "root": true,
  "ecmaFeatures": {
    "modules": true,
    "spread": true,
    "restParams": true,
  },
  "env": {
    es6: true,
    node: true,
  },
  "extends": [
    "eslint:recommended",
    "google",
  ],
  "rules": {
    quotes: ["error", "double"],
  },
  "parserOptions": {
    "sourceType": "module",
  },
};
