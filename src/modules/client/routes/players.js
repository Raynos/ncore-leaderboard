
module.exports = {
    start: function (router) {
        router.get("/players", this.index)
        router.get("/", this.index)
        router.on("click", ".player", this.handleSelectedPlayer)
    },
    index: function () {
        this.view.enhance()
    },
    handleSelectedPlayer: function (ev) {
        this.view.selectPlayer(ev.target)
    }
}