define('scribe-plugin-sticky-toolbar',['scribe-plugin-toolbar'],function () {
  return function (toolbarNode) {
    return function (scribe) {
      var toolbarOffsetTop = toolbarNode.offsetTop;
      document.addEventListener('scroll', function () {
        toolbarNode.classList.toggle('is-sticky', (toolbarOffsetTop <= window.scrollY));
      });
    };
  };

});

//# sourceMappingURL=scribe-plugin-toolbar.js.map
