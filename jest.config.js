module.exports = {
    testEnvironment: 'node', // Use Node.js environment for running tests
//    preset: 'ts-jest',
    moduleNameMapper: {
    },
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json', // Path to your tsconfig.json file
        },
    },
    testMatch: ["**/tests/**/*.test.(ts|tsx)"], // Match test files using the .test.ts or .test.tsx file pattern
    "transform": {
        "\\.[jt]sx?$": [
            "babel-jest",
            {
                "babelrc": false,
                "presets": ["@babel/preset-typescript"],
                "plugins": ["@babel/plugin-proposal-optional-chaining"]
            }
        ]
    }
};
