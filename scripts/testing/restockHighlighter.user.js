// ==UserScript==
// @name        Restock Highlighter
// @namespace   Marascripts
// @match       https://www.marapets.com/shop.php?id=*
// @grant       none
// @version     1.0
// @author      themagicteeth
// @description Highlights wanted items in shops
// @license     MIT
// ==/UserScript==

const shopName = document.querySelector(".middleit.bigger .petpadding a b").innerText
let items = []

/* *
 * The below 'if' conditions are based on the shop name, where it says 'The [shop] curently has...'.
 * If you want to add a shop follow the same format of the ones here already:
 * 
 * ** 1. Make an if condition with the shops name (including "Shop")
 * ** 2. "items = []"
 * ** 3. Within the "[]" put the names of the items (just like mine)
 * 
 * */

// Clothing
if (shopName === "Clothing Shop") {
  items = []
}

// Footwear
if (shopName === "Footwear Shop") {
  items = []
}

// Candles
if (shopName === "Candles Shop") {
  items = []
}
// Batteries
if (shopName === "Batteries Shop") {
  items = []
}

// Bakery
if (shopName === "Bakery Shop") {
  items = []
}

// Books
if (shopName === "Books Shop") {
  items = []
}

// Meat
if (shopName === "Meat Shop") {
  items = []
}

// Vegetables
if (shopName === "Vegetables Shop") {
  items = []
}

// Flowers
if (shopName === "Flowers Shop") {
  items = []
}

// Fruit
if (shopName === "Fruits Shop") {
  items = []
}

// Coffee
if (shopName === "Coffee Shop") {
  items = []
}

// Candy
if (shopName === "Candy Shop") {
  items = []
}

// Halloween
if (shopName === "Halloween Treats Shop") {
  items = []
}

// Smoothies
if (shopName === "Smoothies Shop") {
  items = []
}

// Ice Cream
if (shopName === "Ice Cream Shop") {
  items = []
}

// Fast Food
if (shopName === "Fast Food Shop") {
  items = []
}

// Stamps
if (shopName === "Stamps Shop") {
  items = []
}

// CDs
if (shopName === "CDs Shop") {
  items = []
}

// Trading Cards
if (shopName === "Trading Cards Shop") {
  items = []
}

// Chocolate
if (shopName === "Chocolate Shop") {
  items = []
}


/* *
 * DO NOT CHANGE THIS PART!!!!!!!!
 * This runs on all shop pages, where the name matches the 'if' conditions above.
 * If the shop name matches the 'if' condition, it will run through the array of wanted items.
 * If a wanted item is found, it will add a red background to each item in your list. 
 * */
if (items.length > 0) {
  const stock = Array.from(document.querySelectorAll(".fixborders.flex-table3.middleit.itempadding .itempadding a span.bigger"))
  const buy = stock.filter(x => items.includes(x.innerHTML.split(" <")[0]));
  for (const element of buy) {
    const item = element.parentElement.parentElement.parentElement.parentElement
    item.style.background = "#f5c6ca"
    item.style.borderRadius = "8px"
  }
}
