// ==UserScript==
// @name        PIN Helper
// @description Fills in your pin.
// @version     1.1.0
// @author      themagicteeh
// @grant       none
// @match       https://www.marapets.com/atm.php*
// ==/UserScript==

/* *
 * Put your PIN here.
 * */
const MY_PIN = "0000"

const DEPOSIT = document.querySelector(
  "form[action='https://www.marapets.com/atm.php?do=deposit'] input[name='pin']"
)

const WITHDRAW = document.querySelector(
  "form[action='https://www.marapets.com/atm.php?do=withdraw'] input[name='pin']"
)

// Set the value to your PIN
DEPOSIT.value = MY_PIN
WITHDRAW.value = MY_PIN
