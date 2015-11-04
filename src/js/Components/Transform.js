import Behavior from './Behavior';

// transform

export default class Transform extends Behavior {
	constructor(gameObject, data){
		super(gameObject);

		this.x = data.x;
		this.y = data.y;
		this.velocity = data.velocity || {x: 0, y: 0};
		this.width = data.width;
		this.height = data.height;
		this.rotation = data.rotation || 0; // degrees
	}

	update(dt){
		//
	}

	// @param vector : V2
	Translate(vector) {
		this.x += vector.x;
		this.y += vector.y;
	}
}