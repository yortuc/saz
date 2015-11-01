export default class Controller2D {
	
	constructor(){
		this.skinWidth = 0.015;
		this.horizontalRayCount = 1;		// one ray from center
		this.horizontalRaySpacing = null;
		this.verticalRaySpacing = null;

		this.transform =  null;
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
		let rayOrigin = {
			x: this.transform.x + (this.transform.width/2), 
			y: this.transform.y + this.transform.height
		};
 
		//rayOrigin += Vector2.right * (verticalRaySpacing * i + velocity.x);

		let hit = Raycast(this.gameObject, this.gameObject.parent.children, 
						  rayOrigin, 
						  directionY, 
						  rayLength);

		// Debug.DrawRay(rayOrigin, Vector2.up * directionY * rayLength,Color.red);

		if (hit) {
			velocity.y = (hit.distance - this.skinWidth) * directionY;
			rayLength = hit.distance;
		}
	}
}


function Raycast(go, objects, origin, direction, rayLength){
	for(var i in  objects){

		if(objects[i] === go) continue;

		let rect2 = objects[i].getComponent("Transform");
		let rc =  rect2.y - origin.y;

		if( rc < rayLength ){
			return {
				distance: rc
			}
		}
		else{
			return null;
		}
	}
}