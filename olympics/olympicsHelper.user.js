// ==UserScript==
// @name        Olympics Helper
// @namespace   Marascripts
// @match       https://www.marapets.com/competitions.php
// @grant       none
// @version     1.0
// @author      themagicteeth
// @license     MIT
// @description Picks the optimal Olympic event for each of your pets.
// ==/UserScript==

const events = document.querySelectorAll(".eachpet_box.marapets_border")

if (events.length > 0) {
    const olympian = []
    const ultimate = []
    const expert = []
    const intermediate = []
    const beginner = []
    const untrained = []

    setTimeout(() => {
        for (let event = 0; event < events.length; event++) {
            const level = events[event].querySelector(".alsotry").innerText
            const enterUrl = events[event].querySelector("a").href

            if (level.split(" ")[0] === "Olympian") { olympian.push(enterUrl) }
            else if (level === "Ultimate") { ultimate.push(enterUrl) }
            else if (level === "Expert") { expert.push(enterUrl) }
            else if (level === "Intermediate") { intermediate.push(enterUrl) }
            else if (level === "Beginner") { beginner.push(enterUrl) }
            else if (level === "Untrained") { untrained.push(enterUrl) }
        }

        if (ultimate.length > 0) { window.location.href = ultimate[0] }
        else if (expert.length > 0) { window.location.href = expert[0] }
        else if (intermediate.length > 0) { window.location.href = intermediate[0] }
        else if (beginner.length > 0) { window.location.href = beginner[0] }
        else { window.location.href = untrained[0] }
    }, 1200)
}
else if (document.querySelector(".bigger.petpadding")) {
    const entered = document.querySelector(".bigger.petpadding")
    if (entered.innerText.search("entered") > 0) {
        window.location.href = "https://www.marapets.com/competitions.php"
    }
}
else {
    setTimeout(() => {
        timeout = 5000
        window.location.href = "https://www.marapets.com/competitions.php"
    }, 100000);
}
