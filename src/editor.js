define('editor', [
  'scribe-wrapper',
  'source-converter'
], function (
    scribe,
    converter
) {
    'use strict';

    var Editor = function(htmlEditorNode, markdownEditorNode, toolbarNode, options) {
      this.toolbarNode = toolbarNode;
      this.htmlEditorNode = htmlEditorNode;
      this.markdownEditorNode = markdownEditorNode;
      this.options = options || {};
      this.converter = converter;
      this.editor = scribe(this.htmlEditorNode, this.toolbarNode , {
        allowBlockElements : true
      });
      this.mode = this.options.mode || 'html';
      this._init();
    };

    Editor.prototype._init = function() {
      this.changeEditingMode(this.mode);
      return this;
    };

    Editor.prototype._convertHTMLToMarkdown = function(html) {
      this.converter.toMarkdown(html);
      return this;
    };

    Editor.prototype._convertMarkdownToHTML = function(markdown) {
      this.converter.toHTML(markdown);
      return this;
    };

    Editor.prototype.setEditingMode = function(mode) {
      this.options.mode = mode;
      return this;
    };

    Editor.prototype.changeEditingMode = function(mode) {
      var dispatch = {
        'markdown': function() {
          console.log('markdown');
        },
        'html': function() {
          console.log('html');
        }
      },
      dispatchElse = function() {
        throw new Error('That conversion isn\'t supported yet');
      };

      (dispatch[mode] || dispatchElse())();
      // this.setEditingMode(mode);
      // this.setContent();
      return this;
    };

    Editor.prototype.setContent = function(src, mode) {
      // this.modes[this.mode].setContent(src);
      // Should convert src to mode
      return this;
    };

    Editor.prototype.getHTMLContent = function() {
      return this;
    };

    Editor.prototype.setHTMLContent = function(html) {
      console.log(markdown);
      return this;
    };

    Editor.prototype.getMarkdownContent = function() {
      return this;
    };

    Editor.prototype.setMarkdownContent = function(markdown) {
      console.log(markdown);
      return this;
    };

    Editor.prototype.render = function() {
      return this;
    };

    Editor.prototype.use = function(activatePlugin) {
      activatePlugin(this);
      return this;
    };

    return Editor;
});
