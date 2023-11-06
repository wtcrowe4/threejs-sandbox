import * as THREE from 'three';
import AirHockeyScene from './AirHockeyScene';

export default class AirHockeyTable {
    private scene: AirHockeyScene;
    private table: THREE.Mesh;
    private tableDesign: THREE.Group;
    private tableMaterial: THREE.MeshBasicMaterial;
    private tableGeometry: THREE.BoxGeometry;
    //private tableTexture: THREE.Texture;
    //private tableTextureLoader: THREE.TextureLoader;
    private tableWidth: number;
    private tableHeight: number;
    private tableDepth: number;
    private tableX: number;
    private tableY: number;
    private tableZ: number;
    private puck: THREE.Mesh;
    private puckMaterial: THREE.MeshBasicMaterial;
    private puckGeometry: THREE.SphereGeometry;
    private hitter1: THREE.Mesh;
    private hitter1Material: THREE.MeshBasicMaterial;
    private hitter1Geometry: THREE.SphereGeometry;
    private hitter2: THREE.Mesh;
    private hitter2Material: THREE.MeshBasicMaterial;
    private hitter2Geometry: THREE.SphereGeometry;
    private goal1: THREE.Mesh;
    private goal2: THREE.Mesh;

    constructor(scene: AirHockeyScene) {
        this.scene = scene;
        this.tableDesign = new THREE.Group(); // initialize tableDesign
        //airhockey table design
        const middleLine = new THREE.Mesh(new THREE.BoxGeometry(10, .1, .1), new THREE.MeshBasicMaterial({ color: "red" }));
        middleLine.position.set(0, 0, 0);
        this.tableDesign.add(middleLine); // add middleLine to tableDesign
        const middleCircle = new THREE.Mesh(new THREE.CircleGeometry(1, 32), new THREE.MeshBasicMaterial({ color: "blue" }));
        middleCircle.position.set(0, 0, 0);
        this.tableDesign.add(middleCircle); // add middleCircle to tableDesign

        this.tableDesign.position.set(0, 0, 0); // set position of tableDesign
        this.scene.add(this.tableDesign);

        this.tableWidth = 10;
        this.tableHeight = 1;
        this.tableDepth = 10;
        this.tableX = 0;
        this.tableY = 0;
        this.tableZ = 0;
        //this.tableTextureLoader = new THREE.TextureLoader();
        
        this.tableMaterial = new THREE.MeshBasicMaterial({color: "white" });
        this.tableGeometry = new THREE.BoxGeometry(this.tableWidth, this.tableHeight, this.tableDepth);
        this.table = new THREE.Mesh(this.tableGeometry, this.tableMaterial);
        this.table.position.set(this.tableX, this.tableY, this.tableZ);
        this.scene.add(this.table);
        //this.initializePieces();
        this.puckGeometry = new THREE.SphereGeometry(.5, 32, 32);
        this.puckMaterial = new THREE.MeshBasicMaterial({ color: "black" });
        this.puck = new THREE.Mesh(this.puckGeometry, this.puckMaterial);
        this.puck.position.set(0, 0, 0);
        this.scene.add(this.puck);
        this.hitter1Geometry = new THREE.SphereGeometry(.5, 32, 32);
        this.hitter1Material = new THREE.MeshBasicMaterial({ color: "red" });
        this.hitter1 = new THREE.Mesh(this.hitter1Geometry, this.hitter1Material);
        this.hitter1.position.set(0, 0, 0);
        this.scene.add(this.hitter1);
        this.hitter2Geometry = new THREE.SphereGeometry(.5, 32, 32);
        this.hitter2Material = new THREE.MeshBasicMaterial({ color: "blue" });
        this.hitter2 = new THREE.Mesh(this.hitter2Geometry, this.hitter2Material);
        this.hitter2.position.set(0, 0, 0);
        this.scene.add(this.hitter2);
        const goal1Geometry = new THREE.BoxGeometry(1, 1, 1);
        const goal1Material = new THREE.MeshBasicMaterial({ color: "red" });
        this.goal1 = new THREE.Mesh(goal1Geometry, goal1Material);
        this.goal1.position.set(0, 0, 0);
        this.scene.add(this.goal1);
        const goal2Geometry = new THREE.BoxGeometry(1, 1, 1);
        const goal2Material = new THREE.MeshBasicMaterial({ color: "blue" });
        this.goal2 = new THREE.Mesh(goal2Geometry, goal2Material);
        this.goal2.position.set(0, 0, 0);
        this.scene.add(this.goal2);

    }

    public GetTable() {
        return this.table;
    }

