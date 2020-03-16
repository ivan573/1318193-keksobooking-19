'use strict';

(function () {

  // the function returns the current displayed pins
  var getPins = function () {
    return document.querySelectorAll('.map__pin:not(.map__pin--main)');
  };

  // the function assings data to the most simple elements of the card
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

    // assingning title, address and price to the card
    assignContent(cardElements.title, property.offer.title);
    assignContent(cardElements.address, property.offer.address);
    assignContent(cardElements.price, property.offer.price + '₽/ночь');

    // assigning type of the property to the card
    if (property.offer.type) {
      cardElements.type.textContent = window.utils.PROPERTY_TYPES[property.offer.type];
    } else {
      cardElements.type.textContent = '';
    }

    // assingning nunmber of rooms and guests to the card
    if (property.offer.rooms || property.offer.rooms === 0 || property.offer.guests || property.offer.guests === 0) {
      cardElements.capacity.textContent = property.offer.rooms + ' комнаты для ' + property.offer.guests + ' гостей';
    } else {
      cardElements.capacity.textContent = '';
    }

    // assigning check-in and check-out time
    if (property.offer.checkin && property.offer.checkout) {
      cardElements.time.textContent = 'Заезд после ' + property.offer.checkin + ', выезд до ' + property.offer.checkout;
    } else {
      cardElements.time.textContent = '';
    }

    // features
    cardElements.features.innerHTML = '';
    if (property.offer.features) {
      property.offer.features.forEach(function (it) {
        var li = document.createElement('li');
        li.className = 'popup__feature popup__feature--' + it;
        cardElements.features.appendChild(li);
      });
    }

    // description
    assignContent(cardElements.description, property.offer.description);

    // photos
    var photo = cardElements.photos.querySelector('img').cloneNode(true);
    cardElements.photos.innerHTML = '';
    if (property.offer.photos) {
      property.offer.photos.forEach(function (it) {
        var newPhoto = photo.cloneNode(true);
        newPhoto.src = it;
        cardElements.photos.appendChild(newPhoto);
      });
    }

    // avatar
    if (property.author.avatar) {
      cardElements.avatar.src = property.author.avatar;
    } else {
      cardElements.avatar.src = '';
    }

    document.querySelector('.map__filters-container').before(card);

    // setting card event listeners and escape button event listener
    setCardEventListeners();
    document.addEventListener('keydown', onEscPress);
  };

  // the function removes the 'active' class from the pins
  var removeActiveClass = function (array) {
    array.forEach(function (it) {
      it.classList.remove('map__pin--active');
    });
  };

  // the function adds event listeners to the cards to close the cards and remove the 'active' class
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

  // the function checks whether there is an open card
  var checkOpenedCards = function () {
    var openedCard = document.querySelector('.map__card');

    return openedCard ? true : false;
  };

  // this is what happens when you press the escape button when a card is open (is closes)
  var onEscPress = function (evt) {
    if (evt.key === window.utils.ESC_KEY) {
      window.cards.removeOldCard();
    }
  };

  // this is what happens when you click on a pin: active class removed from the old pin and assigned to the clicken one,
  // a new card is displayed
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

  // the function finds the corresponding ad for the pin by the index assigned earlier and returns it
  var getCorrespondingAd = function (adsList, pin) {
    var correspondingAd;

    // the check variable helps the loop stop as soon as the needed ad is found
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

    // here all the needed event listeners are set for the displayed pins
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

    // this function removes the displayed card
    removeOldCard: function () {
      var card = document.querySelector('.map__card');
      if (card) {
        card.remove();
        document.removeEventListener('keydown', onEscPress);
      }
    }
  };

})();
