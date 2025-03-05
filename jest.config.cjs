// // // jest.config.cjs
// // module.exports = {
// //   testEnvironment: "jest-environment-jsdom", // Use jsdom for browser-like testing
// //   transform: {
// //     "^.+\\.(js|jsx)$": "babel-jest", // Ensure Jest transforms modern JS with Babel
// //   },
// //   moduleNameMapper: {
// //     "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Handle CSS imports
// //   },
// //   setupFilesAfterEnv: ["<rootDir>/jest.setup.cjs"], // Link to your setup file
// // };

// module.exports = {
//   // transform: {
//   //   "^.+\\.jsx?$": "babel-jest",
//   // },
//   // testEnvironment: "jsdom",

//   testEnvironment: "jest-environment-jsdom", // Use jsdom for browser-like testing
//   transform: {
//     "^.+\\.(js|jsx)$": "babel-jest", // Ensure Jest transforms modern JS with Babel
//   },
//   moduleNameMapper: {
//     "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Handle CSS imports
//   },
//   setupFilesAfterEnv: ["<rootDir>/jest.setup.cjs"], // Link to your setup file

//   // setupFiles: ["dotenv/config"],

//   globals: {
//     "import.meta": { env: { VITE_API_BASE_URL: "https://jsonplaceholder.typicode.com" } } // Provide a default value for Jest tests
//   },
// };

// module.exports = {
//   testEnvironment: "jest-environment-jsdom",
//   transform: {
//     "^.+\\.(js|jsx)$": "babel-jest",
//   },
//   moduleNameMapper: {
//     "\\.(css|less|scss|sass)$": "identity-obj-proxy",
//   },
// setupFiles: ["<rootDir>/jest.setup.js"], // Optional setup file for global variables

//   globals: {
//     "import.meta": { env: { VITE_API_BASE_URL: "https://jsonplaceholder.typicode.com" } }
//   },
// };

// module.exports = {
//   testEnvironment: "jest-environment-jsdom",
//   transform: {
//     "^.+\\.(js|jsx)$": "babel-jest",
//   },
//   moduleNameMapper: {
//     "\\.(css|less|scss|sass)$": "identity-obj-proxy",
//   },
//   setupFilesAfterEnv: ["<rootDir>/jest.setup.cjs"],
//   globals: {
//     "process.env": {
//       VITE_API_BASE_URL: "https://jsonplaceholder.typicode.com",
//     },
//   },
// };

// module.exports = {
//   testEnvironment: "jest-environment-jsdom",
//   transform: {
//     "^.+\\.jsx?$": "babel-jest", // Use babel-jest to transpile JavaScript files
//   },
//   jest: {
//     preset: "babel-jest",
//   },
//   coveragePathIgnorePatterns: ["/node_modules/", "/path/to/excluded/file.js"],

//   moduleFileExtensions: ["js", "jsx"],
//   transformIgnorePatterns: ["/node_modules/"],
//   setupFilesAfterEnv: [
//     "@testing-library/jest-dom/extend-expect",
//     "<rootDir>/jest.setup.js",
//   ],
//   moduleNameMapper: {
//     "\\.(css|less|scss|sass)$": "identity-obj-proxy",
//     "\\.css$": "<rootDir>/path/to/cssMock.js",
//   },
//   collectCoverageFrom: [
//     "src/**/*.{js,jsx}", // Collect coverage from these files
//     "!src/index.js", // Exclude specific files
//   ],
//   globals: {
//     "process.env": {
//       VITE_API_BASE_URL: "https://jsonplaceholder.typicode.com",
//     },
//   },
// };


module.exports = {
  testEnvironment: "jest-environment-jsdom", // Ensures a DOM-like environment for testing React components
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest", // Use babel-jest for JavaScript/JSX/TypeScript transformation
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  transformIgnorePatterns: ["/node_modules/"],
  setupFilesAfterEnv: [
    // "@testing-library/jest-dom/extend-expect",
    "<rootDir>/src/setupTests.js",
  ],
 

  // setupFilesAfterEnv: ["<rootDir>/Setup.mjs"], // Correct path to the setup file
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
  },
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [

    "src/**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/coverage/**",
    // "src/**/*.{js,jsx,ts,tsx}",
    // "!src/index.js", // Exclude entry point files
    "!client/src/test/**",
  ],
  coveragePathIgnorePatterns: ["/node_modules/"],

  globals: {
    "process.env": {
      VITE_API_BASE_URL: "https://jsonplaceholder.typicode.com", // Ensure env variables are injected
    },
    
  },
};

