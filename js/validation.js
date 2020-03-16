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

  // the function sets minimum prices and placeholders for the price field
  var setPriceAttribute = function (price) {
    priceField.setAttribute('min', price);
    priceField.setAttribute('placeholder', price);
  };

  var setMinimumPrice = function (value) {
    setPriceAttribute(propertyMinimumPrice[value]);
  };

  // setting the price for the initial property type
  setMinimumPrice(document.querySelector('#type').value);

  // setting event listeners for property type change
  propertyTypeField.addEventListener('change', function () {
    setMinimumPrice(propertyTypeField.value);
  });

  var checkInField = document.querySelector('#timein');
  var checkOutField = document.querySelector('#timeout');

  // two event listeners, which adjust the check-in and check-out time whenever one is changed
  checkInField.addEventListener('change', function () {
    checkOutField.value = checkInField.value;
  });

  checkOutField.addEventListener('change', function () {
    checkInField.value = checkOutField.value;
  });

  var roomsNumberField = document.querySelector('#room_number');
  var guestsNumberField = document.querySelector('#capacity');

  // the function sets the capacity depending on the number of guests
  var setCapacity = function (rooms, guests) {
    if ((guests.value !== '0' && rooms.value === '100') || (guests.value === '0' && rooms.value !== '100')) {
      guests.setCustomValidity('Для выбранного значения допустима только пара «100 комнат» — «не для гостей»');
    } else if (guests.value > rooms.value) {
      guests.setCustomValidity('Количество гостей не может превышать количество комнат');
    } else {
      guests.setCustomValidity('');
    }
  };

  // setting event listeners for room number and guest number change
  roomsNumberField.addEventListener('change', function () {
    setCapacity(roomsNumberField, guestsNumberField);
  });

  guestsNumberField.addEventListener('change', function () {
    setCapacity(roomsNumberField, guestsNumberField);
  });

})();

