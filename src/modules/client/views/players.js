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
            score: node.elements.score.value,
            id: node.elements.id.value
        }, function (err, frag) {
            node.parentNode.replaceChild(frag, node)
        })
    },
    renderPlayer: function (player) {
        var playerNode = composite.By.class("player").filter(function (node) {
            return node.dataset.id === player.id
        })[0]
        this.util.template("/player.dust", player, function (err, frag) {
            var prev = playerNode.previousElementSibling,
                parentNode = playerNode.parentNode,
                prevScore = prev && +prev.children[1].textContent

            playerNode.parentNode.replaceChild(frag, playerNode)

            if (prevScore !== null && prevScore < player.score) {
                parentNode.insertBefore(prev.nextElementSibling, prev)
            }
        })
    }
}