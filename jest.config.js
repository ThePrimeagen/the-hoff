module.exports = {
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.json"
        }
    },
    roots: ["<rootDir>/src"],
    testPathIgnorePatterns: ["<rootDir>/src/__tests__/__utils__/*.ts"],
    testMatch: ["**/__tests__/**/*.+(ts|tsx|js)"],
    testEnvironment: "<rootDir>/node-environment.ts",
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        "~/(.*)": "<rootDir>/src/$1"
    }
};


