define('source-converter', [
  'marked',
  'to-markdown'
], function (
  marked,
  toMarkdownConverter
) {
  'use strict';

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
