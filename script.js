document.addEventListener("DOMContentLoaded", function() {
    function generateRandomNumber() {
        return Math.floor(Math.random() * 1000) + 1;
    }

    let randomNumber = localStorage.getItem('randomNumber');
    if (!randomNumber) {
        randomNumber = generateRandomNumber();
        localStorage.setItem('randomNumber', randomNumber);
    }

    document.getElementById("random-number").textContent = randomNumber;

    const countdownDuration = 30 * 1000; // 30 segundos
    let endTime = localStorage.getItem('endTime');

    if (!endTime) {
        endTime = Date.now() + countdownDuration;
        localStorage.setItem('endTime', endTime);
    }

    function updateCountdown() {
        const now = Date.now();
        const timeLeft = Math.max(0, endTime - now);
        const minutes = Math.floor(timeLeft / 1000 / 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);
        const countdownElement = document.getElementById("countdown");

        countdownElement.textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (timeLeft === 0) {
            clearInterval(countdownInterval);
            countdownElement.classList.add('red');
            // Simular vibração com notificação e som
            playSound();
            showNotification();
        }
    }

    function playSound() {
        const audio = new Audio('beep.mp3'); // Certifique-se de ter um arquivo de áudio
        audio.play();
    }

    function showNotification() {
        if ("Notification" in window) {
            if (Notification.permission === "granted") {
                new Notification("O tempo acabou!", {
                    body: "Clique para mais detalhes.",
                    icon: "notification-icon.png" // Opcional
                });
            } else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                        new Notification("O tempo acabou!");
                    }
                });
            }
        }
    }

    document.getElementById("test-button").addEventListener("click", function() {
        playSound();
        showNotification();
    });

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
});
