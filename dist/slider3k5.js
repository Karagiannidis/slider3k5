/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _slider3k5_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _slider3k5_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_slider3k5_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _slider3k5_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _slider3k5_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_slider3k5_scss__WEBPACK_IMPORTED_MODULE_1__);



/***/ }),
/* 1 */
/***/ (function(module, exports) {

//create and return the arrow container with prev and next arrows
function createArrows(sliderContainerId) {
  //create the arrows container
  var arrowsContainer = document.createElement("div");
  arrowsContainer.classList.add("slider3k5__btns"); //create prev arrow

  var prevArrow = document.createElement("div");
  prevArrow.classList.add("slider3k5__btn");
  prevArrow.id = "prev"; //create next arrow

  var nextArrow = document.createElement("div");
  nextArrow.classList.add("slider3k5__btn");
  nextArrow.id = "next"; //appends arrows to container

  arrowsContainer.appendChild(prevArrow);
  arrowsContainer.appendChild(nextArrow); //add nextArrow Functionality

  nextArrow.addEventListener("click", function () {
    addClickFunctionality(0, sliderContainerId);
  }); //add prevArrow Functionality

  prevArrow.addEventListener("click", function () {
    addClickFunctionality(-1, sliderContainerId);
  }); //return container

  return arrowsContainer;
} //appends arrows to slider except if data-arrows is set to false


function appendArrows(sliderContainerId) {
  var sliderContainer = document.getElementById(sliderContainerId);
  Array.from(sliderContainer.getElementsByClassName("slider3k5")).forEach(function (singleSlider) {
    if (singleSlider.dataset.arrows != "false") {
      singleSlider.appendChild(createArrows(sliderContainerId));
    }
  });
}

; //creates slider, first parameter is the Parent Id, second param is options

function createSlider3k5(targetId, options) {
  var targetDiv = document.getElementById(targetId);
  var sliderContainer = document.createElement("div");
  sliderContainer.classList.add("slider3k5");

  if (options.hasArrows == false) {
    sliderContainer.dataset.arrows = false;
  } else {
    sliderContainer.dataset.arrows = true;
  }

  if (options.hasDots == false) {
    sliderContainer.dataset.dots = false;
  } else {
    sliderContainer.dataset.dots = true;
  }

  targetDiv.appendChild(sliderContainer);

  if (options.slidesFile) {
    createSlides(options.slidesFile, sliderContainer, targetId, options);
    appendArrows(targetId);

    if (options.autoplayMode != false) {
      if (options.autoplayDirection == 'rtl') {
        if (Number.isInteger(options.autoplaySpeed)) {
          sliderAutoplay(options.autoplaySpeed, options.autoplayDirection, targetId);
        } else {
          sliderAutoplay(3000, options.autoplayDirection, targetId);
        }
      } else {
        sliderAutoplay(options.autoplaySpeed, options.autoplayDirection, targetId);
      }
    }

    if (!options.animationStyle) {
      createAnimationStyle(0, targetId);
    } else {
      createAnimationStyle(options.animationStyle, targetId);
    }
  } else {
    console.log('Slides File not specified.');
  }
}

function createSlides(jsonFileUrl, sliderContainer, sliderContainerId, options) {
  var firstSlide;
  var lastSlide;
  fetch(jsonFileUrl).then(function (response) {
    return response.json();
  }).then(function (parsed) {
    parsed.forEach(function (_ref, i) {
      var title = _ref.title,
          description = _ref.description,
          moreLink = _ref.moreLink,
          isBgLink = _ref.isBgLink,
          url = _ref.url;
      var newSlide = document.createElement("div");
      newSlide.classList.add("slider3k5__slide");
      newSlide.style.backgroundImage = "url('" + url + "')";

      if (i == 0) {
        firstSlide = newSlide;
        newSlide.classList.add("active");
      } else if (i + 1 == parsed.length) {
        lastSlide = newSlide;
      }

      if (title != "") {
        var titleDiv = document.createElement("div");
        titleDiv.classList.add('slider3k5__slide__title');
        titleDiv.innerHTML = title;
        newSlide.appendChild(titleDiv);
      }

      if (description != "") {
        var descriptionDiv = document.createElement("div");
        descriptionDiv.classList.add('slider3k5__slide__description');
        descriptionDiv.innerHTML = description;
        newSlide.appendChild(descriptionDiv);
      }

      if (moreLink != "") {
        var moreDiv = document.createElement("a");
        moreDiv.setAttribute("href", moreLink);

        if (isBgLink) {
          moreDiv.classList.add('slider3k5__slide__morebg');
        } else {
          if (options.moreText) {
            moreDiv.textContent = options.moreText;
          } else {
            moreDiv.textContent = "Read more";
          }

          moreDiv.classList.add('slider3k5__slide__more');
        }

        newSlide.appendChild(moreDiv);
      }

      sliderContainer.appendChild(newSlide);
    });

    if (sliderContainer.dataset.dots != "false") {
      sliderContainer.appendChild(createDots(parsed.length, sliderContainerId));
    }
  });
} //creates dots for slider


function createDots(slidesCounter, sliderContainerId) {
  var dotsContainer = document.createElement("div");
  dotsContainer.classList.add("slider3k5__dots");

  var _loop = function _loop(i) {
    var newDot = document.createElement("div");
    newDot.classList.add("slider3k5__dot");

    if (i == 0) {
      newDot.classList.add('active');
    }

    newDot.addEventListener('click', function () {
      var activeDot = document.querySelector('#' + sliderContainerId + ' .slider3k5__dot.active');
      var nextDot = newDot;
      activeDot.classList.remove('active');
      nextDot.classList.add('active');
      var activeSlide = document.querySelector('#' + sliderContainerId + ' .slider3k5__slide.active');
      var nextSlide = activeSlide.parentElement.getElementsByClassName('slider3k5__slide');

      if (activeSlide != nextSlide[i]) {
        activeSlide.classList.remove('active');
        nextSlide[i].classList.add('active');
      }
    });
    dotsContainer.appendChild(newDot);
  };

  for (var i = 0; i < slidesCounter; i++) {
    _loop(i);
  }

  return dotsContainer;
} //sets the autoplay speed and dir


function sliderAutoplay(speed, direction, sliderContainerId) {
  if (direction != 'rtl') {
    var nextArrow = document.querySelector('#' + sliderContainerId + ' .slider3k5__btn#next');
    setInterval(function () {
      nextArrow.click();
    }, speed);
  } else {
    var prevArrow = document.querySelector('#' + sliderContainerId + ' .slider3k5__btn#prev');
    setInterval(function () {
      prevArrow.click();
    }, speed);
  }
} //updates dots on arrow click depending on which arrow is pressed


function updateDotOnArrowClick(arrow, sliderContainerId) {
  var activeDot = document.querySelector('#' + sliderContainerId + ' .slider3k5__dot.active');
  var allDots = activeDot.parentElement.getElementsByClassName('slider3k5__dot');

  for (var i = 0; i < allDots.length; i++) {
    if (allDots[i] == activeDot) {
      allDots[i].classList.remove('active');

      if (arrow == "prev") {
        if (i == 0) {
          allDots[allDots.length - 1].classList.add('active');
        } else {
          allDots[i - 1].classList.add('active');
        }
      } else {
        if (i < allDots.length - 1) {
          allDots[i + 1].classList.add('active');
        } else {
          allDots[0].classList.add('active');
        }
      }
    }
  }
} //adds click functionallity on arrow depending the arrow (0 for next, -1 for prev)


function addClickFunctionality(i, sliderContainerId) {
  var activeSlide = document.querySelector('#' + sliderContainerId + ' .slider3k5__slide.active');
  var nextSlide;

  if (i == 0) {
    nextSlide = activeSlide.nextElementSibling;
  } else {
    nextSlide = activeSlide.previousElementSibling;
  }

  if (nextSlide == null || !nextSlide.classList.contains('slider3k5__slide')) {
    if (i == 0) {
      nextSlide = activeSlide.parentElement.getElementsByClassName('slider3k5__slide')[i];
    } else {
      nextSlide = activeSlide.parentElement.getElementsByClassName('slider3k5__slide')[activeSlide.parentElement.getElementsByClassName('slider3k5__slide').length - 1];
    }
  }

  if (nextSlide.classList.contains('slider3k5__slide')) {
    activeSlide.classList.remove('active');
    nextSlide.classList.add('active');
  } //synchornize arrows with dots


  if (i == 0) {
    updateDotOnArrowClick("next", sliderContainerId);
  } else {
    updateDotOnArrowClick("prev", sliderContainerId);
  }
}

; //adds the css class for the selected animation

function createAnimationStyle(animation, sliderContainerId) {
  var slider = document.getElementById(sliderContainerId).querySelector(".slider3k5");

  switch (animation) {
    case 1:
      slider.classList.add('slider3k5Animation1');
      break;

    case 2:
      slider.classList.add('slider3k5Animation2');
      break;

    case 3:
      slider.classList.add('slider3k5Animation3');
      break;

    case 4:
      slider.classList.add('slider3k5Animation4');
      break;

    case 5:
      slider.classList.add('slider3k5Animation5');
      break;

    default:
      //default animation
      break;
  }
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })
/******/ ]);