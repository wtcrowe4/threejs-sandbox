import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import * as CANNON from 'cannon-es'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { Vector3 } from 'three';
import PuttPuttScene from './PuttPuttScene';


export default class GolfBall extends THREE.Group {
    private static readonly mtlLoader = new MTLLoader();
    private static readonly objLoader = new OBJLoader();

    


    position: Vector3;
    force: Vector3 = new Vector3(0, 0, 0);
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
        const power = this.powerBar?.scale ? direction.multiplyScalar(this.powerBar.scale.x) : new THREE.Vector3();
        this.force = power;
    }

    
    
    public updateGolfBall() {
        if (!this.ball) {
            return;
        }
        //Physics
        //velocity here is the vector for movement of the ball base on aim and power
        const velocity = this.force;
        this.velocity = velocity;
        velocity.add(this.gravity);
        velocity.multiplyScalar(1 - this.friction);
        
        //just moving ball to new location, working on physics
        this.newPosition = new Vector3(this.ball.position.x + velocity.x, this.ball.position.y + velocity.y, this.ball.position.z + velocity.z);
        this.ball.position.add(velocity);
        console.log(this.velocity)
        
        

        //Ball Movement Tween
        //Use tween to move ball
        const ballTween = new TWEEN.Tween(this.ball)
            .to({ x: this.ball.position.x + velocity.x, y: this.ball.position.y + velocity.y, z: this.ball.position.z + velocity.z }, 5000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();
        ballTween.onComplete(() => {
            this.ball?.position.set(this.ball.position.x + velocity.x, this.ball.position.y + velocity.y, this.ball.position.z + velocity.z);
        });

         TWEEN.update();

        //Ball Movement Cannon
        // const ballBody = new CANNON.Body({
        //     mass: 5,
        //     position: new CANNON.Vec3(this.ball.position.x, this.ball.position.y, this.ball.position.z),
        //     shape: new CANNON.Sphere(.5),
        //     velocity: new CANNON.Vec3(velocity.x, velocity.y, velocity.z)
        // });

        // ballBody.applyForce(new CANNON.Vec3(this.force.x, this.force.y, this.force.z), new CANNON.Vec3(this.ball.position.x, this.ball.position.y, this.ball.position.z));
        // ballBody.applyForce(new CANNON.Vec3(this.gravity.x, this.gravity.y, this.gravity.z), new CANNON.Vec3(this.ball.position.x, this.ball.position.y, this.ball.position.z));
     
    
        //Collision Detection
        
        //Reset Camera position to where ball finished 
        

    }


    //Reset Camera
    public newPosition : Vector3 = new Vector3(0,0,0);
    public resetCamera(camera: THREE.PerspectiveCamera, club: THREE.Group, aim: THREE.Line, powerBar: THREE.Mesh) {
        camera.position.set(this.newPosition.x, this.newPosition.y + 2, this.newPosition.z + 2);
        camera.lookAt(this.newPosition.x, this.newPosition.y, this.newPosition.z);
        club.position.set(this.newPosition.x-.25, this.newPosition.y+.7, this.newPosition.z+.05);
        aim.position.set(this.newPosition.x, this.newPosition.y, this.newPosition.z-.1);
        powerBar.position.set(this.newPosition.x, this.newPosition.y+.25, this.newPosition.z+.7);
        
    }


    public world = new CANNON.World({
        gravity: new CANNON.Vec3(0, -9.82, 0)
    });

    public timeStep = 1/60;

   



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


