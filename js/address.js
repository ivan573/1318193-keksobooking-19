'use strict';

(function () {
  var mainPinWidth = window.mainPin.offsetWidth;
  var mainPinHeight = window.mainPin.offsetWidth;

  var mainPinX = window.mainPin.offsetTop;
  var mainPinY = window.mainPin.offsetLeft;

  var addressX = Math.round(mainPinX + mainPinWidth / 2);
  var addressY = mainPinY + mainPinHeight;

  var addressField = document.querySelector('#address');

  var enterAddress = function (field) {
    field.value = addressX + ', ' + addressY;
    return field.value;
  };

  enterAddress(addressField);

})();
