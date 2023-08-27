import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
//import GolfBall from './GolfBall.ts';
import Hole from './Hole.ts';

export default class PuttPuttScene extends THREE.Scene 
{
    private readonly mtlLoader = new MTLLoader();
    private readonly objLoader = new OBJLoader();
    private readonly camera: THREE.PerspectiveCamera;
    private readonly keyDown = new Set<string>();

    // private directionVector = new THREE.Vector3()
    // private ballVelocity = new THREE.Vector3()
    // private ballPosition = new THREE.Vector3()
    // private ballAcceleration = new THREE.Vector3()
    // private ballMass = 0.04593
    

    private ball?: THREE.Group
    private club?: THREE.Group
    private hole?: THREE.Group
    



 
    constructor(camera: THREE.PerspectiveCamera) {
        super();
        this.camera = camera;
    }

    async Initialize() {
        //objects
        const ball = await this.createBall();
        ball.position.set(0, 0, 0);
        const club = await this.createClub();
        club.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
        club.rotateX(-.3);
        club.rotateY(Math.PI);
        club.position.set(-.25, .7, .05);
        this.ball = ball;
        this.club = club;
        
        
        
        
        
        
        const hole = new Hole();

        this.hole = await hole.createHole();
        this.hole.position.set(0, -.2, -.2);

        
        
        this.add(this.ball, this.club, this.hole);

        //lighting
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 5, 5);
        this.add(light);

        //camera
        this.camera.position.set(0, 1.5, 1.5);
        this.camera.lookAt(0, 0, -1);

        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }


    //CREATE OBJECTS
    private async createBall() {
        const ballMtl = await this.mtlLoader.loadAsync('assets/PuttPutt/ball_blue.mtl');
        const ballObj = await this.objLoader.setMaterials(ballMtl).loadAsync('assets/PuttPutt/ball_blue.obj');
        return ballObj;
    }

    private async createClub() {
        const clubMtl = await this.mtlLoader.loadAsync('assets/PuttPutt/club_blue.mtl');
        const clubObj = await this.objLoader.setMaterials(clubMtl).loadAsync('assets/PuttPutt/club_blue.obj');
        return clubObj;
    }

   

    //HANDLE KEYBOARD INPUT
    private handleKeyDown(e: KeyboardEvent) {
        this.keyDown.add(e.key.toLowerCase());
        if (e.key == ' ') { 
            this.club?.rotateZ(.3);
        }
    }

    private handleKeyUp(e: KeyboardEvent) {
        this.keyDown.delete(e.key.toLowerCase());
        if (e.key == ' ') {
            this.club?.rotateZ(-.8);
            setTimeout(() => {
                this.club?.rotateZ(.5);
            }, 400);
            
        }
    }

  

    //UPDATE

    
}