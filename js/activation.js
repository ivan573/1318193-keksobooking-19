'use strict';

(function () {

  window.activation = {

    mainPin: document.querySelector('.map__pin--main'),

    disableForm: function () {
      for (var key in formElements) {
        if (!isDisabled(formElements, key)) {
          setDisabled(formElements[key]);
        }
      }
    },

    enableForm: function () {
      for (var key in formElements) {
        if (isDisabled(formElements, key)) {
          removeDisabled(formElements[key]);
        }
      }
    },

    deactivatePage: function () {
      adsMap.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
      window.activation.disableForm();
      window.adPins.removeOldPins();
      window.cards.removeOldCard();

      window.activation.mainPin.style.left = mainPinStartingPosition.x + 'px';
      window.activation.mainPin.style.top = mainPinStartingPosition.y + 'px';
    }

  };

  var mainPinStartingPosition = {
    x: window.activation.mainPin.offsetLeft,
    y: window.activation.mainPin.offsetTop
  };

  var adsMap = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');

  var formElements = {
    formInputs: document.querySelectorAll('.ad-form input'),
    formSelects: document.querySelectorAll('.ad-form select'),
    formTextArea: document.querySelectorAll('#description'),
    formButtons: document.querySelectorAll('.ad-form button')
  };

  var isDisabled = function (obj, key) {
    var check = false;
    for (var i = 0; i < obj[key].length && check === false; i++) {
      check = obj[key][i].hasAttribute('disabled');
    }
    return check;
  };

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

  var enableForm = function () {
    for (var key in formElements) {
      if (isDisabled(formElements, key)) {
        removeDisabled(formElements[key]);
      }
    }
  };

  window.activation.disableForm();

  window.activation.mainPin.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {
      activatePage();
    }
  });

  window.activation.mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === window.utils.ENTER_KEY) {
      activatePage();
    }
  });

  var activatePage = function () {
    if (adsMap.classList.contains('map--faded') && adForm.classList.contains('ad-form--disabled')) {
      adsMap.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      enableForm();

      window.backend.load(window.adPins.onSuccess, window.adPins.onError);
    }
  };

})();

