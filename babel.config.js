const presets = [
  ['@babel/preset-env', { targets: { node: '8.10' }}]
];

const plugins = [
  ['@babel/plugin-proposal-class-properties'],
  ['@babel/plugin-proposal-object-rest-spread'],
  ['@babel/plugin-syntax-dynamic-import'],
  ['@babel/plugin-proposal-decorators', { legacy: true }],
  ['@babel/plugin-transform-runtime'],
  ['@babel/plugin-proposal-optional-chaining'],
  ['macros'],
  ['source-map-support'],
  ['@babel/plugin-proposal-throw-expressions']
];

module.exports = {
  presets,
  plugins
};
