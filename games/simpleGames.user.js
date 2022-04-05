// ==UserScript==
// @name        Simple Dailies Automator
// @namespace   Marascripts
// @match       https://www.marapets.com/giganticfairy.php
// @match       https://www.marapets.com/potofgold.php
// @match       https://www.marapets.com/sewage.php
// @match       https://www.marapets.com/graves.php
// @match       https://www.marapets.com/sevenheaven.php
// @match       https://www.marapets.com/archeology.php
// @match       https://www.marapets.com/undyingfairy.php
// @match       https://www.marapets.com/trash.php
// @match       https://www.marapets.com/rack.php
// @match       https://www.marapets.com/tree.php
// @match       https://www.marapets.com/ants.php
// @match       https://www.marapets.com/plushies.php
// @match       https://www.marapets.com/plushies2.php
// @match       https://www.marapets.com/vending.php
// @match       https://www.marapets.com/fishing.php
// @match       https://www.marapets.com/telescope.php
// @match       https://www.marapets.com/sultan.php
// @match       https://www.marapets.com/gumball.php
// @match       https://www.marapets.com/sugarstack.php
// @match       https://www.marapets.com/scratchcards2.php
// @match       https://www.marapets.com/graverobbing.php
// @match       https://www.marapets.com/graves.php
// @match       https://www.marapets.com/giveaways.php
// @match       https://www.marapets.com/burst.php
// @match       https://www.marapets.com/nuttytree.php
// @match       https://www.marapets.com/jackpot.php
// @match       https://www.marapets.com/multiplier.php
// @match       https://www.marapets.com/spooks.php
// @match       https://www.marapets.com/wormdigging.php
// @match       https://www.marapets.com/newsagent.php
// @match       https://www.marapets.com/sword.php
// @match       https://www.marapets.com/magazines.php
// @match       https://www.marapets.com/bpbank.php
// @match       https://www.marapets.com/rpbank.php
// @match       https://www.marapets.com/bank.php
// @version     1.0.0
// @author      themagicteeth
// @description Automates simple games with just one button to click.
// @license     MIT
// ==/UserScript==


function clickButton(buttonValue) {
  const button = [...document.querySelectorAll('input')].find(e => e.value.includes(buttonValue))
  if (button) {
    button.click()
  }
}

function pickRandom(selector) {
  const elements = document.querySelectorAll(selector)
  elements[Math.floor(Math.random() * elements.length)].click()
}

if (!document.querySelector("div.middleit.comebackbox")) {
  if (document.URL.includes("multiplier")) { pickRandom(".middleit.flex-table #eachitemdiv a") }
  if (document.URL.includes("jackpot")) { pickRandom(".pyramid a") }
  if (document.URL.includes("wormdigging")) { pickRandom(".wormbox.flex-middle.flex-grow input") }
  if (document.URL.includes("nuttytree")) { pickRandom(".middleit.flex-table .flex-buttons form input[type='submit']") }
  if (document.URL.includes("spooks")) { pickRandom(".middleit.flex-table #eachitemdiv.itemwidth.fixborders a") }
  if (document.URL.includes("burst")) { pickRandom(".middleit.flex-table #eachitemdiv.itemwidth.fixborders a") }
  if (document.URL.includes("giveaways")) { pickRandom("#eachitemdiv a") }
  if (document.URL.includes("graves")) { pickRandom(".maralayoutmiddle .flex-table .middleit a") }

  if (document.URL.includes("sugarstack")) { clickButton('Play for 1,000MP') }
  if (document.URL.includes("telescope")) { clickButton('Use for 2,000MP') }
  if (document.URL.includes("gumball")) { clickButton('Put in 150MP') }
  if (document.URL.includes("trash")) { clickButton('Grab Trash') }
  if (document.URL.includes("undyingfairy")) { clickButton('Spin Wheel') }
  if (document.URL.includes("sewage")) { clickButton('Swim in the Sewage') }
  if (document.URL.includes("potofgold")) { clickButton('Grab Prize') }
  if (document.URL.includes("giganticfairy")) { clickButton('Test Your Strength') }
  if (document.URL.includes("plushies")) { clickButton('Move Down') }
  if (document.URL.includes("sevenheaven")) { clickButton('Roll Again') }
  if (document.URL.includes("rack")) { clickButton('Take Free Clothing') }
  if (document.URL.includes("graverobbing")) { clickButton('Rob a Grave') }
  if (document.URL.includes("archeology")) { clickButton("Dig for Simerian Artifacts") }
  if (document.URL.includes("ants.php")) { clickButton("Grab Prize") }
  if (document.URL.includes("vending.php")) { clickButton("Use Vending Machine") }
  if (document.URL.includes("fishing.php")) { clickButton("Go Fishing") }
  if (document.URL.includes("/tree.php")) { clickButton("Shake Tree") } // Shake for the Avatar
  if (document.URL.includes("scratchcards2.php")) { clickButton("Buy Scratchcard") }
  if (document.URL.includes("sultan")) { clickButton("Tax") }
  if (document.URL.includes("bank.php")) { clickButton("Interest") }
  if (document.URL.includes("/sword.php")) { clickButton("Lift Sword from the Stone") }
  if (document.URL.includes("/magazines.php")) { clickButton("Buy Magazine") }
  if (document.URL.includes("/newsagent.php")) { clickButton("Buy Newspaper") }
}
