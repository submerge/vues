var Seed = require('./src/main')
console.log('aa')
var app = Seed.create({
    id: 'test',
    // template
    scope: {
        msg: 'hello',
        hello: 'WHWHWHW',
        something: '',
        changeMessage: function () {
            app.scope.msg = 'hola'
        }
    }
})
window.app = app