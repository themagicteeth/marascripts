// ==UserScript==
// @name        Guessed the Flag
// @namespace   Marascripts
// @match       https://www.marapets.com/trojan.php
// @version     1.0.0
// @author      themagicteeth
// @description Guesses the flag for you.
// @license     MIT
// @grant       none
// ==/UserScript==

function clickButton(buttonValue) {
    const button = document.querySelector(`input[value='${buttonValue}']`)
    if (button) {
        button.click()
    }
}

if (!document.querySelector("div.middleit.comebackbox")) {
    const input = document.querySelector("input[name='country']")
    let country = document.querySelector("form .middleit img")
        .getAttribute("src")
        .split("_")[1]
        .split(".")[0]

    // Check for countries which don't match the image name
    if (country === "Bosnia") { country = "Bosnia and Herzegovina" }
    if (country === "Trinidad") { country = "Trinidad and Tobago" }
    if (country === "UK") { country = "United Kingdom" }
    if (country === "UAE") { country = "United Arab Emirates" }

    input.value = country
    clickButton("Guess the Flag")
}
