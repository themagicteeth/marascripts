// ==UserScript==
// @name        Stock Helper
// @match       https://www.marapets.com/shares.php
// @grant       none
// @version     1.0
// @author      themagicteeth
// @description Buys cheapest stock.
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
          company.parentElement.parentElement.parentElement.parentElement.href
      }
    })

    window.location = buyLink
  }

  if (ON_BUY_PAGE) {
    const sharesToBuy = document.querySelector("input[name='amount']")
    sharesToBuy.value = 100

    const buyShares = document.querySelector("input[name='Submit']")
    buyShares.click()
  }
}
