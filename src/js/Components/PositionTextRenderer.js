import Graphics from '../utils/graphics';
import Behavior from './Behavior';

export default class PositionTextRenderer extends Behavior {
	constructor(gameObject, data){
		super(gameObject);

		this.goVelcity = this.gameObject.getComponent("Transform").velocity;
		this.x = data.x;
		this.y = data.y;
	}

	update(dt) {
		let ctx = Graphics.ctx;
		let text = "x: " + this.goVelcity.x.toString() + " y: " + this.goVelcity.y.toFixed(8).toString();
		ctx.font = "20px Arial";
		ctx.fillText(text, this.x, this.y);
	}
}