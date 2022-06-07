// ==UserScript==
// @name        Simple Dailies Automator
// @description Automates simple games.
// @version     2.0.0
// @author      themagicteeth
// @grant       GM_setValue
// @grant       GM_getValue
// @match       https://www.marapets.com/multiplier.php*
// @match       https://www.marapets.com/jackpot.php*
// @match       https://www.marapets.com/wormdigging.php
// @match       https://www.marapets.com/nuttytree.php
// @match       https://www.marapets.com/burst.php*
// @match       https://www.marapets.com/spooks.php*
// @match       https://www.marapets.com/giveaways.php
// @match       https://www.marapets.com/graves.php
// @match       https://www.marapets.com/dash.php*
// @match       https://www.marapets.com/sewage.php
// @match       https://www.marapets.com/giganticfairy.php
// @match       https://www.marapets.com/sevenheaven.php*
// @match       https://www.marapets.com/undyingfairy.php
// @match       https://www.marapets.com/trash.php
// @match       https://www.marapets.com/ants.php
// @match       https://www.marapets.com/vending.php
// @match       https://www.marapets.com/rack.php
// @match       https://www.marapets.com/graverobbing.php
// @match       https://www.marapets.com/archeology.php
// @match       https://www.marapets.com/potofgold.php
// @match       https://www.marapets.com/plushies2.php
// @match       https://www.marapets.com/fishing.php
// @match       https://www.marapets.com/tree.php
// @match       https://www.marapets.com/sugarstack.php
// @match       https://www.marapets.com/telescope.php
// @match       https://www.marapets.com/gumball.php
// @match       https://www.marapets.com/plushies.php
// @match       https://www.marapets.com/scratchcards2.php
// @match       https://www.marapets.com/sultan.php
// @match       https://www.marapets.com/magazines.php
// @match       https://www.marapets.com/newsagent.php
// @match       https://www.marapets.com/sword.php
// @match       https://www.marapets.com/bpbank.php
// @match       https://www.marapets.com/rpbank.php
// @match       https://www.marapets.com/bank.php
// @match       https://www.marapets.com/tombola*
// @match       https://www.marapets.com/trojan.php
// @match       https://www.marapets.com/pipes.php*
// @match       https://www.marapets.com/guesstheweight.php
// @match       https://www.marapets.com/doubleornothing.php*
// @match       https://www.marapets.com/cloudnine.php*
// @match       https://www.marapets.com/pie.php*
// @match       https://www.marapets.com/pancakes.php*
// ==/UserScript==

function clickButton(buttonValue) {
  const button = [...document.querySelectorAll("input")].find((e) =>
    e.value.includes(buttonValue)
  )
  if (button) {
    button.click()
  }
}

function pickRandom(selector) {
  const elements = document.querySelectorAll(selector)
  if (elements) {
    elements[Math.floor(Math.random() * elements.length)].click()
  }
}

function pickRandomMap(game) {
  const games = {
    multiplier: ".middleit.flex-table #eachitemdiv a",
    jackpot: ".pyramid a",
    wormdigging: ".wormbox.flex-middle.flex-grow input",
    nuttytree: ".flex-buttons form input[type='submit']",
    burst: ".middleit.flex-table #eachitemdiv.itemwidth.fixborders a",
    spooks: ".middleit.flex-table #eachitemdiv.itemwidth.fixborders a",
    giveaways: "#eachitemdiv a",
    graves: ".maralayoutmiddle .flex-table .middleit a",
    dash: ".middleit.flex-table #eachitemdiv.itemwidth.fixborders a",
  }

  const selector = games[game]
  pickRandom(selector)
}

function clickButtonMap(game) {
  const games = {
    sewage: "Swim in the Sewage",
    giganticfairy: "Test Your Strength",
    sevenheaven: "Roll Again",
    undyingfairy: "Spin Wheel",
    trash: "Grab Trash",
    ants: "Grab Prize",
    vending: "Use Vending Machine",
    rack: "Take Free Clothing",
    graverobbing: "Rob a Grave",
    archeology: "Dig for Simerian Artifacts",
    potofgold: "Grab Prize",
    plushies2: "Move Down",
    fishing: "Go Fishing",
    tree: "Shake Tree",
    sugarstack: "Play for 1,000MP",
    telescope: "Use for 2,000MP",
    gumball: "Put in 150MP",
    plushies: "Move Down",
    scratchcards2: "Buy Scratchcard",
    sultan: "Tax",
    magazines: "Buy Magazine",
    newsagent: "Buy Newspaper",
    sword: "Lift Sword from the Stone",
    dash: "Play for 3,000MP",
    bank: "Interest",
    rpbank: "Interest",
    bpbank: "Interest",
  }

  const buttonText = games[game]
  clickButton(buttonText)
}

// Tombola must be outside of the main if loop
if (document.URL.includes("tombola")) {
  const takeTicket = document.getElementById("playTombola")
  if (takeTicket) {
    setTimeout(() => {
      takeTicket.click()
    }, 2000)
  }
}

