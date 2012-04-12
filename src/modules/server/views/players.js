var dust = require("dustjs-linkedin"),
    fs = require("fs"),
    path = require("path"),
    after = require("after")
    static = path.join(__dirname, "..", "..", "..", "static")

module.exports = {
    setup: function (done) {
        after.forEach([
            "index.dust", "players.dust"
        ], function (fileName, callback) {
            fs.readFile(path.join(static, fileName), (function (err, file) {
                if (err) {
                    console.log("ERROR", err, path.join(static, fileName))
                    return callback(err)
                }
                var name = fileName.split(".")[0]
                this[name] = dust.compileFn(file.toString(), name)
                callback()
            }).bind(this))
        }, this, done)
    },
    renderAll: function (players, callback) {
        this.index({
            members: players
        }, function (err, out) {
            callback(err, out)
        })
    }
}