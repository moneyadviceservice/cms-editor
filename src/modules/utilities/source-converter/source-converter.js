define(
  'source-converter',
  [
   'marked',
   'to-markdown'
  ],
  function (
    marked,
    toMarkdownConverter
  ) {
  return (function() {
    var toHTML = function(src) {
      return marked(src);
    };

    var toMarkdown = function(src) {
      return toMarkdownConverter(src);
    };

    return {
      toHTML : toHTML,
      toMarkdown : toMarkdown
    };
  })();
});
