// ==UserScript==
// @name        Random Games Automator
// @namespace   Marascripts
// @match       https://www.marapets.com/graves.php
// @match       https://www.marapets.com/giveaways.php
// @match       https://www.marapets.com/burst.php
// @match       https://www.marapets.com/nuttytree.php
// @match       https://www.marapets.com/jackpot.php
// @match       https://www.marapets.com/multiplier.php
// @match       https://www.marapets.com/spooks.php
// @match       https://www.marapets.com/wormdigging.php
// @grant       none
// @version     1.0.0
// @author      themagicteeth
// @description Automates games with random choices.
// @license     MIT
// ==/UserScript==

function pickRandom(selector) {
    const elements = document.querySelectorAll(selector)
    elements[Math.floor(Math.random() * elements.length)].click()
}

if (!document.querySelector("div.middleit.comebackbox")) {
    if (document.URL.includes("multiplier")) { pickRandom(".middleit.flex-table #eachitemdiv a") }
    if (document.URL.includes("jackpot")) { pickRandom(".pyramid a") }
    if (document.URL.includes("wormdigging")) { pickRandom(".wormbox.flex-middle.flex-grow input") }
    if (document.URL.includes("nuttytree")) { pickRandom(".middleit.flex-table .flex-buttons form input[type='submit']") }
    if (document.URL.includes("spooks")) { pickRandom(".middleit.flex-table #eachitemdiv.itemwidth.fixborders a") }
    if (document.URL.includes("burst")) { pickRandom(".middleit.flex-table #eachitemdiv.itemwidth.fixborders a") }
    if (document.URL.includes("giveaways")) { pickRandom("#eachitemdiv a") }
    if (document.URL.includes("graves")) { pickRandom(".maralayoutmiddle .flex-table .middleit a") }
}
