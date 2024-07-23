// document.addEventListener('DOMContentLoaded', () => {
//     const startButton = document.getElementById('start-button');
//     const preparationMessage = document.getElementById('preparation-message');
//     const receivedButton = document.getElementById('received-button');
//     const countdownDisplay = document.getElementById('countdown');
//     const passwordDisplay = document.getElementById('password');
//     const notificationSound = document.getElementById('notification-sound');
//     const customAlert = document.getElementById('custom-alert');
//     const alertConfirm = document.getElementById('alert-confirm');
//     const alertCancel = document.getElementById('alert-cancel');
//     const alertMessage = document.getElementById('alert-message');
//     const title = document.getElementById('title');

//     let countdown;
//     const timerDuration = 5; // 30 segundos
//     let endTime; // Hora de término do temporizador

//     function generateRandomPassword() {
//         return Math.floor(Math.random() * 1000) + 1;
//     }

//     function startTimer() {
//         const currentTime = new Date().getTime();
//         endTime = currentTime + timerDuration * 1000; // Calcular a hora de término
//         localStorage.setItem('endTime', endTime); // Salvar a hora de término no localStorage
//         localStorage.setItem('password', generateRandomPassword()); // Salvar senha no localStorage

//         startButton.classList.add('hidden'); // Ocultar botão "Iniciar"
//         preparationMessage.classList.remove('hidden'); // Mostrar mensagem "Em Preparação"
//         title.textContent = `Sua senha é: ${localStorage.getItem('password')}`; // Atualizar título com a senha

//         countdown = setInterval(updateTimer, 1000);
//     }

//     function updateTimer() {
//         const currentTime = new Date().getTime();
//         const timeRemaining = Math.max(Math.floor((endTime - currentTime) / 1000), 0);
//         countdownDisplay.textContent = formatTime(timeRemaining);

//         // Adicionar animação pulsante para os últimos 10 segundos
//         if (timeRemaining <= 10) {
//             if (timeRemaining % 2 === 0) {
//                 countdownDisplay.classList.add('pulse-red');
//                 countdownDisplay.classList.remove('pulse-black');
//             } else {
//                 countdownDisplay.classList.add('pulse-black');
//                 countdownDisplay.classList.remove('pulse-red');
//             }
//         } else {
//             countdownDisplay.classList.remove('pulse-red', 'pulse-black');
//         }

//         if (timeRemaining <= 0) {
//             clearInterval(countdown);
//             countdownDisplay.textContent = '00:00';
//             preparationMessage.classList.add('hidden'); // Ocultar mensagem "Em Preparação"
//             receivedButton.classList.remove('hidden'); // Mostrar botão "Pedido Recebido"
//             notificationSound.loop = true; // Repetir som de notificação
//             notificationSound.play(); // Tocar som de notificação
//         }
//     }

//     function formatTime(seconds) {
//         const minutes = Math.floor(seconds / 60);
//         const secs = seconds % 60;
//         return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
//     }

//     function showCustomAlert(message, onConfirm) {
//         alertMessage.textContent = message;
//         customAlert.classList.remove('hidden');

//         alertConfirm.addEventListener('click', () => {
//             onConfirm();
//             customAlert.classList.add('hidden');
//         }, { once: true });

//         alertCancel.addEventListener('click', () => {
//             customAlert.classList.add('hidden');
//         }, { once: true });
//     }

//     startButton.addEventListener('click', startTimer);

//     receivedButton.addEventListener('click', () => {
//         showCustomAlert("Recebeu seu pedido?", () => {
//             localStorage.clear(); // Limpa o localStorage
//             notificationSound.pause();
//             notificationSound.currentTime = 0; // Reseta o tempo do áudio
//             receivedButton.classList.add('hidden'); // Ocultar botão "Pedido Recebido"
//             startButton.classList.remove('hidden'); // Mostrar botão "Iniciar" novamente
//             title.textContent = "Gere Sua Senha"; // Restaurar título original
//             preparationMessage.classList.add('hidden'); // Ocultar mensagem "Em Preparação"
//         });
//     });

