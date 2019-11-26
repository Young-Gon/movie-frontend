module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript'
  ],
  // add your custom rules here
  rules: {
    "semi": ["error", "never"],
    "quotes": [2, "double", { "avoidEscape": false }],
  }
}
