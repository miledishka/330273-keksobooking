'use strict';

(function () {
  var SERVER_URL = 'https://js.dump.academy/keksobooking';
  var STATUS_SUCCESS = 200;
  var STATUS_BAD_REQUEST = 400;
  var REQUEST_TIMEOUT = 10000; // 10s

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    var onLoadHandler = function () {
      if (xhr.status === STATUS_SUCCESS) {
        onLoad(xhr.response);
      } else if (xhr.status === STATUS_BAD_REQUEST) {
        onError(xhr.response);
      } else {
        onError(xhr.response);
      }
    };

    var onErrorHandler = function () {
      onError('Произошла ошибка соединения');
    };

    var onTimeoutHandler = function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    };

    xhr.addEventListener('load', onLoadHandler);
    xhr.addEventListener('error', onErrorHandler);
    xhr.addEventListener('timeout', onTimeoutHandler);

    xhr.timeout = REQUEST_TIMEOUT; // 10s

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('GET', SERVER_URL + '/data');
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('POST', SERVER_URL);
    xhr.send(data);
  };

  var removeErrors = function () {
    var errorsElement = document.querySelector('#errors');
    if (errorsElement !== null) {
      errorsElement.remove();
    }
  };

  var renderErrors = function (errors) {
    window.backend.removeErrors();

    var node = document.createElement('div');
    node.classList.add('errors');
    node.id = 'errors';
    node.innerHTML = Array(errors).join('<br>');
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend = {
    load: load,
    save: save,
    renderErrors: renderErrors,
    removeErrors: removeErrors
  };
})();
