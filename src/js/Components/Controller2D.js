import Graphics from '../utils/graphics';
import Geometry from '../utils/geometry';
import Input from '../utils/input';

export default class Controller2D {
	
	constructor(data){
		data = data || {};

		// props
		this.moveSpeed = data.moveSpeed || 6;
		this.jumpHeight = data.jumpHeight || 2;
		this.timeToJumpApex = data.timeToJumpApex || 0.4;
		this.accelerationTimeAirborne = data.accelerationTimeAirborne || 0.2;
		this.accelerationTimeGrounded = data.accelerationTimeGrounded || 0.1;
		
		this.gravity = (2 * this.jumpHeight) / Math.pow (this.timeToJumpApex, 2);
		this.jumpVelocity = -1 * Math.abs(this.gravity) * this.timeToJumpApex;
		console.log("Gravity: " + this.gravity + "  Jump Velocity: " + this.jumpVelocity);

		// private
		this.skinWidth = 0.015;
		this.horizontalRayCount = 1;		// one ray from center
		this.horizontalRaySpacing = null;
		this.verticalRaySpacing = null;
		this.verticalRayCount = 4;
		this.verticalRaySpacing = null;

		this.collisions = {
			above: false,
			below: false
		}
	}

	init() {
		this.transform =  this.gameObject.getComponent("Transform");
		console.log("inited Controller2D", this.transform);
	}

	update (dt){

		if (Input.getKeyDown("space") && this.collisions.below) {
			console.log("getKeyDown");
			this.transform.velocity.y = this.jumpVelocity;
		}

		this.transform.velocity.x = Input.getAxis("horizontal").x * this.moveSpeed;
		this.transform.velocity.y += this.gravity * dt/1000;
		this.Move(this.transform.velocity);
	}

	// @param velocity : V2
	Move(velocity) {

		if (velocity.y != 0) {
			this.VerticalCollisions (/*ref*/ velocity);
		}

		this.transform.Translate (velocity);
	}

	// @param ref velocity : V2
	VerticalCollisions(velocity) {
		let directionY = Math.sign (velocity.y);
		let rayLength = Math.abs (velocity.y) + this.skinWidth;

		for (let i = 0; i < this.verticalRayCount; i ++) {

			let rayOrigin = {
				x: this.transform.x + ((20+this.skinWidth*2)/3 * i + this.transform.velocity.x), 
				y: this.transform.y + this.transform.height
			};
	 
			let hit = Geometry.Raycast(this.gameObject.getSiblings(), 
							  rayOrigin, 
							  directionY, 
							  rayLength);

			Graphics.line(rayOrigin, {x: rayOrigin.x, y: rayOrigin.y + rayLength }, "green");

			if (hit) {
				velocity.y = (hit.distance - this.skinWidth);
				rayLength = hit.distance;

				this.collisions.below = true;
			}
		}
	}
}