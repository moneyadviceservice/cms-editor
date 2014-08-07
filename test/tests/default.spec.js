describe('CMS Editor', function() {
  before(function(done) {
    var that = this;

    document.body.innerHTML = window.__html__['test/fixtures/default.html'];
    this.editorSelector = '#editor';

    requirejs(['helpers','text!test/helpers/content/content.md'], function (helpers, content) {
      that.helpers = helpers;
      that.editor = document.querySelector(that.editorSelector);
      that.editor.value = content;
      done();
    }, done);
  });

  describe('Initial test', function() {
    it('true should be true', function() {
      var bool = false;
      expect(bool).to.equal(true);
    });
  });
});
