require({
  paths: {
    'marked': './bower_components/marked/lib/marked',
    'toMarkdown': './vendor/to-markdown/to-markdown',
    'source-converter': './js/source-converter/source-converter',
    'scribe': './bower_components/scribe/scribe',
    'scribe-plugin-blockquote-command': './bower_components/scribe-plugin-blockquote-command/scribe-plugin-blockquote-command',
    'scribe-plugin-curly-quotes': './bower_components/scribe-plugin-curly-quotes/scribe-plugin-curly-quotes',
    'scribe-plugin-formatter-plain-text-convert-new-lines-to-html': './bower_components/scribe-plugin-formatter-plain-text-convert-new-lines-to-html/scribe-plugin-formatter-plain-text-convert-new-lines-to-html',
    'scribe-plugin-heading-command': './bower_components/scribe-plugin-heading-command/scribe-plugin-heading-command',
    // 'scribe-plugin-intelligent-unlink-command': './bower_components/scribe-plugin-intelligent-unlink-command/scribe-plugin-intelligent-unlink-command',
    'scribe-plugin-keyboard-shortcuts': './bower_components/scribe-plugin-keyboard-shortcuts/scribe-plugin-keyboard-shortcuts',
    'scribe-plugin-link-prompt-command': './bower_components/scribe-plugin-link-prompt-command/scribe-plugin-link-prompt-command',
    'scribe-plugin-insertimage-command': './bower_components/scribe-plugin-insertimage-command/scribe-plugin-insertimage-command',
    'scribe-plugin-inserttable-command': './bower_components/scribe-plugin-inserttable-command/scribe-plugin-inserttable-command',
    'scribe-plugin-inserthtml-command': './bower_components/scribe-plugin-inserthtml-command/scribe-plugin-inserthtml-command',
    'scribe-plugin-sanitizer': './bower_components/scribe-plugin-sanitizer/scribe-plugin-sanitizer',
    'scribe-plugin-smart-lists': './bower_components/scribe-plugin-smart-lists/scribe-plugin-smart-lists',
    'scribe-plugin-toolbar': './bower_components/scribe-plugin-toolbar/scribe-plugin-toolbar',
    'scribe-plugin-inline-toolbar': './bower_components/scribe-plugin-inline-toolbar/scribe-plugin-inline-toolbar',
    'scribe-plugin-sticky-toolbar': './bower_components/scribe-plugin-sticky-toolbar/scribe-plugin-sticky-toolbar',
  }
}, [
  'marked',
  'toMarkdown',
  'source-converter',
  'scribe',
  'scribe-plugin-blockquote-command',
  'scribe-plugin-curly-quotes',
  'scribe-plugin-formatter-plain-text-convert-new-lines-to-html',
  'scribe-plugin-heading-command',
  // 'scribe-plugin-intelligent-unlink-command',
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
  marked,
  toMarkdown,
  convertSource,
  Scribe,
  scribePluginBlockquoteCommand,
  scribePluginCurlyQuotes,
  scribePluginFormatterPlainTextConvertNewLinesToHtml,
  scribePluginHeadingCommand,
  // scribePluginIntelligentUnlinkCommand,
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

  var scribe,
      ctrlKey,
      commandsToKeyboardShortcutsMap,
      editMode,
      elToolbar,
      elMarkdownEditor = document.querySelector('.js-editor-markdown'),
      elMarkdownEditorContent = document.querySelector('.js-editor-markdown-content'),
      elHTMLEditor = document.querySelector('.js-editor-html'),
      elEditModeBtn = document.querySelector('.js-select-edit-mode'),
      classActive = 'is-active';

  /**
   * Scribe setup
   */

  scribe = new Scribe(document.querySelector('.scribe'), {
    allowBlockElements: true
  });

  /**
   * Scribe Keyboard shortcuts
   */

  ctrlKey = function (event) { return event.metaKey || event.ctrlKey; };

  commandsToKeyboardShortcutsMap = Object.freeze({
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

  elToolbar = document.querySelector('.toolbar');

  scribe.use(scribePluginBlockquoteCommand());
  scribe.use(scribePluginHeadingCommand(1));
  scribe.use(scribePluginHeadingCommand(2));
  scribe.use(scribePluginHeadingCommand(3));
  scribe.use(scribePluginHeadingCommand(4));
  // scribe.use(scribePluginIntelligentUnlinkCommand());
  scribe.use(scribePluginLinkPromptCommand());
  scribe.use(scribePluginInsertImageCommand());
  scribe.use(scribePluginInsertTableCommand());
  scribe.use(scribePluginInsertHTMLCommand());
  scribe.use(scribePluginKeyboardShortcuts(commandsToKeyboardShortcutsMap));
  scribe.use(scribePluginStickyToolbar(elToolbar));
  scribe.use(scribePluginFormatterPlainTextConvertNewLinesToHtml());
  // scribe.use(scribePluginToolbar(elToolbar));
  // scribe.use(scribePluginInlineToolbar(elToolbar));
  // scribe.use(scribePluginSmartLists());
  // scribe.use(scribePluginCurlyQuotes());

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
      h4: {},
      h5: {},
      h6: {},
      img: {
        src: true
      },
      pre: {}
    }
  }));

  /**
   * Edit mode switcher
   */

  function setupEditModeButton() {
    elEditModeBtn.addEventListener('click', function(){
      selectEditMode(editMode);
    });
  }

  function selectEditMode(mode) {
    switch(mode) {
      case 'markdown':
        elMarkdownEditor.classList.add(classActive);
        elHTMLEditor.classList.remove(classActive);
        updateMarkdownEditor(scribe.getHTML());
        elMarkdownEditorContent.focus();
        editMode = 'html';
        break;
      case 'html':
        elHTMLEditor.classList.add(classActive);
        elMarkdownEditor.classList.remove(classActive);
        updateScribe(elMarkdownEditorContent.value);
        scribe.el.focus();
        editMode = 'markdown';
        break;
    }
  }

  function updateMarkdownEditor(html) {
    elMarkdownEditorContent.value = convertSource.toMASMarkdown(html);
    resizeTextarea(elMarkdownEditorContent);
  }

  function resizeTextarea(textarea) {
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  function updateScribe(markdown) {
    scribe.setContent(convertSource.toHTML(markdown));
  }

  setupEditModeButton();
  selectEditMode('html');
});
