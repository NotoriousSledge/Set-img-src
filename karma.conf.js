module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', 'karma-typescript'],
    files: [
      'src/**/*.ts',
      'tests/*.ts',
    ],
    preprocessors: {
      '**/*.ts': 'karma-typescript', // *.tsx for React Jsx
    },
    reporters: ['progress', 'karma-typescript', 'dots', 'junit'],
    browsers: ['Chrome'],
    singleRun: true,
    junitReporter: {
      outputFile: './test-results.xml',
    },
  });
};