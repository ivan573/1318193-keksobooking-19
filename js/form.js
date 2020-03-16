'use strict';

(function () {

  var adForm = document.querySelector('form.ad-form');

  var resetButton = document.querySelector('.ad-form__reset');

  var avatarChooser = document.querySelector('input.ad-form-header__input');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  var propertyPhotoChooser = document.querySelector('.ad-form__upload input');
  var propertyPhotoPreview = document.querySelector('.ad-form__photo img');

  var refreshForm = function () {
    adForm.reset();
    setTimeout(window.updateAddress, 5);
  };

  var onSuccess = function () {
    window.activation.deactivatePage();
    refreshForm();

    var successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

    var onAction = function () {
      successMessage.remove();
      document.removeEventListener('click', function () {
        onAction();
      });
      document.removeEventListener('keydown', onEscPress);
    };

    var onEscPress = function (evt) {
      if (evt.key === window.utils.ESC_KEY) {
        onAction();
      }
    };

    document.querySelector('main').appendChild(successMessage);

    document.addEventListener('click', function () {
      onAction();
    });
    document.addEventListener('keydown', onEscPress);
  };

  var onError = function () {
    var errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);

    var closeButton = errorMessage.querySelector('button');

    var onAction = function () {
      errorMessage.remove();
      document.removeEventListener('click', function () {
        onAction();
      });
      document.revomeEventListener('keydown', onEscPress);
      closeButton.removeEventListener('keydown', onEnterPress);
    };

    var onEscPress = function (evt) {
      if (evt.key === window.utils.ESC_KEY) {
        onAction();
      }
    };

    var onEnterPress = function (evt) {
      if (evt.key === window.utils.ENTER_KEY) {
        onAction();
      }
    };

    document.querySelector('main').appendChild(errorMessage);

    document.addEventListener('click', function () {
      onAction();
    });
    document.addEventListener('keydown', onEscPress);
    closeButton.addEventListener('click', function () {
      onAction();
    });
    closeButton.addEventListener('keydown', onEnterPress);
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onSuccess, onError);
  });

  resetButton.addEventListener('click', function () {
    window.activation.deactivatePage();
    refreshForm();
  });

  var setChooserEventListeners = function (chooser, preview) {
    chooser.addEventListener('change', function () {
      var file = chooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = window.utils.FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {

          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    });
  };

  setChooserEventListeners(avatarChooser, avatarPreview);
  setChooserEventListeners(propertyPhotoChooser, propertyPhotoPreview);

})();
