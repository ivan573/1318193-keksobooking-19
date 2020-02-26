'use strict';

(function () {

  var getFilterPropertyType = function () {

    var type = document.querySelector('#housing-type').value;

    return type;
  };

  window.filterProperties = function (array) {

    var filteredProperties = array.filter(function (element) {

      return element.offer.type === getFilterPropertyType();
    });

    return filteredProperties;
  };

})();
