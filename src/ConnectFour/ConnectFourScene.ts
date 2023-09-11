import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

export default class ConnectFourScene extends THREE.Scene {

    public Initialize() {
        this.createBoard();
        this.createPieces();
        this.createLighting();
        this.createCamera();
    }

    public Update() {
    
    }

    private createBoard() {
        const board = new THREE.Group();
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

    

}