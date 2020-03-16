'use strict';

(function () {

  // this array will be used to display the first 5 pins on page activation
  var properties = new Array(5);

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var mapPins = document.querySelector('.map__pins');

  var filters = document.querySelectorAll('.map__filter');

  var checkboxFilters = document.querySelectorAll('#housing-features input');

  // the function renders pins based on the ads array it gets and then displays them on the map
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

  // this function is used to get a random ad from an array so that each time the displayed pins won't be the 1st 5 ads
  var getRandomAd = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  // this function checks whether there are ad objects with missing offer keys.
  // here and in the next function the 'check' variable is declared to be used in the condition so that the function
  // can make less iterations
  var checkMissingOffer = function (array) {
    var check = true;

    for (var k = 0; check === true && k < array.length; k++) {
      check = (array[k].hasOwnProperty('offer'));
    }

    return check;
  };

  // since random ads are added to the array to be displayed, this function checks whether any duplicates are added
  var checkDuplicates = function (array) {
    var check = true;

    for (var j = 0; check === true && j < array.length; j++) {
      check = (array.indexOf(array[j]) === j);
    }

    return check;
  };

  // the function adds a new 'index' keys to the objects so that later on they can be identified to generate a corresponding card
  var addIndices = function (array) {
    var propertyIndex = 0;

    array.forEach(function (it) {
      it.index = propertyIndex;
      propertyIndex++;
    });
  };

  window.adPins = {

    // this array is used to save data with all the adds from server and to show filtering results
    propertiesFromServer: [],

    // the function is executed once the data is loaded.
    // basically, it generates a proper random array and displays the pins using the array
    onSuccess: function (data) {

      window.adPins.propertiesFromServer = data;

      addIndices(window.adPins.propertiesFromServer);

      // that is the place where the declared earlier array gets the first random ads
      for (var i = 0; i < properties.length; i++) {
        properties[i] = getRandomAd(window.adPins.propertiesFromServer);
      }

      var newPropertiesArray;

      // this is where the array gets rid of elements without the 'offer' key and the duplicates
      while ((checkDuplicates(properties) === false) || (checkMissingOffer(properties) === false)) {
        newPropertiesArray = properties.filter(function (it, l) {
          return ((properties.indexOf(it) === l) && (it.hasOwnProperty('offer')));
        });

        while (newPropertiesArray.length < properties.length) {
          newPropertiesArray.push(getRandomAd(window.adPins.propertiesFromServer));
        }

        properties = newPropertiesArray;
      }

      displayPins(properties);

      window.cards.setPinEventListeners();

    },

    // the function shows an error message in case if an error occured on loading data from the server
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

    // the function removes the displayed pins
    removeOldPins: function () {
      var pins = document.querySelectorAll('.map__pins .map__pin:not(.map__pin--main)');
      for (var i = 0; i < pins.length; i++) {
        pins[i].remove();
      }
    }

  };

  // the function is called when a filter is changed and removes old and displays new properties
  var onFilterChange = function () {
    var filteredProperties = window.filterProperties(window.adPins.propertiesFromServer);

    window.adPins.removeOldPins();
    displayPins(filteredProperties);

    window.cards.removeOldCard();

    window.cards.setPinEventListeners();
  };

  var filterDebounce = window.debounce(onFilterChange);

  // the function adds event listeners to the filters
  var addFilterEventListener = function (filtersList) {
    filtersList.forEach(function (it) {
      it.addEventListener('change', function () {
        filterDebounce();
      });
    });
  };

  addFilterEventListener(filters);
  addFilterEventListener(checkboxFilters);

})();
