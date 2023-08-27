import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

export default class Hole extends THREE.Group {
    private readonly mtlLoader = new MTLLoader();
    private readonly objLoader = new OBJLoader();


    private hole?: THREE.Group
    //private holeMtl?: MTLLoader.MaterialCreator

    private async createHole() {
        const holeMtl = await this.mtlLoader.loadAsync('assets/PuttPutt/start.mtl');
        const hole = await this.objLoader.setMaterials(holeMtl).loadAsync('assets/PuttPutt/start.obj');
        return hole;
    }

    constructor() {
        super();
        this.init();
    }

    private async init() {
        this.hole = await this.createHole();
    }
}

   
