import * as THREE from 'three';
import ConnectFourScene from './ConnectFourScene';
import ConnectFourBoard from './ConnectFourBoard';
//import * as dat from 'dat.gui';

export default class ConnectFourGame {
    //private gui: dat.GUI;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private scene: ConnectFourScene;
    public board?: ConnectFourBoard;

    constructor() {
        // this.gui = new dat.GUI();
        // this.gui.addFolder('Camera');
        // this.gui.addFolder('Lighting');
        // this.gui.addFolder('Objects');
        // this.gui.addFolder('Scene');
        // this.gui.addFolder('Physics');

        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
        this.renderer = new THREE.WebGLRenderer();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.scene = new ConnectFourScene();
        this.scene.Initialize();

        this.renderer.render(this.scene, this.camera);
        this.start();
    }

    public start(): void {
        this.Update();
        requestAnimationFrame(() => this.start());
        this.renderer.render(this.scene, this.camera);
    }

    //move update logic here 
    public Update() {
        //update scene
        this.TakeTurn();
        //update board
        this.DropPiece();
        //check for win
        this.CheckWin();
        



    }

    
}