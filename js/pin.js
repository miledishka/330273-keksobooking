'use strict';

(function () {
  var BUTTON_PIX_WIDTH = 50;
  var BUTTON_PIX_HEIGHT = 70;
  var PIN_HEIGHT = 40;
  var PIN_WIDTH = 40;

  var removePopup = function () {
    var popup = document.querySelector('.map__card.popup');
    if (popup !== null) {
      popup.remove();
    }
  };

  var onPinClickHandler = function (evt) {
    removePopup();

    var offerId = parseInt(evt.currentTarget.id, 10);
    window.renderOffer(window.offers[offerId]);
  };

  var createPinImage = function (index) {
    var image = document.createElement('img');
    image.src = window.offers[index].author.avatar;
    image.width = PIN_WIDTH;
    image.height = PIN_HEIGHT;
    image.draggable = false;

    return image;
  };

  var createPinButton = function (index) {
    var xPinPossition = window.offers[index].location.x + BUTTON_PIX_WIDTH / 2;
    var yPinPossition = window.offers[index].location.y + BUTTON_PIX_HEIGHT / 2;

    var button = document.createElement('button');
    button.className = 'map__pin';
    button.id = index;
    button.style.left = xPinPossition + 'px';
    button.style.top = yPinPossition + 'px';

    return button;
  };

  window.generateButtons = function () {
    var mapPins = document.querySelector('.map__pins');
    var buttons = document.createDocumentFragment();

    for (var offerIndex = 0; offerIndex < window.constants.OFFERS_COUNT; offerIndex++) {
      var button = createPinButton(offerIndex);
      button.appendChild(createPinImage(offerIndex));
      buttons.appendChild(button);
      button.addEventListener('click', onPinClickHandler);
    }

    mapPins.appendChild(buttons);
  };
})();
