// ==UserScript==
// @name        Default Pet Picker
// @description Automates picking your default pet for dailies.
// @version     1.1.0
// @author      themagicteeth
// @grant       none
// @match       https://www.marapets.com/guillotine.php
// @match       https://www.marapets.com/pond.php?i_id=*
// @match       https://www.marapets.com/sewerpipes.php
// @match       https://www.marapets.com/icecaves.php
// @match       https://www.marapets.com/reservoir.php
// @match       https://www.marapets.com/whirlpool.php
// @match       https://www.marapets.com/genie.php
// @match       https://www.marapets.com/pixie.php
// @match       https://www.marapets.com/statue.php
// @match       https://www.marapets.com/elekafountain.php
// @match       https://www.marapets.com/rollercoaster.php
// @match       https://www.marapets.com/portal.php
// ==/UserScript==

const defaultPetImg = document.querySelector(".defaultpet")
const defaultPet = defaultPetImg ? defaultPetImg.parentElement : ""

if (defaultPet) {
  defaultPet.onclick = null
  defaultPet.click()
}
