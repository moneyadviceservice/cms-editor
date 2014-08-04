define('scribe-plugin-inserthtml-command',[],function () {

  /**
   * This plugin adds a command for inserting Markdown snippets
   */

  return function () {
    return function (scribe) {
      var insertSnippetCommand = new scribe.api.Command('insertHTML');
      insertSnippetCommand.nodeName = 'PRE';

      insertSnippetCommand.execute = function () {
        var htmlSnippet = '<pre>'
          + '$callout\n'
          + '^ Title\n'
          + '^^ Content can be added here\n'
          + '$'
          '</pre>';

        scribe.api.SimpleCommand.prototype.execute.call(this, htmlSnippet);
      };

     insertSnippetCommand.queryState = function () {
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
      insertSnippetCommand.queryEnabled = function () {
        var selection = new scribe.api.Selection();
        var preNode = selection.getContaining(function (node) {
          return node.nodeName === 'PRE';
        });

        return scribe.api.Command.prototype.queryEnabled.apply(this, arguments)
          && scribe.allowsBlockElements() && ! preNode;
      };

      scribe.commands.insertSomething = insertSnippetCommand;
    };
  };

});

///# sourceMappingURL=scribe-plugin-inserthtml-command.js.map
