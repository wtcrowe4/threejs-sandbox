import * as THREE from 'three';
import ConnectFourScene from './ConnectFourScene';
import ConnectFourBoard from './ConnectFourBoard';
//import * as dat from 'dat.gui';

export default class ConnectFourGame {
    //private gui: dat.GUI;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private scene: ConnectFourScene;
    public board?: ConnectFourBoard;

    constructor() {
        // this.gui = new dat.GUI();
        // this.gui.addFolder('Camera');
        // this.gui.addFolder('Lighting');
        // this.gui.addFolder('Objects');
        // this.gui.addFolder('Scene');
        // this.gui.addFolder('Physics');

        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
        this.renderer = new THREE.WebGLRenderer();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.scene = new ConnectFourScene();
        this.scene.Initialize();

        this.renderer.render(this.scene, this.camera);
        this.start();
    }

    public start(): void {
        this.Update();
        requestAnimationFrame(() => this.start());
        this.renderer.render(this.scene, this.camera);
    }

    //move update logic here 
    public Update() {
        //update scene
        this.TakeTurn(this.currentPlayer, 0);
        //check for win
        this.CheckWin(this.currentPlayer);
    }

    player1: string = "red";
    player2: string = "black";
    currentPlayer: string = this.player1;

    public TakeTurn(player: string, column: number) {
        // Player drops a piece into the specified column
        this.DropPiece(player, column);

        // Check if the current player has won the game
        if (this.CheckWin(player)) {
            // If the player has won, print a message and reset the game
            console.log(`${player} has won the game!`);
            this.Reset();
        }
    }

    public DropPiece(player: string, column: number) {
        // Check if the column number is valid
        if (column < 0 || column >= this.board?.columns) {
            console.error("Invalid column number");
            return;
        }

        // Iterate from the bottom of the specified column upwards
        for (let row = this.board?.rows! - 1; row >= 0; row--) {
            // If an empty spot is found, place the player's piece there
            if (this.board?.grid[row][column] === null) {
                this.board.grid[row][column] = player;

                // Switch the current player
                this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
                return;
            }
        }

        // If no empty spot is found, the column is full
        console.error("Column is full");
    }

    public CheckWin(player: string) {
        //check for win
        // Check for horizontal win
        for (let row = 0; row < this.board?.rows!; row++) {
            for (let column = 0; column < this.board?.columns! - 3; column++) {
                if (this.board?.grid[row][column] === player &&
                    this.board?.grid[row][column + 1] === player &&
                    this.board?.grid[row][column + 2] === player &&
                    this.board?.grid[row][column + 3] === player) {
                    return true;
                }
            }
        }
        // Check for vertical win
        for (let row = 0; row < this.board?.rows! - 3; row++) {
            for (let column = 0; column < this.board?.columns!; column++) {
                if (this.board?.grid[row][column] === player &&
                    this.board?.grid[row + 1][column] === player &&
                    this.board?.grid[row + 2][column] === player &&
                    this.board?.grid[row + 3][column] === player) {
                    return true;
                }
            }
        }
        // Check for diagonal win (positive slope)
        for (let row = 0; row < this.board?.rows! - 3; row++) {
            for (let column = 0; column < this.board?.columns! - 3; column++) {
                if (this.board?.grid[row][column] === player &&
                    this.board?.grid[row + 1][column + 1] === player &&
                    this.board?.grid[row + 2][column + 2] === player &&
                    this.board?.grid[row + 3][column + 3] === player) {
                    return true;
                }
            }
        }
        return false;
    }

    

     

    public Reset() {
        //reset board
        this.board = new ConnectFourBoard(this.rows, this.columns);
        //reset player
        this.currentPlayer = this.player1;

    }

    
}