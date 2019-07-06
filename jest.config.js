module.exports = {
  preset: "jest-preset-angular",
  roots: ['src', 'server'],
  setupFilesAfterEnv: ["<rootDir>/src/setupJest.ts"],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/jestGlobalMocks.ts"
  ]
};
