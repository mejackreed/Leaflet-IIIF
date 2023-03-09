'use strict'

const path = require('path')

const ESM = process.env.ESM === 'true'

const fileDest = `leaflet-iiif${ESM ? '.esm' : ''}`
const external = ['leaflet/dist/leaflet-src.esm']
const globals = {leaflet: 'L'}

const rollupConfig = {
  input: path.resolve(__dirname, `src/leaflet-iiif.js`),
  output: {
    file: path.resolve(__dirname, `dist/${fileDest}.js`),
    format: ESM ? 'esm' : 'umd',
    globals,
    generatedCode: 'es2015'
  },
  external
}

if (!ESM) {
  rollupConfig.output.name = 'LeafletIIIF'
}

module.exports = rollupConfig