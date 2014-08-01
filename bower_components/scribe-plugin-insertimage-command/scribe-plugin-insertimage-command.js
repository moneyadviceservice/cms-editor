define('scribe-plugin-insertimage-command',[],function () {

  /**
   * This plugin adds a command for inserting images
   */

  return function () {
    return function (scribe) {
      var insertImageCommand = new scribe.api.Command('insertHTML');

      insertImageCommand.nodeName = 'A';
      insertImageCommand.execute = function () {
        var selection = new scribe.api.Selection();
        var range = selection.range;
        var anchorNode = selection.getContaining(function (node) {
          return node.nodeName === this.nodeName;
        }.bind(this));
        var initialImageUrl = 'http://www.moneyadviceservice.org.uk/a/car_campaign/run-car-72698065c95f6c1c8d5e6335f320ac1e.png';
        var imageTagPrefix = '<img src="';
        var imageTagSuffix = '">';
        var imageUrl = window.prompt('Enter an image url.', initialImageUrl);

        if (anchorNode) {
          range.selectNode(anchorNode);
          selection.selection.removeAllRanges();
          selection.selection.addRange(range);
        }

        scribe.api.SimpleCommand.prototype.execute.call(this, imageTagPrefix + imageUrl + imageTagSuffix);
      };

      insertImageCommand.queryState = function () {
        /**
         * We override the native `document.queryCommandState` for links because
         * the `createLink` and `unlink` commands are not supported.
         * As per: http://jsbin.com/OCiJUZO/1/edit?js,console,output
         */
        var selection = new scribe.api.Selection();
        return !! selection.getContaining(function (node) {
          return node.nodeName === this.nodeName;
        }.bind(this));
      };

      scribe.commands.insertImage = insertImageCommand;
    };
  };

});

//# sourceMappingURL=scribe-plugin-link-prompt-command.js.map
