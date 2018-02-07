require('should')
var seed = require('../src/Seed.js')

let bu = 'none'

setTimeout(function () {
    describe('my first test', function () {
        describe('welcome to tamll', function () {
            it('welcome to tmall', function () {
                return seed('leike').should.be.fulfilledWith('helloleike')
            })

            it('welcome to taobao', function () {
                return seed('taobao').should.be.fulfilledWith('hellotaobao')
            })
        })
    })
    run()
}, 1000)


console.log(seed)