define('editor-plugin-sticky-toolbar', [], function () {
  return function(toolbarNode, options) {
    return function() {
      var getViewportOffsetTop,
          affixToolbar,
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

      affixToolbar = function (toolbarNode) {
        if(!scrolled){
          toolbarOffsetTop = getViewportOffsetTop(toolbarNode);
          scrolled = true;
        }
        toolbarNode.classList.toggle('is-sticky', (toolbarOffsetTop <= window.scrollY));
      };

      affixToolbar();

      document.addEventListener('scroll', function () {
        clearTimeout(debounce);
        debounce = setTimeout(function() {
          affixToolbar(toolbarNode);
        }, 120);
      });


    };
  };
});
