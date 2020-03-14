'use strict';

(function () {

  var PROPERTY_TYPES = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var displayAdCard = function (property) {

    var card = document.querySelector('#card').content.querySelector('.map__card').cloneNode(true);

    // тут я насоздавал переменных на случай простоты понимания кода на случай если делать ифэлсы
    // делать ифэлсы я подумал для реализации части задания "Если данных для заполнения не хватает, соответствующий блок в карточке скрывается"
    // но не очень понял обязательно ли это. вроде и так все нормально отображается кроме фото (об этом дальше коммент).

    // var title = card.querySelector('.popup__title');
    // var address = card.querySelector('.popup__text--address');
    // var price = card.querySelector('.popup__text--price');
    // var type = card.querySelector('.popup__type');
    // var capacity = card.querySelector('.popup__text--capacity');
    // var time = card.querySelector('.popup__text--time');
    var features = card.querySelector('.popup__features');
    // var description = card.querySelector('.popup__description');
    var photos = card.querySelector('.popup__photos');

    card.querySelector('.popup__title').textContent = property.offer.title;
    card.querySelector('.popup__text--address').textContent = property.offer.address;
    card.querySelector('.popup__text--price').textContent = property.offer.price + '₽/ночь';

    card.querySelector('.popup__type').textContent = PROPERTY_TYPES[property.offer.type];

    card.querySelector('.popup__text--capacity').textContent = property.offer.rooms + ' комнаты для '
      + property.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + property.offer.checkin
      + ', выезд до ' + property.offer.checkout;

    features.innerHTML = '';
    property.offer.features.forEach(function (it) {
      var li = document.createElement('li');
      li.className = 'popup__feature popup__feature--' + it;
      features.appendChild(li);
    });

    card.querySelector('.popup__description').textContent = property.offer.description;

    var photo = photos.querySelector('img').cloneNode(true);
    photos.innerHTML = '';
    property.offer.photos.forEach(function (it) {
      var newPhoto = photo.cloneNode(true);
      newPhoto.src = it;
      photos.appendChild(newPhoto);
    });

    card.querySelector('.popup__avatar').src = property.author.avatar;

    document.querySelector('.map__filters-container').before(card);

    setCardsEventListeners();
    document.addEventListener('keydown', onEscPress);
  };

  var setCardsEventListeners = function () {
    var closeButtons = document.querySelectorAll('.popup__close');
    closeButtons.forEach(function (it) {
      it.addEventListener('click', function () {
        window.cards.removeOldCards();
      });
      it.addEventListener('keydown', function (evt) {
        if (evt.key === window.utils.ENTER_KEY) {
          window.cards.removeOldCards();
        }
      });
    });
  };

  var checkOpenedCards = function () {
    var currentCards = document.querySelectorAll('.map__card');

    var check = false;

    for (var i = 0; i < currentCards.length && check === false; i++) {
      check = (currentCards.length !== 0);
    }

    return check;
  };

  var onEscPress = function (evt) {
    if (evt.key === window.utils.ESC_KEY) {
      window.cards.removeOldCards();
    }
  };

  var onPinClicking = function (element) {
    if (checkOpenedCards()) {
      window.cards.removeOldCards();
      displayAdCard(getCorrespondingAd(window.adPins.propertiesFromServer, element));
    } else {
      displayAdCard(getCorrespondingAd(window.adPins.propertiesFromServer, element));
    }
  };

  var getCorrespondingAd = function (adsList, pin) {
    var correspondingAd;

    var check = false;
    for (var i = 0; i < adsList.length && check === false; i++) {
      check = (Number(pin.getAttribute('index')) === adsList[i].index);
      if (check === true) {
        correspondingAd = adsList[i];
      }
    }

    return correspondingAd;
  };

  window.cards = {

    setPinEventListeners: function () {
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      pins.forEach(function (it) {
        it.addEventListener('click', function () {
          onPinClicking(it);
        });
        it.addEventListener('keydown', function (evt) {
          if (evt.key === window.utils.ENTER_KEY) {
            onPinClicking(it);
          }
        });
      });
    },

    removeOldCards: function () {
      var cards = document.querySelectorAll('.map__card');
      for (var i = 0; i < cards.length; i++) {
        cards[i].remove();
      }
      document.removeEventListener('keydown', onEscPress);
    }
  };

})();
