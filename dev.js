
var Seed = require('./src/main')

var todos = [
    { text: 'make nesting controllers work', done: true },
    { text: 'complete ArrayWatcher', done: false },
    { text: 'computed properties', done: false },
    { text: 'parse textnodes', done: false }
]

Seed.controller('Todos', function (scope) {
    // regular properties
    scope.filter = 'all'
    scope.todos = todos
    scope.completed = todos.reduce(function (count, todo) {
        return count + (todo.done ? 1 : 0)
    }, 0)
    // computed properties
    scope.total = function () {
        return scope.todos.length
    }
    scope.remaining = function () {
        return scope.todos.length - scope.completed
    }
    // event handlers
    scope.addTodo = function (e) {
        var val = e.el.value
        if (val) {
            e.el.value = ''
            scope.todos.unshift({
                val: val,
                done: false
            })
        }
    }
    scope.removeTodo = function (e) {
        scope.todos.remove(e.scope);
        scope.completed -= e.scope.done ? 1 : -1;
    }
    scope.toggleTodo = function (e) {
        scope.remaining += e.scope.done ? -1 : 1;
    }
    scope.setFilter = function (e) {
        scope.filter = e.el.className
    }
    scope.removeCompleted = function () {
        scope.todos = scope.todos.filter(function (todo) {
            return !todo.done
        })
    }
})
Seed.bootstrap()

console.log(app)
