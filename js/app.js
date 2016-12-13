const recipes = [
    {
        title: 'Item 1',
        price: 150,
        level: 1,
        description: 'Increases click amount by:',
        upgrade: {
            type: 'clickAmount',
            increase: 1
        }
    },
    {
        title: 'Item 2',
        price: 260,
        level: 1,
        description: 'Increases amount per second by:',
        upgrade: {
            type: 'amountPerSecond',
            increase: 1.25
        }
    },
    {
        title: 'Item 3',
        price: 400,
        level: 1,
        description: 'Increases amount per second by:',
        upgrade: {
            type: 'amountPerSecond',
            increase: 1
        }
    },
    {
        title: 'Mega booster',
        price: 4000,
        level: 1,
        maxLevel: 1,
        description: 'Adds an extra percentage to your clicks by:',
        upgrade: {
            type: 'clickMultiplier',
            increase: 5
        }
    }
]

// and an incremental ID to all recipe. Easier to identify later on when we want to request a savestate
let counter = 1
recipes.forEach(rec => {
    rec.id = counter
    ++counter
})

let game = null

const existingGameState = localStorage.getItem('gameState')
console.log(existingGameState)
if (existingGameState) {
    game = new Game(JSON.parse(existingGameState).find(r => r));
} else {
    game = new Game({recipes});
}


window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

(function animloop() {
    requestAnimFrame(animloop);
    game.draw();
})();
