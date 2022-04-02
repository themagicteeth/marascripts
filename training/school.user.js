// ==UserScript==
// @name        School Payment
// @namespace   Marascripts
// @match       https://www.marapets.com/school.php
// @match       https://www.marapets.com/shops.php*
// @match       https://www.marapets.com/shop.php
// @version     1.0.0
// @author      themagicteeh
// @description Pays for the School.
// @grant       GM_setValue
// @grant       GM_getValue
// @run-at      document-idle
// @license     MIT
// ==/UserScript==

/* Compares user price to shop price */
function isUserShopCheaper() {
    const userPrice = parseInt(document.querySelector(".alsotry.same.strong").innerText.split(" ")[2].split("MP")[0].replace(/,/g, ""))
    const shopPrice = parseInt(document.querySelector("span.sitedate.same.italic").innerText.split(" ").pop().split("MP")[0].replace(/,/g, ""))
    return shopPrice <= userPrice ? false : true
}

/* Checks if an item is in stock */
function checkInStock() {
    const itemSource = document.querySelector(".pricechecktable .sitedate.same.italic")
    if (itemSource) {
        const stock = itemSource.innerText
        return (stock.includes("stock") && stock.split(" ")[0] !== "0") ? itemSource.parentElement.href : null
    } else { return null }
}

/* Checks if an item is retired */
function checkRetired() {
    const retired = document.querySelector(".pricechecktable .banned.same.italic")
    const retiredAlt = document.querySelector(".pricechecktable .offline.same.italic")
    return retired || retiredAlt ? true : false
}

/* Checks if item is in the attic */
function getAttic() {
    const atticCount = document.querySelector(".pricecheckcontent .banned.same")
    return parseInt(atticCount.innerText.split(" ")[0]) === 0 ? null : atticCount.parentElement.href
}

/* Gets the direct URL to buy from user shop */
function getUserShop() {
    const userShopLink = document.querySelector(".pricechecktable .alsotry.same.strong")
    return userShopLink ? userShopLink.parentElement.href : null
}


const TRAINING_URL = GM_getValue("training", "")

// Sets the URL for the current pet we are training
function setUrl() {
    const pet = document.querySelector(".petwidth a").href.split("?")[1]
    GM_setValue("training", `https://www.marapets.com/school.php?do=subjects&${pet}`)
}

if (!document.URL.includes("/gym.php") && !document.URL.includes("/elitegym.php")) {   
  // We are in a user shop, and bought a crystal
  // Save that we bought it and then go back to the Gym
  if (document.URL.includes("/shops.php")) {
      GM_setValue("bought", 1)
      window.location.href = TRAINING_URL
  }

  if (document.URL.includes("/shop.php")) {
      const allItems = document.querySelectorAll(".itempadding a span.bigger")
      const itemToBuy = GM_getValue("item")
      allItems.forEach((item) => {
          const itemName = item.innerText
          if (itemName === itemToBuy) {
              item.click()
          }
      })

      // If we have just bought the item, go back to the quest
      const thanksForBuying = document.querySelector(".bigger.middleit.btmpad6")
      if (thanksForBuying) { 
          GM_setValue("bought", 1)
          GM_setValue("item", "")
          window.location = TRAINING_URL
      }
  }

  // We are buying an item from an NPC shop
  if (document.URL.includes("/shop.php?do=buy&id=")) {
      const buyButton = document.querySelector("button")
      buyButton.click()
  }

  // At the Gym
  if (document.URL.includes("subjects")) {
      // Button to pay for training
      const payForTraining = document.querySelector("input[value='Pay for Lesson']")

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
          const itemToBuy = document.querySelectorAll(".middleit.flex-table .itemwidth.fixborders a")[0]
          if (itemToBuy) {
              // Click "Check Price" and buy from the user shop
              itemToBuy.click()
              setTimeout(() => {
                  const userShopURL = getUserShop() // Direct URL to buy from user shop
                  const inStockURL = checkInStock() // URL to the shop where item is sold
                  let itemURL = "" 

                  // Check if the item is retired, if so, buy from user shop
                  const retired = checkRetired()
                  if (retired || !inStockURL) { itemURL = userShopURL }

                  // Item is not retired, and is in stock
                  else {
                      // Compare user shop price to NPC shop
                      GM_setValue("item", itemToBuy.parentElement.parentElement.querySelector(".itempadding .bigger").innerText)
                      const userCheaper = isUserShopCheaper() 
                      itemURL = !userCheaper ? inStockURL : userShopURL;
                  }

                  window.location.href = itemURL
              }, 1000)
          } 

          // There are no more crystals needed
          // Reset "attic" to 0, and the remove the training URL
          // Then return to the pet selection page
          else {
              GM_setValue("attic", 0)
              GM_setValue("training", "")
              window.location.href = "https://www.marapets.com/school.php"
          }
      }
  }
}
