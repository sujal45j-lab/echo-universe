function startUniverse() {
    const universe = document.querySelector(".universe");
    if (universe) {
        universe.scrollIntoView({ behavior: "smooth" });
    }
}

function showMessage(type) {
    const message = document.getElementById("message");
    if (!message) return;

    const messages = {
        Memories: "📸 Your memories will live here...",
        Dreams: "⭐ Your dreams are waiting to become missions...",
        Projects: "🚀 Your projects will appear here...",
        Achievements: "🏆 Your achievements will shine here..."
    };

    message.innerHTML = messages[type] || "";
}


/* =========================
   MISSIONS
========================= */

let missions = JSON.parse(
    localStorage.getItem("echoMissions")
) || [];

function saveMissions() {
    localStorage.setItem("echoMissions", JSON.stringify(missions));
}

function addDream() {
    const input = document.getElementById("dreamInput");
    if (!input) return;

    const dream = input.value.trim();

    if (dream === "") {
        alert("Please enter your dream!");
        return;
    }

    missions.push({
        name: dream,
        completed: false
    });

    saveMissions();
    input.value = "";

    displayMissions();
}

function displayMissions() {
    const list = document.getElementById("dreamList");
    if (!list) return;

    list.innerHTML = "";

    missions.forEach((mission, index) => {
        const div = document.createElement("div");

        div.className = "mission";

        div.innerHTML = `
            <h3>🚀 ${mission.name}</h3>

            <p>
                Mission Progress:
                ${mission.completed ? "100%" : "0%"}
            </p>

            <div class="progress">
                <div class="progress-bar"
                    style="width:${mission.completed ? "100%" : "0%"}">
                </div>
            </div>

            <button onclick="completeMission(${index})"
                ${mission.completed ? "disabled" : ""}>
                ${mission.completed ? "Completed ✅" : "Complete 🚀"}
            </button>

            <button onclick="deleteMission(${index})">
                Delete 🗑️
            </button>
        `;

        list.appendChild(div);
    });

    updateDashboard();
}

function completeMission(index) {
    if (!missions[index]) return;

    missions[index].completed = true;

    saveMissions();
    displayMissions();
}

function deleteMission(index) {
    missions.splice(index, 1);

    saveMissions();
    displayMissions();
}

function clearMissions() {
    if (confirm("सगळ्या Missions delete करायच्या आहेत का?")) {
        missions = [];

        localStorage.removeItem("echoMissions");

        displayMissions();

        alert("Missions cleared! 🗑️");
    }
}


/* =========================
   DASHBOARD
========================= */

function updateDashboard() {
    const completed = missions.filter(
        mission => mission.completed
    ).length;

    const energy = missions.length === 0
        ? 0
        : Math.round((completed / missions.length) * 100);

    const dashMissions =
        document.getElementById("dashMissions");

    const dashCompleted =
        document.getElementById("dashCompleted");

    const dashEnergy =
        document.getElementById("dashEnergy");

    const missionCount =
        document.getElementById("missionCount");

    const completedCount =
        document.getElementById("completedCount");

    const energyElement =
        document.getElementById("energy");

    if (dashMissions)
        dashMissions.innerText = missions.length;

    if (dashCompleted)
        dashCompleted.innerText = completed;

    if (dashEnergy)
        dashEnergy.innerText = energy + "%";

    if (missionCount)
        missionCount.innerText = missions.length;

    if (completedCount)
        completedCount.innerText = completed;

    if (energyElement)
        energyElement.innerText = energy + "%";
}


/* =========================
   MEMORIES
========================= */

let memories = JSON.parse(
    localStorage.getItem("echoMemories")
) || [];

function saveMemories() {
    localStorage.setItem(
        "echoMemories",
        JSON.stringify(memories)
    );
}

function addMemory() {
    const photo = document.getElementById("memoryPhoto");
    const text = document.getElementById("memoryText");

    if (!photo || !text) return;

    if (
        photo.files.length === 0 ||
        text.value.trim() === ""
    ) {
        alert("Photo आणि memory दोन्ही भरा!");
        return;
    }

    const file = photo.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        memories.push({
            photo: event.target.result,
            text: text.value.trim(),
            date: new Date().toLocaleString()
        });

        saveMemories();
        displayMemories();

        photo.value = "";
        text.value = "";
    };

    reader.readAsDataURL(file);
}

function displayMemories() {
    const list = document.getElementById("memoryList");

    if (!list) return;

    list.innerHTML = "";

    memories.forEach((memory, index) => {
        const card = document.createElement("div");

        card.className = "memory-card";

        card.innerHTML = `
            <img src="${memory.photo}" alt="Memory">

            <h3>✨ Memory</h3>

            <p>${memory.text}</p>

            <small>📅 ${memory.date}</small>

            <br><br>

            <button onclick="deleteMemory(${index})">
                Delete 🗑️
            </button>
        `;

        list.appendChild(card);
    });
}

function deleteMemory(index) {
    memories.splice(index, 1);

    saveMemories();
    displayMemories();
}

function clearMemories() {
    if (confirm("सगळ्या Memories delete करायच्या आहेत का?")) {
        memories = [];

        localStorage.removeItem("echoMemories");

        displayMemories();

        alert("Memories cleared! 🗑️");
    }
}


