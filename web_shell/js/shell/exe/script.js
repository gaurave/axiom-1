define(
  "shell/exe/script",
  ["axiom/core/error", "wash/washrc", "exports"],
  function(axiom$core$error$$, wash$washrc$$, __exports__) {
    "use strict";

    function __es6_export__(name, value) {
      __exports__[name] = value;
    }

    var AxiomError;
    AxiomError = axiom$core$error$$["default"];
    var Washrc;
    Washrc = wash$washrc$$["default"];

    /** @typedef ExecuteContext$$module$axiom$bindings$fs$execute_context */
    var ExecuteContext;

    /** @typedef JsExecutable$$module$axiom$fs$js_executable */
    var JsExecutable;

    var IMPORT_CMD_USAGE_STRING = 'usage: script <url>';

    /**
     * An executable to import cross origin script into the shell.
     *
     * @this {JsExecutable}
     * @param {ExecuteContext} cx
     */
    var main = function(cx) {
      cx.ready();

      var list = cx.getArg('_', []);

      if (list.length != 1 || cx.getArg('help')) {
        cx.stdout.write(IMPORT_CMD_USAGE_STRING + '\n');
        cx.closeOk();
        return;
      }

      var url = list[0];

      var s = document.createElement('script');
      s.src = url;
      s.type = 'text/javascript';

      var state = 0;

      s.ready = function(callback) {
        if (!state) {
          callback(cx);
          state = 1;
          if (cx.getArg('save')) {
            var washrc = new Washrc(cx);
            var args = {};
            args['_'] = list;
            washrc.append({'script': args}).then(function() {
              cx.closeOk();
            });
          } else {
            cx.closeOk();
          }
          return;
        }

        if (state === 1) {
          cx.closeError(new AxiomError.Runtime(
              'Duplicate call to script callback.'));
          return;
        }

          cx.closeError(new AxiomError.Runtime(
              'Import script callback called after a timeout.'));
          return;
      };

      document.head.appendChild(s);

      window.setTimeout(function() {
        // import script request timed out.
        if (!state) {
          state = 2;
          cx.closeError(new AxiomError.Runtime('Import script request timed out.'));
        }
      }, 5000);
    };

    __es6_export__("main", main);
    __es6_export__("default", main);

    /**
     * Accept any value for the execute context arg.
     */
    main.signature = {
      'help|h': '?',
      'save|s': '?',
      '_': '@'
    };
  }
);

//# sourceMappingURL=script.js.map