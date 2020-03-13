'use strict';

(function () {

  var bottomBorder = document.querySelector('.map__pins').offsetHeight - window.utils.MAIN_PIN_HEIGHT;
  var rightBorder = document.querySelector('.map__pins').offsetWidth - window.utils.MAIN_PIN_WIDTH;

  window.mainPin.addEventListener('mousedown', function (evt) {

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

      window.mainPin.style.top = (window.mainPin.offsetTop - shift.y) + 'px';
      window.mainPin.style.left = (window.mainPin.offsetLeft - shift.x) + 'px';

      if (window.mainPin.offsetLeft < 0) {
        window.mainPin.style.left = 0 + 'px';
      }
      if (window.mainPin.offsetLeft > rightBorder) {
        window.mainPin.style.left = rightBorder + 'px';
      }

      if (window.mainPin.offsetTop < 0) {
        window.mainPin.style.top = 0 + 'px';
      }
      if (window.mainPin.offsetTop > bottomBorder) {
        window.mainPin.style.top = bottomBorder + 'px';
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
