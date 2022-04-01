// ==UserScript==
// @name        Pipe Dreamed
// @namespace   Marascripts
// @match       https://www.marapets.com/pipes.php
// @version     1.0.0
// @author      themagicteeth
// @description Plays Pipe Dream optimally.
// @license     MIT
// ==/UserScript==

if (!document.querySelector(".middleit.comebackbox")) {
    // Start the game
    const playButton = document.querySelector("input[value='Play Pipe Dream']")
    if (playButton) { playButton.click() }

    // Roll the dice (every turn)
    const rollDice = document.querySelector("input[value='Roll Dice']")
    if (rollDice) { rollDice.click() }

    // Get the pipes that can be closed
    const canBlock = document.querySelector(".maralayoutmiddle .middleit .bigger.middleit").innerText.match(/\d/g)

    if (canBlock.includes("9")) { clickPipe(9) } // 4 possible
    else if (canBlock.includes("8")) { clickPipe(8) } // 5 possible
    else if (canBlock.includes("7")) { clickPipe(7) } // 6 possible
    else if (canBlock.includes("1")) { clickPipe(1) } // 14 possible
    else if (canBlock.includes("2")) { clickPipe(2) } // 15 possible
    else if (canBlock.includes("3")) { clickPipe(3) } // 16 possible
    else if (canBlock.includes("4")) { clickPipe(4) } // 17 possible
    else if (canBlock.includes("5")) { clickPipe(5) } // 18 possible
    else { clickPipe(6) } // 19 possible
}

function clickPipe(number) {
    document.querySelector(`a[href='pipes.php?pipe=${number}']`).click()
}