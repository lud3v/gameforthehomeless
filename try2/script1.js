document.addEventListener("DOMContentLoaded", function() {
const dataBox = document.getElementById("data");
const moneyAmount = document.getElementById("moneyAmount");

// const's for upgrades
const clothingUpgrade = document.getElementById("clothingBox");
const ticketUpgrade = document.getElementById("busTicket");

// const's for locations
const locationUpgrade = document.getElementById("locations");


// const's for Beg Button
const activeBeg = document.getElementById("begBtn");
const status = document.getElementById("status");

// const's for shop
const shopContainer = document.getElementById("shopContainer");

const shopWater = document.getElementById("water");
const shopBeer = document.getElementById("beer");
const shopWhisky = document.getElementById("whisky");

const shopBread = document.getElementById("bread");

const money = {
    money: 0,
    beggedMoney: 0,
};

const data = {
    days: 1,
    health: 100,
    recentlyBegged: 0,
    recentlyEarned: 0,
    maxBeggedMoney: 0,
    multipliers: 1,
};

const clothing = {
    cost: 30,
    multiplier: 1.05,
    costIncrease: 1.25,
};

const busTicket = {
    cost: 200,
    hasTicket: false
};

const shop = {
    water: {
        cost: 1,
        heal: 1,
    },
    beer: {
        cost: 5,
        damage: 4,
        multiplier: 1.01,
    },
    whisky: {
        cost: 30,
        damage: 10,
        multiplier: 1.15,
    },
    bread: {
        cost: 10,
        heal: 5,
    },
}

const locations = {
    park: true,
    shop: false,
    home: false,
    hood: false,
};

function updateMoney() {
    moneyAmount.textContent = `Money: ${money.money.toFixed(2)}`;
}

function datadisplay() {
    dataBox.innerHTML = `
        <p>Days: ${data.days}</p>
        <p>Health: ${data.health}%</p>
        <p>Passive Income: €${data.recentlyEarned.toFixed(2)}</p>
        <p>Recently Earned: €${data.recentlyBegged.toFixed(2)}</p>
        <p>Highest: €${data.maxBeggedMoney.toFixed(2)}</p>
        <p>Multiplier: x ${data.multipliers.toFixed(2)}</p>
    `;
}


function showUpgrades() {
    // clothing upgrade
    if (money.money >= 0.75 * clothing.cost){
        if (!document.getElementById("clothingBtn")) {
            showClothing();
        }
        clothingUpgrade.style.display = "block";
    } else {
        clothingUpgrade.style.display = "none";
    }

    // ticket upgrade
    if (money.money >= 0.75 * busTicket.cost && busTicket.hasTicket == false){
        if (!document.getElementById("busBtn")) {
            showBusTicket();
        }
        ticketUpgrade.style.display = "block";
    } else if (busTicket.hasTicket == true) {
        ticketUpgrade.style.display = "none";
    } else {
        ticketUpgrade.style.display = "none";
    }

    // location upgrade
    if (busTicket.hasTicket == true){
        locationUpgrade.style.display = "block";
        locationBtn();
    } else {
        locationUpgrade.style.display = "none";
    }
}


function region() {
    if (locations.park == true) {
        activeBeg.disabled = false;
        shopContainer.style.display = "none";

        
    } else if (locations.shop == true) {
        activeBeg.disabled = true;
        status.textContent = "You can't beg here"

        shopContainer.style.display = "block";


    } else if (locations.home == true) {
        activeBeg.disabled = true;
        status.textContent = "You can't beg here"

        shopContainer.style.display = "none";


        // TODO: add sleep here (improves health by 5 or 10 %)

    } else if (locations.hood == true) {
        activeBeg.disabled = true;
        status.textContent = "You can't beg here"

        shopContainer.style.display = "none";


        // don't know why tf i added this, maybe rob someone or
        // get killed idk
    }
}


function buyClothes() {
    if (money.money >= clothing.cost) {
        money.money -= clothing.cost;

        data.multipliers *= clothing.multiplier;

        clothing.cost *= clothing.costIncrease;

        updateMoney();

        const clothingText = document.querySelector("#clothingBtn p");
        if (clothingText) {
            clothingText.textContent = `Buy Clothes: €${clothing.cost.toFixed(2)}`;
        }
    }
}


function showClothing() {
    const clothingContainer = document.createElement("div");
    clothingContainer.id = "clothingBtn"
  
    const clothingText = document.createElement("p");
    clothingText.textContent = `Buy Clothes: €${clothing.cost.toFixed(2)}`;

    const clothingInfo = document.createElement("p");
    clothingInfo.textContent = "Increases multiplier by x0.05";
    clothingInfo.className = "infoTxt";

    const clothingButton = document.createElement("button");
    clothingButton.textContent = "Buy";
    clothingButton.addEventListener("click", buyClothes);

    clothingContainer.appendChild(clothingText);
    clothingContainer.appendChild(clothingInfo);
    clothingContainer.appendChild(clothingButton);

    clothingUpgrade.appendChild(clothingContainer);
}

// oh lord, this will be hella unoptimized but lets do it anyways.
// shop functions.
function buyWater() {
    if (money.money >= shop.water.cost){
        money.money -= shop.water.cost;
        updateMoney();
    }
}
shopWater.addEventListener("click", buyWater);

function buyBeer() {
    if (money.money >= shop.beer.cost){
        money.money -= shop.beer.cost;
        data.health -= shop.beer.damage;
        
        data.multipliers *= shop.beer.multiplier;

        updateMoney();
        datadisplay();
    }
}
shopBeer.addEventListener("click", buyBeer)

function buyWhisky() {
    if (money.money >= shop.whisky.cost){
        money.money -= shop.whisky.cost;
        data.health -= shop.whisky.damage;
        
        data.multipliers *= shop.whisky.multiplier;

        updateMoney();
        datadisplay();
    }
}
shopWhisky.addEventListener("click", buyWhisky)

function buyBread() {
    if (money.money >= shop.bread.cost) {

        money.money -= shop.bread.cost;

        if (data.health < 100) {
            data.health += shop.bread.heal;
            if (data.health > 100) {
                data.health = 100;
            }
        }

        updateMoney();
        datadisplay();
    }
}
shopBread.addEventListener("click", buyBread);

function buyBusTicket () {
    if (money.money >= busTicket.cost && busTicket.hasTicket == false){
        money.money -= busTicket.cost;
        busTicket.hasTicket = true;
        updateMoney();
    } 
}

function showBusTicket() {
    const ticketContainer = document.createElement("div");
    ticketContainer.id = "busBtn";

    const ticketprice = document.createElement("p");
    ticketprice.textContent = `Buy Bus Ticket: €${busTicket.cost}`;

    const ticketInfo = document.createElement("p");
    ticketInfo.textContent = "Unlocks travel";
    ticketInfo.className = "infoTxt";

    const ticketButton = document.createElement("button");
    ticketButton.textContent = "Buy";
    ticketButton.addEventListener("click", buyBusTicket);

    ticketContainer.appendChild(ticketprice);
    ticketContainer.appendChild(ticketInfo);
    ticketContainer.appendChild(ticketButton);

    ticketUpgrade.appendChild(ticketContainer);
}

function updateLocationState(activeLocation) {
    // reset to false
    for (const location in locations) {
        locations[location] = false;
    }

    locations[activeLocation] = true;

    console.log(locations);
}

function locationBtn() {
    // Select the location-head element where the message will appear
    const locationHead = document.getElementById("location-head");

    // Add event listeners to all location buttons
    const locationButtons = document.querySelectorAll(".location-btn");

    locationButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Get the location text from the button's span element
            const locationName = button.querySelector(".location-text").textContent.toLowerCase();

            // Update the location-head content
            locationHead.textContent = `You are at ${locationName.charAt(0).toUpperCase() + locationName.slice(1)}`;

            updateLocationState(locationName);
            region();
        });
    });
}



