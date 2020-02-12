'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (property) {
    var pin = pinTemplate.cloneNode(true);

    pin.style = 'left: ' + (property.offer.location.x - PIN_WIDTH / 2) + 'px; top: ' + (property.offer.location.y - PIN_HEIGHT) + 'px;';
    pin.querySelector('img').src = property.author.avatar;
    pin.querySelector('img').alt = property.offer.title;

    return pin;
  };

  window.getPropertiesFragment = function () {
    var fragment = document.createDocumentFragment();

    window.properties.forEach(function (property) {
      fragment.appendChild(renderPin(property));
    });

    return fragment;
  };

})();

