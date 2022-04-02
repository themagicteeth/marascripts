// ==UserScript==
// @name        Elite Gym Payment
// @namespace   Marascripts
// @match       https://www.marapets.com/elitegym.php
// @match       https://www.marapets.com/shops.php*
// @version     1.0.0
// @author      themagicteeh
// @description Pays for the Elite Gym.
// @grant       GM_setValue
// @grant       GM_getValue
// @run-at      document-idle
// @license     MIT
// ==/UserScript==

const TRAINING_URL = GM_getValue("training", "")

// Sets the URL for the current pet we are training
function setUrl() {
    const pet = document.querySelector(".petwidth a").href.split("?")[1]
    GM_setValue("training", `https://www.marapets.com/elitegym.php?do=dogym&${pet}`)
}

if (!document.URL.includes("/gym.php") && !document.URL.includes("/school.php") {
  // We are in a user shop, and bought a crystal
  // Save that we bought it and then go back to the Elite Gym
  if (document.URL.includes("/shops.php")) {
      GM_setValue("bought", 1)
      window.location.href = TRAINING_URL
  }

  // At the Elite Gym
  if (document.URL.includes("dogym")) {
      // Button to pay for training
      const payForTraining = document.querySelector("input[value='Pay for Training']")

      // Set the URL of current pet
      setUrl()

      // Check if we have paid from attic already
      // If we have not, try to pay
      const paidFromAttic = GM_getValue("attic", 0)
      if (paidFromAttic !== 1) {
          document.getElementById("location2").click()
          GM_setValue("attic", 1)
          payForTraining.click()
      } 

      // If we have just bought a crystal, use it
      // Then reset the value of "bought" to 0
      else if (GM_getValue("bought", 0) === 1) {
          GM_setValue("bought", 0)
          payForTraining.click()
      } 

      else {
          // Pick the first needed crystal
          // If there are no crystals needed, proceed to next check
          const crystalToBuy = document.querySelectorAll(".middleit.flex-table .itemwidth.fixborders a")[0]
          if (crystalToBuy) {
              // Click "Check Price" and buy from the user shop  
              crystalToBuy.click()
              setTimeout(() => {
                  const userShopUrl = document.querySelector(".pricechecktable .alsotry.same.strong").parentElement.href
                  window.location.href = userShopUrl
              }, 1000)
          } 

          // There are no more crystals needed
          // Reset "attic" to 0, and the remove the training URL
          // Then return to the pet selection page
          else {
              GM_setValue("attic", 0)
              GM_setValue("training", "")
              window.location.href = "https://www.marapets.com/elitegym.php"
          }
      }
  }
}
