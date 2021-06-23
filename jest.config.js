process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
process.env.LOG_LEVEL = 'NONE';

module.exports = {
  collectCoverageFrom: [
    'src/**/*.ts',
    '!**/*.test.ts',
    '!**/*.itest.ts',
    '!**/*.d.ts',
  ],
  coverageReporters: ['lcov', 'text'],
  moduleFileExtensions: ['ts', 'json', 'js'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  coverageDirectory: 'coverage/unit',
  testRegex: '.*\\.test\\.ts$',
};
