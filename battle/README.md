# Marascripts - Battle

## Battle Helper - [Download](https://github.com/themagicteeth/marascripts/raw/main/battle/battleHelper.user.js)
Automates all battle actions.
* Attacks until a defined health level
* Heals when your health is lower than opponents last attack - 45

You can set the healing threshold my changing the number in this function:

```javascript
if (opponentsAttack >= currentHealth - 45) { heal() }
```

**KNOWN ISSUES**
> Does not always complete quest automatically
> Will not stop battling until you turn it off
