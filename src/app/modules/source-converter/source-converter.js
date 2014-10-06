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
      src = marked(src).replace(/([$=]+[a-z\W]*[=$])/igm, '<pre>' + $1 + '</pre>');
      console.log('toHTML', src);
      return src;
    };

    var toMarkdown = function(src) {
      var src = src.replace([$=]+[a-z\W]*[=$]);
      console.log('toMarkdown', var2);
      return tomarkdown(src);
    };

    return {
      toHTML : toHTML,
      toMarkdown : toMarkdown
    };
  })();
});
