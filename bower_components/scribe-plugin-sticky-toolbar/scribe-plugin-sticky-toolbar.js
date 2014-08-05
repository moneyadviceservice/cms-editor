define('scribe-plugin-sticky-toolbar',['scribe-plugin-toolbar'],function (scribePluginToolbar) {
  return function (toolbarNode) {
    return function (scribe) {
      var toolbarOffsetTop,
          scrolled = false;

      // Instantiate the toolbar plugin
      scribe.use(scribePluginToolbar(toolbarNode));

      // Listen for scroll - TODO Debounce
      document.addEventListener('scroll', function () {
        if(!scrolled){
          toolbarOffsetTop = toolbarNode.offsetTop;
          scrolled = true;
        }
        toolbarNode.classList.toggle('is-sticky', (toolbarOffsetTop <= window.scrollY));
      });
    };
  };

});

///# sourceMappingURL=scribe-plugin-sticky-toolbar.js.map
