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

		ctx.fillStyle = this.color;
		ctx.translate(this.transform.x - this.transform.width/2, this.transform.y - this.transform.height/2);
		ctx.rotate(this.transform.rotation*Math.PI/180);
		ctx.fillRect(this.transform.width/2, this.transform.height/2, this.transform.width, this.transform.height);

		ctx.restore();
	}
}
