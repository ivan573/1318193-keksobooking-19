'use strict';

(function () {
  var mainPinWidth = window.activation.mainPin.offsetWidth;
  var mainPinHeight = window.activation.mainPin.offsetHeight;

  var getAddressX = function () {
    var mainPinX = window.activation.mainPin.offsetTop;
    return Math.round(mainPinX + mainPinWidth / 2);
  };

  var getAddressY = function () {
    var mainPinY = window.activation.mainPin.offsetLeft;
    return mainPinY + mainPinHeight;
  };

  var addressField = document.querySelector('#address');

  window.updateAddress = function () {
    addressField.value = getAddressX() + ', ' + getAddressY();
  };

  window.updateAddress();

})();
