'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var properties = new Array(8);

var authors = {
  avatars: ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png',
    'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png',
    'img/avatars/user08.png']
};

var offers = {
  titles: ['Уютное гнездышко для молодоженов', 'Маленькая квартирка рядом с парком', 'Небольшая лавочка в парке',
    'Императорский дворец в центре Токио', 'Милейший чердачок', 'Наркоманский притон', 'Чёткая хата'],
  addresses: ['102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3', '102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō',
    'Chiyoda-ku, Tōkyō-to 102-0091', '1-1 Chiyoda, Chiyoda-ku, Tōkyō-to 100-8111', '102-0094 Tōkyō-to, Chiyoda-ku, Kioichō, 3',
    '102-0094 Tōkyō-to, Chiyoda-ku, Kioichō, 3', '102-0081 Tōkyō-to, Chiyoda-ku, Yonbanchō, 5−6'],
  prices: [42000, 30000, 100, 6000000, 10000, 5000, 9000],
  types: ['house', 'flat', 'bungalo'],
  rooms: [3, 1, 0, 35, 2],
  guests: [6, 1, 0, 93, 2, 3],
  checkins: ['14:00', '9:00', '0:00', '21.00', '11.00', '17.00'],
  checkouts: ['10:00', '7:00', '0:00', '20.00', '16.00'],
  features: [['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    ['elevator', 'conditioner'], [], ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    ['wifi', 'washer', 'elevator'], ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    ['dishwasher', 'parking', 'washer', 'elevator', 'conditioner']],
  descriptions: ['Великолепный таун-хауз в центре Токио. Подходит как туристам, так и бизнесменам. Дом полностью укомплектован и имеет свежий ремонт.',
    'Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.', 'Великолепная лавочка прямо в центре парка. Подходит для всех кто любит спать на свежем воздухе.',
    'Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить.',
    'Маленькая квартирка на чердаке. Для самых не требовательных.', 'У нас есть всё! Шприцы, интернет, кофе. Для всех кто знает толк в отдыхе. Полицию просим не беспокоить.',
    'У нас тут все ништяк. Ларек за углом. Шава 24 часа. Приезжайте! Интернетов нет!'],
  photos: [['https://cdn.ostrovok.ru/t/x500/mec/a4/bb/a4bbfa3d98c0ddf60e95e610509dbede8160e40e.jpeg',
    'https://cdn.ostrovok.ru/t/x500/mec/hotels/1000000/480000/470500/470466/470466_12_b.jpg',
    'https://cdn.ostrovok.ru/t/x500/mec/hotels/1000000/480000/470500/470466/470466_17_b.jpg',
    'https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/aa9f9334-acd2-46f7-ae6e-4ae039376ec6.jpeg'],
  ['https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/987935fb-633a-46b8-9b76-76af9f35c5e3.jpeg',
    'https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/434b2eda-5af9-4b93-b97d-4e7514621ff1.jpeg',
    'https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/fa9c3bba-a64a-4019-ab50-102bf6e5d691.jpeg',
    'https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/f779d886-18a6-4ffb-b7c2-f5d4d0c8952a.jpeg'],
  ['https://cdn.ostrovok.ru/t/x500/mec/9b/6c/9b6cacd832ce9f3db3f17b3a2f368958710ce518.jpeg',
    'https://cdn.ostrovok.ru/t/x500/mec/9c/5d/9c5dc5a6daf5353bb44b5696df1c1186c55173b9.jpeg',
    'https://cdn.ostrovok.ru/t/x500/mec/cd/c6/cdc6e4a1df6259cb54c75edb6ac351180b49b5ec.jpeg',
    'https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/abcedd44-bfbd-411d-9919-fa2ac82ef6b0.jpeg'],
  ['https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/01488611-c1f9-4854-ad67-9f0ad3e857e6.jpeg',
    'https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/d976dd4b-2a7e-415a-a2a2-afc51caf8006.jpeg']],
  locations: [{'x': 428, 'y': 493}, {'x': 471, 'y': 545}, {'x': 744, 'y': 534}, {'x': 526, 'y': 597}, {'x': 361, 'y': 517}]
};

var getData = function (array) {
  var data = array[Math.floor(Math.random() * array.length)];
  return data;
};

var getAuthor = function () {
  return {avatar: getData(authors.avatars)};
};

var getOffer = function () {
  return {
    title: getData(offers.titles),
    address: getData(offers.addresses),
    price: getData(offers.prices),
    type: getData(offers.types),
    rooms: getData(offers.rooms),
    guests: getData(offers.guests),
    checkin: getData(offers.checkins),
    checkout: getData(offers.checkouts),
    features: getData(offers.features),
    description: getData(offers.descriptions),
    photos: getData(offers.photos),
    location: getData(offers.locations)
  };
};

var getProperties = function () {
  return {
    author: getAuthor(),
    offer: getOffer()
  };
};

for (var i = 0; i < properties.length; i++) {
  properties[i] = getProperties();
}

var adsMap = document.querySelector('.map');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (property) {
  var pin = pinTemplate.cloneNode(true);

  pin.style = 'left: ' + (property.offer.location.x - PIN_WIDTH / 2) + 'px; top: ' + (property.offer.location.y - PIN_HEIGHT) + 'px;';
  pin.querySelector('img').src = property.author.avatar;
  pin.querySelector('img').alt = property.offer.title;

  return pin;
};

var fragment = document.createDocumentFragment();

properties.forEach(function (property) {
  fragment.appendChild(renderPin(property));
});

var mapPins = document.querySelector('.map__pins');
var adForm = document.querySelector('.ad-form');

// активация страницы

var ENTER_KEY = 'Enter';

var formInputs = document.querySelectorAll('.ad-form input');
var formSelects = document.querySelectorAll('.ad-form select');

var setDisabled = function (element) {
  for (var j = 0; j < element.length; j++) {
    element[j].setAttribute('disabled', 'disabled');
  }
};

var removeDisabled = function (element) {
  for (var k = 0; k < element.length; k++) {
    element[k].removeAttribute('disabled', 'disabled');
  }
};

setDisabled(formInputs);
setDisabled(formSelects);

var mainPin = document.querySelector('.map__pin--main');

var activatePage = function () {
  adsMap.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  removeDisabled(formInputs);
  removeDisabled(formSelects);

  mapPins.appendChild(fragment);
};

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    activatePage();
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    activatePage();
  }
});

