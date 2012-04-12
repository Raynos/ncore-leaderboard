var http = require("http")

module.exports = {
    init: function () {
        var server = this.server = http.createServer()
        server.on("request", this.request)
        console.log("listening on port 8080")
        server.listen(8080)
    },
    request: function (req, res) {
        this.app.handle(req, res)
    }
}