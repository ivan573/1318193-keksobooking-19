'use strict';

(function () {

  var MAX_ADS_TO_DISPLAY = 5;

  var getRandomIndex = function (array) {
    return Math.floor(Math.random() * (array.length - MAX_ADS_TO_DISPLAY - 1));
  };

  var getFilterPropertyType = function () {
    return document.querySelector('#housing-type').value;
  };

  window.filterProperties = function (array) {

    var filteredProperties = array.filter(function (element) {
      return element.offer.type === getFilterPropertyType();
    });

    if (filteredProperties.length <= MAX_ADS_TO_DISPLAY) {
      return filteredProperties;
    } else {
      var randomIndex = getRandomIndex(array);
      return filteredProperties.slice(randomIndex, randomIndex + (MAX_ADS_TO_DISPLAY - 1));

    }

    // return array.filter(function (element) {
    //   return element.offer.type === getFilterPropertyType();
    // })
    // .slice(0, (MAX_ADS_TO_DISPLAY - 1));
  };

})();
