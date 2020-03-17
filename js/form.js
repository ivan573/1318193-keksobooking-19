'use strict';

(function () {

  var adFormElement = document.querySelector('form.ad-form');

  var resetButtonElement = document.querySelector('.ad-form__reset');

  var avatarChooserElement = document.querySelector('input.ad-form-header__input');
  var avatarPreviewElement = document.querySelector('.ad-form-header__preview img');

  var propertyPhotoChooserElement = document.querySelector('.ad-form__upload input');
  var propertyPhotoPreviewElement = document.querySelector('.ad-form__photo img');

  // the function resets the form
  var refreshForm = function () {
    adFormElement.reset();

    avatarPreviewElement.src = '';
    propertyPhotoPreviewElement.src = '';

    window.setMinimumPrice(document.querySelector('#type').value);

    setTimeout(window.updateAddress, 5); // a timeout is needed because otherwise the address box stays empty
  };

  // success function for uploading data to the server
  var onSuccess = function () {
    // deactivating the page
    window.activation.deactivatePage();
    refreshForm();

    var successMessageElementClone = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

    // function for user clicking of the screen or pressing escape. it removes the message and the event listeners.
    var onAction = function () {
      successMessageElementClone.remove();
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

    // displaying the message
    document.querySelector('main').appendChild(successMessageElementClone);

    // adding the message eventlisteners
    document.addEventListener('click', function () {
      onAction();
    });
    document.addEventListener('keydown', onEscPress);
  };

  // same as previous but with the upload failure message
  var onError = function () {
    var errorMessageElementClone = document.querySelector('#error').content.querySelector('.error').cloneNode(true);

    var closeButtonElement = errorMessageElementClone.querySelector('button');

    var onAction = function () {
      errorMessageElementClone.remove();
      document.removeEventListener('click', function () {
        onAction();
      });
      document.revomeEventListener('keydown', onEscPress);
      closeButtonElement.removeEventListener('keydown', onEnterPress);
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

    document.querySelector('main').appendChild(errorMessageElementClone);

    document.addEventListener('click', function () {
      onAction();
    });
    document.addEventListener('keydown', onEscPress);
    closeButtonElement.addEventListener('click', function () {
      onAction();
    });
    closeButtonElement.addEventListener('keydown', onEnterPress);
  };

  // adding event listener to the submit button
  adFormElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adFormElement), onSuccess, onError);
  });

  // event listener for the refresh button
  resetButtonElement.addEventListener('click', function () {
    window.activation.deactivatePage();
    refreshForm();
  });

  // event listeners for the picture upload buttons
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

  setChooserEventListeners(avatarChooserElement, avatarPreviewElement);
  setChooserEventListeners(propertyPhotoChooserElement, propertyPhotoPreviewElement);

})();
