// RectangleRenderer 

import Graphics from '../utils/graphics';

export default class RectangleRenderer{
	constructor(color="black"){
		this.color = color;
	}
	update(dt) {
		let ctx = Graphics.ctx;
		var transform = this.gameObject.getComponent("Transform");
		ctx.fillStyle = this.color;
		ctx.fillRect(transform.x, transform.y, transform.width, transform.height);
	}
}
