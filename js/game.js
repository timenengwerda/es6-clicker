class Game {
    constructor (options = {}) {
        this.currentCoinAmount = (options.currentCoinAmount) ? options.currentCoinAmount : 90
        this.amountPerSecond = (options.amountPerSecond) ? options.amountPerSecond : 1
        this.amountPerClick = (options.amountPerClick) ? options.amountPerClick : 100
        this.clickBonusMultiplier = (options.clickBonusMultiplier) ? options.clickBonusMultiplier : 100

        this.clickButton = document.querySelector('#clicker')
        clicker.addEventListener('click', event => this.increaseAmountBy(this.getClickAmount()))

        this.timer = 0
        this.recipes = new Recipes(options.recipes)
    }

    getClickAmount = () => Math.round(this.amountPerClick * (this.clickBonusMultiplier/100))
    setClickAmount = (amount) => this.amountPerClick = amount
    increaseAmountBy = (amount) => this.currentCoinAmount += amount

    getAmount = () => Math.round(this.currentCoinAmount)
    setAmount = (amount) => this.currentCoinAmount = amount

    getBonusMultiplier = () => this.clickBonusMultiplier
    setBonusMultiplier= (mp) => this.clickBonusMultiplier = mp

    setAmountPerSecond = (amount) => this.amountPerSecond = amount
    getAmountPerSecond = () => this.amountPerSecond

    defineMillisecondsPassed = () => {
        const now = new Date().getTime()

        const lastTick = localStorage.getItem('lastTick');

        let millisecondsPassed = 0;
        if (lastTick) {
            millisecondsPassed = now - lastTick
        }

        localStorage.setItem("lastTick", now);

        return millisecondsPassed
    }

    draw = () => {
        /*
        since timers/tickers in Javascript are a P.I.T.A
        define how long its been since this tick has been done, decide then how amount seconds have passed;
        thus how many amountPerSeconds should be added
        */
        let milliseconds = this.defineMillisecondsPassed();

        this.timer += milliseconds
        if (this.timer >= 1000) {
            this.increaseAmountBy(this.getAmountPerSecond() * (this.timer / 1000))
            this.timer = 0

            this.recipes.drawRecipes()
        }


        document.querySelector('#currentCoinAmount').innerHTML = this.getAmount()
        document.querySelector('#currentCoinsPerSecond').innerHTML = this.getAmountPerSecond()
        document.querySelector('#clickAmount').innerHTML = this.getClickAmount()
        document.querySelector('#bonusMultiplier').innerHTML = this.getBonusMultiplier()
    }
}
