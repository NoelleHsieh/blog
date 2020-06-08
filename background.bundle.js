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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/lib/background.cycle.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/lib/background.cycle.js":
/*!****************************************!*\
  !*** ./src/js/lib/background.cycle.js ***!
  \****************************************/
/*! exports provided: backgroundCycle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"backgroundCycle\", function() { return backgroundCycle; });\n/*\n * The MIT License\n *\n * Copyright March 17 2014 Guus van Lankveld.\n *\n * Permission is hereby granted, free of charge, to any person obtaining a copy\n * of this software and associated documentation files (the \"Software\"), to deal\n * in the Software without restriction, including without limitation the rights\n * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n * copies of the Software, and to permit persons to whom the Software is\n * furnished to do so, subject to the following conditions:\n *\n * The above copyright notice and this permission notice shall be included in\n * all copies or substantial portions of the Software.\n *\n * THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\n * THE SOFTWARE.\n */\n// const $ = require('jquery');\n\nvar currentImageIndex = -1;\nvar imageIds = new Array();\nvar fadeSpeed;\n\n//Sizing constants. these determine the value of the CSS property 'background-size' of the selected container\nconst SCALING_MODE_NONE = 0; //Uses the original image size\nconst SCALING_MODE_STRETCH = 1; //Sets 'background-size' to '100% 100%'. This stretches the background image to fill the container, discarding the images aspect ratio.\nconst SCALING_MODE_COVER = 2; //Sets 'background-size' to 'cover'. This makes the background images fill the entire container while retaining its aspect ratio.\nconst SCALING_MODE_CONTAIN = 3; //Sets 'background-size' to 'contain'. This scales the bakcground image to the largest size such that both its width and its height can fit inside the content area\n\n/**\n * Adds a cycling (fading) background to the selected element\n * @param {Object} options Options for tweaking the cycle setings.\n * imageUrls: an array of strings representing urls to the images to cycle through\n * duration: the nr of miliseconds between two fades.\n * fadeSpeed: the nr of miliseconds it takes for one image to fade out to another.\n * backgroundSize: specify a value for the css3 property 'background size' or one of the following constants; SCALING_MODE_NONE, SCALING_MODE_STRETCH, SCALING_MODE_COVER, SCALING_MODE_CONTAIN\n */\nvar backgroundCycle = function(options) {\n  var settings = $.extend(\n    {\n      imageUrls: [],\n      duration: 5000,\n      fadeSpeed: 1000,\n      backgroundPosition: 'center bottom',\n      backgroundSize: SCALING_MODE_NONE\n    },\n    options\n  );\n\n  fadeSpeed = settings.fadeSpeed;\n\n  var marginTop = this.css(\"margin-top\");\n  var marginRight = this.css(\"margin-right\");\n  var marginBottom = this.css(\"margin-bottom\");\n  var marginLeft = this.css(\"margin-left\");\n\n  if (!this.is(\"body\")) {\n    this.css({\n      position: \"relative\"\n    });\n  }\n\n  var contents = $(document.createElement(\"div\"));\n\n  var children = this.children().detach();\n  contents.append(children);\n\n  imageIds = new Array();\n\n  for (var i = 0; i < settings.imageUrls.length; i++) {\n    var id = \"bgImage\" + i;\n    var src = settings.imageUrls[i];\n    var cssClass = \"cycle-bg-image\";\n\n    var image = $(document.createElement(\"div\"));\n    image.attr(\"id\", id);\n    image.attr(\"class\", cssClass);\n\n    var sizeMode;\n\n    switch (settings.backgroundSize) {\n      default:\n        sizeMode = settings.backgroundSize;\n        break;\n      case SCALING_MODE_NONE:\n        sizeMode = \"auto\";\n        break;\n      case SCALING_MODE_STRETCH:\n        sizeMode = \"100% 100%\";\n        break;\n      case SCALING_MODE_COVER:\n        sizeMode = \"cover\";\n        break;\n      case SCALING_MODE_CONTAIN:\n        sizeMode = \"contain\";\n        break;\n    }\n\n    image.css({\n      \"background-image\": \"url('\" + src + \"')\",\n      \"background-repeat\": \"no-repeat\",\n      \"background-position\": settings.backgroundPosition,\n      \"background-size\": sizeMode,\n      \"-moz-background-size\": sizeMode,\n      \"-webkit-background-size\": sizeMode,\n      position: \"fixed\",\n      left: marginLeft,\n      top: marginTop,\n      right: marginRight,\n      bottom: marginBottom\n    });\n\n    this.append(image);\n\n    imageIds.push(id);\n  }\n\n  contents.css({\n    position: \"absolute\",\n    left: marginLeft,\n    top: marginTop,\n    right: marginRight,\n    bottom: marginBottom\n  });\n\n  this.append(contents);\n  $(\".cycle-bg-image\").hide();\n  $(\"#\" + imageIds[0]).fadeIn();\n\n  if (settings.duration > 0) {\n    setInterval(cycleToNextImage, settings.duration);\n  }\n\n  return {\n    cycleToNextImage: function(previousImageIndex, currentImageIndex) {\n      if (previousImageIndex === currentImageIndex) return;\n\n      var previousImageId = imageIds[previousImageIndex];\n\n      if (currentImageIndex >= imageIds.length) {\n        currentImageIndex = 0;\n      }\n\n      var options = {\n        duration: fadeSpeed,\n        queue: true\n      };\n\n      $(\"#\" + previousImageId).fadeOut(options);\n      $(\"#\" + imageIds[currentImageIndex]).fadeIn(options);\n    }\n  };\n};\n\nbackgroundCycle.prototype = Object.create($.prototype);\n\n\n\n\n\n//# sourceURL=webpack:///./src/js/lib/background.cycle.js?");

/***/ })

/******/ });