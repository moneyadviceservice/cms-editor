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
    // Editor
    'config': 'src/app/config/config',
    'constants': 'src/app/constants/constants',
    'editor': 'src/app/app',
    'source-converter': 'src/app/modules/source-converter/source-converter',
    'editor-plugin-sticky-toolbar': 'src/app/modules/plugins/editor-sticky-toolbar',
    'editor-lib-wrapper': 'src/app/modules/editor-lib-wrapper/editor-lib-wrapper',

    // Shims
    'mutationobserver-shim': './src/app/shims/mutationobserver.min',

    // PhantomJS shims
    'phantom-shims': 'test/helpers/shims/phantom-shims',

    // 3rd-party libraries
    'text': bowerPath + 'requirejs-text/text',
    'to-markdown': bowerPath + 'to-markdown/dist/to-markdown',
    'marked': bowerPath + 'marked/lib/marked',
    'scribe': bowerPath + 'scribe/scribe',
    'rsvp': bowerPath + 'rsvp/rsvp.min',
    'eventsWithPromises': bowerPath + 'eventsWithPromises/src/eventsWithPromises',
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
  callback: window.__karma__.start
});
