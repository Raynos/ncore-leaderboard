
module.exports = {
    start: function (router) {
        router.get("/players", this.index)
        router.get("/", this.index)
    },
    index: function () {
        this.view.enhance()
    }
}