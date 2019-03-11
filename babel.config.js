// babel.config.js
module.exports = {
  env: {
    test: {
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              node: "current"
            }
          }
        ]
      ],
      plugins: [
        [
          "transform-rename-import",
          {
            replacements: [
              {
                original: "^(.+?)lit-html\\.js\\?module$",
                replacement: "lit-html/lit-html.js"
              },
              {
                original: "^(.+?)if-defined\\.js\\?module$",
                replacement: "lit-html/lit-html.js"
              },
              {
                original: "https://unpkg.com/debounce@1.2.0/index.js",
                replacement: "debounce"
              }
            ]
          }
        ]
      ]
    }
  }
};
