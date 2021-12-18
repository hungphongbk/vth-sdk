import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import pkg from "./package.json";
import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";

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
  plugins: [
    peerDepsExternal(),
    resolve(),
    typescript(),
    commonjs(),
    copy({
      targets: [
        { src: ".npmrc", dest: "dist" },
        {
          src: "package.json",
          dest: "dist",
          transform: (contents, filename) => {
            const json = JSON.parse(contents.toString());
            delete json.husky;
            delete json.scripts;
            return JSON.stringify(json, null, 2);
          },
        },
      ],
    }),
  ],
  external: EXTERNAL,
};
