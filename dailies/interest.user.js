// ==UserScript==
// @name        Interest Collector
// @namespace   Marascripts
// @match       https://www.marapets.com/bpbank.php
// @match       https://www.marapets.com/rpbank.php
// @match       https://www.marapets.com/bank.php
// @grant       none
// @version     1.0.1
// @author      themagicteeth
// @license     MIT
// @description Collects your interest at the banks.
// ==/UserScript==

if (document.URL.includes("bpbank.php")) {
    const collect = document.querySelector("form[action='bpbank.php'] input[type='submit']")
    if (collect) {
        collect.click()
    }
    window.location.href = "https://www.marapets.com/bpbank.php"
}

if (document.URL.includes("rpbank.php")) {
    const collect = document.querySelector("form[action='rpbank.php'] input[type='submit']")
    if (collect) {
        collect.click()
    }
    window.location.href = "https://www.marapets.com/rpbank.php"
}

if (document.URL.includes("/bank.php")) {
    const collect = document.querySelector("form[action='bank.php'] input[type='submit']")
    if (collect) {
        collect.click()
    }
    window.location.href = "https://www.marapets.com/bank.php"
}
