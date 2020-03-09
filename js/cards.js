'use strict';

(function () {

  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  // var getOpenCard = function () {
  //   return document.querySelector('.map__card:not(.hidden)');
  // };

  var checkOpenedCards = function () {
    var currentCards = document.querySelectorAll('.map__card');

    var check = false;

    for (var i = 0; i < currentCards.length && check === false; i++) {
      check = !currentCards[i].classList.contains('hidden');
    }

    return check;
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closePopup(document.querySelector('.map__card:not(.hidden)'));
    }
  };

  var openPopup = function (element) {
    element.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function (element) {
    element.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  window.cards = {

    displayAdCards: function (array) {
      var fragment = document.createDocumentFragment();

      var renderAdCard = function (property) {
        var card = document.querySelector('#card').content.querySelector('.map__card').cloneNode(true);

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

        card.classList.add('hidden');

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

      document.querySelector('.map__pins').appendChild(fragment);
    },

    setPinEventListeners: function () {
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      pins.forEach(function (it, index) {
        var relatedCard = document.querySelectorAll('.map__card')[index];
        it.addEventListener('click', function () {
          if (checkOpenedCards() === false) {
            openPopup(relatedCard);
          }
        });
        it.addEventListener('keydown', function (evt) {
          if (evt.key === ENTER_KEY) {
            if (checkOpenedCards() === false) {
              openPopup(relatedCard);
            }
          }
        });
      });
    },

    setCardsEventListeners: function () {
      var cards = document.querySelectorAll('.map__card');
      var closeButtons = document.querySelectorAll('.popup__close');
      closeButtons.forEach(function (it, index) {
        it.addEventListener('click', function () {
          closePopup(cards[index]);
        });
        it.addEventListener('keydown', function (evt) {
          if (evt.key === ENTER_KEY) {
            closePopup(cards[index]);
          }
        });
      });
    },

    removeOldCards: function () {
      var cards = document.querySelectorAll('.map__cards');
      for (var i = 0; i < cards.length; i++) {
        cards[i].remove();
      }
    }
  };

})();
