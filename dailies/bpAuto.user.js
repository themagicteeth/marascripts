// ==UserScript==
// @name        BP Dailies Automator
// @namespace   Marascripts
// @match       https://www.marapets.com/newsagent.php
// @match       https://www.marapets.com/sword.php
// @match       https://www.marapets.com/magazines.php
// @version     1.0.0
// @author      themagicteeth
// @description Automates BP dailies
// @license     MIT
// @grant       none
// ==/UserScript==

if (!document.querySelector("div.middleit.comebackbox")) {

    function clickButton(buttonValue) {
        const button = document.querySelector(`input[value='${buttonValue}']`)
        if (button) {
            button.click()
        }
    }

    if (document.URL.includes("/sword.php")) { clickButton("Lift Sword from the Stone") }
    if (document.URL.includes("/magazines.php")) { clickButton("Buy Magazine") }
    if (document.URL.includes("/newsagent.php")) { clickButton("Buy Newspaper") }
}
