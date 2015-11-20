import Behavior from '../Core/Behavior';

export default class CameraFollow extends Behavior {
	constructor(gameObject, data){
		super(gameObject);

		this.targetTransform = this.gameObject.getComponent("Transform");
		this.camera = data.camera;

		this.dx = this.targetTransform.x - this.camera.transform.x;
		// this.dy = this.targetTransform.y - this.camera.transform.y;
	}

	update(dt) {
		this.camera.transform.x = this.targetTransform.x - this.dx;
		

		if(this.targetTransform.y < 200){
			this.camera.transform.y = this.targetTransform.y - 200;
		}
	}
}
