'use strict';

var recipes = [{
    title: 'Item 1',
    price: 35,
    basePrice: 35,
    level: 1,
    description: 'Increases click amount by:',
    upgrade: {
        type: 'clickAmount',
        increase: 1
    }
}, {
    title: 'Item 2',
    price: 60,
    basePrice: 60,
    level: 1,
    description: 'Increases amount per second by:',
    upgrade: {
        type: 'amountPerSecond',
        increase: .50
    }
}, {
    title: 'Item 3',
    price: 67,
    basePrice: 67,
    level: 1,
    description: 'Increases amount per second by:',
    upgrade: {
        type: 'amountPerSecond',
        increase: .53
    }
}, {
    title: 'Mega booster',
    price: 2500,
    basePrice: 2500,
    level: 1,
    maxLevel: 1,
    description: 'Adds an extra percentage to your clicks by:',
    upgrade: {
        type: 'clickMultiplier',
        increase: 5
    }
}, {
    title: 'Mega booster 2',
    price: 3000,
    basePrice: 3000,
    level: 1,
    maxLevel: 3,
    description: 'Adds an extra percentage to your clicks by:',
    upgrade: {
        type: 'clickMultiplier',
        increase: 5
    }
}];

// and an incremental ID to all recipe. Easier to identify later on when we want to request a savestate
var counter = 1;
recipes.forEach(function (rec) {
    rec.id = counter;
    ++counter;
});

var game = null;

var existingGameState = localStorage.getItem('gameState');
if (existingGameState) {
    game = new Game(JSON.parse(existingGameState).find(function (r) {
        return r;
    }));
} else {
    game = new Game({ recipes: recipes });
}

window.requestAnimFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
}();

(function animloop() {
    requestAnimFrame(animloop);
    game.draw();
})();