// адрес

var mainPinWidth = mainPin.offsetWidth;
var mainPinHeight = mainPin.offsetWidth;

var mainPinX = mainPin.offsetTop;
var mainPinY = mainPin.offsetLeft;

var addressX = Math.round(mainPinX + mainPinWidth / 2);
var addressY = mainPinY + mainPinHeight;

var addressField = document.querySelector('#address');

var enterAddress = function (field) {
  field.value = addressX + ', ' + addressY;
  return field.value;
};

enterAddress(addressField);

// валидация

var propertyTypeField = document.querySelector('#type');

var priceField = document.querySelector('#price');

var placesPrice = {
  bungalo: '0',
  flat: '1000',
  house: '5000',
  palace: '10000'
};

var setPriceAttribute = function (price) {
  priceField.setAttribute('min', price);
  priceField.setAttribute('placeholder', price);
};

var setMinimumPrice = function (value) {
  setPriceAttribute(placesPrice[value]);
};

propertyTypeField.addEventListener('change', function () {
  setMinimumPrice(propertyTypeField.value);
});

var checkInField = document.querySelector('#timein');
var checkOutField = document.querySelector('#timeout');

checkInField.addEventListener('change', function () {
  checkOutField.value = checkInField.value;
});

checkOutField.addEventListener('change', function () {
  checkInField.value = checkOutField.value;
});

var roomsNumberField = document.querySelector('#room_number');
var guestsNumberField = document.querySelector('#capacity');

var setCapacity = function (rooms, guests) {
  if ((guests.value !== '0' && rooms.value === '100') || (guests.value === '0' && rooms.value !== '100')) {
    guests.setCustomValidity('Для выбранного значения допустима только пара «100 комнат» — «не для гостей»');
  } else if (guests.value > rooms.value) {
    guests.setCustomValidity('Количество гостей не может превышать количество комнат');
  } else {
    guests.setCustomValidity('');
  }
};

roomsNumberField.addEventListener('change', function () {
  setCapacity(roomsNumberField, guestsNumberField);
});

guestsNumberField.addEventListener('change', function () {
  setCapacity(roomsNumberField, guestsNumberField);
});
