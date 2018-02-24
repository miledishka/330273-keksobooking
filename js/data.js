'use strict';

(function () {
  window.constants = {
    'OFFERS_COUNT': 5,
    'NOTICE_FORM_DISABLED': 'notice__form--disabled',
    'PINS_WITHOUT_MAIN_PIN': '.map__pin:not(.map__pin--main)',
  };

  window.offerType = function (englishOfferType) {
    var apartmentsTypes = {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом'
    };

    return apartmentsTypes[englishOfferType];
  };

  window.removePins = function (offers) {
    var mapPins = document.querySelectorAll(window.constants.PINS_WITHOUT_MAIN_PIN);

    mapPins.forEach(function (pin) {
      var result = offers.find(function (offer) {
        return offer.index === pin.id;
      });
      if (!result) {
        pin.remove();
      }
    });
  };

  window.offers = [];
})();
