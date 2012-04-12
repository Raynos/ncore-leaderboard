var path = require("path"),
    express = require("express")

module.exports = {
    setup: function () {
        var app = this.app = express()
        app.configure("development", developmentConfigure)
        app.use(express.favicon())
        app.use(express.static(path.join(__dirname, "..", "..", "static")))
        app.use(express.bodyParser())
        app.use(express.methodOverride())
        app.use(app.router)
        Object.keys(this.routes).forEach(function (name) {
            this.routes[name].start(app)
        }, this)
    },
    handle: function (req, res) {
        this.app(req, res)
    },
    expose: ["handle"]
}

function developmentConfigure() {
    this.use(express.errorHandler({
        dumpException: true,
        showStack: true
    }))
    this.use(express.logger('dev'))
}