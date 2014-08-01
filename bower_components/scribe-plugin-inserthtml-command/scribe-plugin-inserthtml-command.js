define(['scribe-common/src/element'], function (element) {

  /**
   * This plugin modifies the `unlink` command so that, when the user's
   * selection is collapsed, remove the containing A.
   */

  'use strict';
  return function () {
    return function (scribe) {
      console.log('var1');
      var insertHTMLCommand = new scribe.api.Command('insertHTML');

      insertHTMLCommand.execute = function () {
        console.log('execute');
        scribe.insertHTML('some html');
        // command.execute();
      };

      insertHTMLCommand.queryEnabled = function () {
        // var command = scribe.getCommand('insertHTML').execute('some html');
        return command.queryEnabled();
      };

      insertHTMLCommand.queryState = function () {
        console.log('state');
        var selection = new scribe.api.Selection();
        var blockquoteElement = selection.getContaining(function (element) {
          return element.nodeName === 'BLOCKQUOTE';
        });

        return scribe.allowsBlockElements() && !! blockquoteElement;
      };

      scribe.commands.insertHTML = insertHTMLCommand;

      // /**
       // * If the paragraphs option is set to true, we unapply the blockquote on
      //  * <enter> keypresses if the caret is on a new line.
      //  */
      // if (scribe.allowsBlockElements()) {
      //   scribe.el.addEventListener('keydown', function (event) {
      //     if (event.keyCode === 13) { // enter

      //       var command = scribe.getCommand('blockquote');
      //       if (command.queryState()) {
      //         var selection = new scribe.api.Selection();
      //         if (selection.isCaretOnNewLine()) {
      //           event.preventDefault();
      //           command.execute();
      //         }
      //       }
      //     }
      //   });
      // }
    };
  };

});

//# sourceMappingURL=scribe-plugin-blockquote-command.js.map
