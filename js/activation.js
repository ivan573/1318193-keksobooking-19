'use strict';

(function () {
  var ENTER_KEY = 'Enter';

  var adsMap = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');

  var formInputs = document.querySelectorAll('.ad-form input');
  var formSelects = document.querySelectorAll('.ad-form select');

  var setDisabled = function (element) {
    for (var j = 0; j < element.length; j++) {
      element[j].setAttribute('disabled', 'disabled');
    }
  };

  var removeDisabled = function (element) {
    for (var k = 0; k < element.length; k++) {
      element[k].removeAttribute('disabled', 'disabled');
    }
  };

  setDisabled(formInputs);
  setDisabled(formSelects);

  window.mainPin = document.querySelector('.map__pin--main');

  var activatePage = function () {
    if (adsMap.classList.contains('map--faded') && adForm.classList.contains('ad-form--disabled')) {
      adsMap.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      removeDisabled(formInputs);
      removeDisabled(formSelects);

      window.backend.load(window.adPins.onSuccess, window.adPins.onError);
    }
  };

  window.deactivatePage = function () {
    adsMap.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    setDisabled(formInputs);
    setDisabled(formSelects);
    window.adPins.removeOldPins();
    window.cards.removeOldCards();
  };

  window.mainPin.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {
      activatePage();
    }
  });

  window.mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      activatePage();
    }
  });

})();

