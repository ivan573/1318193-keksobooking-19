'use strict';

(function () {
  var mainPinWidth = window.mainPin.offsetWidth;
  var mainPinHeight = window.mainPin.offsetHeight;

  var getAddressX = function () {
    var mainPinX = window.mainPin.offsetTop;
    return Math.round(mainPinX + mainPinWidth / 2);
  };

  var getAddressY = function () {
    var mainPinY = window.mainPin.offsetLeft;
    return mainPinY + mainPinHeight;
  };

  var addressField = document.querySelector('#address');

  window.updateAddress = function () {
    addressField.value = getAddressX() + ', ' + getAddressY();
  };

  window.updateAddress();

})();
