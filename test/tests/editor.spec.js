describe('CMS Editor', function() {
  'use strict';

  beforeEach(function(done) {
    var self = this;

    this.markdownEditorNodeSelector = '#markdown-editor';
    this.htmlEditorNodeSelector = '#html-editor';
    this.toolbarNodeSelector = '#toolbar';

    requirejs([
      'editor',
      'helpers',
      'text!test/helpers/content/content.md',
      'phantom-shims'
    ],
    function (
      Editor,
      helpers,
      content,
      phantomShims
    ) {
      var sandbox = document.createElement('div');
      sandbox.innerHTML = window.__html__['test/fixtures/default.html'];
      document.body.appendChild(sandbox);
      self.sandbox =  sandbox;
      self.helpers = helpers;
      self.toolbarNode = sandbox.querySelector(self.toolbarNodeSelector);
      self.markdownEditorNode = sandbox.querySelector(self.markdownEditorNodeSelector);
      self.htmlEditorNode = sandbox.querySelector(self.htmlEditorNodeSelector);

      self.Editor = Editor;
      self.markdownEditorNode.value = content;
      done();
    }, done);
  });

  afterEach(function() {
    this.sandbox.parentNode.removeChild(this.sandbox);
  });

  describe('Mode switch', function() {
    it('allows the mode to be changed', function() {
      var editor = new this.Editor(
          this.htmlEditorNode,
          this.markdownEditorNode,
          this.toolbarNode,
          {});

      editor._setEditingMode('markdown');
      expect(editor.mode).to.equal('markdown');
    });

    it('allows the mode to be changed to html and content updated', function() {
      var editor = new this.Editor(
          this.htmlEditorNode,
          this.markdownEditorNode,
          this.toolbarNode,
          {}),
          markdown,
          cleanedHTML;

      editor.
        _setEditingMode('markdown')
        .setMarkdownContent('**Dummy**')
        .changeEditingMode('html');

      cleanedHTML = editor.getHTMLContent().replace(/\s+/gi,'');

      expect(editor.mode).to.equal('html');
      expect(cleanedHTML).to.equal('<p><strong>Dummy</strong></p>');
    });
  });

  describe('Markdown editor', function() {
    it('allows value to be set', function() {
      var editor = new this.Editor(
          this.htmlEditorNode,
          this.markdownEditorNode,
          this.toolbarNode,
          {}),
          markdown;

      markdown = '**Dummy**';
      editor.setMarkdownContent(markdown);
      expect(this.markdownEditorNode.value).to.equal(markdown);
    });

    it('allows value to be read', function() {
      var editor = new this.Editor(
          this.htmlEditorNode,
          this.markdownEditorNode,
          this.toolbarNode,
          {}),
          markdown;

      markdown = '**Dummy**';
      this.markdownEditorNode.value = markdown;
      expect(editor.getMarkdownContent()).to.equal(markdown);
    });
  });

  describe('HTML editor', function() {
    it('allows value to be set', function() {
      var editor = new this.Editor(
          this.htmlEditorNode,
          this.markdownEditorNode,
          this.toolbarNode,
          {}),
          html;

      html = '<p>Dummy</p>';
      editor.setHTMLContent(html);
      expect(editor.getHTMLContent()).to.equal(html);
    });

    it('allows value to be read', function() {
      var editor = new this.Editor(
        this.htmlEditorNode,
        this.markdownEditorNode,
        this.toolbarNode,
        {}),
        html;

      html = '<p>Dummy</p>';
      editor.setHTMLContent(html);
      expect(editor.getHTMLContent()).to.equal(html);
    });
  });

  describe('Plugins', function() {
    it('allows a plugin to be specified and activated', function() {
      var editor = new this.Editor(
          this.htmlEditorNode,
          this.markdownEditorNode,
          this.toolbarNode,
          {}),
          spy;

      spy = sinon.spy();
      editor.use(spy);
      expect(spy.callCount).to.equal(1);
    });

    it('ensures that the plugin receives an editor instance as an argument', function() {
      var editor = new this.Editor(
          this.htmlEditorNode,
          this.markdownEditorNode,
          this.toolbarNode,
          {}),
          plugin,
          editorInstance,
          spy;

      plugin = function(){
        return function(instance) {
          editorInstance = instance;
        };
      };
      spy = sinon.spy(editor, 'use');
      editor.use(plugin());
      expect(editorInstance).to.equal(editor);
    });

    it('ensures that the plugin can receive optional arguments', function() {
      var editor = new this.Editor(
          this.htmlEditorNode,
          this.markdownEditorNode,
          this.toolbarNode,
          {}),
          spy,
          optionalArg,
          plugin;

      plugin = function(argOrg){
        return function(editor) {
          optionalArg = argOrg;
        };
      };
      spy = sinon.spy(editor, 'use');
      editor.use(plugin({ options : true }));
      expect(optionalArg.options).to.equal(true);
    });

  });

});
