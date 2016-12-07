'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function Game() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Game);

    this.getClickAmount = function () {
        return Math.round(_this.amountPerClick * (_this.clickBonusMultiplier / 100));
    };

    this.setClickAmount = function (amount) {
        return _this.amountPerClick = amount;
    };

    this.increaseAmountBy = function (amount) {
        return _this.currentCoinAmount += amount;
    };

    this.getAmount = function () {
        return Math.round(_this.currentCoinAmount);
    };

    this.setAmount = function (amount) {
        return _this.currentCoinAmount = amount;
    };

    this.getBonusMultiplier = function () {
        return _this.clickBonusMultiplier;
    };

    this.setBonusMultiplier = function (mp) {
        return _this.clickBonusMultiplier = mp;
    };

    this.setAmountPerSecond = function (amount) {
        return _this.amountPerSecond = amount;
    };

    this.getAmountPerSecond = function () {
        return _this.amountPerSecond;
    };

    this.defineMillisecondsPassed = function () {
        var now = new Date().getTime();

        var lastTick = localStorage.getItem('lastTick');

        var millisecondsPassed = 0;
        if (lastTick) {
            millisecondsPassed = now - lastTick;
        }

        localStorage.setItem("lastTick", now);

        return millisecondsPassed;
    };

    this.draw = function () {
        /*
        since timers/tickers in Javascript are a P.I.T.A
        define how long its been since this tick has been done, decide then how amount seconds have passed;
        thus how many amountPerSeconds should be added
        */
        var milliseconds = _this.defineMillisecondsPassed();

        _this.timer += milliseconds;
        if (_this.timer >= 1000) {
            _this.increaseAmountBy(_this.getAmountPerSecond() * (_this.timer / 1000));
            _this.timer = 0;

            _this.recipes.drawRecipes();
        }

        document.querySelector('#currentCoinAmount').innerHTML = _this.getAmount();
        document.querySelector('#currentCoinsPerSecond').innerHTML = _this.getAmountPerSecond();
        document.querySelector('#clickAmount').innerHTML = _this.getClickAmount();
        document.querySelector('#bonusMultiplier').innerHTML = _this.getBonusMultiplier();
    };

    this.currentCoinAmount = options.currentCoinAmount ? options.currentCoinAmount : 90;
    this.amountPerSecond = options.amountPerSecond ? options.amountPerSecond : 1;
    this.amountPerClick = options.amountPerClick ? options.amountPerClick : 100;
    this.clickBonusMultiplier = options.clickBonusMultiplier ? options.clickBonusMultiplier : 100;

    this.clickButton = document.querySelector('#clicker');
    clicker.addEventListener('click', function (event) {
        return _this.increaseAmountBy(_this.getClickAmount());
    });

    this.timer = 0;
    this.recipes = new Recipes(options.recipes);
};