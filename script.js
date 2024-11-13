// Variables for currency and upgrades
let currency = {
    money: 0,
    recentMoney: 0,
    beggedMoney: parseFloat((Math.random() * 2 + 1).toFixed(2)), // Generates a value between 1.00 and 3.00, rounded to 2 decimals
    maxBeggedMoney: 0, // Tracks the largest amount of begged money observed
    upgradeConditionClothes: 25,
    alkoholCost: 13,
    upgradeCostMulti: 1.25, 
};

let conditions = {
    upgradeConditionAlk: 10,
}

let clothEffects = {
    increase: 1,
};

let data = {
    days: 1,
    multipliers: 1,
}

const moneyCountDisplay = document.getElementById("moneyCounter");
const upgradeBox = document.getElementById("clothBox");
const alkoholBox = document.getElementById("alokohlBox")
const dataBox = document.getElementById("data");

// Function to update the money display
function updateMoneyCountDisplay() {
    moneyCountDisplay.textContent = `Money: €${currency.money.toFixed(2)}`; 
}

// Function to update the `#data` display with current and maximum begged money
function updateDataDisplay() {
    dataBox.innerHTML = `
        <p>Days: ${data.days}</p>
        <p>Recent: €${currency.recentMoney.toFixed(2)}</p>
        <p>Highest: €${currency.maxBeggedMoney.toFixed(2)}</p> 
        <p>Multiplier: x${data.multipliers.toFixed(2)}</p>
        `;
}

// Function to generate new begged money, check if it’s the largest, and update the display
function generateBeggedMoney() {
    currency.beggedMoney = parseFloat((Math.random() * 2 + 1).toFixed(2)) * clothEffects.increase; 

    // Update recent and max begged money
    currency.recentMoney = currency.beggedMoney;
    if (currency.beggedMoney > currency.maxBeggedMoney) {
        currency.maxBeggedMoney = currency.beggedMoney;
    }

    // Update the display
    updateDataDisplay(); 
}

// Function to show upgrades based on current money 
function showUpgrade() {
    // clothing
    if (currency.money >= currency.upgradeConditionClothes) {
        if (!document.getElementById("upgradeBtn")) {
            showClothUpgrades();
        }
        
        upgradeBox.style.display = "block";

    } else {
        upgradeBox.style.display = "none";
    }
    // alk
    if (currency.money >= conditions.upgradeConditionAlk){    
        if (!document.getElementById("alkoholBox")) {
            showalkoholUpgrades(); 
        }

        alkoholBox.style.display = "block";

    } else {
        alkoholBox.style.display = "none";
    }
}

function showalkoholUpgrades() {
    // alkohol upgrade
    const alkoholContainer = document.createElement("div");
    alkoholContainer.className = "alkoholButton";
    alkoholContainer.id = "alkoholBtn";

    const alkoholText = document.createElement("p");
    alkoholText.textContent = `Buy Alcohol: €${currency.alkoholCost.toFixed(2)}`;
    
    const alkInfo = document.createElement("p");
    alkInfo.textContent = "Boosts income by x0.20 for 1 minute";
    alkInfo.className = "infoTxt";

    const alkoholButton = document.createElement("button");
    alkoholButton.textContent = "Buy";
    alkoholButton.addEventListener("click", buyAlcohol);

    alkoholContainer.appendChild(alkoholText);
    alkoholContainer.appendChild(alkInfo);
    alkoholContainer.appendChild(alkoholButton);

    alkoholBox.appendChild(alkoholContainer);
}

// Create an upgrade button dynamically
function showClothUpgrades() {
    // cloth upgrade
    const upgradeContainer = document.createElement("div");
    upgradeContainer.className = "UpgradeButton";
    upgradeContainer.id = "upgradeBtn";

    const upgradeText = document.createElement("p");
    upgradeText.textContent = `Buy Clothes: €${currency.upgradeConditionClothes.toFixed(2)}`;

    const infoTxt = document.createElement("p");
    infoTxt.textContent = "Increases multiplier by x0.05";
    infoTxt.className = "infoTxt";

    const upgradeButton = document.createElement("button");
    upgradeButton.textContent = "Buy";
    upgradeButton.addEventListener("click", buy);

    upgradeContainer.appendChild(upgradeText);
    upgradeContainer.appendChild(infoTxt);
    upgradeContainer.appendChild(upgradeButton);

    // main div
    upgradeBox.appendChild(upgradeContainer);
}

function buy(){
    // cloth upgrades
    if (currency.money >= currency.upgradeConditionClothes) {
        currency.money -= currency.upgradeConditionClothes;
        currency.upgradeConditionClothes *= currency.upgradeCostMulti;

        clothEffects.increase *= 1.05;

        data.multipliers = clothEffects.increase; 

        currency.upgradeConditionClothes = parseFloat(currency.upgradeConditionClothes.toFixed(2));
        
        // After upgrade, update the money and display
        updateMoneyCountDisplay();
        updateUpgradeDisplay();
    }  
    // alkohol upgrades
    if (currency.money >= conditions.upgradeConditionAlk) {
        currency.money -= conditions.upgradeConditionAlk;
        // Apply alcohol effects (just an example)
        clothEffects.increase += 0.2; // Boost multiplier by 20%
    }
}

// Update upgrade display to show new costs after a purchase
function updateUpgradeDisplay() {
    const upgradeText = document.querySelector("#upgradeBtn p");
    if (upgradeText) {
        upgradeText.textContent = `Buy Clothes: €${currency.upgradeConditionClothes.toFixed(2)}`;
    }
    showUpgrade(); 
}

// Click event for manual money
document.getElementById("manualMoney").addEventListener("click", () => {
    currency.beggedMoney = parseFloat((Math.random() * 2 + 1).toFixed(2)) * 0.05;
    currency.money += currency.beggedMoney;
    currency.money = parseFloat(currency.money.toFixed(2)); 
    updateMoneyCountDisplay();
    showUpgrade();
    generateBeggedMoney(); 
});

// Passive income function
function passiveMoney() {
    currency.money += currency.beggedMoney;
    currency.money = parseFloat(currency.money.toFixed(2));

    // Update the recent and max money each second
    currency.recentMoney = currency.beggedMoney;
    data.days += 1;

    updateMoneyCountDisplay();
    showUpgrade();
    generateBeggedMoney(); 
}
setInterval(passiveMoney, 1000);

// Initialize the money and data displays
updateMoneyCountDisplay();
updateDataDisplay();
