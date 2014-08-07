describe('CMS Editor', function() {
  before(function(done) {
    var that = this;

    this.html = window.__html__['test/fixtures/default.html'];
    document.body.innerHTML = this.html;
    this.editorSelector = '#editor';

    requirejs(['helpers'],function (helpers) {
      that.helpers = helpers;
      that.editor = document.querySelector(that.editorSelector);
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
