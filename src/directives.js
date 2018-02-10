var config = require('./config'),
    controllers = require('./controllers'),
    watchArray = require('./watchArray')

module.exports = {
    text: function (value) {
        this.el.textContent = value || ''
    },
    show: function (value) {
        this.el.style.display = value ? '' : 'none'
    },
    class: function (value) {
        this.el.classList[value ? 'add' : 'remove'](this.arg)
    },
    on: {
        update: function (handler) {
            var event = this.arg
            
            if (this.handler) {
                this.el.removeEventListener(event, this.handler)
            }
            if (handler) {
                // handler = handler.bind(this.seed)
                this.el.addEventListener(event, handler)
                // handlers[event] = handler
                this.handler = handler
            }
        }
    },
    each: {
        bind: function () {
            // this.el['sd-block'] = true
            this.el.removeAttribute(config.prefix + '-each')
            this.prefixRE = new RegExp('^' + this.arg + '.')
            var ctn = this.container = this.el.parentNode
            this.marker = document.createComment('sd-each-' + this.arg + '-marker')
            ctn.insertBefore(this.marker, this.el)
            ctn.removeChild(this.el)
            this.childSeeds = []
        },
        update: function (collection) {
            if (this.childSeeds.length) {
                this.childSeeds.forEach(function (child) {
                    child.destroy()
                })
                this.childSeeds = []
            }
            // augmentArray(collection, this)
            watchArray(collection, this.mutate.bind(this))
            var self = this
            collection.forEach(function (item, i) {
                self.childSeeds.push(self.buildItem(item, i, collection))
            })
            console.log('collection creation done.')
        },
        mutate: function (mutation) {
            console.log(mutation)
            console.log(this)
        },
        buildItem: function (data, index, collection) {
            var node = this.el.cloneNode(true)
            var spore = new Seed(node, data, {
                eachPrefixRE: this.prefixRE,
                parentSeed: this.seed
            })
            this.container.insertBefore(node, this.marker)
            collection[index] = spore.scope
            return spore
        }
    }
}