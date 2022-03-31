# Marascripts - Shops

## Restock Highlighter - [Download](https://github.com/themagicteeth/marascripts/raw/main/shop/restockHighlighter.user.js)
Create a customizabale list of items to highlight in shops.

All blocks look like this:
```javascript
if (shopName === "Clothing Shop") {
  items = [
      "Item 1",
      "Item 2"
  ]
}
```
Simply add the item name into the array, and it will then add a red background to that item.


## Shop Pricer - [Download](https://github.com/themagicteeth/marascripts/raw/main/shop/shopPricer.user.js)
**REQUIRES THE GIFTBOX**
Click the shopkeeper image to autoprice all pages in your shop.
 * If the item has a red border (large price decrease) it will not reprice.
 