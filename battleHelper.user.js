// ==UserScript==
// @name        Battle Helper
// @namespace   Marascripts
// @match       https://www.marapets.com/battle.php
// @match       https://www.marapets.com/talon.php
// @match       https://www.marapets.com/sumo.php
// @match       https://www.marapets.com/knight.php
// @grant       none
// @version     1.2.1
// @author      themagicteeth
// @description Makes battling more convenient
// @run-at      document-idle
// @license     MIT
// ==/UserScript==

/* *
* Currently it will keep fighting until the script is turned off.
* In order to choose a different opponent it must be switched off!!!
* */

function getOpponentsTurn() {
    // Check if there are battle logs, otherwise it is the first turn
    const battleLogs = document.querySelectorAll(".battle_logs")
    if (battleLogs[0].innerText !== "") {
        const currentHealth = parseInt(document.querySelectorAll(".opponents2")[0].querySelector(".bigger.healthtxt").innerText) // Our current health
        const opponentsAttack = parseInt(battleLogs[1].querySelector(".flex-table4.marapets_border.itempadding .itempadding.bigger").innerText.split(" ")[0]) // Opponents last attack

        // If the opponents last attack was more than our current health - 10, then heal
        if (opponentsAttack >= currentHealth - 45) { heal() }
        // Otherwise attack
        else { attack() }
    }

    // First turn, always attack
    else { attack() }
}

function heal() {
    const heal = document.getElementById("heal")
    if (heal) { heal.click() }

    const confirmHeal = document.querySelector("input[value='Heal']")
    if (confirmHeal) { confirmHeal.click() }
}

// Not used, useful for some avatars
// function defend() {
//     const defend = document.getElementById("defend")
//     if (defend) { defend.click() }

//     const confirmDefend = document.querySelector("input[type='Defend']")
//     if (confirmDefend) { defend.click() }
// }

function attack() {
    const attack = document.getElementById("attack")
    if (attack) { attack.click() }

    const confirmAttack = document.querySelector("input[type='submit']")
    if (confirmAttack) { confirmAttack.click() }
}

function battleAgain() {
    const battleAgain = document.querySelector(".g-recaptcha")
    if (battleAgain) { battleAgain.click() }
}

// If there is no captcha, proceed
if (!document.querySelector(".middleit .more.italic") && document.querySelector(".opponents")) {
    setTimeout(function () {
        getOpponentsTurn()
        battleAgain()
    }, 600)
}

if (document.URL.includes("talon.php")) {
    setTimeout(function () {
        const startBattle = document.querySelector("button.g-recaptcha")
        if (startBattle) { startBattle.click() }

        const questAgain = document.querySelector("input[value='Quest Talon Again']")
        if (questAgain) { questAgain.click() }
    }, 750);
}

if (document.URL.includes("sumo.php")) {
    setTimeout(function () {
        const startBattle = document.querySelector("button.g-recaptcha")
        if (startBattle) { startBattle.click() }

        const questAgain = document.querySelector("input[value='Quest Sumo Sally Again']")
        if (questAgain) { questAgain.click() }
    }, 750);
}

if (document.URL.includes("knight.php")) {
    setTimeout(function () {
        const startBattle = document.querySelector("button.g-recaptcha")
        if (startBattle) { startBattle.click() }

        const questAgain = document.querySelector("input[value='Quest Knutt Knight Again']")
        if (questAgain) { questAgain.click() }
    }, 750);
}
