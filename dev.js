var Seed = require('./src/main')
console.log('aa')
var app = Seed.create({
    id: 'test',
    // template
    scope: {
        'msg.wow': 'wow',
        hello: 'hello',
        error: 'error',
        changeMessage: function () {
            app.scope['msg.wow'] = 'hola'
        },
        remove: function () {
            app.destroy()
        }
    }
})
window.app = app