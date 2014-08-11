define('source-converter', [
  'marked',
  'to-markdown'
], function (
  marked,
  toMarkdownFn
) {
  'use strict';
  return (function() {
    var toHTML = function(src) {
      return marked(src);
    };

    var toMarkdown = function(src) {
      return toMarkdownFn(src);
    };

    return {
      toHTML : toHTML,
      toMarkdown : toMarkdown
    };
  })();
});
