import ShooterGame from './Shooter/ShooterMain';
//  import PuttPuttGame from './PuttPutt/PuttPuttMain';

import './style.css';

class NavigationPage {
    createButton(label: string, gameInstance: any): HTMLButtonElement {
        const button = document.createElement('button');
        button.textContent = label;
        button.addEventListener('click', () => gameInstance.start());
        return button;
    }

    render(games: { label: string, gameInstance: any }[]) {
        games.forEach(game => {
            const button = this.createButton(game.label, game.gameInstance);
            document.body.appendChild(button);
        });
    }
}

const navigationPage = new NavigationPage();
const shooter = new ShooterGame();
//const puttPutt = new PuttPuttGame();
navigationPage.render([
    { label: 'Shooter Game', gameInstance: shooter },
    //{ label: 'PuttPutt Game', gameInstance: puttPutt },
    
]);

