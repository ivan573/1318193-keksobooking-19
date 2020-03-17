'use strict';

(function () {

  var bottomBorder = document.querySelector('.map__pins').offsetHeight - window.utils.MAIN_PIN_HEIGHT;
  var rightBorder = document.querySelector('.map__pins').offsetWidth - window.utils.MAIN_PIN_WIDTH;

  window.activation.mainPinElement.addEventListener('mousedown', function (evt) {

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.activation.mainPinElement.style.top = (window.activation.mainPinElement.offsetTop - shift.y) + 'px';
      window.activation.mainPinElement.style.left = (window.activation.mainPinElement.offsetLeft - shift.x) + 'px';

      if (window.activation.mainPinElement.offsetLeft < 0) {
        window.activation.mainPinElement.style.left = 0 + 'px';
      }
      if (window.activation.mainPinElement.offsetLeft > rightBorder) {
        window.activation.mainPinElement.style.left = rightBorder + 'px';
      }

      if (window.activation.mainPinElement.offsetTop < 0) {
        window.activation.mainPinElement.style.top = 0 + 'px';
      }
      if (window.activation.mainPinElement.offsetTop > bottomBorder) {
        window.activation.mainPinElement.style.top = bottomBorder + 'px';
      }

    };

    var onMouseUp = function () {

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      window.updateAddress();

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
