/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(test).ts'], // <- finds all .test.ts files
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};