/* =========================
   NAME
========================= */

function saveName() {
    const input = document.getElementById("username");

    if (!input) return;

    const name = input.value.trim();

    if (name === "") {
        alert("नाव टाका!");
        return;
    }

    localStorage.setItem("echoUser", name);

    const title =
        document.querySelector(".dashboard h2");

    if (title) {
        title.innerText = "Welcome, " + name + " 👋";
    }

    alert("Name saved! 🚀");
}

function loadUser() {
    const savedName =
        localStorage.getItem("echoUser");

    const input =
        document.getElementById("username");

    const title =
        document.querySelector(".dashboard h2");

    if (savedName) {
        if (input) input.value = savedName;

        if (title) {
            title.innerText =
                "Welcome, " + savedName + " 👋";
        }
    }
}


/* =========================
   NAVIGATION
========================= */

function goToMissions() {
    const input =
        document.getElementById("dreamInput");

    if (input) {
        input.scrollIntoView({
            behavior: "smooth"
        });

        input.focus();
    }
}


/* =========================
   CLOCK
========================= */

function updateClock() {
    const clock =
        document.getElementById("clock");

    if (clock) {
        clock.innerText =
            new Date().toLocaleTimeString();
    }
}

setInterval(updateClock, 1000);
updateClock();


/* =========================
   DARK / LIGHT MODE
========================= */

function toggleTheme() {
    document.body.classList.toggle("light-mode");

    const button =
        document.getElementById("themeButton");

    if (button) {
        button.innerText =
            document.body.classList.contains("light-mode")
                ? "☀️ Light Mode"
                : "🌙 Dark Mode";
    }
}


/* =========================
   MUSIC BUTTON
========================= */

let musicOn = false;

function toggleMusic() {
    const button =
        document.getElementById("musicButton");

    musicOn = !musicOn;

    if (button) {
        button.innerText =
            musicOn
                ? "🔊 Music ON"
                : "🔇 Music OFF";
    }
}


/* =========================
   GALAXY MISSION GAME
========================= */

let gameScore = 0;
let gameTime = 30;
let gameTimer;
let gameRunning = false;

let bestScore =
    Number(localStorage.getItem("echoBestScore")) || 0;

const startGameButton =
    document.getElementById("startGame");

const gameArea =
    document.getElementById("gameArea");

const gameScoreElement =
    document.getElementById("gameScore");

const gameTimeElement =
    document.getElementById("gameTime");

const highScoreElement =
    document.getElementById("highScore");

if (highScoreElement) {
    highScoreElement.innerText = bestScore;
}

if (startGameButton) {
    startGameButton.addEventListener(
        "click",
        startGalaxyGame
    );
}

function startGalaxyGame() {
    if (gameRunning) return;

    gameRunning = true;
    gameScore = 0;
    gameTime = 30;

    gameScoreElement.innerText = gameScore;
    gameTimeElement.innerText = gameTime;

    startGameButton.style.display = "none";

    spawnStar();

    gameTimer = setInterval(function() {
        gameTime--;

        gameTimeElement.innerText = gameTime;

        if (gameTime <= 0) {
            endGalaxyGame();
        }
    }, 1000);
}

function spawnStar() {
    if (!gameRunning) return;

    const oldStar =
        document.querySelector(".star-target");

    if (oldStar) oldStar.remove();

    const star =
        document.createElement("div");

    star.className = "star-target";
    star.innerText = "⭐";

    const maxX =
        gameArea.clientWidth - 45;

    const maxY =
        gameArea.clientHeight - 45;

    star.style.left =
        Math.random() * maxX + "px";

    star.style.top =
        Math.random() * maxY + "px";

    star.addEventListener("click", function() {
        gameScore++;

        gameScoreElement.innerText =
            gameScore;

        star.remove();

        spawnStar();
    });

    gameArea.appendChild(star);
}

function endGalaxyGame() {
    gameRunning = false;

    clearInterval(gameTimer);

    const star =
        document.querySelector(".star-target");

    if (star) star.remove();

    if (gameScore > bestScore) {
        bestScore = gameScore;

        localStorage.setItem(
            "echoBestScore",
            bestScore
        );

        if (highScoreElement) {
            highScoreElement.innerText =
                bestScore;
        }

        alert(
            "🏆 NEW RECORD!\n\n⭐ Your Score: " +
            gameScore
        );

    } else {

        alert(
            "🌌 Mission Complete!\n\n" +
            "⭐ Your Score: " +
            gameScore +
            "\n🏆 Best Score: " +
            bestScore
        );
    }

    startGameButton.style.display =
        "inline-block";

    startGameButton.innerText =
        "🚀 Play Again";
}


/* =========================
   INTERACTIVE PLANETS
========================= */

document.addEventListener(
    "mousemove",
    function(event) {

        const planets =
            document.querySelectorAll(".planet");

        const x =
            (window.innerWidth / 2 -
                event.clientX) / 40;

        const y =
            (window.innerHeight / 2 -
                event.clientY) / 40;

        planets.forEach(function(planet, index) {

            const move =
                (index + 1) * 2;

            planet.style.transform =
                `translate(${x / move}px, ${y / move}px)`;
        });
    }
);


/* =========================
   PAGE LOAD
========================= */

displayMissions();
displayMemories();
updateDashboard();
loadUser();