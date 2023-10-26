import * as THREE from 'three';
import AirHockeyScene from './AirHockeyScene';
import AirHockeyTable from './AirHockeyTable';

export default class AirHockeyGame {
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private scene: AirHockeyScene;
    public table?: AirHockeyTable;

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
        // Get the current time
        const time = Date.now();

        // Update the puck position
        this.scene.puck.update(time);

        // Update the player paddles
        this.scene.player1.update(time);
        this.scene.player2.update(time);

        // Check for collisions between the puck and the players
        if (this.scene.puck.collidesWith(this.scene.player1)) {
            this.scene.puck.handleCollision(this.scene.player1);
        }
        if (this.scene.puck.collidesWith(this.scene.player2)) {
            this.scene.puck.handleCollision(this.scene.player2);
        }

        // Check for goals
        if (this.scene.puck.isGoalScored()) {
            // Handle goal scored
            this.scene.handleGoalScored();
        }
    }

}

