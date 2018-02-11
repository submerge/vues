var config = require('./config'),
    controllers = require('./controllers'),
    watchArray = require('./watch-array')

module.exports = {
    text: function (value) {
        // this.el.textContent = value || ''
        this.el.textContent = value === null ?
                '' : value.toString()
    },
    show: function (value) {
        this.el.style.display = value ? '' : 'none'
    },
    checked: {
        bind: function () {
            var el = this.el,
                self = this
            this.change = function () {
                self.seed.scope[self.key] = el.checked
            }
            el.addEventListener('change', this.change) 
        },
        update: function (value) {
            this.el.checked = value
        },
        unbind: function () {
            this.el.removeEventListener('change', this.change)
        }
    },
    class: function (value) {
        // this.el.classList[value ? 'add' : 'remove'](this.arg)
        if (this.arg) {
            this.el.classList[value ? 'add' : 'remove'](this.arg)
        } else {
            this.el.classList.remove(this.lastVal)
            this.el.classList.add(value)
            this.lastVal = value
        }
    },
    on: {
        update: function (handler) {
            var self = this,
                event = this.arg
            
            if (this.handler) {
                this.el.removeEventListener(event, this.handler)
            }
            if (handler) {
                // handler = handler.bind(this.seed)
                var proxy = function (e) {
                    handler({
                        el: e.currentTarget,
                        originalEvent: e,
                        directive: self,
                        seed: self.seed
                    })
                }
                this.el.addEventListener(event, proxy)
                // handlers[event] = handler
                this.handler = proxy
            }
        },
        unbind: function () {
            var event = this.arg
            if (this.handlers) {
                this.el.removeEventListener(event, this.handler)
            }
        }
    },
    each: {
        bind: function () {
            // this.el['sd-block'] = true
            this.el.removeAttribute(config.prefix + '-each')
            // this.prefixRE = new RegExp('^' + this.arg + '.')
            var ctn = this.container = this.el.parentNode
            this.marker = document.createComment('sd-each-' + this.arg)
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
            if (!Array.isArray(collection)) return
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
            var spore = new Seed(node, {
                eachPrefixRE: new RegExp('^' + this.arg + '.'),
                parentSeed: this.seed,
                index: index,
                eachCollection: collection,
                data: data
            })
            this.container.insertBefore(node, this.marker)
            collection[index] = spore.scope
            return spore
        }
    }
}