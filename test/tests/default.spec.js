describe('CMS Editor', function() {
  before(function(done) {
    var fixtureHTML = window.__html__['test/fixtures/default.html'];
    done();
  });

  describe('Initial test', function() {
    it('true should be true', function() {
      var bool = false;
      expect(bool).to.equal(true);
    });
  });
});
