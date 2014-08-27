define('editor-plugin-auto-resize-textarea', [], function () {
  'use strict';
  return function(markdownEditorNode, options) {
    return function() {
      markdownEditorNode.addEventListener('input', function() {
        if(this.scrollHeight > (options && options.minHeight? options.minHeight : 0) ){
          this.style.height = 0;
          this.style.height = this.scrollHeight + 'px';
        }
      });
    };
  };
});
