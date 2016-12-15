'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function Game() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Game);

    this.resetGameState = function () {
        localStorage.removeItem('gameState');
        window.location = window.location;
    };

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

    this.save = function () {
        // create one big json string and put it in a localStorage

        var recipesState = [];
        _this.recipes.recipes.forEach(function (rec) {
            recipesState.push({
                id: rec.id,
                persists: rec.persists,
                price: rec.price,
                title: rec.title,
                level: rec.level,
                maxLevel: rec.maxLevel,
                description: rec.description,
                upgrade: {
                    type: rec.upgradeType,
                    increase: rec.upgradeIncrease
                }
            });
        });

        var gameState = [{
            currentCoinAmount: _this.currentCoinAmount,
            amountPerSecond: _this.amountPerSecond,
            amountPerClick: _this.amountPerClick,
            clickBonusMultiplier: _this.clickBonusMultiplier,
            clickButton: _this.clickButton,
            timer: _this.timer,
            recipes: recipesState
        }];

        localStorage.setItem('gameState', JSON.stringify(gameState));
    };

    this.amountPerSecondCalculated = function () {
        var newAmount = _this.currentCoinAmount - _this.oldAmount;
        _this.oldAmount = _this.currentCoinAmount;
        return newAmount >= 0 ? newAmount.toFixed(2) : false;
    };

    this.draw = function () {
        /*
        since timers/tickers in Javascript are a P.I.T.A
        define how long its been since this tick has been done, decide then how amount seconds have passed;
        thus how many amountPerSeconds should be added
        */
        var milliseconds = _this.defineMillisecondsPassed();

        _this.timer += milliseconds;
        _this.increaseAmountBy(_this.getAmountPerSecond() * (milliseconds / 1000));
        _this.recipes.drawRecipes();
        // tick every second
        if (_this.timer >= 1000) {
            _this.timer = 0;
            _this.save();

            var aps = _this.amountPerSecondCalculated();
            // if (aps !== false) {
            //     document.querySelector('#amountPerSecond').innerHTML = aps
            // }
            console.log('Amount per second: ' + aps);
        }

        document.querySelector('#currentCoinAmount').innerHTML = _this.getAmount();
        document.querySelector('#currentCoinsPerSecond').innerHTML = _this.getAmountPerSecond();
        document.querySelector('#clickAmount').innerHTML = _this.getClickAmount();
        document.querySelector('#bonusMultiplier').innerHTML = _this.getBonusMultiplier();
    };

    this.currentCoinAmount = options.currentCoinAmount ? options.currentCoinAmount : 0;
    this.amountPerSecond = options.amountPerSecond ? options.amountPerSecond : 0;
    this.amountPerClick = options.amountPerClick ? options.amountPerClick : 2;
    this.clickBonusMultiplier = options.clickBonusMultiplier ? options.clickBonusMultiplier : 100;

    this.clickButton = document.querySelector('#clicker');
    this.clickButton.addEventListener('click', function (event) {
        _this.increaseAmountBy(_this.getClickAmount());
        _this.user.increaseExp(1);
    });

    document.querySelector('#resetGameState').addEventListener('click', function (event) {
        return _this.resetGameState();
    });

    this.timer = 0;
    this.recipes = new Recipes(options.recipes);
    this.user = new User();

    this.oldAmount = this.currentCoinAmount;
};