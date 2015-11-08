import Behavior from './Behavior';
import Geometry from '../utils/Geometry';


export default class SceneQuadTree extends Behavior {

	constructor(gameObject){
		super(gameObject);

		this.scene = this.gameObject;
		this.transform = this.gameObject.getComponent("Transform");

		this.initQuadTree();
	}

	initQuadTree () {
		this.quadTree = new Geometry.QuadTreeNode( 0, 0, this.transform.width, this.transform.height );
		console.log(this.quadTree);

		this.quadTree.subDivide();
		console.log(this.quadTree);

		this.quadTree.subDivide();
		console.log(this.quadTree);

		this.quadTree.subDivide();
		console.log(this.quadTree);
	}

	update (dt){
		//
	}

	placeObjects(){
		// compute every objects quad-tree-node
		return this.scene.children.map(c=> this.placeObject(c));
	}

	placeObject(object) {
		const objPos = object.getComponent("Transform");

		if(this.subNodes.length === 0){
			// leaf node
		return this.subNodes.map(s=> s.getPosition(object))
		 		.filter( f=>  { 
		 			if(f) return f 
		 		});

		} else {
			const xLeftOffset = objPos.x - this.topLeftX;
			const yTopOffset = objPos.y - this.topLeftY;
			const xRightOffset = (this.topLeftX+this.width) - (objPos.x+objPos.width);
			const yBottomOffset = (this.topLeftY+this.height) - (objPos.y+objPos.height);

			if(xLeftOffset >= 0 && xRightOffset >= 0 &&
			   yTopOffset >= 0 && yBottomOffset >= 0)
			{
				return this;
			} else {
				return null;
			}
		}
	}
}