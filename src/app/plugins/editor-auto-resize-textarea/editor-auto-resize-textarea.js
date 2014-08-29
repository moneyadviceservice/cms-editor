define([], function () {
  'use strict';
  return function(markdownEditorNode, options) {
    return function(editor) {
      var handleContentUpdate = function () {
        if(markdownEditorNode.scrollHeight > (options && options.minHeight? options.minHeight : 200)) {
          markdownEditorNode.style.height = 0;
          markdownEditorNode.style.height = markdownEditorNode.scrollHeight + 'px';
          markdownEditorNode.scrollTop = markdownEditorNode.scrollHeight;
        }
      };
      markdownEditorNode.addEventListener('input', handleContentUpdate);
      editor.events.subscribe('content:updated', function(mode) {
        if(mode === editor.constants.MODES.MARKDOWN) {
          handleContentUpdate(mode);
        }
      });
    };
  };
});
