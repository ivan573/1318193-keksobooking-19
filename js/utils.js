'use strict';

(function () {
  window.utils = {

    URL: {
      load: 'https://js.dump.academy/keksobooking/data',
      save: 'https://js.dump.academy/keksobooking'
    },

    FILE_TYPES: ['gif', 'jpg', 'jpeg', 'png'],

    DEBOUNCE_INTERVAL: 500,

    ESC_KEY: 'Escape',
    ENTER_KET: 'Enter',

    MAIN_PIN_WIDTH: 65,
    MAIN_PIN_HEIGHT: 80,

    PIN_WIDTH: 50,
    PIN_HEIGHT: 70,

    MAX_ADS_TO_DISPLAY: 5,

    PROPERTY_TYPES: {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом',
      palace: 'Дворец'
    },

    PROPERTY_MINIMUM_PRICE: {
      bungalo: '0',
      flat: '1000',
      house: '5000',
      palace: '10000'
    },

    PROPERTY_PRICE_RANGE: {
      low: 10000,
      high: 50000
    }

  };
})();
