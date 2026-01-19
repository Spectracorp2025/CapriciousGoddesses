// =========================
// PANTALLA DE BIENVENIDA
// =========================
const startBtn = document.getElementById("start-btn");
const welcomeScreen = document.getElementById("welcome-screen");
const content = document.getElementById("content");

startBtn.addEventListener("click", () => {
    welcomeScreen.style.display = "none";
    content.classList.remove("hidden");
});


//// =========================
// CONTROL DE VELOCIDAD
// =========================
const videos = document.querySelectorAll("video");
let velocidadActual = 1.0; // NORMAL por defecto

// Aplicar velocidad inicial
videos.forEach(video => {
    video.playbackRate = velocidadActual;
});

// Botones
const btnSlow = document.getElementById("speed-slow");
const btnNormal = document.getElementById("speed-normal");

btnSlow.addEventListener("click", () => {
    velocidadActual = 0.5;
    cambiarVelocidad();
    btnSlow.classList.add("active");
    btnNormal.classList.remove("active");
});

btnNormal.addEventListener("click", () => {
    velocidadActual = 1.0;
    cambiarVelocidad();
    btnNormal.classList.add("active");
    btnSlow.classList.remove("active");
});

function cambiarVelocidad() {
    videos.forEach(video => {
        video.playbackRate = velocidadActual;
    });
}

// =========================
// CONTROL DE FLUJO NARRATIVO
// =========================
videos.forEach(video => {

    // Al reproducir → centrar
    video.addEventListener("play", () => {
        video.playbackRate = velocidadActual; // asegura velocidad
        video.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });

    // Al terminar
    video.addEventListener("ended", () => {
        const nextId = video.dataset.next;
        if (!nextId) return;

        const nextElement = document.getElementById(nextId);
        if (!nextElement) return;

        // Texto
        if (
            nextElement.classList.contains("story-box") ||
            nextElement.classList.contains("choice-box")
        ) {
            nextElement.classList.add("highlight");
            nextElement.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }

        // Video
        if (nextElement.tagName === "VIDEO") {
            nextElement.classList.add("highlight");
            nextElement.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
            // El usuario da play (sin error de autoplay)
        }
    });
});