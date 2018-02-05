'use strict';

var OFFERS_COUNT = 8;
var BUTTON_PIX_WIDTH = 50;
var BUTTON_PIX_HEIGHT = 70;
var MIN_LOCATION_X = 300;
var MAX_LOCATION_X = 900;
var MIN_LOCATION_Y = 150;
var MAX_LOCATION_Y = 500;
var MIN_OFFER_AVATAR = 1;
var MAX_OFFER_AVATAR = 8;
var MIN_OFFER_PRICE = 1000;
var MAX_OFFER_PRICE = 1000000;
var MIN_OFFER_ROOMS = 1;
var MAX_OFFER_ROOMS = 5;
var MIN_OFFER_GUESTS = 1;
var MAX_OFFER_GUESTS = 5;

var arrayShuffle = function () {
  return Math.random() - 0.5;
};

var getRandomElement = function (array) {
  var elementIndex = Math.floor(Math.random() * array.length);
  return array[elementIndex];
};

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateOffers = function (offersCount) {
  for (var i = 0; i < offersCount; i++) {
    offers.push(generateOffer());
  }
};

var offerType = function (englishOfferType) {
  var apartmentsTypes = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
  };

  return apartmentsTypes[englishOfferType];
};

var generateOffer = function () {
  var TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var ROOMTYPE = ['flat', 'house', 'bungalo'];
  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var DESCRIPTION = '';
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var location = {
    'x': getRandomInteger(MIN_LOCATION_X, MAX_LOCATION_X),
    'y': getRandomInteger(MIN_LOCATION_Y, MAX_LOCATION_Y)
  };

  var randomFeatures = FEATURES.slice().sort(arrayShuffle).slice(0, getRandomInteger(1, FEATURES.length));
  var offer = {
    'author': {
      'avatar': 'img/avatars/user0' + getRandomInteger(MIN_OFFER_AVATAR, MAX_OFFER_AVATAR) + '.png'
    },

    'offer': {
      'title': getRandomElement(TITLES),
      'address': location.x + ', ' + location.y,
      'price': getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE),
      'type': getRandomElement(ROOMTYPE),
      'rooms': getRandomInteger(MIN_OFFER_ROOMS, MAX_OFFER_ROOMS),
      'guests': getRandomInteger(MIN_OFFER_GUESTS, MAX_OFFER_GUESTS),
      'checkin': getRandomElement(CHECKIN),
      'checkout': getRandomElement(CHECKOUT),
      'features': randomFeatures,
      'description': DESCRIPTION,
      'photos': PHOTOS.sort(arrayShuffle)
    },

    'location': location
  };

  return offer;
};

var generateButtons = function () {
  var mapPins = document.querySelector('.map__pins');
  var buttons = document.createDocumentFragment();

  for (var offerIndex = 0; offerIndex < OFFERS_COUNT; offerIndex++) {
    var xPinPossition = offers[offerIndex].location.x + BUTTON_PIX_WIDTH / 2;
    var yPinPossition = offers[offerIndex].location.y + BUTTON_PIX_HEIGHT / 2;

    var button = document.createElement('button');
    button.className = 'map__pin';
    button.style = 'left: ' + xPinPossition + 'px; top: ' + yPinPossition + 'px;';
    button.innerHTML = '<img src=' + offers[offerIndex].author.avatar + ' width="40" height="40" draggable="false">';
    buttons.appendChild(button);
  }

  mapPins.appendChild(buttons);
};

var renderOffer = function (offerData) {
  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters-container');
  var offerTemplate = document.querySelector('template').content;

  var offerElement = offerTemplate.cloneNode(true);

  offerElement.querySelector('h3').textContent = offerData.offer.title;
  offerElement.querySelector('p small').textContent = offerData.offer.address;
  offerElement.querySelector('.popup__price').textContent = offerData.offer.price + '&#x20bd;/ночь';
  offerElement.querySelector('h4').textContent = offerType(offerData.offer.type);
  offerElement.querySelectorAll('p')[2].textContent = offerData.offer.rooms + ' комнаты для ' + offerData.offer.guests + ' гостей';
  offerElement.querySelectorAll('p')[3].textContent = 'Заезд после ' + offerData.offer.checkin + ', выезд до ' + offerData.offer.checkout;
  offerElement.querySelectorAll('p')[4].textContent = offerData.offer.description;
  offerElement.querySelector('.popup__avatar').src = offerData.author.avatar;

  var features = offerElement.querySelector('.popup__features');
  features.innerHTML = '';
  for (var featureIndex = 0; featureIndex < offerData.offer.features.length; featureIndex++) {
    var featureLi = document.createElement('li');
    featureLi.className = 'feature feature--' + offerData.offer.features[featureIndex];
    features.appendChild(featureLi);
  }

  var pictures = offerElement.querySelector('.popup__pictures');
  for (var photoIndex = 0; photoIndex < offerData.offer.photos.length; photoIndex++) {
    var photoLi = document.createElement('li');
    photoLi.innerHTML = '<img src="' + offerData.offer.photos[photoIndex] + '" width="68" height="68">';
    pictures.appendChild(photoLi);
  }

  map.insertBefore(offerElement, mapFilters);
};

var offers = [];
document.querySelector('.map').classList.remove('map--faded');
generateOffers(OFFERS_COUNT);
generateButtons();
renderOffer(offers[0]);
