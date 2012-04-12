var Players = Object.create(require("mongo-col")("Players")),
    uuid = require("node-uuid"),
    extend = require("pd").extend


module.exports = extend(Players, {
    getAll: function (callback) {
        this.find().sort({ score: -1 }).toArray(callback)
    },
    create: function (data, callback) {
        this.insert({
            name: data.name,
            id: uuid(),
            score: data.score
        }, callback)
    },
    _update: Players.update,
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
        this._update({
            id: id
        }, {
            $inc: {
                score: 5
            }
        }, callback)
    },
    expose: ["getAll", "create", "update", "incrementScore"]
})