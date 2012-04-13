var uuid = require("node-uuid"),
    extend = require("pd").extend

module.exports = {
    setup: function (done) {
        var self = this
        this.mongo.collection("Players", function (collection) {
            console.log("gettingCollection", arguments)
            if (typeof window !== "undefined") {
                window.winnar = collection
            }
            for (var key in collection) {
                if (!self[key]) {
                    self[key] = collection[key]
                }
            }
            self._update = collection
            done()
        })
    },
    getAll: function (callback) {
        //console.log(this.find.toString(), this)
        this.find({}, {
            sort: { score: -1 }
        }, function (err, cursor) {
            if (err) {
                return callback(err)
            }
            cursor.toArray(callback)
        })
    },
    create: function (data, callback) {
        this.insert({
            name: data.name,
            id: uuid(),
            score: data.score
        }, callback)
    },
    update: function (data, callback) {
        this._update({
            id: data.id
        }, {
            $set: {
                name: data.name,
                score: +data.score
            }
        }, callback)
    },
    incrementScore: function (id, callback) {
        this.findAndModify({
            id: id
        }, {
            $inc: {
                score: 5
            }
        }, callback)
    },
    expose: ["getAll", "create", "update", "incrementScore"]
}