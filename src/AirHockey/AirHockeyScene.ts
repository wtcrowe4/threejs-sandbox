import * as THREE from 'three';
import AirHockeyTable from './AirHockeyTable';
import { KeyboardState } from 'three/examples/jsm/libs/KeyboardState';


export default class AirHockeyScene extends THREE.Scene {
        public camera?: THREE.PerspectiveCamera;
        public table?: AirHockeyTable;
        public keyboard: any;
        public mouse: any;

        public Initialize() {
            this.createTable();
            this.createLighting();
            this.createCamera();
            this.keyboard = new KeyboardState();
            this.mouse = new THREE.Vector2();
        }

    
        private createTable() {
            const table = new AirHockeyTable(this);
            this.table = table;
            //this.add(table);
        }
    
        private createLighting() {
            const light = new THREE.PointLight(0xffffff, 1, 100);
            light.position.set(0, 0, 0);
            this.add(light);
        }
    
        private createCamera() {
            const aspectRatio = window.innerWidth / window.innerHeight;
            const fieldOfView = 60;
            const nearPlane = 0.1;
            const farPlane = 100;
            this.camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
            this.camera.position.set(0, 0, 5);
            this.add(this.camera);
        }


    }