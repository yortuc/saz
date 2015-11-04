// RectangleRenderer 
import Graphics from '../utils/graphics';
import Behavior from './Behavior';

export default class RectangleRenderer extends Behavior {
	constructor(gameObject, color="black"){
		super(gameObject);

		this.transform = this.gameObject.getComponent("Transform");
		this.color = color;
	}

	update(dt) {
		let ctx = Graphics.ctx;
		ctx.fillStyle = this.color;
		ctx.fillRect(this.transform.x, this.transform.y, this.transform.width, this.transform.height);
	}
}
