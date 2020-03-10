'use strict';

(function () {

  var MAX_ADS_TO_DISPLAY = 5;

  var getRandomIndex = function (array) {
    return Math.floor(Math.random() * (array.length - MAX_ADS_TO_DISPLAY - 1));
  };

  var getHousingType = function () {
    return document.querySelector('#housing-type').value;
  };

  var getHousingPrice = function () {
    return document.querySelector('#housing-price').value;
  };

  var getHousingGuests = function () {
    return document.querySelector('#housing-guests').value;
  };

  var getHousingFeatures = function () {
    var array = [];
    document.querySelectorAll('#housing-features input:checked').forEach(function (it) {
      array.push(it.value);
    });
    return array;
  };

  var getRank = function (property) {
    var rank = 0;
    if (property.offer.type === getHousingType()) {
      rank++;
    }
    switch(getHousingPrice()) {
      case ('middle'):
        if (property.offer.price >= 10000 && property.offer.price < 50000) {
          rank++;
        }
        break;
      case ('low'):
        if (property.offer.price < 10000) {
          rank++;
        }
    }
  };

  console.log(getHousingPrice());

  window.filterProperties = function (array) {

    var filteredProperties = array.filter(function (element) {
      return element.offer.type === getFilterPropertyType(); // housing type
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
