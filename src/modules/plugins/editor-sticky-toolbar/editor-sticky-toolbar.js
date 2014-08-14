define('editor-plugin-sticky-toolbar', [], function () {
  return function(toolbarNode, options) {
    return function() {
      var toolbarOffsetTop,
          scrolled = false;

      var getViewportOffsetTop = function(node) {
        var curTop = 0;

        while (node.tagName !== 'BODY') {
          curTop += node.offsetTop;
          node = node.offsetParent;
        }
        return curTop;
      };

      // Listen for scroll - TODO Debounce
      document.addEventListener('scroll', function () {
        if(!scrolled){
          toolbarOffsetTop = getViewportOffsetTop(toolbarNode);
          scrolled = true;
        }
        toolbarNode.classList.toggle('is-sticky', (toolbarOffsetTop <= window.scrollY));
      });
    };
  };
});