if (!document.querySelector("div.middleit.comebackbox")) {
  const gameSlug = document.URL.split(".com/")[1].split(".php")[0]

  switch (gameSlug) {
    case "multiplier":
    case "jackpot":
    case "wormdigging":
    case "nuttytree":
    case "burst":
    case "spooks":
    case "giveaways":
    case "graves":
      pickRandomMap(gameSlug)
      break

    case "sewage":
    case "giganticfairy":
    case "sevenheaven":
    case "undyingfairy":
    case "trash":
    case "graverobbing":
    case "potofgold":
    case "plushies2":
    case "fishing":
    case "tree":
    case "sugarstack":
    case "gumball":
    case "plushies":
    case "scratchcards2":
    case "magazines":
    case "newsagent":
    case "sword":
    case "ants":
    case "vending":
    case "rack":
    case "archeology":
    case "telescope":
    case "sultan":
    case "bank":
    case "rpbank":
    case "bpbank":
      clickButtonMap(gameSlug)
      break

    case "dash":
      clickButtonMap(gameSlug)
      pickRandomMap(gameSlug)
      break

    case "pipes":
      pipeDream()
      break

    case "trojan":
      guessTheFlag()
      break

    case "guesstheweight":
      guessTheWeight()
      break

    case "doubleornothing":
      doubleOrnothing()
      break

    case "cloudnine":
      cloudNine()
      break

    case "pie":
      pieThrow()
      break

    case "pancakes":
      pancakePile()
      break
  }
}

function guessTheFlag() {
  const input = document.querySelector("input[name='country']")
  let country = document
    .querySelector("form .middleit img")
    .getAttribute("src")
    .split("_")[1]
    .split(".")[0]

  // Check for countries which don't match the image name
  if (country === "Bosnia") country = "Bosnia and Herzegovina"
  if (country === "Trinidad") country = "Trinidad and Tobago"
  if (country === "UK") country = "United Kingdom"
  if (country === "UAE") country = "United Arab Emirates"

  input.value = country
  clickButton("Guess the Flag")
}

function guessTheWeight() {
  const weightInput = document.querySelector("input[name='weight'")
  if (weightInput) {
    weightInput.value = Math.floor(Math.random() * 100)
    document.querySelector("input[value='Guess the Weight']").click()
  }
}

function doubleOrnothing() {
  const coins = document.querySelectorAll("input[name='submit']")
  if (coins.length !== 0) {
    setTimeout(() => {
      coins[Math.floor(Math.random() * coins.length)].click()
    }, 1200)
  }
}

function pipeDream() {
  clickButton("Play Pipe Dream")
  clickButton("Roll Dice")

  const clickPipe = (number) =>
    document.querySelector(`a[href='pipes.php?pipe=${number}']`).click()

  const canBlock = document
    .querySelector(".maralayoutmiddle .middleit .bigger.middleit")
    .innerText.match(/\d/g)

  if (canBlock.includes("9")) clickPipe(9)
  else if (canBlock.includes("8")) clickPipe(8)
  else if (canBlock.includes("7")) clickPipe(7)
  else if (canBlock.includes("1")) clickPipe(1)
  else if (canBlock.includes("2")) clickPipe(2)
  else if (canBlock.includes("3")) clickPipe(3)
  else if (canBlock.includes("4")) clickPipe(4)
  else if (canBlock.includes("5")) clickPipe(5)
  else clickPipe(6)
}

function cloudNine() {
  const clouds = "https://images.marapets.com/clouds"

  const whiteClouds = document.querySelectorAll(
    `img[src='${clouds}/cloud.png']`
  )
  const stormClouds = document.querySelectorAll(
    `img[src='${clouds}/storm.png']`
  )

  if (whiteClouds.length > 6) pickRandom(whiteClouds)
  if (stormClouds.length !== 0) pickRandom(stormClouds)
}

function pieThrow() {
  clickButton("Play for 500MP")

  const throwPieButtons = Array.from(
    document.querySelectorAll(
      ".maralayoutmiddle .middleit.flex-table .flex-buttons form input"
    )
  ).slice(0, 6)

  if (throwPieButtons.length > 0) {
    throwPieButtons[Math.floor(Math.random() * throwPieButtons.length)].click()
  }
}

function pancakePile() {
  clickButton("Play for 400MP")

  const pancakes = Array.from(document.querySelectorAll(".pancakes_each a")) // Array of pancakes

  if (pancakes.length === 6) {
    const firstClick = pancakes[Math.floor(Math.random() * pancakes.length)]
    GM_setValue("clickedPancake", firstClick.href.split("id=").pop())
    firstClick.click()
  }

  if (pancakes.length < 6) {
    const clickedPancake = GM_getValue("clickedPancake")
    let options = []

    if (clickedPancake === "0") {
      options = [pancakes[0], pancakes[2], pancakes[4], pancakes[5]]
    } else if (clickedPancake === "1") {
      options = [pancakes[0], pancakes[3], pancakes[4], pancakes[5]]
    } else if (clickedPancake === "2") {
      options = [pancakes[0], pancakes[3], pancakes[4]]
    } else if (clickedPancake === "3") {
      options = [pancakes[1], pancakes[2], pancakes[5]]
    } else if (clickedPancake === "4") {
      options = [pancakes[0], pancakes[2], pancakes[5]]
    } else {
      options = [pancakes[0], pancakes[1], pancakes[3], pancakes[4]]
    }

    GM_setValue("clickedPancake", null)

    options[Math.floor(Math.random() * options.length)].click()
  }
}
