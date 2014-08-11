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
    'scribe-wrapper': 'src/modules/lib/scribe-wrapper/scribe-wrapper',

    // PhantomJS shims
    'bind' : 'test/helpers/shims/bind',
    'mutationobserver' : 'test/helpers/shims/mutationobserver.min',

    // 3rd-party libraries
    'text': bowerPath + 'requirejs-text/text',
    'to-markdown': bowerPath + 'to-markdown/src/to-markdown',
    'marked': bowerPath + 'marked/lib/marked',
    'he': './bower_components/he/he',
    'scribe': bowerPath + 'scribe/scribe',
    'scribe-plugin-blockquote-command': bowerPath + 'scribe-plugin-blockquote-command/scribe-plugin-blockquote-command',
    'scribe-plugin-formatter-plain-text-convert-new-lines-to-html': bowerPath + 'scribe-plugin-formatter-plain-text-convert-new-lines-to-html/scribe-plugin-formatter-plain-text-convert-new-lines-to-html',
    'scribe-plugin-heading-command': bowerPath + 'scribe-plugin-heading-command/scribe-plugin-heading-command',
    'scribe-plugin-keyboard-shortcuts': bowerPath + 'scribe-plugin-keyboard-shortcuts/scribe-plugin-keyboard-shortcuts',
    'scribe-plugin-link-prompt-command': bowerPath + 'scribe-plugin-link-prompt-command/scribe-plugin-link-prompt-command',
    'scribe-plugin-insertimage-command': bowerPath + 'scribe-plugin-insertimage-command/scribe-plugin-insertimage-command',
    'scribe-plugin-inserttable-command': bowerPath + 'scribe-plugin-inserttable-command/scribe-plugin-inserttable-command',
    'scribe-plugin-inserthtml-command': bowerPath + 'scribe-plugin-inserthtml-command/scribe-plugin-inserthtml-command',
    'scribe-plugin-sanitizer': bowerPath + 'scribe-plugin-sanitizer/scribe-plugin-sanitizer',
    'scribe-plugin-smart-lists': bowerPath + 'scribe-plugin-smart-lists/scribe-plugin-smart-lists',
    'scribe-plugin-toolbar': bowerPath + 'scribe-plugin-toolbar/scribe-plugin-toolbar'
  },
  shim : {
    'to-markdown' : {
      deps : ['he']
    }
  },
  callback: window.__karma__.start
});
