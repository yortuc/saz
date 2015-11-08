import Behavior from './Behavior';
import QuadTreeNode from '../Models/QuadTreeNode';
import Geometry from '../utils/Geometry';


export default class SceneQuadTree extends Behavior {

	constructor(gameObject){
		super(gameObject);

		this.scene = this.gameObject;
		this.transform = this.gameObject.getComponent("Transform");
		this.quadTree = null;

		this.initQuadTree();
	}

	initQuadTree () {
		this.quadTree = new QuadTreeNode( 0, 0, this.transform.width, this.transform.height );
		console.log(this.quadTree);

		this.quadTree.subDivide();
		console.log(this.quadTree);

		this.quadTree.subDivide();
		console.log(this.quadTree);
	}

	update (dt){
		//
	}
}