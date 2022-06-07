// ==UserScript==
// @name        Memory Cheat
// @namespace   Marascripts
// @match       https://www.marapets.com/memory/game.php
// @grant       none
// @version     1.0
// @author      themagicteeth
// @license     MIT
// @description Cheat at Memory, click the button and switch switch tabs to toggle
// ==/UserScript==

document.getElementById("block_game").remove()

let active = 1
const btn = document.createElement("button")
btn.setAttribute("id", "toggle-active")
btn.innerHTML = "Toggle Active"
btn.style.zIndex = 99
btn.style.position = 'absolute'
btn.style.left = "2em"
btn.style.bottom = "2em"
document.body.appendChild(btn)


document.getElementById("toggle-active").onclick = function () {
  if (active === 1) {
    setInactive()
  }
  else { setActive() }
}


function setActive() {
  active = 1
  Object.defineProperty(document, "hidden", {
    configurable: true,
    writable: true,
    value: false
  });
}

function setInactive() {
  active = 0
  Object.defineProperty(document, "hidden", {
    configurable: true,
    writable: true,
    value: true
  });
}
