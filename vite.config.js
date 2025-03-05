import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // test: {
  //   globals: true, // Enable Jest-like global variables like `describe`, `test`
  //   environment: 'jsdom', // JSDOM environment for testing React components
  //   setupFiles: './setupTests.js', // Path to setup file

  //   // coverage: {
  //   //   provider: 'v8', // or 'v8'
  //   //   // reporter: 'lcov', // Choose the desired formats
  //   //   reporter: ['text', 'lcov'], // Include 'lcov' to generate the lcov.info file
  //   //   reportsDirectory: './coverage', 
  //   //   // Directory for the coverage report
  //   //   lcov: {
  //   //     file: 'lcov.info' // Ensure that the lcov report is named lcov.info
  //   //   },
  //   // },
    
  // },
  test: {
    globals: true,
    watch: false,
    environment: 'jsdom',
    setupFiles: './setupTests.js', 
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
  },

  coverage: {
    provider: 'v8', // or 'v8' if using V8 coverage engine
    reporter: ['lcov', 'json','xml'], // Coverage reporters
    reportsDirectory: './coverage', // Output directory for coverage reports
    // exclude: ['client/src/Product.jsx,postcss.config.js'], // Exclude profile.js file from coverage
    exclude: [
      '**/src/Product.jsx', // Exclude Product.jsx file from coverage
      '**/postcss.config.js' // Exclude postcss.config.js if necessary
    ],
  },
  

  
});


