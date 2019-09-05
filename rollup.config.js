import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'

import pkg from './package.json'

export default {
  input: 'src/index.js',
  external: ['redux'],
  output: [
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      banner: `/*!
 * ${pkg.name} - ${pkg.description}
 * --------
 * @version ${pkg.version}
 * @homepage: ${pkg.homepage}
 * @license ${pkg.license}
 * @author ${pkg.author}
 *
 */`
    }
  ],
  plugins: [
    babel(),
    nodeResolve()
  ]
}
