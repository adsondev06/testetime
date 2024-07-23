document.addEventListener("DOMContentLoaded", function() {
    function generateRandomNumber(min = 1, max = 1000) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function updateRandomNumber() {
        const number = generateRandomNumber();
        document.getElementById("random-number").textContent = number;
        localStorage.setItem('randomNumber', number);
    }

    function playSound() {
        const audio = document.getElementById('notification-sound');
        audio.play().catch(error => {
            console.error("Erro ao tocar o som:", error);
        });
    }

    function showNotification() {
        if ("Notification" in window) {
            if (Notification.permission === "granted") {
                new Notification("O tempo acabou!", {
                    body: "Clique para mais detalhes.",
                    icon: "notification-icon.png" // Verifique o caminho e a existência do arquivo
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

    const countdownDuration = 30 * 1000; // 30 segundos
    let endTime;
    let countdownInterval;

    function updateCountdown() {
        const now = Date.now();
        const timeLeft = Math.max(0, endTime - now);
        const seconds = Math.floor(timeLeft / 1000);
        const countdownElement = document.getElementById("countdown");

        countdownElement.textContent = `${seconds.toString().padStart(2, '0')}`;

        if (timeLeft === 0) {
            clearInterval(countdownInterval);
            countdownElement.classList.add('red');
            playSound();
            showNotification();
        }
    }

    document.getElementById('start-button').addEventListener('click', function() {
        updateRandomNumber(); // Gere um novo número aleatório
        endTime = Date.now() + countdownDuration; // Defina o novo tempo de término
        localStorage.setItem('endTime', endTime);
        updateCountdown(); // Atualize a contagem regressiva

        // Atualiza a contagem regressiva em um intervalo de 1 segundo
        clearInterval(countdownInterval);
        countdownInterval = setInterval(updateCountdown, 1000);
    });

    // Atualiza a contagem regressiva com base no tempo salvo no localStorage
    endTime = localStorage.getItem('endTime');
    if (endTime) {
        endTime = parseInt(endTime, 10);
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
    }
});
