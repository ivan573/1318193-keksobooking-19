'use strict';

(function () {

  var bottomBorder = document.querySelector('.map__pins').offsetHeight - window.utils.MAIN_PIN_HEIGHT;
  var rightBorder = document.querySelector('.map__pins').offsetWidth - window.utils.MAIN_PIN_WIDTH;

  window.activation.mainPin.addEventListener('mousedown', function (evt) {

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

      window.activation.mainPin.style.top = (window.activation.mainPin.offsetTop - shift.y) + 'px';
      window.activation.mainPin.style.left = (window.activation.mainPin.offsetLeft - shift.x) + 'px';

      if (window.activation.mainPin.offsetLeft < 0) {
        window.activation.mainPin.style.left = 0 + 'px';
      }
      if (window.activation.mainPin.offsetLeft > rightBorder) {
        window.activation.mainPin.style.left = rightBorder + 'px';
      }

      if (window.activation.mainPin.offsetTop < 0) {
        window.activation.mainPin.style.top = 0 + 'px';
      }
      if (window.activation.mainPin.offsetTop > bottomBorder) {
        window.activation.mainPin.style.top = bottomBorder + 'px';
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
