'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var properties = new Array(5);

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var adCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var mapPins = document.querySelector('.map__pins');

  var propertyType = document.querySelector('#housing-type');

  var propertiesFromServer;

  var displayPins = function (array) {

    var fragment = document.createDocumentFragment();

    var renderPin = function (property) {
      var pin = pinTemplate.cloneNode(true);

      pin.style = 'left: ' + (property.location.x - PIN_WIDTH / 2) + 'px; top: ' + (property.location.y - PIN_HEIGHT) + 'px;';
      pin.querySelector('img').src = property.author.avatar;
      pin.querySelector('img').alt = property.offer.title;

      return pin;
    };

    array.forEach(function (property) {
      fragment.appendChild(renderPin(property));
    });

    mapPins.appendChild(fragment);

  };

  var displayAdCards = function (array) {
    var fragment = document.createDocumentFragment();

    var renderAdCard = function (property) {
      var card = adCardTemplate.cloneNode(true);

      // тут я насоздавал переменных на случай простоты понимания кода на случай если делать ифэлсы
      // делать ифэлсы я подумал для реализации части задания "Если данных для заполнения не хватает, соответствующий блок в карточке скрывается"
      // но не очень понял обязательно ли это. вроде и так все нормально отображается кроме фото (об этом дальше коммент).

      // var title = card.querySelector('.popup__title');
      // var address = card.querySelector('.popup__text--address');
      // var price = card.querySelector('.popup__text--price');
      var type = card.querySelector('.popup__type');
      // var capacity = card.querySelector('.popup__text--capacity');
      // var time = card.querySelector('.popup__text--time');
      var features = card.querySelector('.popup__features');
      // var description = card.querySelector('.popup__description');
      var photos = card.querySelector('.popup__photos');

      card.querySelector('.popup__title').textContent = property.offer.title;
      card.querySelector('.popup__text--address').textContent = property.offer.address;
      card.querySelector('.popup__text--price').textContent = property.offer.price + '₽/ночь';

      switch (property.offer.type) {
        case 'flat':
          type.textContent = 'Квартира';
          break;
        case 'bungalo':
          type.textContent = 'Бунгало';
          break;
        case 'house':
          type.textContent = 'Дом';
          break;
        case 'palace':
          type.textContent = 'Дворец';
          break;
      }
      card.querySelector('.popup__text--capacity').textContent = property.offer.rooms + ' комнаты для '
        + property.offer.guests + ' гостей';
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + property.offer.checkin
        + ', выезд до ' + property.offer.checkout;

      features.innerHTML = '';
      property.offer.features.forEach(function (it) {
        var li = document.createElement('li');
        switch (it) {
          case 'wifi':
            li.className = 'popup__feature popup__feature--wifi';
            features.appendChild(li);
            break;
          case 'dishwasher':
            li.className = 'popup__feature popup__feature--dishwasher';
            features.appendChild(li);
            break;
          case 'parking':
            li.className = 'popup__feature popup__feature--parking';
            features.appendChild(li);
            break;
          case 'washer':
            li.className = 'popup__feature popup__feature--washer';
            features.appendChild(li);
            break;
          case 'elevator':
            li.className = 'popup__feature popup__feature--elevator';
            features.appendChild(li);
            break;
          case 'conditioner':
            li.className = 'popup__feature popup__feature--conditioner';
            features.appendChild(li);
            break;
        }
      });
      card.querySelector('.popup__description').textContent = property.offer.description;

      var photo = photos.querySelector('img').cloneNode(true);
      photos.innerHTML = '';
      // вот тут почему-то не записывается значение в src и в элемент добавляется только один дочерний элемент
      property.offer.photos.forEach(function (it) {
        photo.src = it;
        photos.appendChild(photo);
      });

      return card;
    };

    array.forEach(function (property) {
      fragment.appendChild(renderAdCard(property));
    });

    mapPins.appendChild(fragment);
  };

  var removeOldPins = function () {
    var pins = document.querySelectorAll('.map__pins .map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  };

  window.adPins = {
    onSuccess: function (data) {

      propertiesFromServer = data;

      var getRandomAd = function (array) {
        return array[Math.floor(Math.random() * array.length)];
      };

      for (var i = 0; i < properties.length; i++) {
        properties[i] = getRandomAd(propertiesFromServer);
      }

      var checkDuplicates = function (array) {

        var check = true;

        for (var j = 0; check === true && j < array.length; j++) {
          check = (array.indexOf(array[j]) === j);
        }

        return check;

      };

      var uniqueProperties;

      while (checkDuplicates(properties) === false) {

        uniqueProperties = properties.filter(function (it, k) {
          return properties.indexOf(it) === k;
        });

        while (uniqueProperties.length < properties.length) {
          uniqueProperties.push(getRandomAd(propertiesFromServer));
        }

        properties = uniqueProperties;

      }

      displayPins(properties);

      displayAdCards(properties);

    },

    onError: function (data) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = data;
      document.body.insertAdjacentElement('afterbegin', node);
    }

  };

  propertyType.addEventListener('change', function () {
    removeOldPins();
    if (propertyType.value === 'any') {
      window.adPins.onSuccess(propertiesFromServer); // это ведь не будет считаться костылем?
    } else {
      displayPins(window.filterProperties(propertiesFromServer));
    }
  });

})();
