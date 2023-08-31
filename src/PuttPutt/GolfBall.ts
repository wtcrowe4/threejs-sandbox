

export default class GolfBall {
    
    public class Vector {
        constructor(public x: number, public y: number, public z: number) {}
    
        add(other: Vector) {
            this.x += other.x;
            this.y += other.y;
            this.z += other.z;
        }
    
        multiply(scalar: number) {
            this.x *= scalar;
            this.y *= scalar;
            this.z *= scalar;
        }
    }

    position: Vector;
    velocity: Vector;
    acceleration: Vector;
    gravity: Vector;
    friction: number;

    constructor(position: Vector, gravity: Vector, friction: number) {
        this.position = position;
        this.velocity = new Vector(0, 0, 0);
        this.acceleration = new Vector(0, 0, 0);
        this.gravity = gravity;
        this.friction = friction;
    }

    hit(force: Vector) {
        this.velocity.add(force);
    }

    update() {
        this.velocity.add(this.gravity);
        this.velocity.multiply(1 - this.friction);
        this.position.add(this.velocity);
    }

    reset(position: Vector) {
        this.position = position;
        this.velocity = new Vector(0, 0, 0);
        this.acceleration = new Vector(0, 0, 0);
    }
}


