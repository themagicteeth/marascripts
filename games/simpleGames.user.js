// ==UserScript==
// @name        Simple Dailies Automator
// @namespace   Marascripts
// @match       https://www.marapets.com/giganticfairy.php
// @match       https://www.marapets.com/potofgold.php
// @match       https://www.marapets.com/nuttytree.php
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
// @version     1.0.0
// @author      themagicteeth
// @description Automates simple games with just one button to click.
// @license     MIT
// ==/UserScript==


function clickButton(buttonValue) {
    const button = document.querySelector(`input[value='${buttonValue}']`)
    if (button) {
      button.click()
    }
  }
  
  
  if (!document.querySelector("div.middleit.comebackbox")) {
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
      //if (document.URL.includes("sultan")) { clickButton("Tax") }
  }
  