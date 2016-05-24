import defaultOptions from './modules/options';

function setStyle (el, styles) {
  for(let prop in styles) {
    el.style[prop] = styles[prop];
  }
}


function addMultiListener(elem, events, callback, useCapture) {
  const eventsList = events.split(' ');

  for(let i = 0, len = eventsList.length; i < len; ++i) {
    elem.addEventListener(eventsList[i], callback, useCapture);
  }
}

const map = new WeakMap();

class WaveButton {
  constructor(element, settings) {
    map.set(this, {
      element,
      settings,
      spanArray: [],
    });
  }

  margeSettings() {
    if ((typeof map.get(this).settings).toLowerCase() !== 'object') {
      map.get(this).settings = {};
    }

    map.get(this).settings = Object.assign(defaultOptions, map.get(this).settings);
  }


  makeButton(event) {
    const element = map.get(this).element;
    const settings = map.get(this).settings;

    const df = document.createDocumentFragment();
    const span = document.createElement("span");

    const rect = element.getBoundingClientRect();
    const posX = event.clientX - (rect.left + document.body.scrollLeft) + "px";
    const posY = event.clientY - (rect.top + document.body.scrollTop) + "px";
    const scaleValue = element.offsetWidth / parseInt(settings.scale, 10);
    const scale = 'scale(' + scaleValue + ')';
    const time = parseInt(settings.transitionDuration, 10);

    const transitionProperty = "opacity, transform";
    const transitionTimingFunction = settings.transitionTimingFunction;
    const transitionDuration = time + "ms";

    span.className = settings.customClass;

    setStyle(span, {
      "left": posX,
      "top" : posY,

      "webkitTransitionProperty": transitionProperty,
      "transitionProperty": transitionProperty,

      "webkitTransitionTimingFunction": transitionTimingFunction,
      "transitionTimingFunction": transitionTimingFunction,

      "webkitTransitionDuration": transitionDuration,
      "transitionDuration": transitionDuration,

      "willChange": "transform, opacity",

    });


    setTimeout(() => {
      setStyle(span, {
        "opacity": 1,
        "webkitTransform": scale,
        "transform": scale,
      });
    }, 32 );


    df.appendChild(span);
    map.get(this).spanArray.push(span);
    element.appendChild(df);

  }

  removeButton() {
    const element = map.get(this).element;
    const settings = map.get(this).settings;

    const time = parseInt(settings.transitionDuration, 10);
    const thirdTime = parseInt(time / 3, 10);

    const scaleValue = element.offsetWidth / (parseInt(settings.scale, 10) - 1);
    const scale = 'scale(' + scaleValue + ')';

    const spanArray = map.get(this).spanArray;

    if (spanArray.length) {
      const span = spanArray.shift();

      setTimeout(() => {
          setStyle(span, {
          "opacity": 0,
          "webkitTransform": scale,
          "transform": scale,
        });

      }, ( time - thirdTime) );

      setTimeout(() => {
        span.style.willChange = "auto";
        element.removeChild(span);
      }, ( time + thirdTime - 32) );
    }
  }

  init() {
    this.margeSettings();

    addMultiListener(map.get(this).element, "mousedown", (event) => {

      this.makeButton(event);

    }, false);


     addMultiListener(map.get(this).element, "mouseup mouseleave", (event) => {

      this.removeButton(event);

    }, false);

  }

}

export default WaveButton;
