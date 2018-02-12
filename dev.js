
var Seed = require('./src/main')

var todos = [
    { text: 'make nesting controllers work', done: true },
    { text: 'complete ArrayWatcher', done: false },
    { text: 'computed properties', done: false },
    { text: 'parse textnodes', done: false }
]

Seed.controller('Todos', function (scope, seed) {
    // regular properties
    scope.filter = 'all'
    scope.todos = todos
    scope.remaining = todos.reduce(function (count, todo) {
        return count + (todo.done ? 0 : 1)
    }, 0)
    // computed properties
    scope.total = function () {
        return scope.todos.length
    }
    scope.completed = function () {
        return scope.todos.length - scope.remaining
    }
    // event handlers
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
        scope.todos.splice(e.seed.$index, 1)
        scope.remaining -= e.scope.done ? 0 : 1
    }
    scope.toggleTodo = function (e) {
        scope.remaining += e.scope.done ? -1 : 1
    }
    scope.setFilter = function (e) {
        scope.filter = e.el.className
    }
})
Seed.bootstrap()

console.log(app)
