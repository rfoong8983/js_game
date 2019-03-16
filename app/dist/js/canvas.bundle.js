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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/background/ambient_bkgrd.js":
/*!*****************************************!*\
  !*** ./src/background/ambient_bkgrd.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.js");

var utils = _interopRequireWildcard(_utils);

var _particle = __webpack_require__(/*! ../shapes/particle */ "./src/shapes/particle.js");

var _particle2 = _interopRequireDefault(_particle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function AmbientBkg(ctx, radius, color, particles) {
    this.ctx = ctx;
    this.radius = radius;
    this.color = color;
    this.gravity = 1;
    this.velocity = {
        x: Math.random() * 2,
        y: Math.random() * 1
    };
    this.ttl = 100;
    this.opacity = 1;
    this.particles = particles;
}

AmbientBkg.prototype.generate = function (n) {
    // this.particles = [];
    for (var i = 0; i < n; i++) {
        this.particles.push(new _particle2.default({
            x: (Math.random() - 0.8) * 1200,
            y: (Math.random() - 0.8) * 800,
            radius: this.radius,
            color: 'rgba(227, 234, 239, 1)',
            ctx: this.ctx
        }));
    }
};

AmbientBkg.prototype.draw = function () {
    this.ctx.save();

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.shadowColor = '#e3eaef';
    this.ctx.shadowBlur = 20;
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.restore();
};

AmbientBkg.prototype.update = function () {
    this.draw();

    this.velocity.y += this.gravity;
    this.y += this.velocity.y;
    this.ttl -= 1;
};

module.exports = AmbientBkg;

/***/ }),

/***/ "./src/background/gradient_bkgrd.js":
/*!******************************************!*\
  !*** ./src/background/gradient_bkgrd.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.js");

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function GradientBkg(ctx, startColor, endColor) {
    this.ctx = ctx;
    this.startColor = startColor;
    this.endColor = endColor;
    this.bkg = this.ctx.createLinearGradient(0, 0, 0, 800);
}

GradientBkg.prototype.draw = function () {
    this.bkg.addColorStop(0, this.startColor);
    this.bkg.addColorStop(1, this.endColor);
    this.ctx.fillStyle = this.bkg;
    this.ctx.fillRect(0, 0, 1200, 800);
};

module.exports = GradientBkg;

/***/ }),

/***/ "./src/background/mountains_bkgrd.js":
/*!*******************************************!*\
  !*** ./src/background/mountains_bkgrd.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.js");

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function MountainsBkg(ctx, amount, height, color) {
    // canvas - height = distance from top of screen
    // the higher the height, the taller the mtn
    this.ctx = ctx;
    this.amount = amount;
    this.height = height;
    this.color = color;
}

MountainsBkg.prototype.draw = function () {
    for (var i = 0; i < this.amount; i++) {
        var width = 1200 / this.amount;
        this.ctx.beginPath();
        this.ctx.moveTo(i * width, 1200);
        this.ctx.lineTo(i * width + width + 325, 800);
        this.ctx.lineTo(i * width + width / 2, 800 - this.height);
        this.ctx.lineTo(i * width - 325, 800);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
};

module.exports = MountainsBkg;

/***/ }),

/***/ "./src/game/game.js":
/*!**************************!*\
  !*** ./src/game/game.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Game() {
    this.test = [];
}

module.exports = Game;

/***/ }),

/***/ "./src/game/game_view.js":
/*!*******************************!*\
  !*** ./src/game/game_view.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _circle = __webpack_require__(/*! ../shapes/circle.js */ "./src/shapes/circle.js");

var _star = __webpack_require__(/*! ../shapes/star */ "./src/shapes/star.js");

var _star2 = _interopRequireDefault(_star);

var _ministar = __webpack_require__(/*! ../shapes/ministar */ "./src/shapes/ministar.js");

