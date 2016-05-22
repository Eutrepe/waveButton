/* ie11 support */

if (typeof Object.assign != 'function') {
  (function () {
    Object.assign = function (target) {
      'use strict';
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var output = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
            if (Object.prototype.hasOwnProperty.call(source, nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };
  })();
}




import WaveButton from './WaveButton/WaveButton';

var elements = document.querySelectorAll(".wave-button");

Array.prototype.forEach.call(elements, function(el, i){

  const waveButton = new WaveButton(el, { });
  waveButton.init();
});
