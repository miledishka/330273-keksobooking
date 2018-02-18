'use strict';

(function () {
  var BUTTON_PIX_WIDTH = 50;
  var BUTTON_PIX_HEIGHT = 70;

  var onPinClickHandler = function (evt) {
    window.removePreviousPopup();

    var offerId = parseInt(evt.currentTarget.id, 10);
    window.renderOffer(window.offers[offerId]);
  };

  window.generateButtons = function () {
    var mapPins = document.querySelector('.map__pins');
    var buttons = document.createDocumentFragment();

    for (var offerIndex = 0; offerIndex < window.OFFERS_COUNT; offerIndex++) {
      var xPinPossition = window.offers[offerIndex].location.x + BUTTON_PIX_WIDTH / 2;
      var yPinPossition = window.offers[offerIndex].location.y + BUTTON_PIX_HEIGHT / 2;

      var image = document.createElement('img');
      image.src = window.offers[offerIndex].author.avatar;
      image.width = 40;
      image.height = 40;
      image.draggable = false;

      var button = document.createElement('button');
      button.className = 'map__pin';
      button.id = offerIndex;
      button.style = 'left: ' + xPinPossition + 'px; top: ' + yPinPossition + 'px;';

      button.appendChild(image);
      buttons.appendChild(button);
      button.addEventListener('click', onPinClickHandler);
    }

    mapPins.appendChild(buttons);
  };
})();
