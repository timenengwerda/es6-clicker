class Recipes {
    constructor (recipes) {
        this.recipes = []
        this.createRecipes(recipes)
        this.firstHit = true
    }

    createRecipes = (recipes) => {
        recipes.forEach(recipe => {
            this.recipes.push(new Recipe(recipe))
        })

        this.drawRecipes()
    }

    drawRecipes = () => {
        let list = $('ul.recipes-list')

        this.recipes.forEach(r => {
            if (this.firstHit) {
                list.append(r.drawRecipe())
            } else {
                r.drawRecipe()
            }
        })

        this.firstHit = false

        // $('#recipes').html(list)
    }
}

class Recipe {
    constructor (options) {
        this.id = (options.id) ? options.id : true
        this.persists = (options.persists) ? options.persists : true
        this.price = (options.price) ? options.price : 0
        this.title = (options.title) ? options.title : 0
        this.level = (options.level) ? options.level : 0
        this.maxLevel = (options.maxLevel) ? options.maxLevel : 999999
        this.description = (options.description) ? options.description : 0
        this.upgradeType = options.upgrade.type
        this.upgradeIncrease = options.upgrade.increase

        this.button = null
        this.listItem = null
        this.levelEl = null
        this.titleEl = null
        this.descriptionEl = null
        this.upgradeIncreaseEl = null

        this.createTemplate()

         if (this.level >= this.maxLevel) {
            this.persists = false
        }
    }

    createTemplate = () => {
        this.button = $('<button />').addClass('btn').addClass('btn-primary')
        this.listItem = $('<li />')
        this.levelEl = $('<span />').addClass('level').html(this.level)
        this.titleEl = $('<span />').addClass('title').html(this.title)
        this.descriptionEl = $('<span />').addClass('description').html(this.description)
        this.upgradeIncreaseEl = $('<span />').addClass('upgradeIncrease').html(this.upgradeIncrease)

        this.listItem.html(`
        Amount purchased: ${this.levelEl.html()}<br>
        ${this.titleEl.html()}<br>
        ${this.descriptionEl.html()} ${this.upgradeIncreaseEl.html()}<br>
        `)

        this.button.on('click', e => {
            this.buy()
        })


        this.listItem.append(this.button)
    }

    buy = () => {
        if (game) {
            if (game.getAmount() >= this.price) {
                game.setAmount(game.getAmount() - this.price)


                switch (this.upgradeType) {
                    case 'amountPerSecond':
                        game.setAmountPerSecond(game.getAmountPerSecond() + this.upgradeIncrease)
                        this.upgradeIncrease += Math.floor((.09 * this.level))
                        break
                    case 'clickAmount':
                        game.setClickAmount(game.getClickAmount() + this.upgradeIncrease)
                        this.upgradeIncrease += Math.floor((.15 * this.level))
                        break
                    case 'clickMultiplier':
                        game.setBonusMultiplier(game.getBonusMultiplier() + this.upgradeIncrease)
                        break
                }

                ++this.level
                this.price += Math.round(this.price * (.055 * (this.level - 1)))
                this.upgradeIncreaseprice += Math.round(this.price * (.015 * (this.level - 1)))

                if (this.level >= this.maxLevel) {
                    this.persists = false
                }

                this.drawRecipe()
            }
        }

        return false
    }

    drawRecipe () {
        if (!this.persists) {
            if (this.button && this.listItem) {
                this.button.off('click')
                this.listItem.remove()
            }

            delete this
            return null
        }

        this.button.html(this.price)
        this.levelEl.html(this.level)
        this.titleEl.html(this.title)
        this.descriptionEl.html(this.description)
        this.upgradeIncreaseEl.html(this.upgradeIncrease)

        if (game) {
            const disabledState = (game.getAmount() >= this.price) ? false : true
            this.button.prop('disabled', disabledState)
        }

        return this.listItem
    }
}