'use strict';

(function () {

  var getRandomIndex = function (array) {
    return Math.floor(Math.random() * (array.length - window.utils.MAX_ADS_TO_DISPLAY - 1));
  };

  var getData = {
    getHousingType: function () {
      return document.querySelector('#housing-type').value;
    },
    getHousingPrice: function () {
      return document.querySelector('#housing-price').value;
    },
    getHousingRooms: function () {
      return document.querySelector('#housing-rooms').value;
    },
    getHousingGuests: function () {
      return document.querySelector('#housing-guests').value;
    }
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

    if (property.offer.type === getData.getHousingType()) {
      rank++;
    }

    switch (getData.getHousingPrice()) {
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

    if (property.offer.rooms === Number(getData.getHousingRooms())) {
      rank++;
    }

    switch (getData.getHousingGuests()) {
      case (0):
        if (property.offer.guests === Number(getData.getHousingGuests())) {
          rank++;
        }
        break;
      default:
        if (property.offer.guests >= getData.getHousingGuests() && Number(getData.getHousingGuests()) !== 0) {
          rank++;
        }
        break;
    }

    rank += compareFeatures(property.offer.features);

    return rank;
  };

  var countFilters = function () {
    var filters = 0;

    for (var key in getData) {
      if (getData[key]() !== 'any') {
        filters++;
      }
    }

    filters += getHousingFeatures().length;
    return filters;
  };

  window.filterProperties = function (array) {

    var filteredProperties = array.slice()
      .filter(function (element) {
        return getRank(element) >= countFilters();
      })
      .sort(function (a, b) {
        var rankDiff = getRank(b) - getRank(a);
        if (rankDiff === 0) {
          rankDiff = array.indexOf(a) - array.indexOf(b);
        }
        return rankDiff;
      });

    var randomIndex = getRandomIndex(array);

    return filteredProperties.length <= window.utils.MAX_ADS_TO_DISPLAY ? filteredProperties :
      filteredProperties.slice(randomIndex, randomIndex + window.utils.MAX_ADS_TO_DISPLAY);
  };

})();
