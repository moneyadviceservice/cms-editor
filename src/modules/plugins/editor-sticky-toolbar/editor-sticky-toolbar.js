define('editor-plugin-sticky-toolbar', [], function () {
  return function(toolbarNode, options) {
    return function() {
      var getViewportOffsetTop,
          toolbarOffsetTop,
          scrolled = false,
          debounce;

      getViewportOffsetTop = function(node) {
        var curTop = 0;

        while (node.tagName !== 'BODY') {
          curTop += node.offsetTop;
          node = node.offsetParent;
        }
        return curTop;
      };

      document.addEventListener('scroll', function () {
        clearTimeout(debounce);
        debounce = setTimeout(function() {
          if(!scrolled){
            toolbarOffsetTop = getViewportOffsetTop(toolbarNode);
            scrolled = true;
          }
          toolbarNode.classList.toggle('is-sticky', (toolbarOffsetTop <= window.scrollY));
        }, 120);
      });
    };
  };
});
