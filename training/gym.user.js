// ==UserScript==
// @name        Gym Payment
// @namespace   Marascripts
// @match       https://www.marapets.com/gym.php
// @match       https://www.marapets.com/shops.php*
// @version     1.0.0
// @author      themagicteeh
// @description Pays for the Gym.
// @grant       GM_setValue
// @grant       GM_getValue
// @run-at      document-idle
// @license     MIT
// ==/UserScript==

const TRAINING_URL = GM_getValue("training", "")
const payForTraining = document.querySelector("input[value='Pay for Training']")

if (document.URL.includes("/shops.php")) {
    GM_setValue("bought", 1)
    window.location.href = TRAINING_URL
}

function setUrl() {
    const pet = document.querySelector(".petwidth a").href.split("?")[1]
    GM_setValue("training", `https://www.marapets.com/gym.php?do=dogym&${pet}`)
}

if (document.URL.includes("dogym")) {
    setUrl()
    const paidFromAttic = GM_getValue("attic", 0)
    if (paidFromAttic !== 1) {
        document.getElementById("location2").click()
        GM_setValue("attic", 1)
        payForTraining.click()
    } else if (GM_getValue("bought", 0) === 1) {
        GM_setValue("bought", 0)
        payForTraining.click()
    } else {
        const crystalToBuy = document.querySelectorAll(".middleit.flex-table .itemwidth.fixborders a")[0]
        if (crystalToBuy) {
            crystalToBuy.click()
            setTimeout(() => {
                const userShopUrl = document.querySelector(".pricechecktable .alsotry.same.strong").parentElement.href
                window.location.href = userShopUrl
            }, 1000)
        } else {
            GM_setValue("attic", 0)
            GM_setValue("training", "")
            window.location.href = "https://www.marapets.com/gym.php"
        }
    }
}
