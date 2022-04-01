// ==UserScript==
// @name        Pancake Pile
// @namespace   Marascripts
// @match       https://www.marapets.com/pancakes.php
// @grant       GM_setValue
// @grant       GM_getValue
// @version     1.0.0
// @author      themagicteeth
// @description Automates clicking pancakes.
// @license     MIT
// ==/UserScript==

if (!document.querySelector("div.middleit.comebackbox")) {
    const startGame = document.querySelector("input[value='Play for 400MP']")
    if (startGame) {
        startGame.click()
    }

    else {
        const pancakes = Array.from(document.querySelectorAll(".pancakes_each a")) // Array of pancakes

        if (pancakes.length === 6) {
            const firstClick = pancakes[Math.floor(Math.random() * pancakes.length)]
            GM_setValue("clickedPancake", firstClick.href.split("id=").pop())
            firstClick.click()
        }

        if (pancakes.length < 6) {
            const clickedPancake = GM_getValue("clickedPancake")
            let options = []

            if (clickedPancake === "0") { options = [pancakes[0], pancakes[2], pancakes[4], pancakes[5]] }
            else if (clickedPancake === "1") { options = [pancakes[0], pancakes[3], pancakes[4], pancakes[5]] }
            else if (clickedPancake === "2") { options = [pancakes[0], pancakes[3], pancakes[4]] }
            else if (clickedPancake === "3") { options = [pancakes[1], pancakes[2], pancakes[5]] }
            else if (clickedPancake === "4") { options = [pancakes[0], pancakes[2], pancakes[5]] }
            else { options = [pancakes[0], pancakes[1], pancakes[3], pancakes[4]] }

            GM_setValue("clickedPancake", null)

            options[Math.floor(Math.random() * options.length)].click()
        }
    }
}
