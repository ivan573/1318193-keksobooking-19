'use strict';

(function () {

  var getPins = function () {
    return document.querySelectorAll('.map__pin:not(.map__pin--main)');
  };

  var assignContent = function (cardField, propertyData) {
    if (propertyData) {
      cardField.textContent = propertyData;
    } else {
      cardField.textContent = '';
    }
  };

  var displayAdCard = function (property) {

    var card = document.querySelector('#card').content.querySelector('.map__card').cloneNode(true);

    var cardElements = {
      title: card.querySelector('.popup__title'),
      address: card.querySelector('.popup__text--address'),
      price: card.querySelector('.popup__text--price'),
      type: card.querySelector('.popup__type'),
      capacity: card.querySelector('.popup__text--capacity'),
      time: card.querySelector('.popup__text--time'),
      features: card.querySelector('.popup__features'),
      description: card.querySelector('.popup__description'),
      photos: card.querySelector('.popup__photos'),
      avatar: card.querySelector('.popup__avatar')
    };

    assignContent(cardElements.title, property.offer.title);
    assignContent(cardElements.address, property.offer.address);
    assignContent(cardElements.price, property.offer.price + '₽/ночь');

    if (property.offer.type) {
      cardElements.type.textContent = window.utils.PROPERTY_TYPES[property.offer.type];
    } else {
      cardElements.type.textContent = '';
    }

    if (property.offer.rooms || property.offer.rooms === 0 || property.offer.guests || property.offer.guests === 0) {
      cardElements.capacity.textContent = property.offer.rooms + ' комнаты для ' + property.offer.guests + ' гостей';
    } else {
      cardElements.capacity.textContent = '';
    }

    if (property.offer.checkin && property.offer.checkout) {
      cardElements.time.textContent = 'Заезд после ' + property.offer.checkin + ', выезд до ' + property.offer.checkout;
    } else {
      cardElements.time.textContent = '';
    }

    cardElements.features.innerHTML = '';
    if (property.offer.features) {
      property.offer.features.forEach(function (it) {
        var li = document.createElement('li');
        li.className = 'popup__feature popup__feature--' + it;
        cardElements.features.appendChild(li);
      });
    }

    assignContent(cardElements.description, property.offer.description);

    var photo = cardElements.photos.querySelector('img').cloneNode(true);
    cardElements.photos.innerHTML = '';
    if (property.offer.photos) {
      property.offer.photos.forEach(function (it) {
        var newPhoto = photo.cloneNode(true);
        newPhoto.src = it;
        cardElements.photos.appendChild(newPhoto);
      });
    }

    if (property.author.avatar) {
      cardElements.avatar.src = property.author.avatar;
    } else {
      cardElements.avatar.src = '';
    }

    document.querySelector('.map__filters-container').before(card);

    setCardEventListeners();
    document.addEventListener('keydown', onEscPress);
  };

  var removeActiveClass = function (array) {
    array.forEach(function (it) {
      it.classList.remove('map__pin--active');
    });
  };

  var setCardEventListeners = function () {
    var pins = getPins();
    var closeButton = document.querySelector('.popup__close');
    closeButton.addEventListener('click', function () {
      window.cards.removeOldCard();
      removeActiveClass(pins);
    });
    closeButton.addEventListener('keydown', function (evt) {
      if (evt.key === window.utils.ENTER_KEY) {
        window.cards.removeOldCard();
        removeActiveClass(pins);
      }
    });
  };

  var checkOpenedCards = function () {
    var openedCard = document.querySelector('.map__card');

    return openedCard ? true : false;
  };

  var onEscPress = function (evt) {
    if (evt.key === window.utils.ESC_KEY) {
      window.cards.removeOldCard();
    }
  };

  var onPinClicking = function (element, array) {
    removeActiveClass(array);
    element.classList.add('map__pin--active');
    if (checkOpenedCards()) {
      window.cards.removeOldCard();
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
      var pins = getPins();
      pins.forEach(function (it) {
        it.addEventListener('click', function () {
          onPinClicking(it, pins);
        });
        it.addEventListener('keydown', function (evt) {
          if (evt.key === window.utils.ENTER_KEY) {
            onPinClicking(it, pins);
          }
        });
      });
    },

    removeOldCard: function () {
      var card = document.querySelector('.map__card');
      if (card) {
        card.remove();
        document.removeEventListener('keydown', onEscPress);
      }
    }
  };

})();
