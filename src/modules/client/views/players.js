var composite = require("nodecomposite")

module.exports = {
    enhance: function () {
        this.enhancePlayers()
        this.enhanceAddPlayer()
        this.enhanceAddPoints()
    },
    selectPlayer: function (target) {
        composite.By.class("selected").classList.remove("selected")

        target.classList.add("selected")

        this.enhanceAddPoints()
    },
    enhancePlayers: function () {
        var nodes = composite.By.class("player")

        nodes.forEach(this.convertToSpans)
    },
    enhanceAddPlayer: function () {
        var addPlayer = document.getElementById("addPlayer")

        addPlayer.parentNode.removeChild(addPlayer)
    },
    enhanceAddPoints: function () {
        var details = document.getElementsByClassName("details")[0],
            selected = document.getElementsByClassName("selected")[0],
            selected_name = selected && selected.firstElementChild.textContent

        this.util.template("/addPoints.dust", {
            selected_name: selected_name
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