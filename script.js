document.addEventListener("DOMContentLoaded", function() {
    // Função para gerar um número aleatório entre 1 e 1000
    function generateRandomNumber() {
        return Math.floor(Math.random() * 1000) + 1;
    }

    // Verificar se há um número salvo no localStorage
    let randomNumber = localStorage.getItem('randomNumber');
    if (!randomNumber) {
        randomNumber = generateRandomNumber();
        localStorage.setItem('randomNumber', randomNumber);
    }

    document.getElementById("random-number").textContent = randomNumber;

    // Inicializar o tempo restante (10 minutos)
    const countdownDuration = 10 * 60 * 1000; // 10 minutos em milissegundos
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
            if (navigator.vibrate) {
                console.log("Vibrando...");
                navigator.vibrate([1000, 500, 1000]);
            } else {
                console.log("Vibração não suportada.");
            }
        }
    }

    // Atualizar o relógio a cada segundo
    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Chamada inicial para exibir imediatamente
});
