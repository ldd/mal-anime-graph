// rollup.config.js
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/charts.mjs",
  output: {
    dir: "dist",
    format: "esm"
  },
  plugins: [terser()]
};