var _ministar2 = _interopRequireDefault(_ministar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GradientBkg = __webpack_require__(/*! ../background/gradient_bkgrd */ "./src/background/gradient_bkgrd.js");
var MountainsBkg = __webpack_require__(/*! ../background/mountains_bkgrd */ "./src/background/mountains_bkgrd.js");
var AmbientBkg = __webpack_require__(/*! ../background/ambient_bkgrd */ "./src/background/ambient_bkgrd.js");

var MOVES = {
    w: [0, -1],
    a: [-1, 0],
    s: [0, 1],
    d: [1, 0]
};

var GameView = function () {
    function GameView(game, staticCtx, animatedCtx) {
        _classCallCheck(this, GameView);

        this.staticCtx = staticCtx;
        this.animatedCtx = animatedCtx;
        this.game = game;
        this.particles = [];

        this.init();
    }

    _createClass(GameView, [{
        key: 'init',
        value: function init() {
            this.gradBkg = new GradientBkg(this.staticCtx, '#171e26', '#3f586b');
            this.mountBkg1 = new MountainsBkg(this.staticCtx, 1, 750, '#384551');
            this.mountBkg2 = new MountainsBkg(this.staticCtx, 2, 700, '#2b3843');
            this.mountBkg3 = new MountainsBkg(this.staticCtx, 3, 500, '#26333E');
            this.ambientBkg = new AmbientBkg(this.animatedCtx, 2, '#171e26', this.particles);
            this.stars = [];
            // this.miniStars is being changed
            // by star #shatter method
            this.miniStars = [];
            this.backgroundStars = [];
            this.ticker = 0;
        }
    }, {
        key: 'displayStaticBkgrd',
        value: function displayStaticBkgrd() {
            this.gradBkg.draw();
            this.mountBkg1.draw();
            this.mountBkg2.draw();
            this.mountBkg3.draw();
            // this.backgroundStars.forEach(star => {
            //     star.draw();
            // });
        }
    }, {
        key: 'start',
        value: function start() {
            this.displayStaticBkgrd();
            requestAnimationFrame(this.animate.bind(this));
        }
    }, {
        key: 'animate',
        value: function animate(time) {
            this.animatedCtx.clearRect(0, 0, 1200, 800);
            requestAnimationFrame(this.animate.bind(this));

            // console.log(this.stars);
            // for (let i = 0; i < this.stars.length; i++) {
            //     const star = this.stars[i];
            //     this.stars[i].update();
            //     if (this.stars[i].radius === 0 ) {
            //         this.stars.splice(i, 1);
            //     }
            // }
            for (var i = 0; i < this.particles.length; i++) {
                this.particles[i].update();
                if (this.particles[i].ttl === 0) {
                    this.particles.splice(i, 1);
                }
            }

            // this.miniStars.forEach((mini, i) => {
            //     mini.update();
            //     if (mini.ttl === 0) {
            //         this.miniStars.splice(i, 1);
            //     }
            // });

            this.ticker++;
            if (this.ticker % 75 === 0) {
                var x = Math.random() * 1200;
                this.ambientBkg.generate(70);
            }
            // if (this.ticker % 75 === 0) {
            //     const x = Math.random() * 1200;
            //     this.stars.push(new Star({
            //         x, y: -100, radius: 30, 
            //         color: 'white', ctx: this.animatedCtx, 
            //         miniStars: this.miniStars
            //     }));
            // }
        }
    }, {
        key: 'createMountainRange',
        value: function createMountainRange(mountainAmount, height, color) {
            // canvas - height = distance from top of screen
            for (var i = 0; i < mountainAmount; i++) {
                var mountainWidth = 1200 / mountainAmount;

                this.animatedCtx.beginPath();
                this.animatedCtx.moveTo(i * mountainWidth, 800);
                this.animatedCtx.lineTo(i * mountainWidth + mountainWidth + 325, 800);
                this.animatedCtx.lineTo(i * mountainWidth + mountainWidth / 2, 800 - height);
                this.animatedCtx.lineTo(i * mountainWidth - 325, 800);
                this.animatedCtx.fillStyle = color;
                this.animatedCtx.fill();
            }
        }
    }], [{
        key: 'MOVES',
        get: function get() {
            return MOVES;
        }
    }]);

    return GameView;
}();

exports.default = GameView;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game_view = __webpack_require__(/*! ./game/game_view */ "./src/game/game_view.js");

var _game_view2 = _interopRequireDefault(_game_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Game = __webpack_require__(/*! ./game/game */ "./src/game/game.js");


document.addEventListener('DOMContentLoaded', function () {
    var staticCanvas = document.getElementById("staticCanvas");
    var animatedCanvas = document.getElementById("animatedCanvas");
    staticCanvas.width = 1200;
    staticCanvas.height = 800;
    animatedCanvas.width = 1200;
    animatedCanvas.height = 800;

    var staticCtx = staticCanvas.getContext('2d');
    var animatedCtx = animatedCanvas.getContext('2d');
    var game = new Game();
    // new GameView(game, staticCtx, animatedCtx).start();
});

/***/ }),

