// rollup.config.js
import { terser } from "rollup-plugin-terser";
import copy from "rollup-plugin-copy";

export default [
  {
    input: "src/index.mjs",
    output: {
      file: "dist/index.mjs",
      format: "esm"
    },
    plugins: [
      terser(),
      copy({
        // index files
        "src/index.html": "dist/index.html",
        "src/index.css": "dist/index.css",
        "src/style.css": "dist/style.css",
        "src/favicon.ico": "dist/favicon.ico",
        // charts files
        "src/charts.html": "dist/charts.html",
        "src/charts.css": "dist/charts.css",
        "src/data/": "dist/data/",
        // reconciler files
        "src/reconciler.html": "dist/reconciler.html",
        verbose: true
      })
    ]
  },
  {
    input: "src/charts.mjs",
    output: {
      file: "dist/charts.mjs",
      format: "esm"
    },
    plugins: [terser()]
  },
  {
    input: "src/reconciler.mjs",
    output: {
      file: "dist/reconciler.mjs",
      format: "esm"
    },
    plugins: [terser()]
  }
];
