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

  // this is the main part of the module. the function assigns a string with the main pin coordinates
  // to the address box in the form.
  window.updateAddress = function () {
    addressField.value = getAddressX() + ', ' + getAddressY();
  };

  window.updateAddress();

})();