    public Update() {
        this.table.position.set(this.tableX, this.tableY, this.tableZ);
        this.table.rotateX(0);
        this.table.rotateY(0);
        this.table.rotateZ(0);
        this.puck.position.set(0, .1, 0);
        this.hitter1.position.set(0, 0, -.8);
        this.hitter2.position.set(0, 0, .8);
        this.goal1.position.set(0, .1, 1);
        this.goal2.position.set(0, .1, -1);

        //update for keyboard user input
        if (this.scene.keyboard.pressed("left")) {
            this.hitter1.position.x -= .1;
            
        }
        if (this.scene.keyboard.pressed("right")) {
            this.hitter1.position.x += .1;
        }
        if (this.scene.keyboard.pressed("up")) {
            this.hitter1.position.z -= .1;
        }
        if (this.scene.keyboard.pressed("down")) {
            this.hitter1.position.z += .1;
        }

        //mouse user input
        if (this.scene.mouse.isPressed) {
            this.hitter1.position.x = this.scene.mouse.x;
            this.hitter1.position.y = this.scene.mouse.y;
            this.hitter1.position.z = this.scene.mouse.z;

            

        }

        //update for AI
        if (this.puck.position.x > this.hitter2.position.x) {
            this.hitter2.position.x += .1;
        }
        if (this.puck.position.x < this.hitter2.position.x) {
            this.hitter2.position.x -= .1;
        }
        if (this.puck.position.y > this.hitter2.position.y) {
            this.hitter2.position.y += .1;
        }

        if (this.puck.position.y < this.hitter2.position.y) {
            this.hitter2.position.y -= .1;
        }

        if (this.puck.position.z > this.hitter2.position.z) {
            this.hitter2.position.z += .1;
        }

        if (this.puck.position.z < this.hitter2.position.z) {
            this.hitter2.position.z -= .1;
        }

        //update for goals
        if (this.puck.position.x > this.goal1.position.x) {
            this.goal1.position.x += .1;
        }
        if (this.puck.position.x < this.goal1.position.x) {
            this.goal1.position.x -= .1;
        }
        if (this.puck.position.y > this.goal1.position.y) {
            this.goal1.position.y += .1;
        }
        if (this.puck.position.y < this.goal1.position.y) {
            this.goal1.position.y -= .1;
        }
        if (this.puck.position.z > this.goal1.position.z) {
            this.goal1.position.z += .1;
        }
        if (this.puck.position.z < this.goal1.position.z) {
            this.goal1.position.z -= .1;
        }

        if (this.puck.position.x > this.goal2.position.x) {
            this.goal2.position.x += .1;
        }
        if (this.puck.position.x < this.goal2.position.x) {
            this.goal2.position.x -= .1;
        }
        if (this.puck.position.y > this.goal2.position.y) {
            this.goal2.position.y += .1;
        }
        if (this.puck.position.y < this.goal2.position.y) {
            this.goal2.position.y -= .1;
        }
        if (this.puck.position.z > this.goal2.position.z) {
            this.goal2.position.z += .1;
        }
        if (this.puck.position.z < this.goal2.position.z) {
            this.goal2.position.z -= .1;
        }

        //update for collisions
        if (this.puck.position.x > this.hitter1.position.x) {
            this.puck.position.x += .1;
        }
        if (this.puck.position.x < this.hitter1.position.x) {
            this.puck.position.x -= .1;
        }
        if (this.puck.position.y > this.hitter1.position.y) {
            this.puck.position.y += .1;
        }
        if (this.puck.position.y < this.hitter1.position.y) {
            this.puck.position.y -= .1;
        }
        if (this.puck.position.z > this.hitter1.position.z) {
            this.puck.position.z += .1;
        }
        if (this.puck.position.z < this.hitter1.position.z) {
            this.puck.position.z -= .1;
        }

        if (this.puck.position.x > this.hitter2.position.x) {
            this.puck.position.x += .1;
        }
        if (this.puck.position.x < this.hitter2.position.x) {
            this.puck.position.x -= .1;
        }
        if (this.puck.position.y > this.hitter2.position.y) {
            this.puck.position.y += .1;
        }
        if (this.puck.position.y < this.hitter2.position.y) {
            this.puck.position.y -= .1;
        }
        if (this.puck.position.z > this.hitter2.position.z) {
            this.puck.position.z += .1;
        }
        if (this.puck.position.z < this.hitter2.position.z) {
            this.puck.position.z -= .1;
        }

        //update for puck
        if (this.puck.position.x > this.table.position.x) {
            this.puck.position.x += .1;
        }
        if (this.puck.position.x < this.table.position.x) {
            this.puck.position.x -= .1;
        }
        if (this.puck.position.y > this.table.position.y) {
            this.puck.position.y += .1;
        }
        if (this.puck.position.y < this.table.position.y) {
            this.puck.position.y -= .1;
        }
        if (this.puck.position.z > this.table.position.z) {
            this.puck.position.z += .1;
        }
        if (this.puck.position.z < this.table.position.z) {
            this.puck.position.z -= .1;
        }

        //update for hitter1
        if (this.hitter1.position.x > this.table.position.x) {
            this.hitter1.position.x += .1;
        }
        if (this.hitter1.position.x < this.table.position.x) {
            this.hitter1.position.x -= .1;
        }
        if (this.hitter1.position.y > this.table.position.y) {
            this.hitter1.position.y += .1;
        }
        if (this.hitter1.position.y < this.table.position.y) {
            this.hitter1.position.y -= .1;
        }
        if (this.hitter1.position.z > this.table.position.z) {
            this.hitter1.position.z += .1;
        }
        if (this.hitter1.position.z < this.table.position.z) {
            this.hitter1.position.z -= .1;
        }




        //update over time
        const time = Date.now() * 0.0005;
        const delta = 0.01;
        const speed = 1;
        const radius = 5;
        const angle = speed * time * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const z = Math.sin(angle) * radius;
        this.puck.position.set(x, y, z);
        this.hitter1.position.set(x, y, z);
        this.hitter2.position.set(x, y, z);

        
    
    }



}