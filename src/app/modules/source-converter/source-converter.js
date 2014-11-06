define([
  'marked',
  'to-markdown'
], function (
  marked,
  tomarkdown
) {
  'use strict';
  return (function() {
    var toHTML = function(src) {
      marked.setOptions({
        breaks: true
      });
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
