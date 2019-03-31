import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

const pkg = require('./package.json');

export default {
  input: './src/index.js',
  output: {
    format: 'cjs',
    file: pkg.main,
  },
  plugins: [
    babel(),
    terser(),
  ],
  external: Object.keys(pkg.dependencies).concat(['path', 'fs']),
};
