'use strict';

(function () {

  var properties = new Array(5);

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var mapPins = document.querySelector('.map__pins');

  var filters = document.querySelectorAll('.map__filter');

  var checkboxFilters = document.querySelectorAll('#housing-features input');

  var displayPins = function (array) {

    var fragment = document.createDocumentFragment();

    var renderPin = function (property) {

      var pin = pinTemplate.cloneNode(true);

      pin.style = 'left: ' + (property.location.x - window.utils.PIN_WIDTH / 2) + 'px; top: ' + (property.location.y - window.utils.PIN_HEIGHT) + 'px;';
      pin.querySelector('img').src = property.author.avatar;
      pin.querySelector('img').alt = property.offer.title;

      pin.setAttribute('index', property.index);

      return pin;
    };

    array.forEach(function (property) {
      fragment.appendChild(renderPin(property));
    });

    mapPins.appendChild(fragment);

  };

  var getRandomAd = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var checkMissingOffer = function (array) {
    var check = true;

    for (var k = 0; check === true && k < array.length; k++) {
      check = (array[k].hasOwnProperty('offer'));
    }

    return check;
  };

  var checkDuplicates = function (array) {
    var check = true;

    for (var j = 0; check === true && j < array.length; j++) {
      check = (array.indexOf(array[j]) === j);
    }

    return check;
  };

  var addIndices = function (array) {
    var propertyIndex = 0;

    array.forEach(function (it) {
      it.index = propertyIndex;
      propertyIndex++;
    });
  };

  window.adPins = {

    propertiesFromServer: [],

    onSuccess: function (data) {

      window.adPins.propertiesFromServer = data;

      addIndices(window.adPins.propertiesFromServer);

      for (var i = 0; i < properties.length; i++) {
        properties[i] = getRandomAd(window.adPins.propertiesFromServer);
      }

      var propertiesWithOffer;

      while (checkMissingOffer(properties) === false) {
        propertiesWithOffer = properties.filter(function (it, l) {
          return properties[l].hasOwnProperty('offer');
        });

        while (propertiesWithOffer.length < properties.length) {
          propertiesWithOffer.push(getRandomAd(window.adPins.propertiesFromServer));
        }

        properties = uniqueProperties;
      }

      var uniqueProperties;

      while (checkDuplicates(properties) === false) {
        uniqueProperties = properties.filter(function (it, m) {
          return properties.indexOf(it) === m;
        });

        while (uniqueProperties.length < properties.length) {
          uniqueProperties.push(getRandomAd(window.adPins.propertiesFromServer));
        }

        properties = uniqueProperties;
      }

      displayPins(properties);

      window.cards.setPinEventListeners();

    },

    onError: function (data) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = data;
      document.body.insertAdjacentElement('afterbegin', node);
    },

    removeOldPins: function () {
      var pins = document.querySelectorAll('.map__pins .map__pin:not(.map__pin--main)');
      for (var i = 0; i < pins.length; i++) {
        pins[i].remove();
      }
    }

  };

  var onFilterChange = function () {
    var filteredProperties = window.filterProperties(window.adPins.propertiesFromServer);

    window.adPins.removeOldPins();
    displayPins(filteredProperties);

    window.cards.removeOldCard();

    window.cards.setPinEventListeners();
  };

  var debounce = window.debounce(onFilterChange);

  var addFilterEventListener = function (filtersList) {
    filtersList.forEach(function (it) {
      it.addEventListener('change', function () {
        debounce();
      });
    });
  };

  addFilterEventListener(filters);
  addFilterEventListener(checkboxFilters);

})();
