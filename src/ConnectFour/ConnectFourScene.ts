import * as THREE from 'three';
//import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
//import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import ConnectFourBoard from './ConnectFourBoard';

export default class ConnectFourScene extends THREE.Scene {

    public board?: ConnectFourBoard;
    public piece?: THREE.Group;
    public rows: number = 8;
    public columns: number = 8;

    public Initialize() {
        this.createTable();
        this.createBoard();
        this.createHoles();
        this.createPieces();
        this.createLighting();
        this.createCamera();
       
    }

    private createTable() {
        const tableGeometry = new THREE.BoxGeometry(3.5, 3.5, .2);
        const tableMaterial = new THREE.MeshBasicMaterial({ color: "grey" });
        const tableMesh = new THREE.Mesh(tableGeometry, tableMaterial);
        tableMesh.position.set(0, -1.5, -1);
        tableMesh.rotateX(200);
        tableMesh.rotateY(-.05);
        this.add(tableMesh);
    }

   

    private createBoard() {
        const board = new ConnectFourBoard(this.rows, this.columns);
        this.board = board;
        const boardGeometry = new THREE.BoxGeometry(1.5, 1.5, .4);
        const boardMaterial = new THREE.MeshBasicMaterial({ color: "blue" });
        const boardMesh = new THREE.Mesh(boardGeometry, boardMaterial);
        // const boardGeometry = new THREE.BoxGeometry(1, 1, 1);
        // const boardMaterial = new THREE.MeshPhongMaterial({ color: "white" });
        // const boardMesh = new THREE.Mesh(boardGeometry, boardMaterial);
        //boardMesh.position.set(0, 0, 0);
        boardMesh.position.set(0, 0, -2);
        boardMesh.rotateY(.1);
        //boardMesh.rotateX(-.03);
        board.add(boardMesh);
        this.add(board);
    }

    private createHoles() {
        const holeGeometry = new THREE.CylinderGeometry(.075, .075, .075, 22);
        const holeMaterial = new THREE.MeshPhongMaterial({ color: "yellow" });
        const holeMesh = new THREE.Mesh(holeGeometry, holeMaterial);
        const holesGroup = new THREE.Group(); // create a new group to hold all the hole meshes
        const spacing = .2;
        const xOffset = -spacing * (this.columns - 1) / 2;
        const yOffset = -spacing * (this.rows - 1) / 2;
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.columns; j++){
                const hole = holeMesh.clone(); // clone the hole mesh
                hole.position.set(xOffset + j * spacing, (yOffset + i * spacing)-3,-1);
                holesGroup.add(hole); 
            }
        }
        holesGroup.rotateX(Math.PI/2);
        holesGroup.rotateY(.1);
        //holesGroup.position.set(0, -2, 0); // rotate the group
        this.add(holesGroup); // add the group to the scene
    }

    // private createHoles() {
    //     const holeGeometry = new THREE.CylinderGeometry(.075, .075, .075, 22);
    //     const holeMaterial = new THREE.MeshPhongMaterial({ color: "yellow" });
    //     const holeMesh = new THREE.Mesh(holeGeometry, holeMaterial);
    //     const holesGroup = new THREE.Group(); // create a new group to hold all the hole meshes
    //     for(let i= 0; i < this.rows; i++){
    //         for(let j = 0; j < this.columns; j++){
    //             const hole = holeMesh.clone(); // clone the hole mesh
    //             hole.position.set(-i/7 + .5, -j/7 + .5, -1.9);
    //             holesGroup.add(hole); 
    //             this.add(holesGroup);
    //         }
    //     }
    //     holesGroup.rotateX(Math.PI/2);
    //     holesGroup.rotateY(.1); // rotate the group
    //     this.add(holesGroup); // add the group to the scene
    // }

    private createPieces() {
        const pieceGeometry = new THREE.BoxGeometry(.9, .9, .9);
        const pieceMaterial = new THREE.MeshPhongMaterial({ color: "red" });
        const pieceMesh = new THREE.Mesh(pieceGeometry, pieceMaterial);
        pieceMesh.position.set(0, 0, 0);
        this.add(pieceMesh);
    }

    private createLighting() {
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 2, 0);
        this.add(light);
    }

    private createCamera() {
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
        //camera.position.set(0, 1.5, 1.5);
        camera.position.set(0, 0, 5);
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