'use strict';

(function () {
  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      var URL = 'https://js.dump.academy/keksobooking/data';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          try {
            onLoad(JSON.parse(xhr.responseText));
          } catch (err) {
            onError(err.message);
          }
        } else {
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
          onError('Ошибка ' + xhr.status + ': ' + getError(window.statusCodeList, xhr.status));
        }

      });

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };

  var getError = function (object, key) {
    return object[key];
  };
})();
