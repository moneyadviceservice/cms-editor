describe('CMS Editor', function() {
  before(function(done) {
    var self = this;

    document.body.innerHTML = window.__html__['test/fixtures/default.html'];
    this.markdownEditorSelector = '#markdown-editor';
    this.htmlEditorSelector = '#html-editor';

    requirejs(['helpers','text!test/helpers/content/content.md'], function (helpers, content) {
      self.helpers = helpers;
      self.markdownEditor = document.querySelector(self.markdownEditorSelector);
      self.htmlEditor = document.querySelector(self.htmlEditorSelector);

      self.markdownEditor.value = content;
      done();
    }, done);
  });

  describe('Mode switch', function() {
    beforeEach(function(done) {
      var self = this;
      requirejs(['editor'],function(Editor) {
        self.Editor = Editor;
        done();
      }, done);
    });

    it('allows the mode to be changed to markdown and content updated', function() {
      var editor = new this.Editor(null,null,null,{});
      expect(false).to.be.true;
    });

    it('allows the mode to be changed to html and content updated', function() {
      var editor = new this.Editor(null,null,null,{});
      expect(false).to.be.true;
    });
  });

  describe('Markdown editor', function() {
    beforeEach(function(done) {
      var self = this;
      requirejs(['editor'],function(Editor) {
        self.Editor = Editor;
        done();
      }, done);
    });

    it('allows value to be set', function() {
      var editor = new this.Editor(null,null,null,{});
      expect(false).to.be.true;
    });

    it('allows value to be read', function() {
      var editor = new this.Editor(null,null,null,{});
      expect(false).to.be.true;
    });
  });

  describe('HTML editor', function() {
    beforeEach(function(done) {
      var self = this;
      requirejs(['editor'],function(Editor) {
        self.Editor = Editor;
        done();
      }, done);
    });

    it('allows value to be set', function() {
      var editor = new this.Editor(null,null,null,{});
      expect(false).to.be.true;
    });

    it('allows value to be read', function() {
      var editor = new this.Editor(null,null,null,{});
      expect(false).to.be.true;
    });
  });

  describe('Plugins', function() {
    beforeEach(function(done) {
      var self = this;
      requirejs(['editor'],function(Editor) {
        self.Editor = Editor;
        done();
      }, done);
    });

    it('allows a plugin to be specified and activated', function() {
      var editor = new this.Editor(null,null,null,{});
      var spy = sinon.spy();
      editor.use(spy);
      expect(spy.callCount).to.equal(1);
    });

    it('should pass the plugin an editor instance as an argument', function() {
      var editor = new this.Editor(null,null,null,{});
      var pluginSpy;
      var plugin = function(){
        return function(instance) {
          pluginSpy = instance;
        };
      };
      var spy = sinon.spy(editor, 'use');
      editor.use(plugin());
      expect(pluginSpy).to.equal(editor);
    });

  });

});
