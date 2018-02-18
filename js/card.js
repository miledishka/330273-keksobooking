'use strict';

(function () {
  var PHOTO_WIDTH = 68;
  var PHOTO_HEIGHT = 68;
  var offerTemplate = document.querySelector('template').content;
  var offerElement = offerTemplate.cloneNode(true);
  var features = offerElement.querySelector('.popup__features');
  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters-container');

  var createRoomImage = function (offers, index) {
    var image = document.createElement('img');
    image.src = offers.offer.photos[index];
    image.width = PHOTO_WIDTH;
    image.height = PHOTO_HEIGHT;

    return image;
  };

  window.renderOffer = function (offerData) {
    offerElement.querySelector('h3').textContent = offerData.offer.title;
    offerElement.querySelector('p small').textContent = offerData.offer.address;
    offerElement.querySelector('.popup__price').innerHTML = offerData.offer.price + '	&#x20bd/ночь';
    offerElement.querySelector('h4').textContent = window.offerType(offerData.offer.type);
    offerElement.querySelectorAll('p')[2].textContent = offerData.offer.rooms + ' комнаты для ' + offerData.offer.guests + ' гостей';
    offerElement.querySelectorAll('p')[3].textContent = 'Заезд после ' + offerData.offer.checkin + ', выезд до ' + offerData.offer.checkout;
    offerElement.querySelectorAll('p')[4].textContent = offerData.offer.description;
    offerElement.querySelector('.popup__avatar').src = offerData.author.avatar;

    for (var i = 0; i < offerData.offer.features.length; i++) {
      var featureLi = document.createElement('li');
      featureLi.classList.add('feature');
      featureLi.classList.add('feature--' + offerData.offer.features[i]);
      features.appendChild(featureLi);
    }

    var pictures = offerElement.querySelector('.popup__pictures');
    for (var m = 0; m < offerData.offer.photos.length; m++) {
      var photoLi = document.createElement('li');
      photoLi.appendChild(createRoomImage(offerData, m));
      pictures.appendChild(photoLi);
    }

    map.insertBefore(offerElement, mapFilters);
  };
})();
