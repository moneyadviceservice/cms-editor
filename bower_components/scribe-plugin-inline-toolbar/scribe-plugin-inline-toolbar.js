define(
  'scribe-plugin-inline-toolbar',
  ['scribe-plugin-toolbar'],
  function (scribePluginToolbar) {

  return function (toolbarNode) {
    return function (scribe) {
      // Setup toolbar
      scribe.use(scribePluginToolbar(toolbarNode));
      toolbarNode.classList.add('toolbar-inline');
      toolbarNode.style.position = 'absolute';
      toolbarNode.style.display = 'none';

      // Setup browser events
      scribe.el.addEventListener('click', handleUIEvent);
      scribe.el.addEventListener('keyup', handleUIEvent);

      // Setup Scribe events
      scribe.on('content-changed', handleContentChanged);

      function handleUIEvent(event) {
        var selection = new scribe.api.Selection();
        var range = selection.range;
        var clientRects = selection.range.getClientRects()[0];

        if(selection.range.collapsed || event.keyCode === 27) {
          controlToolbar('hide',toolbarNode);
        } else {
          controlToolbar('show',toolbarNode);
        }

        if(clientRects) {
          repositionToolbar(toolbarNode, clientRects);
        }
      }

      function handleContentChanged() {
        var selection = new scribe.api.Selection();
        var clientRects = selection.range && selection.range.getClientRects();
        if(clientRects && clientRects.length) {
          repositionToolbar(toolbarNode, selection.range.getClientRects()[0]);
        }
      }

      function repositionToolbar(toolbarNode, clientRects) {
        var top;
        var left = 0;
        var toolbarCentrePos = toolbarNode.clientWidth / 2;

        top = (clientRects.top - toolbarNode.clientHeight) + window.pageYOffset;

        if(toolbarCentrePos < clientRects.left) {
          left = Math.abs((toolbarCentrePos - clientRects.left)) + clientRects.width / 2;
        }

        if((left + toolbarNode.clientWidth) > document.body.clientWidth) {
          left = document.body.clientWidth - toolbarNode.clientWidth;
        }

        toolbarNode.style.top = top + 'px';
        toolbarNode.style.left = left + 'px';
      }

      function controlToolbar(state, toolbarNode) {
        toolbarNode.style.display = state === 'show' ? 'block' : 'none';
      }
    };
  };

});

///# sourceMappingURL=scribe-plugin-inline-toolbar.js.map