/***/ "./src/shapes/circle.js":
/*!******************************!*\
  !*** ./src/shapes/circle.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateCircles = exports.Circle = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.js");

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Circle = exports.Circle = function () {
    function Circle(options) {
        _classCallCheck(this, Circle);

        this.x = options.x;
        this.y = options.y;
        this.radius = options.radius;
        this.minRadius = options.radius;
        this.dx = options.dx;
        this.dy = options.dy;
        this.color = options.color;
        this.ctx = options.ctx;
    }

    _createClass(Circle, [{
        key: 'draw',
        value: function draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }, {
        key: 'update',
        value: function update(ctx) {
            if (this.x + this.radius > 1200 || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }
            if (this.y + this.radius > 800 || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }

            // interactivity
            // if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            //     && mouse.y - this.y < 50 && mouse.y - this.y > - 50) {
            //     if (this.radius < 70) {
            //         this.radius +=3;
            //     }
            // }

            this.x += this.dx;
            this.y += this.dy;
            this.draw(ctx);
        }
    }]);

    return Circle;
}();

var generateCircles = exports.generateCircles = function generateCircles(options) {
    // console.log(options.ctx);
    var colorArray = ['#e7fff7', '#98e8ff', '#45a2e8', '#2278ff', '#005ff5'];

    var result = [];

    for (var i = 0; i < options.size; i++) {
        var color = colorArray[Math.floor(Math.random() * colorArray.length)];
        var x = Math.random() * (1200 - options.radius * 2) + options.radius;
        var y = Math.random() * (800 - options.radius * 2) + options.radius;
        var dx = void 0;
        var dy = void 0;
        if (options.endSpeed) {
            dx = utils.randomIntFromRange(options.speed, options.endSpeed);
            dy = utils.randomIntFromRange(options.speed, options.endSpeed);
        } else {
            dx = (Math.random() - 0.5) * options.speed;
            dy = (Math.random() - 0.5) * options.speed;
        }
        var radius = options.radius;
        var ctx = options.ctx;
        result.push(new Circle({ x: x, y: y, radius: radius, dx: dx, dy: dy, color: color, ctx: ctx }));
    }

    return result;
};

/***/ }),

/***/ "./src/shapes/ministar.js":
/*!********************************!*\
  !*** ./src/shapes/ministar.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.js");

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MiniStar = function () {
    function MiniStar(options) {
        _classCallCheck(this, MiniStar);

        this.x = options.x;
        this.y = options.y;
        this.radius = options.radius;
        this.color = options.color;
        this.ctx = options.ctx;
        this.gravity = 0.1;
        this.friction = 0.8;
        this.velocity = {
            x: utils.randomIntFromRange(-5, 5),
            y: utils.randomIntFromRange(-15, 15)
        };
        // time to live = 100 frames
        this.ttl = 300;
        this.opacity = 1;
    }

    _createClass(MiniStar, [{
        key: 'draw',
        value: function draw() {
            this.ctx.save();

            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            this.ctx.fillStyle = 'rgba(227, 234, 239, ' + this.opacity + ')';
            this.ctx.shadowColor = '#e3eaef';
            this.ctx.shadowBlur = 20;
            this.ctx.fill();
            this.ctx.closePath();

            this.ctx.restore();
        }
    }, {
        key: 'update',
        value: function update() {
            this.draw();

            if (this.y + this.radius + this.velocity.y > 800) {
                this.velocity.y = -this.velocity.y * this.friction;
            } else {
                this.velocity.y += this.gravity;
            }

            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.ttl -= 1;
            // the lower ttl is, the larger the value
            //    1 / ttl will return
            // subtract a larger and larger value from
            //    opacity the lower a ministar's ttl
            this.opacity -= 1 / this.ttl;
        }
    }]);

    return MiniStar;
}();

exports.default = MiniStar;

/***/ }),

