var http = require("http")

module.exports = {
    setup: function () {
        var server = this.server = http.createServer()
        server.on("request", this.request)
        this.mongo.start(server)
    },
    init: function () {
        this.server.listen(8080)
        console.log("listening on port 8080")
    },
    request: function (req, res) {
        this.app.handle(req, res)
    }
}