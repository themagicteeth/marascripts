// ==UserScript==
// @name        Mystery Item Guesser
// @namespace   Marascripts
// @match       https://www.marapets.com/icefairy.php
// @match       https://mara.guide/mysteryitem.php
// @version     1.0.0
// @author      themagicteeth
// @grant       GM_setValue
// @grant       GM_getValue
// @description Attempts to guess Mystery Item
// @license     MIT
// ==/UserScript==

if (document.URL.includes = "/icefairy.php") {
    const itemInput = document.querySelector("input[name='item']")
    const item = GM_getValue("item", "")

    // If we are able to guess check if we have visited mara.guide
    // If we have input the saved item
    if (itemInput) {
        if (item === "") {
            window.location.href = "https://mara.guide/mysteryitem.php"
        }
        else {
            itemInput.value = item
            GM_setValue("item", "")
            document.querySelector("input[value='Guess the Mystery Item']").click()
        }
    }
}

if (document.URL.includes("mara.guide")) {
    // Someimes mara.guide does now know the item.
    // We will check if they do, and if so save the item name.
    // Otherwise we just guess "Jar of Bricks"

    const status = document.querySelector("center h1").nextElementSibling.innerText.split("!")[0]

    if (status === "Match Found") {
        const match = document.querySelector("center h1").nextElementSibling.querySelector("a").innerText.trim()
        GM_setValue("item", match)
    }
    else {
        GM_setValue("item", "Jar of Bricks")
    }

    window.location.href = "https://www.marapets.com/icefairy.php"
}