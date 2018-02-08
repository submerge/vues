module.exports = {
    text: function (value) {
        this.el.textContent = value || ''
    },
    show: function (value) {
        this.el.style.display = value ? '' : 'none'
    },
    class: function (value, classname) {
        this.el.classList[value ? 'add' : 'remove'](classname)
    },
    on: {
        update: function (handler) {
            var event = this.arg
            if (!this.handlers) {
                this.handlers = {}
            }
            var handlers = this.handlers
            if (handlers[event]) {
                this.el.removeEventListener(event, handlers[event])
            }
            if (handler) {
                handler = handler.bind(this.el)
                this.el.addEventListener(event, handler)
                handlers[event] = handler
            }
        },
        each: {
            update: function () {}
        }
    }
}