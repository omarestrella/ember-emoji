(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['emojione'],
      __esModule: true,
    };
  }

  define('emojione', [], vendorModule);
})();
