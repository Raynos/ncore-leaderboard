var toArray = Array.prototype.slice.call.bind(Array.prototype.slice)

module.exports = {
    enhance: function () {
        this.enhancePlayers()
        this.enhanceAddPlayer()
        this.enhanceAddPoints()
    },
    enhancePlayers: function () {
        var players = document.getElementsByClassName("player")

        toArray(players).forEach(this.convertToSpans)
    },
    enhanceAddPlayer: function () {
        var addPlayer = document.getElementById("addPlayer")

        addPlayer.parentNode.removeChild(addPlayer)
    },
    enhanceAddPoints: function () {
        var details = document.getElementsByClassName("details")[0],
            selected = document.getElementsByClassName("selected")[0],
            selected_player = selected && selected.firstElementChild.textContent

        this.util.template("/addPoints.dust", {
            selected_player: selected_player
        }, function (err, frag) {
            details.parentNode.replaceChild(frag, details)
        })
    },
    convertToSpans: function (node) {
        this.util.template("/player.dust", {
            name: node.elements.name.value,
            score: node.elements.score.value
        }, function (err, frag) {
            node.parentNode.replaceChild(frag, node)
        })
    }
}