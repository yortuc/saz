export default class Body {

	constructor(gravity){
		this.gravity = gravity;	// kg*m/s^2
	}

	update(dt) {
		//collision check
		const transform = this.gameObject.getComponent("Transform");
		let dy = this.gravity*dt/1000;

		for(var i in this.gameObject.parent.children){
			let object = this.gameObject.parent.children[i];
			if(object === this.gameObject) continue;

			let rect2 = object.getComponent("Transform");
			let rc = raycastY(transform, rect2);

			if( rc < dy ){
				dy = 0;
			}
		};

		if(dy === 0){
			transform.velocity.y = 0;
			transform.velocity.x = 0;
		}
		else{
			transform.velocity.y += dy;
		}
		
		transform.y += transform.velocity.y;
	}
}


function raycastY(rect1, rect2){
	return rect2.y - (rect1.y + rect1.height);
}