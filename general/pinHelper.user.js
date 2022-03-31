// ==UserScript==
// @name        PIN Helper
// @namespace   Marascripts
// @match       https://www.marapets.com/atm.php
// @grant       none
// @version     1.0
// @author      themagicteeh
// @description Fills in your pin.
// @license     MIT
// ==/UserScript==

/* *
 * Put your PIN here.
 * */
const MY_PIN = "0000"


const DEPOSIT = document.querySelector("form[action='https://www.marapets.com/atm.php?do=deposit'] input[name='pin']")
const WITHDRAW = document.querySelector("form[action='https://www.marapets.com/atm.php?do=withdraw'] input[name='pin']")

DEPOSIT.value = MY_PIN
WITHDRAW.value = MY_PIN
