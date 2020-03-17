'use strict';

(function () {

  // this array will be used to display the first 5 pins on page activation
  var properties = new Array(5);

  var pinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');

  var mapPinsElement = document.querySelector('.map__pins');

  var filterElements = document.querySelectorAll('.map__filter');

  var checkboxFilterElements = document.querySelectorAll('#housing-features input');

  // the function renders pins based on the ads array it gets and then displays them on the map
  var displayPins = function (array) {

    var fragment = document.createDocumentFragment();

    var renderPin = function (property) {

      var pinElementClone = pinTemplateElement.cloneNode(true);

      pinElementClone.style = 'left: ' + (property.location.x - window.utils.PIN_WIDTH / 2) + 'px; top: ' + (property.location.y - window.utils.PIN_HEIGHT) + 'px;';
      pinElementClone.querySelector('img').src = property.author.avatar;
      pinElementClone.querySelector('img').alt = property.offer.title;

      pinElementClone.setAttribute('index', property.index);

      return pinElementClone;
    };

    array.forEach(function (property) {
      fragment.appendChild(renderPin(property));
    });

    mapPinsElement.appendChild(fragment);

  };

  // this function is used to get a random ad from an array so that each time the displayed pins won't be the 1st 5 ads
  var getRandomAd = function (array) {
    return array[Math.floor(Math.random() * array.length)];
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

      // removing the ads that do not have 'offer' element
      window.adPins.propertiesFromServer = data.filter(function (it) {
        return it.hasOwnProperty('offer');
      });

      addIndices(window.adPins.propertiesFromServer);

      if (window.adPins.propertiesFromServer.length > properties.length) {
        // that is the place where the declared earlier array gets random ads
        for (var i = 0; i < properties.length; i++) {
          var randomAd = getRandomAd(window.adPins.propertiesFromServer);
          while (properties.indexOf(randomAd) !== -1) {
            randomAd = getRandomAd(window.adPins.propertiesFromServer);
          }
          properties[i] = randomAd;
        }
      } else {
        properties = window.adPins.propertiesFromServer;
      }


      displayPins(properties);

      window.cards.setPinEventListeners();

    },

    // the function shows an error message in case if an error occured on loading data from the server
    onError: function (data) {
      var nodeElement = document.createElement('div');
      nodeElement.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      nodeElement.style.position = 'absolute';
      nodeElement.style.left = 0;
      nodeElement.style.right = 0;
      nodeElement.style.fontSize = '30px';

      nodeElement.textContent = data;
      document.body.insertAdjacentElement('afterbegin', nodeElement);
    },

    // the function removes the displayed pins
    removeOldPins: function () {
      var pinElements = document.querySelectorAll('.map__pins .map__pin:not(.map__pin--main)');
      pinElements.forEach(function (it) {
        it.remove();
      });
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

  addFilterEventListener(filterElements);
  addFilterEventListener(checkboxFilterElements);

})();
