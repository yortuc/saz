// RectangleRenderer 
import Graphics from '../utils/graphics';
import Behavior from '../Core/Behavior';

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
			-this.transform.width/2,
			-this.transform.height/2, 
			this.transform.width, 
			this.transform.height);

		ctx.beginPath();
		ctx.arc(0, 0, 3, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'green';
		ctx.fill();
	
		ctx.restore();
	}
}
