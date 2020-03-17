'use strict';

(function () {
  var mainPinWidth = window.activation.mainPinElement.offsetWidth;
  var mainPinHeight = window.activation.mainPinElement.offsetHeight;

  var getAddressX = function () {
    var mainPinX = window.activation.mainPinElement.offsetTop;
    return Math.round(mainPinX + mainPinWidth / 2);
  };

  var getAddressY = function () {
    var mainPinY = window.activation.mainPinElement.offsetLeft;
    return mainPinY + mainPinHeight;
  };

  var addressFieldElement = document.querySelector('#address');

  // this is the main part of the module. the function assigns a string with the main pin coordinates
  // to the address box in the form.
  window.updateAddress = function () {
    addressFieldElement.value = getAddressX() + ', ' + getAddressY();
  };

  window.updateAddress();

})();
