import Behavior from './Behavior';
import QuadTreeNode from '../Models/QuadTreeNode';
import Geometry from '../utils/Geometry';


export default class SceneQuadTree extends Behavior {

	constructor(gameObject){
		super(gameObject);

		this.transform = this.gameObject.getComponent("Transform");
		this.quadTree = new QuadTreeNode( 0, 0, this.transform.width, this.transform.height );
	}

	addObject(object) {

	}

	filterObjects(refObject) {
		return this.gameObject.children;
	}
}