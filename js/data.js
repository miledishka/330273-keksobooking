'use strict';

(function () {
  var MIN_OFFER_AVATAR = 1;
  var MAX_OFFER_AVATAR = 8;
  var MIN_OFFER_PRICE = 1000;
  var MAX_OFFER_PRICE = 1000000;
  var MIN_OFFER_ROOMS = 1;
  var MAX_OFFER_ROOMS = 5;
  var MIN_OFFER_GUESTS = 1;
  var MAX_OFFER_GUESTS = 5;
  var MIN_LOCATION_X = 300;
  var MAX_LOCATION_X = 900;
  var MIN_LOCATION_Y = 150;
  var MAX_LOCATION_Y = 500;

  window.constants = {
    'OFFERS_COUNT': 8,
    'NOTICE_FORM_DISABLED': 'notice__form--disabled',
    'PINS_WITHOUT_MAIN_PIN': '.map__pin:not(.map__pin--main)',
  };

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

  window.generateOffers = function (offersCount) {
    for (var i = 0; i < offersCount; i++) {
      window.offers.push(window.generateOffer());
    }
  };

  window.offerType = function (englishOfferType) {
    var apartmentsTypes = {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом',
    };

    return apartmentsTypes[englishOfferType];
  };

  window.generateOffer = function () {
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
  window.offers = [];
})();
