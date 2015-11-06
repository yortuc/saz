import Behavior from './Behavior';
import Geometry from '../utils/Geometry';


export default class SceneQuadTree extends Behavior {

	constructor(gameObject, {width, height}=data){
		super(gameObject);

		this.width = width;
		this.height = height;
		this.initQuadTree();
	}

	initQuadTree () {
		this.quadTree = new Geometry.QuadTreeNode( 0, 0, this.width, this.height );
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

}