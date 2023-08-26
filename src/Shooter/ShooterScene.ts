import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import Bullet from './Bullet.ts';

export default class ShooterScene extends THREE.Scene 
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
        target1.position.set(-1.5, 0, -1);
        const target2 = await this.createTarget();
        target2.position.set(1.5, 0, -1);
        const target3 = await this.createTarget();
        target3.position.set(-.5, 0, -1);
        const target4 = await this.createTarget();
        target4.position.set(.5, 0,  -1);
        
        this.blaster = await this.createBlaster();
        this.blaster.position.set(0, 0, 3);
        this.blaster.add(this.camera);
        this.camera.position.set(0, .4, 1);

        this.add(target1, target2, target3, target4)
        this.targets.push(target1, target2, target3, target4)
        this.add(this.blaster);

        //lighting
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 5, 5);
        this.add(light);

    
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }

    

//CREATE OBJECTS
    private async createTarget() {
        const targetMtl = await this.mtlLoader.loadAsync('assets/Shooter/targetB.mtl');
        targetMtl.preload();
        this.objLoader.setMaterials(targetMtl);
        const targetObj = await this.objLoader.loadAsync('assets/Shooter/targetB.obj');
        targetObj.rotateY(Math.PI*.5);
        return targetObj;
    }

    private async createBlaster() {
        const blasterMtl = await this.mtlLoader.loadAsync('assets/Shooter/blasterB.mtl');
        blasterMtl.preload();
        this.objLoader.setMaterials(blasterMtl);
        const blasterObj = await this.objLoader.loadAsync('assets/Shooter/blasterB.obj');
        return blasterObj;
    }

    private async createBullet() {
        if (!this.blaster)
		{
			return
		}

		if (this.bulletMtl)
		{
			this.objLoader.setMaterials(this.bulletMtl)
		}

		const bulletModel = await this.objLoader.loadAsync('assets/Shooter/foamBulletB.obj')

		this.camera.getWorldDirection(this.directionVector)

		const aabb = new THREE.Box3().setFromObject(this.blaster)
		const size = aabb.getSize(new THREE.Vector3())

		const vec = this.blaster.position.clone()
		vec.y += 0.06

		bulletModel.position.add(
			vec.add(
				this.directionVector.clone().multiplyScalar(size.z * 0.5)
			)
		)

		// rotate children to match gun for simplicity
		bulletModel.children.forEach(child => child.rotateX(Math.PI * -0.5))

		// use the same rotation as as the gun
		bulletModel.rotation.copy(this.blaster.rotation)

		this.add(bulletModel)

		const b = new Bullet(bulletModel)
		b.setVelocity(
			this.directionVector.x * 0.2,
			this.directionVector.y * 0.2,
			this.directionVector.z * 0.2
		)

		this.bullets.push(b)
	}

	

//EVENT LISTENERS
    private handleKeyDown(e: KeyboardEvent) {
        this.keyDown.add(e.key.toLowerCase());
    }

    private handleKeyUp(e: KeyboardEvent) {
        this.keyDown.delete(e.key.toLowerCase());

        if (e.key === 'f')
        {
            this.createBullet()
        }
    }




//UPDATES
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
    
            const speed = 0.05
    
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
                        strafeDir.applyAxisAngle(upVector, Math.PI * 0.25)
                            .multiplyScalar(speed)
                    )
                }
                else if (this.keyDown.has('d') || this.keyDown.has('arrowright'))
                {
                    this.blaster.position.add(
                        strafeDir.applyAxisAngle(upVector, Math.PI * -0.25)
                            .multiplyScalar(speed)
                    )
                }
            }
    }

    private updateBullets()
	{
		for (let i = 0; i < this.bullets.length; ++i)
		{
			const b = this.bullets[i]
			b.update()

			if (b.shouldRemove)
			{
				this.remove(b.group)
				this.bullets.splice(i, 1)
				i--
			}
			else
			{
				for (let j = 0; j < this.targets.length; ++j)
				{
					const target = this.targets[j]
					if (target.position.distanceToSquared(b.group.position) < 0.03)
					{
						this.remove(b.group)
						this.bullets.splice(i, 1)
						i--

						target.visible = false
						setTimeout(() => {
							target.visible = true
						}, 2000)
					}
				}
			}
		}
	}
    


    Update() {
        this.handleInput();
        this.updateBullets();
    }

}
