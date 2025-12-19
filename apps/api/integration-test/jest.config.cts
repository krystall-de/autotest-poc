/* eslint-disable */
import { readFileSync } from 'fs';

// Reading the SWC compilation config for the spec files
const swcJestConfig = JSON.parse(
  readFileSync(`${__dirname}/.spec.swcrc`, 'utf-8')
);

// Disable .swcrc look-up by SWC core because we're passing in swcJestConfig ourselves
swcJestConfig.swcrc = false;

export default {
  displayName: '@autotest-poc/api-integration-test',
  preset: '../../../jest.preset.js',
  globalSetup: '<rootDir>/support/global-setup.ts',
  globalTeardown: '<rootDir>/support/global-teardown.ts',
  setupFilesAfterEnv: ['<rootDir>/support/test-setup.ts'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['@swc/jest', swcJestConfig],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: 'test-output/jest/coverage',
  // Avoid running all tests in parallel to prevent DB conflicts
  maxWorkers: 1,
};
