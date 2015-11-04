import Graphics from '../utils/graphics';
import Geometry from '../utils/geometry';
import Input from '../utils/input';
import Behavior from './Behavior';


export default class Controller2D extends Behavior {
	
	constructor(gameObject, data){
		super(gameObject);

		// props
		this.moveSpeed = data.moveSpeed || 6;
		this.jumpHeight = data.jumpHeight || 2;
		this.timeToJumpApex = data.timeToJumpApex || 0.4;
		this.accelerationTimeAirborne = data.accelerationTimeAirborne || 0.2;
		this.accelerationTimeGrounded = data.accelerationTimeGrounded || 0.1;
		
		// private
		this.skinWidth = 0.015;
		this.horizontalRayCount = 4;		// one ray from center
		this.horizontalRaySpacing = null;
		this.verticalRaySpacing = null;
		this.verticalRayCount = 4;
		this.verticalRaySpacing = null;
		this.gravity = (2 * this.jumpHeight) / Math.pow (this.timeToJumpApex, 2);
		this.jumpVelocity = -1 * Math.abs(this.gravity) * this.timeToJumpApex;
		this.raycastOrigins = null;

		this.transform = this.gameObject.getComponent("Transform");

		this.collisions = {
			above: false,
			below: false
		}
		
		this._computeRaySpacing();

		console.log(this.transform.x);
		this._updateRaycastOrigins();
		console.log(this.raycastOrigins.bottomLeft);
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

		this._updateRaycastOrigins();

		if ( velocity.y != 0) {
			this._verticalCollisions (/*ref*/ velocity);
		}

		this.transform.Translate (velocity);
	}

	_updateRaycastOrigins() {
		this.raycastOrigins = {
			bottomLeft: {
				x: this.transform.x + this.skinWidth,
				y: this.transform.y + this.transform.height - this.skinWidth
			},
			topLeft: {
				x: this.transform.x + this.skinWidth,
				y: this.transform.y + this.skinWidth
			}
		}
	}

	_computeRaySpacing(){
		this.verticalRaySpacing = (this.transform.width - 2*this.skinWidth) / (this.verticalRayCount-1);
		console.log(this.horizontalRaySpacing);
	}

	// @param ref velocity : V2
	_verticalCollisions(velocity) {
		let directionY = Math.sign (velocity.y);
		let rayLength = Math.abs (velocity.y) + this.skinWidth;

		for (let i = 0; i < this.verticalRayCount; i ++) {

			let rayOrigin = {
				x: this.raycastOrigins.bottomLeft.x + (this.verticalRaySpacing * i) + this.transform.velocity.x, 
				y: this.raycastOrigins.bottomLeft.y
			};
	 
			let hit = Geometry.Raycast(this.gameObject.getSiblings(), 
							  rayOrigin, 
							  directionY, 
							  rayLength);

			Graphics.line(rayOrigin, {x: rayOrigin.x, y: rayOrigin.y + rayLength*10 }, "green");

			if (hit) {
				velocity.y = (hit.distance - this.skinWidth);
				rayLength = hit.distance;

				this.collisions.below = true;
			}
		}
	}
}