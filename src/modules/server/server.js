var http = require("http")

module.exports = {
    init: function () {
        var server = this.server = http.createServer()
        server.on("request", this.request)
        server.listen(8080)
        console.log("listening on port 8080")
        this.mongo.start(server)
    },
    request: function (req, res) {
        this.app.handle(req, res)
    }
}