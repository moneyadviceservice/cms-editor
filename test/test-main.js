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
    // Custom deps
    'editor': 'src/editor',
    'source-converter': 'src/modules/lib/source-converter/source-converter',
    'editor-plugin-sticky-toolbar': 'src/modules/lib/plugins/editor-sticky-toolbar',

    // 3rd-party libraries
    'text': bowerPath + 'requirejs-text/text',
    'to-markdown': bowerPath + 'to-markdown/src/to-markdown',
    'marked': bowerPath + 'marked/lib/marked',
    'scribe': bowerPath + 'scribe/scribe'

  },
  callback: window.__karma__.start
});
