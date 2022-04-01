// ==UserScript==
// @name        Dukka Dasher
// @namespace   Marascripts
// @match       https://www.marapets.com/dash.php
// @version     1.0.0
// @author      themagicteeth
// @description Plays Dukka Dash.
// @license     MIT
// @grant       none
// ==/UserScript==

function clickButton(buttonValue) {
    const button = document.querySelector(`input[value='${buttonValue}']`)
    if (button) {
        button.click()
    }
}

function pickRandom(selector) {
    const elements = document.querySelectorAll(selector)
    elements[Math.floor(Math.random() * elements.length)].click()
}

clickButton('Play for 3,000MP')
pickRandom('.middleit.flex-table #eachitemdiv.itemwidth.fixborders a')
