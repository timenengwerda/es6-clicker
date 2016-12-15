class Game {
    constructor (options = {}) {
        this.currentCoinAmount = (options.currentCoinAmount) ? options.currentCoinAmount : 0
        this.amountPerSecond = (options.amountPerSecond) ? options.amountPerSecond : 0
        this.amountPerClick = (options.amountPerClick) ? options.amountPerClick : 2
        this.clickBonusMultiplier = (options.clickBonusMultiplier) ? options.clickBonusMultiplier : 100

        this.clickButton = document.querySelector('#clicker')
        this.clickButton.addEventListener('click', event => {
            this.increaseAmountBy(this.getClickAmount())
            this.user.increaseExp(1)
        })

        document.querySelector('#resetGameState').addEventListener('click', event => this.resetGameState())

        this.timer = 0
        this.recipes = new Recipes(options.recipes)
        this.user = new User()

        this.oldAmount = this.currentCoinAmount;
    }

    resetGameState = () => {
        localStorage.removeItem('gameState')
        window.location = window.location
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

    save = () => {
        // create one big json string and put it in a localStorage

        let recipesState = []
        this.recipes.recipes.forEach(rec => {
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
            })
        })

        const gameState = [{
            currentCoinAmount: this.currentCoinAmount,
            amountPerSecond: this.amountPerSecond,
            amountPerClick: this.amountPerClick,
            clickBonusMultiplier: this.clickBonusMultiplier,
            clickButton: this.clickButton,
            timer: this.timer,
            recipes: recipesState
        }]


        localStorage.setItem('gameState', JSON.stringify(gameState))
    }


    amountPerSecondCalculated = () => {
        let newAmount = this.currentCoinAmount - this.oldAmount
        this.oldAmount = this.currentCoinAmount
        return (newAmount >= 0) ? newAmount.toFixed(2) : false
    }

    draw = () => {
        /*
        since timers/tickers in Javascript are a P.I.T.A
        define how long its been since this tick has been done, decide then how amount seconds have passed;
        thus how many amountPerSeconds should be added
        */
        let milliseconds = this.defineMillisecondsPassed();

        this.timer += milliseconds
        this.increaseAmountBy(this.getAmountPerSecond() * (milliseconds / 1000))
        this.recipes.drawRecipes()
        // tick every second
        if (this.timer >= 1000) {
            this.timer = 0
            this.save()

            const aps = this.amountPerSecondCalculated()
            // if (aps !== false) {
            //     document.querySelector('#amountPerSecond').innerHTML = aps
            // }
            console.log(`Amount per second: ${aps}`)
        }

        document.querySelector('#currentCoinAmount').innerHTML = this.getAmount()
        document.querySelector('#currentCoinsPerSecond').innerHTML = this.getAmountPerSecond()
        document.querySelector('#clickAmount').innerHTML = this.getClickAmount()
        document.querySelector('#bonusMultiplier').innerHTML = this.getBonusMultiplier()
    }

}
