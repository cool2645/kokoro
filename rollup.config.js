import pkg from './package.json'
import babel from 'rollup-plugin-babel'

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
    babel()
  ]
}
