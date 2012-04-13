var Router = {
    handle: function (event) {
        var uri = window.location.pathname
        this._routes.forEach(function (route) {
            if (route.uri === uri) {
                route.dispatch({
                    uri: uri,
                    event: event
                })
            }
        })
    },
    get: function (uri, callback) {
        this._routes.push({
            uri: uri,
            dispatch: callback
        })
    },
    on: function (event, selector, callback) {
        if (typeof selector === "function") {
            callback = selector
            selector = null
        }
        document.addEventListener(event, function () {
            if (selector === null || this.matchesSelector(selector)) {
                return callback.apply(this, arguments)
            }
        }, true)
    },
    _routes: []
}

window.onpopstate = function (event) {
    Router.handle(event)
}

module.exports = {
    setup: function (done) {
        Object.keys(this.routes).forEach(function (name) {
            this.routes[name].start(Router)
        }, this)
        console.log("setup routes")
        document.addEventListener("DOMContentLoaded", done)
    }
}