import * as THREE from 'three';
import AirHockeyScene from './AirHockeyScene';

export default class AirHockeyTable {
    private scene: AirHockeyScene;
    private table: THREE.Mesh;
    private tableMaterial: THREE.MeshBasicMaterial;
    private tableGeometry: THREE.BoxGeometry;
    private tableTexture: THREE.Texture;
    private tableTextureLoader: THREE.TextureLoader;
    private tableWidth: number;
    private tableHeight: number;
    private tableDepth: number;
    private tableX: number;
    private tableY: number;
    private tableZ: number;

    constructor(scene: AirHockeyScene) {
        this.scene = scene;
        this.tableWidth = 10;
        this.tableHeight = 1;
        this.tableDepth = 10;
        this.tableX = 0;
        this.tableY = 0;
        this.tableZ = 0;
        this.tableTextureLoader = new THREE.TextureLoader();
        this.tableTexture = this.tableTextureLoader.load('src/images/wood.jpg');
        this.tableMaterial = new THREE.MeshBasicMaterial({ map: this.tableTexture });
        this.tableGeometry = new THREE.BoxGeometry(this.tableWidth, this.tableHeight, this.tableDepth);
        this.table = new THREE.Mesh(this.tableGeometry, this.tableMaterial);
        this.table.position.set(this.tableX, this.tableY, this.tableZ);
        this.scene.add(this.table);
    }

    public GetTable() {
        return this.table;
    }
}