import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import ConnectFourBoard from './ConnectFourBoard';

export default class ConnectFourScene extends THREE.Scene {

    public board?: ConnectFourBoard;
    public piece?: THREE.Group;
    public rows: number = 8;
    public columns: number = 8;

    public Initialize() {
        this.createBoard();
        this.createPieces();
        this.createLighting();
        this.createCamera();
       
    }

   

    private createBoard() {
        const board = new ConnectFourBoard(this.rows, this.columns);
        const boardGeometry = new THREE.BoxGeometry(1, 1, 1);
        const boardMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
        const boardMesh = new THREE.Mesh(boardGeometry, boardMaterial);
        boardMesh.position.set(0, 0, 0);
        board.add(boardMesh);
        this.add(board);
    }

    private createPieces() {
        const pieceGeometry = new THREE.BoxGeometry(.9, .9, .9);
        const pieceMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
        const pieceMesh = new THREE.Mesh(pieceGeometry, pieceMaterial);
        pieceMesh.position.set(0, 0, 0);
        this.add(pieceMesh);
    }

    private createLighting() {
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 5, 5);
        this.add(light);
    }

    private createCamera() {
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.set(0, 1.5, 1.5);
        camera.lookAt(0, 0, -1);
    }

    player1: string = "red";
    player2: string = "black";
    currentPlayer: string = this.player1;

    public TakeTurn(player: string, column: number) {
        // Player drops a piece into the specified column
        this.DropPiece(player, column);

        // Check if the current player has won the game
        // if (this.CheckWin(player)) {
        //     // If the player has won, print a message and reset the game
        //     console.log(`${player} has won the game!`);
        //     this.Reset();
        // }
    }

    public DropPiece(player: string, column: number) {
        // Check if the column number is valid
        if (column < 0 || column >= this.columns) {
            console.error("Invalid column number");
            return;
        }

        // Iterate from the bottom of the specified column upwards
        for (let row = this.rows - 1; row >= 0; row--) {
            // If an empty spot is found, place the player's piece there
            if (this.board && this.board.grid[row][column] === null) {
                //this.board.grid[row][column] = player;
                this.board.addDiscToColumn(column, row);
                // Switch the current player
                this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
                return;
            }

        }
        

        // If no empty spot is found, the column is full
        console.error("Column is full");

    }

    // public CheckWin(player: string) {
    //     //check for win
    //     // Check for horizontal win
    //     for (let row = 0; row < this.rows; row++) {
    //         for (let column = 0; column < this.columns - 3; column++) {
    //             if (this.board?.grid[row][column] === player &&
    //                 this.board?.grid[row][column + 1] === player &&
    //                 this.board?.grid[row][column + 2] === player &&
    //                 this.board?.grid[row][column + 3] === player) {
    //                 return true;
    //             }
    //         }
    //     }
    //     // Check for vertical win
    //     for (let row = 0; row < this.rows - 3; row++) {
    //         for (let column = 0; column < this.columns; column++) {
    //             if (this.board?.grid[row][column] === player &&
    //                 this.board?.grid[row + 1][column] === player &&
    //                 this.board?.grid[row + 2][column] === player &&
    //                 this.board?.grid[row + 3][column] === player) {
    //                 return true;
    //             }
    //         }
    //     }
    //     // Check for diagonal win (positive slope)
    //     for (let row = 0; row < this.rows - 3; row++) {
    //         for (let column = 0; column < this.board?.columns - 3; column++) {
    //             if (this.board?.grid[row][column] === player &&
    //                 this.board?.grid[row + 1][column + 1] === player &&
    //                 this.board?.grid[row + 2][column + 2] === player &&
    //                 this.board?.grid[row + 3][column + 3] === player) {
    //                 return true;
    //             }
    //         }
    //     }
    //     // Check for diagonal win (negative slope)
    //     for (let row = 3; row < this.rows; row++) {
    //         for (let column = 0; column < this.columns - 3; column++) {
    //             if (this.board?.grid[row][column] === player &&
    //                 this.board?.grid[row - 1][column + 1] === player &&
    //                 this.board?.grid[row - 2][column + 2] === player &&
    //                 this.board?.grid[row - 3][column + 3] === player) {
    //                 return true;
    //             }
    //         }
    //     }
    //     return false;
    // }

    public Reset() {
        //reset board
        this.board = new ConnectFourBoard(this.rows, this.columns);
        //reset player
        this.currentPlayer = this.player1;

    }

    



}