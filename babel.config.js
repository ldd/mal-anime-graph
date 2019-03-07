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
                original: "https://unpkg.com/lit-html@0.10.0/lit-html.js",
                replacement: "lit-html/lit-html.js"
              },
              {
                original:
                  "https://unpkg.com/lit-html@0.10.0/lib/lit-extended.js",
                replacement: "lit-html/lib/lit-extended"
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
