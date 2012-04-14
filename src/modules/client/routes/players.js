module.exports = {
    start: function (router) {
        router.get("/players", this.index)
        router.get("/", this.index)
        router.on("click", ".player", this.handleSelectedPlayer)
        router.on("click", ".inc", this.incrementScore)
    },
    index: function () {
        this.view.enhance()
    },
    handleSelectedPlayer: function (ev) {
        this.selected = ev.target.dataset.id
        this.view.selectPlayer(ev.target)
    },
    incrementScore: function (ev) {
        this.domain.incrementScore(this.selected, this.renderPlayer)
    },
    renderPlayer: function (err, doc) {
        if (this.selected === doc.id) {
            doc.selected = "selected"
        }
        this.view.renderPlayer(doc)
    }
}