//     // Restaurar o estado inicial ao recarregar a página
//     window.addEventListener('load', () => {
//         const savedEndTime = localStorage.getItem('endTime');
//         const savedPassword = localStorage.getItem('password');

//         if (savedEndTime && savedPassword) {
//             endTime = parseInt(savedEndTime, 10);
//             const currentTime = new Date().getTime();
//             const timeRemaining = Math.max(Math.floor((endTime - currentTime) / 1000), 0);
            
//             if (timeRemaining > 0) {
//                 countdownDisplay.textContent = formatTime(timeRemaining);
//                 startButton.classList.add('hidden');
//                 preparationMessage.classList.remove('hidden');
//                 title.textContent = `Sua senha é: ${savedPassword}`;
//                 countdown = setInterval(updateTimer, 1000);
//             }
//         }
//     });
// });


document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const preparationMessage = document.getElementById('preparation-message');
    const receivedButton = document.getElementById('received-button');
    const countdownDisplay = document.getElementById('countdown');
    const passwordDisplay = document.getElementById('password');
    const notificationSound = document.getElementById('notification-sound');
    const customAlert = document.getElementById('custom-alert');
    const alertConfirm = document.getElementById('alert-confirm');
    const alertCancel = document.getElementById('alert-cancel');
    const alertMessage = document.getElementById('alert-message');
    const title = document.getElementById('title');
    const confirmation = document.getElementById('confirmation');

    let countdown;
    const timerDuration = 30; // 30 segundos

    function generateRandomPassword() {
        return Math.floor(Math.random() * 1000) + 1;
    }

    function startTimer() {
        let timeRemaining = timerDuration;
        countdownDisplay.textContent = formatTime(timeRemaining);
        startButton.classList.add('hidden'); // Ocultar botão "Iniciar"
        preparationMessage.classList.remove('hidden'); // Mostrar mensagem "Em Preparação"
        title.textContent = `Sua senha é: ${generateRandomPassword()}`; // Atualizar título com a senha

        countdown = setInterval(() => {
            timeRemaining--;
            countdownDisplay.textContent = formatTime(timeRemaining);

            // Adicionar animação pulsante para os últimos 10 segundos
            if (timeRemaining <= 10) {
                if (timeRemaining % 2 === 0) {
                    countdownDisplay.classList.add('pulse-red');
                    countdownDisplay.classList.remove('pulse-black');
                } else {
                    countdownDisplay.classList.add('pulse-black');
                    countdownDisplay.classList.remove('pulse-red');
                }
            } else {
                countdownDisplay.classList.remove('pulse-red', 'pulse-black');
            }

            if (timeRemaining <= 0) {
                clearInterval(countdown);
                countdownDisplay.textContent = '00:00';
                preparationMessage.classList.add('hidden'); // Ocultar mensagem "Em Preparação"
                receivedButton.classList.remove('hidden'); // Mostrar botão "Pedido Recebido"
                notificationSound.loop = true; // Repetir som de notificação
                notificationSound.play(); // Tocar som de notificação
            }
        }, 1000);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function showCustomAlert(message, onConfirm) {
        alertMessage.textContent = message;
        customAlert.classList.remove('hidden');

        alertConfirm.addEventListener('click', () => {
            onConfirm();
            customAlert.classList.add('hidden');
        }, { once: true });

        alertCancel.addEventListener('click', () => {
            customAlert.classList.add('hidden');
        }, { once: true });
    }

    function showConfirmation() {
        confirmation.classList.remove('hidden');
    }

    startButton.addEventListener('click', startTimer);

    receivedButton.addEventListener('click', () => {
        showCustomAlert("Recebeu seu pedido?", () => {
            localStorage.clear(); // Limpa o localStorage
            notificationSound.pause();
            notificationSound.currentTime = 0; // Reseta o tempo do áudio
            receivedButton.classList.add('hidden'); // Ocultar botão "Pedido Recebido"
            startButton.classList.remove('hidden'); // Mostrar botão "Iniciar" novamente
            title.textContent = "Gere Sua Senha"; // Restaurar título original
            preparationMessage.classList.add('hidden'); // Ocultar mensagem "Em Preparação"
            showConfirmation(); // Mostrar confirmação
        });
    });
});
