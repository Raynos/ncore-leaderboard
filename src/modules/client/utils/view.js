var indexedStore = require("indexedStore")("dust-templates"),
    xhr = require("xhr"),
    dust = require("dustjs-linkedin"),
    fragment = require("fragment"),
    cache = {}

window.indexedStore = indexedStore

module.exports = {
    template: function (uri, context, callback) {
        if (cache[uri]) {
            return compile(cache[uri])
        }

        indexedStore.get(uri, function (err, result) {
            if (err) {
                return callback(err)
            }
            if (result === undefined) {
                return loadWithXHR()
            }
            return compileSource(result)
        })

        function loadWithXHR() {
            xhr({
                method: "GET",
                uri: uri
            }, function (err, response) {
                if (this.status === 404) {
                    return callback(new Error("template not found"))
                }
                if (err) {
                    return callback(err)
                }
                indexedStore.put(response, uri, function (err, result) {
                    if (err) {
                        return callback(err)
                    }
                    compileSource(response)
                })
            })
        }

        function compileSource(source) {
            var fn = dust.compileFn(source)
            cache[uri] = fn

            compile(fn)
        }

        function compile(fn) {
            fn(context, function (err, out) {
                if (err) {
                    return callback(err)
                }
                return callback(null, fragment(out))
            })
        }
    }
}