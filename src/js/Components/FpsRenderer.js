import Behavior from './Behavior';
import Graphics from '../utils/graphics';

// transform

export default class FpsRenderer extends Behavior {
	constructor(gameObject, data){
		super(gameObject);

		this.x = data.x;
		this.y = data.y;
	}

	update(dt){
		let ctx = Graphics.ctx;
		let text = "fps: " + Math.floor(1000/dt).toString();
		
		ctx.save();
		ctx.font = "16px Arial";
		ctx.fillStyle="green";
		ctx.fillText(text, this.x, this.y);
		ctx.restore();
	}
}