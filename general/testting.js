
// ==UserScript==
// @name        New script 
// @namespace   Violentmonkey Scripts
// @require     https://unpkg.com/tesseract.js@v2.1.0/dist/tesseract.min.js
// @require     https://unpkg.com/pngjs@6.0.0/lib/png.js
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

// Object.defineProperty
// (
//     HTMLImageElement.prototype,'toDataURL',
//     {enumerable:false,configurable:false,writable:false,value:function(m,q)
//     {
//         let c=document.createElement('canvas');
//         c.width=this.naturalWidth; c.height=this.naturalHeight;
//         c.getContext('2d').drawImage(this,0,0); return c.toDataURL(m,q);
//     }}
// );

//const base64 = (document.querySelector("img")).toDataURL()

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

const base64 = (document.querySelector("img"))
base64.style.filter = "contrast(214.5)"
//let imageBuffer = Buffer.from(base64, "base64");

const worker = Tesseract.createWorker({
    logger: m => console.log(m)
});

(async () => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    console.log("Recognizing...");
    const { data: { text } } = await worker.recognize(base64, {tessedit_char_whitelist: '0123456789'});
    console.log("Recognized text:", text);
    await worker.terminate();
})();
