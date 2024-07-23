document.addEventListener("DOMContentLoaded", function() {
    if ('vibrate' in navigator) {
        console.log("Vibrando...");
        navigator.vibrate([500, 200, 500]);
    } else {
        console.log("Vibração não suportada.");
    }
});
