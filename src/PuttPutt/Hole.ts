import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

export default class Hole extends THREE.Group {
    private readonly mtlLoader = new MTLLoader();
    private readonly objLoader = new OBJLoader();


    public hole?: THREE.Group[] = []
    //private holeMtl?: MTLLoader.MaterialCreator

    public async createHole() {
        
        //Hole Start
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


        //Hole Layout
        //Right
        const holeLength = 5;
        const holeSideRightMtl = await this.mtlLoader.loadAsync('assets/PuttPutt/Hole/side.mtl');
        holeSideRightMtl.preload();
        //const holeSideRight = await this.objLoader.setMaterials(holeSideRightMtl).loadAsync('assets/PuttPutt/Hole/side.obj');
        //holeSideRight.position.set(1, -.2, -1.2);
        //this.hole?.push(holeSideRight);
        for(let i=0; i<=holeLength; i++){
            const holeSideRight = await this.objLoader.setMaterials(holeSideRightMtl).loadAsync('assets/PuttPutt/Hole/side.obj');
            holeSideRight.position.set(1, -.2, -1.2 - i);
            this.hole?.push(holeSideRight);
        }

        //Middle
        const holeMiddleMtl = await this.mtlLoader.loadAsync('assets/PuttPutt/Hole/open.mtl');
        holeMiddleMtl.preload();
        //const holeMiddle = await this.objLoader.setMaterials(holeMiddleMtl).loadAsync('assets/PuttPutt/Hole/open.obj');
        //holeMiddle.position.set(0, -.2, -1.2);
        //this.hole?.push(holeMiddle);
        for(let i=0; i<=holeLength; i++){
            const holeMiddle = await this.objLoader.setMaterials(holeMiddleMtl).loadAsync('assets/PuttPutt/Hole/open.obj');
            holeMiddle.position.set(0, -.2, -1.2 - i);
            this.hole?.push(holeMiddle);
        }

        //Left
        const holeSideLeftMtl = await this.mtlLoader.loadAsync('assets/PuttPutt/Hole/side.mtl');
        holeSideLeftMtl.preload();
        //const holeSideLeft = await this.objLoader.setMaterials(holeSideLeftMtl).loadAsync('assets/PuttPutt/Hole/side.obj');
        //holeSideLeft.rotateOnAxis(new THREE.Vector3(0, -1, 0), Math.PI / 2);
        //holeSideLeft.position.set(-1, -.2, -1.2);
        //this.hole?.push(holeSideLeft);
        for(let i=0; i<=holeLength; i++){
            const holeSideLeft = await this.objLoader.setMaterials(holeSideLeftMtl).loadAsync('assets/PuttPutt/Hole/side.obj');
            holeSideLeft.rotateOnAxis(new THREE.Vector3(0, -1, 0), Math.PI);
            holeSideLeft.position.set(-1, -.2, -1.2 - i);
            this.hole?.push(holeSideLeft);
        }



        //Hole End
        const holeEndMtl = await this.mtlLoader.loadAsync('assets/PuttPutt/Hole/holeOpen.mtl');
        holeEndMtl.preload();
        const holeEnd = await this.objLoader.setMaterials(holeEndMtl).loadAsync('assets/PuttPutt/Hole/holeOpen.obj');
        holeEnd.position.set(0, -.2, -1.2 - (holeLength+1));
        this.hole?.push(holeEnd);

        const holeEndRightMtl = await this.mtlLoader.loadAsync('assets/PuttPutt/Hole/hillCorner.mtl');
        holeEndRightMtl.preload();
        const holeEndRight = await this.objLoader.setMaterials(holeEndRightMtl).loadAsync('assets/PuttPutt/Hole/hillCorner.obj');
        holeEndRight.rotateOnAxis(new THREE.Vector3(0, -1, 0), -Math.PI/2);
        holeEndRight.position.set(1, -.2, -1.2 - (holeLength+1));
        this.hole?.push(holeEndRight);

        const holeEndLeftMtl = await this.mtlLoader.loadAsync('assets/PuttPutt/Hole/hillCorner.mtl');
        holeEndLeftMtl.preload();
        const holeEndLeft = await this.objLoader.setMaterials(holeEndLeftMtl).loadAsync('assets/PuttPutt/Hole/hillCorner.obj');
        holeEndLeft.rotateOnAxis(new THREE.Vector3(0, -1, 0), Math.PI);
        holeEndLeft.position.set(-1, -.2, -1.2 - (holeLength+1));
        this.hole?.push(holeEndLeft);

        const holeEndBackMtl = await this.mtlLoader.loadAsync('assets/PuttPutt/Hole/end.mtl');
        holeEndBackMtl.preload();
        const holeEndBack = await this.objLoader.setMaterials(holeEndBackMtl).loadAsync('assets/PuttPutt/Hole/end.obj');
        holeEndBack.rotateOnAxis(new THREE.Vector3(0, -1, 0), Math.PI);
        holeEndBack.position.set(0, -.2, -1.2 - (holeLength+1.9));
        this.hole?.push(holeEndBack);

        // const holeEndBackCornersMtl = await this.mtlLoader.loadAsync('assets/PuttPutt/Hole/splitWallsToOpen.mtl');
        // holeEndBackCornersMtl.preload();
        // const holeEndBackCorners = await this.objLoader.setMaterials(holeEndBackCornersMtl).loadAsync('assets/PuttPutt/Hole/splitWallsToOpen.obj');
        // holeEndBackCorners.rotateOnAxis(new THREE.Vector3(0, -1, 0), Math.PI);
        // holeEndBackCorners.position.set(0, -.2, -1.2 - (holeLength+2));
        // this.hole?.push(holeEndBackCorners);





        
        return this.hole;
    }

   
}

   
