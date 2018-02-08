var Seed = require('./src/main')
console.log('aa')
var app = Seed.create({
    id: 'test',
    // template
    scope: {
        'msg.wow': 'wow12',
        hello: 'hello',
        error: 'error',
        changeMessage: function () {
            app.scope['msg.wow'] = 'hola'
        },
        remove: function () {
            app.destroy()
        },
        todos: [
            {
              title: 'make this shit work',
              done: false  
            },
            {
                title: 'make this shit kinda work',
                done: true
            }
        ]
    }
})
window.app = app