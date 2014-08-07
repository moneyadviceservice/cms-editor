module.exports = function(config) {
  config.set({
    basePath: '../',
    frameworks: ['requirejs','mocha', 'chai', 'sinon'],
    files: [
      'test/fixtures/*.html',
      'test/test-main.js',
      'test/helpers/helpers.js',
      {pattern:'test/helpers/content/content.md', included: false},
      {pattern: 'src/**/*.js', included: false},
      {pattern: 'test/tests/*.spec.js', included: false},
      {pattern: 'bower_components/**/*.js', included: false}
    ],
    exclude: [],
    preprocessors: {
      '**/*.html': ['html2js']
    },
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_ERROR,
    autoWatch: true,
    browsers: ['PhantomJS'],
    captureTimeout: 6000,
    singleRun: false
  });
};
