let points = 0;
let multitapLevel = 1;
let multitapCost = 50;
let health = 1000;
let interval = setInterval(updateHealth, 1000);


// Load saved points, multitap level, and multitap cost from local storage
window.onload = function () {
    let savedPoints = localStorage.getItem("points");
    let savedHealth = localStorage.getItem("health");
    let savedHealthBar = localStorage.getItem("health");
    let savedMultitapLevel = localStorage.getItem("multitapLevel");
    let savedMultitapCost = localStorage.getItem("multitapCost");
    if (savedPoints) {
        points = parseInt(savedPoints);
        document.getElementById("points").innerText = points + " ENR";
    }
    if (savedHealth) {
        health = parseInt(savedHealth);
        document.getElementById("healthCount").innerText = health;
    }
    if (savedHealthBar) {
        health = parseInt(savedHealthBar);
        document.getElementById("healthBar").style.width = (health / 10) + "%";
    }
    if (savedMultitapLevel) {
        multitapLevel = parseInt(savedMultitapLevel);
        updateMultitapDisplay();
    }
    if (savedMultitapCost) {
        multitapCost = parseInt(savedMultitapCost);
        updateMultitapDisplay(); // Update the display immediately after loading the cost
    }
}


// UPDATE HEALTH

function updateHealth() {
    check();

    if (health >= 0 && health < 1000) {
        health += 0.5;
    }
    if (health <= 0) {
        health = 0;
    }

    document.getElementById("healthCount").innerText = health;
    document.getElementById("healthBar").style.width = (health / 10) + "%";
    saveGame();
}

//BLUR LOGO
function check() {
    if (health >= multitapLevel) {
        document.getElementById("cookie-img").style.filter = "blur(0Px)";
    } else {
        document.getElementById("cookie-img").style.filter = "blur(3Px)";
    }
}


// Function to handle cookie click
function clickCookie() {
    if (health >= multitapLevel) {
        points += multitapLevel; // Increment points based on multitap level
        document.getElementById("points").innerText = points + " ENR";
        health -= multitapLevel;
        saveGame(); // Save game after each click
    } else {
        return
    }

}

// Function to buy multitap upgrade
function buyMultitap() {
    if (points >= multitapCost) {
        points -= multitapCost;
        multitapLevel++;
        multitapCost = Math.ceil(multitapCost * 2); // Increase cost by 50%
        document.getElementById("points").innerText = points + " ENR";
        updateMultitapDisplay();
        saveGame(); // Save game after buying upgrade
    } else {
        alert("Not enough ENR Token to buy Multitap!");
    }
}

// Function to update multitap display
function updateMultitapDisplay() {
    document.getElementById("multitap").innerText = "Multitap: " + multitapLevel + " (Cost: " + multitapCost + " ENR)";
}

// Function to save game using local storage
function saveGame() {
    localStorage.setItem("points", points);
    localStorage.setItem("health", health);
    localStorage.setItem("multitapLevel", multitapLevel);
    localStorage.setItem("multitapCost", multitapCost);
    updateMultitapDisplay(); // Update the display after saving to ensure the correct cost is shown
}
