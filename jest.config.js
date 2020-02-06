module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@App/(.*)$': '<rootDir>/src/$1',
    '^lib/(.*)$': '<rootDir>/lib/$1',
  },
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
}
