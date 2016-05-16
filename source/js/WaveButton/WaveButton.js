import defaultOptions from './modules/options';

function setStyle (el, styles) {
  for(let prop in styles) {
    el.style[prop] = styles[prop];
  }
}

const map = new WeakMap();

class WaveButton {
  constructor(element, settings) {
    map.set(this, {
      element,
      settings,
    });
  }

  margeSettings() {
    if ((typeof map.get(this).settings).toLowerCase() !== 'object') {
      map.get(this).settings = {};
    }

    map.get(this).settings = Object.assign(defaultOptions, map.get(this).settings);
  }


  buildButton(event) {
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
    const thirdTime = parseInt(time / 3, 10);

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
    }, 50 );


    setTimeout(() => {
      span.style.opacity = 0;
    }, ( time - thirdTime) );

    setTimeout(() => {
      span.style.willChange = "auto";
      element.removeChild(span);
    }, ( time + thirdTime) );


    df.appendChild(span);
    element.appendChild(df);

  }

  makeButton() {
    this.margeSettings();

    map.get(this).element.addEventListener("click", (event) => {

      this.buildButton(event);

    });
  }

}

export default WaveButton;
