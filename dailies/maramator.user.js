// ==UserScript==
// @name        Marapets Automator
// @namespace   Marascripts
// @match       https://www.marapets.com/giganticfairy.php
// @match       https://www.marapets.com/pie.php
// @match       https://www.marapets.com/guesstheweight.php
// @match       https://www.marapets.com/sugarstack.php
// @match       https://www.marapets.com/spooks.php
// @match       https://www.marapets.com/burst.php
// @match       https://www.marapets.com/potofgold.php
// @match       https://www.marapets.com/giveaways.php
// @match       https://www.marapets.com/nuttytree.php
// @match       https://www.marapets.com/wormdigging.php
// @match       https://www.marapets.com/plushies.php
// @match       https://www.marapets.com/gumball.php
// @match       https://www.marapets.com/jackpot.php
// @match       https://www.marapets.com/sewage.php
// @match       https://www.marapets.com/graverobbing.php
// @match       https://www.marapets.com/graves.php
// @match       https://www.marapets.com/dash.php
// @match       https://www.marapets.com/pancakes.php
// @match       https://www.marapets.com/doubleornothing.php
// @match       https://www.marapets.com/sevenheaven.php
// @match       https://www.marapets.com/cloudnine.php
// @match       https://www.marapets.com/jelly.php
// @match       https://www.marapets.com/multiplier.php
// @match       https://www.marapets.com/archeology.php
// @match       https://www.marapets.com/undyingfairy.php
// @match       https://www.marapets.com/tombola*
// @match       https://www.marapets.com/telescope.php
// @match       https://www.marapets.com/trash.php
// @match       https://www.marapets.com/sultan.php
// @match       https://www.marapets.com/genie.php
// @match       https://www.marapets.com/pixie.php
// @match       https://www.marapets.com/statue.php
// @match       https://www.marapets.com/rack.php
// @match       https://www.marapets.com/tree.php
// @match       https://www.marapets.com/deal.php
// @match       https://www.marapets.com/ants.php
// @match       https://www.marapets.com/trojan.php
// @match       https://www.marapets.com/pipes.php
// @match       https://www.marapets.com/plushies2.php
// @match       https://www.marapets.com/scratchcards2.php
// @match       https://www.marapets.com/bingo.php
// @match       https://www.marapets.com/vending.php
// @match       https://www.marapets.com/fishing.php
// @grant       GM_setValue
// @grant       GM_getValue
// @version     1.40
// @author      themagicteeth
// @description Automates lots of stuff
// @license     MIT
// ==/UserScript==

function chooseDefaultPet(gameUrl) {
  const defaultPet = document.querySelector(".defaultpet")
  if (defaultPet) {
    const defaultPetId = defaultPet.parentElement.href.split('pet_id=')[1]
    window.location.href = `${gameUrl}${defaultPetId}`
  }
}

// Simerian Statue
if (document.URL.includes("statue")) {
  const defaultPet = document.querySelector(".defaultpet")
  if (defaultPet) {
    const defaultPetId = defaultPet.parentElement.href.split('pet=')[1]
    window.location.href = `https://www.marapets.com/statue.php?do=throw&pet=${defaultPetId}`
  }
}


function clickButton(buttonValue) {
  const button = document.querySelector(`input[value='${buttonValue}']`)
  if (button) {
    button.click()
  }
}


// Sultan Loyalty
if (document.URL.includes("sultan")) {
  const button = document.querySelector("input[name='Submit']")
  if (button) {
    button.click()
  }
}


