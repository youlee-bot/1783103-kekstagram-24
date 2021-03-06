const scaleFieldset = document.querySelector('.img-upload__scale');
const targetImageDiv = document.querySelector('.img-upload__preview');
const targetImage = targetImageDiv.querySelector('img');
const scaleField = document.querySelector('.scale__control--value');
const listOfEffects = document.querySelector('.effects__list');
const sliderElement = document.querySelector('.effect-level__slider');
const filterField = document.querySelector('.effect-level__value');
const filterSettings = {
  none: {
    rangeSettings: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    style: 'display: block',
    counter: '',
  },
  chrome: {
    rangeSettings: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    style: 'grayscale',
    counter: '',
  },
  sepia: {
    rangeSettings: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    style: 'sepia',
    counter: '',
  },
  marvin: {
    rangeSettings: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
    style: 'invert',
    counter: '%',
  },
  phobos: {
    rangeSettings: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    style: 'blur',
    counter: 'px',
  },
  heat: {
    rangeSettings: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    style: 'brightness',
    counter: '',
  },
};
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP_SCALE = 25;

const setScaleFieldNumber = () => parseInt(scaleField.value.slice(0, -1), 10);

noUiSlider.create(sliderElement, filterSettings.none.rangeSettings);

const changeScale = (value) => {
  const styleString = `transform: scale(${ value/100 })`;
  return styleString;
};

const imgStyleSettings = {
  size: changeScale(setScaleFieldNumber()),
  filter: '',
};

imgStyleSettings.size = changeScale(setScaleFieldNumber());

const setImageStyle = () => {
  targetImage.setAttribute('style', `${imgStyleSettings.size  };${  imgStyleSettings.filter}`);
};


const scaleClickHandler = (evt) => {
  let scaleFieldNumber = setScaleFieldNumber();
  if (evt.target.classList.contains('scale__control--bigger')) {
    scaleFieldNumber += STEP_SCALE;
    if (scaleFieldNumber > MAX_SCALE) {
      scaleFieldNumber = MAX_SCALE;
    }
    scaleField.value = `${ scaleFieldNumber  }%`;
  }
  if (evt.target.classList.contains('scale__control--smaller')) {
    scaleFieldNumber -= STEP_SCALE;
    if (scaleFieldNumber < MIN_SCALE) {
      scaleFieldNumber = MIN_SCALE;
    }
    scaleField.value = `${ scaleFieldNumber  }%`;
  }
  imgStyleSettings.size = changeScale(scaleFieldNumber);
  setImageStyle();
};


const effectsClickHandler = (evt) => {
  const updateRangebar = (values, handle) => {
    imgStyleSettings.filter = `filter: ${  filterSettings[evt.target.value].style  }(${  values[handle]  }${filterSettings[evt.target.value].counter })`;
    if (evt.target.value === 'none') {
      imgStyleSettings.filter = 'display: block';
      sliderElement.closest('fieldset').setAttribute('style', 'display:none');
    } else {
      sliderElement.closest('fieldset').setAttribute('style', '');
    }
    setImageStyle();
    filterField.setAttribute('value', values[handle]);
  };

  if (evt.target.value) {
    sliderElement.noUiSlider.updateOptions(filterSettings[evt.target.value].rangeSettings);

    sliderElement.noUiSlider.on('update', updateRangebar);
  }

};

if (imgStyleSettings.filter==='') {
  sliderElement.closest('fieldset').setAttribute('style', 'display:none;');
}

listOfEffects.addEventListener('click', effectsClickHandler);
scaleFieldset.addEventListener('click', scaleClickHandler);


