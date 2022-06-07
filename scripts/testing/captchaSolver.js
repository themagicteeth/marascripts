// ==UserScript==
// @name        New script 
// @namespace   Violentmonkey Scripts
// @require     https://unpkg.com/tesseract.js@v2.1.0/dist/tesseract.min.js
// @match       https://codes.marapets.com/*
// @match       https://www.marapets.com/shop.php
// @grant       none
// @version     1.0
// @author      -
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_openInTab
// @description 5/18/2022, 12:42:44 PM
// @run-at document-idle
// ==/UserScript==

Object.defineProperty
(
    HTMLImageElement.prototype,'toDataURL', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: function(m,q) {
        let c = document.createElement('canvas');
        c.width = this.naturalWidth;
        c.height = this.naturalHeight;
        c.getContext('2d').drawImage(this, 0, 0); 
        console.log(c)
        return c.toDataURL(m, q);
      }}
);

const base64 = (document.querySelector("img")).toDataURL()
console.log(base64)


var image = new Image();
image.onload = function() {
    var canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;

    var context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);

  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  let colorOccurrences = {}
  for (let y = 0; y < 70; y++) {  // rows
    for (let x = 0; x < 250; x++) { // columns
      /**
       * Each pixel is a set of 4 values:
       * Red, Green, Blue, Alpha (transparency)
       */
      let index = (250 * y + x) * 4;

      // create a string of the R-G-B color values
      let color = `${imageData.data[index]}-${imageData.data[index+1]}-${imageData.data[index+2]}`
      // we can ignore white since it will always be the background
      if(color !== "255-255-255"){
        // increase the count by 1 (or set it to 1 if the color wasn't there yet)
        colorOccurrences[color] = (colorOccurrences[color] || 0) + 1
      }
    }
  }
  
  // grab all of the colors in the pattern [R-G-B, # of occurrences]
let colors = Object.entries(colorOccurrences)
// find the color that occurred most
let highestColor = colors.reduce((highColor, currentColor) => {
  if(highColor[1] > currentColor[1]) {
    return highColor
  } else {
    return currentColor
  }
})
// grab
// grab just the R-G-B as an array, we don't need the number of occurrences
let highestColorRGB = highestColor[0].split('-')


for (let y = 0; y < 70; y++) {      // rows
  for (let x = 0; x < 250; x++) {   // columns
    let index = (250 * y + x) * 4;

    // grab the RGB values of the current pixel
    let RGB = [imageData.data[index], imageData.data[index+1], imageData.data[index+2]]

    // ignore white pixels so we don't alter the background
    if (RGB[0] === 255 && RGB[1] === 255 && RGB[2] === 255) continue

  /**
   * We need to be a little forgiving when checking the colors.
   * Sometimes individual pixels are only 1-3 points of R, G, or B away,
   * especially on the edges of the characters.
   */
  // find how far each pixel color channel is from the color of the characters
    let [red, green, blue] = [
      Math.abs(highestColorRGB[0] - RGB[0]),
      Math.abs(highestColorRGB[1] - RGB[1]),
      Math.abs(highestColorRGB[2] - RGB[2])
    ]

    // if any color channel is more than 3 points away
    if (red > 3 || green > 3 || blue > 3){
      // if any color channel is more than 3 points away
      if (red > 3 || green > 3 || blue > 3){
        // Grab the pixel that is one row up (y-1)
        let aboveIndex = (250*(y-1) + x) * 4

        // Paint our pixel to match the pixel above
        imageData.data[index] = imageData.data[aboveIndex];
        imageData.data[index + 1] = imageData.data[aboveIndex + 1];
        imageData.data[index + 2] = imageData.data[aboveIndex + 2];
      }
    }
  }
}
  drawImage(imageData)
console.log(imageData)
};
image.src = base64;

function drawImage(imageData) {
  var canvas = document.createElement('canvas');
  canvas.height = 70
  canvas.width = 250
  canvas.getContext('2d');
  canvas.putImageData(imageData)
  
}

// function main() {
//   const captchaImageUrl = document.querySelector("img[width='250']").src
//   const captchaImageTab = GM_openInTab(captchaImageUrl)
//   captchaImageTab()
  
//   if (document.URL === captchaImageUrl) {
//     const captcha = document.querySelector("img")
//     captcha.style.filter = "contrast(225)"
    
//     const worker = Tesseract.createWorker({
//       logger: m => console.log(m)
//     });
   
//     // (async () => {
//     //     await worker.load();
//     //     await worker.loadLanguage('eng');
//     //     await worker.initialize('eng');
//     //     console.log("Recognizing...");
//     //     const { data: { text } } = await worker.recognize(base64, {tessedit_char_whitelist: '0123456789'});
//     //     console.log("Recognized text:", text);
//     //     await worker.terminate();
//     // })();
//   }
// }

// main()


// const base64 = (document.querySelector("img"))
// base64.style.filter = "contrast(214.5)"
// //let imageBuffer = Buffer.from(base64, "base64");

// const worker = Tesseract.createWorker({
//     logger: m => console.log(m)
// });

// (async () => {
//     await worker.load();
//     await worker.loadLanguage('eng');
//     await worker.initialize('eng');
//     console.log("Recognizing...");
//     const { data: { text } } = await worker.recognize(base64, {tessedit_char_whitelist: '0123456789'});
//     console.log("Recognized text:", text);
//     await worker.terminate();
// })();
