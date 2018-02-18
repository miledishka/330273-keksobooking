'use strict';

(function () {
  var MAIN_PIN_HEIGHT = 88;

  var onMapPinMainMouseUpHandler = function () {
    var mapWithPins = document.querySelector('.map');
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

      var top = (mapPinMain.offsetTop - shift.y);
      var left = (mapPinMain.offsetLeft - shift.x);
      mapPinMain.style.top = top + 'px';
      mapPinMain.style.left = left + 'px';
      window.address.value = left + ', ' + (top + MAIN_PIN_HEIGHT / 2);
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
