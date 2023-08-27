import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

export default class Hole extends THREE.Group {
    private readonly mtlLoader = new MTLLoader();
    private readonly objLoader = new OBJLoader();


    public hole?: THREE.Group[] = []
    //private holeMtl?: MTLLoader.MaterialCreator

    public async createHole() {
        
        const holeStartMtl = await this.mtlLoader.loadAsync('assets/PuttPutt/Hole/side.mtl');
        holeStartMtl.preload();
        const holeStart = await this.objLoader.setMaterials(holeStartMtl).loadAsync('assets/PuttPutt/Hole/side.obj');
        holeStart.rotateOnAxis(new THREE.Vector3(0, -1, 0), Math.PI / 2);
        holeStart.position.set(0, -.2, -.2);
        this.hole?.push(holeStart);
        

        const holeStartRightMtl = await this.mtlLoader.loadAsync('assets/PuttPutt/Hole/skewCorner.mtl');
        holeStartRightMtl.preload();
        const holeStartRight = await this.objLoader.setMaterials(holeStartRightMtl).loadAsync('assets/PuttPutt/Hole/skewCorner.obj');
        holeStartRight.position.set(1, -.2, -.2);
        this.hole?.push(holeStartRight);

        const holeStartLeftMtl = await this.mtlLoader.loadAsync('assets/PuttPutt/Hole/skewCorner.mtl');
        holeStartLeftMtl.preload();
        const holeStartLeft = await this.objLoader.setMaterials(holeStartLeftMtl).loadAsync('assets/PuttPutt/Hole/skewCorner.obj');
        holeStartLeft.rotateOnAxis(new THREE.Vector3(0, -1, 0), Math.PI / 2);
        holeStartLeft.position.set(-1, -.2, -.2);
        this.hole?.push(holeStartLeft);

        
        
        return this.hole;
    }

   
}

   
