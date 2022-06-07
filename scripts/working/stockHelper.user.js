// ==UserScript==
// @name        Stock Helper
// @description Buys cheapest stock.
// @version     1.1.0
// @author      themagicteeth
// @grant       none
// @match       https://www.marapets.com/shares.php
// ==/UserScript==

const ON_COOLDOWN = document.querySelector(".middleit.comebackbox")

if (!ON_COOLDOWN) {
  const ON_BUY_PAGE = document.URL.includes("?do=company")

  if (!ON_BUY_PAGE) {
    let lowestPrice = 99999
    let buyLink = ""
    const allCompanies = document.querySelectorAll(
      ".fairyreward_box .itempadding span.currencytext b"
    )

    allCompanies.forEach((company) => {
      const price = parseInt(company.innerText.split("MP")[0].replace(/,/g, ""))
      if (price < lowestPrice && price >= 100) {
        lowestPrice = price
        // TODO: This is janky
        buyLink =
          company.parentElement.parentElement.parentElement.parentElement
      }
    })
    buyLink.onclick = null
    buyLink.click()
  }

  if (ON_BUY_PAGE) {
    const sharesToBuy = document.querySelector("input[name='amount']")
    sharesToBuy.value = 100

    const buyShares = document.querySelector("input[name='Submit']")
    buyShares.click()
  }
}
