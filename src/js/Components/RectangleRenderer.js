// RectangleRenderer 
import Graphics from '../utils/graphics';
import Behavior from '../Core/Behavior';

export default class RectangleRenderer extends Behavior {
	constructor(gameObject, color="black"){
		super(gameObject);
		this.transform = this.gameObject.getComponent("Transform");
		this.bounds = this.transform.bounds;
		this.color = color;
	}

	update(dt) {
		let ctx = Graphics.ctx;

		ctx.save();
		//ctx.translate(this.transform.x, this.transform.y);
	
		ctx.fillStyle = this.color;
		ctx.fillRect(
			this.transform.bounds.topLeft.x,
			this.transform.bounds.topLeft.y, 
			this.transform.width, 
			this.transform.height
		);

/*
		ctx.beginPath();
		ctx.arc(0, 0, 3, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'green';
		ctx.fill();
*/	
		ctx.restore();
	}
}
