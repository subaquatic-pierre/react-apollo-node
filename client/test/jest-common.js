// common project configuration used by the other configs

const path = require('path')

module.exports = {
  moduleDirectories: [
    'node_modules',
    path.join(__dirname, '../src'),
    'shared',
    __dirname,
  ],
  testPathIgnorePatterns: ['<rootDir>/server/', '<rootDir>/src/mutations/'],
  moduleNameMapper: {
    // module must come first
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./style-mock.js'),
    // can also map files that are loaded by webpack with the file-loader
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    'jest-watch-select-projects',
  ],
}