if (!document.querySelector("div.middleit.comebackbox")) {
  // Pixie Dice
  if (document.URL.includes("pixie")) { chooseDefaultPet("https://www.marapets.com/pixie.php?do=throw&pet_id=") }

  // Genie
  if (document.URL.includes("genie")) { chooseDefaultPet("https://www.marapets.com/genie.php?do=wish&pet_id=") }

  // Trash Heap
  if (document.URL.includes("trash")) { clickButton('Grab Trash') }

  // Telescope
  if (document.URL.includes("telescope")) { clickButton('Use for 2,000MP') }

  // Undying Fairy
  if (document.URL.includes("undyingfairy")) { clickButton('Spin Wheel') }

  // Jelly Castle
  // if (document.URL.includes("jelly")) { clickButton('Pay 300MP') } 

  // Sewage
  if (document.URL.includes("sewage")) { clickButton('Swim in the Sewage') }

  // Gumball Machine
  if (document.URL.includes("gumball")) { clickButton('Put in 150MP') }

  // Pot of Gold
  if (document.URL.includes("potofgold")) { clickButton('Grab Prize') }

  // Test Your Strength
  if (document.URL.includes("giganticfairy")) { clickButton('Test Your Strength') }

  // Sugar Stack
  if (document.URL.includes("sugarstack")) { clickButton('Play for 1,000MP') }

  // Plushie Machine
  if (document.URL.includes("plushies")) { clickButton('Move Down') }

  // Seven Heaven
  if (document.URL.includes("sevenheaven")) { clickButton('Roll Again') }

  // Clothing Rack
  if (document.URL.includes("rack")) { clickButton('Take Free Clothing') }

  // Grave Robbing
  if (document.URL.includes("graverobbing")) { clickButton('Rob a Grave') }

  // Archeology
  if (document.URL.includes("archeology")) { clickButton("Dig for Simerian Artifacts") }

  // Ant Hill
  if (document.URL.includes("ants.php")) { clickButton("Grab Prize") }

  // Scratchcards
  if (document.URL.includes("scratchcards2.php")) { clickButton("Buy Scratchcard") }

  // Vending Machine
  if (document.URL.includes("vending.php")) { clickButton("Use Vending Machine") }

  // Fishing
  if (document.URL.includes("fishing.php")) { clickButton("Go Fishing") }

  // Mummy Multiplier
  if (document.URL.includes("multiplier")) { pickRandom(".middleit.flex-table #eachitemdiv a") }

  // Jackpot Pyramid
  if (document.URL.includes("jackpot")) { pickRandom(".pyramid a") }

  // Worm Digging
  if (document.URL.includes("wormdigging")) { pickRandom(".wormbox.flex-middle.flex-grow input") }

  // Nutty Tree
  if (document.URL.includes("nuttytree")) { pickRandom(".middleit.flex-table .flex-buttons form input[type='submit']") }

  // Spooks
  if (document.URL.includes("spooks")) { pickRandom(".middleit.flex-table #eachitemdiv.itemwidth.fixborders a") }

  // Balloon Burst
  if (document.URL.includes("burst")) { pickRandom(".middleit.flex-table #eachitemdiv.itemwidth.fixborders a") }

  // Giveaways
  if (document.URL.includes("giveaways")) { pickRandom("#eachitemdiv a") }

  // Open Graves
  if (document.URL.includes("graves")) { pickRandom(".maralayoutmiddle .flex-table .middleit a") }

  // Christmas Tree
  if (document.URL.includes("tree")) { clickButton("Shake Tree") } // Shake for the Avatar
}

function pickRandom(selector) {
  const elements = document.querySelectorAll(selector)
  elements[Math.floor(Math.random() * elements.length)].click()
}

if (document.URL.includes("dash")) {
  clickButton('Play for 3,000MP')
  pickRandom('.middleit.flex-table #eachitemdiv.itemwidth.fixborders a')
}



if (document.URL.includes("pie")) {
  // Button to start the game
  clickButton('Play for 500MP')

  // The buttons are on the top and bottom of the page, so we just want the first set
  const throwPieButtons = Array.from(document.querySelectorAll('.maralayoutmiddle .middleit.flex-table .flex-buttons form input')).slice(0, 6)
  if (throwPieButtons.length > 0) { throwPieButtons[Math.floor(Math.random() * throwPieButtons.length)].click() }
}


/* *
 * Games that require a delay
 * */

// All Tombolas
if (document.URL.includes("tombola")) {
  const takeTicket = document.getElementById("playTombola") // Take ticket button
  // If we can take a ticket, take one
  // We delay a couple seconds, otherwise it does not work
  if (takeTicket) {
    setTimeout(function () {
      takeTicket.click()
    }, 2000);
  }
}

// Double or Nothing
if (document.URL.includes("doubleornothing")) {
  // Array of all the two coins
  const coins = document.querySelectorAll("input[name='submit']")
  // Only if we have coins to click
  if (coins.length !== 0) {
    // Click a random coin, every two seconds (it bugs out otherwise)
    setTimeout(function () {
      coins[Math.floor(Math.random() * coins.length)].click()
    }, 1200);
  }
}

if (document.URL.includes("lottery.php")) {
  const tickets = parseInt(document.querySelector(".bigger.middleit.alsotry b").innerText)
  if (tickets < 250) {
    setTimeout(function () {
      document.querySelector("input[value='Buy 50 Lucky Dips']").click()
    }, 200);
  }
}

if (document.URL.includes("raffle.php")) {
  const tickets = parseInt(document.querySelectorAll(".bigger.middleit b")[1].innerText)
  if (tickets < 100) {
    setTimeout(function () {
      document.querySelector("input[value='Buy 10 Raffle Tickets']").click()
    }, 200);
  }
}



// Guess the Weight
if (document.URL.includes("guesstheweight")) {
  const weightInput = document.querySelector("input[name='weight'") // The weight input box
  if (weightInput) {
    weightInput.value = Math.floor(Math.random() * 100) // Random between 1 and 100
    document.querySelector("input[value='Guess the Weight']").click()
  }
}


