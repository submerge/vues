
 var config      = require('./config'),
     Directive   = require('./directive')

var map  = Array.prototype.map,
    each = Array.prototype.forEach


function Seed (el, data, options) {
    if (typeof el === 'string') {
        el = document.querySelector(el)
    }

    this.el = el
    this._bindings =  {} // internal real data
    this.scope = {} // external interface
    this._options   = options || {}

    // var els  = el.querySelectorAll(config.selector)
    // ;[].forEach.call(els, this._compileNode.bind(this))
    this._compileNode(el)

    // initialize all variables by invoking setters
    for (var key in this._bindings) {
        this.scope[key] = data[key]
    }
}

Seed.prototype._compileNode = function (node) {
    var self = this
    /*
    cloneAttributes(node.attributes).forEach(function (attr) {
        var directive = Directive.parse(attr, config.prefix)
        if (directive) {
            self._bind(node, directive)
        }
    })
    */
    if (node.nodeType === 3) {
        self._compileTextNode(node)
    } else if (node.attributes && node.attributes.length) {
        var attrs = map.call(node.attributes, function (attr) {
            return {
                name: attr.name,
                value: attr.value
            }
        })
        attrs.forEach(function (attr) {
            var directive = Directive.parse(attr)
            if (directive) {
                self._bind(node, directive)
            }
        })

        if (!node['sd-block'] && node.childNodes.length) {
            each.call(node.childNodes, function (child) {
                self._compileNode(child)
            })
        }
    }
}

Seed.prototype._compileTextNode = function (node) {}

Seed.prototype._bind = function (node ,directive) {
    directive.el = node
    directive.seed = this
    node.removeAttribute(directive.attr.name)
    var key = directive.key,
        epr = this._options.eachPrefixRE
    
    if (epr) {
        key = key.replace(epr, '')
    }
    var binding = this._bindings[key] || this._createBinding(key)
    binding.directives.push(directive)
    
    if (directive.bind) {
        directive.bind.call(directive, binding.value)
    }
}

Seed.prototype._createBinding = function (key) {
    var binding = {
        value: undefined,
        directives: []
    }
    this._bindings[key] = binding
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
        delete this._bindings[key]
    }
    function unbind (directive) {
        if (directive.unbind) {
            directive.unbind()
        }
    }
    this.el.parentNode.removeChild(this.el)
}

module.exports = Seed
         