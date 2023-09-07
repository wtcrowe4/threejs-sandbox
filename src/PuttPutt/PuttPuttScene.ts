import * as THREE from 'three';
//import TWEEN from '@tweenjs/tween.js';
//import * as CANNON from 'cannon-es'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import  GolfBall from './GolfBall.ts';
import Hole from './Hole.ts';

export default class PuttPuttScene extends THREE.Scene 
{
    private readonly mtlLoader = new MTLLoader();
    private readonly objLoader = new OBJLoader();
    private readonly camera: THREE.PerspectiveCamera;
    private readonly keyDown = new Set<string>();
    
    private ball?: GolfBall
    private club?: THREE.Group
    private aim?: THREE.Line
    private powerBar?: THREE.Mesh
    private hole?: THREE.Group[] = []
    

    constructor(camera: THREE.PerspectiveCamera) {
        super();
        this.camera = camera;
    }

    async Initialize() {
        
        //Objects
        const club = await this.createClub();
        club.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
        club.rotateX(-.3);
        club.rotateY(Math.PI);
        club.position.set(-.25, .7, .05);
        this.club = club;
        
        const aim = await this.createAim();
        aim.position.set(0, 0, 0);
        this.aim = aim;

        const powerBar = await this.createPowerBar();
        powerBar.position.set(0, .25, .7);
        powerBar.scale.set(.2, .5, .5);
        this.powerBar = powerBar;
    
        //Golf Ball
        const ball = new GolfBall(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), .0001, this.aim, this.powerBar)
        this.ball = ball;

        //Build Hole
        const hole = new Hole();
        this.hole = await hole.createHole();
        this.hole?.forEach(hole => this.add(hole));
        
        //Lighting
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 5, 5);
        this.add(light);

        //Camera
        this.camera.position.set(0, 1.5, 1.5);
        this.camera.lookAt(0, 0, -1);

        //Add Objects to Scene
        this.add(this.ball, this.club, this.aim, this.powerBar)

        //Event Listeners
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }


    //CREATE OBJECTS
    private async createClub() {
        const clubMtl = await this.mtlLoader.loadAsync('assets/PuttPutt/club_blue.mtl');
        const clubObj = await this.objLoader.setMaterials(clubMtl).loadAsync('assets/PuttPutt/club_blue.obj');
        return clubObj;
    }
    private async createAim() {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -.4)]);
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        return line;
    }

    private async createPowerBar() {
        const powerBarGeometry = new THREE.BoxGeometry(.1, .1, .1);
        const powerBarMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const powerBar = new THREE.Mesh(powerBarGeometry, powerBarMaterial);
        return powerBar;
    
    }

    //HANDLE KEYBOARD INPUT
    //spacebar to hit ball, only move once even if held down
    private swinging = false;
    private handleKeyDown(e: KeyboardEvent) {
        this.keyDown.add(e.key.toLowerCase());
        if (e.key.toLowerCase() == ' ' && !this.swinging) {
            this.club?.rotateZ(.4);
            this.swinging = true;
        }
        
        if (e.key.toLowerCase() == ' ' && this.swinging && this.powerBar) {
            if (this.powerBar.scale.x < 15) {this.powerBar.scale.x += .2;}
        }
        
    }

    private handleKeyUp(e: KeyboardEvent) {
        this.keyDown.delete(e.key.toLowerCase());
            if (e.key == ' ') {
                this.club?.rotateZ(-1.2);
                this.ball?.hitGolfBall();
                this.ball?.updateGolfBall();
                setTimeout(() => {
                    if (this.club && this.aim && this.powerBar && this.ball) {
                        this.club.rotateZ(.8);
                        this.powerBar.scale.set(.2, .5, .5);
                        this.ball.resetCamera(this.camera, this.club, this.aim, this.powerBar);
                    }
                }, 2000);
                this.swinging = false;
                
            }
        
    }

  
    private handleMovement() {
        if (this.keyDown.has('shift') && this.keyDown.has('arrowleft')) {
            this.club?.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), .01); //.translateOnAxis(new THREE.Vector3(1, 0, 0), .005);
            this.aim?.rotateY(.01);
        }
        if (this.keyDown.has('shift') && this.keyDown.has('arrowright')) {
            this.club?.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -.01); //.translateOnAxis(new THREE.Vector3(1, 0, 0), -.005);
            this.aim?.rotateY(-.01);
        }
        if (this.keyDown.has('arrowup') && !this.keyDown.has('shift')) {
            this.camera.position.z -= .01;
        }
        if (this.keyDown.has('arrowdown') && !this.keyDown.has('shift')) {
            this.camera.position.z += .01;
        }
        if (this.keyDown.has('arrowleft') && !this.keyDown.has('shift')) {
            this.camera.position.x -= .01;
        }
        if (this.keyDown.has('arrowright') && !this.keyDown.has('shift')) {
            this.camera.position.x += .01;
        }
    }


    
    
    Update() {
        this.handleMovement();
        this.ball?.updateGolfBall();
    }
    
}