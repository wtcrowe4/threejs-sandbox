import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
//import GolfBall from './GolfBall.ts';

export default class PuttPuttScene extends THREE.Scene 
{
    private readonly mtlLoader = new MTLLoader();
    private readonly objLoader = new OBJLoader();
    private readonly camera: THREE.PerspectiveCamera;
    private readonly keyDown = new Set<string>();

    private directionVector = new THREE.Vector3()
    private ballVelocity = new THREE.Vector3()
    private ballPosition = new THREE.Vector3()
    private ballAcceleration = new THREE.Vector3()
    private ballMass = 0.04593
    

    private ball?: THREE.Group
    private ballMtl?: MTLLoader.MaterialCreator
    private club?: THREE.Group
    private clubMtl?: MTLLoader.MaterialCreator
    private hole?: THREE.Group
    private holeMtl?: MTLLoader.MaterialCreator

 
    constructor(camera: THREE.PerspectiveCamera) {
        super();
        this.camera = camera;
    }

    async Initialize() {
        //objects
        const ball = await this.createBall();
        ball.position.set(0, 0, 0);
        const club = await this.createClub();
        club.position.set(0, 0, 0);
        const hole = await this.createHole();
        hole.position.set(0, 0, 0);
        this.ball = ball;
        this.club = club;
        this.hole = hole;
        this.add(ball, club, hole);

        //lighting
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 5, 5);
        this.add(light);

        //camera
        this.camera.position.set(0, 5, 10);
        this.camera.lookAt(0, 0, 0);

        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }


    //CREATE OBJECTS
    private async createBall() {
        const ballMtl = await this.mtlLoader.loadAsync('assets/PuttPutt/golfball.mtl');
        ballMtl.preload();
        this.objLoader.setMaterials(ballMtl);
        const ballObj = await this.objLoader.loadAsync('assets/PuttPutt/golfball.obj');
        this.ball = ballObj;
    }

    private async createClub() {
        const clubMtl = await this.mtlLoader.loadAsync('assets/PuttPutt/club.mtl');
        const club = await this.objLoader.setMaterials(clubMtl).loadAsync('assets/PuttPutt/club.obj');
        this.clubMtl = clubMtl;
        return club;
    }

    private async createHole() {
        const holeMtl = await this.mtlLoader.loadAsync('assets/PuttPutt/hole.mtl');
        const hole = await this.objLoader.setMaterials(holeMtl).loadAsync('assets/PuttPutt/hole.obj');
        this.holeMtl = holeMtl;
        return hole;
    }
}