'use strict';

(function () {
  var FILTER_ANY = 'any';
  var filterForm = document.querySelector('.map__filters');
  var houseType = filterForm.querySelector('#housing-type');
  var housePrice = filterForm.querySelector('#housing-price');
  var houseRooms = filterForm.querySelector('#housing-rooms');
  var houseGuests = filterForm.querySelector('#housing-guests');
  var houseFeatures = filterForm.querySelector('#housing-features');

  var compareArrays = function (offerFeatures, checkedFeatures) {
    var result = false;
    checkedFeatures.forEach(function (checkedFeature) {
      result = offerFeatures.includes(checkedFeature);
    });

    return result;
  };

  var renderFilteredOffers = function () {
    window.removePopup();
    window.filterParams = {
      type: houseType.value,
      price: housePrice.value,
      rooms: houseRooms.value,
      guests: houseGuests.value,
      features: houseFeatures.value
    };

    var filteredOffers = window.offers.filter(filterOffers);
    window.removePins(filteredOffers);
    window.generateButtons(filteredOffers);
  };

  var onFilterFormChange = function () {
    window.debounce(renderFilteredOffers);
  };

  var filterOffers = function (element) {
    var result =
      houseTypeFilter(element) &&
      housePriceFilter(element) &&
      houseRoomsFilter(element) &&
      houseGuestsFilter(element) &&
      houseFeaturesFilter(element);

    return result;
  };

  var houseTypeFilter = function (element) {
    return element.offer.type === window.filterParams.type || window.filterParams.type === FILTER_ANY;
  };

  var housePriceFilter = function (element) {
    var filterPrice = window.filterParams.price;
    var roomPrice = element.offer.price;
    var result;

    switch (filterPrice) {
      case 'any':
        result = true;
        break;
      case 'low':
        result = roomPrice < 10000;
        break;
      case 'high':
        result = roomPrice > 50000;
        break;
      case 'middle':
        result = roomPrice >= 10000 && roomPrice <= 50000;
        break;
    }

    return result;
  };

  var houseRoomsFilter = function (element) {
    return element.offer.rooms === parseInt(window.filterParams.rooms, 10) || window.filterParams.rooms === FILTER_ANY;
  };

  var houseGuestsFilter = function (element) {
    return element.offer.guests === parseInt(window.filterParams.guests, 10) || window.filterParams.guests === FILTER_ANY;
  };

  var houseFeaturesFilter = function (element) {
    var checkedHouseFeatures = houseFeatures.querySelectorAll('input:checked');
    var checkedElements = [];

    checkedHouseFeatures.forEach(function (feature) {
      checkedElements.push(feature.value);
    });

    if (checkedElements.length === 0) {
      return true;
    } else {
      return compareArrays(element.offer.features, checkedElements);
    }
  };

  filterForm.addEventListener('change', onFilterFormChange);
})();
