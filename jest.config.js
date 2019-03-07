const debounce = require("debounce");

module.exports = {
  globals: {
    debounce
  },
  transformIgnorePatterns: ["node_modules/(?!(lit-html)/)"],
  transform: {
    "^.+\\.mjs$": "babel-jest",
    "^.+\\.js$": "babel-jest"
  }
};
