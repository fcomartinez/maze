import { formulario, feedback, scores, gameContainer, winnerContainer, nicknameContainer } from '../selectors.js';

class UI {
    constructor() {

    }
      
    showMessage = message => {
        const alert = document.querySelector('.error');
        if(!alert) {
            const alert = document.createElement('P');
            alert.textContent = message;
            alert.classList.add('error', 'bg-red-700','p-2', 'rounded-3xl', 'text-white', 'text-center', 'my-5', 'w-80', 'mx-auto');
            formulario.appendChild(alert);
            setTimeout(() => alert.remove(), 3000);
        }
    }

    showScores = scoresItems => {
        scoresItems.slice(0,3).forEach( item => {
            const { nickname, seconds } = item;
            const P = document.createElement('P');
            P.textContent = `Player: ${nickname} - ${seconds} seconds.`;
            P.classList.add('text-lg', 'bg-slate-900', 'text-slate-50', 'font-semibold', 'tracking-wide', 'px-6', 'py-3', 'rounded-full');
            scores.appendChild(P);
        });
    }

    showFeedback = message => {
        feedback.textContent = message;
    }

    toogleNicknameContainer() {
        nicknameContainer.classList.toggle('hidden')
    }

    toogleGameContainer() {
        gameContainer.classList.toggle('hidden');
    }

    toogleWinnerContainer() {
        winnerContainer.classList.toggle('hidden');
    }
}

export default UI;