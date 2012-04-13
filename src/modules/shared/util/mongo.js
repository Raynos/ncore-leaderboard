var pd = require("pd"),
    extend = pd.extend,
    bindAll = pd.bindAll

if (typeof window !== "undefined") {
    var dnode = require("./browser-dnode")

    module.exports = {
        collection: function (name, callback) {
            if (!this.remote) {
                var self = this
                return dnode.connect(function (remote) {
                    self.remote = remote
                    remote.col(name, callback)
                })
            }
            this.remote.col(name, callback)
        }
    }
} else {
    var dnode = require("dno" + "de"),
        mongo = require("mongo" + "-col"),
        cache = {},
        server = dnode({
            col: function (name, callback) {
                console.log("col called", name)
                if (!cache[name]) {
                    cache[name] = bindAll(mongo(name))
                }
                callback(cache[name])
            }
        })

    module.exports = {
        start: function (httpServer) {
            server.listen(httpServer)
        },
        collection: mongo
    }
}