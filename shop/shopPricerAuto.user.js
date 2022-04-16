// ==UserScript==
// @name        Shop Pricer Easymode
// @namespace   Marascripts
// @match       https://www.marapets.com/viewstock.php*
// @grant       GM_setValue
// @grant       GM_getValue
// @version     1.0.1
// @author      themagicteeth
// @license     MIT
// @description Automates repricing shop, requires the Gift Box
// ==/UserScript==

// Set onclick to shopkeeper image to start the autpricer
let autoPricerOn = GM_getValue('autoprice', 0) // Defaults to 0
document.querySelector(".mainfeature_art").onclick = GM_setValue('autoprice', 1) // Set to 1 when we click the shopkeeper

// If the autoprice value is set to 1 (after clicking shopkeeper)
if (autoPricerOn === 1) {
    const noReprice = document.querySelector(".maralayoutmiddle .bigger.banned.middleit") // Nothing to reprice
    const changed = document.querySelector(".maralayoutmiddle .bigger.middleit").innerText.search('You have changed') // Confirmed reprices
    const autoPriced = document.querySelector(".maralayoutmiddle .bigger.middleit").innerText.search('has changed') // Repricer changed prices

    // Click the "Auto Price" button, if none of the messages are present
    if (autoPriced === -1 && changed === -1 && !noReprice) {
        document.querySelector("input[value='Auto Price']").click()
    }

    // Click the "Update Prices" button, if the auto pricer message is there
    if (autoPriced !== -1) {
        const largeDrop = document.querySelectorAll(".marapets_border15")
        // const mediumDrop = document.querySelectorAll(".marapets_border14")
        if (largeDrop.length !== 0) {
            largeDrop.forEach((item) => {
                const oldPrice = item.querySelector(".mp").innerText.split("MP")[0].replace(/,/g, "")
                item.querySelector("input").value = oldPrice
            })
        }

        document.querySelector("input[value='Update Prices']").click()
    }

    // Go to the next page, or alert that we are finished
    if (noReprice || changed !== -1) {
        const pageButtons = document.querySelectorAll('.pages_all')[0].querySelectorAll('.pages_each a') // Array of the page selector
        const secondToLastPageButton = pageButtons[pageButtons.length - 2] // The second to last button

        // If the second to last button says "Next >", click it otherwise notify we are finished
        if (secondToLastPageButton.innerText === 'Next ›') {
            secondToLastPageButton.click()
        } else {
            GM_setValue('autoprice', 0) // We are finished, set back to 0
            //alert('Pricing finished!')
          setTimeout(()=>{
            GM_setValue('autoprice', 1)
            window.location.href = "https://www.marapets.com/viewstock.php?page=1"
           // Set this to the amount of miliseconds, default 20 seconds
          },20000)
        }
    }
}
