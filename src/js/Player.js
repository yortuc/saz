import GameObject from './Components/GameObject';
import Transform from './Components/Transform';
import CircleRenderer from './Components/CircleRenderer';
import RectangleRenderer from './Components/RectangleRenderer';

import Body from './Components/Body';
import Controller2D from './Components/Controller2D';
import Input from './utils/input';


export default class Player extends GameObject{

	constructor(){  
		super();
		this.addComponent(new Transform(200, 50, 20, 20));
		this.controller = this.addComponent(new Controller2D());
	
		this.addComponent(new RectangleRenderer("red"));

		this.velocity = {x:0, y:0};
		this.moveSpeed = 2;

		this.jumpHeight = 2;
		this.timeToJumpApex = 0.4;
		this.accelerationTimeAirborne = 0.2;
		this.accelerationTimeGrounded = 0.1;
		
		this.gravity = (2 * this.jumpHeight) / Math.pow (this.timeToJumpApex, 2);
		this.jumpVelocity = -1 * Math.abs(this.gravity) * this.timeToJumpApex;

		console.log("Gravity: " + this.gravity + "  Jump Velocity: " + this.jumpVelocity);
	}

	update(dt, ctx) {
		super.update(dt, ctx);

		if (Input.getKeyDown("space") && this.controller.collisions.below) {
			console.log("getKeyDown");
			this.velocity.y = this.jumpVelocity;
		}

		this.velocity.x = Input.getAxis("horizontal").x * this.moveSpeed;
		this.velocity.y += this.gravity * dt/1000;
		this.controller.Move(this.velocity);
	}
}