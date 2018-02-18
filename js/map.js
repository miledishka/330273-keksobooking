'use strict';

(function () {
  var HALF_MAIN_PIN_HEIGHT = 44;

  var mapWithPins = document.querySelector('.map');

  var VALID_MAP_AREA = {
    'MIN_PIN_X': 0,
    'MAX_PIN_X': mapWithPins.clientWidth,
    'MIN_PIN_Y': 150 - HALF_MAIN_PIN_HEIGHT,
    'MAX_PIN_Y': 500 - HALF_MAIN_PIN_HEIGHT
  };

  var onMapPinMainMouseUpHandler = function () {
    var userForm = document.querySelector('.notice__form');

    if (mapWithPins.classList.contains('map--faded')) {
      window.generateOffers(window.constants.OFFERS_COUNT);
      window.generateButtons();
      window.onRoomNumberChangeHandler();
      mapWithPins.classList.remove('map--faded');
    }

    userForm.classList.remove(window.constants.NOTICE_FORM_DISABLED);
  };

  var onPinMouseDownHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var top = mapPinMain.offsetTop - shift.y;
      var left = mapPinMain.offsetLeft - shift.x;

      if (left > VALID_MAP_AREA.MAX_PIN_X) {
        left = VALID_MAP_AREA.MAX_PIN_X;
      }
      if (left < VALID_MAP_AREA.MIN_PIN_X) {
        left = VALID_MAP_AREA.MIN_PIN_X;
      }
      if (top > VALID_MAP_AREA.MAX_PIN_Y) {
        top = VALID_MAP_AREA.MAX_PIN_Y;
      }
      if (top < VALID_MAP_AREA.MIN_PIN_Y) {
        top = VALID_MAP_AREA.MIN_PIN_Y;
      }

      mapPinMain.style.top = top + 'px';
      mapPinMain.style.left = left + 'px';
      window.address.value = (left - HALF_MAIN_PIN_HEIGHT) + ', ' + (top + HALF_MAIN_PIN_HEIGHT);
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
