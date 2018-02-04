'use strict';

var arrayShuffle = function () {
  return Math.random() - 0.5;
};

var getRandomElement = function (array) {
  var elementIndex = Math.floor(Math.random() * array.length);
  return array[elementIndex];
};

var randomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateOffers = function (offersCount) {
  for (var i = 0; i < offersCount; i++) {
    offers.push(generateOffer());
  }
};

var offerType = function (englishOfferType) {
  var russianOfferType = '';
  switch (englishOfferType) {
    case 'flat':
      russianOfferType = 'Квартира';
      break;
    case 'bungalo':
      russianOfferType = 'Бунгало';
      break;
    case 'house':
      russianOfferType = 'Дом';
      break;
  }
  return russianOfferType;
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
    'x': randomInteger(300, 900),
    'y': randomInteger(150, 500)
  };

  var randomFeatures = FEATURES.sort(arrayShuffle).slice(0, randomInteger(1, FEATURES.length));

  var offer = {
    'author': {
      'avatar': 'img/avatars/user0' + randomInteger(1, 8) + '.png'
    },

    'offer': {
      'title': getRandomElement(TITLES),
      'address': location.x + ', ' + location.y,
      'price': randomInteger(1000, 1000000),
      'type': getRandomElement(ROOMTYPE),
      'rooms': randomInteger(1, 5),
      'guests': randomInteger(1, 5),
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
    var xPinPossition = offers[offerIndex].location.x + 25;
    var yPinPossition = offers[offerIndex].location.y + 35;

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
var OFFERS_COUNT = 8;

document.querySelector('.map').classList.remove('map--faded');
generateOffers(OFFERS_COUNT);
generateButtons();
renderOffer(offers[0]);
