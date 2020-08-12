module.exports = {
  // ...require('./test/jest-common'),
  testPathIgnorePatterns: ['<rootDir>/server/', '<rootDir>/src/mutations/'],
  coverageThreshold: {
    global: {
      statements: 15,
      branches: 10,
      functions: 15,
      lines: 15,
    },
  },
}
