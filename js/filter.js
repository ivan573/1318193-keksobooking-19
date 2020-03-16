'use strict';

(function () {

  // this function returns a random index so that there is an element of random when a filters is applied and there is
  // more than 5 pins to be displayed. using it a slice of the array with more than 5 ads can be get.
  var getRandomIndex = function (array) {
    return Math.floor(Math.random() * (array.length - window.utils.MAX_ADS_TO_DISPLAY - 1));
  };

  // object with functions to get the current states of the filter so that it can be counted how many of them are being used
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

  // the features state is sepparate because it is count differently
  var getHousingFeatures = function () {
    return document.querySelectorAll('#housing-features input:checked');
  };

  // this function compares (counts) the used features filters and the features that a property has
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

  // this function counts how many things that might be filtered the property has. it compares them with the actual filters state
  // so that the ones, which has less, can be filtered and never added to the array to be displayed. thus, if property has
  // a thing that matches the filter it gets plus 1 to the rank. if the rank will be less than the used filters,
  // the property won't be considered.
  var getRank = function (property) {
    var rank = 0;

    // type
    if (property.offer.type === getData.getHousingType()) {
      rank++;
    }

    // price
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

    // rooms
    if (property.offer.rooms === Number(getData.getHousingRooms())) {
      rank++;
    }

    // guests. if the property can host more guests than set in the filter, it still counts.
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

  // this function counts the number of used filters for the comparison
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

  // the function filters the array of all the ads according to the logic described above
  window.filterProperties = function (array) {

    var filteredProperties = array.slice()
      .filter(function (element) {
        return getRank(element) >= countFilters(); // the rank and used filters comparison
      });

    var randomIndex = getRandomIndex(array); // here a random index is assigned to a variable so it cab be used twicc

    // if filtered array length is 5 or less, the function just returns it, otherwise it returns a random slice
    return filteredProperties.length <= window.utils.MAX_ADS_TO_DISPLAY ? filteredProperties :
      filteredProperties.slice(randomIndex, randomIndex + window.utils.MAX_ADS_TO_DISPLAY);
  };

})();
