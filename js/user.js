class User {
    constructor (options = {}) {
        this.level = 1
        this.currentExp = 0
        this.expNeeded = 100
        this.bonuses = (options.bonuses) ? options.bonuses : {}
        this.expBar = $('.expBar')

        this.updateExpBar()
    }

    increaseExp = (exp) => this.setExp(this.getExp() + exp)
    setExp = (exp) => {
        this.currentExp = exp
        this.updateExpBar()
    }
    getExp = () => this.currentExp

    updateExpBar () {
        this.expBar.html(`${this.currentExp}/${this.expNeeded}`)
    }
}

