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

  var getHousingRooms = function () {
    return document.querySelector('#housing-rooms').value;
  };

  var getHousingGuests = function () {
    return document.querySelector('#housing-guests').value;
  };

  var getHousingFeatures = function () {
    return document.querySelectorAll('#housing-features input:checked');
  };

  var compareFeatures = function (currentFeatures) {
    var comparisonRank = 0;
    getHousingFeatures().forEach(function (it) {
      var check = false;
      for (var i = 0; i < currentFeatures.length && check === false; i++) {
        check = (currentFeatures[i] === it.value);
      }
      if (check) {
        comparisonRank++;
      }
    });
    return comparisonRank;
  };

  var getRank = function (property) {
    var rank = 0;

    if (property.offer.type === getHousingType()) {
      rank++;
    }

    switch (getHousingPrice()) {
      case ('middle'):
        if (property.offer.price >= 10000 && property.offer.price < 50000) {
          rank++;
        }
        break;
      case ('low'):
        if (property.offer.price < 10000) {
          rank++;
        }
        break;
      case ('high'):
        if (property.offer.price >= 50000) {
          rank++;
        }
        break;
    }

    if (property.offer.rooms === Number(getHousingRooms())) { // так вообще можно делать?
      rank++;
    }

    switch (getHousingGuests()) {
      case (0):
        if (property.offer.guests === Number(getHousingGuests())) { // и вот так
          rank++;
        }
        break;
      default:
        if (property.offer.guests <= getHousingGuests()) {
          rank++;
        }
        break;
    }

    rank += compareFeatures(property.offer.features);

    return rank;
  };

  var countFilters = function () {
    var filters = 0;
    if (getHousingType() !== 'any') {
      filters++;
    }
    if (getHousingPrice() !== 'any') {
      filters++;
    }
    if (getHousingRooms() !== 'any') {
      filters++;
    }
    if (getHousingGuests() !== 'any') {
      filters++;
    }
    filters += getHousingFeatures().length;
    return filters;
  };

  window.filterProperties = function (array) {

    var filteredProperties = array.slice().
      filter(function (element) {
        return getRank(element) >= countFilters();
      }).
      sort(function (a, b) {
        var rankDiff = getRank(b) - getRank(a);
        if (rankDiff === 0) {
          rankDiff = array.indexOf(a) - array.indexOf(b);
        }
        return rankDiff;
      });

    // var filteredProperties = array.filter(function (element) {
    //   return element.offer.type === getFilterPropertyType(); // housing type
    // });

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
