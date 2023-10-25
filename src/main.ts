import ShooterGame from './Shooter/ShooterMain';
import PuttPuttGame from './PuttPutt/PuttPuttMain';
import ConnectFourGame from './ConnectFour/ConnectFourMain';
import AirHockeyGame from './AirHockey/AirHockeyMain';

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

   
//home button
const homeBtn = document.querySelector('#homebtn');
homeBtn?.addEventListener('click', () => {
    window.location.reload();
});



//shooter button
const shooterBtn = document.querySelector('#shooterbtn');
shooterBtn?.addEventListener('click', () => {
    //currently not using gamecontainer
    //if gamecontainer has children, remove them
    const gameContainer = document.querySelector('#gamecontainer');
    while (gameContainer?.firstChild) {
        gameContainer.firstChild.remove();
    }
    const shooter = new ShooterGame();
    shooter.start();
    //deselect the button after starting the game so spacebar doesn't start the game again
    (shooterBtn as HTMLButtonElement).blur();
    //dont allow the button to be clicked again and create a new scene
    shooterBtn?.setAttribute('disabled', 'true');
    puttPuttBtn?.setAttribute('disabled', 'true');
    airHockeyBtn?.setAttribute('disabled', 'true');
    connectFourBtn?.setAttribute('disabled', 'true');
});

//puttputt button
const puttPuttBtn = document.querySelector('#puttputtbtn');
puttPuttBtn?.addEventListener('click', () => {
    const puttPutt = new PuttPuttGame();
    puttPutt.start();
    puttPuttBtn?.setAttribute('disabled', 'true');
    shooterBtn?.setAttribute('disabled', 'true');
    connectFourBtn?.setAttribute('disabled', 'true');
    airHockeyBtn?.setAttribute('disabled', 'true');
    (puttPuttBtn as HTMLButtonElement).blur();
});

//connect 4 button
const connectFourBtn = document.querySelector('#connectfourbtn');
connectFourBtn?.addEventListener('click', () => {
    const connectFour = new ConnectFourGame();
    connectFour.start();
    connectFourBtn?.setAttribute('disabled', 'true');
    shooterBtn?.setAttribute('disabled', 'true');
    puttPuttBtn?.setAttribute('disabled', 'true');
    (connectFourBtn as HTMLButtonElement).blur();
});

//air hockey button
const airHockeyBtn = document.querySelector('#airhockeybtn');
airHockeyBtn?.addEventListener('click', () => {
    const airHockey = new AirHockeyGame();
    airHockey.start();
    airHockeyBtn?.setAttribute('disabled', 'true');
    connectFourBtn?.setAttribute('disabled', 'true');
    shooterBtn?.setAttribute('disabled', 'true');
    puttPuttBtn?.setAttribute('disabled', 'true');
    (airHockeyBtn as HTMLButtonElement).blur();
});
