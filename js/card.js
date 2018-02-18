'use strict';

(function () {
  window.removePreviousPopup = function () {
    var popup = document.querySelector('.map__card.popup');
    if (popup !== null) {
      popup.remove();
    }
  };

  window.renderOffer = function (offerData) {
    var map = document.querySelector('.map');
    var mapFilters = document.querySelector('.map__filters-container');
    var offerTemplate = document.querySelector('template').content;

    var offerElement = offerTemplate.cloneNode(true);

    offerElement.querySelector('h3').textContent = offerData.offer.title;
    offerElement.querySelector('p small').textContent = offerData.offer.address;
    offerElement.querySelector('.popup__price').innerHTML = offerData.offer.price + '	&#x20bd/ночь';
    offerElement.querySelector('h4').textContent = window.offerType(offerData.offer.type);
    offerElement.querySelectorAll('p')[2].textContent = offerData.offer.rooms + ' комнаты для ' + offerData.offer.guests + ' гостей';
    offerElement.querySelectorAll('p')[3].textContent = 'Заезд после ' + offerData.offer.checkin + ', выезд до ' + offerData.offer.checkout;
    offerElement.querySelectorAll('p')[4].textContent = offerData.offer.description;
    offerElement.querySelector('.popup__avatar').src = offerData.author.avatar;

    var features = offerElement.querySelector('.popup__features');
    features.innerHTML = '';
    for (var featureIndex = 0; featureIndex < offerData.offer.features.length; featureIndex++) {
      var featureLi = document.createElement('li');
      featureLi.className = 'feature feature--' + offerData.offer.features[featureIndex];
      features.appendChild(featureLi);
    }

    var pictures = offerElement.querySelector('.popup__pictures');
    for (var photoIndex = 0; photoIndex < offerData.offer.photos.length; photoIndex++) {
      var photoLi = document.createElement('li');
      photoLi.innerHTML = '<img src="' + offerData.offer.photos[photoIndex] + '" width="68" height="68">';
      pictures.appendChild(photoLi);
    }

    map.insertBefore(offerElement, mapFilters);
  };
})();
