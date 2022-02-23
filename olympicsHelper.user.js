// ==UserScript==
// @name        Olympics Helper
// @namespace   Marascripts
// @match       https://www.marapets.com/competitions.php
// @grant       none
// @version     1.0
// @author      -
// @license     MIT
// @description Picks the ideal event for each pet.
// ==/UserScript==

/* *
 * This picks the ideal event for each of your pets.
 * 
 * TODO:
 *  - Base chosen event on rewards
 *  - Add "Olympian" condition
 * */

setTimeout(function(){
  const events = document.querySelectorAll(".eachpet_box.marapets_border")

  if (events.length > 0) {
    let ultimate = []
    let expert = []
    let intermediate = []
    let beginner = []
    let untrained = []

    for (let event = 0; event < events.length; event++) {
      const level = events[event].querySelector(".alsotry").innerText
      const enterUrl = events[event].querySelector("a").href

      if (level === "Ultimate") { ultimate.push(enterUrl) }
      else if (level === "Expert") { expert.push(enterUrl) }
      else if (level === "Intermediate") { intermediate.push(enterUrl) }
      else if  (level === "Beginner") { beginner.push(enterUrl) }
      else if  (level === "Untrained")  { untrained.push(enterUrl) }
    }

    if (ultimate.length > 0) { window.location.href = ultimate[0]}
    else if (expert.length > 0) { window.location.href = expert[0] }
    else if (intermediate.length > 0) { window.location.href = intermediate[0] }
    else if (beginner.length > 0) { window.location.href = beginner[0] }
    else { window.location.href = untrained[0] }
  }

  else {
    if (!document.querySelector("div.middleit.comebackbox")) {
      window.location.href = "https://www.marapets.com/competitions.php" 
    }
  }
}, 1200);
