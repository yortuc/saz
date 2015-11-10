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

		ctx.save();

		ctx.translate(this.transform.x, this.transform.y);
		ctx.rotate(this.transform.rotation*Math.PI/180);

		ctx.fillStyle = this.color;
		ctx.fillRect(
			this.transform.bounds.topLeft.x - this.transform.x,
			this.transform.bounds.topLeft.y  -this.transform.y, 
			this.transform.width, 
			this.transform.height);

		ctx.restore();
	}
}
