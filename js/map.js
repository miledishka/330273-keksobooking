'use strict';

(function () {
  var mapWithPins = document.querySelector('.map');
  var HALF_MAIN_PIN_HEIGHT = 44;
  var MAP_BOTOM_FILTER_HEIGHT = 50;
  var MIN_Y_POSITION = 150;
  var VALID_MAP_AREA = {
    'min_x': 0,
    'max_x': mapWithPins.clientWidth,
    'min_y': MIN_Y_POSITION - HALF_MAIN_PIN_HEIGHT,
    'max_y': mapWithPins.clientHeight - HALF_MAIN_PIN_HEIGHT - MAP_BOTOM_FILTER_HEIGHT
  };
  var MAP_X_OFFSET = Math.max(0, (window.innerWidth - mapWithPins.clientWidth) / 2);
  var VALID_X_WITH_MAP_OFFSET = {
    'min': VALID_MAP_AREA.min_x + MAP_X_OFFSET,
    'max': VALID_MAP_AREA.max_x + MAP_X_OFFSET,
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
      window.address.value = left + ', ' + (top + HALF_MAIN_PIN_HEIGHT);
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
