import Graphics from './Graphics';

export default {

	// topLeft: x, y
	QuadTreeNode: class QuadTreeNode{
		constructor(topLeftX, topLeftY, width, height) {
			this.topLeftX = topLeftX;
			this.topLeftY = topLeftY;
			this.width = width;
			this.height = height;
			this.subNodes = [];
		}

		subDivide (){
			
			if(this.subNodes.length === 0){
				// leaf node
				//	q1,q2 
				//	q3,q4
				//
				let w = this.width / 2;
				let h = this.height / 2;

				const q1 = new QuadTreeNode( this.topLeftX, 	this.topLeftY, 		w, h );
				const q2 = new QuadTreeNode( this.topLeftX + w, this.topLeftY, 		w, h );
				const q3 = new QuadTreeNode( this.topLeftX, 	this.topLeftY + h, 	w, h );
				const q4 = new QuadTreeNode( this.topLeftX + w, this.topLeftY + h, 	w, h );

				this.subNodes  = [q1, q2, q3, q4];
			}
			else {
				// branch node
				this.subNodes.map(s => s.subDivide());
			}
		}
	},

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