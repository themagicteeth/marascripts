// ==UserScript==
// @name        Quest Helper
// @namespace   Marascripts
// @match       https://www.marapets.com/shops.php*
// @match       https://www.marapets.com/shop.php*
// @match       https://www.marapets.com/farm.php
// @match       https://www.marapets.com/leprechaun.php
// @match       https://www.marapets.com/carpenter.php
// @match       https://www.marapets.com/explorer.php
// @match       https://www.marapets.com/attic.php
// @match       https://www.marapets.com/inn.php
// @match       https://www.marapets.com/truck.php
// @match       https://www.marapets.com/bee.php
// @match       https://www.marapets.com/excavator.php
// @match       https://www.marapets.com/elger.php
// @match       https://www.marapets.com/brew.php
// @match       https://www.marapets.com/traveller.php
// @match       https://www.marapets.com/inn.php
// @match       https://www.marapets.com/monster.php
// @match       https://www.marapets.com/computer.php
// @match       https://www.marapets.com/truck.php
// @match       https://www.marapets.com/santa.php
// @match       https://www.marapets.com/garage.php
// @match       https://www.marapets.com/stalker.php
// @match       https://www.marapets.com/viewstock.php
// @grant       GM_setValue
// @grant       GM_getValue
// @version     1.0
// @author      themagicteeth
// @description Automates buying quest items.
// @license     MIT
// ==/UserScript==

/**
 * KNOWN BUGS:
 * - Does not take from users own shop
 * - If two items are the same it will loop forever
 **/

const questNpc = document.querySelector(".mainfeature_art")
const quest = GM_getValue("quest")

if (questNpc?.innerText.includes("Complete more Quests")) {
  GM_setValue("quest", document.URL) // Set the quest URL

  const acceptQuest = document.querySelector("input[value='Accept Quest']")
  if (acceptQuest) { acceptQuest.click() }

  const questAgain = document.querySelector("form[action='?do=quest'] input")
  if (questAgain) { questAgain.click() }

  const computer = document.querySelector("input[value='Quest Computer Repair Again']")
  if (computer) { computer.click() }
  
  const puchalla = document.querySelector("input[value='Quest Puchalla Inn Again']")
  if (puchalla) { puchalla.click() }
  
  else {
    const checkPrice = document.querySelectorAll(".pricecheck")
    const numItems = checkPrice.length
    let acquiredCount = 0

    for (const item of checkPrice) {
      // This is the checkmark that is next to items acquired
      const acquired = item.parentElement.parentElement.previousElementSibling.querySelector("img[src='https://images.marapets.com/tick.png']")

      // If we have acquired the item increase the count of acquired items
      if (acquired) {
        // Increment the acquired items
        acquiredCount += 1

        // Complete quest button
        const completeQuest = document.querySelector("input[value='Complete Quest']")

        // If we have acquired the items and there is no captcha, complete the quest
        if (acquiredCount === numItems && !document.getElementById("securitycode")) {
          completeQuest.click()
        }

        // There is a captcha, focus it and submit when 6 characters are entered
        else if (document.getElementById("securitycode")) {
          const captcha = document.querySelector("input[name='code']") // Captcha input field
          captcha.oninput = () => {
            if (captcha.value.length === 6) {
              completeQuest.click()
            }
          }
          captcha.focus()
        }
      }

      // If we have not acquired it, add event listener to the "Price Check" link
      else {
        item.addEventListener('click', (e) => {
          setTimeout(() => {
            const priceCheck = document.querySelector(".pricechecktable")

            // We need to have the item source in order to buy it (duh)
            if (priceCheck) {
              const userShopLink = document.querySelector(".pricechecktable .alsotry.same.strong")

              // If we have any in our attic, use those
              const atticCount = parseInt(document.querySelector(".pricecheckcontent .banned.same").innerText.split(" ")[0])
              if (atticCount !== 0) { window.location.href = document.querySelector(".pricecheckcontent .banned.same").parentElement.href }
              
              else {
                // The item is retired, so buy from a user shop
                const retired = document.querySelector(".pricechecktable .banned.same.italic")
                const retiredAlt = document.querySelector(".pricechecktable .offline.same.italic")
                if (retired || retiredAlt) { window.location.href = userShopLink.parentElement.href }

                // The item is sold at a shop
                const itemSource = document.querySelector(".pricechecktable .sitedate.same.italic")
                if (itemSource) {
                  const stock = itemSource.innerText
                  // The item must have a stock quantity more than 0
                  if (stock.includes("stock") && stock.split(" ")[0] !== "0") {
                    const userPrice = parseInt(document.querySelector(".alsotry.same.strong").innerText.split(" ")[2].split("MP")[0].replace(/,/g, ""))
                    const shopPrice = parseInt(document.querySelector("span.sitedate.same.italic").innerText.split(" ").pop().split("MP")[0].replace(/,/g, ""))

                    // Compare the shops price, to the users price and buy the cheaper
                    if (shopPrice <= userPrice) { window.location.href = itemSource.parentElement.href }
                    else { window.location.href = userShopLink.parentElement.href }
                  }

                  // Item is not in stock
                  else { window.location.href = userShopLink.parentElement.href }
                }
              }
            }
          }, 500)
        })
      }
    }
  }
}

if (document.URL.includes("/attic.php")) {
  if (!document.URL.includes("?remove=1")) {
    const inventory = document.querySelector("input[value='Inventory']")
    if (inventory) { inventory.click() }
  }
  // We removed from our attic, back to the quest
  else { window.location.href = quest }
}

// Bought from user shop, or was in our shop
if (document.URL.includes("/shops.php")|| document.URL.includes("/viewstock.php")) { window.location.href = quest }

// Item is in stock
if (document.URL.includes("/shop.php")) {
  const itemToBuy = document.querySelector("div.marapets_border5 a") // Item with a dotted blue border
  if (itemToBuy) {
    itemToBuy.click()
  } else {
    window.location.href = quest
  }

  const buyItem = document.querySelector("button.g-recaptcha")
  if (buyItem) {
    buyItem.click()
  }
}
