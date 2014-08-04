define('scribe-plugin-inserttable-command',[],function () {

  /**
   * This plugin adds a command for inserting tables (in Markdown)
   */

  return function () {
    return function (scribe) {
      var insertTableCommand = new scribe.api.Command('insertHTML');
      insertTableCommand.nodeName = 'PRE';

      insertTableCommand.execute = function () {
        scribe.api.SimpleCommand.prototype.execute.call(this, '<pre>one|two|three</pre>');
      };

     insertTableCommand.queryState = function () {
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

      /**
       * All: Executing a heading command inside a list element corrupts the markup.
       * Disabling for now.
       */
      insertTableCommand.queryEnabled = function () {
        var selection = new scribe.api.Selection();
        var preNode = selection.getContaining(function (node) {
          return node.nodeName === 'PRE';
        });

        return scribe.api.Command.prototype.queryEnabled.apply(this, arguments)
          && scribe.allowsBlockElements() && ! preNode;
      };

      scribe.commands.insertTable = insertTableCommand;
    };
  };

});

//# sourceMappingURL=scribe-plugin-link-prompt-command.js.map
