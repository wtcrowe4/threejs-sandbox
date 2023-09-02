import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
//import * as CANNON from 'cannon-es'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { Vector3 } from 'three';

export default class GolfBall extends THREE.Group {
    private static readonly mtlLoader = new MTLLoader();
    private static readonly objLoader = new OBJLoader();
    position: Vector3;
    velocity: Vector3;
    acceleration: Vector3;
    gravity: Vector3;
    friction: number;
    ball?: THREE.Group;
    aim?: THREE.Line;
    powerBar?: THREE.Mesh;
    


    constructor(position: Vector3, gravity: Vector3, friction: number, aim: THREE.Line, powerBar: THREE.Mesh) {
        super();
        this.position = position;
        this.velocity = new Vector3(0, 0, 0);
        this.acceleration = new Vector3(0, 0, 0);
        this.gravity = gravity;
        this.friction = friction;
        this.aim = aim;
        this.powerBar = powerBar;
        this.init();
    }

    async init() {
        this.ball = await this.createBall();
        this.ball.position.set(this.position.x, this.position.y, this.position.z);
        this.add(this.ball);
    }

    public async createBall() {
        const ballMtl = await GolfBall.mtlLoader.loadAsync('assets/PuttPutt/ball_blue.mtl');
        const ballObj = await GolfBall.objLoader.setMaterials(ballMtl).loadAsync('assets/PuttPutt/ball_blue.obj');
        return ballObj;
    }


    public hitGolfBall() {
        if (!this.ball || !this.aim || !this.powerBar) {
            return;
        }
        const direction = this.aim?.quaternion ? new THREE.Vector3(0, 0, -1).applyQuaternion(this.aim.quaternion) : new THREE.Vector3();
        direction.normalize();
        const velocity = this.powerBar?.scale ? direction.multiplyScalar(this.powerBar.scale.x) : new THREE.Vector3();
        this.velocity = velocity;
    }

    public updateGolfBall() {
        if (!this.ball) {
            return;
        }
        const velocity = this.velocity;
        this.ball.position.add(velocity);
        velocity.add(this.gravity);
        velocity.multiplyScalar(1 - this.friction);
        
        //Ball Movement
        const tween = new TWEEN.Tween(this.ball.position).to({x: this.ball.position.x + velocity.x, y: this.ball.position.y + velocity.y, z: this.ball.position.z + velocity.z}, 3000);
        tween.start();
        // Apply the ball's velocity to the ball's position
        this.ball.position.add(velocity);
        tween.update();
    }

    // hit(force: Vector3) {
    //     this.velocity.add(force);
    // }

    // update() {
    //     this.velocity.add(this.gravity);
    //     this.velocity.multiplyScalar(1 - this.friction);
    //     this.position.add(this.velocity);
    // }

    // reset(position: Vector3) {
    //     this.position = position;
    //     this.velocity = new Vector3(0, 0, 0);
    //     this.acceleration = new Vector3(0, 0, 0);
    // }
}


