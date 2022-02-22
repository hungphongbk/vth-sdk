import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import pkg from "./package.json";
import typescript from "rollup-plugin-typescript2";
import copy from "rollup-plugin-copy";
import { getBabelOutputPlugin } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
// Excluded dependencies
const EXTERNAL = Object.keys(pkg.devDependencies);

export default {
  input: ["src/index.ts"],
  output: {
    dir: "dist",
    sourcemap: true,
    globals: { react: "React" },
    format: "esm",
    exports: "named",
    preserveModules: true,
    preserveModulesRoot: "src",
  },
  plugins: [
    peerDepsExternal(),
    resolve(),
    typescript(),
    commonjs({
      include: /node_modules/,
    }),
    getBabelOutputPlugin({
      presets: ["@babel/preset-env"],
      plugins: [
        [
          "babel-plugin-direct-import",
          {
            modules: [
              "@mui/lab",
              "@mui/system",
              "@mui/material",
              "@mui/icons-material",
            ],
          },
        ],
        [
          "babel-plugin-import",
          {
            libraryName: "lodash",
            libraryDirectory: "",
            camel2DashComponentName: false, // default: true
          },
        ],
        "babel-plugin-date-fns",
      ],
    }),
    copy({
      targets: [
        { src: ".npmrc", dest: "dist" },
        {
          src: "src/themeAugmentation/package.json",
          dest: "dist/themeAugmentation",
        },
        {
          src: "src/apollo/package.json",
          dest: "dist/apollo",
        },
        {
          src: "index.js",
          dest: "dist/themeAugmentation",
        },
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
        {
          src: "src/api",
          dest: "dist",
        },
      ],
    }),
  ],
  external: EXTERNAL,
};
