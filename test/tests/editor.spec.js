describe('CMS Editor', function() {
  'use strict';

  beforeEach(function(done) {
    var self = this;

    this.markdownEditorSelector = '#markdown-editor';
    this.htmlEditorSelector = '#html-editor';
    this.toolbarNodeSelector = '#toolbar';

    requirejs([
      'bind',
      'mutationobserver',
      'editor',
      'helpers',
      'text!test/helpers/content/content.md'
    ],
    function (
      bind,
      mutationobserver,
      Editor,
      helpers,
      content
    ) {
      var sandbox = document.createElement('div');
      sandbox.innerHTML = window.__html__['test/fixtures/default.html'];
      document.body.appendChild(sandbox);
      self.sandbox =  sandbox;
      self.helpers = helpers;
      self.toolbarNode = sandbox.querySelector(self.toolbarNodeSelector);
      self.markdownEditor = sandbox.querySelector(self.markdownEditorSelector);
      self.htmlEditor = sandbox.querySelector(self.htmlEditorSelector);

      self.Editor = Editor;
      self.markdownEditor.value = content;
      done();
    }, done);
  });

  afterEach(function() {
    this.sandbox.parentNode.removeChild(this.sandbox);
  });

  describe('Mode switch', function() {
    it('allows the mode to be changed to markdown and content updated', function() {
      var editor = new this.Editor(
        this.htmlEditor,
        this.markdownEditor,
        this.toolbarNode,
        {});
      expect(false).to.be.true;
    });

    it('allows the mode to be changed to html and content updated', function() {
      var editor = new this.Editor(
        this.htmlEditor,
        this.markdownEditor,
        this.toolbarNode,
        {});
      expect(false).to.be.true;
    });
  });

  describe('Markdown editor', function() {
    it('allows value to be set', function() {
      var editor = new this.Editor(
        this.htmlEditor,
        this.markdownEditor,
        this.toolbarNode,
        {});
      expect(false).to.be.true;
    });

    it('allows value to be read', function() {
      var editor = new this.Editor(
        this.htmlEditor,
        this.markdownEditor,
        this.toolbarNode,
        {});
      expect(false).to.be.true;
    });
  });

  describe('HTML editor', function() {
    it('allows value to be set', function() {
      var editor = new this.Editor(
        this.htmlEditor,
        this.markdownEditor,
        this.toolbarNode,
        {});
      expect(false).to.be.true;
    });

    it('allows value to be read', function() {
      var editor = new this.Editor(
        this.htmlEditor,
        this.markdownEditor,
        this.toolbarNode,
        {});
      expect(false).to.be.true;
    });
  });

  describe('Plugins', function() {
    it('allows a plugin to be specified and activated', function() {
      var editor = new this.Editor(
        this.htmlEditor,
        this.markdownEditor,
        this.toolbarNode,
        {});
      var spy = sinon.spy();
      editor.use(spy);
      expect(spy.callCount).to.equal(1);
    });

    it('should pass the plugin an editor instance as an argument', function() {
      var editor = new this.Editor(
        this.htmlEditor,
        this.markdownEditor,
        this.toolbarNode,
        {});
      var toolbarInstance;
      var plugin = function(){
        return function(instance) {
          toolbarInstance = instance;
        };
      };
      var spy = sinon.spy(editor, 'use');
      editor.use(plugin());
      expect(toolbarInstance).to.equal(editor);
    });

  });

});
