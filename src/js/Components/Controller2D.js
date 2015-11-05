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
		this.horizontalRayCount = 8;		// one ray from center
		this.horizontalRaySpacing = null;
		this.verticalRaySpacing = null;
		this.verticalRayCount = 8;
		this.verticalRaySpacing = null;
		this.gravity = (2 * this.jumpHeight) / Math.pow (this.timeToJumpApex, 2);
		this.jumpVelocity = -1 * Math.abs(this.gravity) * this.timeToJumpApex;
		this.raycastOrigins = null;
		this.transform = this.gameObject.getComponent("Transform");
		this.debugDraw = false;

		this.collisions = {
			reset: function(){ 
				this.above = this.below = false, 
				this.right = this.left = false
			},
			above: false, below: false,
			left: false, right: false
		}
		
		this._computeRaySpacing();
		this._updateRaycastOrigins();
	}

	update (dt){

		// jump
		if (Input.getKeyDown("space") && this.collisions.below) {
			console.log("getKeyDown");
			this.transform.velocity.y = this.jumpVelocity;
		}

		// horizontal movement
		this.transform.velocity.x = Input.getAxis("horizontal").x * this.moveSpeed;
		
		// gravity effect on vertical velocity
		this.transform.velocity.y += this.gravity * dt/1000;

		// move the player
		this.Move(this.transform.velocity);
	}

	// @param velocity : V2
	Move(velocity) {

		this.collisions.reset();
		this._updateRaycastOrigins();
		
		if ( velocity.x != 0 ) {
			this._horizontalCollisions (/*ref*/ velocity);
		}

		if ( velocity.y != 0 ) {
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
			},
			topRight: {
				x: this.transform.x + this.transform.width - this.skinWidth,
				y: this.transform.y + this.skinWidth
			}
		}
	}

	_computeRaySpacing(){
		this.verticalRaySpacing = (this.transform.width - 2*this.skinWidth) / (this.verticalRayCount-1);
		this.horizontalRaySpacing = (this.transform.height - 2*this.skinWidth) / (this.horizontalRayCount-1);
		console.log(this.horizontalRaySpacing, this.verticalRaySpacing);
	}

	// @param ref velocity : V2
	_verticalCollisions(velocity) {
		let directionY = Math.sign (velocity.y);
		let rayLength = Math.abs (velocity.y) + this.skinWidth;

		for (let i = 0; i < this.verticalRayCount; i ++) {

			let rayOrigin = {
				x: this.raycastOrigins.bottomLeft.x + (this.verticalRaySpacing * i) + this.transform.velocity.x, 
				y: directionY > 0 ? this.raycastOrigins.bottomLeft.y : this.raycastOrigins.topLeft.y
			};
	 
			let hit = Geometry.RaycastY(this.gameObject.getSiblings(), 
							  rayOrigin, 
							  directionY, 
							  rayLength);

			this.debugDraw && Graphics.line(rayOrigin, {x: rayOrigin.x, y: rayOrigin.y + directionY * rayLength*10 }, "green");

			if (hit) {
				velocity.y = (hit.distance - this.skinWidth) * directionY;
				rayLength = hit.distance;

				this.collisions.below = directionY === 1;
				this.collisions.above = directionY === -1;
			}
		}
	}

	// @param ref velocity : V2
	_horizontalCollisions(velocity) {
		let directionX = Math.sign (velocity.x);
		let rayLength = Math.abs (velocity.x) + this.skinWidth;

		for (let i = 0; i < this.horizontalRayCount; i ++) {

			let rayOrigin = {
				x: directionX > 0 ? this.raycastOrigins.topRight.x : this.raycastOrigins.topLeft.x, 
				y: this.raycastOrigins.topLeft.y + (this.horizontalRaySpacing * i)
			};
	 
			let hit = Geometry.RaycastX(this.gameObject.getSiblings(), 
							  rayOrigin, 
							  directionX, 
							  rayLength);

			this.debugDraw && Graphics.line(rayOrigin, {x: rayOrigin.x + directionX * rayLength * 10, y: rayOrigin.y }, "green");

			if (hit) {
				velocity.x = (hit.distance - this.skinWidth) * directionX;
				console.log(velocity);

				rayLength = hit.distance;

				this.collisions.right = directionX === 1;
				this.collisions.left = directionX === -1;
			}
		}
	}
}