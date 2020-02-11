'use strict';

(function () {
  var propertyTypeField = document.querySelector('#type');

  var priceField = document.querySelector('#price');

  var propertyMinimumPrice = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };

  var setPriceAttribute = function (price) {
    priceField.setAttribute('min', price);
    priceField.setAttribute('placeholder', price);
  };

  var setMinimumPrice = function (value) {
    setPriceAttribute(propertyMinimumPrice[value]);
  };

  propertyTypeField.addEventListener('change', function () {
    setMinimumPrice(propertyTypeField.value);
  });

  var checkInField = document.querySelector('#timein');
  var checkOutField = document.querySelector('#timeout');

  checkInField.addEventListener('change', function () {
    checkOutField.value = checkInField.value;
  });

  checkOutField.addEventListener('change', function () {
    checkInField.value = checkOutField.value;
  });

  var roomsNumberField = document.querySelector('#room_number');
  var guestsNumberField = document.querySelector('#capacity');

  var setCapacity = function (rooms, guests) {
    if ((guests.value !== '0' && rooms.value === '100') || (guests.value === '0' && rooms.value !== '100')) {
      guests.setCustomValidity('Для выбранного значения допустима только пара «100 комнат» — «не для гостей»');
    } else if (guests.value > rooms.value) {
      guests.setCustomValidity('Количество гостей не может превышать количество комнат');
    } else {
      guests.setCustomValidity('');
    }
  };

  roomsNumberField.addEventListener('change', function () {
    setCapacity(roomsNumberField, guestsNumberField);
  });

  guestsNumberField.addEventListener('change', function () {
    setCapacity(roomsNumberField, guestsNumberField);
  });

})();

