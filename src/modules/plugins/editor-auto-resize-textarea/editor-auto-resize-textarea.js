define('editor-plugin-auto-resize-textarea', [], function () {
  'use strict';
  return function(markdownEditorNode, options) {
    return function(editor) {
      editor.events.subscribe('content:updated', function(mode) {
        if(mode === editor.constants.MODES.MARKDOWN && markdownEditorNode.scrollHeight > (options && options.minHeight? options.minHeight : 200)) {
          markdownEditorNode.style.height = 0;
          markdownEditorNode.style.height = markdownEditorNode.scrollHeight + 'px';
        }
      });
    };
  };
});
