'use strict';

(function () {
  var onRoomTypeChangeHandler = function (evt) {
    var ROOM_PRICES_LIMITS = {
      'flat': 0,
      'bungalo': 1000,
      'house': 5000,
      'palace': 10000
    };

    roomPrice.min = ROOM_PRICES_LIMITS[evt.currentTarget.value];
  };

  var onRoomTimeInChangeHandler = function (evt) {
    roomTimeOut.value = evt.currentTarget.value;
  };

  var onRoomTimeOutChangeHandler = function (evt) {
    roomTimeIn.value = evt.currentTarget.value;
  };

  var onResetFormClickHandler = function () {
    var mapPins = document.querySelectorAll(window.constants.PINS_WITHOUT_MAIN_PIN);

    mapPins.forEach(function (pin) {
      pin.remove();
    });
    window.offers = [];
    mapWithPins.classList.add('map--faded');
    userForm.classList.add(window.constants.NOTICE_FORM_DISABLED);
  };

  window.onRoomNumberChangeHandler = function () {
    var ROOM_NUMBER_AND_CAPACITY_MAPPING = {
      '1': ['1'],
      '2': ['1', '2'],
      '3': ['1', '2', '3'],
      '100': ['0']
    };

    var availableCapacity = ROOM_NUMBER_AND_CAPACITY_MAPPING[roomNumber.value];
    for (var i = 0; i < roomCapacity.options.length; i++) {
      var roomOption = roomCapacity.options[i];

      if (availableCapacity.includes(roomOption.value)) {
        roomOption.disabled = false;
      } else {
        roomOption.disabled = true;
      }
    }

    if (roomCapacity.selectedOptions[0].disabled) {
      var firstValidCapacity = ROOM_NUMBER_AND_CAPACITY_MAPPING[roomNumber.value][0];
      roomCapacity.value = firstValidCapacity;
    }
  };

  var onLoadFormHandler = function () {
    window.removeErrors();
    userForm.reset();
    window.onRoomNumberChangeHandler();
  };

  var errorFormHandler = function (errors) {
    var errorsForShow = [];

    for (var i = 0; i < errors.length; i++) {
      var formElement = userForm.querySelector('name=[' + errors[i].fieldName + ']');
      formElement.style.outline = '2px dashed red';

      var errorMessage = '<b>' + errors[i].fieldName + ':</b> ' + errors[i].errorMessage + '<br>';
      errorsForShow.push(errorMessage);
    }

    window.renderErrors(errorsForShow);
  };

  var onSubmitHandler = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(userForm), onLoadFormHandler, errorFormHandler);
  };

  var userForm = document.querySelector('.notice__form');
  window.address = document.querySelector('#address');
  var roomType = document.querySelector('#type');
  var roomPrice = document.querySelector('#price');
  var roomTimeIn = document.querySelector('#timein');
  var roomTimeOut = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var roomCapacity = document.querySelector('#capacity');
  var resetForm = document.querySelector('.form__reset');
  var mapWithPins = document.querySelector('.map');

  userForm.addEventListener('submit', onSubmitHandler);
  roomType.addEventListener('change', onRoomTypeChangeHandler);
  roomTimeIn.addEventListener('change', onRoomTimeInChangeHandler);
  roomTimeOut.addEventListener('change', onRoomTimeOutChangeHandler);
  roomNumber.addEventListener('change', window.onRoomNumberChangeHandler);
  resetForm.addEventListener('click', onResetFormClickHandler);
})();
