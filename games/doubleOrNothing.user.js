// ==UserScript==
// @name        Double or Nothing Auto
// @namespace   Marascripts
// @match       https://www.marapets.com/doubleornothing.php
// @version     1.0.0
// @author      themagicteeth
// @description Plays Double or Nothing.
// @license     MIT
// ==/UserScript==

const coins = document.querySelectorAll("input[name='submit']")

// Only if we have coins to click
// Click a random coin, every two seconds (it bugs out otherwise)
if (coins.length !== 0) {
    setTimeout(() => {
        coins[Math.floor(Math.random() * coins.length)].click()
    }, 1200);
}
