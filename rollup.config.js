var babel = require('rollup-plugin-babel');
var uglify = require('rollup-plugin-uglify').uglify;
var license = require('rollup-plugin-license');
var resolve = require('@rollup/plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');

var path = require('path');
var os = require('os');

module.exports = {
  input: 'lib/index.js',

  output: {
    exports: 'named',
    globals: {
      'prop-types': 'PropTypes',
      react: 'React',
      'react-dom': 'ReactDOM',
      'os': 'os',
      isEqual: 'lodash.isEqual',
      isBoolean: 'lodash.isBoolean',
      isArray: 'lodash.isArray',
    }
  },
  
  external: [
    'prop-types',
    'react',
    'react-dom',
    'lodash/isEqual',
    'lodash/isBoolean',
    'lodash/isArray',
    'os',
  ],
  plugins: [
    resolve({
      preferBuiltins: true
    }),
    babel({
      exclude: 'node_modules/**'
    }),

    commonjs({
      exclude: './test/HotKeys/**',
      namedExports: {
        'react-dom/test-utils' : ['act']
      }
    }),

    process.env.BABEL_ENV === 'production' && uglify(),

    process.env.NODE_ENV !== 'test' && license({
      banner: {
        content: {
          file: path.join(__dirname, 'LICENSE.md')
        }
      }
    })
  ]
};