/***/ "./src/shapes/particle.js":
/*!********************************!*\
  !*** ./src/shapes/particle.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.js");

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Particle = function () {
    function Particle(options) {
        _classCallCheck(this, Particle);

        this.x = options.x;
        this.y = options.y;
        this.radius = options.radius;
        this.color = options.color;
        this.ctx = options.ctx;
        this.gravity = 0.1;
        this.friction = 0.8;
        this.velocity = {
            x: utils.randomIntFromRange(1, 5),
            y: Math.random() * 3
        };
        // time to live = 100 frames
        this.ttl = 550;
        this.opacity = 1;
    }

    _createClass(Particle, [{
        key: 'draw',
        value: function draw() {
            this.ctx.save();

            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            this.ctx.fillStyle = 'rgba(227, 234, 239, ' + this.opacity + ')';
            this.ctx.shadowColor = '#e3eaef';
            this.ctx.shadowBlur = 20;
            this.ctx.fill();
            this.ctx.closePath();

            this.ctx.restore();
        }
    }, {
        key: 'update',
        value: function update() {
            this.draw();

            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.ttl -= 1;
            // the lower ttl is, the larger the value
            //    1 / ttl will return
            // subtract a larger and larger value from
            //    opacity the lower a ministar's ttl
            this.opacity -= 1 / this.ttl;
        }
    }]);

    return Particle;
}();

exports.default = Particle;

/***/ }),

/***/ "./src/shapes/star.js":
/*!****************************!*\
  !*** ./src/shapes/star.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ministar = __webpack_require__(/*! ./ministar */ "./src/shapes/ministar.js");

var _ministar2 = _interopRequireDefault(_ministar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Star = function () {
    function Star(options) {
        _classCallCheck(this, Star);

        this.x = options.x;
        this.y = options.y;
        this.radius = options.radius;
        this.color = options.color;
        this.ctx = options.ctx;
        this.gravity = 1;
        this.friction = 0.8;
        this.velocity = {
            x: 0,
            y: 3
        };
        this.miniStars = options.miniStars;
        this.opacity = 1;
    }

    _createClass(Star, [{
        key: 'shatter',
        value: function shatter(arr) {
            this.radius -= 3;
            for (var i = 0; i < 8; i++) {
                arr.push(new _ministar2.default({
                    x: this.x,
                    y: this.y,
                    radius: 2,
                    color: 'rgba(227, 234, 239, 1)',
                    ctx: this.ctx
                }));
            }

            // console.log(arr);
        }
    }, {
        key: 'draw',
        value: function draw() {
            this.ctx.save();

            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            this.ctx.fillStyle = this.color;
            this.ctx.shadowColor = '#e3eaef';
            this.ctx.shadowBlur = 20;
            this.ctx.fill();
            this.ctx.closePath();

            this.ctx.restore();
        }
    }, {
        key: 'update',
        value: function update() {
            this.draw();

            if (this.y + this.radius + this.velocity.y > 800) {
                // this.y = -this.velocity.y;
                this.velocity.y = -this.velocity.y * this.friction;
                this.shatter(this.miniStars);
            } else {
                this.velocity.y += this.gravity;
            }
            this.y += this.velocity.y;
        }
    }]);

    return Star;
}();

exports.default = Star;

/***/ }),

/***/ "./src/utils/utils.js":
/*!****************************!*\
  !*** ./src/utils/utils.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
    var xDist = x2 - x1;
    var yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

module.exports = { randomIntFromRange: randomIntFromRange, randomColor: randomColor, distance: distance };

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map