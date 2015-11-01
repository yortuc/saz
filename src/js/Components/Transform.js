// transform

export default class Transform {
	constructor(x, y, width, height){
		this.x = x;
		this.y = y;
		this.velocity = {x: 0, y: 0};
		this.width = width;
		this.height = height;
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