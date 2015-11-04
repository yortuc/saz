// RectangleRenderer 
import Graphics from '../utils/graphics';

export default class RectangleRenderer {
	constructor(color="black"){
		this.color = color;
	}

	init (){
		this.transform = this.gameObject.getComponent("Transform");
	}

	update(dt) {
		let ctx = Graphics.ctx;
		ctx.fillStyle = this.color;
		ctx.fillRect(this.transform.x, this.transform.y, this.transform.width, this.transform.height);
	}
}
