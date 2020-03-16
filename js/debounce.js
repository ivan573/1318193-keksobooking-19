'use strict';
(function () {

  window.debounce = function (cb) {
    var lastTimeout = null;

    return function () {

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(
          cb, window.utils.DEBOUNCE_INTERVAL);
    };
  };

})();

