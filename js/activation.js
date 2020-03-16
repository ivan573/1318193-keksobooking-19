'use strict';

(function () {

  window.activation = {

    mainPin: document.querySelector('.map__pin--main'),

    // the function disables all elements of the form.
    // it is useful sepparately because without it, when user would see the form upload message, he/she still could
    // interact with the form using keyboard
    disableForm: function () {
      for (var key in formElements) {
        if (!isDisabled(formElements, key)) {
          setDisabled(formElements[key]);
        }
      }
    },

    // the function returns the page to the initial condition
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

  // this object is needed to save the starting coorinates of the main pin so that they can be used to restore it's position
  var mainPinStartingPosition = {
    x: window.activation.mainPin.offsetLeft,
    y: window.activation.mainPin.offsetTop
  };

  var adsMap = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');

  // this object has the form elements together so a for in loop can be applied to them
  var formElements = {
    formInputs: document.querySelectorAll('.ad-form input'),
    formSelects: document.querySelectorAll('.ad-form select'),
    formTextArea: document.querySelectorAll('#description'),
    formButtons: document.querySelectorAll('.ad-form button')
  };

  // the function checks whether an element of the form is disabled
  // the for in loop for the form elementshad to be wrapped in an if statement so this function is used as a condition for it
  var isDisabled = function (obj, key) {
    var check = false;
    for (var i = 0; i < obj[key].length && check === false; i++) {
      check = obj[key][i].hasAttribute('disabled');
    }
    return check;
  };

  // the function makes a single form element disabled
  var setDisabled = function (element) {
    for (var j = 0; j < element.length; j++) {
      element[j].setAttribute('disabled', 'disabled');
    }
  };

  // as the previous one but vise versa
  var removeDisabled = function (element) {
    for (var k = 0; k < element.length; k++) {
      element[k].removeAttribute('disabled', 'disabled');
    }
  };

  // same as disableForm but vice versa
  var enableForm = function () {
    for (var key in formElements) {
      if (isDisabled(formElements, key)) {
        removeDisabled(formElements[key]);
      }
    }
  };

  window.activation.disableForm();

  // adding event listener to the main pin so that it can activate the page by getting clicked
  window.activation.mainPin.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {
      activatePage();
    }
  });

  // same as previous but by pressin the enter key
  window.activation.mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === window.utils.ENTER_KEY) {
      activatePage();
    }
  });

  // the function activates the page including the map and the form and loads the data from the server
  var activatePage = function () {
    if (adsMap.classList.contains('map--faded') && adForm.classList.contains('ad-form--disabled')) {
      adsMap.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      enableForm();

      window.backend.load(window.adPins.onSuccess, window.adPins.onError);
    }
  };

})();

