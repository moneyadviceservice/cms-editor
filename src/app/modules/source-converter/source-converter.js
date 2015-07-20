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
      var renderer = new marked.Renderer();

      renderer.link = titlifyLinks;

      marked.setOptions({
        breaks: true,
        tables: false,
        renderer: renderer
      });
      return marked(src);
    };

    var titlifyLinks = function(href, title, text) {
      return '<a href="' + href + '" title="' + href + '">' + text + '</a>';
    };

    var toMarkdown = function(source) {
      return tomarkdown(preprocessHtmlSource(source));
    };

    var preprocessHtmlSource = function(source) {
      var html = document.createElement('div'),
          links,
          i;

      html.innerHTML = source;
      links = html.querySelectorAll('a');

      for (i = 0; i < links.length; ++i) {
        links[i].title = "";
      }

      return html.innerHTML;
    };

    return {
      toHTML : toHTML,
      toMarkdown : toMarkdown
    };
  })();
});
