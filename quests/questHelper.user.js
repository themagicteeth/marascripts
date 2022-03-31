// ==UserScript==
// @name        Quest Helper
// @namespace   Marascripts
// @match       https://www.marapets.com/carpenter.php
// @match       https://www.marapets.com/shop.php
// @match       https://www.marapets.com/shops.php
// @match       https://www.marapets.com/attic.php
// @match       https://www.marapets.com/elger.php
// @match       https://www.marapets.com/bee.php
// @match       https://www.marapets.com/brew.php
// @match       https://www.marapets.com/viewstock.php
// @version     1.0
// @author      themagicteeth
// @description Quest automater for quests.
// @grant       GM_setValue
// @grant       GM_getValue
// @run-at      document-idle
// ==/UserScript==


/****************************************************************
 * TODO:
 * * Dont use red checks to determine if we have the item
 *    - Use messages on the page after buying it
 *    - Add a obtained field to items object
 * * Duplicate item bug
 * * Don't base item to buy in shop on border
 *    - Both should be fixed by adding a obtained field to the item
 * * Fix random hand in some shops
 * * Fix captcha detection
 * * Set amount of time in order to clear quest when done questing
 ****************************************************************/


/****************************************************************
 * 
 * HELPER FUNCTIONS
 * 
 ****************************************************************/

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

/* Navigates to a given URL */
function goToItem(url) {
    window.location.href = url
}

/* Checks if a captcha is present */
function checkCaptcha() {
    return document.getElementById("securitycode") ? true : false
}

function setQuestUrl() {
    const questGiver = document.querySelector(".maralayoutmiddle .mainfeature_start .mainfeature_npc")
    if (questGiver) {
        const moreQuests = questGiver.innerText.trim()
        if (moreQuests === "Complete more Quests") {
            const questUrl = document.URL.split("?")[0]
            GM_setValue("quest", questUrl)
        }
    }
}

function getItems() {
    const questItemsTable = document.querySelector(".bigsearchbox.middleit .flex-table2")

    if (questItemsTable) {
        const itemsNeeded = {}
        const itemElements = [...questItemsTable.children]

        let index = 0
        itemElements.forEach((item) => {
            const obtained = item.querySelector(".bigger").innerHTML.includes("/tick.png")

            if (!obtained) {
                const itemName = item.querySelector(".bigger").innerText
                const priceCheck = item.querySelector(".petpadding a").getAttribute("data-id")

                itemsNeeded[index] = {
                    "name": itemName,
                    "check": priceCheck
                }

                index += 1
            }
        })

        GM_setValue("items", itemsNeeded)
        return itemsNeeded
    }
}

async function checkFirstItem() {
    const questItems = getItems()

    // Check if we still need items
    if (questItems[0]) {
        // Click "Check Price" on the item based on its "data-id" field
        const itemId = questItems[0]["check"] // Items "data-id" field
        document.querySelector(`a[data-id='${itemId}']`).click()

        setTimeout(function () {
            let itemURL = "" // Stores the URL for the best place to buy the item

            // First check if we have the item in our attic
            // TODO: Check price due to bug of magic beans
            const atticURL = getAttic()
            if (atticURL !== null) { itemURL = atticURL }

            // If it is not in our attic perform other checks
            else {
                const userShopURL = getUserShop() // Direct URL to buy from user shop
                const inStockURL = checkInStock() // URL to the shop where item is sold

                // Check if the item is retired, if so, buy from user shop
                const retired = checkRetired()
                if (retired || !inStockURL) { itemURL = userShopURL }

                // Item is not retired, and is in stock
                else {
                    const userCheaper = isUserShopCheaper() // Compare user shop price to NPC shop
                    if (!userCheaper) { itemURL = inStockURL } // NPC shop is cheaper
                    else { itemURL = userShopURL } // User is cheaper
                }
            }

            goToItem(itemURL)
        }, 1500)
    } else if (!checkCaptcha()) { document.querySelector("input[value='Complete Quest']").click() }
}

function getLocation() {
    // Set the URL of the current quest
    setQuestUrl()
    const questURL = GM_getValue("quest", "")

    // Check if the current page is the questgiver
    if (document.URL.includes(questURL)) {
        // Check if we have completed a quest and need to start a new one
        const message = document.querySelector(".maralayoutmiddle div.bigger.middleit.btmpad6")
        if (message) {
            if (message.innerText.includes("Thank you for finishing my quest")) {
                const questAgain = document.querySelector(".maralayoutmiddle form input")
                questAgain.click()
            }
        }

        // If Queen Bee stings a pet
        //const queenBeeSting = document.querySelector(".maralayoutmiddle a .bigger.petpadding")
        // else if (queenBeeSting) {
        //   if (queenBeeSting.includes("Queen Bee stung your pet!")) {
        //     document.querySelector("input[value='Quest Queen Bee Again']").click()
        //   }
        // }

        // If we don't need to start a new one, check the items
        else { checkFirstItem() }
    }

    // We bought the item from a user shop, go back to the questgiver
    if (document.URL.includes("/shops.php")) { window.location = questURL }

    // We are in an NPC shop
    if (document.URL.includes("/shop.php")) {
        // Find the item (dotted blue border), and click it
        // TODO: Fix the random times it doesn't buy the item
        const itemToBuy = document.querySelector("div.marapets_border5 a") // Item with a dotted blue border
        if (itemToBuy) { itemToBuy.click() }

        // If we have just bought the item, go back to the quest
        const thanksForBuying = document.querySelector(".bigger.middleit.btmpad6")
        if (thanksForBuying) { window.location = questURL }
    }

    // We are buying an item from an NPC shop
    if (document.URL.includes("/shop.php?do=buy&id=")) {
        const buyButton = document.querySelector("button")
        buyButton.click()
    }

    // We had the item in out attic
    if (document.URL.includes("/attic.php")) {
        // If we have not yet removed the item, remove it
        if (!document.URL.includes("?remove=1")) {
            const inventory = document.querySelector("input[value='Inventory']")
            if (inventory) { inventory.click() }
        }
        // We removed from our attic, back to the quest
        else { window.location.href = questURL }
    }

    // Our shop was lowest price, go back to quest giver
    if (document.URL.includes("/viewstock.php")) { window.location.href = questURL }
}

getLocation()
