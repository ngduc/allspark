import babel from "rollup-plugin-babel";
import nodeResolve from "rollup-plugin-node-resolve";
import uglify from "rollup-plugin-uglify";
import bundleSize from "rollup-plugin-bundle-size";
import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";

const name = `allspark`;

const plugins = [
  replace({
    "#!/usr/bin/env node": ``,
    delimiters: [``, ``] // required for 'replace' to work.
  }),
  babel(),
  nodeResolve({
    module: true,
    jsnext: true
  }),
  commonjs({
    include: `node_modules/**`
  }),
  bundleSize()
];

const isProd = process.env.NODE_ENV === `production`;
if (isProd) plugins.push(uglify());

export default {
  entry: `src/index.js`,
  plugins,
  dest: `dist/umd/${name}${isProd ? `.min` : ``}.js`,
  moduleName: name,
  format: `umd`
};
