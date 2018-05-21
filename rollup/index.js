/**
 * Rollup 打包配置
 */

import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import { uglify } from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'

export default {
  input: path.resolve(__dirname, '../src/lib/index.js'),

  output: {
    file: 'dist/vue-slim-better-scroll.js',
    format: 'umd',
    name: 'vue-slim-better-scroll',
  },

  alias: {
    'vue$': 'vue/dist/vue.esm.js',
    '@': path.resolve(__dirname, '../src'),
  },

  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    resolve({
      extensions: ['.js', '.vue', '.json'],
    }),
    vue(),
    babel({
      runtimeHelpers: true,
      exclude: ['node_modules/**'],
    }),
    uglify({
      sourceMap: false,
      compress: {
        warnings: false,
        drop_console: false, // 删除console
        drop_debugger: true, // 删除debugger
      },
    }),
  ],
}
