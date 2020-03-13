'use strict';

(function () {

  var adForm = document.querySelector('form.ad-form');

  var resetButton = document.querySelector('.ad-form__reset');

  var refreshForm = function () {
    adForm.reset();
    // не понимаю почему не срабатывает обновление адреса
    setTimeout(window.updateAddress(), 1000);
  };

  var onSuccess = function () {
    window.deactivatePage();
    refreshForm();

    var successMessage = document.querySelector('#success').cloneNode(true);
    document.querySelector('main').appendChild(successMessage);
    document.addEventListener('click', function () {
      successMessage.remove();
    });
  };

  var onError = function () {

  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), onSuccess, onError);
    evt.preventDefault();
  });

  resetButton.addEventListener('click', function () {
    refreshForm();
  });


})();
