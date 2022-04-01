// ==UserScript==
// @name        Tombola Automator
// @namespace   Marascripts
// @match       https://www.marapets.com/tombola*
// @version     1.0.0
// @author      themagicteeth
// @description Automates Tombola
// @license     MIT
// @grant       none
// ==/UserScript==

const takeTicket = document.getElementById("playTombola")

// If we can take a ticket, take one
// We delay a couple seconds, otherwise it does not work
if (takeTicket) {
    setTimeout(() => {
    takeTicket.click()
    }, 2000);
}
