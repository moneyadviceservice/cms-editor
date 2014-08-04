require({
  paths: {
    'scribe': './bower_components/scribe/scribe',
    'scribe-plugin-blockquote-command': './bower_components/scribe-plugin-blockquote-command/scribe-plugin-blockquote-command',
    'scribe-plugin-curly-quotes': './bower_components/scribe-plugin-curly-quotes/scribe-plugin-curly-quotes',
    'scribe-plugin-formatter-plain-text-convert-new-lines-to-html': './bower_components/scribe-plugin-formatter-plain-text-convert-new-lines-to-html/scribe-plugin-formatter-plain-text-convert-new-lines-to-html',
    'scribe-plugin-heading-command': './bower_components/scribe-plugin-heading-command/scribe-plugin-heading-command',
    'scribe-plugin-intelligent-unlink-command': './bower_components/scribe-plugin-intelligent-unlink-command/scribe-plugin-intelligent-unlink-command',
    'scribe-plugin-keyboard-shortcuts': './bower_components/scribe-plugin-keyboard-shortcuts/scribe-plugin-keyboard-shortcuts',
    'scribe-plugin-link-prompt-command': './bower_components/scribe-plugin-link-prompt-command/scribe-plugin-link-prompt-command',
    'scribe-plugin-insertimage-command': './bower_components/scribe-plugin-insertimage-command/scribe-plugin-insertimage-command',
    'scribe-plugin-inserttable-command': './bower_components/scribe-plugin-inserttable-command/scribe-plugin-inserttable-command',
    'scribe-plugin-inserthtml-command': './bower_components/scribe-plugin-inserthtml-command/scribe-plugin-inserthtml-command',
    'scribe-plugin-sanitizer': './bower_components/scribe-plugin-sanitizer/scribe-plugin-sanitizer',
    'scribe-plugin-smart-lists': './bower_components/scribe-plugin-smart-lists/scribe-plugin-smart-lists',
    'scribe-plugin-toolbar': './bower_components/scribe-plugin-toolbar/scribe-plugin-toolbar',
    'scribe-plugin-inline-toolbar': './bower_components/scribe-plugin-inline-toolbar/scribe-plugin-inline-toolbar',
    'scribe-plugin-sticky-toolbar': './bower_components/scribe-plugin-sticky-toolbar/scribe-plugin-sticky-toolbar'
  }
}, [
  'scribe',
  'scribe-plugin-blockquote-command',
  'scribe-plugin-curly-quotes',
  'scribe-plugin-formatter-plain-text-convert-new-lines-to-html',
  'scribe-plugin-heading-command',
  'scribe-plugin-intelligent-unlink-command',
  'scribe-plugin-keyboard-shortcuts',
  'scribe-plugin-link-prompt-command',
  'scribe-plugin-insertimage-command',
  'scribe-plugin-inserttable-command',
  'scribe-plugin-inserthtml-command',
  'scribe-plugin-sanitizer',
  'scribe-plugin-smart-lists',
  'scribe-plugin-toolbar',
  'scribe-plugin-inline-toolbar',
  'scribe-plugin-sticky-toolbar'
], function (
  Scribe,
  scribePluginBlockquoteCommand,
  scribePluginCurlyQuotes,
  scribePluginFormatterPlainTextConvertNewLinesToHtml,
  scribePluginHeadingCommand,
  scribePluginIntelligentUnlinkCommand,
  scribePluginKeyboardShortcuts,
  scribePluginLinkPromptCommand,
  scribePluginInsertImageCommand,
  scribePluginInsertTableCommand,
  scribePluginInsertHTMLCommand,
  scribePluginSanitizer,
  scribePluginSmartLists,
  scribePluginToolbar,
  scribePluginInlineToolbar,
  scribePluginStickyToolbar
) {

  'use strict';

  var scribe = new Scribe(document.querySelector('.scribe'), { allowBlockElements: true, isDebugModeEnabled: true });

  scribe.on('content-changed', updateHTML);

  function updateHTML() {
    document.querySelector('.scribe-html').value = scribe.getHTML();
  }

  /**
   * Keyboard shortcuts
   */

  var ctrlKey = function (event) { return event.metaKey || event.ctrlKey; };

  var commandsToKeyboardShortcutsMap = Object.freeze({
    bold: function (event) { return event.metaKey && event.keyCode === 66; }, // b
    italic: function (event) { return event.metaKey && event.keyCode === 73; }, // i
    strikeThrough: function (event) { return event.altKey && event.shiftKey && event.keyCode === 83; }, // s
    removeFormat: function (event) { return event.altKey && event.shiftKey && event.keyCode === 65; }, // a
    linkPrompt: function (event) { return event.metaKey && ! event.shiftKey && event.keyCode === 75; }, // k
    unlink: function (event) { return event.metaKey && event.shiftKey && event.keyCode === 75; }, // k,
    insertUnorderedList: function (event) { return event.altKey && event.shiftKey && event.keyCode === 66; }, // b
    insertOrderedList: function (event) { return event.altKey && event.shiftKey && event.keyCode === 78; }, // n
    blockquote: function (event) { return event.altKey && event.shiftKey && event.keyCode === 87; }
  });

  /**
   * Plugins
   */

  var elToolbar = document.querySelector('.toolbar');

  scribe.use(scribePluginBlockquoteCommand());
  scribe.use(scribePluginHeadingCommand(1));
  scribe.use(scribePluginHeadingCommand(2));
  scribe.use(scribePluginHeadingCommand(3));
  scribe.use(scribePluginIntelligentUnlinkCommand());
  scribe.use(scribePluginLinkPromptCommand());
  scribe.use(scribePluginInsertImageCommand());
  scribe.use(scribePluginInsertTableCommand());
  scribe.use(scribePluginInsertHTMLCommand());
  // scribe.use(scribePluginToolbar(elToolbar));
  scribe.use(scribePluginStickyToolbar(elToolbar));
  // scribe.use(scribePluginInlineToolbar(elToolbar));
  // scribe.use(scribePluginSmartLists());
  // scribe.use(scribePluginCurlyQuotes());
  scribe.use(scribePluginKeyboardShortcuts(commandsToKeyboardShortcutsMap));

  // Formatters
  scribe.use(scribePluginSanitizer({
    tags: {
      p: {
        'class': true
      },
      br: {},
      b: {},
      strong: {},
      i: {},
      strike: {},
      blockquote: {},
      ol: {},
      ul: {},
      li: {},
      a: { href: true },
      h1: {},
      h2: {},
      h3: {},
      img: {
        src: true
      },
      div: {
        'class': true
      },
      pre: {}
    }
  }));
  // scribe.use(scribePluginFormatterPlainTextConvertNewLinesToHtml());
  updateHTML();
  scribe.setContent(document.querySelector('#initial-content').value);

});
