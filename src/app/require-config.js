require.config({
  paths: {
    // 3rd-party libraries
    'he': '../../../bower_components/he/he',
    'rsvp': '../../../bower_components/rsvp/rsvp.amd',
    'eventsWithPromises': '../../../bower_components/eventsWithPromises/src/eventsWithPromises',
    'scribe': '../../../bower_components/scribe/scribe',
    'scribe-plugin-blockquote-command': '../../../bower_components/scribe-plugin-blockquote-command/scribe-plugin-blockquote-command',
    'scribe-plugin-formatter-plain-text-convert-new-lines-to-html': '../../../bower_components/scribe-plugin-formatter-plain-text-convert-new-lines-to-html/scribe-plugin-formatter-plain-text-convert-new-lines-to-html',
    'scribe-plugin-heading-command': '../../../bower_components/scribe-plugin-heading-command/scribe-plugin-heading-command',
    'scribe-plugin-keyboard-shortcuts': '../../../bower_components/scribe-plugin-keyboard-shortcuts/scribe-plugin-keyboard-shortcuts',
    'scribe-plugin-link-prompt-command': '../../../bower_components/scribe-plugin-link-prompt-command/scribe-plugin-link-prompt-command',
    'scribe-plugin-insertimage-command': '../../../bower_components/scribe-plugin-insertimage-command/scribe-plugin-insertimage-command',
    'scribe-plugin-inserttable-command': '../../../bower_components/scribe-plugin-inserttable-command/scribe-plugin-inserttable-command',
    'scribe-plugin-inserthtml-command': '../../../bower_components/scribe-plugin-inserthtml-command/scribe-plugin-inserthtml-command',
    'scribe-plugin-sanitizer': '../../../bower_components/scribe-plugin-sanitizer/scribe-plugin-sanitizer',
    'scribe-plugin-smart-lists': '../../../bower_components/scribe-plugin-smart-lists/scribe-plugin-smart-lists',
    'scribe-plugin-toolbar': '../../../bower_components/scribe-plugin-toolbar/scribe-plugin-toolbar',

    // Converters
    'marked': '../../../bower_components/marked/lib/marked',
    'to-markdown' : '../../../bower_components/to-markdown/src/to-markdown'
  },
  shim: {
    'to-markdown' : {
      deps : ['he']
    }
  }
});
