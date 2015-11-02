export default {
	
	Raycast: function (objects, origin, direction, rayLength){
		if(direction === -1) return null;

		let closest = null;

		for(var i in  objects){

			let rect2 = objects[i].getComponent("Transform");
			let inXrange = origin.x > rect2.x && origin.x < rect2.x + rect2.width;
			let rc =  rect2.y - origin.y;

			if( inXrange && rc < rayLength ){
				closest = rc;
			}
		}

		if(closest) {
			return {
				distance: closest
			}
		}else {
			return null;
		}
	}

}