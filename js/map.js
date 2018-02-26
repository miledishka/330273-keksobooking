'use strict';

(function () {
  var mapWithPins = document.querySelector('.map');
  var HALF_MAIN_PIN_HEIGHT = 44;
  var HALF_MAIN_PIN_WIDTH = 33;
  var MAP_BOTOM_FILTER_HEIGHT = 50;
  var MIN_Y_POSITION = 150;
  var VALID_MAP_AREA = {
    'min_x': HALF_MAIN_PIN_WIDTH,
    'max_x': mapWithPins.clientWidth - HALF_MAIN_PIN_WIDTH,
    'min_y': MIN_Y_POSITION - HALF_MAIN_PIN_HEIGHT,
    'max_y': mapWithPins.clientHeight - HALF_MAIN_PIN_HEIGHT - MAP_BOTOM_FILTER_HEIGHT
  };
  var MAP_X_OFFSET = Math.max(0, (window.innerWidth - mapWithPins.clientWidth) / 2);
  var VALID_X_WITH_MAP_OFFSET = {
    'min': VALID_MAP_AREA.min_x + MAP_X_OFFSET,
    'max': VALID_MAP_AREA.max_x + MAP_X_OFFSET,
  };
  var MAP_FADED_CLASS = 'map--faded';
  var MAIN_PIN_START_POSITION = {
    x: '50%',
    y: '375px'
  };

  window.setDefaultMainPinPosition = function () {
    mapPinMain.style.top = MAIN_PIN_START_POSITION.y;
    mapPinMain.style.left = MAIN_PIN_START_POSITION.x;
  };

  var setIdToOffers = function () {
    for (var i = 0; i < window.offers.length; i++) {
      window.offers[i].index = i;
    }
  };

  var onLoadOffersHandler = function (offers) {
    window.offers = offers;
    setIdToOffers();
    window.removeErrors();
    window.generateButtons(window.offers);
    window.onRoomNumberChangeHandler();
    window.onRoomTypeChangeHandler();
    mapWithPins.classList.remove(MAP_FADED_CLASS);
  };

  var onErrorLoadOffersHandler = function (errors) {
    window.renderErrors(errors);
  };

  var onMapPinMainMouseUpHandler = function () {
    if (mapWithPins.classList.contains(MAP_FADED_CLASS)) {
      window.backend.load(onLoadOffersHandler, onErrorLoadOffersHandler);
    }

    window.userForm.classList.remove(window.constants.NOTICE_FORM_DISABLED);
  };

  window.setCurrentMainPosition = function () {
    setAddress(mapPinMain.offsetLeft, mapPinMain.offsetTop);
  };

  var setAddress = function (left, top) {
    var currentLeft = parseInt(left, 10);
    var currentTop = parseInt(top, 10) + HALF_MAIN_PIN_HEIGHT;
    window.address.value = currentLeft + ', ' + currentTop;
  };

  var onPinMouseDownHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    setAddress(mapPinMain.offsetLeft, mapPinMain.offsetTop);

    var validPosition = function (current, min, max) {
      return Math.min(Math.max(current, min), max);
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: validPosition(moveEvt.clientX, VALID_X_WITH_MAP_OFFSET.min, VALID_X_WITH_MAP_OFFSET.max),
        y: validPosition(moveEvt.clientY, VALID_MAP_AREA.min_y, VALID_MAP_AREA.max_y)
      };

      var top = mapPinMain.offsetTop - shift.y;
      var left = mapPinMain.offsetLeft - shift.x;

      left = validPosition(left, VALID_MAP_AREA.min_x, VALID_MAP_AREA.max_x);
      top = validPosition(top, VALID_MAP_AREA.min_y, VALID_MAP_AREA.max_y);

      mapPinMain.style.top = top + 'px';
      mapPinMain.style.left = left + 'px';
      setAddress(left, top);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var mapPinMain = document.querySelector('.map__pin--main');
  mapPinMain.addEventListener('mouseup', onMapPinMainMouseUpHandler);
  mapPinMain.addEventListener('mousedown', onPinMouseDownHandler);
})();
