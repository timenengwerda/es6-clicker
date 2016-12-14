'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Recipes = function Recipes(recipes) {
    _classCallCheck(this, Recipes);

    _initialiseProps.call(this);

    this.recipes = [];
    this.createRecipes(recipes);
    this.firstHit = true;
};

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.createRecipes = function (recipes) {
        recipes.forEach(function (recipe) {
            _this2.recipes.push(new Recipe(recipe));
        });

        _this2.drawRecipes();
    };

    this.drawRecipes = function () {
        var list = $('ul.recipes-list');

        _this2.recipes.forEach(function (r) {
            if (_this2.firstHit) {
                list.append(r.drawRecipe());
            } else {
                r.drawRecipe();
            }
        });

        _this2.firstHit = false;

        // $('#recipes').html(list)
    };
};

var Recipe = function () {
    function Recipe(options) {
        var _this = this;

        _classCallCheck(this, Recipe);

        this.createTemplate = function () {
            _this.button = $('<button />').addClass('btn').addClass('btn-primary');
            _this.listItem = $('<li />');
            _this.levelEl = $('<span />').addClass('level').html(_this.level);
            _this.titleEl = $('<span />').addClass('title').html(_this.title);
            _this.descriptionEl = $('<span />').addClass('description').html(_this.description);
            _this.upgradeIncreaseEl = $('<span />').addClass('upgradeIncrease').html(_this.upgradeIncrease);

            _this.listItem.html('\n        Amount purchased: ' + _this.levelEl.html() + '<br>\n        ' + _this.titleEl.html() + '<br>\n        ' + _this.descriptionEl.html() + ' ' + _this.upgradeIncreaseEl.html() + '<br>\n        ');

            _this.button.on('click', function (e) {
                _this.buy();
            });

            _this.listItem.append(_this.button);
        };

        this.buy = function () {
            if (game) {
                if (game.getAmount() >= _this.price) {
                    game.setAmount(game.getAmount() - _this.price);

                    switch (_this.upgradeType) {
                        case 'amountPerSecond':
                            game.setAmountPerSecond(game.getAmountPerSecond() + _this.upgradeIncrease);
                            _this.upgradeIncrease += Math.floor(.09 * _this.level);
                            break;
                        case 'clickAmount':
                            game.setClickAmount(game.getClickAmount() + _this.upgradeIncrease);
                            _this.upgradeIncrease += Math.floor(.15 * _this.level);
                            break;
                        case 'clickMultiplier':
                            game.setBonusMultiplier(game.getBonusMultiplier() + _this.upgradeIncrease);
                            break;
                    }

                    ++_this.level;
                    _this.price += Math.round(_this.price * (.055 * (_this.level - 1)));
                    _this.upgradeIncreaseprice += Math.round(_this.price * (.015 * (_this.level - 1)));

                    if (_this.level >= _this.maxLevel) {
                        _this.persists = false;
                    }

                    _this.drawRecipe();
                }
            }

            return false;
        };

        this.id = options.id ? options.id : true;
        this.persists = options.persists ? options.persists : true;
        this.price = options.price ? options.price : 0;
        this.title = options.title ? options.title : 0;
        this.level = options.level ? options.level : 0;
        this.maxLevel = options.maxLevel ? options.maxLevel : 999999;
        this.description = options.description ? options.description : 0;
        this.upgradeType = options.upgrade.type;
        this.upgradeIncrease = options.upgrade.increase;

        this.button = null;
        this.listItem = null;
        this.levelEl = null;
        this.titleEl = null;
        this.descriptionEl = null;
        this.upgradeIncreaseEl = null;

        this.createTemplate();

        if (this.level >= this.maxLevel) {
            this.persists = false;
        }
    }

    _createClass(Recipe, [{
        key: 'drawRecipe',
        value: function drawRecipe() {
            if (!this.persists) {
                if (this.button && this.listItem) {
                    this.button.off('click');
                    this.listItem.remove();
                }

                delete this;
                return null;
            }

            this.button.html(this.price);
            this.levelEl.html(this.level);
            this.titleEl.html(this.title);
            this.descriptionEl.html(this.description);
            this.upgradeIncreaseEl.html(this.upgradeIncrease);

            if (game) {
                var disabledState = game.getAmount() >= this.price ? false : true;
                this.button.prop('disabled', disabledState);
            }

            return this.listItem;
        }
    }]);

    return Recipe;
}();