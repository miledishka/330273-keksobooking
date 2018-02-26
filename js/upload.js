'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var UPLOAD_IMAGE_WIDTH = 40;
  var UPLOAD_IMAGE_HEIGHT = 44;

  var uploadImage = function (fileChooser, preview) {
    var onFileChooserChange = function (evt) {
      var file = evt.currentTarget.files[0];

      if (file) {
        var fileName = file.name.toLowerCase();

        var matches = FILE_TYPES.some(function (it) {
          return fileName.endsWith(it);
        });

        if (matches) {
          var reader = new FileReader();

          var onFileLoad = function () {
            var image = document.createElement('img');
            image.src = reader.result;
            image.width = UPLOAD_IMAGE_WIDTH;
            image.height = UPLOAD_IMAGE_HEIGHT;

            preview.replaceChild(image, preview.querySelector('img'));
          };

          reader.addEventListener('load', onFileLoad);
          reader.readAsDataURL(file);
        }
      }
    };

    fileChooser.addEventListener('change', onFileChooserChange);
  };

  var avatarFileChooser = document.querySelector('.notice__photo input[type=file]');
  var avatarPreview = document.querySelector('.notice__preview');
  var houseFileChooser = document.querySelector('.form__photo-container input[type=file]');
  var housePreview = document.querySelector('.form__photo');

  uploadImage(avatarFileChooser, avatarPreview);
  uploadImage(houseFileChooser, housePreview);
})();
