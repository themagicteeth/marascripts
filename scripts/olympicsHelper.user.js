// ==UserScript==
// @name        Olympics Helper
// @description Picks the optimal Olympic event for each of your pets.
// @version     1.1.0
// @author      themagicteeth
// @grant       none
// @match       https://www.marapets.com/competitions.php*
// ==/UserScript==

const events = document.querySelectorAll(".eachpet_box.marapets_border")

if (events.length > 0) {
  const olympian = []
  const ultimate = []
  const expert = []
  const intermediate = []
  const beginner = []
  const untrained = []

  setTimeout(() => {
    for (const eventElement of events) {
      const level = eventElement.querySelector(".alsotry").innerText
      const enterUrl = eventElement.querySelector("a")
      enterUrl.onclick = null

      if (level.split(" ")[0] === "Olympian") {
        olympian.push(enterUrl)
      } else if (level === "Ultimate") {
        ultimate.push(enterUrl)
      } else if (level === "Expert") {
        expert.push(enterUrl)
      } else if (level === "Intermediate") {
        intermediate.push(enterUrl)
      } else if (level === "Beginner") {
        beginner.push(enterUrl)
      } else if (level === "Untrained") {
        untrained.push(enterUrl)
      }
    }

    if (olympian.length > 0) {
      olympian[0].click()
    } else if (ultimate.length > 0) {
      ultimate[0].click()
    } else if (expert.length > 0) {
      expert[0].click()
    } else if (intermediate.length > 0) {
      intermediate[0].click()
    } else if (beginner.length > 0) {
      beginner[0].click()
    } else {
      window.location.href = untrained[0].click()
    }
  }, 1200)
} else if (document.querySelector(".bigger.petpadding")) {
  const entered = document.querySelector(".bigger.petpadding")
  if (entered.innerText.search("entered") > 0) {
    document.querySelector(".mainfeature_art a").click()
  }
} else {
  setTimeout(() => {
    document.querySelector(".mainfeature_art a").click()
  }, 120000)
}
