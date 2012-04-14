var uuid = require("node-uuid"),
    extend = require("pd").extend

module.exports = {
    setup: function () {
        this.collection = this.mongo.collection("Players")

        if (typeof window !== "undefined") {
            window.winnar = this.collection
        }
    },
    getAll: function (callback) {
        //console.log(this.find.toString(), this)
        this.collection.find({}, {
            sort: { score: -1 }
        }, function (err, cursor) {
            if (err) {
                return callback(err)
            }
            cursor.toArray(callback)
        })
    },
    create: function (data, callback) {
        this.collection.insert({
            name: data.name,
            id: uuid(),
            score: data.score
        }, callback)
    },
    update: function (data, callback) {
        this.collection.update({
            id: data.id
        }, {
            $set: {
                name: data.name,
                score: +data.score
            }
        }, callback)
    },
    incrementScore: function (id, callback) {
        this.collection.findAndModify({
            id: id
        }, [["id", -1 ]], {
            $inc: {
                score: 5
            }
        }, { new: true }, callback)
    },
    expose: ["getAll", "create", "update", "incrementScore"]
}