define('source-converter', [
  'marked',
  'to-markdown'
], function (
  marked,
  tomarkdown
) {
  'use strict';
  return (function() {
    var toHTML = function(src) {
      return marked(src);
    };

    var toMarkdown = function(src) {
      return tomarkdown(src);
    };

    return {
      toHTML : toHTML,
      toMarkdown : toMarkdown
    };
  })();
});