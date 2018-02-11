var Seed = require('./src/main')
console.log('asdf')
Seed.controller('Grandpa', function (scope, seed) {
    scope.name = 'John'
})
Seed.controller('Dad', function (scope, seed) {
    scope.name = 'Jack'
})
Seed.controller('Son', function (scope, seed) {
    scope.name = 'Jason'
})
Seed.controller('Baby', function (scope, seed) {
    scope.name = 'James'
})
var seed = Seed.bootstrap()
console.log(seed)