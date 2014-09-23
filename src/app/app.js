define([
  'constants',
  'config',
  'editor-lib-wrapper',
  'source-converter',
  'eventsWithPromises'
], function (
    constants,
    config,
    editorLib,
    converter,
    events
) {
    'use strict';

    /**
     * Creates an editor instance
     * @class
     * @param {Object} htmlEditorNode       HTML editor node
     * @param {Object} markdownEditorNode   Markdown editor node
     * @param {Object} toolbarNode          HTML editor toolbar node
     * @param {Object} options              Options
     */
    var Editor = function(htmlEditorNode, markdownEditorNode, toolbarNode, options) {
      this.constants = constants;
      this.config = config;
      this.events = events;
      this.toolbarNode = toolbarNode;
      this.htmlEditorNode = htmlEditorNode;
      this.markdownEditorNode = markdownEditorNode;
      this.options = options || {};
      this.editorLibOptions = this.options.editorLibOptions || {};
      this.converter = converter;
      this.editor = editorLib(this.htmlEditorNode, this.toolbarNode, this.options.editorLibOptions);
      this.mode = this.options.mode || config.defaultEditingMode;
      this._init();
    };

    /**
     * Starts up the class
     * @return {Object} this
     */
    Editor.prototype._init = function() {
      this.changeEditingMode(this.mode);
      this.events.publish('editor:initialised');
      return this;
    };

    /**
     * Converts HTML to Markdown
     * @private
     * @param {string} html    HTML to be converted to Markdown
     * @return {string}
     */
    Editor.prototype._convertHTMLToMarkdown = function(html) {
      return this.converter.toMarkdown(html);
    };

    /**
     * Converts Markdown to HTML
     * @private
     * @param {string} markdown     Markdown to be converted to HTML
     * @return {string}
     */
    Editor.prototype._convertMarkdownToHTML = function(markdown) {
      return this.converter.toHTML(markdown);
    };

    /**
     * Sets mode property
     * @private
     * @param {string} mode  HTML to be converted to Markdown
     * @return {string}
     */
    Editor.prototype._setEditingMode = function(mode) {
      this.mode = mode;
      return this;
    };

    /**
     * Changes the editing mode
     * @param  {string} mode Editing mode
     * @return {Object}      this
     */
    Editor.prototype.changeEditingMode = function(mode) {
      var dispatch,
          dispatchDefault,
          that = this;

      dispatch = {
        'markdown': function() {
          that.setMarkdownContent(
            that._convertHTMLToMarkdown(that.getHTMLContent())
          );
        },
        'html': function() {
          that.setHTMLContent(
            that._convertMarkdownToHTML(that.getMarkdownContent())
          );
        }
      };

      dispatchDefault = function() {
        throw new Error('That conversion isn\'t supported');
      };

      (dispatch[mode] || dispatchDefault())();

      this._setEditingMode(mode);
      this.events.publish('mode:changed', mode);

      return this;
    };

    /**
     * Gets the contents of the HTML editor
     * @return {string} HTML
     */
    Editor.prototype.getHTMLContent = function() {
      return this.editor.getContent();
    };

    /**
     * Sets the HTML editor's content
     * @param {string} html    HTML content
     * @return {Object} this
     */
    Editor.prototype.setHTMLContent = function(html) {
      this.editor.setContent(html);
      this.events.publish('content:updated', constants.MODES.HTML);
      return this;
    };

    /**
     * Gets the content of the Markdown `textarea` box
     * @return {string} Markdown
     */
    Editor.prototype.getMarkdownContent = function() {
      return this.markdownEditorNode.value;
    };

    /**
     * Sets the Markdown editor's content
     * @param {string} markdown    Markdown content
     * @return {Object} this
     */
    Editor.prototype.setMarkdownContent = function(markdown) {
      this.markdownEditorNode.value = markdown;
      this.events.publish('content:updated', constants.MODES.MARKDOWN);
      return this;
    };

    /**
     * Boots up the display of the content
     * @param {string} mode Mode
     * @param {string} src Source to convert
     * @return {Object} this
     */
    Editor.prototype.render = function(mode) {
      this.changeEditingMode(mode);
      return this;
    };

    /**
     * Activates plugin
     * An instance of the editor is passed to the activated plugin
     * @param  {Object} activatePlugin Plugin to activate
     * @return {Object} this
     */
    Editor.prototype.use = function(activatePlugin) {
      activatePlugin(this);
      return this;
    };

    return Editor;
  }
);
