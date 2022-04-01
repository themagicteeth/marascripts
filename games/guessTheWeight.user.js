// ==UserScript==
// @name        Guessed the Weight
// @namespace   Marascripts
// @match       https://www.marapets.com/guesstheweight.php
// @version     1.0.0
// @author      themagicteeth
// @description Guesses random weight of the potato.
// @license     MIT
// ==/UserScript==

const weightInput = document.querySelector("input[name='weight'")
if (weightInput) {
    weightInput.value = Math.floor(Math.random() * 100)
    document.querySelector("input[value='Guess the Weight']").click()
}
