// RectangleRenderer 
import Graphics from '../utils/graphics';
import Behavior from '../Core/Behavior';
import Input from '../utils/input';

export default class Shooter extends Behavior {
	
	constructor(gameObject, data){
		super(gameObject);

		this.transform = this.gameObject.getComponent("Transform");
		this.playerController = this.gameObject.getComponent("PlayerController");
		this.bullets = [];
		this.lastFire = null;
	}

	shoot() {
		let direction = this.playerController.direction;

		let bullet = { 
			x: this.transform.x + direction * 10,
			y: this.transform.y - 10,
			vx: 20 * direction
		}

		this.bullets.push( bullet );
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
		if(Input.getKeyDown("s")){
			this.shoot();
		}

		let ctx = Graphics.ctx;
		
		this.renderBullets();
	}

}