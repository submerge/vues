
var Seed = require('./src/main')

var data = {
    todos: [
        {
            text: '1!',
            done: false
        },
        {
            text: '2!',
            done: false
        },
        {
            text: '3!',
            done: true
        }
    ]
}

Seed.controller('TodoList', function (scope, seed) {
    scope.filter = 'all'
    scope.remaining = scope.todos.reduce(function (count, todo) {
        return count + (todo.done ? 0 : 1)
    }, 0)
    scope.addTodo = function (e) {
        var text = e.el.value
        if (text) {
            e.el.value = ''
            scope.todos.push({
                text: text,
                done: false
            })
            scope.remaining++
        }
    }
    scope.removeTodo = function (e) {
        var i = e.seed.eachIndex
        scope.todos.splice(i, 1)
        scope.remaining -= e.seed.scope.done ? 0 : 1
    }
    scope.toggleTodo = function (e) {
        scope.remaining += e.seed.scope.done ? -1 : 1
    }
    scope.setFilter = function (e) {
        scope.filter = e.el.className
    }
})
var now = Date.now()
var app = Seed.bootstrap({
    el: '#app',
    data: data
})
console.log(app)
console.log(Date.now() - now)
