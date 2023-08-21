import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import Bullet from './Bullet.ts';

export default class Scene extends THREE.Scene 
{
    private readonly mtlLoader = new MTLLoader();
    private readonly objLoader = new OBJLoader();
    private readonly camera: THREE.PerspectiveCamera;
    private readonly keyDown = new Set<string>();
    
    private blaster?: THREE.Group
	private bulletMtl?: MTLLoader.MaterialCreator

	private directionVector = new THREE.Vector3()

	private bullets: Bullet[] = []
	private targets: THREE.Group[] = []

    constructor(camera: THREE.PerspectiveCamera) {
        super();
        this.camera = camera;
    }    
    
    async Initialize() {
        //objefcts
        const target1 = await this.createTarget();
        target1.position.set(-1.5, 1, 0);
        const target2 = await this.createTarget();
        target2.position.set(1.5, 1, 0);
        const target3 = await this.createTarget();
        target3.position.set(-.5, 1, 0);
        const target4 = await this.createTarget();
        target4.position.set(.5, 1, 0);
        
        const blaster = await this.createBlaster();
        blaster.position.set(0, 0, 3);
        blaster.add(this.camera);
        this.camera.position.set(0, .4, 1);

        this.add(target1, target2, target3, target4)
        this.add(blaster);

        //lighting
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 5, 5);
        this.add(light);

        //event listeners
        window.addEventListener('keydown', (e) => this.handleKeyDown.add(e.key));
        window.addEventListener('keyup', (e) => this.handleKeyUp.add(e.key));
    }

    private async createTarget() {
        const targetMtl = await this.mtlLoader.loadAsync('assets/targetB.mtl');
        targetMtl.preload();
        this.objLoader.setMaterials(targetMtl);
        const targetObj = await this.objLoader.loadAsync('assets/targetB.obj');
        targetObj.rotateY(Math.PI*.5);
        return targetObj;
    }

    private async createBlaster() {
        const blasterMtl = await this.mtlLoader.loadAsync('assets/blasterB.mtl');
        blasterMtl.preload();
        this.objLoader.setMaterials(blasterMtl);
        const blasterObj = await this.objLoader.loadAsync('assets/blasterB.obj');
        return blasterObj;
    }

    private handleKeyDown(e: KeyboardEvent) {
        this.keyDown.add(e.key.toLowerCase());
    }

    private handleKeyUp(e: KeyboardEvent) {
        this.keyDown.delete(e.key.toLowerCase());
    }


    private handleInput() {
            if (!this.blaster)
            {
                return
            }
    
            const shiftKey = this.keyDown.has('shift')
    
            if (!shiftKey)
            {
                if (this.keyDown.has('a') || this.keyDown.has('arrowleft'))
                {
                    this.blaster.rotateY(0.02)
                }
                else if (this.keyDown.has('d') || this.keyDown.has('arrowright'))
                {
                    this.blaster.rotateY(-0.02)
                }
            }
    
            const dir = this.directionVector
    
            this.camera.getWorldDirection(dir)
    
            const speed = 0.1
    
            if (this.keyDown.has('w') || this.keyDown.has('arrowup'))
            {
                this.blaster.position.add(dir.clone().multiplyScalar(speed))
            }
            else if (this.keyDown.has('s') || this.keyDown.has('arrowdown'))
            {
                this.blaster.position.add(dir.clone().multiplyScalar(-speed))
            }
    
            if (shiftKey)
            {
                const strafeDir = dir.clone()
                const upVector = new THREE.Vector3(0, 1, 0)
    
                if (this.keyDown.has('a') || this.keyDown.has('arrowleft'))
                {
                    this.blaster.position.add(
                        strafeDir.applyAxisAngle(upVector, Math.PI * 0.5)
                            .multiplyScalar(speed)
                    )
                }
                else if (this.keyDown.has('d') || this.keyDown.has('arrowright'))
                {
                    this.blaster.position.add(
                        strafeDir.applyAxisAngle(upVector, Math.PI * -0.5)
                            .multiplyScalar(speed)
                    )
                }
            }
    }
    


    Update() {
        //Update
    }

}





// const box_geometry = new THREE.BoxGeometry(3);
//         const sphere_geometry = new THREE.SphereGeometry(1, 22);
//         const cone_geometry = new THREE.ConeGeometry(1, 5, 32);
//         const lime_material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
//         const red_material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
//         const blue_material = new THREE.MeshPhongMaterial({ color: 0x0000ff });
//         const cube = new THREE.Mesh(box_geometry, lime_material);
//         const sphere = new THREE.Mesh(sphere_geometry, red_material);
//         const cone = new THREE.Mesh(cone_geometry, blue_material);
//         this.add(sphere);
//         this.add(cone);
//         this.add(cube);