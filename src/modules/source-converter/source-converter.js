define(
  'source-converter',
  [
   'marked'
  ],
  function (
    marked
  ) {
  return (function() {
    var toHTML = function(src) {
      return marked(src);
    };

    var toMASMarkdown = function(src) {
      return toMarkdown(src);
    };

    return {
      toHTML : toHTML,
      toMASMarkdown : toMASMarkdown
    };
  })();
});
