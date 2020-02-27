'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var properties = new Array(5);

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var mapPins = document.querySelector('.map__pins');

  var propertyType = document.querySelector('#housing-type');

  var propertiesFromServer;

  window.adPins = {
    onSuccess: function (data) {

      propertiesFromServer = data;

      var getRandomAd = function () {
        return propertiesFromServer[Math.floor(Math.random() * propertiesFromServer.length)];
      };

      for (var i = 0; i < properties.length; i++) {
        properties[i] = getRandomAd();
      }

      var checkDuplicates = function (array) {

        var check = true;

        for (i = 0; check === true && i < array.length; i++) {
          check = (array.indexOf(array[i]) === i);
        }

        return check;

      };

      var uniqueProperties;

      while (checkDuplicates(properties) === false) {

        uniqueProperties = properties.filter(function (it, j) {
          return properties.indexOf(it) === j;
        });

        while (uniqueProperties.length !== properties.length) {
          uniqueProperties.push(getRandomAd());
        }

        properties = uniqueProperties;

      }

      window.adPins.displayPins(properties);

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

    displayPins: function (array) {

      var fragment = document.createDocumentFragment();

      var renderPin = function (property) {
        var pin = pinTemplate.cloneNode(true);

        pin.style = 'left: ' + (property.location.x - PIN_WIDTH / 2) + 'px; top: ' + (property.location.y - PIN_HEIGHT) + 'px;';
        pin.querySelector('img').src = property.author.avatar;
        pin.querySelector('img').alt = property.offer.title;

        return pin;
      };

      array.forEach(function (property) {
        fragment.appendChild(renderPin(property));
      });

      mapPins.appendChild(fragment);

    }

  };

  var removeOldPins = function () {
    var pins = document.querySelectorAll('.map__pins .map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  };

  propertyType.addEventListener('change', function () {
    removeOldPins();
    if (propertyType.value === 'any') {
      window.adPins.displayPins(properties); // тут, возможно, нужно как-то допилить
    } else {
      window.adPins.displayPins(window.filterProperties(propertiesFromServer));
    }
  });

})();

