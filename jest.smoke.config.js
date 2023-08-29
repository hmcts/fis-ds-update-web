module.exports = {
  roots: ['<rootDir>/src/test/smoke'],
  testRegex: '(/src/test/.*|\\.test)\\.(ts|js)$',
  testEnvironment: 'node',
  testRunner: 'jest-circus/runner',
  transform: {
    '^.+\\.(ts|tsx)$': '@swc/jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
};
