// ==UserScript==
// @name        Cloud Nine Auto
// @namespace   Marascripts
// @match       https://www.marapets.com/cloudnine.php
// @version     1.0.0
// @author      themagicteeth
// @description Plays Cloud Nine.
// @license     MIT
// ==/UserScript==

function clickRandom(clouds) {
    clouds[Math.floor(Math.random() * clouds.length)].click()
}

if (!document.querySelector("div.middleit.comebackbox")) {
    const whiteClouds = document.querySelectorAll("img[src='https://images.marapets.com/clouds/cloud.png'")
    const stormClouds = document.querySelectorAll("img[src='https://images.marapets.com/clouds/storm.png']")

    if (whiteClouds.length > 6) { clickRandom(whiteClouds) }
    if (stormClouds.length !== 0) { clickRandom(stormClouds) }
}
