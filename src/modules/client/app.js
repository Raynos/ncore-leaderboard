var Router = {
    handle: function (event) {
        console.log("popstate", event)
        console.log("history", history)
    }
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