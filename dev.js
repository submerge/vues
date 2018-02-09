var Seed = require('./src/main')
console.log('aa')
Seed.filter('money', function (value) {
    return '$' + value.toFixed(2)
})



var todos = new Seed('#test', {
    total     : 1000,
    'msg.wow' : 'wow',
    hello     : 'hello',
    todos     : [
        {
            title: 'make this shit work',
            done: false
        },
        {
            title: 'make this shit kinda work',
            done: true
        }
    ],
    changeMessage: function () {
        this.scope['msg.wow'] = 'hola'
    },
    remove: function () {
        this.destroy()
    }
})

window.app = todos