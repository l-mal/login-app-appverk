module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', 'karma-typescript'],
    files: [
      'src/**/*.spec.ts'
    ],
    preprocessors: {
      'src/**/*.spec.ts': ['karma-typescript'],
    },
    browsers: ['ChromeHeadless'], 
    reporters: ['progress', 'karma-typescript'],
    singleRun: true,  
    autoWatch: false, 
    captureTimeout: 60000, 
    browserNoActivityTimeout: 60000
  });
};
