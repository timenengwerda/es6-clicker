'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
    function User() {
        var _this = this;

        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, User);

        this.increaseExp = function (exp) {
            return _this.setExp(_this.getExp() + exp);
        };

        this.setExp = function (exp) {
            _this.currentExp = exp;
            _this.updateExpBar();
        };

        this.getExp = function () {
            return _this.currentExp;
        };

        this.level = 1;
        this.currentExp = 0;
        this.expNeeded = 100;
        this.bonuses = options.bonuses ? options.bonuses : {};
        this.expBar = $('.expBar');

        this.updateExpBar();
    }

    _createClass(User, [{
        key: 'updateExpBar',
        value: function updateExpBar() {
            this.expBar.html(this.currentExp + '/' + this.expNeeded);
        }
    }]);

    return User;
}();