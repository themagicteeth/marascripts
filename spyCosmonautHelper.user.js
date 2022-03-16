// ==UserScript==
// @name        Desert Spy and Cosmonaut Helper
// @namespace   Marapets
// @match       https://www.marapets.com/spy.php
// @match       https://www.marapets.com/shop.php*
// @match       https://www.marapets.com/cosmonaut.php
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_openInTab
// @version     1.0
// @author      themagicteeth
// @description Automatically selects the user on the item page while questing.
// @run-at document-idle
// ==/UserScript==

/* *
 * KNOWN ISSUES:
 *  - Captchas do not work in stores, they loop
 *  - Captchas do not work on quest, go back to store
 * */

/* Clicks the "Check Price" text */
function checkPrice() {
  const priceCheck = document.querySelector(".dopricecheck") // "Check Price" text
  priceCheck.click() // Click "Check Price"
}

/* Begins a new questing session, or quests again */
function beginQuest() {
  const accept = document.querySelector("input[value='Accept Quest']") // Generic "Accept Quest", for a new session
  const spyAgain = document.querySelector("input[value='Quest Desert Spy Again']") // Do another Desert Spy quest
  const cosmoAgain = document.querySelector("input[value='Quest Cosmonaut Again']") // Do another Cosmonaut quest
  
  if (accept) { accept.click() } // Start new questing session
  else if (cosmoAgain) { cosmoAgain.click() } // Do more Cosmonaut quests
  else if (spyAgain) { spyAgain.click() } // Do more Desert Spy quests
  else { return } // If the quest is not done, or it is not a new session, go back to the main function
}

/* Obtains the requested item */
function buyItem() {
 //const itemToBuy = document.querySelector("div.marapets_border5 a") // The dotted blue border on the needed item
 //if (itemToBuy) { itemToBuy.click() } // If we can find an item with the border, click it
  
  const yourOffer = document.querySelector("div.middleit.flex-table div span.bigger") // The "Your Offer" field
  // If we are on the buy item page, and have the "Your Offer" field, proceed
  if (document.URL.includes("do=buy") && yourOffer && !document.getElementById("securitycode")) {
    const buyButton = document.querySelector(".g-recaptcha") // "Buy Item" button
    buyButton.click() // Buy the item
  }
  
  const completeQuest = document.querySelector("input[value='Complete Quest']") // "Complete Quest" button, after buying the item
  if (completeQuest && !document.getElementById("securitycode")) { completeQuest.click() } // Complete the quest
}

/* If we are in a shop, handle obtaining the needed item */
if (document.URL.includes("shop.php")) { buyItem() }

/* If we are at the quest page, accept the quest, or begin obtaining the item */
if (document.URL.includes("spy.php") || document.URL.includes("cosmonaut.php")) {
  beginQuest()
  checkPrice()
  
  // We must set a timeout on this because it needs to wait until the price check popup is rendered
  setTimeout(function() {
    const itemSource = document.querySelector(".pricechecktable .sitedate.same.italic") // Where the item is from

    // We need to have the item source in order to buy it (duh)
    if (itemSource) {
      const stock = itemSource.innerText
      // It must include the word "stock", be more than 0 (for Cosmonaut, and Desert Spy)
      if (stock.includes("stock") && stock.split(" ")[0] !== "0") {
        window.location.href = itemSource.parentElement.href 
      }
    }
  }, 1000)
}  


  
