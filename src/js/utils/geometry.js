export default {

	RaycastX: function (objects, origin, direction, rayLength){

		let closest = null;

		for(var i in  objects){

			let rect2 = objects[i].getComponent("Transform");
			let targetX = direction > 0 ? rect2.x : rect2.x + rect2.width;

			if( direction === 1 ){
				if(rect2.x <= origin.x) continue;
			}
			if(direction === -1){
				if(rect2.x + rect2.width >= origin.x) continue;
			}
			
			let inYrange = origin.y >= rect2.y && origin.y <= rect2.y + rect2.height;
			let rc = direction * (targetX - origin.x);

			if( inYrange && rc < rayLength ){
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
	},

	RaycastY: function (objects, origin, direction, rayLength){

		let closest = null;

		for(var i in  objects){

			let rect2 = objects[i].getComponent("Transform");
			let targetY = direction > 0 ? rect2.y : rect2.y + rect2.height;

			if( direction === 1 ){
				if(rect2.y <= origin.y) continue;
			}
			if(direction === -1){
				if(rect2.y + rect2.height >= origin.y) continue;
			}

			let inXrange = origin.x >= rect2.x && origin.x <= rect2.x + rect2.width;
			let rc = direction * (targetY - origin.y);

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