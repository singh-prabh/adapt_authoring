// LICENCE https://github.com/adaptlearning/adapt_authoring/blob/master/LICENSE
(function() {
  var origin;

  function loadLibraries(callback) {
    require([
      'ace/ace',
      'imageReady',
      'inview',
      'jqueryForm',
      'jqueryUI',
      'mediaelement',
      'scrollTo',
      'sweetalert',
      'velocity'
    ], callback);
  }

  function loadCore(callback) {
    require([
      'templates/templates',
      'core/origin',
      'core/router',
      'core/permissions',
      'core/l10n',
      'core/constants',
      'core/contextMenu',
      'core/contentPane'
    ], function(Templates, Origin, Router) {
      origin = Origin;
      origin.router = new Router();

      var constantsLoaded = false;
      var l10nLoaded = false;
      origin.once('constants:loaded', function() {
        constantsLoaded = true;
        if(l10nLoaded) callback();
      });
      origin.once('l10n:loaded', function() {
        l10nLoaded = true;
        if(constantsLoaded) callback();
      });
    });
  }

  function loadAddOns(callback) {
    require([
      'modules/modules',
      'plugins/plugins'
    ], callback);
  }

  /**
  * Start app load
  */
  loadLibraries(function() {
    loadCore(function() {
      loadAddOns(function() {
        origin.initialize();
      });
    });
  });
})();