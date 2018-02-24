'use strict';

(function () {
  window.constants = {
    'OFFERS_COUNT': 8,
    'NOTICE_FORM_DISABLED': 'notice__form--disabled',
    'PINS_WITHOUT_MAIN_PIN': '.map__pin:not(.map__pin--main)',
  };

  window.offerType = function (englishOfferType) {
    var apartmentsTypes = {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом',
    };

    return apartmentsTypes[englishOfferType];
  };

  window.offers = [];
})();
