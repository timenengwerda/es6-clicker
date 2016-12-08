class Recipes {
    constructor (recipes) {
        this.recipes = []
        this.createRecipes(recipes)
    }

    createRecipes = (recipes) => {
        recipes.forEach(recipe => {
            this.recipes.push(new Recipe(recipe))
        })

        this.drawRecipes()
    }

    drawRecipes = () => {
        let list = $('<ul/>')

        this.recipes.forEach(r => {
            list.append(r.drawRecipe())
        })

        $('#recipes').html(list)
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
                this.price += Math.round(this.price * (.085 * (this.level - 1)))

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
            this.button.off('click')
            this.listItem.remove()
            delete this
            return null
        }
        if (!this.button && !this.listItem) {
            this.button = $('<button />').addClass('btn').addClass('btn-primary')
            this.button.on('click', e => {
                this.buy()
            })

            this.listItem = $('<li />')
            this.listItem.html(`<span class="level">${this.level}</span><br>
                                <span class="title">${this.title}</span><br>
                                <span class="description">${this.description}</span><span class="upgradeIncrease">${this.upgradeIncrease}</span>
                                <br>`).append(this.button)
        }

        this.button.html(this.price)
        this.listItem.find('.level').html(this.level)
        this.listItem.find('.title').html(this.title)
        this.listItem.find('.description').html(this.description)
        this.listItem.find('.upgradeIncrease').html(this.upgradeIncrease)

        if (game) {
            const disabledState = (game.getAmount() >= this.price) ? false : true
            this.button.prop('disabled', disabledState)
        }

        return this.listItem
    }
}