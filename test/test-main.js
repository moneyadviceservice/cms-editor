var tests = [];
var replaceModulePath;
var file;
var bowerPath = 'bower_components/';

replaceModulePath = function (path) {
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

for (file in window.__karma__.files) {
  if (/spec\.js$/i.test(file)) {
    tests.push(replaceModulePath(file));
  }
}

requirejs.config({
  baseUrl: '/base',
  deps: tests,
  paths: {
    'select-mask' : 'src/js/select-mask'
  },
  callback: window.__karma__.start
});
