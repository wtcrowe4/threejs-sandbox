import * as THREE from 'three';
//import TWEEN from '@tweenjs/tween.js';
import * as CANNON from 'cannon-es'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { Vector3 } from 'three';

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
        this.createPhysics();
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
        // this.ballBody.applyForce(new CANNON.Vec3(this.force.x, this.force.y, this.force.z), new CANNON.Vec3(this.ball.position.x, this.ball.position.y, this.ball.position.z));
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
        
        
        this.newPosition = new Vector3(this.ball.position.x + velocity.x, this.ball.position.y + velocity.y, this.ball.position.z + velocity.z);
        
        console.log(this.velocity)

        this.updatePhysics();
        
    }


    //Reset Camera
    public newPosition : Vector3 = new Vector3(0,0,0);
    public resetCamera(camera: THREE.PerspectiveCamera, club: THREE.Group, aim: THREE.Line, powerBar: THREE.Mesh) {
        camera.position.set(this.newPosition.x, this.newPosition.y + 1.5, this.newPosition.z + 1.5);
        camera.lookAt(this.newPosition.x, this.newPosition.y, this.newPosition.z-1);
        club.position.set(this.newPosition.x-.25, this.newPosition.y+.7, this.newPosition.z+.05);
        aim.position.set(this.newPosition.x, this.newPosition.y, this.newPosition.z-.1);
        powerBar.position.set(this.newPosition.x, this.newPosition.y+.25, this.newPosition.z+.7);
        
    }


    public world = new CANNON.World({
        gravity: new CANNON.Vec3(0, -9.81, 0)
    });

    public timeStep = 1/60;
    public ballBody: CANNON.Body = new CANNON.Body({
        mass: 5,
        position: new CANNON.Vec3(this.ball?.position.x, this.ball?.position.y, this.ball?.position.z),
        shape: new CANNON.Sphere(.5),
        
    });

    public createPhysics() {
          
        const floorBody = new CANNON.Body({ 
            mass: 0,
            shape: new CANNON.Plane(),
            position: new CANNON.Vec3(0, -.2, 0),

        });
        
        const wallBody1 = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Plane(),
            position: new CANNON.Vec3(0, 0, -5),
            quaternion: new CANNON.Quaternion().setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 2)
        });
        

        const wallBody2 = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Plane(),
            position: new CANNON.Vec3(0, 0, 5),
            quaternion: new CANNON.Quaternion().setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 2)
        });

        const wallBody3 = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Plane(),
            position: new CANNON.Vec3(-5, 0, 0),
            quaternion: new CANNON.Quaternion().setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 2)
        });

        const wallBody4 = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Plane(),
            position: new CANNON.Vec3(5, 0, 0),
            quaternion: new CANNON.Quaternion().setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 2)
        });

        const holeBody = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Cylinder(.5, .5, .1, 32),
            position: new CANNON.Vec3(0, -.2, -7.2), //hole position can be different if hole length is changed in Hole.ts
            quaternion: new CANNON.Quaternion().setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2)
        });

        this.world.step(this.timeStep);
        this.world.addBody(this.ballBody);
        this.world.addBody(floorBody);
        this.world.addBody(wallBody1);
        this.world.addBody(wallBody2);
        this.world.addBody(wallBody3);
        this.world.addBody(wallBody4);
        this.world.addBody(holeBody);

    }

    public updatePhysics() {
        //roll the ball to new position
        this.ball?.position.set(this.newPosition.x, this.newPosition.y, this.newPosition.z);
        //update ballBody position
        this.ballBody.position.set(this.newPosition.x, this.newPosition.y, this.newPosition.z);
        //apply force to ballBody
        this.ballBody.applyForce(new CANNON.Vec3(this.gravity.x, this.gravity.y, this.gravity.z));
        this.ballBody.applyForce(
            new CANNON.Vec3(this.force.x, this.force.y, this.force.z), 
            new CANNON.Vec3(this.position.x, this.position.y, this.position.z)
        );
        //add friction so ball stops rolling
        this.ballBody.velocity.x *= 1 - this.friction;
        this.ballBody.velocity.z *= 1 - this.friction;
        //update ball position

    }


}


