'use strict';

(function () {
  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      var URL = 'https://js.dump.academy/keksobooking/data';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          try {
            onLoad(JSON.parse(xhr.responseText)); // this line is written in case of gettin an non-json response from the server
          } catch (err) {
            onError(err.message);
          }
        } else { // here a relatively detailed message is transfered to the onError function if the code is not 200
          onError('Ошибка ' + xhr.status + ': ' + getError(window.statusCodeList, xhr.status));
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000;

      xhr.open('GET', URL);
      xhr.send();

    },

    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      var URL = 'https://js.dump.academy/keksobooking';

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError();
        }

      });

      xhr.addEventListener('error', onError);

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };

  // this function return a message from the errors dictionary
  var getError = function (object, key) {
    return object[key];
  };
})();
