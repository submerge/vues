var prefix = 'sd',
    Directive = require('./directive'),
    Directives = require('./directives'),
    selector = Object.keys(Directives).map(function (d) {
        return '[' + prefix + '-' + d + ']'
    }).join()


function Seed (opts) {
    var self = this,
    root = this.el = document.getElementById(opts.id),
    els  = root.querySelectorAll(selector)
    self.bindings =  {} // internal real data
    self.scope = {} // external interface
    
    // process nodes for directives
    ;[].forEach.call(els, this.compileNode.bind(this))
    this.compileNode(root)

    // initialize all variables by invoking setters
    for (var key in self.bindings) {
        self.scope[key] = opts.scope[key]
    }
}

Seed.prototype.compileNode = function (node) {
    var self = this
    cloneAttributes(node.attributes).forEach(function (attr) {
        var directive = Directive.parse(attr, prefix)
        if (directive) {
            self.bind(node, directive)
        }
    })
}

function cloneAttributes (attributes) {
    return [].map.call(attributes, function (attr) {
        return {
            name: attr.name,
            value: attr.value
        }
    })
}

Seed.prototype.bind = function (node ,directive) {
    directive.el = node
    node.removeAttribute(directive.attr.name)
    var key = directive.key,
        binding = this.bindings[key] || this.createBinding(key)
    binding.directives.push(directive)
    
    if (directive.bind) {
        directive.bind(node, binding.value)
    }
}

Seed.prototype.createBinding = function (key) {
    var binding = {
        value: undefined,
        directives: []
    }
    this.bindings[key] = binding
    Object.defineProperty(this.scope, key, {
        get: function () {
            return binding.value
        },
        set: function (value) {
            binding.value = value
            binding.directives.forEach(function (directive) {
                directive.update(value)
            })
        }
    })
    return binding
}

Seed.prototype.dump = function () {
    var data = {}
    for (var key in this._bindings) {
        data[key] = this._bindings[key].value
    }
    return data
}

Seed.prototype.destroy = function () {
    for (var key in this._bindings) {
        this._bindings[key].directives.forEach(unbind)
    }
    function unbind () {
        if (directive.unbind) {
            directive.unbind()
        }
    }
    this.el.parentNode.remove(this.el)
}

module.exports = {
    create: function (opts) {
        return new Seed(opts)
    },
    filter: function () {},
    directive: function () {} 
}