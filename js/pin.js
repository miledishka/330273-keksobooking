'use strict';

(function () {
  var BUTTON_PIX_WIDTH = 50;
  var BUTTON_PIX_HEIGHT = 70;
  var PIN_HEIGHT = 40;
  var PIN_WIDTH = 40;
  var ESC_KEYCODE = 27;

  window.removePopup = function () {
    var popup = document.querySelector('.map__card.popup');
    if (popup !== null) {
      popup.remove();
      document.removeEventListener('keydown', onKeydownPopupCloseHandler);
    }
  };

  var onKeydownPopupCloseHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.removePopup();
    }
  };

  var onPinClickHandler = function (evt) {
    window.removePopup();

    var offerId = parseInt(evt.currentTarget.id, 10);
    window.renderOffer(window.offers[offerId]);

    var popupButtonClose = document.querySelector('.popup__close');
    popupButtonClose.addEventListener('click', onClosePinClickHandler);
    document.addEventListener('keydown', onKeydownPopupCloseHandler);
  };

  var onClosePinClickHandler = function () {
    window.removePopup();
  };

  var createPinImage = function (offer) {
    var image = document.createElement('img');
    image.src = offer.author.avatar;
    image.width = PIN_WIDTH;
    image.height = PIN_HEIGHT;
    image.draggable = false;

    return image;
  };

  var createPinButton = function (offer) {
    var xPinPossition = offer.location.x + BUTTON_PIX_WIDTH / 2;
    var yPinPossition = offer.location.y + BUTTON_PIX_HEIGHT / 2;

    var button = document.createElement('button');
    button.className = 'map__pin';
    button.id = offer.index;
    button.style.left = xPinPossition + 'px';
    button.style.top = yPinPossition + 'px';

    return button;
  };

  window.generateButtons = function (offers) {
    var mapPins = document.querySelector('.map__pins');
    var buttons = document.createDocumentFragment();

    var maxOffers = offers.length;
    if (maxOffers > 0) {
      if (maxOffers > window.constants.OFFERS_COUNT) {
        maxOffers = window.constants.OFFERS_COUNT;
        offers = offers.slice().slice(0, window.constants.OFFERS_COUNT);
      }

      for (var offerIndex = 0; offerIndex < maxOffers; offerIndex++) {
        var button = createPinButton(offers[offerIndex]);
        button.appendChild(createPinImage(offers[offerIndex]));
        buttons.appendChild(button);
        button.addEventListener('click', onPinClickHandler);
      }

      mapPins.appendChild(buttons);
    }
  };
})();
