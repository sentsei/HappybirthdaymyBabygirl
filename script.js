const pages = document.querySelectorAll(".page");

function showPage(pageId) {
    pages.forEach(page => {
        page.classList.remove("active");
    });

    const selectedPage = document.getElementById(pageId);

    selectedPage.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function openGift() {
    const gift = document.getElementById("giftBox");
    const giftText = document.getElementById("giftText");
    const giftButton = document.getElementById("giftButton");

    if (gift.classList.contains("open")) {
        return;
    }

    gift.classList.add("open");

    giftText.textContent = "A birthday message made especially for you ♡";

    setTimeout(() => {
        giftButton.classList.remove("hidden");
    }, 900);
}


function getNextBirthday() {
    const now = new Date();

    let year = now.getFullYear();

    const birthday = new Date(year, 8, 12, 0, 0, 0);

    if (now > birthday) {
        year++;
    }

    return new Date(year, 8, 12, 0, 0, 0);
}


function updateCountdown() {
    const now = new Date();
    const birthday = getNextBirthday();

    const difference = birthday - now;

    if (difference <= 0) {
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );
    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );
    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}


updateCountdown();

setInterval(updateCountdown, 1000);


document.addEventListener("click", function(event) {

    if (event.target.classList.contains("heart-particle")) {
        event.target.remove();
    }

});


function createHeart() {
    const heart = document.createElement("div");

    heart.className = "heart-particle";
    heart.textContent = "♡";

    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-30px";
    heart.style.fontSize = (10 + Math.random() * 16) + "px";
    heart.style.color = "rgba(224, 157, 218, .6)";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "5";

    const duration = 5 + Math.random() * 5;

    heart.style.transition =
        `transform ${duration}s linear, opacity ${duration}s linear`;

    document.body.appendChild(heart);

    requestAnimationFrame(() => {
        heart.style.transform =
            `translateY(-${window.innerHeight + 100}px) rotate(${Math.random() * 60 - 30}deg)`;

        heart.style.opacity = "0";
    });

    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}


setInterval(createHeart, 900);
