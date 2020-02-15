'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var properties = new Array(8);

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var mapPins = document.querySelector('.map__pins');

  window.adPins = {
    onSuccess: function (data) {

      for (var i = 0; i < properties.length; i++) {
        properties[i] = data[Math.floor(Math.random() * data.length)];
      }

      var fragment = document.createDocumentFragment();

      var renderPin = function (property) {
        var pin = pinTemplate.cloneNode(true);

        pin.style = 'left: ' + (property.location.x - PIN_WIDTH / 2) + 'px; top: ' + (property.location.y - PIN_HEIGHT) + 'px;';
        pin.querySelector('img').src = property.author.avatar;
        pin.querySelector('img').alt = property.offer.title;

        return pin;
      };

      properties.forEach(function (property) {
        fragment.appendChild(renderPin(property));
      });

      mapPins.appendChild(fragment);
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
    }

  };

})();

