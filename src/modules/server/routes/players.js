var bindAll = require("pd").bindAll

var HandleIndex = {
    start: function () {
        this.domain.getAll(this.render)
    },
    render: function (err, players) {
        this.view.renderAll(players, this.pipe)
    },
    pipe: function (err, html) {
        this.res.end(html)
    }
}

var HandleAddNew = {
    start: function () {
        this.domain.create(this.req.body, this.redirect)
    },
    redirect: redirect
}

var HandleUpdate = {
    start: function () {
        this.req.body.id = this.req.params.id
        this.domain.update(this.req.body, this.redirect)
    },
    redirect: redirect
}

var HandleIncrementScore = {
    start: function () {
        this.domain.incrementScore(this.req.body.id,
            this.redirect)
    },
    redirect: redirect
}

module.exports = {
    start: function (router) {
        router.get("/", handle(HandleIndex, this))
        router.get("/players", handle(HandleIndex, this))
        router.post("/players", handle(HandleAddNew, this))
        router.post("/players/incrementScore", 
            handle(HandleIncrementScore, this))
        router.put("/players/:id", handle(HandleUpdate, this))
    },
    expose: ["start"]
}

function handle(klass, self) {
    return function (req, res) {
        bindAll({}, self, klass, {
            req: req,
            res: res
        }).start()
    }
}

function redirect() {
    this.res.redirect("/players")
}