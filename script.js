
/* =====================================
   AIYSHA CINEMATIC LOVE STORY
   JAVASCRIPT ENGINE
===================================== */


/* 1. PERSONAL SETTINGS */

// Change the name from here only.

const CONFIG = {
    personName: "AIYSHA"
};


/* 2. ELEMENTS */

const scenes = document.querySelectorAll(".scene");

const starsContainer = document.getElementById("stars");

const particlesContainer =
    document.getElementById("particles");

const answerArea = document.getElementById("answerArea");

const noBtn = document.getElementById("noBtn");


/* 3. AUTOMATIC NAME UPDATE */

document.querySelectorAll(".person-name").forEach(element => {

    element.textContent = CONFIG.personName;

});

document.querySelectorAll(".final-name").forEach(element => {

    element.textContent = CONFIG.personName + " ❤️";

});

document.title = "A Story For " + CONFIG.personName + " ❤️";


/* 4. SCENE NAVIGATION */

function showScene(sceneNumber) {

    // Remove active class from every scene

    scenes.forEach(scene => {

        scene.classList.remove("active");

        scene.setAttribute("aria-hidden", "true");

    });


    // Activate selected scene

    const selectedScene =
        document.getElementById("scene" + sceneNumber);

    if (!selectedScene) return;

    selectedScene.classList.add("active");

    selectedScene.setAttribute("aria-hidden", "false");

}


/* 5. BUTTON EVENTS */

document.getElementById("startBtn").addEventListener("click", () => {

    showScene(2);

});


document.getElementById("nextBtn").addEventListener("click", () => {

    showScene(3);

});


document.getElementById("questionBtn").addEventListener("click", () => {

    resetNoButton();

    showScene(4);

});


/* 6. NO BUTTON ESCAPE SYSTEM */

function moveNoButton() {
    if (!document.getElementById("scene4").classList.contains("active")) {
        return;
    }

    const areaRect = answerArea.getBoundingClientRect();
    const buttonRect = noBtn.getBoundingClientRect();

    const yesBtn = document.getElementById("yesBtn");
    const yesRect = yesBtn.getBoundingClientRect();

    // Full movement area
    const maxX = Math.max(0, areaRect.width - buttonRect.width);
    const maxY = Math.max(0, areaRect.height - buttonRect.height);

    let randomX;
    let randomY;
    let safePosition = false;

    // Try 100 different positions
    for (let attempt = 0; attempt < 100; attempt++) {

        randomX = Math.random() * maxX;
        randomY = Math.random() * maxY;

        const noLeft = areaRect.left + randomX;
        const noTop = areaRect.top + randomY;

        const noRight = noLeft + buttonRect.width;
        const noBottom = noTop + buttonRect.height;

        // Keep distance from YES button
        const overlap =
            noLeft < yesRect.right + 20 &&
            noRight > yesRect.left - 20 &&
            noTop < yesRect.bottom + 20 &&
            noBottom > yesRect.top - 20;

        if (!overlap) {
            safePosition = true;
            break;
        }
    }

    if (safePosition) {

        noBtn.style.position = "fixed";

        noBtn.style.left = randomX + areaRect.left + "px";
        noBtn.style.top = randomY + areaRect.top + "px";

        noBtn.style.right = "auto";
        noBtn.style.bottom = "auto";

    }

}




// Desktop: Move when mouse approaches

noBtn.addEventListener("pointerenter", (event) => {

    if (event.pointerType === "mouse") {

        moveNoButton();

    }

});


// Mobile: Move when finger touches

noBtn.addEventListener("pointerdown", (event) => {

    if (event.pointerType === "touch") {

        event.preventDefault();

        moveNoButton();

    }

});


// Keyboard focus: also escape

noBtn.addEventListener("focus", () => {

    moveNoButton();

});


// If click somehow happens, do not accept NO

noBtn.addEventListener("click", (event) => {

    event.preventDefault();

    moveNoButton();

});


// Reset button when question opens

function resetNoButton() {

    noBtn.style.left = "";

    noBtn.style.top = "";

    noBtn.style.right = "";

}


/* 7. YES BUTTON */

document.getElementById("yesBtn").addEventListener("click", () => {

    showScene(5);

    createRosePetals();

    createLoveCelebration();

});


/* 8. REPLAY MOVIE */

document.getElementById("replayBtn").addEventListener("click", () => {

    // Remove old celebration effects

    particlesContainer.innerHTML = "";

    // Reset NO button

    resetNoButton();

    // Return to opening scene

    showScene(1);

});


/* 9. CREATE STARS */

function createStars() {

    const totalStars = 110;

    for (let i = 0; i < totalStars; i++) {

        const star = document.createElement("span");

        star.className = "star";

        const size = Math.random() * 2.5 + 1;

        star.style.width = size + "px";

        star.style.height = size + "px";

        star.style.left = Math.random() * 100 + "%";

        star.style.top = Math.random() * 100 + "%";

        star.style.animationDelay =
            Math.random() * 4 + "s";

        star.style.animationDuration =
            (2 + Math.random() * 3) + "s";

        starsContainer.appendChild(star);

    }

}


/* 10. CREATE FALLING PETALS */

function createRosePetals() {

    particlesContainer.innerHTML = "";

    const flowers = ["🌹", "🌸", "🌺", "✨"];

    for (let i = 0; i < 35; i++) {

        const petal = document.createElement("span");

        petal.className = "particle";

        petal.textContent =
            flowers[Math.floor(Math.random() * flowers.length)];

        petal.style.left = Math.random() * 100 + "%";

        petal.style.fontSize =
            (15 + Math.random() * 18) + "px";

        petal.style.animationDuration =
            (5 + Math.random() * 6) + "s";

        petal.style.animationDelay =
            Math.random() * 3 + "s";

        particlesContainer.appendChild(petal);

        // Remove after animation

        setTimeout(() => {

            petal.remove();

        }, 12000);

    }

}


/* 11. LOVE CELEBRATION */

function createLoveCelebration() {

    const hearts = ["❤️", "💗", "💖", "💕", "💝", "✨"];

    for (let i = 0; i < 45; i++) {

        const heart = document.createElement("span");

        heart.className = "particle";

        heart.textContent =
            hearts[Math.floor(Math.random() * hearts.length)];

        heart.style.left = Math.random() * 100 + "%";

        heart.style.fontSize =
            (20 + Math.random() * 25) + "px";

        heart.style.animationDuration =
            (4 + Math.random() * 5) + "s";

        heart.style.animationDelay =
            Math.random() * 2 + "s";

        particlesContainer.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 10000);

    }

}


/* 12. START THE WEBSITE */

function initializeMovie() {

    createStars();

    // Hide inactive scenes from screen readers

    scenes.forEach((scene, index) => {

        scene.setAttribute(
            "aria-hidden",
            index === 0 ? "false" : "true"
        );

    });

}

initializeMovie();
