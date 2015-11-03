import Graphics from '../utils/graphics';
import Geometry from '../utils/geometry';

export default class Controller2D {
	
	constructor(){
		this.skinWidth = 0.015;
		this.horizontalRayCount = 1;		// one ray from center
		this.horizontalRaySpacing = null;
		this.verticalRaySpacing = null;
		this.verticalRayCount = 4;
		this.verticalRaySpacing = null;

		this.transform =  null;
		this.collisions = {
			above: false,
			below: false
		}
	}

	update (){
		this.transform = this.transform || this.gameObject.getComponent("Transform");
	}

	// @param velocity : V2
	Move(velocity) {

		if (velocity.y != 0) {
			this.VerticalCollisions (/*ref*/ velocity);
		}

		this.transform = this.transform || this.gameObject.getComponent("Transform");
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