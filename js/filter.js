'use strict';

(function () {

  var getFilterPropertyType = function () {

    return document.querySelector('#housing-type').value;
  };

  window.filterProperties = function (array) {

    return array.filter(function (element) {
      return element.offer.type === getFilterPropertyType();
    });
  };

})();
