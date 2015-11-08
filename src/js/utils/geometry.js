import Graphics from './Graphics';

export default {

	// check if given 2 rectangles overlap
	RectanglesOverlap: function(rect1, rect2)
	{
		const left1 	= rect1.x;
		const right1 	= rect1.x + rect1.width;
		const top1 		= rect1.y;
		const bottom1 	= rect1.y + rect1.height;

		const left2 	= rect2.x;
		const right2 	= rect2.x + rect2.width;
		const top2 		= rect2.y;
		const bottom2 	= rect2.y + rect2.height;

         if (bottom1 < top2 || top1 > bottom2 || right1 < left2 || left1 > right2) {
            // they do not overlap
            return false;
         }
         else {
            // they overlap
            return true;
         }
	},

	// filter objects within the same quadTree node (optional)
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
	},

	// returns Vector2
	RayToLineSegmentIntersection: function (x1_, y1_, x2_, y2_,x3_, y3_, x4_, y4_) {
		/*
		 *	https://github.com/camb416/RayCastingExample/blob/master/src/RayCastingExampleApp.cpp
		 */

		let result = null;
		let r, s, d;

		// Make sure the lines aren't parallel
		if ((y2_ - y1_) / (x2_ - x1_) != (y4_ - y3_) / (x4_ - x3_))
		{
			d = (((x2_ - x1_) * (y4_ - y3_)) - (y2_ - y1_) * (x4_ - x3_));
			if (d != 0)
			{
				r = (((y1_ - y3_) * (x4_ - x3_)) - (x1_ - x3_) * (y4_ - y3_)) / d;
				s = (((y1_ - y3_) * (x2_ - x1_)) - (x1_ - x3_) * (y2_ - y1_)) / d;
				if (r >= 0)
				{
					if (s >= 0 && s <= 1)
					{
						result = {
							x: x1_ + r * (x2_ - x1_), 
							y: y1_ + r * (y2_ - y1_)
						};
					}
				}
			}
		}

		return result;
	}

}