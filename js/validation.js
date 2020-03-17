'use strict';

(function () {

  var propertyTypeFieldElement = document.querySelector('#type');

  var priceFieldElement = document.querySelector('#price');

  // the function sets minimum prices and placeholders for the price field
  var setPriceAttribute = function (price) {
    priceFieldElement.setAttribute('min', price);
    priceFieldElement.setAttribute('placeholder', price);
  };

  window.setMinimumPrice = function (value) {
    setPriceAttribute(window.utils.PROPERTY_MINIMUM_PRICES[value]);
  };

  // setting the price for the initial property type
  window.setMinimumPrice(document.querySelector('#type').value);

  // setting event listeners for property type change
  propertyTypeFieldElement.addEventListener('change', function () {
    window.setMinimumPrice(propertyTypeFieldElement.value);
  });

  var checkInFieldElement = document.querySelector('#timein');
  var checkOutFieldElement = document.querySelector('#timeout');

  // two event listeners, which adjust the check-in and check-out time whenever one is changed
  checkInFieldElement.addEventListener('change', function () {
    checkOutFieldElement.value = checkInFieldElement.value;
  });

  checkOutFieldElement.addEventListener('change', function () {
    checkInFieldElement.value = checkOutFieldElement.value;
  });

  var roomsNumberFieldElement = document.querySelector('#room_number');
  var guestsNumberFieldElement = document.querySelector('#capacity');

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
  roomsNumberFieldElement.addEventListener('change', function () {
    setCapacity(roomsNumberFieldElement, guestsNumberFieldElement);
  });

  guestsNumberFieldElement.addEventListener('change', function () {
    setCapacity(roomsNumberFieldElement, guestsNumberFieldElement);
  });

})();

