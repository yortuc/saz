// RectangleRenderer 
import Graphics from '../utils/graphics';
import Behavior from '../Core/Behavior';
import Input from '../utils/input';

export default class Shooter extends Behavior {
	
	constructor(gameObject, data){
		super(gameObject);

		this.playerController = this.gameObject.getComponent("PlayerController");
		this.bullets = [];
		this.lastFire = null;

		this.fireTime = 200; // ms
	}

	shoot() {
		let transform = this.gameObject.getComponent("Transform");
		let direction = this.playerController.direction;

		let bullet = { 
			x: transform.x + direction * 10,
			y: transform.y - 10,
			vx: 20 * direction
		}

		this.bullets.push( bullet );
		this.lastFire = Date.now();
	}

	renderBullets() {
		let ctx = Graphics.ctx;

		ctx.save();
		ctx.fillStyle = "red";

		this.bullets.map(b=>{
			b.x += b.vx;

			ctx.beginPath();
	      	ctx.arc(b.x, b.y, 5, 0, 2 * Math.PI, false);
	      	ctx.fill();
	    });

	    ctx.restore();
	}

	update(dt){
		// shoot
		if(Input.getKeyDown("s") && Date.now() - this.lastFire > this.fireTime){
			this.shoot();
		}

		let ctx = Graphics.ctx;
		
		this.renderBullets();
	}

}