import Behavior from '../Core/Behavior';

export default class Camera extends Behavior {
	constructor(gameObject, data){
		super(gameObject);
		this.transform = data;
	}

	update(dt) {
		//
	}
}
