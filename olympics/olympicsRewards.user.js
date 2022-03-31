// ==UserScript==
// @name        Olympics Reward Helper
// @namespace   Marascripts
// @match       https://www.marapets.com/competitions.php
// @grant       none
// @version     1.0
// @author      themagicteeth
// @license     MIT
// @description Adds a background color related to the currency rewarded to Olympic events.
// ==/UserScript==

/* *
 * Within each function a color is set as the background for each events reward.
 * You may change the color to whatever you wish.
 * */


// Style each event type with the chosen color, based on its index in the event grid.
// Sets the background of the "element" (Number between 1 and 30), to the "color" (hex value passed to the function).
// Also adds a border and border radius to the image, for looks.
function styleEvent(element, color) {
  const event = `div.eachpet_box:nth-child(${element})`
  document.querySelector(event).style.backgroundColor = color
  document.querySelector(`${event} img`).style.borderRadius = "8px"
  document.querySelector(`${event} img`).style.border = "solid thin black"
}

// Events which award Olympic Points
function olypmicPointsReward() {
  const olympicPoints = "#ffee38"
  styleEvent(1, olympicPoints)  // Archery
  styleEvent(8, olympicPoints)  // Cycling
  styleEvent(15, olympicPoints) // Hockey
  styleEvent(22, olympicPoints) // Skateboarding
  styleEvent(29, olympicPoints) // Weightlifting
}

// Events which reward Marapoints
function marapointsReward() {
  const marapoints = "#f7ca77"
  styleEvent(2, marapoints)  // Athletics
  styleEvent(9, marapoints)  // Equestrian
  styleEvent(16, marapoints) // Hurdles
  styleEvent(23, marapoints) // Surfing
  styleEvent(30, marapoints) // Wrestling
}

// Events which reward RP
function rpRewards() {
  const rp = "#95ce66"
  styleEvent(4, rp)  // Baseball
  styleEvent(11, rp)  // Football
  styleEvent(18, rp) // Karate
  styleEvent(25, rp) // Taekwondo
}

// Events which reward BP
function bpRewards() {
  const bp = "#fea8a8"
  styleEvent(5, bp)  // Basketball
  styleEvent(12, bp)  // Golf
  styleEvent(19, bp) // Rowing
  styleEvent(26, bp) // Tennis
}

// Events which reward Dukka Coins
function dukkaRewards() {
  const dukka = "#bda17e"
  styleEvent(6, dukka)  // Boxing
  styleEvent(13, dukka)  // Gymnastics
  styleEvent(20, dukka) // Rugby
  styleEvent(27, dukka) // Triathlon
}

// Events which reward Fake Dukka Coins
function fakeDukkaRewards() {
  const fakeDukka = "#daa044"
  styleEvent(7, fakeDukka)  // Climbing
  styleEvent(14, fakeDukka)  // Handball
  styleEvent(21, fakeDukka) // Sailing
  styleEvent(28, fakeDukka) // Volleyball
}

// Events which reward AU
function auRewards() {
  const au = "#fea8a8"
  styleEvent(3, au)  // Badminton
  styleEvent(10, au)  // Fencing
  styleEvent(17, au) // Judo
  styleEvent(24, au) // Swimming
}

// Call all event style functions
function main() {
  olypmicPointsReward()
  marapointsReward()
  rpRewards()
  bpRewards()
  dukkaRewards()
  fakeDukkaRewards()
  auRewards()
}

main()
