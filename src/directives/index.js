module.exports = {
    on   : require('./on'),
    each : require('./each'),

    text: function (value) {
        this.el.textContent =
            (value !== null && value !== undefined)
            ? value.toString() : ''
    },
    hide: function (value) {
        this.el.style.display = value ? 'none' : ''  
    },

    focus: function (value) {
        this.el[value ? 'focus' : 'blur']()
    },
    show: function (value) {
        this.el.style.display = value ? '' : 'none'
    },

    value: {
        bind: function () {
            var el = this.el, self = this
            this.change = function () {
                self.seed.scope[self.key] = el.value
            }
            el.addEventListener('change', this.change)
        },
        update: function (value) {
            this.el.value = value
        },
        unbind: function () {
            this.el.removeEventListener('change', this.change)
        }
    },

    class: function (value) {
        if (this.arg) {
            this.el.classList[value ? 'add' : 'remove'](this.arg)
        } else {
            this.el.classList.remove(this.lastVal)
            this.el.classList.add(value)
            this.lastVal = value
        }
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
            this.el.checked = !!value
        },
        unbind: function () {
            this.el.removeEventListener('change', this.change)
        }
    }
}