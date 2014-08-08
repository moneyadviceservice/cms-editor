define('scribe-wrapper', [
    'scribe',
    'scribe-plugin-blockquote-command',
    'scribe-plugin-formatter-plain-text-convert-new-lines-to-html',
    'scribe-plugin-heading-command',
    'scribe-plugin-keyboard-shortcuts',
    'scribe-plugin-link-prompt-command',
    'scribe-plugin-sanitizer',
    'scribe-plugin-toolbar'
  ], function (
    Scribe,
    scribePluginBlockquoteCommand,
    scribePluginFormatterPlainTextConvertNewLinesToHtml,
    scribePluginHeadingCommand,
    scribePluginKeyboardShortcuts,
    scribePluginLinkPromptCommand,
    scribePluginSanitizer,
    scribePluginToolbar
  ) {
  return function(editorNode, toolbarNode, options) {
    'use strict';

    /**
     * Start Scribe
     */

    var scribe = new Scribe(editorNode, {
      allowBlockElements: true
    });

    /**
     * Scribe Keyboard shortcuts
     */

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
     * Scribe Plugins
     */

    scribe.use(scribePluginHeadingCommand(1));
    scribe.use(scribePluginHeadingCommand(2));
    scribe.use(scribePluginHeadingCommand(3));
    scribe.use(scribePluginHeadingCommand(4));
    scribe.use(scribePluginLinkPromptCommand());
    scribe.use(scribePluginToolbar(toolbarNode));
    scribe.use(scribePluginKeyboardShortcuts(commandsToKeyboardShortcutsMap));
    scribe.use(scribePluginFormatterPlainTextConvertNewLinesToHtml());
    scribe.use(scribePluginSanitizer({
      tags: {
        p: {},
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
        h4: {},
        h5: {},
        h6: {},
        img: {
          src: true
        },
        pre: {}
      }
    }));

    return scribe;
  };
});
