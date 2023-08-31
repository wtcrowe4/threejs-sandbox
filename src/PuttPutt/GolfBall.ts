
import { Vector3 } from 'three';

export default class GolfBall {
    position: Vector3;
    velocity: Vector3;
    acceleration: Vector3;
    gravity: Vector3;
    friction: number;

    constructor(position: Vector3, gravity: Vector3, friction: number) {
        this.position = position;
        this.velocity = new Vector3(0, 0, 0);
        this.acceleration = new Vector3(0, 0, 0);
        this.gravity = gravity;
        this.friction = friction;
    }

    hit(force: Vector3) {
        this.velocity.add(force);
    }

    update() {
        this.velocity.add(this.gravity);
        this.velocity.multiplyScalar(1 - this.friction);
        this.position.add(this.velocity);
    }

    reset(position: Vector3) {
        this.position = position;
        this.velocity = new Vector3(0, 0, 0);
        this.acceleration = new Vector3(0, 0, 0);
    }
}


