import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import pkg from "./package.json";
import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";

// Excluded dependencies
const EXTERNAL = Object.keys(pkg.devDependencies);

export default {
  input: ["src/index.ts"],
  output: {
    dir: "dist",
    sourcemap: true,
    globals: { react: "React" },
    format: "cjs",
    exports: "named",
    preserveModules: true,
    preserveModulesRoot: "src",
  },
  plugins: [peerDepsExternal(), resolve(), typescript(), commonjs()],
  external: EXTERNAL,
};
