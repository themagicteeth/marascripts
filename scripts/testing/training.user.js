// ==UserScript==
// @name        Training Helper
// @namespace   Marascripts
// @match       https://www.marapets.com/school.php
// @match       https://www.marapets.com/gym.php
// @match       https://www.marapets.com/elitegym.php
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

/**
 * Compares user price to shop price
 * @return {boolean} true if shop is cheaper, false is user shop is
 */
function isUserShopCheaper() {
    const userPrice = parseInt(document.querySelector(".alsotry.same.strong").innerText.split(" ")[2].split("MP")[0].replace(/,/g, ""))
    const shopPrice = parseInt(document.querySelector("span.sitedate.same.italic").innerText.split(" ").pop().split("MP")[0].replace(/,/g, ""))
    return shopPrice <= userPrice ? false : true
}

/**
 * Checks if an item is in stock
 * @return {string} URL to shop if in stock, or null
 */
function checkInStock() {
    const itemSource = document.querySelector(".pricechecktable .sitedate.same.italic")
    if (itemSource) {
        const stock = itemSource.innerText
        return (stock.includes("stock") && stock.split(" ")[0] !== "0") ? itemSource.parentElement.href : null
    } else { return null }
}

/**
 * Checks if an item is retired
 * @return {boolean} true if item is retired, false if not
 */
function checkRetired() {
    const retired = document.querySelector(".pricechecktable .banned.same.italic")
    const retiredAlt = document.querySelector(".pricechecktable .offline.same.italic")
    return retired || retiredAlt ? true : false
}

/**
 * Checks if an item is retired
 * @return {boolean} true if item is retired, false if not
 */
function getUserShop() {
    const userShopLink = document.querySelector(".pricechecktable .alsotry.same.strong")
    return userShopLink ? userShopLink.parentElement.href : null
}

/**
 * Selects the radio button for paying from attic, and updates the GM "attic" value
 * @return {void}
 */
function payFromAttic() {
    const radio = document.getElementById("location2")
    if (radio) {
        radio.click()
        GM_setValue("attic", 1)
    }
}

/**
 * Sets GM value "training" for the pet we are currently training
 * @return {void}
 */
function setUrl() {
    const pet = document.querySelector(".petwidth a").href.split("?")[1]

    let url = ""
    if (document.URL.includes("/school.php")) { url = `https://www.marapets.com/school.php?do=subjects&${pet}` }
    if (document.URL.includes("/elitegym.php")) { url = `https://www.marapets.com/elitegym.php?do=dogym&${pet}` }
    if (document.URL.includes("/gym.php")) { url = `https://www.marapets.com/gym.php?do=dogym&${pet}` }

    GM_setValue("training", url)
}

/**
 * Returns the element of the button based on where we are training
 * @returns {string}
 */
function getPayButton() {
    const school = document.querySelector("input[value='Pay for Lesson']")
    const gyms = document.querySelector("input[value='Pay for Training']")
    return gyms ? gyms : school
}

/**
 * Clicks the item in an NPC shop to buy it.
 * @returns {void}
 */
function clickShopItem() {
    const itemToBuy = GM_getValue("item")
    const allItems = document.querySelectorAll(".itempadding a span.bigger")
    allItems.forEach((item) => {
        const itemName = item.innerText
        if (itemName === itemToBuy) {
            item.click()
        }
    })
}

/**
 * Handles determining where to get the item, and navigating to it
 * @return {void}
 */
function goToItem(itemToBuy) {
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


const TRAINING_URL = GM_getValue("training", "")

if (!document.URL.includes("shop") && document.URL.includes("?do=")) {

    setUrl()

    const paid = document.querySelector(".maralayoutmiddle span.bigger.middleit")
    if (paid) {
        if (paid.innerText.search("will be finished") > 0) {
            GM_setValue("attic", 0)
            GM_setValue("training", "")
            const goTo = document.URL.split("?")[0]
            window.location.href = goTo
        }
    }

    const payForTraining = getPayButton()
    if (payForTraining) {
        const paidFromAttic = GM_getValue("attic", 0)
        if (paidFromAttic === 0) {
            payFromAttic()
            payForTraining.click()
        }

        if (GM_getValue("bought", 0) === 1) {
            GM_setValue("bought", 0)
            payForTraining.click()
        } else {
            const itemToBuy = document.querySelectorAll(".middleit.flex-table .itemwidth.fixborders a")[0]
            if (itemToBuy) {
                itemToBuy.click()
                goToItem(itemToBuy)
            }
        }
    }
}

if (document.URL.includes("/shops.php")) {
    GM_setValue("bought", 1)
    window.location.href = TRAINING_URL
}

if (document.URL.includes("/shop.php")) {
    clickShopItem()
}

if (document.URL.includes("/shop.php?do=buy&id=")) {
    const buyButton = document.querySelector("button")
    buyButton.click()
}

const thanksForBuying = document.querySelector(".bigger.middleit.btmpad6")
if (thanksForBuying) {
    GM_setValue("bought", 1)
    GM_setValue("item", "")
    window.location = TRAINING_URL
}
