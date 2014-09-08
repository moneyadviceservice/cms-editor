define([], function () {
  return function(toolbarNode, options) {
    return function() {
      var debounce, affixToolbar;

      affixToolbar = (function(){
        var scrolled = false, toolbarOffsetTop;
        return function(toolbarNode) {
          if(!scrolled){
            toolbarOffsetTop = (function(node) {
              var curTop = 0;

              while (node.tagName !== 'BODY') {
                curTop += node.offsetTop;
                node = node.offsetParent;
              }
              return curTop;
            })(toolbarNode);

            scrolled = true;
          }
          toolbarNode.classList.toggle('is-sticky', (toolbarOffsetTop <= window.scrollY));
        };
      })();

      affixToolbar(toolbarNode);

      document.addEventListener('scroll', function () {
        clearTimeout(debounce);
        debounce = setTimeout(function() {
          affixToolbar(toolbarNode);
        }, 120);
      });

    };
  };
});
