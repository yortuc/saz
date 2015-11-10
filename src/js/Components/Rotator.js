import Behavior from './Behavior';

// transform

export default class Rotator extends Behavior {
	constructor(gameObject, angularVelocity){
		super(gameObject);

		this.angularVelocity = angularVelocity;
		this.transform = this.gameObject.getComponent("Transform");
	}

	update(dt){
		this.transform.rotation += this.angularVelocity;
	}
}