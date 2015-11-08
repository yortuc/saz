import Geometry from '../utils/geometry';

class QuadTreeNode {
	constructor(topLeftX, topLeftY, width, height) {
		this.topLeftX = topLeftX;	// node top-left x
		this.topLeftY = topLeftY;	// node top-left y
		this.width = width;			// node width
		this.height = height;		// node height
		this.subNodes = [];			// leaf nodes of branch node
		this.objects = [];			// containing elements of leaf node
	}

	addObject(object){
		if(this.subNodes.length === 0){
			// leaf node, add object to self if not already in array
			if( !this.objects.find(s=> s === object) ){
				this.objects.push(object);
				console.log("object in node", this, object);
			}
		}
		else {
			// branch node
			const transform = object.getComponent("Transform");

			this.subNodes.map(subNode =>{
				let overlaps = this._nodeIntersectsTransform(subNode, transform);

				if(overlaps){
					subNode.addObject(object);
				}
			});
		}
	}

	_nodeIntersectsTransform(node, transform){
		const overlap = Geometry.RectanglesOverlap(
								{ x: transform.x, y: transform.y, width: transform.width, height: transform.height },
								{ x: node.topLeftX, y: node.topLeftY, width: node.width, height: node.height });

		return overlap;
	}

	subDivide(){
		
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
}

export default QuadTreeNode;