// Pancake Pile
if (document.URL.includes("pancakes")) {
  if (!document.querySelector("div.middleit.comebackbox")) {
    // Pay to play button
    const startGame = document.querySelector("input[value='Play for 400MP']")

    // If we can play click the button
    if (startGame) {
      startGame.click()
    }

    // If we don't have the button, play
    else {
      const pancakes = Array.from(document.querySelectorAll(".pancakes_each a")) // Array of pancakes
      // If we have pancakes to click, click them
      if (pancakes.length === 6) {
        const firstClick = pancakes[Math.floor(Math.random() * pancakes.length)]
        GM_setValue("clickedPancake", firstClick.href.split("id=").pop())
        firstClick.click()
      }

      if (pancakes.length < 6) {
        const clickedPancake = GM_getValue("clickedPancake")
        let options = []

        if (clickedPancake === "0") { options = [pancakes[0], pancakes[2], pancakes[4], pancakes[5]] }
        else if (clickedPancake === "1") { options = [pancakes[0], pancakes[3], pancakes[4], pancakes[5]] }
        else if (clickedPancake === "2") { options = [pancakes[0], pancakes[3], pancakes[4]] }
        else if (clickedPancake === "3") { options = [pancakes[1], pancakes[2], pancakes[5]] }
        else if (clickedPancake === "4") { options = [pancakes[0], pancakes[2], pancakes[5]] }
        else { options = [pancakes[0], pancakes[1], pancakes[3], pancakes[4]] }

        GM_setValue("clickedPancake", null)

        options[Math.floor(Math.random() * options.length)].click()
      }
    }
  }
}

// Cloud Nine
if (document.URL.includes("cloudnine")) {
  // Make sure "Come back later" box isn't showing
  if (!document.querySelector("div.middleit.comebackbox")) {
    const whiteClouds = document.querySelectorAll("img[src='https://images.marapets.com/clouds/cloud.png'")
    const stormClouds = document.querySelectorAll("img[src='https://images.marapets.com/clouds/storm.png']")

    // We can only click 3 clouds, so click random ones until 6 are left
    if (whiteClouds.length > 6) {
      whiteClouds[Math.floor(Math.random() * whiteClouds.length)].click()
    }

    // Click a random storm cloud when they show up
    if (stormClouds.length !== 0) {
      stormClouds[Math.floor(Math.random() * stormClouds.length)].click()
    }
  }
}

if (document.URL.includes("trojan.php")) {
  if (!document.querySelector("div.middleit.comebackbox")) {
    const input = document.querySelector("input[name='country']")
    let country = document.querySelector("form .middleit img").getAttribute("src").split("_")[1].split(".")[0]

    // Check for countries which don't match the image name
    if (country === "Bosnia") { country = "Bosnia and Herzegovina" }
    if (country === "Trinidad") { country = "Trinidad and Tobago" }
    if (country === "UK") { country = "United Kingdom" }
    if (country === "UAE") { country = "United Arab Emirates" }

    input.value = country
    clickButton("Guess the Flag")
  }
}

// Pipe Dream
if (document.URL.includes("pipes.php")) {
  if (!document.querySelector(".middleit.comebackbox")) {
    // Start the game
    const playButton = document.querySelector("input[value='Play Pipe Dream']")
    if (playButton) { playButton.click() }

    // Roll the dice (every turn)
    const rollDice = document.querySelector("input[value='Roll Dice']")
    if (rollDice) { rollDice.click() }

    // Get the pipes that can be closed
    const canBlock = document.querySelector(".maralayoutmiddle .middleit .bigger.middleit").innerText.match(/\d/g)

    if (canBlock.includes("9")) { document.querySelector("a[href='pipes.php?pipe=9']").click() } // 4 possible
    else if (canBlock.includes("8")) { document.querySelector("a[href='pipes.php?pipe=8']").click() } // 5 possible
    else if (canBlock.includes("7")) { document.querySelector("a[href='pipes.php?pipe=7']").click() } // 6 possible
    else if (canBlock.includes("1")) { document.querySelector("a[href='pipes.php?pipe=1']").click() } // 14 possible
    else if (canBlock.includes("2")) { document.querySelector("a[href='pipes.php?pipe=2']").click() } // 15 possible
    else if (canBlock.includes("3")) { document.querySelector("a[href='pipes.php?pipe=3']").click() } // 16 possible
    else if (canBlock.includes("4")) { document.querySelector("a[href='pipes.php?pipe=4']").click() } // 17 possible
    else if (canBlock.includes("5")) { document.querySelector("a[href='pipes.php?pipe=5']").click() } // 18 possible
    else { document.querySelector("a[href='pipes.php?pipe=6']").click() } // 19 possible
  }
}
