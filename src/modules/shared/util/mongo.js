var clientmongo = require("clientmongo")

module.exports = {
    mongo: clientmongo,
    start: function (server) {
        this.mongo = clientmongo(server)
    },
    collection: function (name) {
        return this.mongo(name)
    }
}