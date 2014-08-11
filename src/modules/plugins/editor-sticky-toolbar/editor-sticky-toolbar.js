define('editor-plugin-sticky-toolbar', [], function () {
  return function(toolbarNode, options) {
    return function() {
      var toolbarOffsetTop,
          scrolled = false;

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
