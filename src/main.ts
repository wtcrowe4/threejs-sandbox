import ShooterGame from './Shooter/ShooterMain';
//  import PuttPuttGame from './PuttPutt/PuttPuttMain';

import './style.css';

// class NavigationPage {
//     createButton(label: string, gameInstance: any): HTMLButtonElement {
//         const button = document.createElement('button');
//         button.textContent = label;
//         button.addEventListener('click', () => gameInstance.start());
//         return button;
//     }

//     render(games: { label: string, gameInstance: any }[]) {
//         games.forEach(game => {
//             const button = this.createButton(game.label, game.gameInstance);
//             document.body.appendChild(button);
//         });
//     }
// }

// const navigationPage = new NavigationPage();
// const shooter = new ShooterGame();
// //const puttPutt = new PuttPuttGame();
// navigationPage.render([
//     { label: 'Shooter Game', gameInstance: shooter },
//     //{ label: 'PuttPutt Game', gameInstance: puttPutt },
    
// ]);

//if gamecontainer is empty, make the navdiv bigger/ smaller and vertical while the game is running
//const navDiv = document.querySelector('#navdiv');
//const gameContainer = document.querySelector('#gamecontainer');

   



const shooterBtn = document.querySelector('#shooterbtn');
shooterBtn?.addEventListener('click', () => {
    //if gamecontainer has children, remove them
    const gameContainer = document.querySelector('#gamecontainer');
    gameContainer?.removeChild(gameContainer.firstChild!);
    const shooter = new ShooterGame();
    shooter.start();
});