// generate Money lol
function begBtn () {
    if (locations.park != true) {
        status.textContent = "You can't beg here";
        return;
    }
    money.beggedMoney = parseFloat((Math.random() * 5 + 4)* data.multipliers.toFixed(2));
    money.money += money.beggedMoney;
    money.money = parseFloat(money.money.toFixed(2));
    data.recentlyBegged = money.beggedMoney;

    //timer
    clickCooldown = 10;
    timeleft = clickCooldown;

    activeBeg.disabled = true;
    status.textContent = `Wait ${timeleft} seconds.`;

    const timer = setInterval(() => {
        timeleft--;
        if (timeleft > 0) {
            status.textContent = `Wait ${timeleft} seconds.`;
            activeBeg.disabled = true;
        } else {
            clearInterval(timer);
            activeBeg.disabled = false;
            status.textContent = "ready to beg";
        }
    }, 1000);

    updateMoney();
    datadisplay();
    showUpgrades();
}
 activeBeg.addEventListener("click", begBtn);

// passive income generator every second, multiplied by multiplier
function progressFunc() {
    money.beggedMoney = parseFloat((Math.random() * 3 + 1)* data.multipliers.toFixed(2));
    money.money += money.beggedMoney;
    money.money = parseFloat(money.money.toFixed(2));
    data.recentlyEarned = money.beggedMoney;
    data.days += 1;

    updateMoney();
    datadisplay();
    showUpgrades();

    if (money.beggedMoney > data.maxBeggedMoney) {
        data.maxBeggedMoney = money.beggedMoney;
        updateMoney();
        datadisplay();
    } if (data.recentlyBegged > data.maxBeggedMoney) {
        data.maxBeggedMoney = data.recentlyBegged;
        updateMoney();
        datadisplay();
    }
}
setInterval(progressFunc, 2000);


updateMoney();
datadisplay();
});