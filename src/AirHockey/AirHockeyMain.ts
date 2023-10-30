import * as THREE from 'three';
import AirHockeyScene from './AirHockeyScene';
import AirHockeyTable from './AirHockeyTable';

export default class AirHockeyGame {
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private scene: AirHockeyScene;
    public table?: AirHockeyTable;
    public player1: string = "red";
    public player2: string = "black";
    public currentPlayer: string = this.player1;
    // public puck = this.table.puck;
    // public player2Paddle = this.table.player2;
    // public player1Paddle = this.table.player1;

    constructor() {
        
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
        this.renderer = new THREE.WebGLRenderer();
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.scene = new AirHockeyScene();
        this.scene.Initialize();

        this.renderer.render(this.scene, this.camera);
        this.start();
    }

    public start(): void {
        this.Update();
        requestAnimationFrame(() => this.start());
        this.renderer.render(this.scene, this.camera);
    }

    public Update() {
        if (this.table) {
            this.table.Update();
        }
    }
}

