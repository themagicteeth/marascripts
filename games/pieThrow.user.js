// ==UserScript==
// @name        Pie Thrower
// @namespace   Marascripts
// @match       https://www.marapets.com/pie.php
// @version     1.0.0
// @author      themagicteeth
// @description This throws pies.
// @license     MIT
// @grant       none
// ==/UserScript==

function clickButton(buttonValue) {
    const button = document.querySelector(`input[value='${buttonValue}']`)
    if (button) {
        button.click()
    }
}
// Button to start the game
clickButton('Play for 500MP')

const throwPieButtons = Array.from(document.querySelectorAll('.maralayoutmiddle .middleit.flex-table .flex-buttons form input')).slice(0, 6)
if (throwPieButtons.length > 0) { throwPieButtons[Math.floor(Math.random() * throwPieButtons.length)].click() }
